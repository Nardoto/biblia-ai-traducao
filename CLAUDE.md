# Instrucoes para o Claude CLI - Projeto Biblia Parafrase AI

## Contexto

Este projeto cria uma parafrase da Biblia em 3 idiomas (PT-BR, EN, ES) a partir dos textos originais (grego e hebraico).
Estilo: conversacional, moderno, acessivel — como "A Mensagem" de Eugene Peterson.
Licenca: CC0 (dominio publico).

## Regras de parafrase

1. Trabalhar SEMPRE a partir do texto original (grego para NT, hebraico para AT)
2. NAO copiar traducoes ou parafrases existentes — isso deve ser uma obra original
3. Linguagem do dia a dia, como se estivesse contando pra um amigo
4. Nomes proprios na forma mais conhecida de cada idioma
5. Ser neutro teologicamente — sem interpretacao denominacional
6. Capturar a emocao e impacto do original, nao apenas as palavras
7. Agrupar versiculos em paragrafos naturais quando ajudar

## Formato de saida

```markdown
# [Livro] [Capitulo]

**1** [texto parafraseado...]
**2** [continuacao...]

---

## Notas

- v.X: [nota breve quando uma escolha interpretativa significativa foi feita]
```

## Estrutura de pastas

- parafrase/pt/novo-testamento/[livro]/[capitulo].md
- parafrase/en/new-testament/[livro]/[capitulo].md
- parafrase/es/nuevo-testamento/[livro]/[capitulo].md
- Capitulos com zero-padding de 2 digitos (01, 02, ..., 50)

## Scripts

- `scripts/parafrasear.sh <lang> <livro> <cap>` — 1 capitulo, 1 idioma
- `scripts/parafrasear-paralelo.sh <livro>` — 1 livro, 3 idiomas em paralelo
- `scripts/parafrasear-nt.sh` — todo o NT, 3 idiomas
- `scripts/progresso.sh` — ver progresso

## MCP Server (se configurado)

- `get_interlinear` para ver o texto palavra por palavra
- `get_morphology` para analise gramatical
- `get_lexicon` para significados dos termos
