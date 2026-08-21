(() => {
  "use strict";

  const MARK_RE = /\[\[math(?::(block))?\]\]([\s\S]*?)\[\[\/math\]\]/g;
  const supers = { "⁰":"0", "¹":"1", "²":"2", "³":"3", "⁴":"4", "⁵":"5", "⁶":"6", "⁷":"7", "⁸":"8", "⁹":"9", "ⁿ":"n" };
  const subs = { "₀":"0", "₁":"1", "₂":"2", "₃":"3", "₄":"4", "₅":"5", "₆":"6", "₇":"7", "₈":"8", "₉":"9" };

  let scheduled = false;
  let mathQueue = Promise.resolve();
  let readyPromise = null;

  function root() {
    return document.getElementById("app-main") || document.body;
  }

  function replaceRuns(text, map, marker) {
    const chars = Object.keys(map).join("");
    return text.replace(new RegExp(`[${chars}]+`, "g"), run => `${marker}{${Array.from(run).map(char => map[char]).join("")}}`);
  }

  function toLatex(value) {
    let s = String(value ?? "").trim();
    if (!s) return s;

    s = s
      .replace(/≤p/g, "\\le_p ")
      .replace(/log₂/g, "\\log_{2}")
      .replace(/log₁₀/g, "\\log_{10}")
      .replace(/log_([0-9A-Za-z]+)/g, "\\log_{$1}")
      .replace(/\blog\b/g, "\\log")
      .replace(/\bmax\b/g, "\\max")
      .replace(/\bmin\b/g, "\\min")
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
      .replaceAll("⊆", "\\subseteq ")
      .replaceAll("∈", "\\in ")
      .replaceAll("∉", "\\notin ")
      .replaceAll("→", "\\to ")
      .replaceAll("·", "\\cdot ")
      .replaceAll("≈", "\\approx ");

    s = replaceRuns(s, supers, "^");
    s = replaceRuns(s, subs, "_");

    s = s
      .replace(/\^\((\\log_\{[^}]+\}\s*[^)]+)\)/g, "^{$1}")
      .replace(/\^(\\log_\{[^}]+\}\s*[A-Za-z0-9]+)/g, "^{$1}")
      .replace(/\^([0-9]+(?:[.,][0-9]+)?)/g, "^{$1}")
      .replace(/√\s*\(?([A-Za-z0-9.+\-]+)\)?/g, "\\sqrt{$1}");

    return s;
  }

  function normalizePreparedSpan(span) {
    if (!(span instanceof HTMLElement) || !span.dataset.mathSource || span.dataset.mathRendered === "1") return;
    span.dataset.mathRuntime = "1";
    // Remove delimitadores TeX que a camada anterior possa ter colocado. Assim,
    // enquanto o MathJax carrega, o fallback é a própria fórmula — nunca as tags [[math]].
    span.textContent = span.dataset.mathSource;
  }

  function parseTextNode(node) {
    const text = node.nodeValue || "";
    if (!text.includes("[[math")) return 0;

    MARK_RE.lastIndex = 0;
    const fragment = document.createDocumentFragment();
    let cursor = 0;
    let count = 0;
    let match;

    while ((match = MARK_RE.exec(text))) {
      if (match.index > cursor) fragment.append(document.createTextNode(text.slice(cursor, match.index)));

      const span = document.createElement(match[1] === "block" ? "div" : "span");
      span.className = match[1] === "block" ? "math-display" : "math-inline";
      span.dataset.mathSource = match[2].trim();
      span.dataset.mathRuntime = "1";
      span.textContent = match[2].trim();
      fragment.append(span);

      cursor = match.index + match[0].length;
      count += 1;
    }

    if (!count) return 0;
    if (cursor < text.length) fragment.append(document.createTextNode(text.slice(cursor)));
    node.replaceWith(fragment);
    return count;
  }

  function prepare(scope = root()) {
    if (!scope || !document.contains(scope)) return 0;

    scope.querySelectorAll?.("[data-math-source]:not([data-math-rendered='1'])").forEach(normalizePreparedSpan);

    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue?.includes("[[math")) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest("script,style,textarea,pre,code,mjx-container,[data-math-source]")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    let count = 0;
    nodes.forEach(node => { count += parseTextNode(node); });

    // As tags também podem ter sido copiadas para rótulos acessíveis pelo enhancer do checklist.
    scope.querySelectorAll?.("[aria-label], [title]").forEach(element => {
      for (const attr of ["aria-label", "title"]) {
        const value = element.getAttribute(attr);
        if (!value?.includes("[[math")) continue;
        element.setAttribute(attr, value.replace(MARK_RE, (_, __, formula) => formula.trim()));
        MARK_RE.lastIndex = 0;
      }
    });

    return count;
  }

  function waitForMathJax() {
    if (window.MathJax?.tex2chtmlPromise) return Promise.resolve(window.MathJax);
    if (readyPromise) return readyPromise;

    readyPromise = new Promise(resolve => {
      const started = performance.now();
      const check = () => {
        if (window.MathJax?.tex2chtmlPromise) return resolve(window.MathJax);
        if (performance.now() - started > 8000) return resolve(null);
        setTimeout(check, 80);
      };
      check();
    });

    return readyPromise;
  }

  async function renderSpan(span, MathJax) {
    if (!span.isConnected || span.dataset.mathRendered === "1" || span.dataset.mathPending === "1") return;

    span.dataset.mathPending = "1";
    try {
      const display = span.classList.contains("math-display");
      const source = span.dataset.mathSource || span.textContent || "";
      const node = await MathJax.tex2chtmlPromise(toLatex(source), { display });
      if (!span.isConnected) return;
      span.replaceChildren(node);
      span.dataset.mathRendered = "1";
    } catch (error) {
      console.warn("Não foi possível renderizar uma fórmula; mantendo o fallback textual.", error);
    } finally {
      delete span.dataset.mathPending;
    }
  }

  function activeScope() {
    return document.querySelector(".view.is-active") || root();
  }

  function renderVisible() {
    const scope = activeScope();
    if (!scope) return;
    prepare(scope);

    const targets = Array.from(scope.querySelectorAll("[data-math-source]:not([data-math-rendered='1'])"));
    if (!targets.length) return;

    mathQueue = mathQueue
      .catch(() => {})
      .then(async () => {
        const MathJax = await waitForMathJax();
        if (!MathJax) return;

        // Lotes pequenos evitam bloquear a thread principal em páginas com muitas questões.
        for (let i = 0; i < targets.length; i += 20) {
          const batch = targets.slice(i, i + 20);
          await Promise.all(batch.map(span => renderSpan(span, MathJax)));
          if (i + 20 < targets.length) await new Promise(resolve => setTimeout(resolve, 0));
        }
      });
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      prepare(root());
      renderVisible();
    });
  }

  function nodeNeedsProcessing(node) {
    if (node.nodeType === Node.TEXT_NODE) return node.nodeValue?.includes("[[math") || false;
    if (node.nodeType !== Node.ELEMENT_NODE) return false;
    const element = /** @type {Element} */ (node);
    if (element.matches?.("[data-math-source]:not([data-math-rendered='1'])")) return true;
    if (element.textContent?.includes("[[math")) return true;
    return Boolean(element.querySelector?.("[data-math-source]:not([data-math-rendered='1'])"));
  }

  function installObserver() {
    const target = root();
    if (!target || !("MutationObserver" in window)) return;

    const observer = new MutationObserver(records => {
      for (const record of records) {
        if (Array.from(record.addedNodes).some(nodeNeedsProcessing)) {
          schedule();
          return;
        }
      }
    });

    // Observa apenas nós adicionados. Não observa atributos nem characterData, evitando
    // o ciclo que anteriormente podia ser disparado pelo próprio MathJax.
    observer.observe(target, { childList: true, subtree: true });
  }

  function installViewTriggers() {
    window.addEventListener("hashchange", schedule);
    document.addEventListener("click", event => {
      if (event.target.closest(".nav-item, [data-view-link], [data-jump-week], [data-toggle-week], [data-week-tab], #expand-current-week, #next-review, #reveal-review, [data-review-result]")) {
        schedule();
      }
    });
  }

  function init() {
    // Faz a limpeza das tags imediatamente, antes mesmo de o MathJax terminar de baixar.
    prepare(root());
    installObserver();
    installViewTriggers();
    schedule();
    window.addEventListener("load", schedule, { once: true });
  }

  init();
})();