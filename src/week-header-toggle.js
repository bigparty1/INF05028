(() => {
  "use strict";

  const ROOT_SELECTOR = "#weeks-root";
  const HEADER_SELECTOR = ".week-summary";
  const INTERACTIVE_SELECTOR = "button, select, input, textarea, label, a, summary, details";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function prepareHeader(header) {
    const card = header?.closest(".week-card[data-week-card]");
    if (!card) return;

    // A expansão passa a pertencer ao cabeçalho inteiro; o antigo botão
    // individual deixa de existir.
    $$("[data-toggle-week]", header).forEach(button => button.remove());

    header.dataset.weekHeader = card.dataset.weekCard;
    header.dataset.headerEnhanced = "1";
    header.setAttribute("role", "button");
    header.setAttribute("tabindex", "0");
    header.setAttribute("aria-expanded", String(card.classList.contains("is-open")));
    header.setAttribute("title", card.classList.contains("is-open") ? "Recolher semana" : "Expandir semana");
  }

  function prepareWeeks(root = document) {
    $$(HEADER_SELECTOR, root).forEach(prepareHeader);
  }

  function toggleHeader(header) {
    const card = header?.closest(".week-card[data-week-card]");
    if (!card) return;

    const open = !card.classList.contains("is-open");
    card.classList.toggle("is-open", open);
    header.setAttribute("aria-expanded", String(open));
    header.setAttribute("title", open ? "Recolher semana" : "Expandir semana");

    // O pipeline matemático já existente observa o estado da semana após o
    // evento e renderiza as fórmulas quando o conteúdo passa a ficar visível.
  }

  function isInteractiveTarget(target, header) {
    const interactive = target.closest?.(INTERACTIVE_SELECTOR);
    return Boolean(interactive && header.contains(interactive));
  }

  function installInteractions() {
    document.addEventListener("click", event => {
      const header = event.target.closest?.(HEADER_SELECTOR);
      if (!header || !header.closest(ROOT_SELECTOR)) return;
      if (isInteractiveTarget(event.target, header)) return;
      toggleHeader(header);
    });

    document.addEventListener("keydown", event => {
      const header = event.target.closest?.(HEADER_SELECTOR);
      if (!header || !header.closest(ROOT_SELECTOR)) return;
      if (event.target !== header) return;
      if (event.key !== "Enter" && event.key !== " ") return;

      event.preventDefault();
      toggleHeader(header);
    });
  }

  function observeRenders() {
    const root = $(ROOT_SELECTOR);
    if (!root || !("MutationObserver" in window)) return;

    let scheduled = false;
    const observer = new MutationObserver(records => {
      if (!records.some(record => record.addedNodes.length)) return;
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        prepareWeeks(root);
      });
    });

    observer.observe(root, { childList: true, subtree: true });
  }

  function init() {
    prepareWeeks();
    installInteractions();
    observeRenders();

    // renderWeeks() pode ter ocorrido no mesmo ciclo de inicialização.
    requestAnimationFrame(() => prepareWeeks());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
