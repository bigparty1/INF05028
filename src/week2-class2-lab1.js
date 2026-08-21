(() => {
  const data = window.STUDY_DATA;
  if (!data || !Array.isArray(data.weeks)) return;

  const week = data.weeks.find((item) => item.id === 2);
  if (!week) return;

  if (data.meta) {
    data.meta.appVersion = "2.0.2";
    data.meta.sourceNote = "Cronograma 2026/2 + Plano de Ensino 2026/1 + Class1.pdf + Class2.pdf + materiais do Laboratório 1 (data-structures.cpp e simulado.pdf) + problemas Codeforces indicados + Guia de Estudos + listas/provas do projeto";
  }

  Object.assign(week, {
    title: "Análise assintótica, corretude e ferramentas do Laboratório 1",
    sources: [
      "Cronograma 2026/2",
      "Class2.pdf — Aula 2 oficial",
      "data-structures.cpp — Laboratório 1",
      "simulado.pdf — Laboratório 1",
      "Codeforces 277A, 796D, 1692B, 1526C2, 20C e 416C",
      "Provas históricas",
      "Guia"
    ],
    executive: [
      "A Aula 2 formaliza O, Ω, Θ, o e ω: não basta reconhecer a ordem de crescimento; é preciso saber usar as definições e provar relações entre funções.",
      "A análise sem modificador deve ser interpretada com cuidado: O fornece um limitante superior aplicável ao pior caso, enquanto Ω fornece um limitante inferior aplicável a qualquer entrada; melhor e pior caso não devem ser misturados com Θ sem justificativa.",
      "As relações assintóticas têm propriedades que viram atalhos de prova: transitividade, reflexividade quando aplicável, simetria de Θ e simetria transposta entre O/Ω e o/ω.",
      "A prova de corretude da Aula 2 é construída com invariantes: definir a propriedade, provar preservação, estendê-la aos estados alcançáveis, provar término e então concluir que o algoritmo resolve o problema.",
      "O Laboratório 1 transforma a revisão de PAA I em implementação: vector, stack, queue, set, map e priority_queue aparecem como peças para BFS/DFS, conectividade, guloso e caminhos mínimos.",
      "O simulado do laboratório cobra BFS repetido em grafo dirigido não ponderado: uma BFS por origem produz todas as distâncias finitas daquela origem, levando ao limite total O(n·(n+m)).",
      "Os problemas indicados no Codeforces cobrem um espectro deliberado de pré-requisitos: componentes/DSU, BFS multiorigem, conjuntos, heap mínimo, Dijkstra e guloso com ordenação."
    ],
    objectives: [
      "Escrever e aplicar corretamente as definições formais de O, Ω, Θ, o e ω, incluindo as constantes e o limiar n₀.",
      "Usar propriedades assintóticas para provar relações sem depender apenas de intuição sobre gráficos ou valores pequenos.",
      "Comparar polinômios, logaritmos e exponenciais e reconhecer quando a base importa ou não para a classe assintótica.",
      "Estruturar uma prova de corretude por invariante e separar preservação da propriedade da prova de término.",
      "Escolher estruturas da STL pela operação necessária: acesso sequencial, FIFO, LIFO, pertencimento, associação chave→valor ou extração repetida de mínimo/máximo.",
      "Reativar BFS, DFS, conectividade, Dijkstra e estratégias gulosas antes do início formal de Divisão e Conquista.",
      "Ler limites de entrada e transformá-los em um orçamento de complexidade antes de implementar."
    ],
    theory: [
      {
        title: "Ordem de crescimento: o que realmente descartamos",
        text: "A Aula 2 começa pela ideia de focar nas características dominantes do custo: termos de menor ordem e fatores constantes deixam de determinar o comportamento assintótico. Isso não significa que constantes nunca importem na prática; significa que, quando classificamos crescimento para n suficientemente grande, o termo dominante é o que define a classe. A tabela de tempos do material deixa a diferença concreta: custos polinomiais ainda escalam para entradas grandes, enquanto 2ⁿ e n! tornam-se rapidamente inviáveis."
      },
      {
        title: "O, Ω e Θ pelas definições",
        text: "T(n)=O(f(n)) quando existem c>0 e n₀ tais que T(n)≤c·f(n) para todo n≥n₀. T(n)=Ω(f(n)) troca a desigualdade: T(n)≥c·f(n). T(n)=Θ(f(n)) exige simultaneamente um limite inferior e um superior por múltiplos constantes da mesma função. As constantes escolhidas não podem depender de n. Em provas simples com polinômios, uma estratégia útil é limitar todos os termos de menor grau por múltiplos do maior grau para n≥1."
      },
      {
        title: "o e ω: limites estritos",
        text: "Pequeno-o é um limite superior estrito: para toda constante c>0, eventualmente T(n)<c·f(n). Pequeno-ω é o análogo inferior estrito. Em termos de quocientes, uma forma operacional importante é reconhecer f=o(g) quando f/g tende a 0 e f=ω(g) quando f/g tende ao infinito. Assim, dizer n²=o(n³) é mais forte do que dizer n²=O(n³)."
      },
      {
        title: "Pior caso, melhor caso e uso cuidadoso de Θ",
        text: "O material distingue a função assintótica da qualificação de caso. Para Ordenação por Inserção, o melhor caso é Θ(n) e o pior caso é Θ(n²). Dizer simplesmente que o algoritmo é O(n²) fornece uma garantia superior válida para qualquer entrada suficientemente grande. Já afirmar que o algoritmo, sem qualificar o caso, é Θ(n²) pode ser inadequado porque existem entradas em que ele executa menos trabalho. Ao responder provas, deixe explícito qual custo está sendo limitado."
      },
      {
        title: "Relações assintóticas que você deve saber manipular",
        text: "A Aula 2 prova transitividade: se f=O(g) e g=O(h), então f=O(h); versões análogas valem para Ω, Θ, o e ω. O, Ω e Θ são reflexivos, mas o e ω não são: f não é estritamente menor nem estritamente maior que si mesma. Θ é simétrico; O e Ω são simetrias transpostas, assim como o e ω. Essas propriedades aparecem em itens V/F e são especialmente úteis para compor provas curtas."
      },
      {
        title: "Soma de custos e termo dominante",
        text: "Se f=O(h) e g=O(h), então f+g=O(h). Mais geralmente, uma soma de quantidade constante de funções, todas O(h), continua O(h). Se g=O(f), então f+g=Θ(f). Essa é a justificativa formal por trás da regra prática de que, em duas partes sequenciais de um algoritmo, o custo assintótico é dominado pela parte mais cara — desde que a comparação entre as funções esteja correta."
      },
      {
        title: "Hierarquia: logaritmos, polinômios e exponenciais",
        text: "Para qualquer potência positiva nᶜ, log n cresce estritamente mais devagar: log n=o(nᶜ). Por outro lado, para qualquer base a>1, todo polinômio nᶜ é o(aⁿ). A base do logaritmo não altera Θ(log n), porque mudança de base introduz apenas um fator constante. A base de uma exponencial importa: se r>s>1, rⁿ e sⁿ não pertencem à mesma classe Θ."
      },
      {
        title: "Corretude: invariante + término",
        text: "A parte final da Aula 2 usa Ordenação por Inserção para formalizar provas. Um invariante é uma propriedade preservada pelas transições do algoritmo. O roteiro oficial é: (1) definir a propriedade; (2) provar que uma transição q→r preserva a propriedade; (3) concluir por indução que todos os estados alcançáveis a satisfazem; (4) provar que o algoritmo termina; (5) usar a invariante no estado final para concluir que o problema foi resolvido. Provar apenas a invariante não basta se o algoritmo puder não terminar."
      },
      {
        title: "Laboratório 1: mapa das estruturas de dados em C++",
        text: "O arquivo data-structures.cpp revisa vector, stack, queue, set/unordered_set, multiset, map/unordered_map e priority_queue. vector é a base natural para listas de adjacência e sequências; stack modela LIFO e pode apoiar DFS iterativo; queue modela FIFO e é a estrutura central de BFS; set elimina duplicatas e mantém ordem; unordered_set privilegia pertencimento médio O(1); map associa chaves a valores com ordem; unordered_map faz associação por hashing; priority_queue permite extrair repetidamente a maior prioridade e, com greater<T>, pode funcionar como heap mínimo."
      },
      {
        title: "Simulado: BFS de todas as origens",
        text: "O simulado fornece um grafo dirigido, simples e sem pesos e pede a soma das menores distâncias entre todos os pares ordenados distintos que sejam alcançáveis, com limite explícito O(n·(n+m)). A decomposição natural é executar BFS a partir de cada vértice. Cada execução custa O(n+m) com lista de adjacência e queue, produzindo as distâncias mínimas em número de arestas daquela origem. Somar apenas distâncias finitas ao longo das n execuções respeita exatamente o orçamento solicitado."
      },
      {
        title: "Laboratório 1: os seis padrões de problema",
        text: "277A (Learning Languages) treina modelagem de conectividade em grafo bipartido ou DSU; 796D (Police Stations) treina BFS multiorigem em árvore e marcação de arestas; 1692B (All Distinct) treina contagem de distintos e raciocínio de paridade; 1526C2 (Potions) combina guloso com heap mínimo; 20C (Dijkstra?) exige caminho mínimo ponderado com priority_queue e reconstrução por predecessor; 416C (Booking System) combina ordenação, escolha gulosa e preservação de índices. Juntos, eles testam escolha de estrutura, leitura de limites e implementação robusta — exatamente os pré-requisitos que a disciplina assume de PAA I."
      },
      {
        title: "Como estudar os problemas do laboratório",
        text: "Antes de programar, registre quatro linhas: qual é o objeto matemático (vetor, grafo, árvore, conjunto de pedidos), qual operação domina, qual estrutura suporta essa operação e qual complexidade cabe nos limites. Depois da implementação, escreva em linguagem natural o argumento central de corretude. O objetivo da semana não é decorar seis códigos, mas reconhecer seis padrões reutilizáveis."
      }
    ],
    checklist: [
      "Reescrever de memória as definições de O, Ω, Θ, o e ω, incluindo quantificadores sobre c e n₀.",
      "Provar pela definição pelo menos uma relação O e uma relação Θ com polinômios.",
      "Montar uma tabela com transitividade, reflexividade e simetria/simetria transposta das cinco notações.",
      "Explicar por que a base do logaritmo não altera Θ(log n), mas a base da exponencial altera a taxa assintótica.",
      "Escrever uma prova completa por invariante com propriedade, preservação, indução, término e conclusão.",
      "Compilar e testar exemplos mínimos de vector, stack, queue, set, map e priority_queue a partir do material do laboratório.",
      "Implementar BFS com lista de adjacência e reconstruir mentalmente por que ele encontra distâncias mínimas em grafo não ponderado.",
      "Resolver o simulado com uma BFS por origem e conferir o custo O(n·(n+m)).",
      "Para cada problema Codeforces do Laboratório 1, identificar antes de codar: paradigma, estrutura principal e complexidade-alvo.",
      "Registrar no caderno de erros pelo menos um bug de estrutura de dados, um bug de índice e um erro de complexidade encontrado durante o laboratório."
    ],
    exercises: [
      {
        id: "w2e1", difficulty: "Básico", origin: "Class2.pdf", title: "Cinco notações, cinco significados",
        prompt: "Classifique e justifique: (a) 8n²+3n+10=O(n²); (b) 8n²+3n+10=Ω(n²); (c) 8n²+3n+10=Θ(n²); (d) n²=o(n³); (e) n³=ω(n²).",
        hint: "Para (a)–(c), escolha constantes simples. Para (d)–(e), use o quociente entre as funções.",
        solution: "Todas são verdadeiras. Para n≥1, 8n²≤8n²+3n+10≤21n², fornecendo Θ(n²). Além disso, n²/n³=1/n→0 e n³/n²=n→∞."
      },
      {
        id: "w2e2", difficulty: "Médio", origin: "Class2.pdf", title: "Propriedades assintóticas",
        prompt: "Decida e justifique: (a) se f=O(g) e g=O(h), então f=O(h); (b) se f=O(g), então g=O(f); (c) f=o(f); (d) se f=o(g), então g=ω(f); (e) se f=Θ(g), então g=Θ(f).",
        hint: "Separe transitividade, reflexividade e simetria. O e Ω formam uma simetria transposta, não uma simetria simples.",
        solution: "(a) verdadeiro por transitividade; (b) falso em geral; (c) falso; (d) verdadeiro por simetria transposta; (e) verdadeiro por simetria de Θ."
      },
      {
        id: "w2e3", difficulty: "Médio", origin: "Class2.pdf", title: "Hierarquia de crescimento",
        prompt: "Ordene, da menor para a maior taxa assintótica: log n, √n, n, n log n, n², 1.5ⁿ, 2ⁿ. Em seguida explique quais mudanças de base preservam Θ e quais não preservam.",
        hint: "Logaritmos de bases constantes >1 diferem por fator constante; exponenciais com bases distintas mantêm uma razão exponencial.",
        solution: "log n < √n < n < n log n < n² < 1.5ⁿ < 2ⁿ. A base do logaritmo não altera Θ(log n); bases exponenciais diferentes, em geral, não pertencem à mesma classe Θ."
      },
      {
        id: "w2e4", difficulty: "Avançado", origin: "Class2.pdf", title: "Roteiro de prova por invariante",
        prompt: "Escreva uma prova de corretude para um algoritmo iterativo simples usando exatamente cinco blocos: propriedade, preservação, alcance por indução, término e conclusão.",
        hint: "Você pode usar busca de máximo em um vetor: após processar o prefixo A[1..i], max contém o maior elemento desse prefixo.",
        solution: "Uma solução completa define a propriedade sobre o prefixo, prova que comparar o próximo elemento preserva o máximo correto, usa indução sobre o número de iterações, observa que o índice cresce até n e conclui que, no término, o prefixo é o vetor inteiro."
      },
      {
        id: "w2lab-sim", difficulty: "Médio", origin: "Simulado Lab 1", title: "Todas as distâncias em grafo não ponderado",
        prompt: "Em um digrafo não ponderado, calcule a soma das menores distâncias entre todos os pares ordenados distintos alcançáveis, respeitando O(n·(n+m)). Descreva a estrutura de dados e por que o custo fecha.",
        hint: "Uma BFS resolve todas as distâncias a partir de uma origem. Repita para cada origem e reinicialize o vetor de distâncias.",
        solution: "Use lista de adjacência e queue. Para cada origem s, execute BFS em O(n+m), some dist[s→v] para v≠s com distância finita e prossiga para a origem seguinte. Repetindo n vezes, o custo é O(n·(n+m)); use um acumulador inteiro de 64 bits para a soma."
      },
      {
        id: "w2cf277", difficulty: "Médio", origin: "Codeforces 277A", title: "Learning Languages — conectividade",
        url: "https://codeforces.com/problemset/problem/277/A",
        prompt: "Modele funcionários e idiomas de modo que a comunicação indireta corresponda a conectividade. Determine qual quantidade estrutural deve ser reduzida para tornar todos os funcionários comunicáveis.",
        hint: "Pense em um grafo bipartido funcionário↔idioma ou em DSU unindo pessoas que compartilham um idioma. Há um caso especial quando ninguém conhece idioma algum.",
        solution: "No grafo bipartido, cada componente que contém funcionários representa um grupo que já consegue se comunicar internamente. Cada novo curso pode ligar componentes; portanto são necessários componentes−1 cursos. Se ninguém conhece qualquer idioma, não existe aresta inicial para reutilizar e cada um dos n funcionários precisa aprender algum idioma, dando n."
      },
      {
        id: "w2cf796", difficulty: "Avançado", origin: "Codeforces 796D", title: "Police Stations — BFS multiorigem",
        url: "https://codeforces.com/problemset/problem/796/D",
        prompt: "Em uma árvore com cidades que contêm delegacias, preserve a garantia de que toda cidade alcance uma delegacia e identifique o maior conjunto de estradas que pode ser removido.",
        hint: "Coloque todas as cidades com delegacia na fila no início. Observe o que acontece quando duas ondas de BFS tentam usar a mesma região da árvore.",
        solution: "Execute BFS multiorigem a partir das delegacias, marcando as arestas usadas para incorporar um vértice ainda não visitado à floresta. A BFS associa cada cidade a uma delegacia mais próxima; arestas não usadas conectam fronteiras de regiões já cobertas e podem ser removidas. A condição inicial do problema garante que as distâncias exigidas continuam válidas."
      },
      {
        id: "w2cf1692", difficulty: "Básico", origin: "Codeforces 1692B", title: "All Distinct — set e paridade",
        url: "https://codeforces.com/problemset/problem/1692/B",
        prompt: "Após remover elementos sempre aos pares, obtenha o maior comprimento possível de um vetor sem valores repetidos. Relacione o número de distintos com a paridade do número de remoções necessárias.",
        hint: "Se d é a quantidade de valores distintos, n−d mede quantos elementos excedentes existem. Toda operação remove exatamente dois elementos.",
        solution: "Conte d com set/unordered_set. Se n−d é par, é possível terminar com d elementos distintos; se é ímpar, a paridade força remover mais um elemento distinto, e a resposta é d−1."
      },
      {
        id: "w2cf1526", difficulty: "Avançado", origin: "Codeforces 1526C2", title: "Potions — guloso com heap mínimo",
        url: "https://codeforces.com/problemset/problem/1526/C2",
        prompt: "Percorra uma sequência da esquerda para a direita, escolhendo o máximo de valores sem permitir que a soma acumulada fique negativa em nenhum prefixo.",
        hint: "Aceite candidatos enquanto possível. Se a soma ficar negativa, qual elemento escolhido até agora seria o melhor para desfazer a fim de recuperar o máximo de soma com perda de apenas uma escolha?",
        solution: "Mantenha a soma dos itens atualmente escolhidos e um heap mínimo com seus valores. Insira o valor atual; se a soma ficar negativa, remova do conjunto escolhido o menor valor do heap (o mais prejudicial), desfazendo sua contribuição. Assim preservamos o maior número possível de escolhas para cada prefixo e o algoritmo roda em O(n log n)."
      },
      {
        id: "w2cf20", difficulty: "Avançado", origin: "Codeforces 20C", title: "Dijkstra? — caminho mínimo e reconstrução",
        url: "https://codeforces.com/problemset/problem/20/C",
        prompt: "Encontre um caminho de peso mínimo do vértice 1 ao vértice n em grafo não direcionado com pesos positivos e imprima os vértices do caminho, não apenas a distância.",
        hint: "Além de dist[v], salve parent[v] quando uma relaxação melhora a distância. Use priority_queue configurada como heap mínimo.",
        solution: "Execute Dijkstra com lista de adjacência e heap mínimo de pares (distância,vértice). Em cada relaxação bem-sucedida, atualize dist[v] e parent[v]. Se n for inalcançável, devolva −1; caso contrário, siga parent de n até 1 e inverta a sequência. Com heap binário, o custo é O((n+m) log n)."
      },
      {
        id: "w2cf416", difficulty: "Médio", origin: "Codeforces 416C", title: "Booking System — ordenação e guloso",
        url: "https://codeforces.com/problemset/problem/416/C",
        prompt: "Associe pedidos de grupos a mesas com capacidade suficiente, usando cada mesa no máximo uma vez, de modo a maximizar a receita total e preservar os índices originais para a saída.",
        hint: "Priorize os pedidos de maior pagamento. Para cada pedido aceito, consumir uma mesa maior que o necessário pode bloquear grupos futuros sem aumentar o ganho desse pedido.",
        solution: "Ordene pedidos por pagamento decrescente e, para cada um, escolha a menor mesa ainda livre que comporte o grupo. Preserve os índices originais de pedidos e mesas. Nos limites do problema, uma busca direta de mesa já é suficiente; estruturas ordenadas também permitem localizar a menor capacidade viável."
      }
    ]
  });
})();
