# Biblia AI Traducao

Traducao da Biblia Sagrada para Portugues Brasileiro usando IA (Claude), a partir dos textos originais em grego (Novo Testamento) e hebraico (Antigo Testamento).

## Objetivo

Criar uma traducao propria da Biblia, feita por IA a partir dos idiomas originais, sem dependencia de direitos autorais de traducoes existentes.

## Fontes

- **Novo Testamento**: Texto grego (Westcott-Hort / UGNT)
- **Antigo Testamento**: Texto hebraico (Westminster Leningrad Codex / UHB)
- Ambos em dominio publico

## Estrutura

```
biblia-ai-traducao/
├── traducao/
│   ├── antigo-testamento/
│   │   ├── genesis/
│   │   │   ├── 01.md
│   │   │   ├── 02.md
│   │   │   └── ...
│   │   └── .../
│   └── novo-testamento/
│       ├── mateus/
│       │   ├── 01.md
│       │   └── ...
│       └── .../
├── fontes/          # Textos originais (grego/hebraico)
├── scripts/         # Scripts de automacao
├── prompts/         # Templates de prompt para traducao
└── CLAUDE.md        # Instrucoes para o Claude CLI
```

## Como usar

### Pre-requisitos

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code)
- Node.js (para o MCP server biblico)
- Git

### Setup do MCP Server (opcional, melhora a qualidade)

```bash
git clone --recurse-submodules https://github.com/jeremymikkelsen/bible-translation-mcp fontes/mcp-server
cd fontes/mcp-server
npm install
npm run ingest
npm run build
```

### Traduzir um capitulo

```bash
# Traduzir um capitulo especifico
./scripts/traduzir.sh genesis 1

# Traduzir um livro inteiro
./scripts/traduzir-livro.sh genesis

# Traduzir todos os livros
./scripts/traduzir-tudo.sh
```

### Traduzir manualmente via Claude CLI

```bash
claude -p "$(cat prompts/traducao.md) Traduza Genesis capitulo 1." > traducao/antigo-testamento/genesis/01.md
```

## Licenca

Esta traducao e uma obra original gerada por IA a partir de textos em dominio publico.
Disponibilizada sob licenca [CC0 1.0 Universal (Dominio Publico)](https://creativecommons.org/publicdomain/zero/1.0/).
