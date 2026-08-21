(() => {
  "use strict";

  const DATA = window.STUDY_DATA;
  const EXAMS = window.EXAM_DATA || [];
  const CORE_KEY = "inf05028.study.platform.v2";
  const AUX_KEY = "inf05028.study.platform.enhancements.v1";
  const AUX_DEFAULT = { checklistNotes: {}, exerciseNotes: {} };
  let exerciseSearch = "";
  let renderTimer = null;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function esc(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function readJson(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value && typeof value === "object" ? value : clone(fallback);
    } catch (_) { return clone(fallback); }
  }

  function readCore() {
    const state = readJson(CORE_KEY, {});
    state.exercises = state.exercises || {};
    return state;
  }

  function writeCore(state) { localStorage.setItem(CORE_KEY, JSON.stringify(state)); }

  function readAux() {
    const state = readJson(AUX_KEY, AUX_DEFAULT);
    state.checklistNotes = state.checklistNotes || {};
    state.exerciseNotes = state.exerciseNotes || {};
    return state;
  }

  function writeAux(state) { localStorage.setItem(AUX_KEY, JSON.stringify(state)); }

  function isExercisesView() { return $("#view-exercises")?.classList.contains("is-active"); }

  function showExercisesView() {
    $$('[data-view-panel]').forEach(panel => panel.classList.toggle("is-active", panel.dataset.viewPanel === "exercises"));
    $$('[data-view]').forEach(button => button.classList.toggle("is-active", button.dataset.view === "exercises"));
    history.replaceState(null, "", "#exercises");
    renderExercises();
    $("#app-main")?.focus({ preventScroll: true });
  }

  function weeklyRefs() {
    return DATA.weeks.flatMap(week => week.exercises.map((exercise, index) => ({
      kind: "weekly",
      groupId: `week-${week.id}`,
      groupLabel: `Semana ${week.id} · ${week.title}`,
      groupMeta: week.label,
      week,
      exercise,
      index
    })));
  }

  function examRefs() {
    return EXAMS.flatMap(exam => exam.questions.map((exercise, index) => ({
      kind: "exam",
      groupId: exam.id,
      groupLabel: `${exam.term} · ${exam.title}`,
      groupMeta: `${exam.date} · ${exam.course}`,
      exam,
      exercise,
      index
    })));
  }

  function allExerciseRefs() { return [...weeklyRefs(), ...examRefs()]; }

  function isSolved(id) { return Boolean(readCore().exercises?.[id]); }

  function setSolved(id, checked) {
    const weekly = $(`#view-weeks [data-exercise-id="${CSS.escape(id)}"]`);
    if (weekly) {
      weekly.checked = checked;
      weekly.dispatchEvent(new Event("change", { bubbles: true }));
    } else {
      const core = readCore();
      core.exercises[id] = checked;
      writeCore(core);
    }
    $$(`[data-global-exercise-id="${CSS.escape(id)}"]`).forEach(input => input.checked = checked);
  }

  function noteForExercise(id) { return readAux().exerciseNotes[id] || ""; }
  function noteForChecklist(id) { return readAux().checklistNotes[id] || ""; }

  function setExerciseNote(id, value) {
    const aux = readAux();
    aux.exerciseNotes[id] = value;
    writeAux(aux);
    updateNoteIndicators(id, value, "exercise");
  }

  function setChecklistNote(id, value) {
    const aux = readAux();
    aux.checklistNotes[id] = value;
    writeAux(aux);
    updateNoteIndicators(id, value, "checklist");
  }

  function updateNoteIndicators(id, value, type) {
    const selector = type === "exercise"
      ? `[data-exercise-note-indicator="${CSS.escape(id)}"]`
      : `[data-check-note-indicator="${CSS.escape(id)}"]`;
    $$(selector).forEach(el => el.hidden = !value.trim());
  }

  function renderExerciseCard(exercise, number, context) {
    const solved = isSolved(exercise.id);
    const note = noteForExercise(exercise.id);
    const contextBadge = context.kind === "weekly" ? `Semana ${context.week.id}` : context.exam.term;
    return `
      <article class="exercise" data-global-exercise-card="${esc(exercise.id)}">
        <div class="exercise-head">
          <div>
            <div class="exercise-meta">
              <span class="badge primary">${esc(exercise.difficulty || "Exercício")}</span>
              <span class="badge">${esc(exercise.origin || contextBadge)}</span>
              <span class="badge">${esc(contextBadge)}</span>
            </div>
            <h4>${number}. ${esc(exercise.title)}</h4>
          </div>
          <label class="check-row"><input type="checkbox" data-global-exercise-id="${esc(exercise.id)}" ${solved ? "checked" : ""}><span class="helper">Resolvido</span></label>
        </div>
        <p class="exercise-text">${esc(exercise.prompt)}</p>
        ${exercise.hint ? `<details><summary>Dica</summary><p class="exercise-text">${esc(exercise.hint)}</p></details>` : ""}
        ${exercise.solution ? `<details><summary>Solução comentada</summary><p class="exercise-text">${esc(exercise.solution)}</p></details>` : ""}
        <details class="exercise-note-wrap" ${note ? "open" : ""}>
          <summary>Anotações <span class="note-indicator" data-exercise-note-indicator="${esc(exercise.id)}" ${note ? "" : "hidden"}></span></summary>
          <textarea data-exercise-note="${esc(exercise.id)}" placeholder="Registre sua tentativa, dúvidas, erros ou uma solução alternativa…">${esc(note)}</textarea>
        </details>
      </article>`;
  }

  function populateExamFilter() {
    const select = $("#exercise-exam-filter");
    if (!select || select.dataset.ready) return;
    select.insertAdjacentHTML("beforeend", EXAMS.map(exam => `<option value="${esc(exam.id)}">${esc(exam.term)} · ${esc(exam.title)}</option>`).join(""));
    select.dataset.ready = "1";
  }

  function renderExercises() {
    const root = $("#exercises-root");
    if (!root) return;
    populateExamFilter();
    const source = $("#exercise-source-filter")?.value || "all";
    const status = $("#exercise-status-filter")?.value || "all";
    const examId = $("#exercise-exam-filter")?.value || "all";
    const q = exerciseSearch.trim().toLocaleLowerCase("pt-BR");

    let refs = allExerciseRefs().filter(ref => {
      if (source === "weekly" && ref.kind !== "weekly") return false;
      if (source === "exams" && ref.kind !== "exam") return false;
      if (examId !== "all" && (ref.kind !== "exam" || ref.exam.id !== examId)) return false;
      const solved = isSolved(ref.exercise.id);
      if (status === "solved" && !solved) return false;
      if (status === "pending" && solved) return false;
      if (q) {
        const haystack = `${ref.groupLabel} ${ref.exercise.title} ${ref.exercise.prompt} ${ref.exercise.origin || ""}`.toLocaleLowerCase("pt-BR");
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    const all = allExerciseRefs();
    const solvedTotal = all.filter(ref => isSolved(ref.exercise.id)).length;
    const notesTotal = all.filter(ref => noteForExercise(ref.exercise.id).trim()).length;
    const groups = new Map();
    refs.forEach(ref => {
      if (!groups.has(ref.groupId)) groups.set(ref.groupId, { ref, items: [] });
      groups.get(ref.groupId).items.push(ref);
    });

    root.innerHTML = `
      <div class="exercise-stats">
        <div class="card stat-card"><span class="label">Banco completo</span><span class="value">${all.length}</span><span class="detail">${weeklyRefs().length} da trilha + ${examRefs().length} de provas</span></div>
        <div class="card stat-card"><span class="label">Resolvidos</span><span class="value">${solvedTotal}</span><span class="detail">Status compartilhado com a trilha semanal</span></div>
        <div class="card stat-card"><span class="label">Com anotações</span><span class="value">${notesTotal}</span><span class="detail">Notas persistidas neste navegador</span></div>
      </div>
      <div class="row between" style="margin-bottom:10px"><span class="helper">${refs.length} exercício(s) exibido(s)</span>${q ? `<span class="badge primary">Busca: “${esc(exerciseSearch)}”</span>` : ""}</div>
      ${refs.length ? Array.from(groups.values()).map(group => {
        const ref = group.ref;
        const fileMeta = ref.kind === "exam" ? `<span class="helper">Arquivo-fonte: ${esc(ref.exam.file)}</span>` : `<span class="helper">${esc(ref.groupMeta)}</span>`;
        return `<section class="exercise-group"><div class="exercise-group-heading"><div><h2 style="margin:0">${esc(ref.groupLabel)}</h2>${fileMeta}</div><span class="badge">${group.items.length} questão(ões)</span></div><div class="exercise-list">${group.items.map((item, idx) => renderExerciseCard(item.exercise, idx + 1, item)).join("")}</div></section>`;
      }).join("") : `<div class="empty-state"><h2>Nenhum exercício encontrado</h2><p>Ajuste os filtros ou a busca.</p></div>`}
    `;
    typeset(root);
  }

  function enhanceWeekHeaders(root = document) {
    $$(".week-summary:not([data-header-enhanced])", root).forEach(header => {
      const card = header.closest("[data-week-card]");
      if (!card) return;
      header.dataset.headerEnhanced = "1";
      header.dataset.weekHeader = card.dataset.weekCard;
      header.setAttribute("role", "button");
      header.setAttribute("tabindex", "0");
      header.setAttribute("aria-expanded", String(card.classList.contains("is-open")));
    });
  }

  function enhanceChecklists(root = document) {
    $$("#view-weeks .checklist label:not([data-checklist-processed])", root).forEach(label => {
      const checkbox = label.querySelector("[data-check-id]");
      if (!checkbox) return;
      const id = checkbox.dataset.checkId;
      const text = label.querySelector("span")?.textContent || label.textContent.trim();
      const note = noteForChecklist(id);
      const entry = document.createElement("div");
      entry.className = `checklist-entry${note ? " is-open" : ""}`;
      entry.dataset.checklistEntry = id;
      const main = document.createElement("div");
      main.className = "checklist-main";
      main.dataset.checklistToggle = id;
      main.setAttribute("role", "button");
      main.setAttribute("tabindex", "0");
      main.setAttribute("aria-expanded", String(Boolean(note)));
      checkbox.setAttribute("aria-label", text);
      const textSpan = document.createElement("span");
      textSpan.className = "checklist-text";
      textSpan.textContent = text;
      const icon = document.createElement("span");
      icon.className = "checklist-expand-icon";
      icon.innerHTML = `⌄ <span class="note-indicator" data-check-note-indicator="${esc(id)}" ${note ? "" : "hidden"}></span>`;
      main.append(checkbox, textSpan, icon);
      const noteWrap = document.createElement("div");
      noteWrap.className = "checklist-note";
      const textarea = document.createElement("textarea");
      textarea.dataset.checklistNote = id;
      textarea.placeholder = "Adicione observações, dúvidas ou detalhes deste item…";
      textarea.value = note;
      noteWrap.append(textarea);
      entry.append(main, noteWrap);
      label.replaceWith(entry);
    });
  }

  function enhanceWeeklyExerciseNotes(root = document) {
    $$("#view-weeks .exercise:not([data-notes-enhanced])", root).forEach(card => {
      const input = card.querySelector("[data-exercise-id]");
      if (!input) return;
      const id = input.dataset.exerciseId;
      const note = noteForExercise(id);
      card.dataset.notesEnhanced = "1";
      card.insertAdjacentHTML("beforeend", `<details class="exercise-note-wrap" ${note ? "open" : ""}><summary>Anotações <span class="note-indicator" data-exercise-note-indicator="${esc(id)}" ${note ? "" : "hidden"}></span></summary><textarea data-exercise-note="${esc(id)}" placeholder="Registre sua tentativa, dúvidas, erros ou uma solução alternativa…">${esc(note)}</textarea></details>`);
    });
  }

  const supers = { "⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","ⁿ":"n" };
  const subs = { "₀":"0","₁":"1","₂":"2","₃":"3","₄":"4","₅":"5","₆":"6","₇":"7","₈":"8","₉":"9" };
  function replaceRuns(text, map, marker) {
    const chars = Object.keys(map).join("");
    return text.replace(new RegExp(`[${chars}]+`, "g"), run => `${marker}{${Array.from(run).map(c => map[c]).join("")}}`);
  }
  function toLatex(value) {
    let s = String(value || "");
    s = replaceRuns(s, supers, "^");
    s = replaceRuns(s, subs, "_");
    return s
      .replaceAll("Θ", "\\Theta ")
      .replaceAll("Ω", "\\Omega ")
      .replaceAll("ω", "\\omega ")
      .replaceAll("α", "\\alpha ")
      .replaceAll("δ", "\\delta ")
      .replaceAll("π", "\\pi ")
      .replaceAll("∞", "\\infty ")
      .replaceAll("≤", "\\le ")
      .replaceAll("≥", "\\ge ")
      .replaceAll("≠", "\\ne ")
      .replaceAll("∈", "\\in ")
      .replaceAll("∉", "\\notin ")
      .replaceAll("→", "\\to ")
      .replaceAll("·", "\\cdot ")
      .replaceAll("≈", "\\approx ")
      .replace(/√\s*\(?([^,.;)]+)/g, "\\sqrt{$1}");
  }

  function enhanceMath(root = document) {
    $$(".formula-block:not([data-math-enhanced])", root).forEach(block => {
      const raw = block.textContent.trim();
      block.dataset.mathEnhanced = "1";
      block.textContent = `\\[${toLatex(raw)}\\]`;
    });
    typeset(root);
  }

  function typeset(root = document) {
    if (window.MathJax?.typesetPromise) {
      window.MathJax.typesetPromise([root]).catch(() => {});
    } else {
      clearTimeout(renderTimer);
      renderTimer = setTimeout(() => window.MathJax?.typesetPromise?.([root]).catch(() => {}), 300);
    }
  }

  function syncHeaderState(card) {
    const header = card?.querySelector(".week-summary");
    if (header) header.setAttribute("aria-expanded", String(card.classList.contains("is-open")));
  }

  function toggleChecklist(entry) {
    if (!entry) return;
    const open = !entry.classList.contains("is-open");
    entry.classList.toggle("is-open", open);
    entry.querySelector(".checklist-main")?.setAttribute("aria-expanded", String(open));
    if (open) entry.querySelector("textarea")?.focus({ preventScroll: true });
  }

  function installInteractions() {
    const exNav = $('[data-view="exercises"]');
    exNav?.addEventListener("click", event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      showExercisesView();
    }, true);

    ["exercise-source-filter", "exercise-status-filter", "exercise-exam-filter"].forEach(id => {
      $("#" + id)?.addEventListener("change", renderExercises);
    });

    $("#global-search")?.addEventListener("input", event => {
      if (!isExercisesView()) return;
      event.stopImmediatePropagation();
      exerciseSearch = event.target.value;
      renderExercises();
    }, true);

    document.addEventListener("click", event => {
      const header = event.target.closest(".week-summary[data-week-header]");
      if (header && !event.target.closest("button,select,input,label,textarea,a,summary,details")) {
        header.querySelector("[data-toggle-week]")?.click();
        requestAnimationFrame(() => syncHeaderState(header.closest(".week-card")));
        return;
      }
      const checklistMain = event.target.closest("[data-checklist-toggle]");
      if (checklistMain && !event.target.closest("input")) toggleChecklist(checklistMain.closest(".checklist-entry"));
    });

    document.addEventListener("keydown", event => {
      const header = event.target.closest(".week-summary[data-week-header]");
      if (header && (event.key === "Enter" || event.key === " ") && !event.target.closest("button,select,input,textarea,a")) {
        event.preventDefault();
        header.querySelector("[data-toggle-week]")?.click();
        requestAnimationFrame(() => syncHeaderState(header.closest(".week-card")));
      }
      const checklistMain = event.target.closest("[data-checklist-toggle]");
      if (checklistMain && (event.key === "Enter" || event.key === " ") && event.target === checklistMain) {
        event.preventDefault();
        toggleChecklist(checklistMain.closest(".checklist-entry"));
      }
    });

    document.addEventListener("input", event => {
      if (event.target.matches("[data-checklist-note]")) setChecklistNote(event.target.dataset.checklistNote, event.target.value);
      if (event.target.matches("[data-exercise-note]")) setExerciseNote(event.target.dataset.exerciseNote, event.target.value);
    });

    document.addEventListener("change", event => {
      if (event.target.matches("[data-global-exercise-id]")) {
        setSolved(event.target.dataset.globalExerciseId, event.target.checked);
        renderExercises();
      } else if (event.target.matches("#view-weeks [data-exercise-id]")) {
        $$(`[data-global-exercise-id="${CSS.escape(event.target.dataset.exerciseId)}"]`).forEach(input => input.checked = event.target.checked);
        if (isExercisesView()) renderExercises();
      }
    });

    const exportButton = $("#export-data");
    exportButton?.addEventListener("click", event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const payload = { app: "INF05028 Study Platform", version: "2.1-enhanced", exportedAt: new Date().toISOString(), state: readCore(), enhancements: readAux() };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `inf05028-backup-${new Date().toISOString().slice(0,10)}.json`;
      document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    }, true);

    const importInput = $("#import-data");
    importInput?.addEventListener("change", async event => {
      event.stopImmediatePropagation();
      const file = event.target.files?.[0];
      if (!file) return;
      try {
        const parsed = JSON.parse(await file.text());
        const core = parsed.state || parsed;
        if (!core || typeof core !== "object") throw new Error("Formato inválido");
        writeCore(core);
        if (parsed.enhancements && typeof parsed.enhancements === "object") writeAux({ ...clone(AUX_DEFAULT), ...parsed.enhancements });
        location.reload();
      } catch (_) { alert("Não foi possível importar este backup."); }
    }, true);

    $("#reset-data")?.addEventListener("click", () => localStorage.removeItem(AUX_KEY), true);

    window.addEventListener("hashchange", () => {
      if (location.hash === "#exercises") showExercisesView();
    });
  }

  function enhanceAll() {
    enhanceWeekHeaders();
    enhanceChecklists();
    enhanceWeeklyExerciseNotes();
    enhanceMath();
  }

  function observeRenders() {
    const root = $("#app-main");
    if (!root) return;
    const observer = new MutationObserver(() => requestAnimationFrame(enhanceAll));
    observer.observe(root, { childList: true, subtree: true });
  }

  function init() {
    populateExamFilter();
    installInteractions();
    enhanceAll();
    observeRenders();
    if (location.hash === "#exercises") showExercisesView();
    window.addEventListener("load", () => typeset(document));
  }

  init();
})();