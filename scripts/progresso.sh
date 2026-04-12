#!/bin/bash
# Mostra o progresso da traducao por idioma
# Uso: ./scripts/progresso.sh [nt|ot|all]

SCOPE="${1:-nt}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

source "$SCRIPT_DIR/livros.sh"

# Contar capitulos esperados e existentes
count_chapters() {
    local lang="$1" livros="$2"
    local esperado=0 existente=0

    for book in $livros; do
        local total=${CAPITULOS[$book]}
        esperado=$((esperado + total))
        for i in $(seq 1 "$total"); do
            local path="$PROJECT_DIR/$(get_output_path "$lang" "$book" "$i")"
            if [ -f "$path" ] && [ -s "$path" ]; then
                existente=$((existente + 1))
            fi
        done
    done

    echo "$existente/$esperado"
}

echo "========================================="
echo "  PROGRESSO DA PARAFRASE"
echo "========================================="

if [[ "$SCOPE" == "nt" || "$SCOPE" == "all" ]]; then
    echo ""
    echo "  NOVO TESTAMENTO:"
    PT_NT=$(count_chapters "pt" "$NT_LIVROS")
    EN_NT=$(count_chapters "en" "$NT_LIVROS")
    ES_NT=$(count_chapters "es" "$NT_LIVROS")
    echo "    PT: $PT_NT capitulos"
    echo "    EN: $EN_NT capitulos"
    echo "    ES: $ES_NT capitulos"
fi

if [[ "$SCOPE" == "ot" || "$SCOPE" == "all" ]]; then
    echo ""
    echo "  ANTIGO TESTAMENTO:"
    PT_AT=$(count_chapters "pt" "$AT_LIVROS")
    EN_AT=$(count_chapters "en" "$AT_LIVROS")
    ES_AT=$(count_chapters "es" "$AT_LIVROS")
    echo "    PT: $PT_AT capitulos"
    echo "    EN: $EN_AT capitulos"
    echo "    ES: $ES_AT capitulos"
fi

echo ""
echo "========================================="

# Detalhe por livro se pedir
if [ "$2" == "--detalhe" ]; then
    echo ""
    echo "  DETALHE POR LIVRO (NT):"
    for book in $NT_LIVROS; do
        local_pt=$(count_chapters "pt" "$book")
        local_en=$(count_chapters "en" "$book")
        local_es=$(count_chapters "es" "$book")
        display=$(get_book_display "pt" "$book")
        printf "    %-20s PT: %-8s EN: %-8s ES: %-8s\n" "$display" "$local_pt" "$local_en" "$local_es"
    done
fi
