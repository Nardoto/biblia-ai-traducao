# Instrucoes para o Claude CLI - Projeto Biblia AI Traducao

## Contexto

Este projeto traduz a Biblia dos idiomas originais (grego e hebraico) para portugues brasileiro usando IA.
Os textos-fonte sao de dominio publico. A traducao resultante tambem sera de dominio publico (CC0).

## Regras de traducao

1. Traduzir SEMPRE a partir do texto original (grego para NT, hebraico para AT), nunca de uma traducao existente
2. Manter fidelidade ao texto original, mas usar portugues brasileiro moderno e natural
3. Nomes proprios: usar a forma mais conhecida em portugues (ex: Moisés, Davi, Paulo)
4. Quando houver ambiguidade no original, escolher a interpretacao mais literal e adicionar nota de rodape
5. Nao inserir interpretacao teologica propria - ser o mais neutro possivel
6. Manter a estrutura de versiculos do texto original

## Formato de saida

Cada capitulo deve ser salvo como arquivo .md com este formato:

```markdown
# [Livro] [Capitulo]

1. [texto do versiculo 1]
2. [texto do versiculo 2]
...

---

## Notas

- v.X: [nota explicativa quando necessario]
```

## Estrutura de pastas

- traducao/antigo-testamento/[livro]/[capitulo].md
- traducao/novo-testamento/[livro]/[capitulo].md
- Capitulos com zero-padding de 2 digitos (01, 02, ..., 50)

## MCP Server

Se o bible-translation-mcp estiver configurado, use as ferramentas:
- `get_interlinear` para ver o texto palavra por palavra
- `get_morphology` para analise gramatical
- `get_lexicon` para significados dos termos
- `compare_translations` para referencia (mas NAO copiar traducoes existentes)
