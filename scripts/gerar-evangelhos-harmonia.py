#!/usr/bin/env python3
"""
Gera o mapa da harmonia dos 4 evangelhos para a Bíblia Cronológica.

Fonte de ordenação: site/data/cronologica-pericopes.json (idx 707-1025).
Inspiração da harmonização: A.T. Robertson, Harmony of the Gospels (1922, PD).

Saída: site/data/evangelhos-harmonia.json
       Estrutura: 12 capítulos narrativos → ~180 cenas → cada cena lista
       quais evangelhos contam aquela passagem.

Esta é a Etapa 1 (mapa). A Etapa 2 (texto fundido) virá depois.
"""

import json
from pathlib import Path

ROOT = Path(__file__).parent.parent
INPUT = ROOT / "site" / "data" / "cronologica-pericopes.json"
OUTPUT = ROOT / "site" / "data" / "evangelhos-harmonia.json"

# ============================================================================
# Estrutura: cada cena é uma tupla (titulo, [lista de idxs], base, nota?, conflito?)
#   - titulo:  título PT da cena (curto, narrativo)
#   - idxs:    perícopes do khornberg que compõem essa cena
#   - base:    "Mateus" | "Marcos" | "Lucas" | "João" | "fusão" — qual evangelho
#              é a coluna mestra (fusão = não há base óbvia, integra tudo)
#   - nota:    (opcional) explicação editorial sobre a fusão
#   - conflito: (opcional) flag de conflito aparente que precisa de nota no texto
# ============================================================================

CAPITULOS = [
    {
        "titulo": "Prólogos e Nascimento",
        "subtitulo": "De antes do tempo até a fuga ao Egito",
        "cenas": [
            ("Os quatro começos", [707, 708, 709], "fusão",
             "Cada evangelho abre de um ângulo diferente: Marcos vai direto ao ponto, "
             "Lucas escreve a Teófilo como historiador, João recua à eternidade. "
             "Vamos manter os três começos lado a lado, como quatro vozes em coro.", None),
            ("As duas genealogias de Jesus", [710, 711], "fusão",
             "Mateus traça a linhagem de Abraão a Jesus passando por Davi e Salomão (linha real). "
             "Lucas traça de Jesus até Adão passando por Davi e Natã (linha sacerdotal/humana). "
             "Apresentar as duas em paralelo, com nota sobre as divergências.",
             "Genealogias com nomes diferentes entre Davi e José — explicar as duas leituras tradicionais"),
            ("O anúncio a Zacarias", [712], "Lucas", None, None),
            ("O anúncio a Maria", [712], "Lucas",
             "Mesma perícope de Lc 1:5-38 — separar editorialmente em duas cenas (Zacarias / Maria).", None),
            ("Maria visita Isabel; nasce João Batista", [713], "Lucas", None, None),
            ("O anúncio a José", [714], "Mateus", None, None),
            ("Nascimento em Belém; pastores; apresentação no templo", [715], "Lucas", None, None),
            ("Os magos do oriente; fuga ao Egito; volta a Nazaré", [716], "Mateus",
             "Mateus é a única fonte para magos, fuga e massacre dos inocentes. Lucas não menciona — "
             "vamos posicionar essa cena depois da apresentação no templo (Lc 2:39 fala em volta a Nazaré "
             "sem mencionar o desvio pelo Egito; harmonização tradicional encaixa Mateus aqui).",
             "Lucas vs. Mateus: ordem entre apresentação no templo e fuga ao Egito"),
        ],
    },
    {
        "titulo": "Anos Ocultos",
        "subtitulo": "Da infância ao batismo no Jordão",
        "cenas": [
            ("Jesus aos 12 anos no templo", [717], "Lucas", None, None),
            ("João Batista pregando no deserto", [718, 719, 720], "fusão",
             "Os 3 sinóticos descrevem a pregação de João. Marcos é o mais curto, "
             "Lucas o mais detalhado (com pregação a soldados e cobradores). Fundir tudo.", None),
            ("Jesus é batizado por João", [721, 722, 723], "fusão",
             "Os 3 sinóticos contam — fundir em um só relato. João Evangelista não narra "
             "diretamente o batismo, mas alude (Jo 1:32-34) — vamos integrar essa alusão.", None),
            ("Tentação no deserto", [724, 725, 726], "Mateus",
             "Marcos resume em 2 versículos. Mateus e Lucas detalham as 3 tentações em "
             "ORDENS DIFERENTES (Mt: pão→templo→reinos; Lc: pão→reinos→templo). "
             "Vamos seguir a ordem de Mateus por ser o relato mais antigo na tradição lectionária, "
             "com nota sobre a divergência.",
             "Ordem das tentações difere entre Mt e Lc"),
        ],
    },
    {
        "titulo": "Início Discreto na Judeia",
        "subtitulo": "Primeiros sinais antes da Galileia",
        "cenas": [
            ("Testemunho de João Batista; chamado dos primeiros discípulos", [727], "João", None, None),
            ("Casamento em Caná; primeira purificação do templo", [727], "João",
             "Mesma perícope (Jo 1:19–2:25) — separar em duas cenas para clareza narrativa.",
             "João põe a purificação do templo NO INÍCIO; sinóticos põem na última semana. "
             "Tradição majoritária: foram dois eventos distintos."),
            ("Nicodemos; mais sobre João Batista; mulher samaritana", [728], "João",
             "Bloco contínuo de João 3-4. Conversas-chave do início do ministério.", None),
            ("João Batista é preso; Jesus volta para a Galileia", [729, 730, 731, 732], "fusão",
             "Lc 3:19-20 marca a prisão; Mc/Mt marcam a transição para a Galileia.", None),
            ("Cura do filho do funcionário (segundo sinal em Caná)", [733], "João", None, None),
            ("Rejeição em Nazaré (primeira visita)", [734], "Lucas",
             "Lucas conta uma rejeição em Nazaré logo no início (Lc 4:16-30). "
             "Mateus e Marcos contam outra rejeição depois (cena em Mc 6 / Mt 13). "
             "Tradição harmonizadora: foram duas visitas distintas.",
             "Rejeição em Nazaré — Lucas no início, Mc/Mt depois"),
        ],
    },
    {
        "titulo": "Galileia: o Início",
        "subtitulo": "Cafarnaum como base; primeiros milagres e chamados",
        "cenas": [
            ("Chamado dos quatro pescadores", [735, 736], "Marcos", None, None),
            ("Endemoninhado na sinagoga de Cafarnaum", [737, 738], "Marcos", None, None),
            ("Cura da sogra de Pedro e muitos doentes ao entardecer", [739, 740, 741], "Marcos", None, None),
            ("Primeira viagem missionária pela Galileia", [742, 743, 744], "Marcos", None, None),
            ("Pesca milagrosa e chamado completo de Pedro, Tiago e João", [745], "Lucas",
             "Só Lucas narra. Tradição: complementa a cena em Mc 1:16-20 / Mt 4:18-22 "
             "(ali era o convite inicial; aqui é a confirmação após o milagre).", None),
            ("Cura de um leproso", [746, 747, 748], "Marcos", None, None),
            ("Cura do paralítico descido pelo telhado", [749, 750, 751], "Marcos", None, None),
            ("Chamado de Levi (Mateus); jantar com pecadores", [752, 753, 754], "Marcos",
             "Mateus se identifica como o convidado (Mt 9:9). Marcos e Lucas chamam de Levi.",
             "Mateus = Levi (mesma pessoa, dois nomes)"),
            ("Pergunta sobre o jejum; remendo novo, vinho novo", [755, 756, 757], "Marcos", None, None),
            ("Cura na piscina de Betesda", [758], "João", None, None),
            ("Discípulos colhem trigo no sábado", [759, 760, 761], "Marcos", None, None),
            ("Cura do homem da mão atrofiada (sábado)", [762, 763, 764], "Marcos", None, None),
            ("Multidões seguem Jesus; ele se retira", [765, 766], "fusão", None, None),
        ],
    },
    {
        "titulo": "O Sermão e o Auge da Galileia",
        "subtitulo": "Os Doze, o Sermão do Monte, parábolas do Reino",
        "cenas": [
            ("Escolha dos Doze apóstolos", [766, 767], "Marcos",
             "Marcos lista os 12 em 3:13-19; Lucas em 6:12-16. Pequenas variações de nome.", None),
            ("Bem-aventuranças", [768, 769], "Mateus",
             "Mateus tem 9 bem-aventuranças (no monte). Lucas tem 4 + 4 'ais' (na planície). "
             "Tradição harmonizadora: o sermão foi pregado mais de uma vez, ou Lc resume Mt. "
             "Vamos seguir a versão de Mateus (mais completa) e integrar os 'ais' de Lucas.",
             "Sermão do Monte (Mt) vs. Sermão da Planície (Lc)"),
            ("Sal da terra, luz do mundo, lei e profetas", [770], "Mateus", None, None),
            ("Esmola, oração e jejum em segredo; Pai-Nosso", [771, 772, 773], "Mateus",
             "Mt 6 tem o Pai-Nosso aqui; Lc 11 tem em outro contexto. Manter os dois.", None),
            ("Pedir, buscar, bater; árvore e frutos", [774, 775, 776], "Mateus", None, None),
            ("Casa sobre a rocha; fim do sermão", [777, 778], "Mateus", None, None),
            ("Cura do servo do centurião", [779, 780], "Lucas",
             "Lucas tem mais detalhes (mensageiros judeus). Usar Lucas como base.", None),
            ("Ressurreição do filho da viúva de Naim", [780], "Lucas", None, None),
            ("João Batista manda perguntar; Jesus elogia João", [781, 782], "Mateus", None, None),
            ("Jesus condena cidades incrédulas; convite aos cansados", [783], "Mateus", None, None),
            ("Mulher pecadora unge os pés de Jesus na casa de Simão", [784], "Lucas",
             "Distinta da unção em Betânia (que vem na última semana). Aqui é uma pecadora "
             "anônima na casa de um fariseu na Galileia.",
             "NÃO confundir com unção em Betânia — são duas mulheres e dois eventos diferentes"),
            ("As mulheres que seguiam Jesus", [785], "Lucas", None, None),
            ("Acusação dos escribas; Jesus e Belzebu; pecado contra o Espírito", [786, 787], "Marcos", None, None),
            ("A verdadeira família de Jesus", [788, 789, 790], "Marcos", None, None),
        ],
    },
    {
        "titulo": "Parábolas e Milagres",
        "subtitulo": "O Reino em histórias; poder sobre tempestade, demônios e morte",
        "cenas": [
            ("Parábola do semeador (e sua explicação)", [791, 792, 793, 794, 795, 796], "Marcos", None, None),
            ("Lâmpada, semente que cresce sozinha, joio", [797, 798], "fusão", None, None),
            ("Grão de mostarda, fermento, e outras parábolas do Reino", [799, 800], "fusão", None, None),
            ("Acalma a tempestade", [801, 802, 803], "Marcos", None, None),
            ("Endemoninhado(s) e os porcos em Gerasa/Gadara", [804, 805, 806], "Marcos",
             "Marcos e Lucas falam de UM endemoninhado em Gerasa/Gerasenos. "
             "Mateus fala de DOIS endemoninhados em Gadara/Gadarenos. "
             "Harmonização tradicional: havia dois, mas um era tão dominante que Mc/Lc focam só nele; "
             "Gerasa e Gadara estavam na mesma região.",
             "Um demoníaco (Mc/Lc) ou dois (Mt)? Gerasa ou Gadara?"),
            ("Jairo pede pela filha; mulher com hemorragia; ressurreição da menina", [807, 808, 809], "Marcos", None, None),
            ("Cura de dois cegos e um mudo endemoninhado", [810], "Mateus", None, None),
            ("Segunda rejeição em Nazaré", [811, 812], "Marcos",
             "Esta é a rejeição contada por Mc/Mt (distinta da de Lc 4 no início).", None),
            ("Compaixão pelas multidões", [813], "Mateus", None, None),
            ("Envio dos Doze em missão", [814, 815, 816], "Marcos",
             "Mateus 10 traz um discurso longo de instruções; Mc/Lc resumem.", None),
            ("Herodes ouve falar de Jesus", [817], "Lucas", None, None),
            ("Morte de João Batista (flashback)", [818, 819], "Marcos", None, None),
        ],
    },
    {
        "titulo": "Pão para Multidões e Confissão de Pedro",
        "subtitulo": "Sinais que polarizam; o ponto de virada em Cesareia",
        "cenas": [
            ("Multiplicação dos pães e peixes para 5 mil", [819, 820, 821, 822], "fusão",
             "Único milagre nos 4 evangelhos. Fundir as quatro versões.", None),
            ("Jesus anda sobre as águas", [823, 824, 825], "Mateus",
             "Só Mateus traz Pedro tentando andar sobre as águas. Integrar.", None),
            ("Curas em Genesaré", [826, 827], "Marcos", None, None),
            ("Discurso do Pão da Vida em Cafarnaum", [828], "João",
             "Sequência longa de João 6:22-71. O ponto em que muitos discípulos abandonam Jesus.", None),
            ("Discussão sobre tradição dos anciãos e o que contamina", [829, 830], "Marcos", None, None),
            ("A mulher siro-fenícia (cananeia)", [831, 832], "Marcos",
             "Mc chama de siro-fenícia, Mt de cananeia. Termos sinônimos para o mesmo grupo.", None),
            ("Cura do surdo-gago em Decápolis e outras curas", [833, 834], "Marcos", None, None),
            ("Multiplicação dos pães para 4 mil", [835, 836], "Marcos",
             "DIFERENTE da multiplicação para 5 mil (cf. Mc 8:18-21).", None),
            ("Fariseus pedem sinal; cuidado com o fermento dos fariseus", [837, 838], "Marcos", None, None),
            ("Cura do cego em Betsaida", [839], "Marcos",
             "Cura única de Marcos: feita em duas etapas (visão parcial → visão completa).", None),
            ("Confissão de Pedro em Cesareia de Filipe", [839, 840, 841], "Mateus",
             "Mt traz o famoso 'tu és Pedro, e sobre esta pedra...'.", None),
            ("Primeira predição da paixão; carregar a cruz", [842, 843, 844], "Marcos", None, None),
            ("Transfiguração", [845, 846, 847], "Marcos", None, None),
            ("Cura do menino endemoninhado", [848, 849, 850], "Marcos", None, None),
            ("Segunda predição da paixão", [851, 852, 853], "Marcos", None, None),
            ("Imposto do templo (a moeda na boca do peixe)", [854], "Mateus", None, None),
        ],
    },
    {
        "titulo": "O Caminho a Jerusalém",
        "subtitulo": "Discípulos, samaritanos, parábolas pereanas; Lázaro",
        "cenas": [
            ("Quem é o maior; criança no meio deles", [855, 856, 857], "Marcos", None, None),
            ("'Quem não é contra nós é por nós'", [858, 859], "Marcos", None, None),
            ("Pedras de tropeço; perdão; parábola do servo impiedoso", [860, 861], "fusão", None, None),
            ("Jesus rejeita ir publicamente à Festa dos Tabernáculos", [862], "João", None, None),
            ("Aldeia samaritana inóspita; candidatos a discípulo", [863, 864, 865], "fusão", None, None),
            ("Jesus na Festa dos Tabernáculos; debates no templo", [866, 867], "João",
             "Inclui o episódio da mulher adúltera (Jo 7:53-8:11), de autenticidade textual debatida — "
             "manter com nota.",
             "Mulher adúltera (Jo 7:53-8:11) ausente nos manuscritos mais antigos"),
            ("Envio dos 70 (ou 72); ai das cidades; pais e filhos", [868], "Lucas", None, None),
            ("Bom samaritano; Marta e Maria; ensino sobre oração", [868], "Lucas",
             "Mesma perícope (Lc 10-11) — separar em duas cenas.", None),
            ("Confronto com fariseus; fermento, ganância, ansiedade", [869], "Lucas", None, None),
            ("Vigilância; arrependimento; figueira estéril; cura no sábado", [870], "Lucas", None, None),
            ("Cura do cego de nascença", [871], "João", None, None),
            ("Bom Pastor; Festa da Dedicação", [872], "João", None, None),
            ("Porta estreita; lamento por Jerusalém; banquete", [873], "Lucas", None, None),
            ("Custo do discipulado; ovelha perdida, moeda perdida, filho pródigo", [874], "Lucas",
             "Bloco riquíssimo: 3 parábolas da perda (Lc 15) + administrador infiel + Lázaro e o rico.", None),
            ("Ressurreição de Lázaro", [875, 876], "João", None, None),
            ("Cura dos 10 leprosos; Reino dentro; viúva e juiz; fariseu e cobrador", [877, 878], "Lucas", None, None),
        ],
    },
    {
        "titulo": "Última Subida e Entrada em Jerusalém",
        "subtitulo": "Pereia, Jericó, Betânia, Domingo de Ramos",
        "cenas": [
            ("Ensino sobre o divórcio", [879, 880], "Marcos", None, None),
            ("Jesus abençoa as crianças", [881, 882, 883], "Marcos", None, None),
            ("Jovem rico; recompensa dos que deixam tudo", [884, 885, 886], "Marcos", None, None),
            ("Trabalhadores na vinha (parábola exclusiva de Mateus)", [887], "Mateus", None, None),
            ("Terceira predição da paixão", [888, 889, 890], "Marcos", None, None),
            ("O pedido dos filhos de Zebedeu (e suas mães)", [891, 892], "Marcos",
             "Mc: Tiago e João pedem. Mt: a mãe deles pede. Não se contradizem — pode ter sido a mãe "
             "intercedendo pelos filhos.",
             "Quem pede os assentos: Tiago/João (Mc) ou a mãe (Mt)?"),
            ("Cura de Bartimeu (e o segundo cego em Mt) saindo de Jericó", [893, 894], "Marcos",
             "Mc/Lc: ao SAIR de Jericó; Mt: ao SAIR também, mas dois cegos. "
             "Lc 18:35: ao CHEGAR a Jericó. Tradição: havia Jericó velha e nova; o milagre teria "
             "ocorrido entre as duas.",
             "Jericó velha vs. nova; um cego ou dois"),
            ("Zaqueu e a parábola das minas", [894], "Lucas", None, None),
            ("Unção em Betânia (Maria, irmã de Lázaro)", [895, 896, 897], "João",
             "DIFERENTE da pecadora na Galileia (Lc 7). Mc/Mt põem 2 dias antes da Páscoa; "
             "Jo põe 6 dias antes. Tradição: Mc/Mt fazem flashback narrativo.",
             "Quando exatamente: 6 dias (Jo) ou 2 dias (Mc/Mt) antes da Páscoa"),
            ("Entrada triunfal em Jerusalém (Domingo de Ramos)", [898, 899, 900, 901], "fusão",
             "Único evento nos 4 evangelhos antes da Paixão. Fundir tudo.", None),
            ("Jesus chora sobre Jerusalém", [902], "Lucas", None, None),
            ("Gregos pedem para ver Jesus; voz do céu", [903], "João", None, None),
            ("Reflexão final de João sobre a incredulidade", [904], "João", None, None),
        ],
    },
    {
        "titulo": "A Última Semana no Templo",
        "subtitulo": "Figueira, expulsão dos vendedores, debates e o Discurso das Oliveiras",
        "cenas": [
            ("A figueira amaldiçoada (parte 1)", [905, 906], "Marcos", None, None),
            ("Segunda purificação do templo", [907, 908, 909], "Marcos", None, None),
            ("A figueira seca; lição sobre fé", [910], "Marcos", None, None),
            ("Por que autoridade Jesus faz isso?", [910, 911, 912], "Marcos", None, None),
            ("Parábola dos dois filhos", [913], "Mateus", None, None),
            ("Parábola dos lavradores maus", [914, 915, 916], "Marcos", None, None),
            ("Parábola das bodas reais", [917], "Mateus", None, None),
            ("'Dai a César o que é de César'", [918, 919, 920], "Marcos", None, None),
            ("Saduceus perguntam sobre a ressurreição", [921, 922, 923], "Marcos", None, None),
            ("O maior mandamento", [924, 925], "Marcos", None, None),
            ("Como o Cristo é Filho de Davi?", [926, 927, 928], "Marcos", None, None),
            ("Ais contra os escribas e fariseus", [929, 930, 931, 932], "Mateus",
             "Mt 23 tem a versão mais longa (7 ais). Mc/Lc dão versões resumidas.", None),
            ("A oferta da viúva pobre", [933, 934], "Marcos", None, None),
            ("Discurso do Monte das Oliveiras (parte 1): destruição do templo", [935, 936, 937], "Marcos", None, None),
            ("Discurso (parte 2): vinda do Filho do Homem", [938, 939, 940], "Marcos", None, None),
            ("Discurso (parte 3): vigilância; servo fiel", [941, 942, 943], "Marcos", None, None),
            ("Parábolas do fim: 10 virgens, talentos, juízo final", [944], "Mateus", None, None),
        ],
    },
    {
        "titulo": "Paixão",
        "subtitulo": "Conspiração, Última Ceia, Getsêmani, julgamentos, crucificação",
        "cenas": [
            ("Conspiração para matar Jesus", [945, 946, 947], "Marcos", None, None),
            ("Judas faz o acordo de traição", [948, 949, 950], "Marcos", None, None),
            ("Preparação da Páscoa", [951, 952, 953], "Marcos", None, None),
            ("Lava-pés (só em João)", [954], "João", None, None),
            ("A Última Ceia: instituição da eucaristia", [955, 956, 957], "fusão",
             "Mc/Mt/Lc/1Cor 11 dão fórmulas levemente diferentes. Lc 22:19b-20 está ausente em alguns "
             "manuscritos antigos. Vamos integrar tudo com nota.",
             "Variações na fórmula eucarística entre os relatos"),
            ("Jesus aponta o traidor", [958], "João", None, None),
            ("Novo mandamento; predição da negação de Pedro (parte 1)", [959], "João", None, None),
            ("Predição da negação de Pedro (parte 2)", [960, 961, 962], "Marcos",
             "Os 4 evangelhos predizem a negação, mas em momentos ligeiramente diferentes da ceia. "
             "Tradição: Jesus avisou mais de uma vez.",
             "Momento exato da predição: durante a ceia (Lc/Jo) ou a caminho de Getsêmani (Mc/Mt)"),
            ("Discurso de despedida (parte 1): caminho, verdade, vida; videira", [963], "João", None, None),
            ("Discurso de despedida (parte 2): mundo vai odiar; oração sacerdotal", [964], "João", None, None),
            ("Saída para o Getsêmani", [965], "João", None, None),
            ("Agonia no Getsêmani", [966, 967, 968], "Marcos",
             "Só Lucas fala do anjo fortalecendo Jesus e do suor como gotas de sangue (Lc 22:43-44, "
             "ausente em alguns manuscritos antigos).",
             "Lc 22:43-44 (anjo fortalecendo, suor de sangue) ausente em manuscritos antigos"),
            ("Prisão de Jesus", [969, 970, 971, 972], "fusão",
             "Só João nomeia Pedro como o que cortou a orelha de Malco; só Lucas conta a cura.", None),
            ("Julgamento perante o Sinédrio (à noite)", [973, 974], "Marcos", None, None),
            ("Negações de Pedro", [975, 976, 977, 978], "fusão",
             "Os 4 contam, mas com variações nas pessoas que perguntam e na ordem. "
             "Tradição harmonizadora: foram 3 negações em sequência rápida, com perguntas vindas de "
             "várias pessoas — cada evangelho lembra de detalhes diferentes.",
             "Quem fez cada uma das 3 perguntas a Pedro varia entre os 4 evangelhos"),
            ("Julgamento matinal do Sinédrio", [979, 980, 981], "Marcos", None, None),
            ("Morte de Judas", [982], "Mateus",
             "Mt: Judas se enforca e os sacerdotes compram o campo. At 1:18-19: Judas cai e se rebenta. "
             "Tradição: ambas — enforcou-se e o corpo caiu depois.",
             "Mt vs. At sobre a morte de Judas"),
            ("Diante de Pilatos (1ª vez)", [983, 984, 985, 986], "fusão", None, None),
            ("Diante de Herodes (só em Lucas)", [985], "Lucas", None, None),
            ("Pilatos cede; Barrabás solto", [987, 988, 989, 990], "fusão", None, None),
            ("Açoite e zombaria", [991, 992], "Marcos", None, None),
            ("Caminho do Calvário; Simão Cireneu; mulheres de Jerusalém", [993, 994, 995, 996], "fusão", None, None),
            ("Crucificação; sorteio das vestes; bom ladrão; 'Eis tua mãe'", [997, 998, 999, 1000], "fusão",
             "Só Lc tem o bom ladrão e o 'Pai, perdoa-lhes'. Só Jo tem 'Eis tua mãe' e Maria ao pé "
             "da cruz. Mc/Mt registram só o 'Eli, Eli...'. Vamos integrar todas as 7 palavras.",
             "As 7 palavras de Jesus na cruz vêm distribuídas entre os 4 evangelhos"),
            ("Morte de Jesus; trevas; véu rasgado; centurião confessa", [1001, 1002, 1003, 1004], "fusão", None, None),
            ("Sepultamento por José de Arimateia", [1005, 1006, 1007, 1008], "fusão", None, None),
            ("Guarda no túmulo (só em Mateus)", [1009], "Mateus", None, None),
        ],
    },
    {
        "titulo": "Ressurreição e Ascensão",
        "subtitulo": "O túmulo vazio, aparições, comissão, subida ao céu",
        "cenas": [
            ("As mulheres encontram o túmulo vazio", [1010, 1011, 1012], "fusão",
             "Cada evangelho lista MULHERES e ANJOS de forma um pouco diferente: "
             "Mc fala de 1 jovem; Mt 1 anjo; Lc 2 homens; Jo 2 anjos. "
             "Tradição: havia mais de um anjo, e cada evangelho menciona quem foi mais relevante.",
             "Quantos anjos no túmulo, quais mulheres foram, em que ordem"),
            ("Maria Madalena vê Jesus; guardas subornados", [1013, 1014, 1015], "fusão",
             "Jo 20:1-18 dá o detalhe mais íntimo (\"Não me detenhas\"). "
             "O final 'longo' de Marcos (16:9-20) está ausente em manuscritos antigos.",
             "Mc 16:9-20 ausente em manuscritos antigos"),
            ("Caminho de Emaús", [1016, 1017], "Lucas", None, None),
            ("Aparição aos discípulos (sem Tomé)", [1018, 1019], "João", None, None),
            ("Tomé vê Jesus; aparição no mar da Galileia (Tibérias)", [1020], "João", None, None),
            ("Grande Comissão na Galileia", [1021, 1022], "Mateus", None, None),
            ("Jesus abre o entendimento das Escrituras", [1023], "Lucas", None, None),
            ("Ascensão", [1024, 1025], "Lucas",
             "Atos 1 dá a versão mais detalhada (40 dias, nuvem, anjos).", None),
        ],
    },
]


def main():
    with open(INPUT, encoding="utf-8") as f:
        cron = json.load(f)

    pericopes_by_idx = {p["idx"]: p for p in cron["pericopes"]}

    capitulos_out = []
    cena_id = 0
    total_pericopes_usadas = set()

    for cap_num, cap in enumerate(CAPITULOS, 1):
        cenas_out = []
        for titulo, idxs, base, nota, conflito in cap["cenas"]:
            cena_id += 1
            fontes = []
            for idx in idxs:
                if idx not in pericopes_by_idx:
                    print(f"⚠ idx {idx} não existe no cronologica-pericopes.json")
                    continue
                p = pericopes_by_idx[idx]
                fontes.append({
                    "evangelho": p["livro_pt"],
                    "ref": p["ref_pt"].replace(p["livro_pt"] + " ", ""),
                    "ref_completa": p["ref_pt"],
                    "idx_origem": idx,
                })
                total_pericopes_usadas.add(idx)
            cena = {
                "id": cena_id,
                "titulo": titulo,
                "fontes": fontes,
                "base": base,
            }
            if nota:
                cena["nota_editorial"] = nota
            if conflito:
                cena["conflito_aparente"] = conflito
            cenas_out.append(cena)

        capitulos_out.append({
            "num": cap_num,
            "titulo": cap["titulo"],
            "subtitulo": cap["subtitulo"],
            "total_cenas": len(cenas_out),
            "cenas": cenas_out,
        })

    # Sanity check: quais perícopes do khornberg ficaram de fora?
    todas_idxs = {p["idx"] for p in cron["pericopes"]
                  if p["livro_pt"] in ("Mateus", "Marcos", "Lucas", "João")}
    nao_usadas = sorted(todas_idxs - total_pericopes_usadas)

    out = {
        "meta": {
            "fonte_ordenacao": "khornberg/readingplans → oneyearchronological.json",
            "fonte_harmonizacao": "A.T. Robertson, Harmony of the Gospels (1922, domínio público)",
            "esquema": "Os 4 evangelhos fundidos em uma única narrativa cronológica",
            "total_capitulos": len(capitulos_out),
            "total_cenas": cena_id,
            "total_pericopes_khornberg": len(todas_idxs),
            "pericopes_usadas": len(total_pericopes_usadas),
            "pericopes_nao_mapeadas": nao_usadas,
            "conflitos_aparentes_sinalizados": sum(
                1 for cap in capitulos_out for c in cap["cenas"]
                if "conflito_aparente" in c
            ),
        },
        "capitulos": capitulos_out,
    }

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    print(f"✓ Gerado: {OUTPUT}")
    print(f"  Capítulos:        {len(capitulos_out)}")
    print(f"  Cenas:            {cena_id}")
    print(f"  Perícopes usadas: {len(total_pericopes_usadas)} / {len(todas_idxs)}")
    print(f"  Conflitos:        {out['meta']['conflitos_aparentes_sinalizados']}")
    if nao_usadas:
        print(f"  ⚠ Não mapeadas:    {nao_usadas}")


if __name__ == "__main__":
    main()
