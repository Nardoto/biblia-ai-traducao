#!/bin/bash
# Traduz um capitulo especifico da Biblia usando Claude CLI
# Uso: ./scripts/traduzir.sh <livro> <capitulo>
# Exemplo: ./scripts/traduzir.sh genesis 1

set -e

LIVRO="$1"
CAPITULO="$2"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
PROMPT_FILE="$PROJECT_DIR/prompts/traducao.md"

if [ -z "$LIVRO" ] || [ -z "$CAPITULO" ]; then
    echo "Uso: $0 <livro> <capitulo>"
    echo "Exemplo: $0 genesis 1"
    exit 1
fi

# Determinar testamento
AT_LIVROS="genesis exodo levitico numeros deuteronomio josue juizes rute 1samuel 2samuel 1reis 2reis 1cronicas 2cronicas esdras neemias ester jo salmos proverbios eclesiastes cantares isaias jeremias lamentacoes ezequiel daniel oseias joel amos obadias jonas miqueias naum habacuque sofonias ageu zacarias malaquias"
NT_LIVROS="mateus marcos lucas joao atos romanos 1corintios 2corintios galatas efesios filipenses colossenses 1tessalonicenses 2tessalonicenses 1timoteo 2timoteo tito filemom hebreus tiago 1pedro 2pedro 1joao 2joao 3joao judas apocalipse"

TESTAMENTO=""
for l in $AT_LIVROS; do
    if [ "$l" = "$LIVRO" ]; then
        TESTAMENTO="antigo-testamento"
        break
    fi
done
if [ -z "$TESTAMENTO" ]; then
    for l in $NT_LIVROS; do
        if [ "$l" = "$LIVRO" ]; then
            TESTAMENTO="novo-testamento"
            break
        fi
    done
fi

if [ -z "$TESTAMENTO" ]; then
    echo "Erro: livro '$LIVRO' nao reconhecido"
    exit 1
fi

# Formatar numero do capitulo com zero-padding
CAP_FORMATADO=$(printf "%02d" "$CAPITULO")
SAIDA="$PROJECT_DIR/traducao/$TESTAMENTO/$LIVRO/$CAP_FORMATADO.md"

# Verificar se ja existe
if [ -f "$SAIDA" ]; then
    echo "Aviso: $SAIDA ja existe. Pulando. Use --force para sobrescrever."
    if [ "$3" != "--force" ]; then
        exit 0
    fi
fi

echo "Traduzindo $LIVRO capitulo $CAPITULO..."

# Montar nome legivel do livro
LIVRO_NOME=$(echo "$LIVRO" | sed 's/^1/1 /;s/^2/2 /;s/^3/3 /' | sed 's/.*/\u&/')

# Chamar Claude CLI
PROMPT=$(cat "$PROMPT_FILE")
claude -p "$PROMPT

Traduza $LIVRO_NOME capitulo $CAPITULO." > "$SAIDA"

echo "Salvo em: $SAIDA"
