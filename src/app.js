(() => {
  "use strict";

  const DATA = window.STUDY_DATA;
  const STORAGE_KEY = "inf05028.study.platform.v2";
  const DEFAULT_STATE = {
    version: 2,
    theme: "light",
    grades: { p1: "", p2: "", ap: "", aa: "" },
    attendanceMissed: 0,
    weekStatus: {},
    bookmarks: {},
    checklist: {},
    exercises: {},
    notes: {},
    reviewStats: { correct: 0, wrong: 0 },
    reviewIndex: 0,
    lastView: "dashboard"
  };

  let state = loadState();
  let activeFilter = "all";
  let searchQuery = "";
  let toastTimer = null;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function mergeState(base, incoming) {
    const out = clone(base);
    if (!incoming || typeof incoming !== "object") return out;
    for (const key of Object.keys(out)) {
      if (incoming[key] === undefined) continue;
      if (out[key] && typeof out[key] === "object" && !Array.isArray(out[key]) && typeof incoming[key] === "object" && !Array.isArray(incoming[key])) {
        out[key] = { ...out[key], ...incoming[key] };
      } else {
        out[key] = incoming[key];
      }
    }
    return out;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return clone(DEFAULT_STATE);
      return mergeState(DEFAULT_STATE, JSON.parse(raw));
    } catch (error) {
      console.warn("Não foi possível carregar o estado local.", error);
      return clone(DEFAULT_STATE);
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateSidebarProgress();
  }

  function esc(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function parseLocalDate(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d, 12, 0, 0, 0);
  }

  function todayLocal() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0);
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function formatPercent(n) {
    return `${Math.round(n)}%`;
  }

  function currentWeek() {
    const today = todayLocal();
    return DATA.weeks.find(w => today >= parseLocalDate(w.start) && today <= parseLocalDate(w.end)) || null;
  }

  function nextSession() {
    const today = todayLocal();
    return DATA.schedule.find(item => parseLocalDate(item.date) >= today) || null;
  }

  function scheduleByNumber(n) {
    return DATA.schedule.find(item => item.n === n) || null;
  }

  function masteryWeight(status) {
    if (status === "mastered") return 1;
    if (status === "studying") return 0.5;
    return 0;
  }

  function studyProgress() {
    const total = DATA.weeks.length;
    const points = DATA.weeks.reduce((sum, w) => sum + masteryWeight(state.weekStatus[w.id]), 0);
    return total ? (points / total) * 100 : 0;
  }

  function exerciseProgress() {
    const ids = DATA.weeks.flatMap(w => w.exercises.map(e => e.id));
    const solved = ids.filter(id => state.exercises[id]).length;
    return { solved, total: ids.length, percent: ids.length ? solved / ids.length * 100 : 0 };
  }

  function checklistProgress() {
    const ids = DATA.weeks.flatMap(w => w.checklist.map((_, idx) => `w${w.id}-c${idx}`));
    const done = ids.filter(id => state.checklist[id]).length;
    return { done, total: ids.length, percent: ids.length ? done / ids.length * 100 : 0 };
  }

  function calendarProgress() {
    const start = parseLocalDate("2026-08-06");
    const end = parseLocalDate("2026-11-26");
    const today = todayLocal();
    const pct = ((today - start) / (end - start)) * 100;
    return clamp(pct, 0, 100);
  }

  function gradeProjection() {
    let weighted = 0;
    let filledWeight = 0;
    let filledCount = 0;
    for (const item of DATA.course.evaluation) {
      const raw = state.grades[item.key];
      const value = raw === "" || raw === null || raw === undefined ? null : Number(raw);
      if (value !== null && Number.isFinite(value)) {
        weighted += clamp(value, 0, 10) * item.weight;
        filledWeight += item.weight;
        filledCount += 1;
      }
    }
    const partial = filledWeight > 0 ? weighted / filledWeight : null;
    return { finalEstimate: weighted, partial, filledCount, complete: filledCount === DATA.course.evaluation.length };
  }

  function conceptFor(n) {
    if (n >= 9) return "A";
    if (n >= 7.5) return "B";
    if (n >= 6) return "C";
    return "D";
  }

  function attendanceData() {
    const total = DATA.course.meetings;
    const missed = clamp(Number(state.attendanceMissed) || 0, 0, total);
    const attended = total - missed;
    const percent = total ? attended / total * 100 : 100;
    const maxEquivalentMisses = total * (1 - DATA.course.attendanceMinimum / 100);
    const remaining = maxEquivalentMisses - missed;
    return { total, missed, attended, percent, maxEquivalentMisses, remaining };
  }

  function statusLabel(status) {
    return ({ "not-started": "Não iniciado", studying: "Em estudo", mastered: "Dominado" })[status || "not-started"];
  }

  function statusBadge(status) {
    if (status === "mastered") return "success";
    if (status === "studying") return "primary";
    return "";
  }

  function sessionTypeBadge(type) {
    if (type === "Prova" || type === "Recuperação") return "danger";
    if (type === "Laboratório" || type === "Prática") return "primary";
    if (type === "Autônoma") return "warning";
    return "";
  }

  function renderDashboard() {
    const root = $("#dashboard-root");
    const current = currentWeek();
    const next = nextSession();
    const progress = studyProgress();
    const ex = exerciseProgress();
    const chk = checklistProgress();
    const grade = gradeProjection();
    const attendance = attendanceData();
    const calendar = calendarProgress();

    const currentTitle = current ? `Bloco ${current.id}: ${current.title}` : (calendar >= 100 ? "Semestre encerrado" : "Antes do início do semestre");
    const currentText = current ? `Você está no período ${current.label}. Use o resumo executivo para revisão rápida e marque o status conforme seu domínio real.` : "A trilha continua disponível para revisão completa.";

    root.innerHTML = `
      <div class="hero-card">
        <div class="hero-grid">
          <div>
            <p class="eyebrow">Seu painel · ${esc(DATA.meta.term)}</p>
            <h1 id="dashboard-title">${esc(currentTitle)}</h1>
            <p class="lead">${esc(currentText)}</p>
            <div class="badges">
              <span class="badge primary">Calendário ${formatPercent(calendar)}</span>
              <span class="badge">Domínio ${formatPercent(progress)}</span>
              ${next ? `<span class="badge ${sessionTypeBadge(next.type)}">Próximo: ${esc(next.label)} · ${esc(next.topic)}</span>` : ""}
            </div>
            <div class="row" style="margin-top:16px">
              ${current ? `<button class="button" type="button" data-jump-week="${current.id}">Abrir semana atual</button>` : `<button class="button" type="button" data-view-link="weeks">Abrir trilha</button>`}
              <button class="button secondary" type="button" data-view-link="review">Fazer revisão ativa</button>
            </div>
          </div>
          <div class="card flat">
            <div class="row between"><strong>Progresso do calendário</strong><span>${formatPercent(calendar)}</span></div>
            <div class="progress-track" style="margin:8px 0 14px"><div class="progress-fill" style="width:${calendar}%"></div></div>
            <div class="row between"><strong>Domínio declarado</strong><span>${formatPercent(progress)}</span></div>
            <div class="progress-track" style="margin:8px 0 14px"><div class="progress-fill success" style="width:${progress}%"></div></div>
            <small class="helper">O calendário avança por data; o domínio só avança quando você marca semanas como “Em estudo” ou “Dominado”.</small>
          </div>
        </div>
      </div>

      <div class="grid four" style="margin-bottom:18px">
        <div class="card stat-card"><span class="label">Exercícios resolvidos</span><span class="value">${ex.solved}/${ex.total}</span><span class="detail">${formatPercent(ex.percent)} do banco da plataforma</span></div>
        <div class="card stat-card"><span class="label">Checklist concluído</span><span class="value">${chk.done}/${chk.total}</span><span class="detail">${formatPercent(chk.percent)} das ações sugeridas</span></div>
        <div class="card stat-card"><span class="label">NF projetada</span><span id="stat-grade" class="value">${grade.finalEstimate.toFixed(1)}</span><span id="stat-grade-detail" class="detail">${grade.complete ? `Conceito estimado ${conceptFor(grade.finalEstimate)}` : `${grade.filledCount}/4 componentes preenchidos`}</span></div>
        <div class="card stat-card"><span class="label">Presença equivalente</span><span id="stat-attendance" class="value">${attendance.percent.toFixed(1)}%</span><span id="stat-attendance-detail" class="detail">${attendance.missed.toFixed(1)} encontros equivalentes ausentes</span></div>
      </div>

      <div class="grid two" style="margin-bottom:18px">
        <section class="card" aria-labelledby="grade-title">
          <p class="eyebrow">Pesos do plano 2026/1</p>
          <h2 id="grade-title">Calculadora de notas</h2>
          <p class="helper">Use notas reais ou estimativas. NF = 0,3·P1 + 0,4·P2 + 0,2·AP + 0,1·AA.</p>
          <div class="form-grid" style="margin-top:14px">
            ${DATA.course.evaluation.map(item => `
              <div class="field">
                <label for="grade-${item.key}">${esc(item.label)} · ${Math.round(item.weight * 100)}%</label>
                <input id="grade-${item.key}" data-grade="${item.key}" type="number" min="0" max="10" step="0.1" inputmode="decimal" value="${esc(state.grades[item.key])}" placeholder="0–10">
              </div>
            `).join("")}
          </div>
          <div id="grade-result" class="callout info" style="margin-bottom:0"></div>
        </section>

        <section class="card" aria-labelledby="attendance-title">
          <p class="eyebrow">Presença mínima: ${DATA.course.attendanceMinimum}%</p>
          <h2 id="attendance-title">Controle de faltas</h2>
          <p class="helper">O plano descreve 30 encontros de 100 min. Para permitir faltas parciais, use passos de 0,5 encontro (≈ um período de 50 min).</p>
          <div class="field" style="margin:14px 0">
            <label for="attendance-missed">Encontros equivalentes ausentes</label>
            <input id="attendance-missed" type="number" min="0" max="30" step="0.5" value="${attendance.missed}">
          </div>
          <div class="row" style="margin-bottom:8px">
            <button class="button secondary small" type="button" data-attendance-delta="0.5">+ 1 período</button>
            <button class="button secondary small" type="button" data-attendance-delta="1">+ 1 encontro</button>
            <button class="button ghost small" type="button" data-attendance-delta="-0.5">− 1 período</button>
          </div>
          <div id="attendance-result"></div>
        </section>
      </div>

      <div class="grid two">
        <section class="card">
          <p class="eyebrow">Agenda</p>
          <h2>Próximos encontros</h2>
          <div class="timeline">
            ${DATA.schedule.filter(s => parseLocalDate(s.date) >= todayLocal()).slice(0, 6).map(item => `
              <div class="timeline-item">
                <div class="timeline-date">${esc(item.label)}</div>
                <div class="timeline-rail"><span class="timeline-dot"></span></div>
                <div class="timeline-content"><strong>${esc(item.topic)}</strong><small>${esc(item.type)}</small></div>
              </div>
            `).join("") || `<p class="helper">Não há encontros futuros no cronograma.</p>`}
          </div>
        </section>

        <section class="card">
          <p class="eyebrow">Rastreabilidade</p>
          <h2>Como a trilha foi construída</h2>
          <p>O cronograma 2026/2 define <strong>datas e ordem real</strong>; o plano 2026/1 fornece <strong>regras, objetivos e macroementa</strong>; o guia traz <strong>profundidade conceitual</strong>; listas e provas ajudam a identificar <strong>formatos recorrentes de cobrança</strong>.</p>
          <div class="callout warning"><strong>Diferença de semestre</strong><br>O plano disponível é de 2026/1, enquanto o cronograma é de 2026/2. Por isso a plataforma exibe a origem de regras sensíveis, como pesos e recuperação.</div>
          <button class="button secondary" type="button" data-view-link="course">Ver análise cruzada completa</button>
        </section>
      </div>
    `;

    bindDashboardEvents();
    updateGradeUI();
    updateAttendanceUI();
  }

  function bindDashboardEvents() {
    $$('[data-grade]').forEach(input => {
      input.addEventListener("input", event => {
        const key = event.target.dataset.grade;
        let value = event.target.value;
        if (value !== "") value = String(clamp(Number(value), 0, 10));
        state.grades[key] = value;
        saveState();
        updateGradeUI();
      });
    });

    const attendanceInput = $("#attendance-missed");
    attendanceInput?.addEventListener("input", event => {
      state.attendanceMissed = clamp(Number(event.target.value) || 0, 0, DATA.course.meetings);
      saveState();
      updateAttendanceUI();
    });

    $$('[data-attendance-delta]').forEach(button => {
      button.addEventListener("click", () => {
        const delta = Number(button.dataset.attendanceDelta);
        state.attendanceMissed = clamp((Number(state.attendanceMissed) || 0) + delta, 0, DATA.course.meetings);
        if (attendanceInput) attendanceInput.value = state.attendanceMissed;
        saveState();
        updateAttendanceUI();
      });
    });
  }

  function updateGradeUI() {
    const grade = gradeProjection();
    const result = $("#grade-result");
    const stat = $("#stat-grade");
    const statDetail = $("#stat-grade-detail");
    if (stat) stat.textContent = grade.finalEstimate.toFixed(1);
    if (statDetail) statDetail.textContent = grade.complete ? `Conceito estimado ${conceptFor(grade.finalEstimate)}` : `${grade.filledCount}/4 componentes preenchidos`;
    if (!result) return;

    if (grade.filledCount === 0) {
      result.className = "callout info";
      result.innerHTML = `<strong>Preencha suas notas ou estimativas</strong><br>A calculadora salva automaticamente no navegador.`;
      return;
    }

    const concept = conceptFor(grade.finalEstimate);
    const cls = grade.finalEstimate >= 6 ? "success" : "warning";
    result.className = `callout ${cls}`;
    result.innerHTML = `
      <strong>NF projetada: ${grade.finalEstimate.toFixed(2)} · conceito ${concept}${grade.complete ? "" : " (estimativa incompleta)"}</strong><br>
      ${grade.partial !== null ? `Média ponderada apenas entre componentes preenchidos: ${grade.partial.toFixed(2)}.` : ""}
      ${grade.complete && grade.finalEstimate < 6 ? `<br><span class="helper">O plano prevê recuperação para conceito D, mas o documento fornecido contém uma inconsistência na fórmula de NNR. Veja a seção Disciplina.</span>` : ""}
    `;
  }

  function updateAttendanceUI() {
    const data = attendanceData();
    const result = $("#attendance-result");
    const stat = $("#stat-attendance");
    const detail = $("#stat-attendance-detail");
    if (stat) stat.textContent = `${data.percent.toFixed(1)}%`;
    if (detail) detail.textContent = `${data.missed.toFixed(1)} encontros equivalentes ausentes`;
    if (!result) return;

    let cls = "success";
    let title = "Margem confortável";
    if (data.percent < 75) {
      cls = "danger";
      title = "Abaixo do mínimo de 75%";
    } else if (data.percent < 85) {
      cls = "warning";
      title = "Atenção à margem de faltas";
    }

    const remainingText = data.remaining >= 0
      ? `Margem até atingir exatamente 75%: ${data.remaining.toFixed(1)} encontro(s) equivalente(s).`
      : `Você ultrapassou a margem equivalente em ${Math.abs(data.remaining).toFixed(1)} encontro(s).`;

    result.className = `callout ${cls}`;
    result.innerHTML = `
      <strong>${title} · presença equivalente ${data.percent.toFixed(1)}%</strong><br>
      ${remainingText}<br>
      <span class="helper">Referência matemática: 30 encontros × 100 min e presença mínima de 75%. Isso equivale a no máximo 7,5 encontros completos (15 períodos de 50 min) de ausência se a contabilização seguir exatamente essa estrutura. Confirme o registro oficial de frequência da turma.</span>
    `;
  }

  function renderWeeks() {
    const root = $("#weeks-root");
    const current = currentWeek();
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase("pt-BR");

    const filtered = DATA.weeks.filter(week => {
      const status = state.weekStatus[week.id] || "not-started";
      if (activeFilter === "current" && (!current || week.id !== current.id)) return false;
      if (activeFilter === "bookmarked" && !state.bookmarks[week.id]) return false;
      if (activeFilter === "pending" && status === "mastered") return false;
      if (activeFilter === "mastered" && status !== "mastered") return false;
      if (!normalizedQuery) return true;
      const haystack = JSON.stringify(week).toLocaleLowerCase("pt-BR");
      return haystack.includes(normalizedQuery);
    });

    if (!filtered.length) {
      root.innerHTML = `<div class="empty-state"><h2>Nenhuma semana encontrada</h2><p>Altere o filtro ou a busca para voltar a exibir a trilha.</p></div>`;
      return;
    }

    root.innerHTML = `
      <div class="row between" style="margin-bottom:12px">
        <span class="helper">${filtered.length} bloco(s) exibido(s)</span>
        ${normalizedQuery ? `<span class="badge primary">Busca: “${esc(searchQuery)}”</span>` : ""}
      </div>
      <div class="week-list">
        ${filtered.map(week => renderWeekCard(week, current?.id === week.id)).join("")}
      </div>
    `;

    bindWeekEvents();
  }

  function renderWeekCard(week, isCurrent) {
    const status = state.weekStatus[week.id] || "not-started";
    const sessionItems = DATA.schedule.filter(item => {
      const d = parseLocalDate(item.date);
      return d >= parseLocalDate(week.start) && d <= parseLocalDate(week.end);
    });
    const notes = state.notes[week.id] || "";
    const wordCount = notes.trim() ? notes.trim().split(/\s+/).length : 0;

    return `
      <article class="week-card ${isCurrent ? "is-current" : ""}" data-week-card="${week.id}" id="week-${week.id}">
        <div class="week-summary">
          <div class="week-number">${week.id}</div>
          <div>
            <div class="badges" style="margin-bottom:5px">
              <span class="badge ${isCurrent ? "primary" : ""}">${esc(week.label)}</span>
              <span class="badge">${esc(week.phase)}</span>
              <span class="badge ${statusBadge(status)}">${statusLabel(status)}</span>
              ${isCurrent ? `<span class="badge primary">Agora</span>` : ""}
            </div>
            <h2>${esc(week.title)}</h2>
            <p>${sessionItems.length ? sessionItems.map(s => `${s.label} · ${s.topic}`).join(" · ") : "Sem encontro listado no cronograma; bloco autônomo de consolidação."}</p>
          </div>
          <div class="week-actions">
            <select class="mastery-select" data-week-status="${week.id}" aria-label="Status da semana ${week.id}">
              <option value="not-started" ${status === "not-started" ? "selected" : ""}>Não iniciado</option>
              <option value="studying" ${status === "studying" ? "selected" : ""}>Em estudo</option>
              <option value="mastered" ${status === "mastered" ? "selected" : ""}>Dominado</option>
            </select>
            <button class="bookmark-button ${state.bookmarks[week.id] ? "is-active" : ""}" type="button" data-bookmark-week="${week.id}" title="Favoritar semana" aria-label="Favoritar semana ${week.id}">★</button>
            <button class="week-toggle" type="button" data-toggle-week="${week.id}" aria-expanded="false" title="Abrir semana">⌄</button>
          </div>
        </div>
        <div class="week-body">
          <div class="week-tabs" role="tablist" aria-label="Conteúdo da semana ${week.id}">
            <button class="week-tab is-active" type="button" data-week-tab="summary" data-week="${week.id}">Resumo</button>
            <button class="week-tab" type="button" data-week-tab="content" data-week="${week.id}">Conteúdo denso</button>
            <button class="week-tab" type="button" data-week-tab="exercises" data-week="${week.id}">Exercícios (${week.exercises.length})</button>
            <button class="week-tab" type="button" data-week-tab="notes" data-week="${week.id}">Anotações</button>
          </div>

          <div class="week-panel is-active" data-week-panel="summary" data-week="${week.id}">
            <div class="grid two">
              <div>
                <h3>Resumo executivo</h3>
                <ul class="summary-list">${week.executive.map(item => `<li>${esc(item)}</li>`).join("")}</ul>
              </div>
              <div>
                <h3>Objetivos de domínio</h3>
                <ul>${week.objectives.map(item => `<li>${esc(item)}</li>`).join("")}</ul>
              </div>
            </div>
            <h3>Checklist da semana</h3>
            <div class="checklist">
              ${week.checklist.map((item, idx) => {
                const id = `w${week.id}-c${idx}`;
                return `<label><input type="checkbox" data-check-id="${id}" ${state.checklist[id] ? "checked" : ""}><span>${esc(item)}</span></label>`;
              }).join("")}
            </div>
            <h3>Fontes cruzadas</h3>
            <div class="badges">${week.sources.map(s => `<span class="badge">${esc(s)}</span>`).join("")}</div>
          </div>

          <div class="week-panel" data-week-panel="content" data-week="${week.id}">
            ${week.theory.map(section => `
              <section class="theory-section">
                <h3>${esc(section.title)}</h3>
                <p>${esc(section.text)}</p>
                ${section.formula ? `<div class="formula-block">${esc(section.formula)}</div>` : ""}
              </section>
            `).join("")}
          </div>

          <div class="week-panel" data-week-panel="exercises" data-week="${week.id}">
            <p class="helper">As questões indicadas como “Lista/Prova” são paráfrases de materiais fornecidos; as demais foram criadas para praticar o mesmo tipo de raciocínio.</p>
            ${week.exercises.map((exercise, idx) => `
              <article class="exercise">
                <div class="exercise-head">
                  <div>
                    <div class="exercise-meta"><span class="badge primary">${esc(exercise.difficulty)}</span><span class="badge">${esc(exercise.origin)}</span></div>
                    <h4>${idx + 1}. ${esc(exercise.title)}</h4>
                  </div>
                  <label class="check-row"><input type="checkbox" data-exercise-id="${exercise.id}" ${state.exercises[exercise.id] ? "checked" : ""}><span class="helper">Resolvido</span></label>
                </div>
                <p>${esc(exercise.prompt)}</p>
                <details><summary>Dica</summary><p>${esc(exercise.hint)}</p></details>
                <details><summary>Solução comentada</summary><p>${esc(exercise.solution)}</p></details>
              </article>
            `).join("")}
          </div>

          <div class="week-panel" data-week-panel="notes" data-week="${week.id}">
            <div class="field">
              <label for="notes-${week.id}">Bloco de notas da semana</label>
              <textarea id="notes-${week.id}" data-week-notes="${week.id}" placeholder="Registre dúvidas, ideias de prova, erros recorrentes e pontos para revisar…">${esc(notes)}</textarea>
            </div>
            <div class="notes-meta"><span>Salvamento automático no localStorage.</span><span data-note-count="${week.id}">${wordCount} palavra(s)</span></div>
          </div>
        </div>
      </article>
    `;
  }

  function bindWeekEvents() {
    $$('[data-toggle-week]').forEach(button => {
      button.addEventListener("click", () => toggleWeek(Number(button.dataset.toggleWeek)));
    });

    $$('[data-week-status]').forEach(select => {
      select.addEventListener("change", () => {
        const weekId = Number(select.dataset.weekStatus);
        state.weekStatus[weekId] = select.value;
        saveState();
        renderWeeks();
        showToast(`Semana ${weekId}: ${statusLabel(select.value)}.`);
      });
    });

    $$('[data-bookmark-week]').forEach(button => {
      button.addEventListener("click", () => {
        const weekId = Number(button.dataset.bookmarkWeek);
        state.bookmarks[weekId] = !state.bookmarks[weekId];
        saveState();
        renderWeeks();
      });
    });

    $$('[data-week-tab]').forEach(button => {
      button.addEventListener("click", () => activateWeekTab(Number(button.dataset.week), button.dataset.weekTab));
    });

    $$('[data-check-id]').forEach(input => {
      input.addEventListener("change", () => {
        state.checklist[input.dataset.checkId] = input.checked;
        saveState();
      });
    });

    $$('[data-exercise-id]').forEach(input => {
      input.addEventListener("change", () => {
        state.exercises[input.dataset.exerciseId] = input.checked;
        saveState();
        showToast(input.checked ? "Exercício marcado como resolvido." : "Exercício reaberto.");
      });
    });

    $$('[data-week-notes]').forEach(textarea => {
      textarea.addEventListener("input", () => {
        const weekId = Number(textarea.dataset.weekNotes);
        state.notes[weekId] = textarea.value;
        saveState();
        const count = textarea.value.trim() ? textarea.value.trim().split(/\s+/).length : 0;
        const target = $(`[data-note-count="${weekId}"]`);
        if (target) target.textContent = `${count} palavra(s)`;
      });
    });
  }

  function toggleWeek(weekId, forceOpen = null) {
    const card = $(`[data-week-card="${weekId}"]`);
    if (!card) return;
    const shouldOpen = forceOpen === null ? !card.classList.contains("is-open") : forceOpen;
    card.classList.toggle("is-open", shouldOpen);
    const button = $(`[data-toggle-week="${weekId}"]`, card);
    if (button) {
      button.setAttribute("aria-expanded", String(shouldOpen));
      button.textContent = shouldOpen ? "⌃" : "⌄";
    }
  }

  function activateWeekTab(weekId, tab) {
    const card = $(`[data-week-card="${weekId}"]`);
    if (!card) return;
    $$('[data-week-tab]', card).forEach(btn => btn.classList.toggle("is-active", btn.dataset.weekTab === tab));
    $$('[data-week-panel]', card).forEach(panel => panel.classList.toggle("is-active", panel.dataset.weekPanel === tab));
  }

  function jumpToWeek(weekId) {
    showView("weeks");
    activeFilter = "all";
    const filter = $("#week-filter");
    if (filter) filter.value = "all";
    renderWeeks();
    requestAnimationFrame(() => {
      toggleWeek(weekId, true);
      const el = $("#week-" + weekId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function renderReview() {
    const root = $("#review-root");
    const cards = DATA.reviewCards;
    const idx = ((Number(state.reviewIndex) || 0) % cards.length + cards.length) % cards.length;
    const card = cards[idx];
    const totalAttempts = state.reviewStats.correct + state.reviewStats.wrong;
    const accuracy = totalAttempts ? state.reviewStats.correct / totalAttempts * 100 : 0;

    root.innerHTML = `
      <div class="grid three" style="margin-bottom:18px">
        <div class="card stat-card"><span class="label">Cartões disponíveis</span><span class="value">${cards.length}</span><span class="detail">Conceitos de todo o semestre</span></div>
        <div class="card stat-card"><span class="label">Acertos registrados</span><span class="value">${state.reviewStats.correct}</span><span class="detail">Após revelar a resposta</span></div>
        <div class="card stat-card"><span class="label">Taxa de acerto</span><span class="value">${formatPercent(accuracy)}</span><span class="detail">${totalAttempts} tentativa(s)</span></div>
      </div>
      <article class="card review-card">
        <div>
          <div class="row between"><span class="badge primary">${esc(card.topic)}</span><span class="helper">Cartão ${idx + 1}/${cards.length}</span></div>
          <div class="review-question">${esc(card.q)}</div>
          <div id="review-answer" class="review-answer"><strong>Resposta</strong><p>${esc(card.a)}</p></div>
        </div>
        <div class="row between">
          <button id="reveal-review" class="button" type="button">Revelar resposta</button>
          <div class="row">
            <button class="button secondary" type="button" data-review-result="wrong" disabled>Preciso revisar</button>
            <button class="button secondary" type="button" data-review-result="correct" disabled>Lembrei</button>
            <button id="next-review" class="button ghost" type="button">Próximo →</button>
          </div>
        </div>
      </article>
      <div class="callout info" style="max-width:760px;margin:16px auto 0"><strong>Como usar</strong><br>Tente responder em voz alta antes de revelar. Se errou, volte ao bloco semanal correspondente e escreva uma frase explicando o conceito com suas próprias palavras.</div>
    `;

    const reveal = $("#reveal-review");
    const answer = $("#review-answer");
    reveal?.addEventListener("click", () => {
      answer?.classList.add("is-visible");
      $$('[data-review-result]').forEach(btn => btn.disabled = false);
      reveal.disabled = true;
    });
    $("#next-review")?.addEventListener("click", () => nextReviewCard());
    $$('[data-review-result]').forEach(button => {
      button.addEventListener("click", () => {
        if (button.dataset.reviewResult === "correct") state.reviewStats.correct += 1;
        else state.reviewStats.wrong += 1;
        saveState();
        nextReviewCard();
      });
    });
  }

  function nextReviewCard() {
    let next = Math.floor(Math.random() * DATA.reviewCards.length);
    if (DATA.reviewCards.length > 1 && next === state.reviewIndex) next = (next + 1) % DATA.reviewCards.length;
    state.reviewIndex = next;
    saveState();
    renderReview();
  }

  function renderCourse() {
    const c = DATA.course;
    const attendance = attendanceData();
    rootCourse().innerHTML = `
      <div class="callout warning"><strong>Leitura importante sobre as fontes</strong><br>O cronograma é de <strong>2026/2</strong>, mas o plano de ensino fornecido é de <strong>2026/1</strong>. A plataforma usa o cronograma para datas e o plano para regras institucionais disponíveis, sempre exibindo essa diferença para evitar tratá-las como se fossem o mesmo documento.</div>

      <div class="grid four" style="margin-bottom:18px">
        <div class="card stat-card"><span class="label">Créditos</span><span class="value">${c.credits}</span><span class="detail">Plano 2026/1</span></div>
        <div class="card stat-card"><span class="label">Carga total</span><span class="value">${c.totalHours}h</span><span class="detail">${c.collectiveHours}h coletivas + ${c.autonomousHours}h autônomas</span></div>
        <div class="card stat-card"><span class="label">Encontros</span><span class="value">${c.meetings}</span><span class="detail">100 min por encontro</span></div>
        <div class="card stat-card"><span class="label">Presença mínima</span><span class="value">${c.attendanceMinimum}%</span><span class="detail">Situação atual equivalente: ${attendance.percent.toFixed(1)}%</span></div>
      </div>

      <div class="grid two" style="margin-bottom:18px">
        <section class="card">
          <p class="eyebrow">Síntese cruzada</p>
          <h2>Rastreabilidade das fontes</h2>
          <div class="table-wrap"><table><thead><tr><th>Fonte</th><th>Papel</th><th>Conclusão usada</th></tr></thead><tbody>
            ${c.sourceReconciliation.map(row => `<tr><td><strong>${esc(row.source)}</strong></td><td>${esc(row.role)}</td><td>${esc(row.finding)}</td></tr>`).join("")}
          </tbody></table></div>
        </section>
        <section class="card">
          <p class="eyebrow">Objetivos</p>
          <h2>Competências esperadas</h2>
          <ul>${c.objectives.map(item => `<li>${esc(item)}</li>`).join("")}</ul>
          <h3 style="margin-top:20px">Metodologia</h3>
          <ul>${c.methodology.map(item => `<li>${esc(item)}</li>`).join("")}</ul>
        </section>
      </div>

      <section class="card" style="margin-bottom:18px">
        <p class="eyebrow">Conteúdo programático do plano</p>
        <h2>Macroestrutura acadêmica</h2>
        <div class="table-wrap"><table><thead><tr><th>Semana</th><th>Bloco</th><th>Conteúdo</th></tr></thead><tbody>
          ${c.syllabus.map(row => `<tr><td>${esc(row.range)}</td><td><strong>${esc(row.title)}</strong></td><td>${esc(row.content)}</td></tr>`).join("")}
        </tbody></table></div>
      </section>

      <div class="grid two" style="margin-bottom:18px">
        <section class="card">
          <p class="eyebrow">Avaliação</p>
          <h2>Pesos do plano fornecido</h2>
          <div class="table-wrap"><table><thead><tr><th>Componente</th><th>Peso</th></tr></thead><tbody>
            ${c.evaluation.map(item => `<tr><td>${esc(item.label)}</td><td>${Math.round(item.weight * 100)}%</td></tr>`).join("")}
          </tbody></table></div>
          <div class="formula-block" style="margin-top:12px">NF = (3·P1 + 4·P2 + 2·AP + 1·AA) / 10</div>
          <p class="helper">Conceitos: A ≥ 9,0; B ≥ 7,5; C ≥ 6,0; D &lt; 6,0. Aprovação exige A, B ou C e presença mínima de 75%.</p>
        </section>
        <section class="card">
          <p class="eyebrow">Recuperação</p>
          <h2>Inconsistência no documento</h2>
          <div class="callout danger"><strong>Não automatizamos uma regra ambígua</strong><br>${esc(c.recoveryConflict.formulaText)} ${esc(c.recoveryConflict.proseText)}</div>
          <p>${esc(c.recoveryConflict.recommendation)}</p>
          <p class="helper">Essa divergência foi preservada em vez de “corrigida” silenciosamente, porque a plataforma está fundamentada nos materiais fornecidos.</p>
        </section>
      </div>

      <div class="grid two">
        <section class="card">
          <p class="eyebrow">Bibliografia</p>
          <h2>Referências do plano</h2>
          ${c.bibliography.map(item => `<div style="margin-bottom:14px"><span class="badge">${esc(item.kind)}</span><p>${esc(item.citation)}</p></div>`).join("")}
        </section>
        <section class="card">
          <p class="eyebrow">Integridade acadêmica</p>
          <h2>Uso de IA e materiais</h2>
          <p>O plano fornecido proíbe o uso de ferramentas de IA em tarefas e atividades avaliativas, salvo autorização explícita e guiada do professor. O documento também restringe redistribuição de materiais didáticos quando a licença não permitir.</p>
          <div class="callout info"><strong>Como esta plataforma lida com isso</strong><br>Ela incorpora uma síntese didática original e exercícios próprios/parafraseados para estudo, sem redistribuir os PDFs integrais. Em qualquer atividade oficial, prevalecem as instruções do professor e do Moodle.</div>
        </section>
      </div>
    `;
  }

  function rootCourse() {
    return $("#course-root");
  }

  function renderSettings() {
    const root = $("#settings-root");
    const notesCount = Object.values(state.notes).filter(v => String(v).trim()).length;
    const bookmarksCount = Object.values(state.bookmarks).filter(Boolean).length;
    const solved = exerciseProgress().solved;
    root.innerHTML = `
      <div class="grid three" style="margin-bottom:18px">
        <div class="card stat-card"><span class="label">Semanas com anotações</span><span class="value">${notesCount}</span><span class="detail">Salvas no navegador</span></div>
        <div class="card stat-card"><span class="label">Semanas favoritas</span><span class="value">${bookmarksCount}</span><span class="detail">Filtro rápido da trilha</span></div>
        <div class="card stat-card"><span class="label">Exercícios resolvidos</span><span class="value">${solved}</span><span class="detail">Persistidos localmente</span></div>
      </div>

      <div class="grid two">
        <section class="card">
          <p class="eyebrow">Backup</p>
          <h2>Exportar e importar dados</h2>
          <p>O backup contém apenas seus dados locais da plataforma: notas, faltas, status, checklists, exercícios, favoritos, anotações, tema e estatísticas de revisão.</p>
          <div class="settings-actions">
            <button id="export-data" class="button" type="button">Exportar backup .json</button>
            <label class="button secondary" for="import-data">Importar backup</label>
            <input id="import-data" class="file-input" type="file" accept="application/json,.json">
          </div>
          <div class="callout info"><strong>Privacidade local</strong><br>Não há servidor, conta ou sincronização. O localStorage pertence ao navegador e ao domínio do GitHub Pages.</div>
        </section>

        <section class="card">
          <p class="eyebrow">Aparência e manutenção</p>
          <h2>Preferências</h2>
          <div class="settings-actions" style="margin-bottom:18px">
            <button class="button secondary" type="button" data-set-theme="light">Tema claro</button>
            <button class="button secondary" type="button" data-set-theme="dark">Tema escuro</button>
          </div>
          <h3>Reiniciar plataforma</h3>
          <p class="helper">Apaga somente os dados locais desta aplicação neste navegador. Exporte um backup antes se quiser preservar o histórico.</p>
          <button id="reset-data" class="button danger" type="button">Apagar dados locais</button>
        </section>
      </div>

      <section class="card" style="margin-top:18px">
        <p class="eyebrow">Formato do backup</p>
        <h2>Portabilidade</h2>
        <p>O arquivo exportado inclui <code>app</code>, <code>version</code>, <code>exportedAt</code> e <code>state</code>. Na importação, a aplicação preserva apenas chaves reconhecidas e mescla com padrões seguros.</p>
      </section>
    `;

    $("#export-data")?.addEventListener("click", exportBackup);
    $("#import-data")?.addEventListener("change", importBackup);
    $("#reset-data")?.addEventListener("click", resetData);
    $$('[data-set-theme]').forEach(button => button.addEventListener("click", () => setTheme(button.dataset.setTheme)));
  }

  function exportBackup() {
    const payload = {
      app: "INF05028 Study Platform",
      version: DATA.meta.appVersion,
      exportedAt: new Date().toISOString(),
      state
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `inf05028-backup-${date}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast("Backup exportado.");
  }

  async function importBackup(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const incoming = parsed.state || parsed;
      if (!incoming || typeof incoming !== "object") throw new Error("Formato inválido");
      state = mergeState(DEFAULT_STATE, incoming);
      saveState();
      applyTheme();
      renderAll();
      showToast("Backup importado com sucesso.");
    } catch (error) {
      console.error(error);
      showToast("Não foi possível importar este arquivo.");
    } finally {
      event.target.value = "";
    }
  }

  function resetData() {
    if (!window.confirm("Apagar notas, faltas, checklists, exercícios e anotações salvos neste navegador?")) return;
    state = clone(DEFAULT_STATE);
    localStorage.removeItem(STORAGE_KEY);
    applyTheme();
    renderAll();
    showView("dashboard");
    showToast("Dados locais apagados.");
  }

  function setTheme(theme) {
    state.theme = theme === "dark" ? "dark" : "light";
    saveState();
    applyTheme();
    showToast(state.theme === "dark" ? "Tema escuro ativado." : "Tema claro ativado.");
  }

  function applyTheme() {
    document.documentElement.dataset.theme = state.theme === "dark" ? "dark" : "light";
  }

  function toggleTheme() {
    setTheme(state.theme === "dark" ? "light" : "dark");
  }

  function showView(view, updateHash = true) {
    const valid = ["dashboard", "weeks", "review", "course", "settings"];
    if (!valid.includes(view)) view = "dashboard";
    state.lastView = view;
    saveState();
    $$('[data-view-panel]').forEach(panel => panel.classList.toggle("is-active", panel.dataset.viewPanel === view));
    $$('[data-view]').forEach(button => button.classList.toggle("is-active", button.dataset.view === view));
    if (updateHash && location.hash !== `#${view}`) history.replaceState(null, "", `#${view}`);
    $("#app-main")?.focus({ preventScroll: true });
  }

  function updateSidebarProgress() {
    const progress = studyProgress();
    const label = $("#sidebar-progress-label");
    const bar = $("#sidebar-progress-bar");
    if (label) label.textContent = formatPercent(progress);
    if (bar) bar.style.width = `${progress}%`;
  }

  function showToast(message) {
    const toast = $("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
  }

  function bindGlobalEvents() {
    $$(".nav-item").forEach(button => button.addEventListener("click", () => showView(button.dataset.view)));
    $("#theme-toggle")?.addEventListener("click", toggleTheme);

    $("#week-filter")?.addEventListener("change", event => {
      activeFilter = event.target.value;
      renderWeeks();
    });

    $("#expand-current-week")?.addEventListener("click", () => {
      const current = currentWeek();
      if (current) jumpToWeek(current.id);
      else showToast("Não há bloco atual no calendário de 2026/2.");
    });

    $("#global-search")?.addEventListener("input", event => {
      searchQuery = event.target.value;
      if (searchQuery.trim()) showView("weeks");
      renderWeeks();
    });

    document.addEventListener("click", event => {
      const viewLink = event.target.closest('[data-view-link]');
      if (viewLink) showView(viewLink.dataset.viewLink);
      const jump = event.target.closest('[data-jump-week]');
      if (jump) jumpToWeek(Number(jump.dataset.jumpWeek));
    });

    window.addEventListener("hashchange", () => {
      const view = location.hash.replace("#", "");
      if (view) showView(view, false);
    });
  }

  function renderAll() {
    renderDashboard();
    renderWeeks();
    renderReview();
    renderCourse();
    renderSettings();
    updateSidebarProgress();
  }

  function init() {
    applyTheme();
    renderAll();
    bindGlobalEvents();
    const hashView = location.hash.replace("#", "");
    showView(hashView || state.lastView || "dashboard", false);
  }

  init();
})();
