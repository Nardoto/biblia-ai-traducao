#!/usr/bin/env python3
"""
Gera a estrutura da Bíblia em ordem cronológica para o site (rota /pt/cronologica).

Fonte: oneyearchronological.json do khornberg/readingplans.
Saída: site/data/cronologica-pericopes.json (Etapa A — lista plana traduzida).

A Etapa B (agrupar em capítulos narrativos) usa um arquivo separado.
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
INPUT = ROOT / "site" / "data" / "khornberg-cronologico.json"
OUTPUT = ROOT / "site" / "data" / "cronologica-pericopes.json"

# Mapeamento livro EN -> (slug PT, nome PT, testamento)
LIVROS = {
    # AT - Pentateuco
    "Genesis":       ("genesis",       "Gênesis",       "antigo"),
    "Exodus":        ("exodo",         "Êxodo",         "antigo"),
    "Leviticus":     ("levitico",      "Levítico",      "antigo"),
    "Numbers":       ("numeros",       "Números",       "antigo"),
    "Deuteronomy":   ("deuteronomio",  "Deuteronômio",  "antigo"),
    # AT - Históricos
    "Joshua":        ("josue",         "Josué",         "antigo"),
    "Judges":        ("juizes",        "Juízes",        "antigo"),
    "Ruth":          ("rute",          "Rute",          "antigo"),
    "1Samuel":       ("1samuel",       "1 Samuel",      "antigo"),
    "2Samuel":       ("2samuel",       "2 Samuel",      "antigo"),
    "1Kings":        ("1reis",         "1 Reis",        "antigo"),
    "2Kings":        ("2reis",         "2 Reis",        "antigo"),
    "1Chronicles":   ("1-cronicas",    "1 Crônicas",    "antigo"),
    "2Chronicles":   ("2-cronicas",    "2 Crônicas",    "antigo"),
    "Ezra":          ("esdras",        "Esdras",        "antigo"),
    "Nehemiah":      ("neemias",       "Neemias",       "antigo"),
    "Esther":        ("ester",         "Ester",         "antigo"),
    # AT - Poéticos / Sapienciais
    "Job":           ("jo",            "Jó",            "antigo"),
    "Psalm":         ("salmos",        "Salmos",        "antigo"),
    "Psalms":        ("salmos",        "Salmos",        "antigo"),
    "Proverbs":      ("proverbios",    "Provérbios",    "antigo"),
    "Ecclesiastes":  ("eclesiastes",   "Eclesiastes",   "antigo"),
    "Song":          ("cantares",      "Cantares",      "antigo"),
    "SongofSolomon": ("cantares",      "Cantares",      "antigo"),
    "SongOfSolomon": ("cantares",      "Cantares",      "antigo"),
    "SongOfSongs":   ("cantares",      "Cantares",      "antigo"),
    # AT - Profetas Maiores
    "Isaiah":        ("isaias",        "Isaías",        "antigo"),
    "Jeremiah":      ("jeremias",      "Jeremias",      "antigo"),
    "Lamentations":  ("lamentacoes",   "Lamentações",   "antigo"),
    "Ezekiel":       ("ezequiel",      "Ezequiel",      "antigo"),
    "Daniel":        ("daniel",        "Daniel",        "antigo"),
    # AT - Profetas Menores
    "Hosea":         ("oseias",        "Oseias",        "antigo"),
    "Joel":          ("joel",          "Joel",          "antigo"),
    "Amos":          ("amos",          "Amós",          "antigo"),
    "Obadiah":       ("obadias",       "Obadias",       "antigo"),
    "Jonah":         ("jonas",         "Jonas",         "antigo"),
    "Micah":         ("miqueias",      "Miqueias",      "antigo"),
    "Nahum":         ("naum",          "Naum",          "antigo"),
    "Habakkuk":      ("habacuque",     "Habacuque",     "antigo"),
    "Zephaniah":     ("sofonias",      "Sofonias",      "antigo"),
    "Haggai":        ("ageu",          "Ageu",          "antigo"),
    "Zechariah":     ("zacarias",      "Zacarias",      "antigo"),
    "Malachi":       ("malaquias",     "Malaquias",     "antigo"),
    # NT - Evangelhos / Atos
    "Matthew":       ("mateus",        "Mateus",        "novo"),
    "Mark":          ("marcos",        "Marcos",        "novo"),
    "Luke":          ("lucas",         "Lucas",         "novo"),
    "John":          ("joao",          "João",          "novo"),
    "Acts":          ("atos",          "Atos",          "novo"),
    # NT - Cartas Paulinas
    "Romans":         ("romanos",            "Romanos",           "novo"),
    "1Corinthians":   ("1-corintios",        "1 Coríntios",       "novo"),
    "2Corinthians":   ("2-corintios",        "2 Coríntios",       "novo"),
    "Galatians":      ("galatas",            "Gálatas",           "novo"),
    "Ephesians":      ("efesios",            "Efésios",           "novo"),
    "Philippians":    ("filipenses",         "Filipenses",        "novo"),
    "Colossians":     ("colossenses",        "Colossenses",       "novo"),
    "1Thessalonians": ("1tessalonicenses",   "1 Tessalonicenses", "novo"),
    "2Thessalonians": ("2tessalonicenses",   "2 Tessalonicenses", "novo"),
    "1Timothy":       ("1timoteo",           "1 Timóteo",         "novo"),
    "2Timothy":       ("2timoteo",           "2 Timóteo",         "novo"),
    "Titus":          ("tito",               "Tito",              "novo"),
    "Philemon":       ("filemom",            "Filemom",           "novo"),
    # NT - Cartas Católicas / Hebreus
    "Hebrews":  ("hebreus",     "Hebreus",     "novo"),
    "James":    ("tiago",       "Tiago",       "novo"),
    "1Peter":   ("1pedro",      "1 Pedro",     "novo"),
    "2Peter":   ("2pedro",      "2 Pedro",     "novo"),
    "1John":    ("1joao",       "1 João",      "novo"),
    "2John":    ("2joao",       "2 João",      "novo"),
    "3John":    ("3joao",       "3 João",      "novo"),
    "Jude":     ("judas",       "Judas",       "novo"),
    # NT - Apocalipse
    "Revelation": ("apocalipse", "Apocalipse", "novo"),
}

# Regex pra parsear referências do khornberg
# Exemplos: "Genesis 1:1-3:24", "1Chronicles 1:1-4", "Psalm 90", "Psalm 4-6"
REF_RE = re.compile(
    r"^(?P<book>\d?[A-Za-z]+(?:[A-Za-z]+)?)\s+"
    r"(?P<rest>.+)$"
)

def parse_ref(ref: str) -> dict:
    """Parse uma referência tipo 'Genesis 1:1-3:24' em componentes."""
    m = REF_RE.match(ref.strip())
    if not m:
        return {"erro": f"não consegui parsear: {ref}"}

    book_en = m.group("book")
    rest = m.group("rest").strip()

    # Normaliza: title-case (JONAH -> Jonah)
    if book_en not in LIVROS:
        # tenta normalização case-insensitive
        for k in LIVROS:
            if k.lower() == book_en.lower():
                book_en = k
                break

    if book_en not in LIVROS:
        return {"erro": f"livro desconhecido: {book_en} em '{ref}'"}

    slug, nome_pt, testamento = LIVROS[book_en]

    # Tipos de "rest":
    #   "1:1-3:24"  -> cap_ini=1 v_ini=1 cap_fim=3 v_fim=24
    #   "1:1-4"     -> cap_ini=1 v_ini=1 cap_fim=1 v_fim=4
    #   "1:1"       -> cap_ini=1 v_ini=1 cap_fim=1 v_fim=1
    #   "11"        -> cap_ini=11 cap_fim=11 (capítulo inteiro, p/ Salmos)
    #   "4-6"       -> cap_ini=4 cap_fim=6 (vários capítulos, p/ Salmos)
    #   "11:32"     -> cap_ini=11 v_ini=32 cap_fim=11 v_fim=32

    cap_ini = cap_fim = v_ini = v_fim = None

    # Tem ":"?
    if ":" in rest:
        # Tem versículos
        # Pode ter ":" em ambos os lados do "-" ou só num lado
        if "-" in rest:
            esq, dir = rest.split("-", 1)
            # esq sempre tem ":"
            cap_ini, v_ini = map(int, esq.split(":"))
            if ":" in dir:
                # "1:1-3:24"
                cap_fim, v_fim = map(int, dir.split(":"))
            else:
                # "1:1-4"  (mesmo capítulo)
                cap_fim = cap_ini
                v_fim = int(dir)
        else:
            # "1:1" (versículo único)
            cap_ini, v_ini = map(int, rest.split(":"))
            cap_fim, v_fim = cap_ini, v_ini
    else:
        # Só capítulos (típico de Salmos)
        if "-" in rest:
            cap_ini, cap_fim = map(int, rest.split("-"))
        else:
            cap_ini = cap_fim = int(rest)

    # Referência formatada em PT
    if v_ini is None:
        # só capítulos
        if cap_ini == cap_fim:
            ref_pt = f"{nome_pt} {cap_ini}"
        else:
            ref_pt = f"{nome_pt} {cap_ini}–{cap_fim}"
    else:
        # com versículos
        if cap_ini == cap_fim:
            if v_ini == v_fim:
                ref_pt = f"{nome_pt} {cap_ini}:{v_ini}"
            else:
                ref_pt = f"{nome_pt} {cap_ini}:{v_ini}-{v_fim}"
        else:
            ref_pt = f"{nome_pt} {cap_ini}:{v_ini}–{cap_fim}:{v_fim}"

    return {
        "ref_orig": ref,
        "ref_pt": ref_pt,
        "livro_en": book_en,
        "livro_pt": nome_pt,
        "slug": slug,
        "testamento": testamento,
        "cap_ini": cap_ini,
        "cap_fim": cap_fim,
        "v_ini": v_ini,
        "v_fim": v_fim,
    }


def main():
    with open(INPUT, encoding="utf-8") as f:
        khornberg = json.load(f)

    pericopes = []
    erros = []
    for i, ref in enumerate(khornberg["data"], 1):
        parsed = parse_ref(ref)
        if "erro" in parsed:
            erros.append(parsed["erro"])
            print(f"⚠ #{i}: {parsed['erro']}")
            continue
        parsed["idx"] = i
        pericopes.append(parsed)

    out = {
        "meta": {
            "fonte": "khornberg/readingplans → oneyearchronological.json",
            "fonte_url": "https://github.com/khornberg/readingplans",
            "esquema_base": "One Year Chronological (estilo Tyndale)",
            "total_pericopes": len(pericopes),
            "erros_de_parse": len(erros),
        },
        "pericopes": pericopes,
    }

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    print()
    print(f"✓ Gerado: {OUTPUT}")
    print(f"  Total: {len(pericopes)} perícopes ({len(erros)} erros)")

    # Estatísticas úteis
    livros_count = {}
    for p in pericopes:
        livros_count[p["livro_pt"]] = livros_count.get(p["livro_pt"], 0) + 1
    print(f"  Livros distintos: {len(livros_count)}")


if __name__ == "__main__":
    main()
