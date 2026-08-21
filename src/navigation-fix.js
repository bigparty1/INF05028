(() => {
  "use strict";

  const DATA = window.STUDY_DATA;
  const EXAMS = window.EXAM_DATA || [];
  const EXERCISES_HASH = "#exercises";
  const CORE_KEY = "inf05028.study.platform.v2";
  const AUX_KEY = "inf05028.study.platform.enhancements.v1";

  if (!DATA) return;

  let exerciseSearch = "";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function esc(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function readJson(key, fallback = {}) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      return parsed && typeof parsed === "object" ? parsed : structuredClone(fallback);
    } catch (_) {
      return structuredClone(fallback);
    }
  }

  function readState() {
    const core = readJson(CORE_KEY, {});
    const aux = readJson(AUX_KEY, { checklistNotes: {}, exerciseNotes: {}, examSolved: {} });
    core.exercises = core.exercises || {};
    aux.exerciseNotes = aux.exerciseNotes || {};
    aux.examSolved = aux.examSolved || {};
    return { core, aux };
  }

  function saveAux(aux) {
    localStorage.setItem(AUX_KEY, JSON.stringify(aux));
  }

  function saveCore(core) {
    localStorage.setItem(CORE_KEY, JSON.stringify(core));
  }

  function weeklyRefs() {
    return (DATA.weeks || []).flatMap(week => (week.exercises || []).map((exercise, index) => ({
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
    return EXAMS.flatMap(exam => (exam.questions || []).map((exercise, index) => ({
      kind: "exam",
      groupId: exam.id,
      groupLabel: `${exam.term} · ${exam.title}`,
      groupMeta: `${exam.date} · ${exam.course}`,
      exam,
      exercise,
      index
    })));
  }

  function allRefs() {
    return [...weeklyRefs(), ...examRefs()];
  }

  function isSolved(id, state) {
    return Boolean(state.core.exercises?.[id] || state.aux.examSolved?.[id]);
  }

  function noteFor(id, state) {
    return state.aux.exerciseNotes?.[id] || "";
  }

  function populateExamFilter() {
    const select = $("#exercise-exam-filter");
    if (!select) return;
    const current = select.value || "all";
    select.innerHTML = `<option value="all">Todas as provas</option>${EXAMS.map(exam => `<option value="${esc(exam.id)}">${esc(exam.term)} · ${esc(exam.title)}</option>`).join("")}`;
    if (Array.from(select.options).some(option => option.value === current)) select.value = current;
  }

  function renderExerciseCard(exercise, number, ref, state) {
    const solved = isSolved(exercise.id, state);
    const note = noteFor(exercise.id, state);
    const contextBadge = ref.kind === "weekly" ? `Semana ${ref.week.id}` : ref.exam.term;
    return `
      <article class="exercise" data-global-exercise-card="${esc(exercise.id)}">
        <div class="exercise-head">
          <div>
            <div class="exercise-meta">
              <span class="badge primary">${esc(exercise.difficulty || "Exercício")}</span>
              <span class="badge">${esc(exercise.origin || contextBadge)}</span>
              <span class="badge">${esc(contextBadge)}</span>
            </div>
            <h4>${number}. ${esc(exercise.title || "Exercício")}</h4>
          </div>
          <label class="check-row">
            <input type="checkbox" data-runtime-exercise-id="${esc(exercise.id)}" ${solved ? "checked" : ""}>
            <span class="helper">Resolvido</span>
          </label>
        </div>
        <p class="exercise-text">${esc(exercise.prompt || "")}</p>
        ${exercise.hint ? `<details><summary>Dica</summary><p class="exercise-text">${esc(exercise.hint)}</p></details>` : ""}
        ${exercise.solution ? `<details><summary>Solução comentada</summary><p class="exercise-text">${esc(exercise.solution)}</p></details>` : ""}
        <details class="exercise-note-wrap" ${note ? "open" : ""}>
          <summary>Anotações <span class="note-indicator" ${note ? "" : "hidden"}></span></summary>
          <textarea data-runtime-exercise-note="${esc(exercise.id)}" placeholder="Registre sua tentativa, dúvidas, erros ou uma solução alternativa…">${esc(note)}</textarea>
        </details>
      </article>`;
  }

  function renderExercises() {
    const root = $("#exercises-root");
    if (!root) return;

    populateExamFilter();
    const state = readState();
    const source = $("#exercise-source-filter")?.value || "all";
    const status = $("#exercise-status-filter")?.value || "all";
    const examId = $("#exercise-exam-filter")?.value || "all";
    const q = exerciseSearch.trim().toLocaleLowerCase("pt-BR");
    const all = allRefs();

    const refs = all.filter(ref => {
      if (source === "weekly" && ref.kind !== "weekly") return false;
      if (source === "exams" && ref.kind !== "exam") return false;
      if (examId !== "all" && (ref.kind !== "exam" || ref.exam.id !== examId)) return false;
      const solved = isSolved(ref.exercise.id, state);
      if (status === "solved" && !solved) return false;
      if (status === "pending" && solved) return false;
      if (q) {
        const haystack = `${ref.groupLabel} ${ref.exercise.title || ""} ${ref.exercise.prompt || ""} ${ref.exercise.origin || ""}`.toLocaleLowerCase("pt-BR");
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    const solvedTotal = all.filter(ref => isSolved(ref.exercise.id, state)).length;
    const notesTotal = all.filter(ref => noteFor(ref.exercise.id, state).trim()).length;
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
      <div class="row between" style="margin-bottom:10px">
        <span class="helper">${refs.length} exercício(s) exibido(s)</span>
        ${q ? `<span class="badge primary">Busca: “${esc(exerciseSearch)}”</span>` : ""}
      </div>
      ${refs.length ? Array.from(groups.values()).map(group => {
        const ref = group.ref;
        const meta = ref.kind === "exam"
          ? `<span class="helper">Arquivo-fonte: ${esc(ref.exam.file || "prova histórica")}</span>`
          : `<span class="helper">${esc(ref.groupMeta || "")}</span>`;
        return `
          <section class="exercise-group">
            <div class="exercise-group-heading">
              <div><h2 style="margin:0">${esc(ref.groupLabel)}</h2>${meta}</div>
              <span class="badge">${group.items.length} questão(ões)</span>
            </div>
            <div class="exercise-list">${group.items.map((item, idx) => renderExerciseCard(item.exercise, idx + 1, item, state)).join("")}</div>
          </section>`;
      }).join("") : `<div class="empty-state"><h2>Nenhum exercício encontrado</h2><p>Ajuste os filtros ou a busca.</p></div>`}
    `;
  }

  function activateExercises({ updateHash = true } = {}) {
    const panel = $("#view-exercises");
    const nav = $('[data-view="exercises"]');
    if (!panel || !nav) return;

    $$('[data-view-panel]').forEach(item => item.classList.toggle("is-active", item === panel));
    $$('[data-view]').forEach(item => item.classList.toggle("is-active", item === nav));

    if (updateHash && location.hash !== EXERCISES_HASH) {
      history.replaceState(null, "", EXERCISES_HASH);
    }

    renderExercises();
    $("#app-main")?.focus({ preventScroll: true });
  }

  function setSolved(id, checked) {
    const weeklyInput = $(`#view-weeks [data-exercise-id="${CSS.escape(id)}"]`);
    if (weeklyInput) {
      weeklyInput.checked = checked;
      weeklyInput.dispatchEvent(new Event("change", { bubbles: true }));
      return;
    }

    const state = readState();
    state.core.exercises[id] = checked;
    if (id.startsWith("exam-")) state.aux.examSolved[id] = checked;
    saveCore(state.core);
    saveAux(state.aux);
  }

  function setNote(id, value, textarea) {
    const state = readState();
    state.aux.exerciseNotes[id] = value;
    saveAux(state.aux);
    const indicator = textarea.closest("details")?.querySelector(".note-indicator");
    if (indicator) indicator.hidden = !value.trim();
  }

  function installEvents() {
    document.addEventListener("click", event => {
      if (!event.target.closest('[data-view="exercises"]')) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      activateExercises();
    }, true);

    ["exercise-source-filter", "exercise-status-filter", "exercise-exam-filter"].forEach(id => {
      $("#" + id)?.addEventListener("change", event => {
        event.stopImmediatePropagation();
        renderExercises();
      }, true);
    });

    $("#global-search")?.addEventListener("input", event => {
      if (!$("#view-exercises")?.classList.contains("is-active")) return;
      event.stopImmediatePropagation();
      exerciseSearch = event.target.value;
      renderExercises();
    }, true);

    document.addEventListener("change", event => {
      const input = event.target.closest("[data-runtime-exercise-id]");
      if (!input) return;
      setSolved(input.dataset.runtimeExerciseId, input.checked);
      renderExercises();
    });

    document.addEventListener("input", event => {
      const textarea = event.target.closest("[data-runtime-exercise-note]");
      if (!textarea) return;
      setNote(textarea.dataset.runtimeExerciseNote, textarea.value, textarea);
    });

    window.addEventListener("hashchange", () => {
      if (location.hash !== EXERCISES_HASH) return;
      setTimeout(() => activateExercises({ updateHash: false }), 0);
    });
  }

  function boot() {
    populateExamFilter();
    installEvents();
    if (location.hash === EXERCISES_HASH) {
      setTimeout(() => activateExercises({ updateHash: false }), 0);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
