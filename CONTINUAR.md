# Contexto para continuar o projeto Bíblia Paráfrase AI

## O que é este projeto

Paráfrase da Bíblia em 3 idiomas (PT-BR, EN, ES) usando Claude CLI, a partir dos textos originais em grego e hebraico. Estilo conversacional, acessível, com notas ricas sobre o original. Open source (CC0).

- **Repo**: https://github.com/Nardoto/biblia-ai-traducao (público)
- **Site**: https://biblia-ai-traducao.vercel.app (Next.js na Vercel, deploy automático a cada push)
- **Diretório**: ~/downloads/biblia-ai-traducao

## Status atual da tradução

### PT (Português)
- João: caps 1, 2, 7, 8, 10, 12, 13, 14, 16, 17, 19, 21
- Lucas: cap 1
- Romanos: cap 5
- Faltam muitos capítulos de João (3-6, 9, 11, 15, 18, 20)

### EN (English)
- João: caps 1, 2, 13, 14, 15, 16, 17
- Lucas: cap 1

### ES (Español)
- Juan: caps 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21
- Lucas: cap 1

## Filosofia de tradução (CRÍTICO)

1. **Preservar a voz do autor original** — cada autor bíblico tem estilo próprio (Marcos é direto, Lucas é literário, Paulo é denso, João é poético)
2. **Preservar distinções do original** — quando o grego/hebraico usa termos diferentes (agape vs phileo), diferenciar na paráfrase, NUNCA traduzir igual
3. **Nomes como o autor escreveu** — se Paulo escreveu "Cefas", usar "Cefas" (com nota). Se escreveu "Pedro", usar "Pedro". NÃO harmonizar
4. **Hapax legomena** — preservar ambiguidade + nota explicativa
5. **Tom digno** — linguagem acessível mas SEM gírias chulas ("fofoca", "ficar de cara", etc.)
6. **ACENTUAÇÃO OBRIGATÓRIA** — JAMAIS gerar texto PT/ES sem acentos. Todos os acentos: á é í ó ú ã õ â ê ô ç à ñ ü
7. **Notas ricas** — com termos gregos/hebraicos transliterados, tags sobrescritas (ᵃᵇᶜ) no texto
8. **NÃO harmonizar** termos que o autor original usou de forma diferente intencionalmente

## Como traduzir

```bash
# Um capítulo em 1 idioma
./scripts/parafrasear.sh pt john 21

# Um livro em 3 idiomas paralelos
./scripts/parafrasear-paralelo.sh matthew

# Todo o NT em 3 idiomas
./scripts/parafrasear-nt.sh

# Ver progresso
./scripts/progresso.sh
```

## Hooks ativos

1. **validar-parafrase.sh** — Remove mensagens de permissão do Claude do output automaticamente
2. **validar-acentos.sh** — Deleta arquivos PT/ES sem acentuação correta

## Site (Next.js)

- Fonte: Literata (serif) + Inter (sans)
- Seleção de versículos inline (clica no versículo, não no parágrafo)
- Compartilhar com números sobrescritos (¹² ³⁴)
- Modo Leitura: texto corrido sem números (botão "Leitura")
- Notas inline com botão ✦
- Modo escuro/claro
- Livros sem tradução ficam cinza
- Capítulos sem tradução ficam cinza e não-clicáveis

## Próximos passos pendentes

1. **Instalar MCP bible-translation-server** — pra consultar o grego/hebraico real em vez de depender da memória do treino
   ```bash
   git clone --recurse-submodules https://github.com/jeremymikkelsen/bible-translation-mcp fontes/mcp-server
   cd fontes/mcp-server && npm install && npm run ingest && npm run build
   ```
   Depois configurar em `.mcp.json`

2. **Retraduzir capítulos faltantes de João** (PT e EN)

3. **Continuar o NT** — começar Mateus, Marcos, Lucas completos

4. **Melhorias no site** pendentes:
   - Testar que a seleção de versículos está funcionando por versículo (não parágrafo)
   - Verificar que o modo leitura funciona

## Estrutura do projeto

```
biblia-ai-traducao/
├── parafrase/
│   ├── pt/novo-testamento/{livro}/{cap}.md
│   ├── en/new-testament/{book}/{cap}.md
│   └── es/nuevo-testamento/{libro}/{cap}.md
├── prompts/
│   ├── parafrase-pt.md    # Prompt PT (com regras de acento)
│   ├── paraphrase-en.md   # Prompt EN
│   └── parafrasis-es.md   # Prompt ES (com regras de acento)
├── scripts/
│   ├── livros.sh           # Mapeamento de livros/idiomas
│   ├── parafrasear.sh      # Traduz 1 cap, 1 idioma
│   ├── parafrasear-livro.sh
│   ├── parafrasear-paralelo.sh
│   ├── parafrasear-nt.sh
│   ├── progresso.sh
│   ├── limpar.sh           # Limpa arquivos corrompidos
│   ├── validar-parafrase.sh # Hook: remove lixo
│   └── validar-acentos.sh  # Hook: valida acentos
├── site/                   # Next.js app
├── .claude/settings.json   # Hooks configurados
├── CLAUDE.md               # Instruções pro Claude CLI
└── README.md
```

## Exemplo de como ficou (João 21:15-17 — agape vs phileo)

> ¹⁵ Depois que comeram, Jesus perguntou a Simão Pedro: "Simão, filho de João, você me ama com entrega totalᵉ — mais do que estes?" Ele respondeu: "Sim, Senhor, o senhor sabe que eu tenho um afeto profundoᶠ por você."
> ¹⁶ Perguntou pela segunda vez: "Simão, filho de João, você me ama com entrega total?"ᵉ
> ¹⁷ Perguntou pela terceira vez: "Simão, filho de João, você tem afeto profundo por mim?"ᶠ Pedro ficou magoado porque Jesus perguntou pela terceira vez — e desta vez usando a própria palavra de Pedro.

- v.15e: Jesus usa ἀγαπάω (agapaō) — amor total, incondicional, sacrificial
- v.15f: Pedro responde com φιλέω (phileō) — amor de amizade, afeto pessoal
