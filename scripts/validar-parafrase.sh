#!/bin/bash
# Valida e limpa arquivos de parafrase apos escrita
# Recebe JSON do hook via stdin

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_response.filePath // empty' 2>/dev/null)

# Ignorar se nao for arquivo na pasta parafrase/
if [ -z "$FILE" ] || ! echo "$FILE" | grep -q "parafrase/.*\.md$"; then
    exit 0
fi

[ ! -f "$FILE" ] && exit 0

# Verificar se tem heading markdown
if ! grep -q "^# " "$FILE"; then
    rm "$FILE"
    echo '{"decision":"block","reason":"Arquivo deletado: sem conteudo real (falta heading #). Retraduzir."}'
    exit 0
fi

CHANGED=false

# 1) Limpar lixo no INICIO
FIRST=$(grep -n "^# " "$FILE" | head -1 | cut -d: -f1)
if [ "$FIRST" -gt 1 ]; then
    tail -n +"$FIRST" "$FILE" > "${FILE}.tmp"
    mv "${FILE}.tmp" "$FILE"
    CHANGED=true
fi

# 2) Limpar lixo no FINAL
JUNK_PATTERN="permiss|Would you like|try saving|approve the write|write was blocked|Quer que eu|autorizar a escrita|Parece que preciso|Here is the paraphrase|ready above|I need permission|guardarla necesito|permiso para escribir|pronta acima|Arquivo pronto|Enquanto isso"

if grep -qE "$JUNK_PATTERN" "$FILE" 2>/dev/null; then
    # Encontrar ultima linha de conteudo valido
    # Valido = versiculo, nota, heading, separador
    LAST_VALID=$(grep -nE "^# |^## |^\*\*[0-9]|^- v\.|^---$" "$FILE" | tail -1 | cut -d: -f1)

    if [ -n "$LAST_VALID" ] && [ "$LAST_VALID" -gt 0 ]; then
        TOTAL=$(wc -l < "$FILE")
        if [ "$LAST_VALID" -lt "$TOTAL" ]; then
            head -n "$LAST_VALID" "$FILE" > "${FILE}.tmp"
            mv "${FILE}.tmp" "$FILE"
            CHANGED=true
        fi
    fi
fi

if [ "$CHANGED" = true ]; then
    echo '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"AVISO: Arquivo limpo automaticamente. Mensagens de sistema removidas, conteudo preservado."}}'
fi
