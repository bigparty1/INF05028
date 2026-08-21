# INF05028 — Plataforma de Estudos de Algoritmos

Aplicação web estática para **Projeto e Análise de Algoritmos II (INF05028)**, organizada para o semestre **2026/2** e compatível com GitHub Pages sem etapa de build.

## O que mudou no v2

O antigo guia HTML foi transformado em uma plataforma de estudos com:

- trilha de **17 blocos de calendário** (16 semanas acadêmicas + o intervalo sem aula de 20–22/10), reconciliando cronograma, plano e guia;
- conteúdo teórico denso e reescrito em português brasileiro claro;
- resumos executivos, objetivos, checklists e **48 exercícios** com dicas e soluções comentadas;
- dashboard com semana atual, próximos encontros e progresso;
- calculadora de notas com pesos do plano fornecido (P1 30%, P2 40%, AP 20%, AA 10%);
- controle de presença baseado nos 30 encontros de 100 minutos descritos no plano;
- anotações semanais, favoritos, status de domínio e exercícios resolvidos;
- revisão ativa com cartões conceituais;
- tema claro/escuro;
- persistência via `localStorage`;
- exportação e importação de backup em JSON;
- layout responsivo, acessível e sem dependências externas.

## Estrutura

```text
.
├── index.html
├── assets/
│   └── styles.css
└── src/
    ├── data.js
    └── app.js
```

- `src/data.js`: conteúdo didático, cronograma, dados do plano, exercícios e cartões de revisão.
- `src/app.js`: estado da aplicação, localStorage, dashboard, calculadoras, filtros, notas e backup.
- `assets/styles.css`: interface responsiva e tema escuro.

## Fontes usadas na síntese

A plataforma foi construída a partir dos materiais fornecidos no projeto:

1. **Cronograma 2026/2** — usado como fonte principal para datas e ordem das aulas.
2. **Plano de Ensino 2026/1** — usado para objetivos, carga horária, metodologia, pesos, presença e bibliografia.
3. **Guia de Estudos de Algoritmos.md** — usado para aprofundamento conceitual e estratégia de estudo.
4. **Listas e provas históricas fornecidas** — usadas para identificar padrões de cobrança e criar/parafrasear exercícios de treino.

### Observação importante sobre o plano

O plano disponível é de **2026/1**, enquanto o cronograma é de **2026/2**. A interface deixa essa diferença explícita em regras sensíveis. O trecho de recuperação do plano fornecido também apresenta uma inconsistência interna: a fórmula escrita usa `max(9, 12 - NF)`, enquanto a explicação textual descreve comportamento que “satura em 9,0”. A aplicação não escolhe silenciosamente uma interpretação; recomenda confirmar a regra oficial da turma.

## GitHub Pages

A aplicação não usa framework nem rotas de servidor. Basta publicar a branch `main` pela raiz (`/`). Todos os caminhos são relativos, portanto funciona em um Project Page como:

`https://bigparty1.github.io/INF05028/`

## Persistência e privacidade

Os dados do aluno ficam somente no `localStorage` do navegador no domínio do GitHub Pages. Não há backend, conta, telemetria ou envio de dados. Use **Configurações → Exportar backup** para gerar um `.json` portátil.

## Integridade acadêmica

O plano fornecido proíbe uso de IA em tarefas e atividades avaliativas, exceto quando houver autorização explícita e guiada do professor. Esta aplicação é uma ferramenta de estudo; em atividades oficiais, prevalecem as orientações do professor e do Moodle.
