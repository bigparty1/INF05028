(() => {
  "use strict";

  const DATA = window.STUDY_DATA;
  const EXAMS = window.EXAM_DATA || [];
  const AUX_KEY = "inf05028.study.platform.enhancements.v1";

  if (!DATA) return;

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

  function readAux() {
    try {
      const value = JSON.parse(localStorage.getItem(AUX_KEY));
      return value && typeof value === "object" ? value : {};
    } catch (_) {
      return {};
    }
  }

  function writeExerciseNote(id, value) {
    const aux = readAux();
    aux.checklistNotes = aux.checklistNotes || {};
    aux.exerciseNotes = aux.exerciseNotes || {};
    aux.examSolved = aux.examSolved || {};
    aux.exerciseNotes[id] = value;
    localStorage.setItem(AUX_KEY, JSON.stringify(aux));
  }

  function noteFor(id) {
    return readAux().exerciseNotes?.[id] || "";
  }

  function locateExercise(id) {
    for (const week of DATA.weeks || []) {
      const index = (week.exercises || []).findIndex(exercise => exercise.id === id);
      if (index >= 0) {
        return {
          kind: "weekly",
          exercise: week.exercises[index],
          number: index + 1,
          contextLabel: `Semana ${week.id}`,
          week
        };
      }
    }

    for (const exam of EXAMS) {
      const index = (exam.questions || []).findIndex(exercise => exercise.id === id);
      if (index >= 0) {
        return {
          kind: "exam",
          exercise: exam.questions[index],
          number: index + 1,
          contextLabel: exam.term,
          exam
        };
      }
    }

    return null;
  }

  function inputAttribute(mode, id) {
    if (mode === "weekly") return `data-exercise-id="${esc(id)}"`;
    return `data-runtime-exercise-id="${esc(id)}"`;
  }

  function render({ exercise, number, contextLabel, solved = false, note = "", mode = "weekly" }) {
    const hasNote = Boolean(String(note).trim());
    const origin = exercise.origin || contextLabel || "Exercício";
    const difficulty = exercise.difficulty || "Exercício";

    return `
      <article class="exercise" data-exercise-component="1" data-notes-enhanced="1" data-shared-exercise-id="${esc(exercise.id)}">
        <div class="exercise-head">
          <div>
            <div class="exercise-meta">
              <span class="badge primary">${esc(difficulty)}</span>
              <span class="badge">${esc(origin)}</span>
              ${contextLabel ? `<span class="badge">${esc(contextLabel)}</span>` : ""}
            </div>
            <h4>${number}. ${esc(exercise.title || "Exercício")}</h4>
          </div>
          <label class="check-row">
            <input type="checkbox" ${inputAttribute(mode, exercise.id)} ${solved ? "checked" : ""}>
            <span class="helper">Resolvido</span>
          </label>
        </div>
        <p class="exercise-text">${esc(exercise.prompt || "")}</p>
        ${exercise.hint ? `<details><summary>Dica</summary><p class="exercise-text">${esc(exercise.hint)}</p></details>` : ""}
        ${exercise.solution ? `<details><summary>Solução comentada</summary><p class="exercise-text">${esc(exercise.solution)}</p></details>` : ""}
        <details class="exercise-note-wrap">
          <summary>Anotações${hasNote ? ` <span class="note-indicator" data-exercise-note-indicator="${esc(exercise.id)}"></span>` : ""}</summary>
          <textarea data-exercise-note="${esc(exercise.id)}" placeholder="Registre sua tentativa, dúvidas, erros ou uma solução alternativa…">${esc(note)}</textarea>
        </details>
      </article>`;
  }

  function createElement(options) {
    const template = document.createElement("template");
    template.innerHTML = render(options).trim();
    return template.content.firstElementChild;
  }

  function solvedFromExisting(card) {
    return Boolean(card.querySelector('input[type="checkbox"]')?.checked);
  }

  function unifyCard(card, mode) {
    if (!card || card.dataset.exerciseComponent === "1") return;

    const oldInput = card.querySelector('[data-exercise-id], [data-runtime-exercise-id], [data-global-exercise-id]');
    const id = oldInput?.dataset.exerciseId || oldInput?.dataset.runtimeExerciseId || oldInput?.dataset.globalExerciseId;
    if (!id) return;

    const found = locateExercise(id);
    if (!found) return;

    const note = noteFor(id);
    const replacement = createElement({
      exercise: found.exercise,
      number: found.number,
      contextLabel: found.contextLabel,
      solved: solvedFromExisting(card),
      note,
      mode
    });

    // Na trilha semanal o listener de persistência do app.js está ligado
    // diretamente ao checkbox. Movemos o nó original para o novo componente
    // em vez de cloná-lo, preservando esse listener e o estado interno.
    const newInput = replacement.querySelector('input[type="checkbox"]');
    if (oldInput && newInput) {
      const expectedAttr = mode === "weekly" ? "data-exercise-id" : "data-runtime-exercise-id";
      oldInput.removeAttribute("data-global-exercise-id");
      oldInput.removeAttribute("data-runtime-exercise-id");
      oldInput.removeAttribute("data-exercise-id");
      oldInput.setAttribute(expectedAttr, id);
      newInput.replaceWith(oldInput);
    }

    card.replaceWith(replacement);
  }

  function unifyRoot(root, mode) {
    if (!root) return;
    $$(".exercise:not([data-exercise-component='1'])", root).forEach(card => unifyCard(card, mode));
  }

  function unifyAll() {
    unifyRoot($("#view-weeks"), "weekly");
    unifyRoot($("#view-exercises"), "global");
  }

  function setNoteIndicator(textarea) {
    const details = textarea.closest(".exercise-note-wrap");
    const summary = details?.querySelector("summary");
    if (!summary) return;

    const id = textarea.dataset.exerciseNote;
    const shouldExist = Boolean(textarea.value.trim());
    let indicator = summary.querySelector(".note-indicator");

    if (shouldExist && !indicator) {
      indicator = document.createElement("span");
      indicator.className = "note-indicator";
      indicator.dataset.exerciseNoteIndicator = id;
      summary.append(" ", indicator);
    } else if (!shouldExist && indicator) {
      const previous = indicator.previousSibling;
      indicator.remove();
      if (previous?.nodeType === Node.TEXT_NODE && !previous.nodeValue.trim()) previous.remove();
    }
  }

  function installNoteBehavior() {
    document.addEventListener("input", event => {
      const textarea = event.target.closest("[data-exercise-note]");
      if (!textarea) return;
      writeExerciseNote(textarea.dataset.exerciseNote, textarea.value);
      setNoteIndicator(textarea);
    });
  }

  function observe(root, mode) {
    if (!root || !("MutationObserver" in window)) return;
    const observer = new MutationObserver(records => {
      if (!records.some(record => record.addedNodes.length)) return;
      queueMicrotask(() => unifyRoot(root, mode));
    });
    observer.observe(root, { childList: true, subtree: true });
  }

  function init() {
    unifyAll();
    installNoteBehavior();
    observe($("#view-weeks"), "weekly");
    observe($("#view-exercises"), "global");

    // Alguns renderizadores executam em requestAnimationFrame/setTimeout após
    // o carregamento. Uma segunda passagem curta garante a convergência sem
    // manter polling contínuo.
    requestAnimationFrame(unifyAll);
    setTimeout(unifyAll, 0);
  }

  window.ExerciseComponent = {
    render,
    createElement,
    locateExercise,
    noteFor,
    unifyAll
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
