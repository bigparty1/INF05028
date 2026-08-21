window.EXAM_DATA = window.EXAM_DATA || [];
window.EXAM_DATA.push({
  id: "2025-2-p1", term: "2025/2", course: "INF05515 — Complexidade de Algoritmos", title: "Prova 1", date: "01/10/2025", file: "2025-2-prova1Sol.pdf",
  questions: [
    {
      id: "exam-2025-2-p1-q1", difficulty: "Histórica", origin: "Prova 2025/2 · P1", title: "Questão 1 — V/F acumulativo",
      prompt: "Decida V/F e apresente breve justificativa para os itens da prova: estabilidade de um emparelhamento; número de subproblemas de Strassen; número de multiplicações-base de Karatsuba; log(n!)=Ω(n log n); 5n²+3n+100=Θ(n²); mudança de base de logaritmos; 2^{n+5}=O(2ⁿ); simetria de Θ; composição f=O(g), g=o(h); ordem de BFS; três recorrências pelo Método Mestre; e custo no nível j de T(n)=5T(n/2)+n.",
      solution: "Gabarito: (a) F, pois (E2,S2) é par instável. (b) F: são 7ʲ subproblemas no nível j. (c) V: 3^{log₂n}=n^{log₂3}. (d) V. (e) V. (f) F: log₂(n⁵)=5log₂n=Ω(log₁₀n). (g) F: 2^{n+5}=32·2ⁿ=O(2ⁿ). (h) V. (i) V. (j) V. (k) V: O(n^{log₂5}). (l) V: O(n²). (m) V: O(n). (n) F: o custo do nível j é n(5/2)ʲ."
    },
    {
      id: "exam-2025-2-p1-q2", difficulty: "Dissertativa", origin: "Prova 2025/2 · P1", title: "Questão 2 — Menor número de ruas estreitas",
      prompt: "Em uma cidade, V são cruzamentos e E ruas; algumas ruas são largas e outras estreitas. Deseja-se ir de s a t usando o menor número possível de ruas estreitas. Apresente algoritmo O(|V|+|E|) que retorna esse número, com corretude e custo.",
      solution: "Organize os vértices em camadas pelo número de ruas estreitas usadas. A camada 0 é obtida por BFS apenas em ruas largas a partir de s. Para passar de k a k+1, atravesse uma única rua estreita saindo da camada k para formar uma fronteira e, dessas sementes, expanda novamente somente por ruas largas. Marque cada vértice na primeira camada em que aparece. Por indução, a camada k contém exatamente os vértices alcançáveis com k ruas estreitas; a primeira camada com t fornece o mínimo. Cada vértice/aresta é processado O(1) vezes: O(|V|+|E|)."
    },
    {
      id: "exam-2025-2-p1-q3", difficulty: "Dissertativa", origin: "Prova 2025/2 · P1", title: "Questão 3 — Última ocorrência em vetor ordenado",
      prompt: "Dado A[1..n] não decrescente, com repetições, e valor x, apresente algoritmo O(log n) que retorna o último índice r com A[r]=x, ou −1 se x não ocorre. Forneça algoritmo, corretude e custo.",
      solution: "Faça busca binária direcionada à direita. Se A[mid]≤x, procure primeiro em [mid+1..j]; se não encontrar e A[mid]=x, mid é a última ocorrência. Se A[mid]<x e a busca à direita falhar, x não aparece no intervalo restante. Se A[mid]>x, procure em [i..mid−1]. O intervalo cai pela metade a cada passo: O(log n)."
    }
  ]
});