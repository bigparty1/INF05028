(() => {
  "use strict";

  const DATA = window.STUDY_DATA;
  const EXAMS = window.EXAM_DATA || [];
  if (!DATA) return;

  const MARK_RE = /\[\[(m|M):([\s\S]*?)\]\]/g;
  const PARENS = String.raw`\((?:[^()]|\([^()]*\))*\)`;
  const BRACKETS = String.raw`\[[^\]]*\]`;
  const SUBS = String.raw`[₀₁₂₃₄₅₆₇₈₉]+`;
  const SUPS = String.raw`[⁰¹²³⁴⁵⁶⁷⁸⁹ⁿ]+`;
  const ID = String.raw`(?<![\p{L}_])(?:OPT|PSPACE|co-NP|NP|deg|mid|key|log₁₀|log₂|log|max|min|NF|P1|P2|AP|AA|cvw|vj|ac|bd|ad|bc|T|M|D|F|S|A|f|g|h|n|a|b|c|d|i|j|k|m|r|x|y|p|q|W|V|E|L|H|P|X|Y|δ|αpq|α|ω)(?:${SUBS})?(?![\p{L}_])`;
  const CALL = String.raw`${ID}(?:${PARENS}|${BRACKETS})?`;
  const BIG = String.raw`[OoΘΩω]${PARENS}`;
  const POWER = String.raw`(?:${CALL}|\d+(?:[.,]\d+)?)\s*(?:\^${PARENS}|\^(?:${CALL}|\d+(?:[.,]\d+)?)|${SUPS})(?:${BRACKETS})?`;
  const NUMBER = String.raw`\d+(?:[.,]\d+)?`;
  const ATOM = String.raw`(?:${BIG}|${POWER}|${CALL}|${NUMBER})`;
  const ARITH = String.raw`(?:\+|−|-|\*|/|\^|·|\||\(|\)|\{|\}|${SUPS}|${SUBS})`;
  const EXPR = String.raw`(?:${ATOM}|${ARITH}|\s)+`;

  const PATTERNS = [
    new RegExp(String.raw`${EXPR}(?:=|≤|≥|<|>)${EXPR}(?:=|≤|≥|<|>)${EXPR}`, "gu"),
    new RegExp(String.raw`${EXPR}(?:=|≤|≥|<|>)${EXPR}`, "gu"),
    new RegExp(BIG, "gu"),
    new RegExp(POWER, "gu"),
    /\blog(?:₂|₁₀|_[0-9]+)?\s*\(?[A-Za-z0-9!⁰¹²³⁴⁵⁶⁷⁸⁹ⁿ]+\)?/g,
    /\b(?:P|NP|co-NP|PSPACE|X|Y)\s*(?:=|⊆|≤p)\s*(?:P|NP|co-NP|PSPACE|X|Y)\b/g,
    /\bn!/g
  ];

  function overlaps(a, b) {
    return a.start < b.end && b.start < a.end;
  }

  function collectRanges(text) {
    const ranges = [];
    for (const pattern of PATTERNS) {
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(text))) {
        let raw = match[0];
        let start = match.index;
        let end = start + raw.length;

        const leading = raw.match(/^\s+/)?.[0].length || 0;
        const trailing = raw.match(/\s+$/)?.[0].length || 0;
        start += leading;
        end -= trailing;
        raw = text.slice(start, end);

        if (!/[=≤≥<>^⁰¹²³⁴⁵⁶⁷⁸⁹ⁿ]|[OoΘΩω]\s*\(|\blog(?:₂|₁₀|_)/.test(raw)) continue;
        const candidate = { start, end };
        if (!ranges.some(existing => overlaps(existing, candidate))) ranges.push(candidate);
        if (pattern.lastIndex === match.index) pattern.lastIndex += 1;
      }
    }
    return ranges.sort((a, b) => a.start - b.start || b.end - a.end);
  }

  function tagText(value) {
    const text = String(value ?? "");
    if (!text || text.includes("[[m:") || text.includes("[[M:")) return text;
    if (!/[=≤≥<>^⁰¹²³⁴⁵⁶⁷⁸⁹ⁿ]|[OoΘΩω]\s*\(|log(?:₂|₁₀|_)/.test(text)) return text;
    const ranges = collectRanges(text);
    if (!ranges.length) return text;
    let out = "";
    let cursor = 0;
    for (const range of ranges) {
      if (range.start < cursor) continue;
      out += text.slice(cursor, range.start);
      out += `[[m:${text.slice(range.start, range.end)}]]`;
      cursor = range.end;
    }
    out += text.slice(cursor);
    return out;
  }

  function tagDisplay(value) {
    const text = String(value ?? "").trim();
    if (!text) return text;
    if (/^\[\[M:[\s\S]*\]\]$/.test(text)) return text;
    return `[[M:${text}]]`;
  }

  function tagExercise(exercise) {
    if (!exercise || typeof exercise !== "object") return;
    for (const key of ["title", "prompt", "hint", "solution"]) {
      if (typeof exercise[key] === "string") exercise[key] = tagText(exercise[key]);
    }
  }

  function tagArray(arr) {
    if (!Array.isArray(arr)) return arr;
    return arr.map(item => typeof item === "string" ? tagText(item) : item);
  }

  DATA.weeks?.forEach(week => {
    week.executive = tagArray(week.executive);
    week.objectives = tagArray(week.objectives);
    week.checklist = tagArray(week.checklist);
    week.theory?.forEach(section => {
      if (typeof section.text === "string") section.text = tagText(section.text);
      if (typeof section.formula === "string") section.formula = tagDisplay(section.formula);
    });
    week.exercises?.forEach(tagExercise);
  });

  DATA.reviewCards?.forEach(card => {
    if (typeof card.q === "string") card.q = tagText(card.q);
    if (typeof card.a === "string") card.a = tagText(card.a);
  });

  if (DATA.course) {
    DATA.course.objectives = tagArray(DATA.course.objectives);
    DATA.course.methodology = tagArray(DATA.course.methodology);
    DATA.course.syllabus?.forEach(item => {
      if (typeof item.content === "string") item.content = tagText(item.content);
    });
    const conflict = DATA.course.recoveryConflict;
    if (conflict) {
      for (const key of ["formulaText", "proseText", "recommendation"]) {
        if (typeof conflict[key] === "string") conflict[key] = tagText(conflict[key]);
      }
    }
  }

  EXAMS.forEach(exam => exam.questions?.forEach(tagExercise));

  window.MathMarkup = {
    markerRegex: MARK_RE,
    tagText,
    tagDisplay,
    collectRanges
  };
})();