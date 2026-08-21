window.EXAM_DATA = window.EXAM_DATA || [];
window.EXAM_DATA.push({
  id: "2025-1-p3", term: "2025/1", course: "INF05515 — Complexidade de Algoritmos", title: "Prova 3", date: "03/07/2025", file: "2025-1-prova3Sol.pdf",
  questions: [
    {
      id: "exam-2025-1-p3-q1", difficulty: "Dissertativa", origin: "Prova 2025/1 · P3", title: "Questão 1 — Minimizar maior atraso",
      prompt: "Há n tarefas, uma máquina, tempo de processamento t_j e deadline d_j. Se a tarefa j começa em s_j, termina em f_j=s_j+t_j e seu atraso é l_j=max{0,f_j−d_j}. Determine uma ordem que minimize L=max_j l_j em O(n log n), com corretude e custo.",
      solution: "O PDF de soluções fornecido não desenvolve a resposta desta questão; ele indica apenas: “Seção 4.2 do livro Algorithm Design”. Para preservar o material anexado sem completar lacunas com conteúdo externo, a plataforma mantém somente essa referência."
    },
    {
      id: "exam-2025-1-p3-q2", difficulty: "Dissertativa", origin: "Prova 2025/1 · P3", title: "Questão 2 — Soma máxima sem três consecutivos",
      prompt: "Dada sequência A de inteiros positivos, encontre em O(n) o valor máximo de uma subsequência que não contém três elementos consecutivos de A. Forneça algoritmo, prova e custo.",
      solution: "Defina S[0]=0, S[1]=A[1], S[2]=A[1]+A[2]. Para i≥3: S[i]=max{S[i−1], A[i]+S[i−2], A[i]+A[i−1]+S[i−3]}. Os três casos representam: não usar A[i]; usar A[i] sem A[i−1]; usar A[i] e A[i−1], obrigando excluir A[i−2]. O PDF prova por contradição escolhendo o primeiro índice incorreto. Cada estado custa O(1), total O(n)."
    },
    {
      id: "exam-2025-1-p3-q3", difficulty: "Histórica", origin: "Prova 2025/1 · P3", title: "Questão 3 — Grafos, DP e classes de complexidade",
      prompt: "Decida V/F e justifique as falsas: execução de Dijkstra em um grafo dado; propriedade do maior peso em um ciclo e AGM; estabilização de Bellman–Ford; recorrência de alinhamento; consequências de P=NP; NP∩co-NP; reduções envolvendo NP-difícil/NP; Subset Sum em PSPACE; PSPACE-difícil versus NP-completo; e consequência de 3-SAT≤pY para X∈P.",
      solution: "Gabarito: (a) F: após a iteração 3, V−X contém {v,t}. (b) V. (c) V. (d) F: alinhamento usa min{α_{x_i y_j}+OPT(i−1,j−1), δ+OPT(i−1,j), δ+OPT(i,j−1)}. (e) V. (f) F: P⊆NP∩co-NP. (g) F: Y pode estar em P. (h) F: NP⊆PSPACE. (i) F: a inclusão conhecida é NP⊆PSPACE, não a redução afirmada. (j) V."
    },
    {
      id: "exam-2025-1-p3-q4", difficulty: "Dissertativa", origin: "Prova 2025/1 · P3", title: "Questão 4 — Conjunto Independente é NP-completo",
      prompt: "Assuma conhecidos como NP-completos apenas 3-SAT, Circuit-SAT, Ciclo Hamiltoniano, Caminho Hamiltoniano e 3D Matching. Demonstre que Conjunto Independente é NP-completo usando redução de um desses problemas e inclua exemplo ilustrativo. Não é necessário provar a redução.",
      solution: "O PDF de soluções fornecido não desenvolve a redução; ele indica apenas: “Seção 8.2 do livro Algorithm Design”. Para preservar fielmente a fonte anexada, a plataforma não inventa uma solução ausente no arquivo."
    }
  ]
});