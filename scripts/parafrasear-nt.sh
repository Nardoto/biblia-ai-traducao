#!/bin/bash
# Parafraseia todo o Novo Testamento em 3 idiomas
# Uso: ./scripts/parafrasear-nt.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/livros.sh"

echo "============================================="
echo "  PARAFRASE DO NOVO TESTAMENTO COMPLETO"
echo "  Idiomas: PT-BR | EN | ES"
echo "  Livros: 27 | Capitulos: ~260"
echo "============================================="
echo ""

TOTAL_LIVROS=0
for book in $NT_LIVROS; do
    TOTAL_LIVROS=$((TOTAL_LIVROS + 1))
done

ATUAL=0
for book in $NT_LIVROS; do
    ATUAL=$((ATUAL + 1))
    echo ""
    echo ">>> [$ATUAL/$TOTAL_LIVROS] $book"
    "$SCRIPT_DIR/parafrasear-paralelo.sh" "$book"
    echo ""
done

echo "============================================="
echo "  NOVO TESTAMENTO COMPLETO!"
echo "============================================="
