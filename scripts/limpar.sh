#!/bin/bash
# Limpa arquivos de parafrase que contem mensagens de sistema do Claude
# Uso: ./scripts/limpar.sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

LIMPOS=0
APAGADOS=0

find "$PROJECT_DIR/parafrase" -name "*.md" -size +0c | while read -r file; do
    # Verificar se contem lixo
    if grep -qE "permiss|Quer que eu|está pronta|save the|I'll save|ready above|permission|Here is the|Aqui está|Enquanto isso|Arquivo pronto|write permission|try saving|Would you like|Parece que" "$file" 2>/dev/null; then
        # Verificar se tem conteudo real (um heading # com nome de livro)
        if grep -q "^# " "$file"; then
            # Tem conteudo - limpar linhas antes do heading
            FIRST_HEADING=$(grep -n "^# " "$file" | head -1 | cut -d: -f1)
            if [ "$FIRST_HEADING" -gt 1 ]; then
                # Remover linhas antes do heading
                tail -n +"$FIRST_HEADING" "$file" > "${file}.tmp"
                mv "${file}.tmp" "$file"
                echo "  LIMPO: $file (removidas $((FIRST_HEADING - 1)) linhas do inicio)"
                LIMPOS=$((LIMPOS + 1))
            fi

            # Tambem remover lixo no final (apos ultima secao de Notas)
            # Procurar por linhas de lixo apos o conteudo
            if grep -qn "permiss\|Quer que eu\|está pronta\|save the\|permission\|Would you like\|try saving\|Parece que\|Arquivo pronto" "$file" 2>/dev/null; then
                # Encontrar a ultima linha valida (antes de qualquer lixo residual)
                # Conteudo valido termina com uma nota ou com ---
                LAST_GOOD=$(grep -n "^- v\.\|^---$\|^\*\*[0-9]" "$file" | tail -1 | cut -d: -f1)
                TOTAL=$(wc -l < "$file")
                if [ -n "$LAST_GOOD" ] && [ "$LAST_GOOD" -lt "$TOTAL" ]; then
                    # Verificar se linhas apos last_good sao lixo
                    TAIL_CONTENT=$(tail -n +$((LAST_GOOD + 1)) "$file" | grep -v "^$")
                    if echo "$TAIL_CONTENT" | grep -qE "permiss|Quer que eu|está pronta|save the|permission|Would you like|Parece que"; then
                        head -n "$LAST_GOOD" "$file" > "${file}.tmp"
                        mv "${file}.tmp" "$file"
                        echo "  LIMPO FINAL: $file (removidas linhas extras do final)"
                    fi
                fi
            fi
        else
            # Nao tem conteudo real - apagar pra retraduzir
            rm "$file"
            echo "  APAGADO: $file (sem conteudo real)"
            APAGADOS=$((APAGADOS + 1))
        fi
    fi
done

echo ""
echo "Resultado: $LIMPOS limpos, $APAGADOS apagados (precisam retraduzir)"
