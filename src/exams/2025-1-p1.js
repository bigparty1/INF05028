window.EXAM_DATA = window.EXAM_DATA || [];
window.EXAM_DATA.push({
  id: "2025-1-p1",
  term: "2025/1",
  course: "INF05515 — Complexidade de Algoritmos",
  title: "Prova 1",
  date: "29/04/2025",
  file: "2025-1-prova1sol.pdf",
  questions: [
    {
      id: "exam-2025-1-p1-q1", difficulty: "Histórica", origin: "Prova 2025/1 · P1", title: "Questão 1 — Strassen, Gale–Shapley, Karatsuba e Par Mais Próximo",
      prompt: "Considere a instância de Emparelhamento Estável e o conjunto P={(4,2),(8,7),(1,1),(7,3)} da prova. Decida V/F e justifique: (a) Strassen realiza 6 chamadas recursivas para submatrizes n/2 × n/2. (b) S={(E1,S2),(E2,S1),(E3,S3)} é estável. (c) No Gale–Shapley com empresas propondo, S1 nunca rejeita uma proposta. (d) Karatsuba para inteiros de n dígitos tem complexidade o(n²). (e) Na primeira combinação do Par Mais Próximo, δ=√10.",
      solution: "(a) F: Strassen usa 7 chamadas recursivas. (b) V: cada estagiário está com sua primeira escolha na instância dada. (c) F: S1 recebe E1 e depois rejeita E3, pois prefere E1. (d) V: Karatsuba é Θ(n^{log₂3})≈Θ(n^{1,58})=o(n²). (e) V: δ_Q=√10 e δ_R=√17, logo δ=min{√10,√17}=√10."
    },
    {
      id: "exam-2025-1-p1-q2", difficulty: "Histórica", origin: "Prova 2025/1 · P1", title: "Questão 2 — Relações assintóticas",
      prompt: "Decida V/F e justifique: (a) 10n²+5n+100=O(n²). (b) n log₂ n=Ω(n²). (c) 3ⁿ=O(2ⁿ). (d) n³=ω(n(log n)²). (e) log₂(n³)=Θ(log₁₀ n).",
      solution: "(a) V: para n≥1, 10n²+5n+100≤115n². (b) F: n log n cresce mais lentamente que n². (c) F: (3/2)ⁿ→∞. (d) V: n³/[n(log n)²]=n²/(log n)²→∞. (e) V: log₂(n³)=3log₂n e mudança de base altera apenas fator constante."
    },
    {
      id: "exam-2025-1-p1-q3", difficulty: "Histórica", origin: "Prova 2025/1 · P1", title: "Questão 3 — Propriedades de O, Θ e o",
      prompt: "Sejam f(n) e g(n) assintoticamente positivas. Decida V/F e justifique: (a) Se f=O(g), então g=Ω(f). (b) Se f=O(g), então 2^{f(n)}=O(2^{g(n)}). (c) f(n)=Θ(f(n/2)). (d) Se f=o(g), então f=O(g). (e) f(n)+g(n)=Θ(max(f(n),g(n))).",
      solution: "(a) V, pela definição equivalente. (b) F; contraexemplo: f(n)=2n, g(n)=n. (c) F; por exemplo f(n)=2ⁿ. (d) V: o implica O. (e) V: max(f,g)≤f+g≤2max(f,g)."
    },
    {
      id: "exam-2025-1-p1-q4", difficulty: "Histórica", origin: "Prova 2025/1 · P1", title: "Questão 4 — BFS e DFS",
      prompt: "No grafo não direcionado V={A,B,C,D,E,F}, E={{A,B},{A,C},{B,D},{C,D},{C,E},{D,E},{D,F},{E,F}}, execute BFS e DFS a partir de A; no DFS avalie vizinhos em ordem alfabética. Decida V/F: (a) A distância BFS de A até F é 3. (b) E é explorado antes de D no BFS. (c) O DFS iterativo começa A,B,D,C. (d) O grafo não contém ciclos. (e) Verificar caminho entre dois vértices por DFS custa O(n+m).",
      solution: "(a) V. (b) F: D é explorado antes de E. (c) F na implementação iterativa descrita: ao empilhar B antes de C, C é removido primeiro. (d) F: A-B-D-C-A é um ciclo. (e) V: DFS custa O(n+m)."
    },
    {
      id: "exam-2025-1-p1-q5", difficulty: "Histórica", origin: "Prova 2025/1 · P1", title: "Questão 5 — Método Mestre e árvore de recursão",
      prompt: "Decida V/F: (a) T(n)=4T(n/2)+n tem solução O(n²). (b) T(n)=4T(n/2)+n² tem solução O(n² log n). (c) T(n)=4T(n/2)+n³ tem solução O(n^{log₂4}). (d) Em T(n)=4T(n/2)+n, o custo na raiz é Θ(n²). (e) Nessa recorrência, o custo total do nível j é O(n·2ʲ).",
      solution: "(a) V. (b) V. (c) F: o termo n³ domina, logo Θ(n³). (d) F: o custo local da raiz é n. (e) V: 4ʲ nós × n/2ʲ por nó = n·2ʲ."
    },
    {
      id: "exam-2025-1-p1-q6", difficulty: "Dissertativa", origin: "Prova 2025/1 · P1", title: "Questão 6 — Caminho com no máximo uma aresta vermelha",
      prompt: "Dado um grafo não direcionado G=(V,E), cada aresta é vermelha ou azul, e vértices distintos s,t. Apresente um algoritmo O(|V|+|E|) que determina se existe caminho entre s e t usando no máximo uma aresta vermelha. Forneça algoritmo, prova de corretude e análise do custo.",
      solution: "Considere o subgrafo apenas com arestas azuis. Faça BFS/DFS a partir de s e marque R_s; faça outra busca a partir de t e marque R_t. Se t∈R_s, existe caminho com zero arestas vermelhas. Caso contrário, percorra cada aresta vermelha {u,v}; se (u∈R_s e v∈R_t) ou (v∈R_s e u∈R_t), há um caminho com exatamente uma aresta vermelha. A corretude decorre da decomposição de qualquer caminho válido em trecho azul + no máximo uma aresta vermelha + trecho azul. As duas buscas e a varredura das arestas custam O(|V|+|E|)."
    },
    {
      id: "exam-2025-1-p1-q7", difficulty: "Dissertativa", origin: "Prova 2025/1 · P1", title: "Questão 7 — Índice fixo em vetor ordenado",
      prompt: "Dado um vetor ordenado A de n inteiros distintos, apresente um algoritmo O(log n) que retorna um índice i com A[i]=i, ou −1 se não existir. Considere indexação a partir de 1. Forneça algoritmo, prova de corretude e custo.",
      solution: "Use busca binária. Em mid: se A[mid]=mid, retorne mid. Se A[mid]<mid, como os valores são inteiros distintos e ordenados, para todo k≤mid vale A[k]<k; descarte a esquerda. Se A[mid]>mid, para todo k≥mid vale A[k]>k; descarte a direita. Cada passo reduz o intervalo pela metade, logo T(n)=T(n/2)+O(1)=O(log n)."
    }
  ]
});