#!/bin/bash
# Parafraseia um livro em 3 idiomas em paralelo
# Uso: ./scripts/parafrasear-paralelo.sh <livro>
# Exemplo: ./scripts/parafrasear-paralelo.sh matthew

set -e

BOOK="$1"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_DIR="$PROJECT_DIR/logs"

mkdir -p "$LOG_DIR"

source "$SCRIPT_DIR/livros.sh"

if [ -z "$BOOK" ]; then
    echo "Uso: $0 <livro>"
    echo "Exemplo: $0 matthew"
    exit 1
fi

if [ -z "${CAPITULOS[$BOOK]}" ]; then
    echo "Erro: livro '$BOOK' nao reconhecido"
    exit 1
fi

PT_DISPLAY=$(get_book_display "pt" "$BOOK")
EN_DISPLAY=$(get_book_display "en" "$BOOK")
ES_DISPLAY=$(get_book_display "es" "$BOOK")

echo "========================================="
echo "  Parafraseando: $BOOK"
echo "  PT: $PT_DISPLAY | EN: $EN_DISPLAY | ES: $ES_DISPLAY"
echo "  Capitulos: ${CAPITULOS[$BOOK]}"
echo "========================================="

# Lancar 3 agentes em paralelo com stagger
"$SCRIPT_DIR/parafrasear-livro.sh" pt "$BOOK" > "$LOG_DIR/pt-${BOOK}.log" 2>&1 &
PID_PT=$!
echo "  PT iniciado (PID: $PID_PT)"

sleep 10

"$SCRIPT_DIR/parafrasear-livro.sh" en "$BOOK" > "$LOG_DIR/en-${BOOK}.log" 2>&1 &
PID_EN=$!
echo "  EN iniciado (PID: $PID_EN)"

sleep 10

"$SCRIPT_DIR/parafrasear-livro.sh" es "$BOOK" > "$LOG_DIR/es-${BOOK}.log" 2>&1 &
PID_ES=$!
echo "  ES iniciado (PID: $PID_ES)"

echo ""
echo "  Logs:"
echo "    tail -f $LOG_DIR/pt-${BOOK}.log"
echo "    tail -f $LOG_DIR/en-${BOOK}.log"
echo "    tail -f $LOG_DIR/es-${BOOK}.log"
echo ""
echo "  Aguardando conclusao..."

# Aguardar todos
FALHAS=0
wait $PID_PT || FALHAS=$((FALHAS + 1))
echo "  PT concluido."
wait $PID_EN || FALHAS=$((FALHAS + 1))
echo "  EN concluido."
wait $PID_ES || FALHAS=$((FALHAS + 1))
echo "  ES concluido."

echo ""
if [ "$FALHAS" -eq 0 ]; then
    echo "========================================="
    echo "  $BOOK COMPLETO em 3 idiomas!"
    echo "========================================="
else
    echo "========================================="
    echo "  $BOOK finalizado com $FALHAS idioma(s) com erro."
    echo "  Verifique os logs em $LOG_DIR/"
    echo "========================================="
fi
