(() => {
  const data = window.STUDY_DATA;
  if (!data || !Array.isArray(data.weeks)) return;

  const week = data.weeks.find((item) => item.id === 3);
  if (!week) return;

  if (data.meta) {
    data.meta.appVersion = "2.0.3";
    data.meta.sourceNote = "Cronograma 2026/2 + Plano de Ensino 2026/1 + Class1.pdf + Class2.pdf + Class4.pdf + Class5.pdf + Lista 1 + materiais de laboratório + provas históricas + Guia de Estudos de Algoritmos.md";
  }

  Object.assign(week, {
    title: "Merge Sort, recorrências, substituição e Método Mestre",
    sources: [
      "Cronograma 2026/2",
      "Class4.pdf — Análise do Merge Sort",
      "Class5.pdf — Análise de Recorrências",
      "Lista 1 — Questões 1 a 3",
      "Provas históricas",
      "Guia"
    ],
    executive: [
      "A Semana 3 inicia formalmente a análise de algoritmos de Divisão e Conquista: primeiro modelamos o custo do Merge Sort e depois generalizamos o raciocínio para recorrências.",
      "No Merge Sort, cada chamada gera dois subproblemas de tamanho n/2 e realiza trabalho linear para combinar os resultados, produzindo T(n)=2T(n/2)+O(n).",
      "A árvore do Merge Sort tem log₂n+1 níveis; no nível j há 2ʲ subproblemas de tamanho n/2ʲ e o custo total de combinação permanece linear em n em cada nível.",
      "O material oficial apresenta quatro ferramentas para recorrências: árvore de recursão, substituição, Método Mestre e Akra–Bazzi; nesta semana o foco está nas três primeiras, enquanto Akra–Bazzi aparece como generalização a ser aprofundada depois.",
      "O Método da Substituição é apresentado como 'adivinhar e verificar': propõe-se uma forma para T(n) e prova-se a hipótese por indução, respeitando o caso base.",
      "O Método Mestre é um resolvedor para recorrências da forma T(n)=aT(n/b)+O(nᵈ), assumindo subproblemas de mesmo tamanho. A decisão depende da comparação entre a e bᵈ.",
      "A Lista 1 transforma exatamente esses conceitos em tarefas avaliáveis: abrir árvores de recursão, provar resultados por substituição e classificar recorrências com o limitante superior mais preciso possível."
    ],
    objectives: [
      "Derivar a recorrência de um algoritmo recursivo a partir do número e do tamanho das chamadas recursivas e do trabalho local.",
      "Explicar por que o passo Merge custa O(n) e como isso conduz à recorrência do Merge Sort.",
      "Descrever uma árvore de recursão por número de níveis, nós por nível, tamanho dos subproblemas, custo por nó, custo por nível e número de folhas.",
      "Usar o Método da Substituição como uma prova por indução, distinguindo a hipótese proposta do resultado que ainda precisa ser demonstrado.",
      "Identificar os parâmetros a, b e d de T(n)=aT(n/b)+O(nᵈ) e aplicar corretamente os três casos do Método Mestre conforme a nomenclatura usada na aula.",
      "Reconhecer quando o Método Mestre clássico não se aplica diretamente, em especial quando a redução não é do tipo n/b ou quando os subproblemas têm tamanhos diferentes.",
      "Resolver as Questões 1, 2 e 3 da Lista 1 justificando cada etapa, não apenas informando a classe assintótica final."
    ],
    theory: [
      {
        title: "Do algoritmo para a recorrência",
        text: "A Aula 5 define recorrências como funções descritas em termos de si mesmas em argumentos menores, acompanhadas de um ou mais casos base. Para analisar um algoritmo recursivo, tome T(n) como o tempo de pior caso em uma entrada de tamanho n. Se uma chamada executa k subchamadas de tamanhos n₁,…,nₖ e realiza trabalho local O(f(n)), o custo é modelado pela soma dos T(nᵢ) mais o trabalho local. Antes de tentar resolver uma recorrência, verifique se ela realmente representa o algoritmo."
      },
      {
        title: "Merge: a etapa de combinação",
        text: "A Aula 4 apresenta Merge usando dois vetores auxiliares ordenados L e R e sentinelas ∞. Em cada posição da saída compara-se o menor elemento ainda disponível em L com o menor ainda disponível em R e copia-se o menor. Como cada elemento do intervalo é copiado e processado um número constante de vezes, a combinação é linear no tamanho do intervalo: O(n). A propriedade-chave é que a parte já produzida permanece ordenada durante toda a execução."
      },
      {
        title: "Recorrência do Merge Sort",
        text: "Para n=1, o caso base é O(1). Para n≥2, o algoritmo determina o ponto médio, resolve dois subproblemas de tamanho n/2 e faz uma combinação de tamanho n. Portanto, o material oficial escreve T(n)=2T(n/2)+O(n). Essa decomposição — quantidade de chamadas, tamanho das chamadas e custo de combinação — é o modelo a reproduzir em outros algoritmos de Divisão e Conquista."
      },
      {
        title: "Árvore de recursão do Merge Sort",
        text: "Assumindo n potência de 2, a árvore possui log₂n+1 níveis, contando a raiz como nível 0 e as folhas no nível log₂n. No nível j existem 2ʲ subproblemas, cada um com tamanho n/2ʲ. Como cada subproblema executa trabalho proporcional ao próprio tamanho, o custo agregado do nível é 2ʲ·c(n/2ʲ)=cn. Assim, há Θ(log n) níveis com Θ(n) trabalho por nível, o que leva a O(n log n)."
      },
      {
        title: "Quatro maneiras de atacar recorrências",
        text: "Class4 e Class5 listam quatro opções: (1) árvore de recursão; (2) Método da Substituição, descrito como 'adivinha e verifica'; (3) Método Mestre; e (4) Akra–Bazzi. A árvore ajuda a enxergar onde o trabalho se concentra e frequentemente sugere a hipótese da substituição. O Mestre fornece uma classificação rápida quando a recorrência possui a forma exigida. Akra–Bazzi é apresentado como a generalização para somas de subproblemas do tipo aᵢT(bᵢn)+g(n), mas seu desenvolvimento completo pertence à sequência seguinte do curso."
      },
      {
        title: "Método da Substituição",
        text: "O exemplo central da Aula 5 usa T(1)=c e T(n)=2T(n/2)+cn. O material propõe a hipótese P(n): T(n)=cn log₂n+cn e a verifica por indução. A técnica exige três partes explícitas: hipótese candidata, caso base e passo indutivo. O ponto de estudo é entender que substituir a hipótese nas chamadas menores deve reproduzir a forma desejada para o problema maior."
      },
      {
        title: "Três recorrências para comparar",
        text: "A Aula 5 contrasta três padrões: 2T(n/2)+c, com solução O(n); 2T(n/2)+cn, com solução O(n log n); e 2T(n−1)+c, com solução O(2ⁿ). As duas primeiras reduzem rapidamente o tamanho da entrada pela metade; a terceira reduz apenas uma unidade enquanto duplica o número de chamadas. Essa comparação mostra por que a forma do argumento recursivo é tão importante quanto o número de chamadas."
      },
      {
        title: "Método Mestre: parâmetros",
        text: "A forma usada na Aula 5 é T(n)=a·T(n/b)+O(nᵈ), com a≥1 e b>1. O parâmetro a é o número de subproblemas, b descreve a redução de tamanho e nᵈ representa o custo local assintótico. O material observa que o método funciona como um resolvedor 'caixa-preta' justamente porque todos os subproblemas devem ter o mesmo tamanho."
      },
      {
        title: "Método Mestre: casos conforme a aula",
        text: "A nomenclatura oficial da Aula 5 é: Caso 1, se a=bᵈ, então T(n)=O(nᵈ log n); Caso 2, se a<bᵈ, então T(n)=O(nᵈ); Caso 3, se a>bᵈ, então T(n)=O(n^(log_b a)). A aula destaca duas observações: no Caso 1 a base do logaritmo não altera a classe assintótica; no Caso 3 a base b aparece no expoente log_b a e, portanto, importa."
      },
      {
        title: "Quando o Mestre não é a ferramenta certa",
        text: "Uma recorrência como T(n)=T(n−1)+n não possui o formato n/b exigido pelo Método Mestre clássico. Da mesma forma, a apresentação da aula ressalta que o Mestre assume subproblemas de mesmo tamanho. Nesses casos, árvore de recursão, expansão direta, substituição ou posteriormente Akra–Bazzi podem ser mais adequados. O primeiro passo de uma questão não é aplicar um teorema: é verificar suas hipóteses."
      },
      {
        title: "Como a Lista 1 cobra a semana",
        text: "A Questão 1 exige uma árvore completa, incluindo níveis, nós por nível, custo por nó, custo por nível, folhas e custo total, para T(n)=T(n−1)+n e T(n)=4T(n/2)+n. A Questão 2 pede que os custos encontrados sejam provados pelo Método da Substituição. A Questão 3 fornece seis recorrências e pede o limitante superior mais preciso possível com justificativa. Portanto, a preparação deve treinar o processo completo, não apenas decorar os três resultados do Mestre."
      }
    ],
    checklist: [
      "Reproduzir de memória o pseudocódigo conceitual do Merge: duas sequências ordenadas → escolher repetidamente o menor elemento disponível.",
      "Derivar T(n)=2T(n/2)+O(n) a partir das etapas do Merge Sort sem consultar os slides.",
      "Desenhar a árvore do Merge Sort e preencher: nível j, 2ʲ nós, tamanho n/2ʲ e custo total cn por nível.",
      "Resolver a Questão 1(a) da Lista 1 e explicar por que T(n)=T(n−1)+n não é uma recorrência do Mestre clássico.",
      "Resolver a Questão 1(b) da Lista 1 incluindo o número de folhas e a soma dos custos dos níveis.",
      "Escrever uma prova completa por substituição para pelo menos uma recorrência da Lista 1.",
      "Memorizar a forma T(n)=aT(n/b)+O(nᵈ) e, para cada exercício, identificar a, b e d antes de escolher o caso.",
      "Resolver os seis itens da Questão 3 da Lista 1 justificando a comparação entre a e bᵈ.",
      "Criar uma tabela de erros com três colunas: recorrência, método escolhido, erro de raciocínio cometido."
    ],
    exercises: [
      {
        id: "w3e1",
        difficulty: "Básico",
        origin: "Class4.pdf",
        title: "Reconstruindo a análise do Merge Sort",
        prompt: "Para uma entrada de tamanho n, identifique: número de chamadas recursivas, tamanho de cada chamada, custo da combinação e recorrência resultante do Merge Sort. Em seguida, indique a classe assintótica obtida pela árvore de recursão.",
        hint: "Cada chamada se divide em duas metades e Merge percorre linearmente o intervalo.",
        solution: "Há duas chamadas de tamanho n/2 e trabalho de combinação O(n), portanto T(n)=2T(n/2)+O(n), com caso base O(1). A árvore possui Θ(log n) níveis e Θ(n) trabalho agregado por nível, resultando em O(n log n)."
      },
      {
        id: "w3e2",
        difficulty: "Médio",
        origin: "Class4.pdf",
        title: "Tabela da árvore do Merge Sort",
        prompt: "Preencha para um nível genérico j da árvore do Merge Sort: quantidade de nós, tamanho de cada subproblema, custo por nó e custo agregado do nível. Depois determine o número de folhas.",
        hint: "Multiplique o número de nós pelo tamanho de cada subproblema.",
        solution: "No nível j há 2ʲ nós, cada um de tamanho n/2ʲ. O custo local por nó é c·n/2ʲ e o custo agregado é cn. As folhas aparecem quando n/2ʲ=1, isto é, j=log₂n; portanto há 2^(log₂n)=n folhas."
      },
      {
        id: "w3e3",
        difficulty: "Médio",
        origin: "Class5.pdf",
        title: "Substituição no exemplo oficial",
        prompt: "Considere T(1)=c e T(n)=2T(n/2)+cn. Use a hipótese apresentada na aula, T(n)=cn log₂n+cn, e mostre como a substituição nas chamadas menores recupera a mesma forma para n.",
        hint: "Substitua T(n/2) por c(n/2)log₂(n/2)+c(n/2) e use log₂(n/2)=log₂n−1.",
        solution: "T(n)=2[c(n/2)log₂(n/2)+c(n/2)]+cn = cn(log₂n−1)+cn+cn = cn log₂n+cn. O caso base também satisfaz a forma, pois log₂1=0."
      },
      {
        id: "w3e4",
        difficulty: "Básico",
        origin: "Class5.pdf",
        title: "Compare três formatos recursivos",
        prompt: "Associe cada recorrência à ordem apresentada na Aula 5 e explique intuitivamente a diferença: (a) 2T(n/2)+c; (b) 2T(n/2)+cn; (c) 2T(n−1)+c.",
        hint: "Observe tanto o trabalho local quanto a velocidade com que o tamanho da entrada diminui.",
        solution: "(a) O(n); (b) O(n log n); (c) O(2ⁿ). Nas duas primeiras, a profundidade é logarítmica porque o tamanho é dividido por 2; na terceira, a profundidade é linear e o número de chamadas dobra a cada nível."
      },
      {
        id: "w3e5",
        difficulty: "Médio",
        origin: "Class5.pdf",
        title: "Classifique pelo Método Mestre",
        prompt: "Para cada recorrência, identifique a, b, d e o caso da nomenclatura oficial da aula: (a) 4T(n/2)+O(n); (b) 4T(n/2)+O(n²); (c) 4T(n/2)+O(n³).",
        hint: "Compare a com bᵈ.",
        solution: "(a) a=4,b=2,d=1: 4>2, Caso 3, O(n^(log₂4))=O(n²). (b) d=2: 4=2², Caso 1, O(n²log n). (c) d=3: 4<2³, Caso 2, O(n³)."
      },
      {
        id: "w3e6",
        difficulty: "Médio",
        origin: "Lista 1 · Questão 1(a)",
        title: "Árvore de T(n)=T(n−1)+n",
        prompt: "Monte a árvore — neste caso, uma cadeia — para T(n)=T(n−1)+n. Informe número de níveis, custo no nível j, número de folhas e custo total assintótico.",
        hint: "Os tamanhos visitados são n,n−1,n−2,… até o caso base.",
        solution: "Há Θ(n) níveis e uma única chamada por nível. No nível j, o tamanho é n−j e o custo local é Θ(n−j). Há uma folha. A soma n+(n−1)+…+1 é Θ(n²)."
      },
      {
        id: "w3e7",
        difficulty: "Médio",
        origin: "Lista 1 · Questão 1(b)",
        title: "Árvore de T(n)=4T(n/2)+n",
        prompt: "Para T(n)=4T(n/2)+n, determine nós por nível, custo por nó no nível j, custo total do nível, número de folhas e custo total.",
        hint: "No nível j há 4ʲ nós, cada um associado a uma entrada de tamanho n/2ʲ.",
        solution: "No nível j há 4ʲ nós; cada nó tem custo Θ(n/2ʲ), logo o nível custa Θ(n·2ʲ). A altura é log₂n e existem 4^(log₂n)=n² folhas. O custo cresce geometricamente até as folhas, resultando em Θ(n²)."
      },
      {
        id: "w3e8",
        difficulty: "Avançado",
        origin: "Lista 1 · Questão 2",
        title: "Prove o custo por substituição",
        prompt: "Escolha uma das recorrências da Questão 1 da Lista 1 e escreva uma prova por substituição do limitante assintótico encontrado. A resposta deve explicitar hipótese, caso base e passo indutivo.",
        hint: "Para T(n)=4T(n/2)+n, tente um limite superior cn² e verifique se sobra margem para absorver o termo +n.",
        solution: "Para T(n)=4T(n/2)+n, uma forma típica é provar T(n)≤cn²−dn para constantes adequadas, ou usar uma hipótese suficientemente forte que absorva o termo linear. O essencial é substituir a hipótese em T(n/2), simplificar e mostrar que o lado resultante fica dentro do limite proposto, além de tratar o caso base."
      },
      {
        id: "w3e9",
        difficulty: "Avançado",
        origin: "Lista 1 · Questão 3",
        title: "Seis aplicações do Mestre",
        prompt: "Resolva, com o limitante superior mais preciso possível e justificativa, as seis recorrências da Questão 3 da Lista 1: 4T(n/4)+5n; 4T(n/5)+5n; 5T(n/3)+4n; 25T(n/5)+n²; 2T(n/4)+√n; 9T(n/3)+n.",
        hint: "Para cada item escreva primeiro a, b, d e bᵈ. Só então compare.",
        solution: "Resultados pela forma ensinada na aula: (a) O(n log n), pois a=4=b¹=4; (b) O(n), pois 4<5; (c) O(n^(log₃5)), pois 5>3; (d) O(n²log n), pois 25=5²; (e) O(√n log n), pois 2=4^(1/2); (f) O(n²), pois 9>3. A justificativa completa deve registrar os parâmetros e o caso correspondente."
      },
      {
        id: "w3e10",
        difficulty: "Avançado",
        origin: "Provas históricas",
        title: "Diagnóstico de uma prova de substituição",
        prompt: "Uma afirmação histórica propõe que, para T(n)=2T(n/2)+c com T(1)=c, a hipótese T(n)=cn pode ser provada diretamente. Analise a proposta: qual é a ordem assintótica correta e que cuidado é necessário ao formular uma igualdade exata em uma prova por substituição?",
        hint: "A Aula 5 informa a ordem de 2T(n/2)+c e mostra que a hipótese de substituição precisa fechar algebricamente.",
        solution: "A ordem apresentada na Aula 5 é O(n). Entretanto, uma igualdade exata como T(n)=cn depende dos detalhes do caso base e das constantes e precisa ser verificada, não presumida. Em substituição, uma hipótese que expressa apenas a classe assintótica pode precisar de constantes ou termos adicionais para fechar o passo indutivo."
      }
    ]
  });
})();
