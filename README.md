# Biblia Parafrase AI

Parafrase da Biblia em 3 idiomas (Portugues BR, Ingles, Espanhol) criada com IA (Claude) a partir dos textos originais em grego e hebraico. Estilo conversacional inspirado em "A Mensagem" de Eugene Peterson.

## Objetivo

Criar uma parafrase propria da Biblia, original, acessivel e em linguagem do dia a dia — sem dependencia de direitos autorais.

## Idiomas

- **PT** - Portugues Brasileiro
- **EN** - English (American)
- **ES** - Espanol (Latinoamerica)

## Fontes

- **Novo Testamento**: Grego koine (Westcott-Hort / UGNT)
- **Antigo Testamento**: Hebraico biblico (Westminster Leningrad Codex / UHB)
- Ambos em dominio publico

## Estrutura

```
biblia-ai-traducao/
├── parafrase/
│   ├── pt/novo-testamento/{mateus,marcos,...}/01.md
│   ├── en/new-testament/{matthew,mark,...}/01.md
│   └── es/nuevo-testamento/{mateo,marcos,...}/01.md
├── prompts/         # Templates de prompt por idioma
├── scripts/         # Scripts de automacao
├── site/            # Site Next.js (deploy na Vercel)
└── CLAUDE.md        # Instrucoes para o Claude CLI
```

## Como usar

### Traduzir um capitulo (1 idioma)

```bash
./scripts/parafrasear.sh pt matthew 1
```

### Traduzir um livro em 3 idiomas (paralelo)

```bash
./scripts/parafrasear-paralelo.sh matthew
```

### Traduzir todo o Novo Testamento

```bash
./scripts/parafrasear-nt.sh
```

### Ver progresso

```bash
./scripts/progresso.sh
```

## Site

O site e um app Next.js com:
- Seletor de idioma (PT/EN/ES)
- Navegacao por livro e capitulo
- Indicador visual de capitulos traduzidos
- Mobile-first, modo escuro

Deploy automatico na Vercel a cada push.

```bash
cd site
npm install
npm run dev
```

## Licenca

Esta parafrase e uma obra original gerada por IA a partir de textos em dominio publico.
Disponibilizada sob [CC0 1.0 Universal (Dominio Publico)](https://creativecommons.org/publicdomain/zero/1.0/).
