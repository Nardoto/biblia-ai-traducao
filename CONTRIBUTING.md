# Como Contribuir / How to Contribute

## Português

Obrigado pelo interesse em contribuir com a Bíblia Livre AI! Este é um projeto aberto e toda contribuição é bem-vinda.

### Tipos de contribuição

- **Correções de texto**: erros de português, acentuação, digitação
- **Melhorias na paráfrase**: sugestões para versículos específicos
- **Notas acadêmicas**: expandir ou corrigir notas sobre termos gregos/hebraicos
- **Novos idiomas**: criar paráfrases em idiomas ainda não cobertos
- **Paráfrases regionais**: versões nordestina, gaúcha, mineira, etc.
- **Código do site**: melhorias no site Next.js
- **Verificação**: conferir termos gregos/hebraicos e referências

### Como contribuir

1. Faça um **fork** do repositório
2. Crie uma branch (`git checkout -b melhoria/joao-3`)
3. Faça suas alterações
4. Abra um **Pull Request** descrevendo o que mudou e por quê

### Estrutura dos arquivos

```
parafrase/
  pt/novo-testamento/{livro}/{capitulo}.md    # Paráfrase PT
  en/new-testament/{book}/{chapter}.md         # Paraphrase EN
  es/nuevo-testamento/{libro}/{capitulo}.md    # Paráfrasis ES
  pt/cadeia-de-pensamento/novo-testamento/...  # Cadeia de pensamento
```

### Formato dos capítulos

```markdown
# Nome do Livro Capítulo

**1** Texto parafraseado...ᵃ
**2** Continuação...

---

## Notas

- v.1a: [termo grego] (transliteração) — explicação

## Notas Expandidas

### Linguística e Semântica
#### v.1 — termo (transliteração)
**Campo semântico**: ...
**Análise**: ...

### Contexto Histórico-Cultural
...

### Crítica Textual
...

### Teologia e Debate Acadêmico
...

### Referências Cruzadas e Intertextualidade
...
```

### Regras importantes

- Trabalhe a partir dos textos originais (grego/hebraico), não copie traduções existentes
- Mantenha neutralidade teológica — sem interpretação denominacional
- Use acentuação correta em PT e ES
- Preserve as distinções do texto original (ex: agapao vs phileo)

### Reportar problemas

Se encontrar um erro ou tiver uma sugestão, abra uma [Issue no GitHub](https://github.com/Nardoto/biblia-ai-traducao/issues).

---

## English

Thank you for your interest in contributing to Free Bible AI! This is an open project and all contributions are welcome.

### How to contribute

1. **Fork** the repository
2. Create a branch (`git checkout -b improvement/john-3`)
3. Make your changes
4. Open a **Pull Request** describing what changed and why

Or simply open an **Issue** describing the error or suggestion.

### Important rules

- Work from original texts (Greek/Hebrew), don't copy existing translations
- Maintain theological neutrality
- Preserve distinctions from the original text
- Use proper accents in PT and ES

### License

All contributions are under CC0 (public domain). By contributing, you agree your work will be in the public domain.
