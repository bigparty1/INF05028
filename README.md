# INF05028 — Plataforma de Estudos de Algoritmos

Aplicação web estática para **Projeto e Análise de Algoritmos II (INF05028)**, organizada para o semestre **2026/2** e compatível com GitHub Pages sem etapa de build.

## Funcionalidades

A plataforma reúne:

- trilha de **17 blocos de calendário**, reconciliando cronograma, plano e guia de estudos;
- conteúdo teórico aprofundado e reescrito em português brasileiro claro;
- resumos executivos, objetivos, checklists e exercícios semanais com dicas e soluções;
- **banco unificado de exercícios**, reutilizando os exercícios da trilha e incorporando todas as questões das seis provas históricas anexadas;
- anotações semanais, **anotações por checklist** e **anotações por exercício**;
- expansão da semana clicando diretamente no cabeçalho, além do botão dedicado;
- fórmulas matemáticas renderizadas com MathJax, mantendo texto legível como fallback;
- dashboard com semana atual, próximos encontros e progresso;
- calculadora de notas com pesos do plano fornecido (P1 30%, P2 40%, AP 20%, AA 10%);
- controle de presença baseado nos 30 encontros de 100 minutos descritos no plano;
- favoritos, status de domínio e exercícios resolvidos;
- revisão ativa com cartões conceituais;
- tema claro/escuro;
- persistência via `localStorage`;
- exportação e importação de backup em JSON, incluindo as novas anotações;
- layout responsivo e otimizado para aproveitar praticamente toda a largura útil ao lado da navegação.

## Estrutura

```text
.
├── index.html
├── .nojekyll
├── assets/
│   └── styles.css
└── src/
    ├── data.js
    ├── app.js
    ├── math-markup.js
    ├── enhancements.js
    ├── persistence-patch.js
    └── exams/
        ├── 2025-1-p1.js
        ├── 2025-1-p3.js
        ├── 2025-2-p1.js
        ├── 2025-2-p3.js
        ├── 2026-1-p1.js
        └── 2026-1-p2.js
```

- `src/data.js`: conteúdo didático, cronograma, dados do plano, exercícios semanais e cartões de revisão.
- `src/app.js`: núcleo da aplicação, dashboard e estado original.
- `src/math-markup.js`: camada semântica que identifica fórmulas no conteúdo legado e as marca antes da renderização da interface.
- `src/enhancements.js`: banco unificado de exercícios, notas de checklist/exercício, expansão por cabeçalho e renderização matemática lazy.
- `src/persistence-patch.js`: preserva o status dos exercícios históricos e integra as novas informações à persistência.
- `src/exams/*.js`: questões extraídas das provas históricas anexadas, separadas por avaliação.
- `assets/styles.css`: interface responsiva, temas e layout de largura ampliada.

## Convenção para fórmulas

O conteúdo suporta uma marcação semântica explícita, útil para novos textos e para casos em que a detecção automática não é desejada:

```text
[[math]]f(n)=O(g(n))[[/math]]
[[math:block]]T(n)=2T(n/2)+n[[/math]]
```

A primeira forma produz matemática inline; a segunda produz um bloco matemático. `math-markup.js` também migra automaticamente as expressões legadas mais comuns — recorrências, notação assintótica, potências, logaritmos, inequações, estados de programação dinâmica, relações entre classes de complexidade e expressões similares — para a mesma representação semântica.

MathJax é configurado com `startup.typeset: false`. A aplicação só processa a visão atualmente visível, semanas abertas e exercícios próximos do viewport. Os exercícios usam `IntersectionObserver`, e as chamadas ao MathJax são serializadas. Não há `MutationObserver` reagindo às mutações produzidas pelo próprio MathJax.

Essa arquitetura evita o ciclo de realimentação em que uma renderização matemática modificava o DOM, disparava uma nova observação e solicitava outra renderização. Além de eliminar o `STATUS_STACK_OVERFLOW`, reduz significativamente trabalho de CPU durante scroll e hover.

## Fontes usadas na síntese

A plataforma foi construída a partir dos materiais fornecidos no projeto:

1. **Cronograma 2026/2** — datas e ordem das aulas.
2. **Plano de Ensino 2026/1** — objetivos, carga horária, metodologia, pesos, presença e bibliografia.
3. **Guia de Estudos de Algoritmos.md** — aprofundamento conceitual e estratégia de estudo.
4. **Lista 1 e provas históricas fornecidas** — padrão de cobrança e banco de exercícios.

As provas históricas atualmente incorporadas ao banco são: 2025/1 P1, 2025/1 P3, 2025/2 P1, 2025/2 P3, 2026/1 P1 e 2026/1 P2. Quando um PDF de solução apenas referencia uma seção do livro, sem desenvolver a resposta, a plataforma preserva essa limitação em vez de inventar uma solução ausente da fonte.

### Observação sobre o plano

O plano disponível é de **2026/1**, enquanto o cronograma é de **2026/2**. A interface deixa essa diferença explícita em regras sensíveis. O trecho de recuperação do plano fornecido também apresenta uma inconsistência interna: a fórmula escrita usa `max(9, 12 - NF)`, enquanto a explicação textual descreve comportamento que “satura em 9,0”. A aplicação recomenda confirmar a regra oficial da turma.

## GitHub Pages

A aplicação não usa framework, backend ou rotas de servidor. Todos os caminhos internos são relativos e a raiz contém `.nojekyll`.

`https://bigparty1.github.io/INF05028/`

A renderização matemática usa MathJax carregado por CDN. Caso a CDN esteja indisponível, o conteúdo textual continua visível.

## Persistência e privacidade

Os dados do aluno ficam somente no `localStorage` do navegador no domínio do GitHub Pages. Não há backend, conta ou telemetria. Use **Configurações → Exportar backup** para gerar um `.json` portátil contendo tanto o estado principal quanto as anotações adicionais.

## Integridade acadêmica

O plano fornecido proíbe uso de IA em tarefas e atividades avaliativas, exceto quando houver autorização explícita e guiada do professor. Esta aplicação é uma ferramenta de estudo; em atividades oficiais, prevalecem as orientações do professor e do Moodle.
