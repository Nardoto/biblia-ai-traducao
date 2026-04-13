#!/bin/bash
# Valida que arquivos em PT e ES tem acentuacao correta
# Rejeita arquivos sem acentos — erro grave

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_response.filePath // empty' 2>/dev/null)

# Ignorar se nao for arquivo de parafrase
if [ -z "$FILE" ] || ! echo "$FILE" | grep -q "parafrase/.*\.md$"; then
    exit 0
fi

[ ! -f "$FILE" ] && exit 0

# Determinar idioma pelo path
LANG=""
echo "$FILE" | grep -q "parafrase/pt/" && LANG="pt"
echo "$FILE" | grep -q "parafrase/es/" && LANG="es"

# Ingles nao precisa de validacao de acentos
[ -z "$LANG" ] && exit 0

# Contar caracteres acentuados no arquivo
if [ "$LANG" = "pt" ]; then
    # Portugues precisa de: á é í ó ú ã õ â ê ô ç à
    ACCENT_COUNT=$(grep -o '[áéíóúãõâêôçàÁÉÍÓÚÃÕÂÊÔÇÀ]' "$FILE" 2>/dev/null | wc -l)
elif [ "$LANG" = "es" ]; then
    # Espanhol precisa de: á é í ó ú ñ ü
    ACCENT_COUNT=$(grep -o '[áéíóúñüÁÉÍÓÚÑÜ]' "$FILE" 2>/dev/null | wc -l)
fi

# Um texto biblico de um capitulo inteiro DEVE ter muitos acentos
# Minimo razoavel: pelo menos 20 caracteres acentuados por arquivo
WORD_COUNT=$(wc -w < "$FILE")

if [ "$WORD_COUNT" -gt 100 ] && [ "$ACCENT_COUNT" -lt 20 ]; then
    # Arquivo grande sem acentos — ERRO GRAVE
    rm "$FILE"
    echo "{\"decision\":\"block\",\"reason\":\"ERRO GRAVE: Arquivo $LANG sem acentuação! ($ACCENT_COUNT acentos em $WORD_COUNT palavras). Arquivo deletado. RETRADUZIR com acentuação correta (á é í ó ú ã õ â ê ô ç).\"}"
    exit 0
fi

if [ "$WORD_COUNT" -gt 50 ] && [ "$ACCENT_COUNT" -lt 5 ]; then
    rm "$FILE"
    echo "{\"decision\":\"block\",\"reason\":\"ERRO: Arquivo $LANG com acentuação insuficiente ($ACCENT_COUNT acentos). Deletado. Retraduzir.\"}"
    exit 0
fi
