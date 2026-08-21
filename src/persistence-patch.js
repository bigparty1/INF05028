(() => {
  "use strict";
  const CORE_KEY = "inf05028.study.platform.v2";
  const AUX_KEY = "inf05028.study.platform.enhancements.v1";

  function readAux() {
    try {
      const parsed = JSON.parse(localStorage.getItem(AUX_KEY));
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (_) { return {}; }
  }

  function writeAux(value) { localStorage.setItem(AUX_KEY, JSON.stringify(value)); }

  function mergeExamStatusesIntoCore(raw) {
    try {
      const core = JSON.parse(raw);
      if (!core || typeof core !== "object") return raw;
      const statuses = readAux().examSolved || {};
      core.exercises = core.exercises || {};
      Object.assign(core.exercises, statuses);
      return JSON.stringify(core);
    } catch (_) { return raw; }
  }

  const originalSetItem = Storage.prototype.setItem;
  Storage.prototype.setItem = function(key, value) {
    if (this === localStorage && key === CORE_KEY) value = mergeExamStatusesIntoCore(String(value));
    return originalSetItem.call(this, key, value);
  };

  function restoreExamStatuses() {
    const statuses = readAux().examSolved || {};
    if (!Object.keys(statuses).length) return;
    try {
      const core = JSON.parse(localStorage.getItem(CORE_KEY) || "{}");
      core.exercises = core.exercises || {};
      Object.assign(core.exercises, statuses);
      originalSetItem.call(localStorage, CORE_KEY, JSON.stringify(core));
    } catch (_) {}
  }

  document.addEventListener("change", event => {
    const input = event.target.closest?.('[data-global-exercise-id^="exam-"]');
    if (!input) return;
    const aux = readAux();
    aux.examSolved = aux.examSolved || {};
    aux.examSolved[input.dataset.globalExerciseId] = input.checked;
    writeAux(aux);
  }, true);

  document.addEventListener("click", event => {
    const reset = event.target.closest?.("#reset-data");
    if (!reset) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    if (!window.confirm("Apagar notas, faltas, checklists, exercícios e todas as anotações salvas neste navegador?")) return;
    localStorage.removeItem(CORE_KEY);
    localStorage.removeItem(AUX_KEY);
    location.reload();
  }, true);

  restoreExamStatuses();
})();