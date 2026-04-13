import Link from 'next/link';
import { LANGUAGES, type Language } from '@/lib/bible-data';
import DarkModeToggle from '@/components/DarkModeToggle';

export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

const content: Record<Language, {
  title: string;
  subtitle: string;
  backLink: string;
  aboutLink: string;
  sections: { title: string; body: string }[];
}> = {
  pt: {
    title: 'Metodologia',
    subtitle: 'Como a IA cria cada paráfrase — passo a passo, com total transparência.',
    backLink: 'Voltar',
    aboutLink: 'Sobre o projeto',
    sections: [
      {
        title: '1. Este projeto é inteiramente feito por IA',
        body: 'Não existe um tradutor humano por trás de cada versículo. Todo o trabalho de paráfrase é feito por uma inteligência artificial — especificamente o Claude (modelo Opus), da Anthropic, o modelo de linguagem mais avançado disponível atualmente.\n\nIsso significa que este projeto tem as forças e as limitações da IA: ela tem acesso ao texto original grego e hebraico, conhece as ferramentas de análise linguística e pode ser muito consistente e transparente no processo. Mas não é um teólogo, não tem vivência de fé e não substitui a tradição de séculos de exegese bíblica.\n\nPor isso, a transparência é o coração do projeto. Cada decisão é documentada. Você pode concordar ou discordar — e contribuir.',
      },
      {
        title: '2. Fonte: os textos originais',
        body: 'A paráfrase parte sempre dos textos originais, nunca de traduções existentes:\n\n• Novo Testamento: texto grego do UGNT (Unfoldingword Greek New Testament), baseado na tradição textual do Textus Receptus e nos manuscritos mais antigos\n• Antigo Testamento: texto hebraico do UHB (Unfoldingword Hebrew Bible), baseado no Texto Massorético\n\nEsses textos estão disponíveis localmente no projeto através de um servidor MCP (Model Context Protocol) que permite à IA consultar diretamente o interlinear grego/hebraico — palavra por palavra, com morfologia, lemas e números Strong.',
      },
      {
        title: '3. Ferramentas que a IA usa',
        body: 'A IA tem acesso a um conjunto de ferramentas especializadas durante o trabalho:\n\n• get_interlinear — mostra o texto original palavra por palavra, com a tradução literal, o lema (forma de dicionário), a classificação gramatical (morfologia) e o número Strong de cada termo\n• get_lexicon — consulta o léxico grego ou hebraico para ver definições completas, usos e nuances de um termo específico\n• get_morphology — análise gramatical detalhada (tempo verbal, voz, modo, caso, número, gênero)\n• get_verse — texto do versículo em diferentes versões pra referência\n\nEssas ferramentas são consultadas durante a paráfrase de cada capítulo. A IA não trabalha "de memória" — ela verifica o original.',
      },
      {
        title: '4. O processo passo a passo',
        body: 'Para cada capítulo, o processo é:\n\n1. Consultar o interlinear completo — a IA lê todo o texto grego/hebraico do capítulo, palavra por palavra, antes de começar\n\n2. Identificar termos-chave — palavras que carregam peso teológico, ambiguidades, jogos de palavras ou distinções importantes (como agape vs. phileo, logos vs. rhema)\n\n3. Consultar o léxico — para termos complexos, a IA consulta o significado completo no léxico grego ou hebraico\n\n4. Parafrasear mantendo a voz do autor — cada autor bíblico tem um estilo próprio. Marcos é direto e urgente. Lucas é literário e detalhista. Paulo é denso e argumentativo. João é poético e profundo. A paráfrase tenta preservar essa personalidade\n\n5. Escrever notas detalhadas — para cada escolha significativa, a IA documenta: qual era o termo original, o que ele significa, por que a paráfrase escolheu determinada expressão, e quais alternativas existiam\n\n6. Seguir o estilo dos capítulos já feitos — a IA lê os capítulos anteriores do mesmo livro pra manter consistência de tom e vocabulário',
      },
      {
        title: '5. Princípios que guiam as escolhas',
        body: 'A paráfrase segue regras claras:\n\n• Trabalhar SEMPRE a partir do original — nunca copiar ou adaptar traduções existentes\n• Linguagem do dia a dia — como se estivesse contando pra um amigo, sem ser vulgar\n• Preservar distinções do original — quando o grego/hebraico usa termos diferentes, a paráfrase também diferencia. Se Paulo escreveu "Cefas", mantemos "Cefas" (com nota). Se escreveu "Pedro", mantemos "Pedro"\n• Neutralidade teológica — sem interpretação denominacional. Se um versículo é debatido, a nota explica as opções\n• Preservar ambiguidades intencionais — quando o texto original é propositalmente ambíguo, não resolvemos a ambiguidade; documentamos\n• Notas ricas — com termos gregos/hebraicos transliterados, explicações acessíveis e referências cruzadas',
      },
      {
        title: '6. Exemplo concreto: como nasce um versículo',
        body: 'Veja o processo real para João 11:35 — "Jesus chorou":\n\n1. O interlinear mostra: Ἰησοῦς (Iēsous = Jesus) + ἐδάκρυσεν (edakrysen)\n\n2. A IA consulta o léxico: edakrysen vem de dakryō (δακρύω), que significa "derramar lágrimas silenciosas". É diferente de klaiō (κλαίω), "chorar alto, lamentar" — que é o verbo usado pra Maria e os judeus no v.33\n\n3. Essa distinção é significativa: Jesus não soluça ruidosamente como os outros. Suas lágrimas são contidas, profundas, silenciosas\n\n4. A paráfrase mantém simples: "Jesus chorou" — porque o original também é o versículo mais curto da Bíblia, e a brevidade é parte do impacto\n\n5. A nota explica a distinção: o verbo dakryō indica lágrimas silenciosas, contrastando com o choro alto dos outros presentes\n\nEsse nível de detalhe está disponível em cada capítulo, nas notas ao final.',
      },
      {
        title: '7. Exemplo concreto: uma escolha difícil',
        body: 'Em João 6:54, Jesus diz que é preciso "comer" sua carne. Mas a partir deste versículo, o grego muda o verbo de esthiō (ἐσθίω, "comer" normalmente) para trōgō (τρώγω), que é mais visceral — significa "mastigar, roer, morder".\n\nA pergunta pra IA: como traduzir essa intensificação?\n\n• Opção 1: Usar "comer" pros dois verbos (perde a distinção)\n• Opção 2: Usar "mastigar/roer" (pode soar estranho em português)\n• Opção 3: Usar "se alimentar" pra marcar a diferença, e explicar na nota\n\nA paráfrase escolheu a opção 3 — um meio-termo que marca a mudança sem chocar o leitor, enquanto a nota explica que o grego é ainda mais forte.\n\nEsse tipo de decisão está documentado em todas as notas do projeto.',
      },
      {
        title: '8. O que a IA faz bem e onde ela tem limitações',
        body: 'Forças da IA neste projeto:\n• Consistência — aplica as mesmas regras em todos os capítulos\n• Transparência — documenta cada decisão sem "esquecer"\n• Acesso ao original — consulta o grego/hebraico diretamente, sem intermediários\n• Velocidade — pode produzir paráfrases detalhadas com notas em minutos\n• Multilíngue — trabalha em 3 idiomas mantendo coerência\n\nLimitações reais:\n• Não tem vivência de fé — não sabe o que é orar, adorar ou sofrer\n• Pode errar — especialmente em textos poéticos ou altamente ambíguos\n• Depende dos dados de treinamento — seu conhecimento de teologia reflete o que foi publicado até 2025\n• Não substitui a comunidade — a Bíblia foi escrita pra ser lida em comunidade, e este projeto precisa de olhos humanos\n\nPor isso o projeto é aberto: pra que pessoas com vivência de fé, conhecimento teológico e sensibilidade literária possam contribuir.',
      },
      {
        title: '9. Como verificar o trabalho',
        body: 'Você pode conferir qualquer decisão da IA:\n\n1. Leia as notas ao final de cada capítulo — elas explicam as escolhas principais\n2. Consulte o texto grego/hebraico — ferramentas gratuitas como BlueLetterBible.org ou Biblehub.com permitem ver o interlinear\n3. Compare os termos citados nas notas — a IA sempre inclui a palavra grega/hebraica transliterada e o significado\n4. Abra uma issue no GitHub se encontrar algo errado ou discutível\n\nEste projeto existe pra que pessoas possam fazer exatamente isso: comentar sobre a tradução sabendo que foi feita por uma IA, verificar as escolhas e contribuir com melhorias.',
      },
      {
        title: '10. Tecnologia usada',
        body: 'O stack técnico do projeto:\n\n• IA: Claude Opus (Anthropic) via Claude Code CLI — o modelo de linguagem mais avançado, com contexto de 1 milhão de tokens\n• Textos originais: UGNT (grego NT) e UHB (hebraico AT) via servidor MCP local\n• Léxicos: Léxico grego (6.300+ entradas) e hebraico (8.200+ entradas) integrados ao MCP\n• Site: Next.js 14 com geração estática, hospedado na Vercel\n• Código: Todo aberto no GitHub sob licença CC0\n• Formato dos textos: Markdown com formatação padronizada\n\nO código, os textos e todo o histórico de criação estão disponíveis em: github.com/Nardoto/biblia-ai-traducao',
      },
    ],
  },
  en: {
    title: 'Methodology',
    subtitle: 'How the AI creates each paraphrase — step by step, with full transparency.',
    backLink: 'Back',
    aboutLink: 'About the project',
    sections: [
      {
        title: '1. This project is entirely made by AI',
        body: 'There is no human translator behind each verse. All paraphrase work is done by an artificial intelligence — specifically Claude (Opus model) by Anthropic, the most advanced language model currently available.\n\nThis means the project has both the strengths and limitations of AI: it has access to the original Greek and Hebrew text, knows linguistic analysis tools, and can be very consistent and transparent in the process. But it is not a theologian, has no lived faith experience, and does not replace centuries of biblical exegesis.\n\nThat\'s why transparency is the heart of the project. Every decision is documented. You can agree or disagree — and contribute.',
      },
      {
        title: '2. Source: the original texts',
        body: 'The paraphrase always starts from the original texts, never from existing translations:\n\n• New Testament: Greek text from UGNT (Unfoldingword Greek New Testament), based on the Textus Receptus tradition and earliest manuscripts\n• Old Testament: Hebrew text from UHB (Unfoldingword Hebrew Bible), based on the Masoretic Text\n\nThese texts are available locally in the project through an MCP (Model Context Protocol) server that allows the AI to directly consult the Greek/Hebrew interlinear — word by word, with morphology, lemmas, and Strong\'s numbers.',
      },
      {
        title: '3. Tools the AI uses',
        body: 'The AI has access to specialized tools during its work:\n\n• get_interlinear — shows the original text word by word, with literal translation, lemma (dictionary form), grammatical classification (morphology), and Strong\'s number\n• get_lexicon — consults the Greek or Hebrew lexicon for complete definitions, uses, and nuances of a specific term\n• get_morphology — detailed grammatical analysis (tense, voice, mood, case, number, gender)\n• get_verse — verse text in different versions for reference\n\nThese tools are consulted during the paraphrase of each chapter. The AI does not work "from memory" — it verifies the original.',
      },
      {
        title: '4. The step-by-step process',
        body: 'For each chapter, the process is:\n\n1. Consult the complete interlinear — the AI reads the entire Greek/Hebrew text word by word before starting\n\n2. Identify key terms — words carrying theological weight, ambiguities, wordplay, or important distinctions (like agape vs. phileo, logos vs. rhema)\n\n3. Consult the lexicon — for complex terms, the AI checks the full meaning in the Greek or Hebrew lexicon\n\n4. Paraphrase while preserving the author\'s voice — each biblical author has their own style. Mark is direct and urgent. Luke is literary and detailed. Paul is dense and argumentative. John is poetic and profound. The paraphrase tries to preserve that personality\n\n5. Write detailed notes — for each significant choice, the AI documents: what the original term was, what it means, why the paraphrase chose a particular expression, and what alternatives existed\n\n6. Follow the style of previously completed chapters — the AI reads earlier chapters of the same book to maintain consistency in tone and vocabulary',
      },
      {
        title: '5. Principles guiding the choices',
        body: 'The paraphrase follows clear rules:\n\n• ALWAYS work from the original — never copy or adapt existing translations\n• Everyday language — as if telling it to a friend, without being vulgar\n• Preserve distinctions in the original — when Greek/Hebrew uses different terms, the paraphrase also differentiates. If Paul wrote "Cephas," we keep "Cephas" (with a note). If he wrote "Peter," we keep "Peter"\n• Theological neutrality — no denominational interpretation. If a verse is debated, the note explains the options\n• Preserve intentional ambiguities — when the original is purposely ambiguous, we don\'t resolve the ambiguity; we document it\n• Rich notes — with transliterated Greek/Hebrew terms, accessible explanations, and cross-references',
      },
      {
        title: '6. Concrete example: how a verse is born',
        body: 'See the actual process for John 11:35 — "Jesus wept":\n\n1. The interlinear shows: Ἰησοῦς (Iēsous = Jesus) + ἐδάκρυσεν (edakrysen)\n\n2. The AI consults the lexicon: edakrysen comes from dakryō (δακρύω), meaning "to shed silent tears." This is different from klaiō (κλαίω), "to weep aloud, lament" — which is the verb used for Mary and the Jews in v.33\n\n3. This distinction matters: Jesus doesn\'t sob loudly like the others. His tears are restrained, deep, silent\n\n4. The paraphrase keeps it simple: "Jesus wept" — because the original is also the shortest verse in the Bible, and brevity is part of the impact\n\n5. The note explains the distinction: the verb dakryō indicates silent tears, contrasting with the loud weeping of others present\n\nThis level of detail is available in every chapter, in the notes at the end.',
      },
      {
        title: '7. Concrete example: a difficult choice',
        body: 'In John 6:54, Jesus says one must "eat" his flesh. But from this verse onward, the Greek switches the verb from esthiō (ἐσθίω, "to eat" normally) to trōgō (τρώγω), which is more visceral — it means "to munch, gnaw, chew."\n\nThe question for the AI: how to translate this intensification?\n\n• Option 1: Use "eat" for both verbs (loses the distinction)\n• Option 2: Use "munch/gnaw" (may sound strange in English)\n• Option 3: Use "feed on" to mark the difference, and explain in the note\n\nThe paraphrase chose option 3 — a middle ground that marks the change without shocking the reader, while the note explains that the Greek is even stronger.\n\nThis kind of decision is documented in all project notes.',
      },
      {
        title: '8. What the AI does well and where it has limitations',
        body: 'AI strengths in this project:\n• Consistency — applies the same rules across all chapters\n• Transparency — documents every decision without "forgetting"\n• Access to the original — consults Greek/Hebrew directly, without intermediaries\n• Speed — can produce detailed paraphrases with notes in minutes\n• Multilingual — works in 3 languages maintaining coherence\n\nReal limitations:\n• No lived faith experience — doesn\'t know what it\'s like to pray, worship, or suffer\n• Can make mistakes — especially in poetic or highly ambiguous texts\n• Depends on training data — its theology knowledge reflects what was published until 2025\n• Doesn\'t replace community — the Bible was written to be read in community, and this project needs human eyes\n\nThat\'s why the project is open: so people with faith experience, theological knowledge, and literary sensitivity can contribute.',
      },
      {
        title: '9. How to verify the work',
        body: 'You can check any AI decision:\n\n1. Read the notes at the end of each chapter — they explain the main choices\n2. Consult the Greek/Hebrew text — free tools like BlueLetterBible.org or Biblehub.com let you see the interlinear\n3. Compare the terms cited in the notes — the AI always includes the transliterated Greek/Hebrew word and its meaning\n4. Open an issue on GitHub if you find something wrong or debatable\n\nThis project exists so people can do exactly this: comment on the translation knowing it was made by an AI, verify the choices, and contribute improvements.',
      },
      {
        title: '10. Technology used',
        body: 'The project\'s tech stack:\n\n• AI: Claude Opus (Anthropic) via Claude Code CLI — the most advanced language model, with 1 million token context\n• Original texts: UGNT (Greek NT) and UHB (Hebrew OT) via local MCP server\n• Lexicons: Greek lexicon (6,300+ entries) and Hebrew lexicon (8,200+ entries) integrated with MCP\n• Website: Next.js 14 with static generation, hosted on Vercel\n• Code: Fully open on GitHub under CC0 license\n• Text format: Markdown with standardized formatting\n\nThe code, texts, and entire creation history are available at: github.com/Nardoto/biblia-ai-traducao',
      },
    ],
  },
  es: {
    title: 'Metodología',
    subtitle: 'Cómo la IA crea cada paráfrasis — paso a paso, con total transparencia.',
    backLink: 'Volver',
    aboutLink: 'Acerca del proyecto',
    sections: [
      {
        title: '1. Este proyecto es enteramente hecho por IA',
        body: 'No hay un traductor humano detrás de cada versículo. Todo el trabajo de paráfrasis es hecho por una inteligencia artificial — específicamente Claude (modelo Opus) de Anthropic, el modelo de lenguaje más avanzado disponible actualmente.\n\nEsto significa que el proyecto tiene las fortalezas y limitaciones de la IA: tiene acceso al texto original griego y hebreo, conoce herramientas de análisis lingüístico y puede ser muy consistente y transparente en el proceso. Pero no es un teólogo, no tiene vivencia de fe y no sustituye siglos de exégesis bíblica.\n\nPor eso la transparencia es el corazón del proyecto. Cada decisión está documentada. Puedes estar de acuerdo o en desacuerdo — y contribuir.',
      },
      {
        title: '2. Fuente: los textos originales',
        body: 'La paráfrasis parte siempre de los textos originales, nunca de traducciones existentes:\n\n• Nuevo Testamento: texto griego del UGNT (Unfoldingword Greek New Testament), basado en la tradición textual del Textus Receptus y los manuscritos más antiguos\n• Antiguo Testamento: texto hebreo del UHB (Unfoldingword Hebrew Bible), basado en el Texto Masorético\n\nEstos textos están disponibles localmente en el proyecto a través de un servidor MCP (Model Context Protocol) que permite a la IA consultar directamente el interlineal griego/hebreo — palabra por palabra, con morfología, lemas y números Strong.',
      },
      {
        title: '3. Herramientas que la IA usa',
        body: 'La IA tiene acceso a herramientas especializadas durante su trabajo:\n\n• get_interlinear — muestra el texto original palabra por palabra, con traducción literal, lema (forma de diccionario), clasificación gramatical (morfología) y número Strong\n• get_lexicon — consulta el léxico griego o hebreo para ver definiciones completas, usos y matices de un término específico\n• get_morphology — análisis gramatical detallado (tiempo verbal, voz, modo, caso, número, género)\n• get_verse — texto del versículo en diferentes versiones como referencia\n\nEstas herramientas se consultan durante la paráfrasis de cada capítulo. La IA no trabaja "de memoria" — verifica el original.',
      },
      {
        title: '4. El proceso paso a paso',
        body: 'Para cada capítulo, el proceso es:\n\n1. Consultar el interlineal completo — la IA lee todo el texto griego/hebreo del capítulo, palabra por palabra, antes de comenzar\n\n2. Identificar términos clave — palabras con peso teológico, ambigüedades, juegos de palabras o distinciones importantes (como agape vs. phileo, logos vs. rhema)\n\n3. Consultar el léxico — para términos complejos, la IA consulta el significado completo en el léxico griego o hebreo\n\n4. Parafrasear preservando la voz del autor — cada autor bíblico tiene su propio estilo. Marcos es directo y urgente. Lucas es literario y detallista. Pablo es denso y argumentativo. Juan es poético y profundo. La paráfrasis intenta preservar esa personalidad\n\n5. Escribir notas detalladas — para cada elección significativa, la IA documenta: cuál era el término original, qué significa, por qué la paráfrasis eligió determinada expresión, y qué alternativas existían\n\n6. Seguir el estilo de los capítulos anteriores — la IA lee los capítulos previos del mismo libro para mantener consistencia de tono y vocabulario',
      },
      {
        title: '5. Principios que guían las decisiones',
        body: 'La paráfrasis sigue reglas claras:\n\n• Trabajar SIEMPRE desde el original — nunca copiar o adaptar traducciones existentes\n• Lenguaje cotidiano — como si se lo estuvieras contando a un amigo, sin ser vulgar\n• Preservar distinciones del original — cuando el griego/hebreo usa términos diferentes, la paráfrasis también diferencia. Si Pablo escribió "Cefas", mantenemos "Cefas" (con nota). Si escribió "Pedro", mantenemos "Pedro"\n• Neutralidad teológica — sin interpretación denominacional. Si un versículo es debatido, la nota explica las opciones\n• Preservar ambigüedades intencionales — cuando el texto original es intencionalmente ambiguo, no resolvemos la ambigüedad; la documentamos\n• Notas ricas — con términos griegos/hebreos transliterados, explicaciones accesibles y referencias cruzadas',
      },
      {
        title: '6. Ejemplo concreto: cómo nace un versículo',
        body: 'Vea el proceso real para Juan 11:35 — "Jesús lloró":\n\n1. El interlineal muestra: Ἰησοῦς (Iēsous = Jesús) + ἐδάκρυσεν (edakrysen)\n\n2. La IA consulta el léxico: edakrysen viene de dakryō (δακρύω), que significa "derramar lágrimas silenciosas". Es diferente de klaiō (κλαίω), "llorar en voz alta, lamentar" — que es el verbo usado para María y los judíos en el v.33\n\n3. Esta distinción importa: Jesús no solloza ruidosamente como los demás. Sus lágrimas son contenidas, profundas, silenciosas\n\n4. La paráfrasis lo mantiene simple: "Jesús lloró" — porque el original también es el versículo más corto de la Biblia, y la brevedad es parte del impacto\n\n5. La nota explica la distinción: el verbo dakryō indica lágrimas silenciosas, contrastando con el llanto fuerte de los demás presentes\n\nEste nivel de detalle está disponible en cada capítulo, en las notas al final.',
      },
      {
        title: '7. Ejemplo concreto: una decisión difícil',
        body: 'En Juan 6:54, Jesús dice que es necesario "comer" su carne. Pero a partir de este versículo, el griego cambia el verbo de esthiō (ἐσθίω, "comer" normalmente) a trōgō (τρώγω), que es más visceral — significa "masticar, roer, morder".\n\nLa pregunta para la IA: ¿cómo traducir esta intensificación?\n\n• Opción 1: Usar "comer" para ambos verbos (pierde la distinción)\n• Opción 2: Usar "masticar/roer" (puede sonar extraño en español)\n• Opción 3: Usar "alimentarse" para marcar la diferencia, y explicar en la nota\n\nLa paráfrasis eligió la opción 3 — un punto medio que marca el cambio sin impactar al lector, mientras la nota explica que el griego es aún más fuerte.\n\nEste tipo de decisión está documentado en todas las notas del proyecto.',
      },
      {
        title: '8. Lo que la IA hace bien y dónde tiene limitaciones',
        body: 'Fortalezas de la IA en este proyecto:\n• Consistencia — aplica las mismas reglas en todos los capítulos\n• Transparencia — documenta cada decisión sin "olvidar"\n• Acceso al original — consulta el griego/hebreo directamente, sin intermediarios\n• Velocidad — puede producir paráfrasis detalladas con notas en minutos\n• Multilingüe — trabaja en 3 idiomas manteniendo coherencia\n\nLimitaciones reales:\n• No tiene vivencia de fe — no sabe lo que es orar, adorar o sufrir\n• Puede equivocarse — especialmente en textos poéticos o altamente ambiguos\n• Depende de los datos de entrenamiento — su conocimiento teológico refleja lo publicado hasta 2025\n• No sustituye a la comunidad — la Biblia fue escrita para ser leída en comunidad, y este proyecto necesita ojos humanos\n\nPor eso el proyecto es abierto: para que personas con vivencia de fe, conocimiento teológico y sensibilidad literaria puedan contribuir.',
      },
      {
        title: '9. Cómo verificar el trabajo',
        body: 'Puedes verificar cualquier decisión de la IA:\n\n1. Lee las notas al final de cada capítulo — explican las decisiones principales\n2. Consulta el texto griego/hebreo — herramientas gratuitas como BlueLetterBible.org o Biblehub.com permiten ver el interlineal\n3. Compara los términos citados en las notas — la IA siempre incluye la palabra griega/hebrea transliterada y su significado\n4. Abre un issue en GitHub si encuentras algo incorrecto o discutible\n\nEste proyecto existe para que las personas puedan hacer exactamente eso: comentar sobre la traducción sabiendo que fue hecha por una IA, verificar las decisiones y contribuir con mejoras.',
      },
      {
        title: '10. Tecnología utilizada',
        body: 'El stack técnico del proyecto:\n\n• IA: Claude Opus (Anthropic) vía Claude Code CLI — el modelo de lenguaje más avanzado, con contexto de 1 millón de tokens\n• Textos originales: UGNT (griego NT) y UHB (hebreo AT) vía servidor MCP local\n• Léxicos: Léxico griego (6.300+ entradas) y hebreo (8.200+ entradas) integrados con MCP\n• Sitio web: Next.js 14 con generación estática, alojado en Vercel\n• Código: Completamente abierto en GitHub bajo licencia CC0\n• Formato de textos: Markdown con formato estandarizado\n\nEl código, los textos y todo el historial de creación están disponibles en: github.com/Nardoto/biblia-ai-traducao',
      },
    ],
  },
};

export default function MetodologiaPage({ params }: { params: { lang: Language } }) {
  const lang = params.lang;
  const t = content[lang];

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <Link href={`/${lang}/`} className="text-sm font-sans text-[var(--muted)] hover:text-[var(--accent)] transition">
          ← {t.backLink}
        </Link>
        <DarkModeToggle />
      </div>

      <h1 className="text-2xl font-bold font-serif mb-1">{t.title}</h1>
      <p className="text-[var(--muted)] mb-10 text-sm">{t.subtitle}</p>

      {t.sections.map((section, i) => (
        <section key={i} className="mb-10">
          <h2 className="text-lg font-bold font-serif mb-3">{section.title}</h2>
          {section.body.split('\n\n').map((p, j) => (
            <p key={j} className="mb-4 leading-relaxed whitespace-pre-line">{p}</p>
          ))}
        </section>
      ))}

      <div className="border-t border-[var(--border)] pt-6 mt-10">
        <Link
          href={`/${lang}/sobre/`}
          className="inline-block px-5 py-2.5 rounded-lg bg-[var(--accent)] text-white font-sans text-sm font-medium hover:opacity-90 transition"
        >
          {t.aboutLink} →
        </Link>
      </div>
    </div>
  );
}
