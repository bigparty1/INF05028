(() => {
  const data = window.STUDY_DATA;
  if (!data || !Array.isArray(data.weeks)) return;

  const week = data.weeks.find((item) => item.id === 1);
  if (!week) return;

  if (data.meta) {
    data.meta.appVersion = "2.0.1";
    data.meta.sourceNote = "Cronograma 2026/2 + Plano de Ensino 2026/1 + Class1.pdf (Aula 1 oficial) + Guia de Estudos de Algoritmos.md + listas/provas fornecidas no projeto";
  }

  Object.assign(week, {
    title: "Introdução, rigor e estratégia para a disciplina",
    sources: ["Cronograma 2026/2", "Plano 2026/1", "Class1.pdf — Aula 1 oficial", "Guia"],
    executive: [
      "A disciplina tem 60 horas, distribuídas em 30 aulas, e é organizada em três blocos: Divisão e Conquista, Programação Dinâmica e Tópicos Avançados.",
      "As avaliações refletem essa estrutura: Prova 1 teórica de Divisão e Conquista (3,0), Prova 2 teórica de Programação Dinâmica (4,0), Prova 3 prática de implementação (2,0) e Atividades Autônomas (1,0).",
      "O foco declarado na aula inaugural é pensamento crítico, resolução de problemas e análise rigorosa — especialmente para problemas novos, não vistos diretamente em aula.",
      "Estudar bem aqui significa conseguir projetar a solução, justificar por que ela funciona e analisar seu custo, em vez de apenas memorizar pseudocódigo.",
      "O Moodle é o canal oficial para comunicação e distribuição de slides, listas de exercícios e leituras; use o material da plataforma como complemento, não como substituto das orientações oficiais do semestre."
    ],
    objectives: [
      "Entender a arquitetura da disciplina e como Divisão e Conquista, Programação Dinâmica e tópicos avançados se conectam ao longo do semestre.",
      "Montar um método de estudo compatível com o foco oficial: pensamento crítico, análise rigorosa e resolução de problemas inéditos.",
      "Distinguir três competências que aparecem nas avaliações: projetar um algoritmo, provar sua corretude e analisar sua eficiência.",
      "Organizar as fontes oficiais e complementares para saber onde revisar teoria, provas matemáticas, exemplos e implementação."
    ],
    theory: [
      {
        title: "Mapa oficial do semestre",
        text: "A Aula 1 organiza o conteúdo em três partes. A Parte 1 cobre Divisão e Conquista, com análise de recorrências (Substituição, Método Mestre e Akra–Bazzi) e algoritmos como Merge Sort, Strassen, Par Mais Próximo, FFT e Seleção. A Parte 2 cobre Programação Dinâmica, incluindo escalonamento, mochila, alinhamento de sequências, Bellman–Ford, Floyd–Warshall e TSP. A Parte 3 fecha com Análise Amortizada, Tabelas Dinâmicas e Descoberta de Algoritmos com IA. Esse mapa é útil para perceber que as primeiras semanas constroem ferramentas que serão reutilizadas nas provas e implementações posteriores."
      },
      {
        title: "O que a disciplina espera de você",
        text: "O material oficial explicita três focos: pensamento crítico e análise rigorosa; algoritmos e técnicas úteis na prática; e resolução de problemas novos, não vistos em aula. Por isso, uma boa preparação não deve se limitar a reconhecer algoritmos conhecidos. O objetivo é aprender a identificar a estrutura de um problema, escolher uma técnica apropriada e defender formalmente a solução proposta."
      },
      {
        title: "Projeto, corretude e análise são tarefas diferentes",
        text: "Projetar responde 'qual algoritmo resolve o problema?'. Provar corretude responde 'por que ele produz a resposta certa para toda entrada válida?'. Analisar responde 'quanto trabalho ele executa em função do tamanho da entrada?'. Um algoritmo pode ser correto e ainda ser ineficiente; também pode parecer eficiente e estar logicamente errado. Nas questões dissertativas, trate esses três componentes separadamente para não deixar a justificativa implícita."
      },
      {
        title: "Como as avaliações orientam o estudo",
        text: "A Aula 1 informa a seguinte divisão: Prova 1 (3,0), teórica, sobre Divisão e Conquista; Prova 2 (4,0), teórica, sobre Programação Dinâmica; Prova 3 (2,0), prática, com implementação de Divisão e Conquista e Programação Dinâmica; e Atividades Autônomas (1,0), divididas em 0,8 para problemas e 0,2 para exercícios de leitura. A recuperação é teórica e abrange toda a matéria. Na prática, isso recomenda alternar três tipos de treino: teoria e prova formal, resolução de problemas e implementação."
      },
      {
        title: "Bibliografia e materiais de apoio",
        text: "A bibliografia apresentada na Aula 1 inclui Algorithm Design, de Kleinberg e Tardos; Introduction to Algorithms, de Cormen et al.; e Algorithms Illuminated, de Tim Roughgarden. Como material complementar, o professor também indica recursos sobre técnicas de aprendizagem, Mathematics for Computer Science para métodos de prova, notação assintótica e recorrências, e as aulas de Algorithms de Tim Roughgarden. Use a bibliografia para aprofundar conceitos que nos slides aparecem de forma condensada."
      },
      {
        title: "Método de estudo recomendado para esta disciplina",
        text: "Adote um ciclo curto e verificável: (1) leia o conceito; (2) feche o material e explique a ideia com suas palavras; (3) resolva um exemplo sem consultar a solução; (4) escreva uma justificativa de corretude; (5) derive o custo; (6) registre o erro que cometeu. Esse formato combina recuperação ativa com o tipo de raciocínio exigido pela disciplina e reduz a dependência de memorização literal."
      }
    ],
    checklist: [
      "Confirmar no Moodle as regras, avisos e materiais oficiais do semestre.",
      "Criar uma folha-modelo com três blocos: algoritmo → corretude → custo.",
      "Montar um mapa do semestre com os três eixos: Divisão e Conquista → Programação Dinâmica → Tópicos Avançados.",
      "Separar no calendário sessões de teoria/prova, resolução de problemas e implementação.",
      "Criar um caderno de erros conceituais e registrar por que cada solução falhou.",
      "Revisar rapidamente busca binária, Merge Sort, BFS e DFS de PAA I para chegar à Semana 2 com os pré-requisitos ativos.",
      "Salvar como referências principais Kleinberg–Tardos, CLRS e Roughgarden e saber qual delas consultar quando precisar aprofundar uma prova ou algoritmo."
    ],
    exercises: [
      {
        id: "w1e1", difficulty: "Básico", origin: "Criado a partir da Aula 1", title: "Mapa da disciplina",
        prompt: "Sem consultar o material, liste os três blocos principais da disciplina e cite pelo menos três tópicos de cada um. Depois confira sua resposta com o resumo da semana.",
        hint: "Pense em Divisão e Conquista, Programação Dinâmica e Tópicos Avançados.",
        solution: "Parte 1: Divisão e Conquista — recorrências, Merge Sort, Strassen, Par Mais Próximo, FFT e Seleção. Parte 2: Programação Dinâmica — escalonamento, mochila, alinhamento, Bellman–Ford, Floyd–Warshall e TSP. Parte 3: Tópicos Avançados — Análise Amortizada, Tabelas Dinâmicas e Descoberta de Algoritmos com IA."
      },
      {
        id: "w1e2", difficulty: "Básico", origin: "Criado a partir da Aula 1", title: "Correção versus eficiência",
        prompt: "Explique, em no máximo seis linhas, por que 'o algoritmo funciona' e 'o algoritmo é eficiente' são afirmações diferentes. Dê um exemplo de algoritmo correto, porém assintoticamente pior do que outra solução para o mesmo problema.",
        hint: "Selection Sort e Merge Sort formam uma comparação simples.",
        solution: "Corretude trata da validade da saída para toda entrada permitida; eficiência trata da quantidade de recursos usada. Selection Sort é correto para ordenar, mas executa Θ(n²) comparações no pior caso. Merge Sort também é correto e executa Θ(n log n), portanto é assintoticamente mais eficiente."
      },
      {
        id: "w1e3", difficulty: "Médio", origin: "Criado a partir do foco oficial", title: "Problema novo, resposta estruturada",
        prompt: "Escolha um problema algorítmico simples que você não tenha decorado. Escreva uma resposta em três seções: ideia do algoritmo, argumento de corretude e análise de custo. O objetivo não é encontrar a melhor solução, mas separar corretamente os três tipos de raciocínio.",
        hint: "Pode ser busca de máximo, verificação de duplicatas ou interseção entre duas listas.",
        solution: "A resposta depende do problema escolhido. Ela deve conter uma descrição operacional inequívoca do algoritmo, um argumento que cubra todas as entradas válidas e uma análise que identifique o tamanho da entrada, as operações dominantes e a ordem assintótica resultante."
      },
      {
        id: "w1e4", difficulty: "Médio", origin: "Aula 1 oficial", title: "Planejamento pela avaliação",
        prompt: "A partir dos pesos e tipos das avaliações informados na Aula 1, proponha uma divisão de 10 horas de estudo que não negligencie teoria, resolução de problemas e implementação. Justifique a distribuição em duas ou três frases.",
        hint: "As duas provas teóricas somam 7,0 pontos, mas a prova prática e as atividades também exigem treino aplicado.",
        solution: "Uma divisão possível é 5 horas para teoria e provas de corretude/análise, 3 horas para resolução de problemas e 2 horas para implementação. A maior fatia vai para a parte teórica porque P1 e P2 somam 7,0 pontos, mas o treino prático continua necessário para P3 e para transformar a teoria em habilidade de projeto."
      }
    ]
  });
})();
