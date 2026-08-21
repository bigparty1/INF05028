window.EXAM_DATA = window.EXAM_DATA || [];
window.EXAM_DATA.push({
  id: "2026-1-p1", term: "2026/1", course: "INF05028 — Projeto e Análise de Algoritmos II", title: "Prova 1", date: "23/05/2026", file: "2026-1-prova1sol.pdf",
  questions: [
    {
      id: "exam-2026-1-p1-q1", difficulty: "Histórica", origin: "Prova 2026/1 · P1", title: "Questão 1 — V/F de Divisão e Conquista",
      prompt: "Decida V/F e justifique: (a) T(n)=7T(n/5)+O(n) e T(n)=2T(n/2)+O(n²) têm soluções O(n^{log₅7}) e O(n²). (b) Em T(n)=3T(n/3)+n², o custo do nível j é n²(1/3)ʲ. (c) Em T(n)=2T(n/2)+c, T(1)=c, a hipótese T(n)=cn pode ser provada pela substituição indicada. (d) Para A(x)=1+2x e raízes quartas da unidade, as avaliações são 3,1+2i,−1,1−2i. (e) No Par Mais Próximo do exemplo da prova, (1,0) deve ser comparado com (4,0) na faixa. (f) Karatsuba faz 4 chamadas recursivas. (g) T(n)=T(n−1)+O(1) e T(n)=2T(n/2)+O(n) são ambas O(n log n). (h) A árvore de decisão para ordenação por comparação precisa de ao menos n! folhas.",
      solution: "(a) V. (b) V. (c) F: a substituição proposta produz c(n+1)+c, não c(n+1). (d) V. (e) F: (4,0) não pertence à faixa x∈[0,2]. (f) F: Karatsuba faz 3 chamadas, ac, bd e (a+b)(c+d). (g) V: a primeira é O(n) e portanto também O(n log n); a segunda é O(n log n). (h) V."
    },
    {
      id: "exam-2026-1-p1-q2", difficulty: "Dissertativa", origin: "Prova 2026/1 · P1", title: "Questão 2 — Busca em vetor rotacionado",
      prompt: "Dado A[1..n] de inteiros distintos, rotação de um vetor crescente, e valor x, apresente algoritmo O(log n) que retorna o índice de x ou −1. Forneça algoritmo, prova de corretude e custo.",
      solution: "Inspecione mid. Se A[mid]=x, termine. Uma das metades é crescente. Se A[i]≤A[mid], a esquerda é ordenada; se A[i]≤x<A[mid], recorra à esquerda, senão à direita. Caso contrário, a direita é ordenada; se A[mid]<x≤A[j], recorra à direita, senão à esquerda. Em cada chamada o intervalo é reduzido pela metade: T(n)=T(n/2)+O(1)=O(log n)."
    },
    {
      id: "exam-2026-1-p1-q3", difficulty: "Dissertativa", origin: "Prova 2026/1 · P1", title: "Questão 3 — Pontos máximos por Divisão e Conquista",
      prompt: "Dado um conjunto P de n pontos com coordenadas-x distintas, q domina p quando x_q>x_p e y_q≥y_p. Um ponto é máximo se não é dominado. Apresente algoritmo O(n log n) por Divisão e Conquista que retorna todos os máximos.",
      solution: "Pré-ordene por x crescente. Divida em L e R, resolva ambos. Nenhum ponto de L domina ponto de R. Um ponto p∈L é dominado por algum ponto de R se e somente se existe r∈R com y_r≥y_p. Calcule y*=max{r.y:r∈R} e remova de max(L) os pontos com y≤y*. Retorne sobreviventes de L ∪ max(R). T(n)=2T(n/2)+O(n)=O(n log n), além da ordenação inicial O(n log n)."
    }
  ]
});