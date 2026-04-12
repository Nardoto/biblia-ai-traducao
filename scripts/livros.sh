#!/bin/bash
# Dados compartilhados de livros, capitulos e idiomas
# Usado por todos os scripts de traducao

# Numero de capitulos por livro (ID canonico)
declare -A CAPITULOS
# AT
CAPITULOS[genesis]=50 CAPITULOS[exodus]=40 CAPITULOS[leviticus]=27
CAPITULOS[numbers]=36 CAPITULOS[deuteronomy]=34 CAPITULOS[joshua]=24
CAPITULOS[judges]=21 CAPITULOS[ruth]=4 CAPITULOS[1samuel]=31
CAPITULOS[2samuel]=24 CAPITULOS[1kings]=22 CAPITULOS[2kings]=25
CAPITULOS[1chronicles]=29 CAPITULOS[2chronicles]=36 CAPITULOS[ezra]=10
CAPITULOS[nehemiah]=13 CAPITULOS[esther]=10 CAPITULOS[job]=42
CAPITULOS[psalms]=150 CAPITULOS[proverbs]=31 CAPITULOS[ecclesiastes]=12
CAPITULOS[song-of-solomon]=8 CAPITULOS[isaiah]=66 CAPITULOS[jeremiah]=52
CAPITULOS[lamentations]=5 CAPITULOS[ezekiel]=48 CAPITULOS[daniel]=12
CAPITULOS[hosea]=14 CAPITULOS[joel]=3 CAPITULOS[amos]=9
CAPITULOS[obadiah]=1 CAPITULOS[jonah]=4 CAPITULOS[micah]=7
CAPITULOS[nahum]=3 CAPITULOS[habakkuk]=3 CAPITULOS[zephaniah]=3
CAPITULOS[haggai]=2 CAPITULOS[zechariah]=14 CAPITULOS[malachi]=4
# NT
CAPITULOS[matthew]=28 CAPITULOS[mark]=16 CAPITULOS[luke]=24
CAPITULOS[john]=21 CAPITULOS[acts]=28 CAPITULOS[romans]=16
CAPITULOS[1corinthians]=16 CAPITULOS[2corinthians]=13 CAPITULOS[galatians]=6
CAPITULOS[ephesians]=6 CAPITULOS[philippians]=4 CAPITULOS[colossians]=4
CAPITULOS[1thessalonians]=5 CAPITULOS[2thessalonians]=3 CAPITULOS[1timothy]=6
CAPITULOS[2timothy]=4 CAPITULOS[titus]=3 CAPITULOS[philemon]=1
CAPITULOS[hebrews]=13 CAPITULOS[james]=5 CAPITULOS[1peter]=5
CAPITULOS[2peter]=3 CAPITULOS[1john]=5 CAPITULOS[2john]=1
CAPITULOS[3john]=1 CAPITULOS[jude]=1 CAPITULOS[revelation]=22

# Testamento por livro
declare -A TESTAMENTO
for b in genesis exodus leviticus numbers deuteronomy joshua judges ruth \
         1samuel 2samuel 1kings 2kings 1chronicles 2chronicles ezra nehemiah \
         esther job psalms proverbs ecclesiastes song-of-solomon isaiah jeremiah \
         lamentations ezekiel daniel hosea joel amos obadiah jonah micah nahum \
         habakkuk zephaniah haggai zechariah malachi; do
    TESTAMENTO[$b]="ot"
done
for b in matthew mark luke john acts romans 1corinthians 2corinthians galatians \
         ephesians philippians colossians 1thessalonians 2thessalonians 1timothy \
         2timothy titus philemon hebrews james 1peter 2peter 1john 2john 3john \
         jude revelation; do
    TESTAMENTO[$b]="nt"
done

# Ordem canonica - NT
NT_LIVROS="matthew mark luke john acts romans 1corinthians 2corinthians galatians ephesians philippians colossians 1thessalonians 2thessalonians 1timothy 2timothy titus philemon hebrews james 1peter 2peter 1john 2john 3john jude revelation"

# Ordem canonica - AT
AT_LIVROS="genesis exodus leviticus numbers deuteronomy joshua judges ruth 1samuel 2samuel 1kings 2kings 1chronicles 2chronicles ezra nehemiah esther job psalms proverbs ecclesiastes song-of-solomon isaiah jeremiah lamentations ezekiel daniel hosea joel amos obadiah jonah micah nahum habakkuk zephaniah haggai zechariah malachi"

# Nome da pasta por idioma
declare -A PT_NOME EN_NOME ES_NOME
# AT
PT_NOME[genesis]="genesis" EN_NOME[genesis]="genesis" ES_NOME[genesis]="genesis"
PT_NOME[exodus]="exodo" EN_NOME[exodus]="exodus" ES_NOME[exodus]="exodo"
PT_NOME[leviticus]="levitico" EN_NOME[leviticus]="leviticus" ES_NOME[leviticus]="levitico"
PT_NOME[numbers]="numeros" EN_NOME[numbers]="numbers" ES_NOME[numbers]="numeros"
PT_NOME[deuteronomy]="deuteronomio" EN_NOME[deuteronomy]="deuteronomy" ES_NOME[deuteronomy]="deuteronomio"
PT_NOME[joshua]="josue" EN_NOME[joshua]="joshua" ES_NOME[joshua]="josue"
PT_NOME[judges]="juizes" EN_NOME[judges]="judges" ES_NOME[judges]="jueces"
PT_NOME[ruth]="rute" EN_NOME[ruth]="ruth" ES_NOME[ruth]="rut"
PT_NOME[1samuel]="1samuel" EN_NOME[1samuel]="1samuel" ES_NOME[1samuel]="1samuel"
PT_NOME[2samuel]="2samuel" EN_NOME[2samuel]="2samuel" ES_NOME[2samuel]="2samuel"
PT_NOME[1kings]="1reis" EN_NOME[1kings]="1kings" ES_NOME[1kings]="1reyes"
PT_NOME[2kings]="2reis" EN_NOME[2kings]="2kings" ES_NOME[2kings]="2reyes"
PT_NOME[1chronicles]="1cronicas" EN_NOME[1chronicles]="1chronicles" ES_NOME[1chronicles]="1cronicas"
PT_NOME[2chronicles]="2cronicas" EN_NOME[2chronicles]="2chronicles" ES_NOME[2chronicles]="2cronicas"
PT_NOME[ezra]="esdras" EN_NOME[ezra]="ezra" ES_NOME[ezra]="esdras"
PT_NOME[nehemiah]="neemias" EN_NOME[nehemiah]="nehemiah" ES_NOME[nehemiah]="nehemias"
PT_NOME[esther]="ester" EN_NOME[esther]="esther" ES_NOME[esther]="ester"
PT_NOME[job]="jo" EN_NOME[job]="job" ES_NOME[job]="job"
PT_NOME[psalms]="salmos" EN_NOME[psalms]="psalms" ES_NOME[psalms]="salmos"
PT_NOME[proverbs]="proverbios" EN_NOME[proverbs]="proverbs" ES_NOME[proverbs]="proverbios"
PT_NOME[ecclesiastes]="eclesiastes" EN_NOME[ecclesiastes]="ecclesiastes" ES_NOME[ecclesiastes]="eclesiastes"
PT_NOME[song-of-solomon]="cantares" EN_NOME[song-of-solomon]="song-of-solomon" ES_NOME[song-of-solomon]="cantares"
PT_NOME[isaiah]="isaias" EN_NOME[isaiah]="isaiah" ES_NOME[isaiah]="isaias"
PT_NOME[jeremiah]="jeremias" EN_NOME[jeremiah]="jeremiah" ES_NOME[jeremiah]="jeremias"
PT_NOME[lamentations]="lamentacoes" EN_NOME[lamentations]="lamentations" ES_NOME[lamentations]="lamentaciones"
PT_NOME[ezekiel]="ezequiel" EN_NOME[ezekiel]="ezekiel" ES_NOME[ezekiel]="ezequiel"
PT_NOME[daniel]="daniel" EN_NOME[daniel]="daniel" ES_NOME[daniel]="daniel"
PT_NOME[hosea]="oseias" EN_NOME[hosea]="hosea" ES_NOME[hosea]="oseas"
PT_NOME[joel]="joel" EN_NOME[joel]="joel" ES_NOME[joel]="joel"
PT_NOME[amos]="amos" EN_NOME[amos]="amos" ES_NOME[amos]="amos"
PT_NOME[obadiah]="obadias" EN_NOME[obadiah]="obadiah" ES_NOME[obadiah]="abdias"
PT_NOME[jonah]="jonas" EN_NOME[jonah]="jonah" ES_NOME[jonah]="jonas"
PT_NOME[micah]="miqueias" EN_NOME[micah]="micah" ES_NOME[micah]="miqueas"
PT_NOME[nahum]="naum" EN_NOME[nahum]="nahum" ES_NOME[nahum]="nahum"
PT_NOME[habakkuk]="habacuque" EN_NOME[habakkuk]="habakkuk" ES_NOME[habakkuk]="habacuc"
PT_NOME[zephaniah]="sofonias" EN_NOME[zephaniah]="zephaniah" ES_NOME[zephaniah]="sofonias"
PT_NOME[haggai]="ageu" EN_NOME[haggai]="haggai" ES_NOME[haggai]="hageo"
PT_NOME[zechariah]="zacarias" EN_NOME[zechariah]="zechariah" ES_NOME[zechariah]="zacarias"
PT_NOME[malachi]="malaquias" EN_NOME[malachi]="malachi" ES_NOME[malachi]="malaquias"
# NT
PT_NOME[matthew]="mateus" EN_NOME[matthew]="matthew" ES_NOME[matthew]="mateo"
PT_NOME[mark]="marcos" EN_NOME[mark]="mark" ES_NOME[mark]="marcos"
PT_NOME[luke]="lucas" EN_NOME[luke]="luke" ES_NOME[luke]="lucas"
PT_NOME[john]="joao" EN_NOME[john]="john" ES_NOME[john]="juan"
PT_NOME[acts]="atos" EN_NOME[acts]="acts" ES_NOME[acts]="hechos"
PT_NOME[romans]="romanos" EN_NOME[romans]="romans" ES_NOME[romans]="romanos"
PT_NOME[1corinthians]="1corintios" EN_NOME[1corinthians]="1corinthians" ES_NOME[1corinthians]="1corintios"
PT_NOME[2corinthians]="2corintios" EN_NOME[2corinthians]="2corinthians" ES_NOME[2corinthians]="2corintios"
PT_NOME[galatians]="galatas" EN_NOME[galatians]="galatians" ES_NOME[galatians]="galatas"
PT_NOME[ephesians]="efesios" EN_NOME[ephesians]="ephesians" ES_NOME[ephesians]="efesios"
PT_NOME[philippians]="filipenses" EN_NOME[philippians]="philippians" ES_NOME[philippians]="filipenses"
PT_NOME[colossians]="colossenses" EN_NOME[colossians]="colossians" ES_NOME[colossians]="colosenses"
PT_NOME[1thessalonians]="1tessalonicenses" EN_NOME[1thessalonians]="1thessalonians" ES_NOME[1thessalonians]="1tesalonicenses"
PT_NOME[2thessalonians]="2tessalonicenses" EN_NOME[2thessalonians]="2thessalonians" ES_NOME[2thessalonians]="2tesalonicenses"
PT_NOME[1timothy]="1timoteo" EN_NOME[1timothy]="1timothy" ES_NOME[1timothy]="1timoteo"
PT_NOME[2timothy]="2timoteo" EN_NOME[2timothy]="2timothy" ES_NOME[2timothy]="2timoteo"
PT_NOME[titus]="tito" EN_NOME[titus]="titus" ES_NOME[titus]="tito"
PT_NOME[philemon]="filemom" EN_NOME[philemon]="philemon" ES_NOME[philemon]="filemon"
PT_NOME[hebrews]="hebreus" EN_NOME[hebrews]="hebrews" ES_NOME[hebrews]="hebreos"
PT_NOME[james]="tiago" EN_NOME[james]="james" ES_NOME[james]="santiago"
PT_NOME[1peter]="1pedro" EN_NOME[1peter]="1peter" ES_NOME[1peter]="1pedro"
PT_NOME[2peter]="2pedro" EN_NOME[2peter]="2peter" ES_NOME[2peter]="2pedro"
PT_NOME[1john]="1joao" EN_NOME[1john]="1john" ES_NOME[1john]="1juan"
PT_NOME[2john]="2joao" EN_NOME[2john]="2john" ES_NOME[2john]="2juan"
PT_NOME[3john]="3joao" EN_NOME[3john]="3john" ES_NOME[3john]="3juan"
PT_NOME[jude]="judas" EN_NOME[jude]="jude" ES_NOME[jude]="judas"
PT_NOME[revelation]="apocalipse" EN_NOME[revelation]="revelation" ES_NOME[revelation]="apocalipsis"

# Nome de exibicao por idioma
declare -A PT_DISPLAY EN_DISPLAY ES_DISPLAY
# AT
PT_DISPLAY[genesis]="Genesis" EN_DISPLAY[genesis]="Genesis" ES_DISPLAY[genesis]="Genesis"
PT_DISPLAY[exodus]="Exodo" EN_DISPLAY[exodus]="Exodus" ES_DISPLAY[exodus]="Exodo"
PT_DISPLAY[leviticus]="Levitico" EN_DISPLAY[leviticus]="Leviticus" ES_DISPLAY[leviticus]="Levitico"
PT_DISPLAY[numbers]="Numeros" EN_DISPLAY[numbers]="Numbers" ES_DISPLAY[numbers]="Numeros"
PT_DISPLAY[deuteronomy]="Deuteronomio" EN_DISPLAY[deuteronomy]="Deuteronomy" ES_DISPLAY[deuteronomy]="Deuteronomio"
PT_DISPLAY[joshua]="Josue" EN_DISPLAY[joshua]="Joshua" ES_DISPLAY[joshua]="Josue"
PT_DISPLAY[judges]="Juizes" EN_DISPLAY[judges]="Judges" ES_DISPLAY[judges]="Jueces"
PT_DISPLAY[ruth]="Rute" EN_DISPLAY[ruth]="Ruth" ES_DISPLAY[ruth]="Rut"
PT_DISPLAY[1samuel]="1 Samuel" EN_DISPLAY[1samuel]="1 Samuel" ES_DISPLAY[1samuel]="1 Samuel"
PT_DISPLAY[2samuel]="2 Samuel" EN_DISPLAY[2samuel]="2 Samuel" ES_DISPLAY[2samuel]="2 Samuel"
PT_DISPLAY[1kings]="1 Reis" EN_DISPLAY[1kings]="1 Kings" ES_DISPLAY[1kings]="1 Reyes"
PT_DISPLAY[2kings]="2 Reis" EN_DISPLAY[2kings]="2 Kings" ES_DISPLAY[2kings]="2 Reyes"
PT_DISPLAY[1chronicles]="1 Cronicas" EN_DISPLAY[1chronicles]="1 Chronicles" ES_DISPLAY[1chronicles]="1 Cronicas"
PT_DISPLAY[2chronicles]="2 Cronicas" EN_DISPLAY[2chronicles]="2 Chronicles" ES_DISPLAY[2chronicles]="2 Cronicas"
PT_DISPLAY[ezra]="Esdras" EN_DISPLAY[ezra]="Ezra" ES_DISPLAY[ezra]="Esdras"
PT_DISPLAY[nehemiah]="Neemias" EN_DISPLAY[nehemiah]="Nehemiah" ES_DISPLAY[nehemiah]="Nehemias"
PT_DISPLAY[esther]="Ester" EN_DISPLAY[esther]="Esther" ES_DISPLAY[esther]="Ester"
PT_DISPLAY[job]="Jo" EN_DISPLAY[job]="Job" ES_DISPLAY[job]="Job"
PT_DISPLAY[psalms]="Salmos" EN_DISPLAY[psalms]="Psalms" ES_DISPLAY[psalms]="Salmos"
PT_DISPLAY[proverbs]="Proverbios" EN_DISPLAY[proverbs]="Proverbs" ES_DISPLAY[proverbs]="Proverbios"
PT_DISPLAY[ecclesiastes]="Eclesiastes" EN_DISPLAY[ecclesiastes]="Ecclesiastes" ES_DISPLAY[ecclesiastes]="Eclesiastes"
PT_DISPLAY[song-of-solomon]="Cantares" EN_DISPLAY[song-of-solomon]="Song of Solomon" ES_DISPLAY[song-of-solomon]="Cantares"
PT_DISPLAY[isaiah]="Isaias" EN_DISPLAY[isaiah]="Isaiah" ES_DISPLAY[isaiah]="Isaias"
PT_DISPLAY[jeremiah]="Jeremias" EN_DISPLAY[jeremiah]="Jeremiah" ES_DISPLAY[jeremiah]="Jeremias"
PT_DISPLAY[lamentations]="Lamentacoes" EN_DISPLAY[lamentations]="Lamentations" ES_DISPLAY[lamentations]="Lamentaciones"
PT_DISPLAY[ezekiel]="Ezequiel" EN_DISPLAY[ezekiel]="Ezekiel" ES_DISPLAY[ezekiel]="Ezequiel"
PT_DISPLAY[daniel]="Daniel" EN_DISPLAY[daniel]="Daniel" ES_DISPLAY[daniel]="Daniel"
PT_DISPLAY[hosea]="Oseias" EN_DISPLAY[hosea]="Hosea" ES_DISPLAY[hosea]="Oseas"
PT_DISPLAY[joel]="Joel" EN_DISPLAY[joel]="Joel" ES_DISPLAY[joel]="Joel"
PT_DISPLAY[amos]="Amos" EN_DISPLAY[amos]="Amos" ES_DISPLAY[amos]="Amos"
PT_DISPLAY[obadiah]="Obadias" EN_DISPLAY[obadiah]="Obadiah" ES_DISPLAY[obadiah]="Abdias"
PT_DISPLAY[jonah]="Jonas" EN_DISPLAY[jonah]="Jonah" ES_DISPLAY[jonah]="Jonas"
PT_DISPLAY[micah]="Miqueias" EN_DISPLAY[micah]="Micah" ES_DISPLAY[micah]="Miqueas"
PT_DISPLAY[nahum]="Naum" EN_DISPLAY[nahum]="Nahum" ES_DISPLAY[nahum]="Nahum"
PT_DISPLAY[habakkuk]="Habacuque" EN_DISPLAY[habakkuk]="Habakkuk" ES_DISPLAY[habakkuk]="Habacuc"
PT_DISPLAY[zephaniah]="Sofonias" EN_DISPLAY[zephaniah]="Zephaniah" ES_DISPLAY[zephaniah]="Sofonias"
PT_DISPLAY[haggai]="Ageu" EN_DISPLAY[haggai]="Haggai" ES_DISPLAY[haggai]="Hageo"
PT_DISPLAY[zechariah]="Zacarias" EN_DISPLAY[zechariah]="Zechariah" ES_DISPLAY[zechariah]="Zacarias"
PT_DISPLAY[malachi]="Malaquias" EN_DISPLAY[malachi]="Malachi" ES_DISPLAY[malachi]="Malaquias"
# NT
PT_DISPLAY[matthew]="Mateus" EN_DISPLAY[matthew]="Matthew" ES_DISPLAY[matthew]="Mateo"
PT_DISPLAY[mark]="Marcos" EN_DISPLAY[mark]="Mark" ES_DISPLAY[mark]="Marcos"
PT_DISPLAY[luke]="Lucas" EN_DISPLAY[luke]="Luke" ES_DISPLAY[luke]="Lucas"
PT_DISPLAY[john]="Joao" EN_DISPLAY[john]="John" ES_DISPLAY[john]="Juan"
PT_DISPLAY[acts]="Atos" EN_DISPLAY[acts]="Acts" ES_DISPLAY[acts]="Hechos"
PT_DISPLAY[romans]="Romanos" EN_DISPLAY[romans]="Romans" ES_DISPLAY[romans]="Romanos"
PT_DISPLAY[1corinthians]="1 Corintios" EN_DISPLAY[1corinthians]="1 Corinthians" ES_DISPLAY[1corinthians]="1 Corintios"
PT_DISPLAY[2corinthians]="2 Corintios" EN_DISPLAY[2corinthians]="2 Corinthians" ES_DISPLAY[2corinthians]="2 Corintios"
PT_DISPLAY[galatians]="Galatas" EN_DISPLAY[galatians]="Galatians" ES_DISPLAY[galatians]="Galatas"
PT_DISPLAY[ephesians]="Efesios" EN_DISPLAY[ephesians]="Ephesians" ES_DISPLAY[ephesians]="Efesios"
PT_DISPLAY[philippians]="Filipenses" EN_DISPLAY[philippians]="Philippians" ES_DISPLAY[philippians]="Filipenses"
PT_DISPLAY[colossians]="Colossenses" EN_DISPLAY[colossians]="Colossians" ES_DISPLAY[colossians]="Colosenses"
PT_DISPLAY[1thessalonians]="1 Tessalonicenses" EN_DISPLAY[1thessalonians]="1 Thessalonians" ES_DISPLAY[1thessalonians]="1 Tesalonicenses"
PT_DISPLAY[2thessalonians]="2 Tessalonicenses" EN_DISPLAY[2thessalonians]="2 Thessalonians" ES_DISPLAY[2thessalonians]="2 Tesalonicenses"
PT_DISPLAY[1timothy]="1 Timoteo" EN_DISPLAY[1timothy]="1 Timothy" ES_DISPLAY[1timothy]="1 Timoteo"
PT_DISPLAY[2timothy]="2 Timoteo" EN_DISPLAY[2timothy]="2 Timothy" ES_DISPLAY[2timothy]="2 Timoteo"
PT_DISPLAY[titus]="Tito" EN_DISPLAY[titus]="Titus" ES_DISPLAY[titus]="Tito"
PT_DISPLAY[philemon]="Filemom" EN_DISPLAY[philemon]="Philemon" ES_DISPLAY[philemon]="Filemon"
PT_DISPLAY[hebrews]="Hebreus" EN_DISPLAY[hebrews]="Hebrews" ES_DISPLAY[hebrews]="Hebreos"
PT_DISPLAY[james]="Tiago" EN_DISPLAY[james]="James" ES_DISPLAY[james]="Santiago"
PT_DISPLAY[1peter]="1 Pedro" EN_DISPLAY[1peter]="1 Peter" ES_DISPLAY[1peter]="1 Pedro"
PT_DISPLAY[2peter]="2 Pedro" EN_DISPLAY[2peter]="2 Peter" ES_DISPLAY[2peter]="2 Pedro"
PT_DISPLAY[1john]="1 Joao" EN_DISPLAY[1john]="1 John" ES_DISPLAY[1john]="1 Juan"
PT_DISPLAY[2john]="2 Joao" EN_DISPLAY[2john]="2 John" ES_DISPLAY[2john]="2 Juan"
PT_DISPLAY[3john]="3 Joao" EN_DISPLAY[3john]="3 John" ES_DISPLAY[3john]="3 Juan"
PT_DISPLAY[jude]="Judas" EN_DISPLAY[jude]="Jude" ES_DISPLAY[jude]="Judas"
PT_DISPLAY[revelation]="Apocalipse" EN_DISPLAY[revelation]="Revelation" ES_DISPLAY[revelation]="Apocalipsis"

# Nomes dos testamentos por idioma
declare -A TESTAMENTO_PASTA
TESTAMENTO_PASTA[pt_nt]="novo-testamento" TESTAMENTO_PASTA[pt_ot]="antigo-testamento"
TESTAMENTO_PASTA[en_nt]="new-testament" TESTAMENTO_PASTA[en_ot]="old-testament"
TESTAMENTO_PASTA[es_nt]="nuevo-testamento" TESTAMENTO_PASTA[es_ot]="antiguo-testamento"

# Funcoes auxiliares

# Retorna o nome da pasta do livro no idioma
get_book_folder() {
    local lang="$1" book="$2"
    case "$lang" in
        pt) echo "${PT_NOME[$book]}" ;;
        en) echo "${EN_NOME[$book]}" ;;
        es) echo "${ES_NOME[$book]}" ;;
    esac
}

# Retorna o nome de exibicao do livro no idioma
get_book_display() {
    local lang="$1" book="$2"
    case "$lang" in
        pt) echo "${PT_DISPLAY[$book]}" ;;
        en) echo "${EN_DISPLAY[$book]}" ;;
        es) echo "${ES_DISPLAY[$book]}" ;;
    esac
}

# Retorna a pasta do testamento no idioma
get_testament_folder() {
    local lang="$1" testament="$2"
    echo "${TESTAMENTO_PASTA[${lang}_${testament}]}"
}

# Retorna o caminho completo de saida para um capitulo
get_output_path() {
    local lang="$1" book="$2" chapter="$3"
    local testament="${TESTAMENTO[$book]}"
    local test_folder=$(get_testament_folder "$lang" "$testament")
    local book_folder=$(get_book_folder "$lang" "$book")
    local cap=$(printf "%02d" "$chapter")
    echo "parafrase/${lang}/${test_folder}/${book_folder}/${cap}.md"
}
