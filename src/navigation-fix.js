(() => {
  "use strict";

  const EXERCISES_HASH = "#exercises";

  function exercisesPanelIsActive() {
    return document.querySelector('#view-exercises')?.classList.contains('is-active') || false;
  }

  function requestExercisesRoute() {
    // app.js ainda trata apenas as views originais e pode converter "exercises"
    // para "dashboard" durante o mesmo clique. Executamos depois do ciclo atual
    // e usamos um hashchange real (ou sintético quando o hash já é o correto),
    // permitindo que enhancements.js seja a última camada a ativar/renderizar
    // o banco integrado de exercícios.
    if (location.hash !== EXERCISES_HASH) {
      location.hash = EXERCISES_HASH;
      return;
    }

    if (!exercisesPanelIsActive()) {
      window.dispatchEvent(new HashChangeEvent('hashchange', {
        oldURL: location.href,
        newURL: location.href
      }));
    }
  }

  document.addEventListener('click', event => {
    if (!event.target.closest('[data-view="exercises"]')) return;
    window.setTimeout(requestExercisesRoute, 0);
  }, true);

  window.addEventListener('load', () => {
    if (location.hash === EXERCISES_HASH && !exercisesPanelIsActive()) {
      window.setTimeout(requestExercisesRoute, 0);
    }
  }, { once: true });
})();
