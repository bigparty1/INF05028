(() => {
  "use strict";

  const EXERCISES_HASH = "#exercises";

  function renderExercisesThroughInstalledEnhancer() {
    // enhancements.js já registra renderExercises nos filtros. Disparar um
    // change é uma forma estável de reutilizar a implementação existente sem
    // duplicar o banco de exercícios nem depender de funções privadas.
    const sourceFilter = document.querySelector("#exercise-source-filter");
    if (sourceFilter) {
      sourceFilter.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  function activateExercises({ updateHash = true } = {}) {
    const panel = document.querySelector('#view-exercises');
    const nav = document.querySelector('[data-view="exercises"]');
    if (!panel || !nav) return;

    // A view original de app.js ainda não reconhece "exercises" como rota
    // válida. Por isso a ativação é feita aqui de forma atômica, impedindo que
    // o mesmo clique chegue ao handler legado e seja convertido em dashboard.
    document.querySelectorAll('[data-view-panel]').forEach(item => {
      item.classList.toggle('is-active', item === panel);
    });
    document.querySelectorAll('[data-view]').forEach(item => {
      item.classList.toggle('is-active', item === nav);
    });

    if (updateHash && location.hash !== EXERCISES_HASH) {
      // replaceState evita um hashchange que seria capturado pelo roteador
      // legado de app.js e convertido novamente em dashboard.
      history.replaceState(null, "", EXERCISES_HASH);
    }

    renderExercisesThroughInstalledEnhancer();
    document.querySelector('#app-main')?.focus({ preventScroll: true });
  }

  // Captura antes dos listeners do botão registrados por app.js. É essencial
  // interromper a propagação: deixar o clique chegar ao handler legado é a
  // causa do estado inconsistente "URL #exercises + conteúdo Dashboard".
  document.addEventListener('click', event => {
    if (!event.target.closest('[data-view="exercises"]')) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    activateExercises();
  }, true);

  // Também suporta abrir/recarregar diretamente /#exercises. Não usamos
  // hashchange aqui para a ativação normal do clique, mas esta escuta cobre
  // navegação pelo histórico/endereço do navegador.
  window.addEventListener('hashchange', () => {
    if (location.hash !== EXERCISES_HASH) return;
    window.setTimeout(() => activateExercises({ updateHash: false }), 0);
  });

  function boot() {
    if (location.hash === EXERCISES_HASH) {
      // Executa depois da inicialização síncrona de app.js/enhancements.js.
      window.setTimeout(() => activateExercises({ updateHash: false }), 0);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
