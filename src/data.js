window.STUDY_DATA = {
  meta: {
    appVersion: "2.0.0",
    term: "2026/2",
    courseCode: "INF05028",
    courseName: "Projeto e Análise de Algoritmos II",
    sourceNote: "Cronograma 2026/2 + Plano de Ensino 2026/1 + Guia de Estudos de Algoritmos.md + listas/provas fornecidas no projeto"
  },

  course: {
    credits: 4,
    totalHours: 60,
    collectiveHours: 50,
    autonomousHours: 10,
    meetings: 30,
    meetingMinutes: 100,
    attendanceMinimum: 75,
    evaluation: [
      { key: "p1", label: "Prova 1", weight: 0.30 },
      { key: "p2", label: "Prova 2", weight: 0.40 },
      { key: "ap", label: "Avaliações Práticas", weight: 0.20 },
      { key: "aa", label: "Atividades Autônomas", weight: 0.10 }
    ],
    concepts: [
      { label: "A", min: 9.0, description: "Aprovado" },
      { label: "B", min: 7.5, description: "Aprovado" },
      { label: "C", min: 6.0, description: "Aprovado" },
      { label: "D", min: 0, description: "Recuperação, se elegível" }
    ],
    methodology: [
      "Aulas teórico-práticas, combinando apresentação de conceitos, exercícios e discussão.",
      "Uso possível de laboratórios para implementação e visualização de conceitos.",
      "Atividades extraclasse podem incluir listas, implementações, questionários, leituras e vídeos.",
      "O plano prevê Moodle/UFRGS ou sistemas equivalentes para distribuição e entrega de materiais.",
      "O uso de IA em tarefas ou atividades avaliativas é proibido, salvo autorização explícita e guiada do professor."
    ],
    objectives: [
      "Analisar formalmente corretude e eficiência de algoritmos.",
      "Projetar e implementar soluções por Divisão e Conquista e Programação Dinâmica.",
      "Selecionar estruturas e paradigmas adequados ao problema.",
      "Reconhecer situações em que uma técnica não produz solução eficiente.",
      "Modelar, adaptar e justificar algoritmos em linguagem matemática e computacional."
    ],
    syllabus: [
      { range: "1", title: "Introdução", content: "Análise assintótica, corretude e revisão de PAA I." },
      { range: "1–3", title: "Recorrências", content: "Árvore de recursão, substituição, introdução e prova do Método Mestre." },
      { range: "3–6", title: "Divisão e Conquista", content: "Inteiros, matrizes, par mais próximo, FFT, lower bound de ordenação e tópicos relacionados." },
      { range: "7–13", title: "Programação Dinâmica", content: "Mochila, alinhamento, Bellman–Ford, Floyd–Warshall, pseudo-polinomialidade e dificuldade forte/fraca." },
      { range: "14–15", title: "Tópicos avançados", content: "Análise amortizada, tabelas dinâmicas e tópicos adicionais." },
      { range: "16", title: "Recuperação", content: "Exame de recuperação." }
    ],
    bibliography: [
      { kind: "Básica essencial", citation: "Jon Kleinberg e Éva Tardos. Algorithm Design. Pearson, 2005." },
      { kind: "Básica", citation: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest e Clifford Stein. Algoritmos: Teoria e Prática. Elsevier, 2012." },
      { kind: "Básica", citation: "Tim Roughgarden. Algorithms Illuminated, Parts 1–4. Soundlikeyourself Publishing, 2017–2020." },
      { kind: "Complementar", citation: "Eric Lehman, F. Thomson Leighton e Albert R. Meyer. Mathematics for Computer Science. 12th Media Services, 2017." }
    ],
    sourceReconciliation: [
      {
        source: "Cronograma 2026/2",
        role: "Ordem real das aulas e datas",
        finding: "Define 30 encontros entre 06/08 e 26/11, com provas em 24/09, 12/11 e 19/11 e uma lacuna sem aula em 20–22/10."
      },
      {
        source: "Plano de Ensino 2026/1",
        role: "Regras e macroestrutura",
        finding: "Fornece objetivos, 60 h, 4 créditos, pesos 30/40/20/10, presença mínima de 75%, metodologia e bibliografia. É de 2026/1, portanto a plataforma sinaliza essa diferença de semestre."
      },
      {
        source: "Guia de Estudos de Algoritmos.md",
        role: "Profundidade conceitual",
        finding: "Expande análise assintótica, recorrências, Karatsuba, Strassen, buscas modificadas, geometria, DP, Hirschberg, grafos, análise amortizada, NP-completude e estratégia de prova."
      },
      {
        source: "Listas e provas históricas",
        role: "Padrão de cobrança",
        finding: "Reforçam respostas com algoritmo, prova de corretude e análise de custo; mostram recorrência de V/F conceitual, busca binária modificada, D&C, DP e caminhos mínimos."
      }
    ],
    recoveryConflict: {
      formulaText: "O plano escrito informa NNR = max(9, 12 − NF).",
      proseText: "No mesmo trecho, a explicação diz que a nota exigida cresce conforme NF cai e 'satura em 9,0', comportamento compatível com min(9, 12 − NF).",
      recommendation: "Há uma inconsistência interna no documento fornecido. A plataforma não assume silenciosamente qual regra é a correta; confirme a fórmula de recuperação com o professor ou no Moodle do semestre atual."
    }
  },

  schedule: [
    { n: 1, date: "2026-08-06", label: "06/08", topic: "Administrativo. Introdução.", type: "Aula" },
    { n: 2, date: "2026-08-11", label: "11/08", topic: "Revisão: Análise Assintótica e Corretude.", type: "Aula" },
    { n: 3, date: "2026-08-13", label: "13/08", topic: "Laboratório 1: Algoritmos PAA 1.", type: "Laboratório" },
    { n: 4, date: "2026-08-18", label: "18/08", topic: "Análise de Recorrências. Análise do Merge Sort.", type: "Aula" },
    { n: 5, date: "2026-08-20", label: "20/08", topic: "Substituição. Introdução ao Método Mestre.", type: "Aula" },
    { n: 6, date: "2026-08-25", label: "25/08", topic: "Prova do Método Mestre. Akra–Bazzi.", type: "Aula" },
    { n: 7, date: "2026-08-27", label: "27/08", topic: "Inversões. Multiplicações de Números.", type: "Aula" },
    { n: 8, date: "2026-09-01", label: "01/09", topic: "Multiplicações de Matrizes (Strassen).", type: "Autônoma" },
    { n: 9, date: "2026-09-03", label: "03/09", topic: "Par de Pontos Mais Próximos.", type: "Autônoma" },
    { n: 10, date: "2026-09-08", label: "08/09", topic: "Seleção. Lower Bounds para Ordenação.", type: "Aula" },
    { n: 11, date: "2026-09-10", label: "10/09", topic: "Convoluções. Transformada Rápida de Fourier.", type: "Aula" },
    { n: 12, date: "2026-09-15", label: "15/09", topic: "Aula Prática 1: Divisão e Conquista.", type: "Prática" },
    { n: 13, date: "2026-09-17", label: "17/09", topic: "Laboratório 2: Divisão e Conquista.", type: "Laboratório" },
    { n: 14, date: "2026-09-22", label: "22/09", topic: "Revisão para a prova.", type: "Revisão" },
    { n: 15, date: "2026-09-24", label: "24/09", topic: "Prova 1 (Teórica).", type: "Prova" },
    { n: 16, date: "2026-09-29", label: "29/09", topic: "Escalonamento de Intervalos com Pesos.", type: "Aula" },
    { n: 17, date: "2026-10-01", label: "01/10", topic: "Problema da Mochila.", type: "Aula" },
    { n: 18, date: "2026-10-06", label: "06/10", topic: "Algoritmos Pseudo-Polinomiais e Fraca/Fortemente NP-Difícil.", type: "Aula" },
    { n: 19, date: "2026-10-08", label: "08/10", topic: "Mínimos Quadrados Segmentados.", type: "Aula" },
    { n: 20, date: "2026-10-13", label: "13/10", topic: "Alinhamento de Sequências.", type: "Aula" },
    { n: 21, date: "2026-10-15", label: "15/10", topic: "Aula Prática 2: Programação Dinâmica.", type: "Prática" },
    { n: 22, date: "2026-10-27", label: "27/10", topic: "Bellman–Ford.", type: "Aula" },
    { n: 23, date: "2026-10-29", label: "29/10", topic: "Floyd–Warshall.", type: "Aula" },
    { n: 24, date: "2026-11-03", label: "03/11", topic: "Laboratório 3: Programação Dinâmica.", type: "Autônoma" },
    { n: 25, date: "2026-11-05", label: "05/11", topic: "Aula Prática 3: Programação Dinâmica.", type: "Prática" },
    { n: 26, date: "2026-11-10", label: "10/11", topic: "Revisão para a prova.", type: "Revisão" },
    { n: 27, date: "2026-11-12", label: "12/11", topic: "Prova 2 (Teórica).", type: "Prova" },
    { n: 28, date: "2026-11-17", label: "17/11", topic: "Análise Amortizada e Tabelas Dinâmicas.", type: "Aula" },
    { n: 29, date: "2026-11-19", label: "19/11", topic: "Prova 3 (Prática).", type: "Prova" },
    { n: null, date: "2026-11-24", label: "24/11", topic: "Recuperação.", type: "Recuperação" },
    { n: 30, date: "2026-11-26", label: "26/11", topic: "Descoberta de Algoritmos com IA.", type: "Aula" }
  ],

  weeks: [
    {
      id: 1,
      start: "2026-08-03",
      end: "2026-08-09",
      label: "03–09/08",
      title: "Introdução, rigor e mapa da disciplina",
      phase: "Fundamentos",
      sessions: [1],
      sources: ["Cronograma 2026/2", "Plano 2026/1", "Guia"],
      executive: [
        "A disciplina avalia três capacidades separadas: projetar, provar e analisar.",
        "Divisão e Conquista e Programação Dinâmica são os dois eixos centrais do plano.",
        "Respostas dissertativas devem explicitar algoritmo, corretude e custo.",
        "O guia histórico é útil para antecipar armadilhas, mas regras de semestres antigos não substituem as regras atuais."
      ],
      objectives: [
        "Montar um método de estudo baseado em recuperação ativa e resolução de problemas.",
        "Distinguir correção de eficiência: um algoritmo pode ser correto e ainda ser lento.",
        "Aprender o formato padrão de uma solução formal de algoritmos."
      ],
      theory: [
        {
          title: "O que significa analisar um algoritmo",
          text: "Analisar um algoritmo não é apenas medir tempo no computador. A análise procura uma garantia em função do tamanho da entrada. Primeiro definimos o que conta como operação relevante; depois descrevemos como esse custo cresce. A prova de corretude responde a outra pergunta: para toda entrada permitida, a saída produzida satisfaz a especificação?"
        },
        {
          title: "Estrutura de uma resposta completa",
          text: "Em questões de projeto, escreva a ideia em linguagem natural, dê pseudocódigo se ele tornar a solução verificável, prove a decisão principal e finalize contando o trabalho executado. Em DP, inclua significado do estado, casos base, recorrência, ordem de preenchimento e onde está a resposta final."
        },
        {
          title: "Como estudar esta disciplina",
          text: "O guia original enfatiza rigor, mas a melhor tradução prática é simples: explique o conceito com suas próprias palavras, resolva um exemplo sem consultar a solução, escreva a prova e registre o erro quando algo falhar. O objetivo é reduzir dependência de memorização literal."
        }
      ],
      checklist: [
        "Criar uma folha-modelo: algoritmo → corretude → custo.",
        "Criar um caderno de erros conceituais.",
        "Revisar rapidamente busca binária, Merge Sort, BFS e DFS de PAA I.",
        "Ler os critérios de avaliação e presença no painel da disciplina."
      ],
      exercises: [
        {
          id: "w1e1", difficulty: "Básico", origin: "Criado", title: "Correção versus eficiência",
          prompt: "Dê um exemplo de algoritmo correto, mas assintoticamente pior do que outra solução para o mesmo problema. Explique separadamente por que ele é correto e por que é menos eficiente.",
          hint: "Ordenação por seleção versus Merge Sort é um exemplo possível.",
          solution: "Uma resposta possível compara Selection Sort, que ordena corretamente por manter um prefixo já fixado, com Merge Sort. O primeiro executa Θ(n²) comparações no pior caso; o segundo executa Θ(n log n)."
        },
        {
          id: "w1e2", difficulty: "Básico", origin: "Criado", title: "Esqueleto de prova",
          prompt: "Escreva um modelo de cinco linhas para provar por indução a corretude de um algoritmo recursivo.",
          hint: "Inclua caso base, hipótese, passo e término.",
          solution: "Caso base: prove a menor entrada. Hipótese: suponha corretude para entradas menores. Passo: mostre que a chamada atual reduz a entrada, usa apenas subchamadas cobertas pela hipótese e combina os resultados corretamente. Término: mostre que a medida de tamanho diminui."
        }
      ]
    },

    {
      id: 2,
      start: "2026-08-10",
      end: "2026-08-16",
      label: "10–16/08",
      title: "Análise assintótica, corretude e revisão de PAA I",
      phase: "Fundamentos",
      sessions: [2, 3],
      sources: ["Cronograma 2026/2", "Plano 2026/1", "Guia", "Provas históricas"],
      executive: [
        "O, Ω e Θ expressam limites assintóticos; o e ω expressam limites estritos.",
        "Mudar a base de um logaritmo altera apenas um fator constante.",
        "Exponenciais com bases diferentes não são assintoticamente equivalentes em geral.",
        "Uma afirmação assintótica falsa muitas vezes cai com um contraexemplo simples."
      ],
      objectives: [
        "Usar as definições formais de O, Ω e Θ.",
        "Comparar ordens de crescimento sem depender de valores pequenos de n.",
        "Revisar invariantes, indução e estruturas de grafos básicas."
      ],
      theory: [
        {
          title: "O, Ω e Θ em linguagem operacional",
          text: "f(n)=O(g(n)) significa que, depois de algum ponto, f fica abaixo de uma constante multiplicando g. Ω inverte o papel: g fornece um limite inferior. Θ exige os dois lados ao mesmo tempo. Essas notações ignoram constantes multiplicativas e termos de menor ordem."
        },
        {
          title: "o e ω",
          text: "Os limites estritos dizem mais: f=o(g) significa que f/g tende a zero; f=ω(g) significa que f/g tende ao infinito. Logo, o(n²) é uma afirmação mais forte do que O(n²)."
        },
        {
          title: "Armadilhas recorrentes",
          text: "A troca de base logarítmica não muda Θ(log n). Já 3ⁿ não é O(2ⁿ), pois (3/2)ⁿ cresce sem limite. Também é importante separar implicações corretas das falsas: se f=Θ(g), então g=Θ(f); se f=O(g), isso não implica f=Θ(g)."
        },
        {
          title: "Corretude como prova, não como teste",
          text: "Testes aumentam confiança, mas não substituem uma prova universal. Para loops, um invariante descreve algo verdadeiro antes e depois de cada iteração. Para recursão, indução no tamanho da entrada costuma ser a ferramenta natural."
        },
        {
          title: "Revisão de grafos e customizações de BFS/DFS",
          text: "O guia também recupera BFS e DFS como base de PAA I. Ambas percorrem um grafo em O(|V|+|E|) com listas de adjacência. BFS fornece distâncias mínimas em número de arestas quando todas as arestas têm custo uniforme. Provas históricas adaptam essa ideia: para minimizar a quantidade de ruas 'estreitas', pode-se organizar a busca em camadas segundo quantas ruas estreitas já foram usadas e expandir gratuitamente, dentro de cada camada, por ruas largas."
        }
      ],
      checklist: [
        "Resolver 10 itens V/F de notação assintótica com justificativa.",
        "Produzir um contraexemplo para uma implicação falsa envolvendo O e Θ.",
        "Revisar a complexidade de BFS, DFS, busca binária e Merge Sort.",
        "Treinar uma prova de invariante e uma prova por indução."
      ],
      exercises: [
        {
          id: "w2e1", difficulty: "Médio", origin: "Inspirado em provas", title: "Classifique as relações",
          prompt: "Decida e justifique: (a) log₂(n⁵)=Θ(log₁₀ n); (b) 3ⁿ=O(2ⁿ); (c) n³=ω(n(log n)²); (d) se f=o(g), então f=O(g).",
          hint: "Use mudança de base, quocientes e as definições.",
          solution: "(a) Verdadeiro: log₂(n⁵)=5log₂n e bases constantes mudam apenas fator. (b) Falso: 3ⁿ/2ⁿ=(3/2)ⁿ→∞. (c) Verdadeiro: n³/[n(log n)²]=n²/(log n)²→∞. (d) Verdadeiro pela definição de limite estrito."
        },
        {
          id: "w2e2", difficulty: "Médio", origin: "Criado", title: "Prova pela definição",
          prompt: "Prove pela definição que 7n²+4n+20=Θ(n²).",
          hint: "Encontre c₁, c₂ e n₀ simples; não procure os melhores valores.",
          solution: "Para n≥1, 7n² ≤ 7n²+4n+20 ≤ 7n²+4n²+20n²=31n². Assim c₁=7, c₂=31 e n₀=1 funcionam."
        },
        {
          id: "w2e3", difficulty: "Avançado", origin: "Criado", title: "Implicação assintótica",
          prompt: "Se f=O(g) e g=o(h), prove que f=o(h).",
          hint: "Combine a constante de O com a constante arbitrária usada na definição de o.",
          solution: "Se f≤c'g e, para qualquer ε>0, g<(ε/c')h depois de certo n, então f≤c'g<εh. Como ε é arbitrário, f=o(h)."
        },
        {
          id: "w2e4", difficulty: "Avançado", origin: "Prova histórica", title: "Menor número de ruas estreitas",
          prompt: "Em um grafo não direcionado, cada rua é larga ou estreita. Descreva um algoritmo O(|V|+|E|) que encontre o menor número de ruas estreitas necessário para ir de s até t.",
          hint: "A camada k deve conter vértices alcançáveis usando k ruas estreitas; dentro da camada, expanda por todas as ruas largas.",
          solution: "Faça BFS/DFS apenas por ruas largas a partir de s para formar a camada 0. Da fronteira de cada camada, atravesse uma única rua estreita para criar sementes da próxima camada e, dessas sementes, expanda novamente por ruas largas. Marque cada vértice na primeira camada em que aparece. Cada vértice e aresta é processado O(1) vezes, totalizando O(|V|+|E|). A primeira camada contendo t dá a resposta."
        }
      ]
    },

    {
      id: 3,
      start: "2026-08-17",
      end: "2026-08-23",
      label: "17–23/08",
      title: "Recorrências, árvore de recursão, substituição e Método Mestre",
      phase: "Recorrências",
      sessions: [4, 5],
      sources: ["Cronograma 2026/2", "Plano 2026/1", "Guia", "Lista 1"],
      executive: [
        "Uma árvore de recursão deve separar nós por nível, custo por nó e custo total do nível.",
        "Substituição é indução: formule a hipótese, aplique-a e feche as constantes.",
        "No Mestre, compare f(n) com n^(log_b a), não apenas os coeficientes visuais da recorrência.",
        "Recorrências do tipo T(n−1)+f(n) não entram diretamente na forma clássica do Método Mestre."
      ],
      objectives: [
        "Abrir recorrências e somar custos por níveis.",
        "Provar limites por substituição.",
        "Aplicar o Método Mestre e justificar o caso escolhido."
      ],
      theory: [
        {
          title: "Árvore de recursão",
          text: "Para T(n)=aT(n/b)+f(n), o nível j possui aʲ subproblemas de tamanho n/bʲ. O custo local total do nível é aʲ·f(n/bʲ). A altura costuma ser log_b n quando o caso base é constante e a divisão é uniforme. O número de folhas é aproximadamente a^(log_b n)=n^(log_b a)."
        },
        {
          title: "Método da substituição",
          text: "O método da substituição não serve para 'adivinhar por mágica'. Primeiro obtenha uma hipótese plausível pela árvore ou por padrão. Depois prove, normalmente por indução forte, que T(n) ≤ c·g(n) ou T(n) ≥ c·g(n) para n suficientemente grande. Termos aditivos podem exigir reforçar a hipótese."
        },
        {
          title: "Método Mestre",
          text: "Na forma T(n)=aT(n/b)+Θ(nᵈ), compare a com bᵈ. Se a>bᵈ, as folhas dominam e T=Θ(n^(log_b a)). Se a=bᵈ, os níveis contribuem na mesma ordem e surge Θ(nᵈ log n). Se a<bᵈ, o trabalho local domina e T=Θ(nᵈ), dentro das condições do teorema."
        },
        {
          title: "Exemplo importante do material",
          text: "Em T(n)=4T(n/2)+n, o nível j tem 4ʲ nós; cada nó custa n/2ʲ; então o custo do nível é n·2ʲ. O custo cresce em direção às folhas, e a solução é Θ(n²). Esse tipo de conta aparece repetidamente nas provas."
        }
      ],
      checklist: [
        "Fazer árvore completa de T(n)=T(n−1)+n.",
        "Fazer árvore completa de T(n)=4T(n/2)+n.",
        "Provar pelo menos um limite por substituição.",
        "Resolver seis recorrências variando os três casos do Mestre."
      ],
      exercises: [
        {
          id: "w3e1", difficulty: "Médio", origin: "Lista 1", title: "Árvore de T(n)=4T(n/2)+n",
          prompt: "Determine número de níveis, nós por nível j, custo por nó, custo por nível, número de folhas e custo total.",
          hint: "No nível j: 4ʲ nós e tamanho n/2ʲ.",
          solution: "Altura log₂n. Nós: 4ʲ. Custo por nó: n/2ʲ. Custo do nível: n·2ʲ. Folhas: 4^(log₂n)=n². A soma geométrica é dominada pelo último nível; T(n)=Θ(n²)."
        },
        {
          id: "w3e2", difficulty: "Médio", origin: "Lista 1", title: "Recorrências pelo Mestre",
          prompt: "Encontre limites assintóticos para: (a) 4T(n/4)+5n; (b) 4T(n/5)+5n; (c) 5T(n/3)+4n; (d) 25T(n/5)+n².",
          hint: "Compare a com bᵈ em cada caso.",
          solution: "(a) a=4=b¹: Θ(n log n). (b) 4<5: Θ(n). (c) 5>3: Θ(n^(log₃5)). (d) 25=5²: Θ(n² log n)."
        },
        {
          id: "w3e3", difficulty: "Avançado", origin: "Criado", title: "Substituição reforçada",
          prompt: "Mostre que T(n)=2T(n/2)+n, T(1)=1, é O(n log n) por substituição.",
          hint: "Use hipótese T(m)≤c·m log₂m para m<n e trate o termo +n.",
          solution: "T(n)≤2[c(n/2)log(n/2)]+n=cn(log n−1)+n=cnlog n+n(1−c). Para c≥1, o termo final é ≤0, fechando T(n)≤cnlog n para n potência de 2."
        }
      ]
    },

    {
      id: 4,
      start: "2026-08-24",
      end: "2026-08-30",
      label: "24–30/08",
      title: "Prova do Mestre, Akra–Bazzi, inversões e Karatsuba",
      phase: "Divisão e Conquista",
      sessions: [6, 7],
      sources: ["Cronograma 2026/2", "Guia", "Provas históricas"],
      executive: [
        "Akra–Bazzi amplia a análise para divisões de tamanhos diferentes.",
        "Inversões podem ser contadas no combine do Merge Sort em O(n log n).",
        "Karatsuba reduz 4 multiplicações de meia entrada para 3.",
        "Karatsuba resolve T(n)=3T(n/2)+O(n)=Θ(n^log₂3), aproximadamente n^1,585."
      ],
      objectives: [
        "Entender a motivação do Mestre em termos de contribuição por nível.",
        "Reconhecer quando o Mestre clássico não se encaixa diretamente.",
        "Projetar um combine que conte pares sem voltar a O(n²).",
        "Derivar Karatsuba pela álgebra do termo cruzado."
      ],
      theory: [
        {
          title: "Por que o Mestre funciona",
          text: "A comparação central mede se a quantidade de subproblemas cresce mais rápido, no mesmo ritmo ou mais devagar do que o trabalho local reduz ao descer na árvore. Essa leitura explica os três casos e é mais útil do que decorar nomes."
        },
        {
          title: "Akra–Bazzi em perspectiva",
          text: "O cronograma inclui Akra–Bazzi logo após a prova do Mestre. A utilidade conceitual é lidar com recorrências com divisões não uniformes, por exemplo T(n)=T(n/2)+T(n/3)+n. A plataforma o trata como extensão: identifique a equação que determina o expoente p e depois avalie o termo de integração conforme a formulação apresentada em aula."
        },
        {
          title: "Contagem de inversões",
          text: "No Merge Sort, cada metade retorna ordenada. Durante o merge, se o próximo elemento da direita é menor que o próximo da esquerda, ele forma inversão com todos os elementos ainda não consumidos da metade esquerda. Assim, contamos muitas inversões de uma vez sem comparar todo par."
        },
        {
          title: "Karatsuba",
          text: "Escreva x=a·B^m+b e y=c·B^m+d. O produto exige ac, bd e ad+bc. Em vez de calcular ad e bc separadamente, use (a+b)(c+d)−ac−bd. São três multiplicações recursivas: ac, bd e (a+b)(c+d), mais somas lineares."
        }
      ],
      checklist: [
        "Derivar Karatsuba sem consultar o guia.",
        "Explicar por que a quantidade de multiplicações de 1 dígito é 3^(log₂n)=n^(log₂3).",
        "Implementar contagem de inversões sobre Merge Sort.",
        "Levar uma recorrência fora do Mestre clássico e explicar por que Akra–Bazzi é relevante."
      ],
      exercises: [
        {
          id: "w4e1", difficulty: "Médio", origin: "Inspirado em provas", title: "Folhas de Karatsuba",
          prompt: "Para entradas com n=2ᵏ dígitos e caso base de 1 dígito, quantas multiplicações de um dígito são realizadas por Karatsuba?",
          hint: "A árvore tem ramificação 3 e altura log₂n.",
          solution: "São 3^(log₂n)=n^(log₂3) folhas e, portanto, essa quantidade de multiplicações base."
        },
        {
          id: "w4e2", difficulty: "Avançado", origin: "Lista 1 adaptada", title: "Inversões fortes",
          prompt: "Um par (aᵢ,aⱼ) é inversão forte se i<j e aᵢ>2aⱼ. Projete um algoritmo O(n log n) usando Merge Sort.",
          hint: "Antes do merge, as duas metades já estão ordenadas. Use dois ponteiros para contar quantos elementos da direita satisfazem a desigualdade para cada elemento da esquerda.",
          solution: "Recursivamente conte dentro de cada metade. No combine, com L e R ordenados, avance j monotonamente enquanto L[i]>2R[j]; some j ao total para cada i. Depois faça o merge normal. O combine é linear e T(n)=2T(n/2)+O(n)=O(n log n)."
        },
        {
          id: "w4e3", difficulty: "Avançado", origin: "Criado", title: "Quando o Mestre não basta",
          prompt: "Explique por que T(n)=T(n/2)+T(n/3)+n não se encaixa na forma clássica T(n)=aT(n/b)+f(n).",
          hint: "Observe que os subproblemas não têm o mesmo tamanho.",
          solution: "Não existe um único b que represente simultaneamente n/2 e n/3. A recorrência tem duas frações distintas, motivo pelo qual uma generalização como Akra–Bazzi é apropriada."
        }
      ]
    },

    {
      id: 5,
      start: "2026-08-31",
      end: "2026-09-06",
      label: "31/08–06/09",
      title: "Strassen e Par de Pontos Mais Próximos",
      phase: "Divisão e Conquista",
      sessions: [8, 9],
      sources: ["Cronograma 2026/2", "Guia", "Provas históricas"],
      executive: [
        "Strassen usa 7 multiplicações recursivas de submatrizes, não 8.",
        "Sua recorrência é T(n)=7T(n/2)+O(n²), levando a Θ(n^log₂7).",
        "No Par Mais Próximo, o segredo é um combine linear após pré-ordenação adequada.",
        "Na faixa central ordenada por y, cada ponto precisa ser comparado apenas com um número constante de sucessores."
      ],
      objectives: [
        "Relacionar redução no número de chamadas ao expoente final de complexidade.",
        "Entender por que o Par Mais Próximo não precisa comparar todos os pares da faixa.",
        "Separar corretamente pré-processamento, recursão e combine."
      ],
      theory: [
        {
          title: "Strassen",
          text: "A multiplicação em blocos 2×2 aparentemente exige 8 multiplicações de submatrizes. Strassen reorganiza somas e subtrações para usar 7 produtos recursivos. Como somar matrizes custa O(n²), a recorrência fica 7T(n/2)+O(n²), e o termo recursivo domina."
        },
        {
          title: "Árvore de Strassen",
          text: "Para n potência de 2, o nível j possui 7ʲ subproblemas de dimensão n/2ʲ. Esse detalhe aparece em V/F porque é fácil confundir Strassen com Karatsuba ou com a multiplicação clássica em blocos."
        },
        {
          title: "Par Mais Próximo: divisão",
          text: "Ordene os pontos por x, divida na mediana e resolva as duas metades. Seja δ o menor valor retornado. Qualquer par cruzando a divisória que melhore δ precisa estar dentro da faixa de largura 2δ centrada na divisão."
        },
        {
          title: "Par Mais Próximo: combine",
          text: "Ordenando a faixa por y, uma argumentação geométrica de empacotamento limita a quantidade de candidatos relevantes por ponto a uma constante (comumente apresentada como até os próximos 7). Isso torna o combine O(n), e a recorrência 2T(n/2)+O(n) produz O(n log n)."
        }
      ],
      checklist: [
        "Escrever a recorrência de Strassen e resolvê-la.",
        "Explicar verbalmente por que são 7 chamadas.",
        "Desenhar a faixa de largura 2δ do Par Mais Próximo.",
        "Justificar por que o combine é linear."
      ],
      exercises: [
        {
          id: "w5e1", difficulty: "Básico", origin: "Inspirado em provas", title: "Árvore de Strassen",
          prompt: "Para matrizes n×n, n potência de 2, quantos subproblemas existem no nível j e quantas folhas há?",
          hint: "A ramificação é 7 e a altura é log₂n.",
          solution: "No nível j há 7ʲ subproblemas. Nas folhas: 7^(log₂n)=n^(log₂7)."
        },
        {
          id: "w5e2", difficulty: "Médio", origin: "Inspirado em provas", title: "Faixa do Par Mais Próximo",
          prompt: "Se a divisão vertical ocorre em x*=1 e δ=1, um ponto com x=4 deve entrar na faixa de combinação? Justifique.",
          hint: "A faixa contém x no intervalo [x*−δ, x*+δ].",
          solution: "Não. A faixa é [0,2] na coordenada x. O ponto x=4 está fora e não participa do combine."
        },
        {
          id: "w5e3", difficulty: "Avançado", origin: "Criado", title: "Erro de implementação",
          prompt: "Explique por que ordenar do zero por y dentro de cada chamada recursiva pode degradar o Par Mais Próximo para O(n log²n), e como evitar isso.",
          hint: "Some o custo de ordenação O(n log n) em cada nível da recursão.",
          solution: "Se cada nó de tamanho m ordena sua faixa em O(m log m), o custo agregado por nível pode ser O(n log n) ao longo de O(log n) níveis, resultando O(n log²n). Mantendo listas já ordenadas por y e particionando/mesclando linearmente, o combine permanece O(n)."
        }
      ]
    },

    {
      id: 6,
      start: "2026-09-07",
      end: "2026-09-13",
      label: "07–13/09",
      title: "Seleção, lower bound de ordenação, convolução e FFT",
      phase: "Divisão e Conquista",
      sessions: [10, 11],
      sources: ["Cronograma 2026/2", "Plano 2026/1", "Guia", "Provas históricas"],
      executive: [
        "O limite Ω(n log n) vale para ordenação baseada em comparações.",
        "A prova usa uma árvore de decisão com pelo menos n! folhas.",
        "FFT explora raízes da unidade e separação de coeficientes pares/ímpares.",
        "Convolução e multiplicação de polinômios são aplicações centrais da FFT."
      ],
      objectives: [
        "Provar o lower bound via árvore de decisão.",
        "Entender o papel de n! e da altura da árvore binária.",
        "Conectar avaliação de polinômios, FFT e convolução."
      ],
      theory: [
        {
          title: "Seleção",
          text: "Seleção busca o k-ésimo menor elemento sem necessariamente ordenar tudo. O tema é importante porque força a separar o objetivo 'encontrar uma ordem estatística' do objetivo mais caro 'produzir a ordenação completa'. O cronograma o posiciona imediatamente antes do lower bound de ordenação."
        },
        {
          title: "Lower bound para comparação",
          text: "Uma ordenação por comparações pode ser vista como árvore binária: cada nó testa uma comparação e cada folha representa uma ordem final. Há n! permutações possíveis de n elementos distintos, então uma árvore correta precisa de pelo menos n! folhas. Se a altura é h, 2ʰ≥n!, logo h≥log₂(n!)=Ω(n log n)."
        },
        {
          title: "FFT: ideia estrutural",
          text: "Para avaliar um polinômio rapidamente em raízes da unidade, separe termos de grau par e ímpar: A(x)=A_par(x²)+xA_ímpar(x²). Isso gera dois subproblemas com metade dos coeficientes e uma combinação linear."
        },
        {
          title: "Convolução",
          text: "Multiplicar dois polinômios na representação por coeficientes exige convolução. Em vez de O(n²), transformamos os coeficientes para valores, multiplicamos ponto a ponto e aplicamos a transformada inversa, alcançando O(n log n) sob a implementação FFT."
        }
      ],
      checklist: [
        "Refazer a prova de Ω(n log n) sem consultar notas.",
        "Explicar por que Counting Sort não contradiz o lower bound de comparação.",
        "Calcular manualmente uma FFT de 4 pontos.",
        "Relacionar convolução a multiplicação de polinômios."
      ],
      exercises: [
        {
          id: "w6e1", difficulty: "Médio", origin: "Inspirado em provas", title: "Árvore de decisão",
          prompt: "Explique por que uma árvore de decisão de ordenação precisa de pelo menos n! folhas e derive Ω(n log n).",
          hint: "Cada permutação deve resultar em uma saída diferente.",
          solution: "Há n! ordens possíveis para n elementos distintos. Cada folha representa uma resposta final; portanto, são necessárias ao menos n! folhas. Uma árvore binária de altura h tem no máximo 2ʰ folhas, então 2ʰ≥n!, h≥log₂(n!)=Ω(n log n)."
        },
        {
          id: "w6e2", difficulty: "Médio", origin: "Inspirado em prova 2026/1", title: "Raízes quartas da unidade",
          prompt: "Avalie A(x)=1+2x em 1, i, −1 e −i.",
          hint: "Substitua diretamente.",
          solution: "A(1)=3; A(i)=1+2i; A(−1)=−1; A(−i)=1−2i."
        },
        {
          id: "w6e3", difficulty: "Avançado", origin: "Criado", title: "Por que o lower bound não é universal",
          prompt: "Explique por que a existência de Radix Sort ou Counting Sort não contradiz Ω(n log n) para ordenação por comparação.",
          hint: "Identifique a hipótese do modelo de decisão.",
          solution: "O lower bound vale para algoritmos cuja única forma de obter informação sobre a ordem é comparar elementos. Counting/Radix usam propriedades adicionais da representação das chaves, então operam fora desse modelo."
        }
      ]
    },

    {
      id: 7,
      start: "2026-09-14",
      end: "2026-09-20",
      label: "14–20/09",
      title: "Prática de Divisão e Conquista: busca binária modificada e skyline",
      phase: "Divisão e Conquista",
      sessions: [12, 13],
      sources: ["Cronograma 2026/2", "Guia", "Lista 1", "Prova 1 2026/1"],
      executive: [
        "Variações de busca binária exigem uma prova explícita de por que metade pode ser descartada.",
        "Vetor rotacionado: em cada passo, pelo menos uma metade permanece ordenada.",
        "Pontos máximos (skyline): após ordenar por x, pontos da direita nunca são dominados pela esquerda.",
        "O combine precisa permanecer O(n) para conservar O(n log n)."
      ],
      objectives: [
        "Projetar buscas logarítmicas a partir de uma propriedade monotônica.",
        "Provar descarte de metade usando ordenação e distinção dos valores.",
        "Projetar o combine do problema de pontos máximos."
      ],
      theory: [
        {
          title: "Índice fixo A[i]=i",
          text: "Considere A ordenado com inteiros distintos. Se A[mid]<mid, então para k≤mid temos A[k]≤A[mid]−(mid−k)<k; portanto nenhum índice à esquerda é solução. O caso A[mid]>mid é simétrico. Cada passo descarta metade e custa O(1), resultando O(log n)."
        },
        {
          title: "Última ocorrência",
          text: "Em um vetor não decrescente com repetições, encontrar qualquer x não basta. Quando A[mid]≤x, vale a pena procurar primeiro à direita; só se não houver x lá, mid pode ser a última ocorrência. Uma versão iterativa também pode guardar a melhor resposta e continuar à direita."
        },
        {
          title: "Busca em vetor rotacionado",
          text: "Com valores distintos, uma das metades [i..mid] ou [mid..j] está ordenada. Identifique qual é e verifique se x está dentro do intervalo de valores dessa metade. Se estiver, recurse nela; caso contrário, vá para a outra."
        },
        {
          title: "Pontos máximos (skyline)",
          text: "Ordene por x e divida em L e R. Como todo ponto de R tem x maior do que todo ponto de L, nenhum ponto de L domina R. Um ponto máximo de L sobrevive se seu y for estritamente maior do que o maior y entre os máximos de R; os demais são dominados."
        }
      ],
      checklist: [
        "Resolver índice fixo em O(log n) com prova completa.",
        "Resolver última ocorrência de x em O(log n).",
        "Resolver busca em vetor rotacionado em O(log n).",
        "Implementar skyline em O(n log n) após ordenação por x."
      ],
      exercises: [
        {
          id: "w7e1", difficulty: "Médio", origin: "Lista 1", title: "Índice fixo",
          prompt: "Dado vetor ordenado de inteiros distintos A[1..n], encontre i com A[i]=i em O(log n), ou −1.",
          hint: "Analise o sinal de A[mid]−mid e use o fato de que valores distintos crescem pelo menos 1 por posição.",
          solution: "Busca binária: se A[mid]=mid, retorne. Se A[mid]<mid, descarte a esquerda; se A[mid]>mid, descarte a direita. A prova usa A[k]≤A[mid]−(mid−k) para k≤mid e a desigualdade simétrica para k≥mid."
        },
        {
          id: "w7e2", difficulty: "Médio", origin: "Prova 1 2026/1", title: "Vetor rotacionado",
          prompt: "Em [4,5,6,7,0,1,2], descreva as decisões da busca por x=1 usando o algoritmo O(log n).",
          hint: "Em cada passo identifique a metade ordenada.",
          solution: "No intervalo todo, mid aponta para 7; a esquerda está ordenada [4,5,6,7], mas 1 não está nesse intervalo, então vá à direita [0,1,2]. A busca binária nesse trecho encontra 1."
        },
        {
          id: "w7e3", difficulty: "Avançado", origin: "Lista 1 / Prova 1", title: "Pontos máximos",
          prompt: "Para P={(1,2),(2,4),(3,1),(4,3),(5,2)}, obtenha os pontos máximos e explique o combine do algoritmo O(n log n).",
          hint: "Depois de resolver L e R, compare os y da esquerda com o maior y dos máximos da direita.",
          solution: "Os máximos são {(2,4),(4,3),(5,2)}. No combine, R não pode ser dominado por L por ter x maior. Um máximo de L é removido se y≤maxY(R). Fazer isso linearmente em cada nível dá T(n)=2T(n/2)+O(n)."
        }
      ]
    },

    {
      id: 8,
      start: "2026-09-21",
      end: "2026-09-27",
      label: "21–27/09",
      title: "Revisão integrada e Prova 1",
      phase: "Avaliação",
      sessions: [14, 15],
      sources: ["Cronograma 2026/2", "Guia", "Lista 1", "Provas históricas"],
      executive: [
        "A Prova 1 do cronograma ocorre em 24/09.",
        "Priorize recorrências, D&C e justificativas de descarte/combinação.",
        "Treine V/F com justificativa curta e questões dissertativas completas.",
        "Use simulado cronometrado para identificar gargalos reais."
      ],
      objectives: [
        "Consolidar todos os tópicos das semanas 2–7.",
        "Reduzir erros de notação e análise de custo.",
        "Treinar escrita sob tempo limitado."
      ],
      theory: [
        {
          title: "Estratégia para V/F",
          text: "O guia histórico dá muita ênfase a penalidades de V/F em semestres anteriores. Como essa regra não está no cronograma 2026/2 nem no plano 2026/1 fornecido, trate-a como histórico, não como regra atual. A estratégia conceitual continua válida: tente achar contraexemplo primeiro e, se a afirmação for assintótica, volte à definição."
        },
        {
          title: "Estratégia para questões dissertativas",
          text: "Comece pela ideia e pelo invariante/propriedade que torna o algoritmo correto. Só depois detalhe pseudocódigo. Termine explicitando a recorrência ou contando laços/estados. Evite deixar a análise em uma frase vaga como 'é rápido porque divide pela metade'."
        },
        {
          title: "Checklist de diagnóstico",
          text: "Se você não consegue explicar o combine do Par Mais Próximo, derivar Karatsuba, resolver T(n)=4T(n/2)+n e provar uma busca binária modificada sem consultar material, ainda há lacunas importantes para a Prova 1."
        }
      ],
      checklist: [
        "Fazer um simulado misto de 90–120 min.",
        "Corrigir o simulado e classificar erros por conceito.",
        "Refazer apenas as questões erradas sem olhar a solução.",
        "Preparar folha de revisão com fórmulas e gatilhos de prova."
      ],
      exercises: [
        {
          id: "w8e1", difficulty: "Simulado", origin: "Criado", title: "Mini Prova 1 — recorrência",
          prompt: "Resolva T(n)=9T(n/3)+n por Método Mestre e explique, em uma frase, o que domina na árvore.",
          hint: "a=9, b=3, d=1.",
          solution: "Como 9>3¹, folhas dominam. T(n)=Θ(n^(log₃9))=Θ(n²)."
        },
        {
          id: "w8e2", difficulty: "Simulado", origin: "Criado", title: "Mini Prova 1 — projeto",
          prompt: "Dado vetor ordenado não decrescente com repetições, encontre a última posição de x em O(log n). Forneça algoritmo, corretude e custo.",
          hint: "Guarde a melhor ocorrência e continue à direita quando A[mid]≤x.",
          solution: "Busca binária modificada. Se A[mid]>x, esquerda. Caso contrário, se A[mid]=x guarde mid e avance à direita. A ordenação garante que nenhuma ocorrência relevante está na metade descartada. O intervalo cai pela metade: O(log n)."
        }
      ]
    },

    {
      id: 9,
      start: "2026-09-28",
      end: "2026-10-04",
      label: "28/09–04/10",
      title: "Programação Dinâmica I: intervalos com pesos e mochila",
      phase: "Programação Dinâmica",
      sessions: [16, 17],
      sources: ["Cronograma 2026/2", "Plano 2026/1", "Guia", "Prova 2 2026/1"],
      executive: [
        "DP começa pela definição do estado, não pela tabela.",
        "Weighted Interval Scheduling: OPT(j)=max(vⱼ+OPT(p(j)), OPT(j−1)).",
        "Mochila 0/1 compara excluir o item com incluí-lo uma única vez.",
        "Subestrutura ótima explica por que as transições podem combinar ótimos menores."
      ],
      objectives: [
        "Modelar estados a partir da última decisão.",
        "Definir p(j) no escalonamento com pesos.",
        "Diferenciar mochila 0/1 de mochila irrestrita.",
        "Escrever prova de corretude por análise exaustiva dos casos."
      ],
      theory: [
        {
          title: "Como reconhecer DP",
          text: "A formulação clássica usa subestrutura ótima e subproblemas que se repetem. O sinal mais útil em prova é outro: uma decisão global pode ser descrita pela última escolha, deixando um subproblema menor da mesma natureza. Se a mesma região do espaço de estados aparece muitas vezes, memoização ou tabulação evita recomputação."
        },
        {
          title: "Escalonamento de intervalos com pesos",
          text: "Ordene tarefas por término. Para a tarefa j, p(j) é a última tarefa que termina antes de j começar. Uma solução ótima entre as primeiras j tarefas ou usa j — recebendo vⱼ mais a melhor solução compatível até p(j) — ou não usa j, ficando com OPT(j−1)."
        },
        {
          title: "Mochila 0/1",
          text: "Defina OPT(i,c) como o melhor valor usando os primeiros i itens e capacidade c. Se o item i não cabe, copie OPT(i−1,c). Se cabe, compare excluir i com usar i uma vez: vᵢ+OPT(i−1,c−wᵢ). O custo clássico é O(nW), com W sendo a capacidade numérica."
        },
        {
          title: "Mochila irrestrita",
          text: "Se o item pode ser usado quantas vezes quiser, escolher uma cópia não o remove. Por isso o termo de inclusão usa OPT(i,c−wᵢ), e não OPT(i−1,c−wᵢ). Essa diferença aparece em V/F histórico."
        }
      ],
      checklist: [
        "Definir estado e recorrência de WIS sem consultar fórmula.",
        "Preencher uma tabela pequena de mochila 0/1.",
        "Reconstruir quais itens foram escolhidos.",
        "Comparar 0/1 e irrestrita em um exemplo numérico."
      ],
      exercises: [
        {
          id: "w9e1", difficulty: "Médio", origin: "Prova 2 2026/1", title: "Decisão estrita no WIS",
          prompt: "Se vⱼ+M[p(j)]>M[j−1], o item j pertence necessariamente a toda solução ótima do subproblema com as primeiras j tarefas? Justifique.",
          hint: "Compare os valores das duas alternativas da recorrência.",
          solution: "Sim. A alternativa sem j tem valor M[j−1], estritamente menor. Logo qualquer solução ótima precisa usar o ramo que inclui j."
        },
        {
          id: "w9e2", difficulty: "Médio", origin: "Criado", title: "Mochila 0/1 pequena",
          prompt: "Itens (peso,valor): (2,3), (3,4), (4,5). Capacidade 5. Calcule o valor ótimo e indique os itens escolhidos.",
          hint: "Considere combinações ou preencha OPT(i,c).",
          solution: "A melhor combinação usa os itens de pesos 2 e 3, valor total 7. O item de peso 4 sozinho vale 5."
        },
        {
          id: "w9e3", difficulty: "Avançado", origin: "Criado", title: "Prova da recorrência",
          prompt: "Prove a recorrência da mochila 0/1 analisando uma solução ótima que usa ou não o item i.",
          hint: "Mostre que o restante da solução precisa ser ótimo para o subproblema correspondente.",
          solution: "Se a ótima não usa i, seu valor é no máximo OPT(i−1,c) e esse valor é alcançável. Se usa i, o restante usa itens 1..i−1 com capacidade c−wᵢ; se não fosse ótimo para esse subproblema, poderíamos substituí-lo por uma solução melhor, contradizendo otimalidade."
        }
      ]
    },

    {
      id: 10,
      start: "2026-10-05",
      end: "2026-10-11",
      label: "05–11/10",
      title: "Pseudo-polinomialidade, dificuldade forte/fraca e mínimos quadrados segmentados",
      phase: "Programação Dinâmica",
      sessions: [18, 19],
      sources: ["Cronograma 2026/2", "Plano 2026/1", "Guia", "Prova 2 2026/1"],
      executive: [
        "O(nW) não é polinomial no tamanho da entrada quando W está em binário; W usa Θ(log W) bits.",
        "Pseudo-polinomial mede dependência do valor numérico, não apenas do comprimento da codificação.",
        "Dificuldade fraca permite, em alguns problemas, algoritmos pseudo-polinomiais; dificuldade forte exclui essa esperança sob hipóteses usuais.",
        "Mínimos Quadrados Segmentados escolhe onde começa o último segmento e soma erro local + custo dos segmentos anteriores."
      ],
      objectives: [
        "Explicar pseudo-polinomialidade usando tamanho em bits.",
        "Distinguir informalmente NP-difícil fraco e forte no contexto do curso.",
        "Modelar uma DP cujo último bloco pode começar em várias posições."
      ],
      theory: [
        {
          title: "Valor numérico versus tamanho da codificação",
          text: "Se W é escrito em binário, sua entrada usa Θ(log W) bits. Um laço com W iterações pode ser exponencial em relação a log W. Por isso O(nW) é chamado pseudo-polinomial: polinomial nos valores numéricos, mas não necessariamente no comprimento total da entrada."
        },
        {
          title: "Fraca e fortemente NP-difícil",
          text: "O cronograma inclui explicitamente essa distinção. A leitura útil é: problemas fracamente NP-difíceis podem admitir algoritmos pseudo-polinomiais; problemas fortemente NP-difíceis continuam difíceis mesmo quando os parâmetros numéricos são limitados de forma polinomial. Use a definição específica apresentada em aula para provas formais."
        },
        {
          title: "Mínimos Quadrados Segmentados",
          text: "Dados pontos ordenados, queremos aproximá-los por vários segmentos de reta, pagando erro de ajuste e uma penalidade por segmento. Se o último segmento cobre pontos i..j, a solução anterior termina em i−1. A recorrência testa todos os possíveis i e escolhe o menor custo total."
        },
        {
          title: "NP-completude como extensão do guia",
          text: "O guia original aprofunda reduções, P/NP/co-NP e problemas NP-completos. O cronograma 2026/2 fornecido não lista uma aula específica de NP-completude além de dificuldade forte/fraca. Por isso este conteúdo é marcado como extensão: em uma redução X≤pY, transformamos instâncias de X em instâncias de Y em tempo polinomial e preservamos a resposta sim/não."
        },
        {
          title: "Classes e relações que aparecem no guia histórico",
          text: "P está contida em NP e também em co-NP; logo P⊆NP∩co-NP. Também vale NP⊆PSPACE. Um problema é NP-completo quando pertence a NP e é NP-difícil. Essas inclusões não resolvem a questão P versus NP: o material não autoriza assumir igualdade ou separação quando isso não foi dado."
        },
        {
          title: "Exemplo de redução: Conjunto Independente → Empacotamento de Conjuntos",
          text: "Uma prova histórica constrói o universo U como o conjunto de arestas E do grafo. Para cada vértice v, cria Sᵥ com as arestas incidentes a v. Dois conjuntos Sᵤ e Sᵥ são disjuntos exatamente quando u e v não compartilham aresta, isto é, não são adjacentes. Assim, escolher k conjuntos dois a dois disjuntos corresponde a escolher k vértices independentes."
        }
      ],
      checklist: [
        "Explicar em duas frases por que O(nW) é pseudo-polinomial.",
        "Escrever a estrutura da recorrência de mínimos quadrados segmentados.",
        "Revisar a direção correta de uma redução X≤pY.",
        "Separar conteúdo obrigatório do cronograma de extensões do guia."
      ],
      exercises: [
        {
          id: "w10e1", difficulty: "Médio", origin: "Prova 2 2026/1", title: "O(nW) é polinomial?",
          prompt: "Se os pesos e a capacidade W são dados em binário, o algoritmo O(nW) da mochila é polinomial no tamanho da entrada?",
          hint: "Quantos bits são necessários para representar W?",
          solution: "Não necessariamente. W requer Θ(log W) bits, então W pode ser exponencial em relação ao comprimento da codificação. O algoritmo é pseudo-polinomial."
        },
        {
          id: "w10e2", difficulty: "Médio", origin: "Criado", title: "Último segmento",
          prompt: "Defina OPT(j) para mínimos quadrados segmentados e escreva uma recorrência conceitual usando error(i,j) e penalidade C.",
          hint: "O último segmento começa em algum i≤j.",
          solution: "OPT(0)=0 e OPT(j)=min_{1≤i≤j}{OPT(i−1)+error(i,j)+C}. A resposta é OPT(n), assumindo que error(i,j) já pode ser calculado."
        },
        {
          id: "w10e3", difficulty: "Avançado", origin: "Guia / provas históricas", title: "Direção de redução",
          prompt: "Você quer provar que Y é NP-difícil e conhece X como NP-completo. Qual direção de redução procura e por quê?",
          hint: "O solucionador hipotético de Y deve resolver X depois da transformação.",
          solution: "Procura X≤pY. Assim, se Y tivesse algoritmo polinomial, poderíamos transformar X em Y e resolver X em tempo polinomial. Isso mostra que Y é pelo menos tão difícil quanto X."
        },
        {
          id: "w10e4", difficulty: "Avançado", origin: "Prova histórica", title: "Conjunto Independente para Set Packing",
          prompt: "Dado G=(V,E) e k, descreva a construção que transforma Conjunto Independente em Empacotamento de Conjuntos usando U=E.",
          hint: "Crie um subconjunto por vértice contendo suas arestas incidentes.",
          solution: "Defina U=E e, para cada v∈V, Sᵥ={e∈E : v é extremidade de e}. Mantenha k. Dois conjuntos Sᵤ e Sᵥ são disjuntos se e somente se u e v não são adjacentes. Portanto, k conjuntos disjuntos correspondem a k vértices independentes."
        }
      ]
    },

    {
      id: 11,
      start: "2026-10-12",
      end: "2026-10-18",
      label: "12–18/10",
      title: "Alinhamento de Sequências e DP espacialmente eficiente",
      phase: "Programação Dinâmica",
      sessions: [20, 21],
      sources: ["Cronograma 2026/2", "Plano 2026/1", "Guia", "Prova 2 2026/1"],
      executive: [
        "Alinhamento compara três transições: parear símbolos, gap em X ou gap em Y.",
        "A tabela clássica usa O(mn) tempo e O(mn) espaço.",
        "Se mismatch custa pelo menos dois gaps, existe uma solução ótima sem mismatches.",
        "Hirschberg é extensão do guia: recupera alinhamento ótimo em O(mn) tempo e espaço linear."
      ],
      objectives: [
        "Interpretar cada célula da tabela de alinhamento.",
        "Preencher casos base corretamente.",
        "Provar propriedades locais substituindo um mismatch por dois gaps.",
        "Entender a ideia de dividir a reconstrução usando vetores de fronteira."
      ],
      theory: [
        {
          title: "Estado e recorrência",
          text: "Defina M(i,j) como o custo mínimo para alinhar os prefixos X[1..i] e Y[1..j]. A última coluna do alinhamento ou coloca xᵢ com yⱼ, ou xᵢ com gap, ou gap com yⱼ. Por isso M(i,j)=min{M(i−1,j−1)+α(xᵢ,yⱼ), M(i−1,j)+δ, M(i,j−1)+δ}."
        },
        {
          title: "Casos base",
          text: "Alinhar i símbolos com a sequência vazia exige i gaps, então M(i,0)=iδ. Similarmente, M(0,j)=jδ. Esses casos deixam as dependências da primeira linha e coluna bem definidas."
        },
        {
          title: "Propriedade mismatch versus gaps",
          text: "Se para símbolos diferentes α(p,q)≥2δ, qualquer coluna com mismatch pode ser substituída por duas colunas, uma com p-gap e outra gap-q, sem aumentar o custo. Repetindo, existe um ótimo sem mismatches."
        },
        {
          title: "Hirschberg — extensão do guia",
          text: "A tabela completa é útil para reconstruir o caminho ótimo, mas consome O(mn) espaço. Hirschberg combina DP de duas linhas com divisão e conquista: calcula custos até uma linha mediana, calcula custos de trás para frente, escolhe o ponto de passagem ótimo e recursa nos dois retângulos. O tempo permanece O(mn) e o espaço cai para O(min(m,n)) na formulação usual."
        }
      ],
      checklist: [
        "Preencher uma tabela 4×4 de alinhamento à mão.",
        "Explicar cada uma das três transições.",
        "Provar a propriedade α≥2δ.",
        "Desenhar o fluxo forward/backward de Hirschberg."
      ],
      exercises: [
        {
          id: "w11e1", difficulty: "Médio", origin: "Prova histórica", title: "Célula de alinhamento",
          prompt: "Com δ=1, mismatch=2, alinhe os prefixos 'BA' e 'BC'. Qual o valor M[2,2]?",
          hint: "Compare diagonal, gap em uma sequência e gap na outra.",
          solution: "O valor é 2. O mismatch A-C custa 2 mais M[1,1]=0; cada alternativa com gap também chega a 2."
        },
        {
          id: "w11e2", difficulty: "Médio", origin: "Prova 2 2026/1", title: "Eliminar mismatches",
          prompt: "Prove que, se αpq≥2δ para todo p≠q, existe um alinhamento ótimo sem mismatches.",
          hint: "Transforme localmente uma coluna incompatível.",
          solution: "Substitua cada mismatch p/q por p/gap e gap/q. O novo custo é 2δ≤αpq, então não aumenta. Repetindo para todos os mismatches, obtemos um alinhamento ótimo sem incompatibilidades."
        },
        {
          id: "w11e3", difficulty: "Avançado", origin: "Guia", title: "Memória em Hirschberg",
          prompt: "Por que calcular apenas duas linhas da DP é suficiente para descobrir o ponto de corte usado por Hirschberg?",
          hint: "Para decidir a próxima linha, a recorrência usa somente a linha atual/anterior; para o corte, queremos apenas o vetor de custos na fronteira.",
          solution: "A recorrência local depende da linha anterior e de posições já calculadas na linha atual. Logo, para obter todos os custos na linha mediana, não precisamos guardar linhas antigas. O mesmo vale no sentido reverso; somando os dois vetores escolhemos o melhor índice de corte."
        }
      ]
    },

    {
      id: 12,
      start: "2026-10-19",
      end: "2026-10-25",
      label: "19–25/10",
      title: "Bloco autônomo de consolidação de Programação Dinâmica",
      phase: "Consolidação",
      sessions: [],
      sources: ["Inferência do Cronograma 2026/2", "Guia", "Provas históricas"],
      executive: [
        "O cronograma fornecido não lista encontro em 20 ou 22/10.",
        "Use a lacuna para transformar fórmulas memorizadas em modelos de estado.",
        "Exercícios históricos incluem soma sem três elementos consecutivos e linha de montagem.",
        "O objetivo é chegar a Bellman–Ford sabendo criar uma DP nova."
      ],
      objectives: [
        "Praticar modelagem de estado em problemas não idênticos aos clássicos.",
        "Revisar reconstrução de solução e otimização de espaço.",
        "Consolidar prova de corretude por análise de casos."
      ],
      theory: [
        {
          title: "DP sem fórmula pronta",
          text: "Antes de pensar em tabela, complete a frase: 'OPT(...) significa...'. Depois identifique qual decisão pode ser feita por último. Se a última decisão divide todas as soluções válidas em casos exaustivos e deixa subproblemas menores, você tem uma boa candidata a recorrência."
        },
        {
          title: "Soma máxima sem três consecutivos",
          text: "Para uma sequência positiva, uma solução ótima para o prefixo até i cai em três casos: não usa A[i]; usa A[i] mas não A[i−1]; usa A[i] e A[i−1], obrigando excluir A[i−2]. Assim S[i]=max{S[i−1], A[i]+S[i−2], A[i]+A[i−1]+S[i−3]}."
        },
        {
          title: "Linha de montagem",
          text: "Defina F[linha,j] como o menor custo para processar até a estação j terminando naquela linha. Para chegar à linha 1 em j, ou você já estava na linha 1 e continua, ou veio da linha 2 pagando transferência. A mesma lógica vale simetricamente para a linha 2."
        },
        {
          title: "Reconstrução",
          text: "Calcular apenas o valor ótimo é diferente de recuperar a solução. Você pode guardar decisões predecessoras durante a DP ou, depois, percorrer a tabela de trás para frente verificando qual transição explica o valor atual."
        }
      ],
      checklist: [
        "Resolver dois problemas de DP novos sem consultar fórmulas.",
        "Escrever a definição do estado antes da recorrência.",
        "Reconstruir uma solução de mochila ou alinhamento.",
        "Revisar complexidade como número de estados × transições por estado."
      ],
      exercises: [
        {
          id: "w12e1", difficulty: "Médio", origin: "Prova histórica 2025/1", title: "Sem três consecutivos",
          prompt: "Para A=[4,7,2,9,5], calcule a maior soma escolhendo elementos sem selecionar três posições consecutivas.",
          hint: "Use S[i]=max(S[i−1], A[i]+S[i−2], A[i]+A[i−1]+S[i−3]).",
          solution: "S1=4, S2=11, S3=max(11,6,13)=13, S4=max(13,20,18)=20, S5=max(20,18,27)=27. Resposta 27, por exemplo escolhendo 4,7,9,5 (não há três posições consecutivas escolhidas porque a posição 3 fica de fora)."
        },
        {
          id: "w12e2", difficulty: "Médio", origin: "Prova 2 2026/1", title: "Linhas de montagem",
          prompt: "Explique por que cada estado F[i,j] depende apenas de dois estados da coluna j−1.",
          hint: "Antes da estação j, o produto só pode estar em uma das duas linhas.",
          solution: "Para terminar em uma linha i na estação j, o produto ou estava na mesma linha em j−1 ou na outra linha e fez uma transferência. Não há terceira possibilidade, então bastam dois candidatos."
        },
        {
          id: "w12e3", difficulty: "Avançado", origin: "Criado", title: "Otimização de espaço",
          prompt: "A DP de linha de montagem usa uma tabela 2×n. Mostre como reduzir o espaço adicional para O(1) quando queremos apenas o custo ótimo final.",
          hint: "A coluna j usa somente a coluna j−1.",
          solution: "Mantenha apenas dois valores prev1, prev2 e calcule curr1, curr2. Depois substitua os anteriores. Como nenhuma coluna mais antiga é usada, o espaço é constante."
        }
      ]
    },

    {
      id: 13,
      start: "2026-10-26",
      end: "2026-11-01",
      label: "26/10–01/11",
      title: "Bellman–Ford e Floyd–Warshall",
      phase: "Grafos + DP",
      sessions: [22, 23],
      sources: ["Cronograma 2026/2", "Plano 2026/1", "Guia", "Prova 2 2026/1"],
      executive: [
        "Bellman–Ford lida com pesos negativos e pode detectar ciclos negativos alcançáveis.",
        "Uma formulação DP limita o número de arestas usadas pelo caminho.",
        "Floyd–Warshall libera vértices intermediários em ordem e resolve todos os pares em O(n³).",
        "Em Floyd–Warshall, não use uma melhoria que dependa de um intermediário ainda não permitido."
      ],
      objectives: [
        "Entender Bellman–Ford como relaxações repetidas ou como DP por número de arestas.",
        "Distinguir uma melhoria legítima tardia de evidência de ciclo negativo.",
        "Preencher matrizes de Floyd–Warshall passo a passo."
      ],
      theory: [
        {
          title: "Bellman–Ford como DP",
          text: "Uma convenção usada nas provas define OPT(i,v) como o menor custo de um caminho de v até o destino usando no máximo i arestas. Então OPT(i,v)=min{OPT(i−1,v), min_{(v,w)}[c(v,w)+OPT(i−1,w)]}. Outra apresentação equivalente usa caminhos da origem até v e arestas de entrada. O importante é manter a orientação consistente."
        },
        {
          title: "Por que |V|−1 é suficiente sem ciclos negativos",
          text: "Um caminho simples possui no máximo |V|−1 arestas. Se um caminho mínimo repetisse um ciclo de custo não negativo, poderíamos removê-lo sem piorar. Por isso, sem ciclo negativo alcançável relevante, existe um caminho mínimo simples. Uma melhoria adicional na iteração |V| indica que algum ciclo negativo pode ser explorado."
        },
        {
          title: "Pegadinha histórica",
          text: "Se OPT(i,v)=OPT(i−1,v) em uma iteração, isso não garante estabilização eterna. Um caminho melhor pode exigir mais arestas e aparecer depois. A condição de ciclo negativo também não é 'houve melhoria na iteração n−1'; o teste clássico procura melhoria depois das |V|−1 relaxações necessárias para caminhos simples."
        },
        {
          title: "Floyd–Warshall",
          text: "Defina Dᵏ[i,j] como o menor custo de i até j usando apenas vértices de {1,…,k} como intermediários. Ao liberar k, o melhor caminho ou não usa k, permanecendo Dᵏ⁻¹[i,j], ou usa k e pode ser dividido em i→k e k→j: Dᵏ⁻¹[i,k]+Dᵏ⁻¹[k,j]."
        }
      ],
      checklist: [
        "Escrever a recorrência de Bellman–Ford com convenção de orientação explícita.",
        "Explicar o papel de |V|−1 e da rodada extra.",
        "Preencher pelo menos duas iterações de Floyd–Warshall à mão.",
        "Distinguir single-source shortest paths de all-pairs shortest paths."
      ],
      exercises: [
        {
          id: "w13e1", difficulty: "Médio", origin: "Prova 2 2026/1", title: "Floyd–Warshall parcial",
          prompt: "Com D⁰=[[0,3,10,∞],[∞,0,2,7],[∞,∞,0,1],[4,∞,∞,0]], calcule D¹ e descreva as melhorias.",
          hint: "Na iteração 1, só o vértice 1 pode ser usado como intermediário.",
          solution: "D¹ mantém as três primeiras linhas e muda a linha 4: 4→2 passa a 4+3=7 e 4→3 passa a 4+10=14. Logo a última linha é [4,7,14,0]."
        },
        {
          id: "w13e2", difficulty: "Médio", origin: "Prova 2 2026/1", title: "Estabilização parcial",
          prompt: "Se OPT(i,v)=OPT(i−1,v), conclui-se que OPT(j,v) será igual para todo j>i?",
          hint: "Imagine um caminho melhor que precise de mais arestas.",
          solution: "Não. A ausência de melhora com até i arestas não impede uma rota mais longa em número de arestas, mas de custo total menor, de surgir em uma iteração posterior."
        },
        {
          id: "w13e3", difficulty: "Avançado", origin: "Criado", title: "Detecção de ciclo negativo",
          prompt: "Explique por que uma melhoria após |V|−1 rodadas de relaxação é evidência de ciclo negativo alcançável.",
          hint: "Qualquer caminho simples tem no máximo |V|−1 arestas.",
          solution: "Se ainda há melhoria, existe um caminho melhor que efetivamente usa pelo menos |V| arestas. Esse percurso repete algum vértice e contém um ciclo. Se remover esse ciclo não pudesse reduzir o custo, haveria um caminho simples tão bom quanto; portanto a melhoria exige um ciclo de custo negativo alcançável no contexto da rota."
        }
      ]
    },

    {
      id: 14,
      start: "2026-11-02",
      end: "2026-11-08",
      label: "02–08/11",
      title: "Laboratório e prática intensiva de Programação Dinâmica",
      phase: "Programação Dinâmica",
      sessions: [24, 25],
      sources: ["Cronograma 2026/2", "Guia", "Provas históricas"],
      executive: [
        "O foco da prática é modelagem, não reprodução de fórmulas clássicas.",
        "Toda DP deve explicitar estado, base, transição, ordem, resposta e custo.",
        "O custo costuma ser número de estados × número de candidatos por estado.",
        "Reconstrução de solução e otimização de memória são habilidades complementares."
      ],
      objectives: [
        "Transformar enunciados narrativos em estados e transições.",
        "Identificar dependências mínimas para reduzir memória.",
        "Implementar e testar pelo menos duas DPs do semestre."
      ],
      theory: [
        {
          title: "Receita de modelagem",
          text: "1) escolha o prefixo, capacidade ou conjunto de parâmetros que define um subproblema; 2) pergunte qual foi a última decisão; 3) enumere todos os casos possíveis; 4) verifique se cada caso aponta para estados menores; 5) escolha a ordem de preenchimento que respeita essas dependências."
        },
        {
          title: "Custo por estados",
          text: "Uma tabela n×W com O(1) transições por célula custa O(nW). Uma tabela n×n com uma transição que testa O(n) pontos de corte pode chegar a O(n³). Não confunda tamanho da tabela com custo total sem considerar o trabalho por estado."
        },
        {
          title: "Testes úteis",
          text: "Para implementar DP, teste casos vazios, entradas de tamanho 1, escolhas mutuamente incompatíveis e empates. Compare a resposta da DP com força bruta em entradas pequenas; isso não prova corretude, mas é excelente para detectar erros de índices."
        }
      ],
      checklist: [
        "Implementar WIS ou mochila e validar com casos pequenos.",
        "Implementar alinhamento ou Floyd–Warshall.",
        "Escrever uma prova de corretude para uma DP criada do zero.",
        "Medir e justificar a complexidade sem depender do código executado."
      ],
      exercises: [
        {
          id: "w14e1", difficulty: "Médio", origin: "Criado", title: "Estados versus transições",
          prompt: "Uma DP tem Θ(n²) estados e cada estado testa todos os k anteriores, com k≤n. Qual o pior custo de tempo e por que?",
          hint: "Multiplique a quantidade de estados pelo pior número de candidatos por estado.",
          solution: "O(n³), pois há O(n²) estados e até O(n) transições/candidatos avaliados por estado."
        },
        {
          id: "w14e2", difficulty: "Avançado", origin: "Criado", title: "Teste por força bruta",
          prompt: "Explique como usar uma solução exponencial de mochila para validar a implementação O(nW) em testes pequenos sem confundir isso com uma prova formal.",
          hint: "Gere instâncias pequenas e compare as saídas de dois algoritmos independentes.",
          solution: "Enumere todos os subconjuntos para n pequeno, calcule o ótimo real e compare com a DP em muitas instâncias aleatórias. Divergências revelam bugs. A coincidência em testes não prova corretude para todas as entradas, então a prova matemática continua necessária."
        }
      ]
    },

    {
      id: 15,
      start: "2026-11-09",
      end: "2026-11-15",
      label: "09–15/11",
      title: "Revisão de Programação Dinâmica e Prova 2",
      phase: "Avaliação",
      sessions: [26, 27],
      sources: ["Cronograma 2026/2", "Guia", "Prova 2 2026/1"],
      executive: [
        "A Prova 2 do cronograma ocorre em 12/11.",
        "Priorize modelagem de estado, interpretação de recorrência e preenchimento manual.",
        "Pseudo-polinomialidade e caminhos mínimos são pontos conceituais propensos a V/F.",
        "Uma boa revisão alterna questões novas e correção dos próprios erros."
      ],
      objectives: [
        "Consolidar semanas 9–14.",
        "Executar tabelas sem erros de ordem ou índice.",
        "Treinar questões conceituais sobre DP, pseudo-polinomialidade e grafos."
      ],
      theory: [
        {
          title: "O que precisa caber na cabeça",
          text: "Você não precisa decorar todas as tabelas, mas precisa reconhecer a estrutura de decisão: incluir/excluir, manter/trocar, parear/gap, usar/não usar intermediário, usar uma aresta adicional ou não. Essas dicotomias geram as recorrências."
        },
        {
          title: "Erros de alto impacto",
          text: "Confundir mochila 0/1 e irrestrita; chamar O(nW) de polinomial sem discutir codificação; usar Dᵏ de Floyd–Warshall com um intermediário ainda proibido; concluir estabilização definitiva de Bellman–Ford por uma única igualdade; esquecer casos base de alinhamento."
        },
        {
          title: "Plano de 48 horas",
          text: "Faça um simulado, corrija e agrupe os erros. No dia seguinte, resolva apenas problemas do grupo mais fraco e finalize com revisão executiva das fórmulas. Evite gastar a última noite relendo passivamente todo o material."
        }
      ],
      checklist: [
        "Fazer um simulado completo de Prova 2.",
        "Refazer as questões erradas sem solução aberta.",
        "Preencher uma matriz de Floyd–Warshall e uma de alinhamento.",
        "Explicar pseudo-polinomialidade em menos de 60 segundos."
      ],
      exercises: [
        {
          id: "w15e1", difficulty: "Simulado", origin: "Criado", title: "Mini Prova 2 — DP",
          prompt: "Uma sequência de trabalhos permite baixo estresse Lᵢ toda semana ou alto estresse Hᵢ apenas se a semana anterior estiver livre. Modele uma DP O(n).",
          hint: "Se escolher alto estresse em i, salte para i−2.",
          solution: "OPT[i]=max(Lᵢ+OPT[i−1], Hᵢ+OPT[i−2]), com bases apropriadas. Cada estado usa O(1), então tempo O(n)."
        },
        {
          id: "w15e2", difficulty: "Simulado", origin: "Criado", title: "Mini Prova 2 — Floyd",
          prompt: "Explique exatamente o significado de Dᵏ[i,j] e por que a recorrência tem apenas dois casos.",
          hint: "O caminho ótimo com intermediários até k usa k ou não usa k.",
          solution: "Dᵏ[i,j] é o menor custo de i a j usando somente vértices 1..k como intermediários. Um ótimo ou não passa por k, ficando com Dᵏ⁻¹[i,j], ou passa por k; então divide-se em i→k e k→j, ambos usando apenas 1..k−1 internamente."
        }
      ]
    },

    {
      id: 16,
      start: "2026-11-16",
      end: "2026-11-22",
      label: "16–22/11",
      title: "Análise amortizada, tabelas dinâmicas e Prova 3 prática",
      phase: "Tópicos Avançados",
      sessions: [28, 29],
      sources: ["Cronograma 2026/2", "Plano 2026/1", "Guia"],
      executive: [
        "Custo amortizado não é custo médio probabilístico.",
        "Uma operação isolada pode custar Θ(n), mas uma sequência pode ter custo O(1) amortizado por operação.",
        "Métodos clássicos: agregado, contábil e potencial.",
        "Tabelas dinâmicas com duplicação têm cópias caras esparsas e inserções baratas na maioria dos passos."
      ],
      objectives: [
        "Explicar a diferença entre pior caso por operação e custo amortizado.",
        "Analisar inserções em vetor dinâmico por método agregado.",
        "Interpretar potencial como crédito armazenado no estado da estrutura."
      ],
      theory: [
        {
          title: "Análise amortizada",
          text: "Em vez de exigir que toda operação seja barata, analisamos o custo de uma sequência inteira. A garantia é determinística: para qualquer sequência válida do tipo considerado, o custo total é limitado. Não há hipótese de distribuição de probabilidade."
        },
        {
          title: "Tabela dinâmica por agregação",
          text: "Ao dobrar a capacidade 1,2,4,8,…, as cópias totais antes de n inserções formam 1+2+4+…<2n. Somando as n gravações das novas entradas, o trabalho total é O(n), logo O(1) amortizado por inserção."
        },
        {
          title: "Método contábil",
          text: "Cobramos um valor artificial um pouco maior em operações baratas e guardamos o excedente como crédito. Quando ocorre uma operação cara, ela usa créditos acumulados. Para a prova funcionar, o saldo não pode ficar negativo."
        },
        {
          title: "Método do potencial",
          text: "Escolha Φ(estado)≥0. O custo amortizado da operação i é ĉᵢ=cᵢ+Φ(Dᵢ)−Φ(Dᵢ₋₁). Ao somar uma sequência, os potenciais intermediários cancelam. Se Φ inicial é controlado e Φ final não é negativo, o custo real total fica limitado pela soma dos custos amortizados."
        }
      ],
      checklist: [
        "Provar O(1) amortizado da inserção com duplicação por soma geométrica.",
        "Explicar por que amortizado não significa 'na média das entradas'.",
        "Fazer um exemplo com créditos contábeis.",
        "Calcular custo amortizado usando uma função potencial simples."
      ],
      exercises: [
        {
          id: "w16e1", difficulty: "Médio", origin: "Guia", title: "Tabela dinâmica por agregação",
          prompt: "Uma tabela começa com capacidade 1 e dobra quando enche. Mostre que n inserções custam O(n), contando 1 por gravação e 1 por elemento copiado.",
          hint: "As cópias acontecem em tamanhos 1,2,4,… menores que n.",
          solution: "Há n gravações das novas entradas. As cópias somam 1+2+4+…+2^k<2n. Logo o total é menor que 3n, portanto O(n), ou O(1) amortizado por inserção."
        },
        {
          id: "w16e2", difficulty: "Médio", origin: "Criado", title: "Amortizado versus médio",
          prompt: "Explique por que uma análise amortizada O(1) não afirma que o custo esperado de uma operação aleatória é O(1).",
          hint: "Análise amortizada não usa probabilidades.",
          solution: "A garantia amortizada distribui deterministicamente o custo total de uma sequência entre suas operações. Não há variável aleatória nem distribuição de entradas. Custo esperado pertence à análise probabilística/média."
        },
        {
          id: "w16e3", difficulty: "Avançado", origin: "Criado", title: "Telescopagem do potencial",
          prompt: "Mostre por que Σ[cᵢ+Φ(Dᵢ)−Φ(Dᵢ₋₁)] = Σcᵢ + Φ(Dₙ)−Φ(D₀).",
          hint: "Escreva os primeiros termos da soma.",
          solution: "Os termos +Φ(D₁), +Φ(D₂), … são cancelados pelos correspondentes −Φ(D₁), −Φ(D₂), … da operação seguinte. Restam apenas −Φ(D₀) e +Φ(Dₙ)."
        }
      ]
    },

    {
      id: 17,
      start: "2026-11-23",
      end: "2026-11-29",
      label: "23–29/11",
      title: "Recuperação, descoberta de algoritmos com IA e fechamento",
      phase: "Fechamento",
      sessions: [30],
      extraSessions: ["2026-11-24"],
      sources: ["Cronograma 2026/2", "Plano 2026/1", "Guia"],
      executive: [
        "A recuperação está marcada para 24/11 e a aula de IA para 26/11.",
        "O plano fornecido tem uma inconsistência interna na fórmula de NNR; confirme a regra oficial.",
        "IA pode apoiar exploração e estudo apenas dentro das regras da disciplina; atividades avaliativas exigem autorização explícita.",
        "O fechamento ideal é uma matriz de 'quando usar qual técnica' baseada nos sinais do enunciado."
      ],
      objectives: [
        "Revisar por categorias de erro, não pela ordem do livro.",
        "Conectar paradigmas a padrões de enunciado.",
        "Refletir sobre validação formal de soluções sugeridas por ferramentas automáticas."
      ],
      theory: [
        {
          title: "Recuperação orientada por erro",
          text: "Classifique cada erro anterior como: definição, modelagem, prova, custo, índice/tabela ou execução manual. Ataque primeiro a categoria com maior frequência. Esse método evita repetir horas de leitura em tópicos já dominados."
        },
        {
          title: "Descoberta de algoritmos com IA",
          text: "Ferramentas automáticas podem sugerir ideias, casos de teste ou contraexemplos, mas a solução precisa ser verificada. Pergunte: a especificação foi preservada? a prova cobre todos os casos? a complexidade foi derivada do algoritmo real? existe um contraexemplo pequeno?"
        },
        {
          title: "Regra acadêmica do plano",
          text: "O plano de ensino fornecido afirma que IA em tarefas ou atividades avaliativas é estritamente proibida, a menos que exista autorização explícita e guiada do professor. A aula sobre IA no cronograma não revoga essa regra por si só."
        },
        {
          title: "Mapa de paradigmas",
          text: "Busca binária: propriedade monotônica que permite descartar metade. D&C: subproblemas independentes + combine eficiente. DP: escolhas sobrepostas com subestrutura ótima. Bellman/Floyd: DP aplicada a caminhos. Amortizada: sequência de operações com raros picos caros. Reduções: comparar dificuldade entre problemas."
        }
      ],
      checklist: [
        "Gerar relatório pessoal de tópicos pendentes pela plataforma.",
        "Revisar apenas as categorias de erro mais frequentes.",
        "Confirmar no canal oficial qualquer regra de recuperação necessária.",
        "Exportar um backup final das anotações e progresso."
      ],
      exercises: [
        {
          id: "w17e1", difficulty: "Revisão", origin: "Criado", title: "Escolha de paradigma",
          prompt: "Associe cada pista ao paradigma mais provável: (a) vetor ordenado e descarte de metade; (b) escolher último item e reaproveitar subproblemas; (c) operação cara apenas quando capacidade dobra; (d) duas metades independentes e merge linear.",
          hint: "Pense nos sinais estruturais, não nos nomes dos problemas.",
          solution: "(a) busca binária/modificação; (b) programação dinâmica; (c) análise amortizada; (d) divisão e conquista."
        },
        {
          id: "w17e2", difficulty: "Revisão", origin: "Criado", title: "Auditoria de uma solução sugerida",
          prompt: "Uma ferramenta sugere um algoritmo O(log n) para encontrar x em vetor não ordenado sem pré-processamento. Liste três perguntas que você faria antes de aceitar a solução.",
          hint: "Procure a propriedade que justificaria descarte, uma prova e um lower bound intuitivo de leitura.",
          solution: "Pergunte qual propriedade permite descartar partes sem inspecioná-las; peça prova de que x não está na região descartada; verifique se o algoritmo realmente acessa apenas O(log n) posições e como poderia distinguir entradas que diferem em uma posição não lida. Sem informação adicional, a alegação é suspeita."
        }
      ]
    }
  ],

  reviewCards: [
    { topic: "Assintótica", q: "O que precisa existir para provar f(n)=O(g(n)) pela definição?", a: "Constantes c>0 e n₀ tais que f(n)≤c·g(n) para todo n≥n₀." },
    { topic: "Assintótica", q: "Por que log₂n e log₁₀n estão em Θ um do outro?", a: "Mudança de base introduz apenas um fator constante: log₂n=log₁₀n/log₁₀2." },
    { topic: "Recorrências", q: "Em T(n)=aT(n/b)+f(n), quantos nós existem no nível j?", a: "aʲ nós, cada um com subproblema de tamanho n/bʲ." },
    { topic: "Recorrências", q: "Qual é a comparação central do Método Mestre na forma f(n)=Θ(nᵈ)?", a: "Comparar a com bᵈ, equivalendo a comparar n^(log_b a) com nᵈ." },
    { topic: "Karatsuba", q: "Quais três multiplicações recursivas substituem as quatro clássicas?", a: "ac, bd e (a+b)(c+d); o termo cruzado é obtido subtraindo ac e bd." },
    { topic: "Strassen", q: "Quantas multiplicações recursivas de submatrizes Strassen faz?", a: "Sete." },
    { topic: "Busca binária", q: "No problema A[i]=i, por que A[mid]<mid elimina a metade esquerda?", a: "Como A é ordenado e tem inteiros distintos, para k≤mid: A[k]≤A[mid]−(mid−k)<k." },
    { topic: "Vetor rotacionado", q: "Qual propriedade permite busca O(log n) em vetor crescente rotacionado com elementos distintos?", a: "Em cada passo, pelo menos uma das duas metades delimitadas pelo meio está ordenada." },
    { topic: "Closest Pair", q: "Por que só uma faixa de largura 2δ precisa ser examinada no combine?", a: "Um par cruzado com distância menor que δ precisa ter ambos os pontos a menos de δ da reta divisória." },
    { topic: "Lower bound", q: "Por que a árvore de decisão de ordenação precisa de pelo menos n! folhas?", a: "Porque existem n! permutações possíveis e cada uma exige uma saída ordenada correspondente." },
    { topic: "DP", q: "Qual é a primeira frase que você deve escrever ao modelar uma DP?", a: "A definição exata do estado: 'OPT(...) é ...'." },
    { topic: "WIS", q: "O que significa p(j) no escalonamento de intervalos com pesos?", a: "O índice da última tarefa anterior compatível com a tarefa j." },
    { topic: "Mochila", q: "Por que a inclusão na mochila irrestrita usa OPT(i,c−wᵢ) e não OPT(i−1,c−wᵢ)?", a: "Porque o item i continua disponível para ser escolhido novamente." },
    { topic: "Pseudo-polinomial", q: "Por que O(nW) pode não ser polinomial no tamanho da entrada?", a: "Porque W em binário ocupa Θ(log W) bits; iterar W vezes pode ser exponencial nesse comprimento." },
    { topic: "Alinhamento", q: "Quais são as três transições de M(i,j)?", a: "Parear xᵢ com yⱼ; alinhar xᵢ com gap; alinhar yⱼ com gap." },
    { topic: "Hirschberg", q: "Qual é o ganho principal de Hirschberg?", a: "Reconstruir um alinhamento ótimo mantendo O(mn) tempo, mas usando espaço linear em vez da matriz completa." },
    { topic: "Bellman–Ford", q: "Por que |V|−1 arestas bastam para um caminho mínimo simples?", a: "Um caminho simples visita cada vértice no máximo uma vez e, portanto, tem no máximo |V|−1 arestas." },
    { topic: "Bellman–Ford", q: "Uma iteração sem melhora em v garante que v nunca mais melhora?", a: "Não. Um caminho melhor pode exigir mais arestas e só aparecer em uma rodada posterior." },
    { topic: "Floyd–Warshall", q: "O que Dᵏ[i,j] permite como intermediários?", a: "Somente os vértices 1,2,…,k." },
    { topic: "Amortizada", q: "Custo amortizado é custo esperado?", a: "Não. Amortização é uma garantia determinística sobre uma sequência, sem distribuição de probabilidade." },
    { topic: "Potencial", q: "Qual é a fórmula do custo amortizado pelo método do potencial?", a: "ĉᵢ=cᵢ+Φ(Dᵢ)−Φ(Dᵢ₋₁)." },
    { topic: "Reduções", q: "Para provar Y NP-difícil a partir de X NP-completo, qual direção de redução é usada?", a: "X≤pY." },
    { topic: "Provas", q: "Quais três componentes aparecem repetidamente nas questões dissertativas do material?", a: "Algoritmo/pseudocódigo, prova de corretude e análise de custo." }
  ]
};
