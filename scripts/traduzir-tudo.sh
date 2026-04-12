#!/bin/bash
# Traduz toda a Biblia usando Claude CLI
# Uso: ./scripts/traduzir-tudo.sh
# Aviso: isso vai levar bastante tempo!

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Ordem canonica dos livros
LIVROS_AT="genesis exodo levitico numeros deuteronomio josue juizes rute 1samuel 2samuel 1reis 2reis 1cronicas 2cronicas esdras neemias ester jo salmos proverbios eclesiastes cantares isaias jeremias lamentacoes ezequiel daniel oseias joel amos obadias jonas miqueias naum habacuque sofonias ageu zacarias malaquias"

LIVROS_NT="mateus marcos lucas joao atos romanos 1corintios 2corintios galatas efesios filipenses colossenses 1tessalonicenses 2tessalonicenses 1timoteo 2timoteo tito filemom hebreus tiago 1pedro 2pedro 1joao 2joao 3joao judas apocalipse"

echo "========================================="
echo "  TRADUCAO COMPLETA DA BIBLIA COM IA"
echo "========================================="
echo ""

echo "--- ANTIGO TESTAMENTO ---"
for livro in $LIVROS_AT; do
    "$SCRIPT_DIR/traduzir-livro.sh" "$livro"
    echo ""
done

echo "--- NOVO TESTAMENTO ---"
for livro in $LIVROS_NT; do
    "$SCRIPT_DIR/traduzir-livro.sh" "$livro"
    echo ""
done

echo "========================================="
echo "  TRADUCAO COMPLETA!"
echo "========================================="
