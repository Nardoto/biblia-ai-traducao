#!/bin/bash
# Parafraseia um capitulo especifico em um idioma usando Claude CLI
# Uso: ./scripts/parafrasear.sh <lang> <livro> <capitulo> [--force]
# Exemplo: ./scripts/parafrasear.sh pt matthew 1

set -e

LANG="$1"
BOOK="$2"
CHAPTER="$3"
FORCE="$4"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

source "$SCRIPT_DIR/livros.sh"

if [ -z "$LANG" ] || [ -z "$BOOK" ] || [ -z "$CHAPTER" ]; then
    echo "Uso: $0 <lang> <livro> <capitulo> [--force]"
    echo "  lang: pt, en, es"
    echo "  livro: matthew, genesis, psalms, etc. (ID canonico)"
    echo "  capitulo: numero do capitulo"
    echo ""
    echo "Exemplo: $0 pt matthew 1"
    exit 1
fi

# Validar idioma
if [[ "$LANG" != "pt" && "$LANG" != "en" && "$LANG" != "es" ]]; then
    echo "Erro: idioma '$LANG' nao reconhecido. Use: pt, en, es"
    exit 1
fi

# Validar livro
if [ -z "${CAPITULOS[$BOOK]}" ]; then
    echo "Erro: livro '$BOOK' nao reconhecido"
    exit 1
fi

# Validar capitulo
TOTAL=${CAPITULOS[$BOOK]}
if [ "$CHAPTER" -lt 1 ] || [ "$CHAPTER" -gt "$TOTAL" ]; then
    echo "Erro: $BOOK tem $TOTAL capitulos. Capitulo $CHAPTER invalido."
    exit 1
fi

# Montar caminho de saida
SAIDA="$PROJECT_DIR/$(get_output_path "$LANG" "$BOOK" "$CHAPTER")"
SAIDA_DIR=$(dirname "$SAIDA")
mkdir -p "$SAIDA_DIR"

# Verificar se ja existe
if [ -f "$SAIDA" ] && [ "$FORCE" != "--force" ]; then
    echo "  Pulando: $SAIDA ja existe. Use --force para sobrescrever."
    exit 0
fi

# Selecionar prompt
case "$LANG" in
    pt) PROMPT_FILE="$PROJECT_DIR/prompts/parafrase-pt.md" ;;
    en) PROMPT_FILE="$PROJECT_DIR/prompts/paraphrase-en.md" ;;
    es) PROMPT_FILE="$PROJECT_DIR/prompts/parafrasis-es.md" ;;
esac

DISPLAY_NAME=$(get_book_display "$LANG" "$BOOK")
PROMPT=$(cat "$PROMPT_FILE")

# Montar instrucao final por idioma
case "$LANG" in
    pt) INSTRUCAO="Parafrase $DISPLAY_NAME capitulo $CHAPTER." ;;
    en) INSTRUCAO="Paraphrase $DISPLAY_NAME chapter $CHAPTER." ;;
    es) INSTRUCAO="Parafrasea $DISPLAY_NAME capitulo $CHAPTER." ;;
esac

echo "  [$LANG] Parafraseando $DISPLAY_NAME $CHAPTER..."

# Chamar Claude CLI com retry
MAX_RETRIES=3
RETRY_DELAY=30

for attempt in $(seq 1 $MAX_RETRIES); do
    if claude -p "$PROMPT

$INSTRUCAO" --output-format text > "$SAIDA" 2>/dev/null; then
        # Verificar se o arquivo nao esta vazio
        if [ -s "$SAIDA" ]; then
            # Validar: deve comecar com # (heading markdown)
            # Se tiver lixo antes do heading, limpar
            if grep -q "^# " "$SAIDA"; then
                FIRST_HEADING=$(grep -n "^# " "$SAIDA" | head -1 | cut -d: -f1)
                if [ "$FIRST_HEADING" -gt 1 ]; then
                    tail -n +"$FIRST_HEADING" "$SAIDA" > "${SAIDA}.tmp"
                    mv "${SAIDA}.tmp" "$SAIDA"
                fi
                echo "  [$LANG] Salvo: $SAIDA"
                exit 0
            else
                echo "  [$LANG] Output invalido (sem heading), tentando novamente..."
                rm -f "$SAIDA"
            fi
        else
            echo "  [$LANG] Arquivo vazio, tentando novamente..."
            rm -f "$SAIDA"
        fi
    fi

    if [ "$attempt" -lt "$MAX_RETRIES" ]; then
        echo "  [$LANG] Tentativa $attempt falhou. Retentando em ${RETRY_DELAY}s..."
        sleep $RETRY_DELAY
        RETRY_DELAY=$((RETRY_DELAY * 2))
    fi
done

echo "  [$LANG] ERRO: Falhou apos $MAX_RETRIES tentativas para $DISPLAY_NAME $CHAPTER"
exit 1
