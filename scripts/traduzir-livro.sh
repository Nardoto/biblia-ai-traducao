#!/bin/bash
# Traduz um livro inteiro da Biblia usando Claude CLI
# Uso: ./scripts/traduzir-livro.sh <livro>
# Exemplo: ./scripts/traduzir-livro.sh genesis

set -e

LIVRO="$1"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ -z "$LIVRO" ]; then
    echo "Uso: $0 <livro>"
    echo "Exemplo: $0 genesis"
    exit 1
fi

# Mapa de capitulos por livro
declare -A CAPITULOS
# Antigo Testamento
CAPITULOS[genesis]=50
CAPITULOS[exodo]=40
CAPITULOS[levitico]=27
CAPITULOS[numeros]=36
CAPITULOS[deuteronomio]=34
CAPITULOS[josue]=24
CAPITULOS[juizes]=21
CAPITULOS[rute]=4
CAPITULOS[1samuel]=31
CAPITULOS[2samuel]=24
CAPITULOS[1reis]=22
CAPITULOS[2reis]=25
CAPITULOS[1cronicas]=29
CAPITULOS[2cronicas]=36
CAPITULOS[esdras]=10
CAPITULOS[neemias]=13
CAPITULOS[ester]=10
CAPITULOS[jo]=42
CAPITULOS[salmos]=150
CAPITULOS[proverbios]=31
CAPITULOS[eclesiastes]=12
CAPITULOS[cantares]=8
CAPITULOS[isaias]=66
CAPITULOS[jeremias]=52
CAPITULOS[lamentacoes]=5
CAPITULOS[ezequiel]=48
CAPITULOS[daniel]=12
CAPITULOS[oseias]=14
CAPITULOS[joel]=3
CAPITULOS[amos]=9
CAPITULOS[obadias]=1
CAPITULOS[jonas]=4
CAPITULOS[miqueias]=7
CAPITULOS[naum]=3
CAPITULOS[habacuque]=3
CAPITULOS[sofonias]=3
CAPITULOS[ageu]=2
CAPITULOS[zacarias]=14
CAPITULOS[malaquias]=4
# Novo Testamento
CAPITULOS[mateus]=28
CAPITULOS[marcos]=16
CAPITULOS[lucas]=24
CAPITULOS[joao]=21
CAPITULOS[atos]=28
CAPITULOS[romanos]=16
CAPITULOS[1corintios]=16
CAPITULOS[2corintios]=13
CAPITULOS[galatas]=6
CAPITULOS[efesios]=6
CAPITULOS[filipenses]=4
CAPITULOS[colossenses]=4
CAPITULOS[1tessalonicenses]=5
CAPITULOS[2tessalonicenses]=3
CAPITULOS[1timoteo]=6
CAPITULOS[2timoteo]=4
CAPITULOS[tito]=3
CAPITULOS[filemom]=1
CAPITULOS[hebreus]=13
CAPITULOS[tiago]=5
CAPITULOS[1pedro]=5
CAPITULOS[2pedro]=3
CAPITULOS[1joao]=5
CAPITULOS[2joao]=1
CAPITULOS[3joao]=1
CAPITULOS[judas]=1
CAPITULOS[apocalipse]=22

TOTAL=${CAPITULOS[$LIVRO]}

if [ -z "$TOTAL" ]; then
    echo "Erro: livro '$LIVRO' nao reconhecido"
    exit 1
fi

echo "=== Traduzindo $LIVRO ($TOTAL capitulos) ==="

for i in $(seq 1 "$TOTAL"); do
    echo "[$i/$TOTAL] Traduzindo capitulo $i..."
    "$SCRIPT_DIR/traduzir.sh" "$LIVRO" "$i"
    echo ""
done

echo "=== $LIVRO completo! ==="
