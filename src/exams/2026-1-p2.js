window.EXAM_DATA = window.EXAM_DATA || [];
window.EXAM_DATA.push({
  id: "2026-1-p2", term: "2026/1", course: "INF05028 — Projeto e Análise de Algoritmos II", title: "Prova 2", date: "11/06/2026", file: "2026-1-prova2sol.pdf",
  questions: [
    {
      id: "exam-2026-1-p2-q1", difficulty: "Histórica", origin: "Prova 2026/1 · P2", title: "Questão 1 — V/F de Programação Dinâmica",
      prompt: "Decida V/F e justifique: (a) Em escalonamento de intervalos com pesos, se v_j+M[p(j)]>M[j−1], então j necessariamente pertence à solução ótima do subproblema das j primeiras tarefas. (b) O algoritmo O(nW) de Mochila 0/1 é polinomial no tamanho da entrada quando W está em binário. (c) Se α_pq≥2δ para símbolos distintos, existe alinhamento ótimo sem incompatibilidades. (d) Se OPT(i,v)=OPT(i−1,v) em Bellman–Ford DP, o valor nunca mais muda. (e) Calcular OPT(i,v) compara 1+deg⁺(v) candidatos. (f) Na mochila irrestrita, escolher i usa v_i+OPT(i−1,c−w_i).",
      solution: "(a) V: a desigualdade estrita torna a alternativa com j estritamente melhor. (b) F: O(nW) é pseudo-polinomial porque W usa Θ(log W) bits. (c) V: substitua mismatch por dois gaps de custo 2δ. (d) F: uma melhoria pode surgir apenas com mais arestas. (e) V: há o candidato de não usar nova aresta e um para cada aresta de saída. (f) F: o item i continua disponível; use v_i+OPT(i,c−w_i)."
    },
    {
      id: "exam-2026-1-p2-q2", difficulty: "Execução", origin: "Prova 2026/1 · P2", title: "Questão 2 — Floyd–Warshall passo a passo",
      prompt: "No digrafo com V={1,2,3,4}, use D⁽⁰⁾=[[0,3,10,+∞],[+∞,0,2,7],[+∞,+∞,0,1],[4,+∞,+∞,0]]. Preencha D⁽¹⁾ e D⁽²⁾, permitindo respectivamente o vértice 1 e depois {1,2} como intermediários.",
      solution: "D⁽¹⁾=[[0,3,10,+∞],[+∞,0,2,7],[+∞,+∞,0,1],[4,7,14,0]]. Melhorias: 4→1→2=7 e 4→1→3=14. D⁽²⁾=[[0,3,5,10],[+∞,0,2,7],[+∞,+∞,0,1],[4,7,9,0]]. Surgem 1→2→3=5, 1→2→4=10 e 4→2→3=9."
    },
    {
      id: "exam-2026-1-p2-q3", difficulty: "Dissertativa", origin: "Prova 2026/1 · P2", title: "Questão 3 — Linhas de montagem",
      prompt: "Uma fábrica tem duas linhas e n estações. Processar estação j na linha i custa a_{i,j}; entrada custa e_i; saída x_i; trocar de linha entre j e j+1 custa t_{i,j}. Formule uma DP com O(n) subproblemas que calcule o custo mínimo total.",
      solution: "Defina F[i,j] como o menor custo para processar estações 1..j e terminar na linha i. Bases: F[1,1]=e₁+a₁,₁ e F[2,1]=e₂+a₂,₁. Para j≥2: F[1,j]=min{F[1,j−1]+a₁,j, F[2,j−1]+t₂,j−1+a₁,j}; F[2,j]=min{F[2,j−1]+a₂,j, F[1,j−1]+t₁,j−1+a₂,j}. Resposta: min{F[1,n]+x₁,F[2,n]+x₂}. Há 2n estados com transição O(1): O(n)."
    }
  ]
});