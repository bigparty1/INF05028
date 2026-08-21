(() => {
  "use strict";

  const data = window.STUDY_DATA;
  if (!data || !Array.isArray(data.weeks)) return;

  const byId = new Map();
  data.weeks.forEach((week) => {
    (week.exercises || []).forEach((exercise) => {
      if (exercise?.id && exercise?.url) byId.set(exercise.id, exercise);
    });
  });

  if (!byId.size) return;

  function enhance(root = document) {
    root.querySelectorAll?.("article.exercise:not([data-external-link-ready])").forEach((card) => {
      const input = card.querySelector("[data-exercise-id], [data-global-exercise-id]");
      if (!input) return;

      const id = input.dataset.exerciseId || input.dataset.globalExerciseId;
      const exercise = byId.get(id);
      if (!exercise?.url) {
        card.dataset.externalLinkReady = "1";
        return;
      }

      const meta = card.querySelector(".exercise-meta");
      if (!meta) return;

      const link = document.createElement("a");
      link.className = "badge primary";
      link.href = exercise.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Abrir enunciado ↗";
      link.setAttribute("aria-label", `Abrir enunciado original de ${exercise.title}`);
      link.addEventListener("click", (event) => event.stopPropagation());
      meta.appendChild(link);
      card.dataset.externalLinkReady = "1";
    });
  }

  enhance();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches?.("article.exercise") || node.querySelector?.("article.exercise")) enhance(node);
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
