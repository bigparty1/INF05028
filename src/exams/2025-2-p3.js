window.EXAM_DATA = window.EXAM_DATA || [];
window.EXAM_DATA.push({
  id: "2025-2-p3", term: "2025/2", course: "INF05515 — Complexidade de Algoritmos", title: "Prova 3", date: "01/12/2025", file: "2025-2-prova3Sol.pdf",
  questions: [
    {
      id: "exam-2025-2-p3-q1", difficulty: "Dissertativa", origin: "Prova 2025/2 · P3", title: "Questão 1 — Cobertura mínima de intervalo",
      prompt: "Dado alvo [0,T] e n intervalos [s_i,f_i], encontre o número mínimo de intervalos necessário para cobrir totalmente [0,T], ou −1 se impossível. Projete algoritmo O(n log n), com prova de corretude e custo.",
      solution: "Ordene os intervalos por início. Mantenha pos, o ponto já coberto. Entre todos os intervalos com s_i≤pos ainda disponíveis, escolha aquele de maior fim; se nenhum avança além de pos, retorne −1. Atualize pos para esse maior fim e incremente a contagem. A prova do PDF mostra que o guloso “sai na frente”: após r escolhas, seu r-ésimo intervalo termina tão longe quanto ou mais longe que o r-ésimo de qualquer solução ótima. A ordenação custa O(n log n) e a varredura é O(n)."
    },
    {
      id: "exam-2025-2-p3-q2", difficulty: "Dissertativa", origin: "Prova 2025/2 · P3", title: "Questão 2 — Trabalhos de alto e baixo estresse",
      prompt: "Ao longo de n semanas, na semana i pode-se fazer trabalho de baixo estresse com lucro L_i, alto estresse com lucro H_i ou descansar. Trabalho de alto estresse em i exige descanso em i−1. Encontre o lucro máximo em O(n), com prova e custo.",
      solution: "Defina OPT[i] como o lucro máximo nas semanas 1..i. Use OPT[k]=0 para k≤0 e OPT[1]=max(L₁,H₁). Para i≥2: OPT[i]=max{L_i+OPT[i−1], H_i+OPT[i−2]}. O primeiro caso permite qualquer solução ótima até i−1; o segundo exige descanso em i−1. Como L_i≥0 no enunciado/solução, descansar em i fica implicitamente coberto. Há n estados O(1): O(n)."
    },
    {
      id: "exam-2025-2-p3-q3", difficulty: "Histórica", origin: "Prova 2025/2 · P3", title: "Questão 3 — Prim, alinhamento, Bellman–Ford e classes",
      prompt: "Decida V/F e justifique: ordem de Prim em triângulo com pesos 1,2,3; valor M[2,2] no alinhamento de “BA” e “BC” com δ=1 e mismatch 2; condição de ciclo negativo em Bellman–Ford; 2-SAT∈PSPACE; implicação A≤pB e B∈P; P⊈NP∩co-NP; redução de NP-completo para PSPACE-completo; e redução de NP-difícil para NP-completo.",
      solution: "(a) F: Prim escolhe (a,b) e depois (b,c). (b) F: M[2,2]=2. (c) F: melhoria em n−1 frente a n−2 pode ser caminho simples; ciclo negativo é detectado por melhoria em n frente a n−1. (d) V: 2-SAT∈P⊆PSPACE. (e) F: A≤pB e B∈P implica A∈P. (f) F: P⊆NP∩co-NP. (g) V: NP⊆PSPACE e todo problema em PSPACE reduz ao PSPACE-completo. (h) F: um NP-difícil pode até ser indecidível, portanto não precisa reduzir a um problema decidível em NP."
    },
    {
      id: "exam-2025-2-p3-q4", difficulty: "Dissertativa", origin: "Prova 2025/2 · P3", title: "Questão 4 — Empacotamento de Conjuntos é NP-completo",
      prompt: "Empacotamento de Conjuntos: dado universo U, coleção S₁,…,S_m⊆U e inteiro k, existem pelo menos k subconjuntos dois a dois disjuntos? Demonstre NP-completude usando um dos problemas conhecidos na prova e inclua exemplo.",
      solution: "Reduza de Conjunto Independente. Para G=(V,E), defina U=E. Para cada v∈V, crie S_v com as arestas incidentes em v. Dois conjuntos S_u e S_v são disjuntos exatamente quando u e v não são adjacentes. Mantenha k. Assim, k conjuntos dois a dois disjuntos correspondem a k vértices independentes. A verificação de k conjuntos disjuntos é polinomial, então o problema está em NP. Exemplo do PDF: V={1,2,3}, E={(1,2),(2,3)}, k=2; S₁={e12}, S₂={e12,e23}, S₃={e23}; S₁ e S₃ são disjuntos, correspondendo ao conjunto independente {1,3}."
    }
  ]
});