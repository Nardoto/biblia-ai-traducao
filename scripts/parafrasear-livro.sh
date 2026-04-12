#!/bin/bash
# Parafraseia um livro inteiro em um idioma
# Uso: ./scripts/parafrasear-livro.sh <lang> <livro>
# Exemplo: ./scripts/parafrasear-livro.sh pt matthew

set -e

LANG="$1"
BOOK="$2"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

source "$SCRIPT_DIR/livros.sh"

if [ -z "$LANG" ] || [ -z "$BOOK" ]; then
    echo "Uso: $0 <lang> <livro>"
    echo "Exemplo: $0 pt matthew"
    exit 1
fi

TOTAL=${CAPITULOS[$BOOK]}
DISPLAY=$(get_book_display "$LANG" "$BOOK")

if [ -z "$TOTAL" ]; then
    echo "Erro: livro '$BOOK' nao reconhecido"
    exit 1
fi

echo "=== [$LANG] Parafraseando $DISPLAY ($TOTAL capitulos) ==="

SUCESSO=0
FALHA=0

for i in $(seq 1 "$TOTAL"); do
    echo "[$i/$TOTAL]"
    if "$SCRIPT_DIR/parafrasear.sh" "$LANG" "$BOOK" "$i"; then
        SUCESSO=$((SUCESSO + 1))
    else
        FALHA=$((FALHA + 1))
    fi
    # Pausa entre capitulos pra nao bater rate limit
    if [ "$i" -lt "$TOTAL" ]; then
        sleep 3
    fi
done

echo "=== [$LANG] $DISPLAY completo! Sucesso: $SUCESSO | Falhas: $FALHA ==="
