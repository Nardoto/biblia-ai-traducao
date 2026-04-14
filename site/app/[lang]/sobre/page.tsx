import Link from 'next/link';
import { LANGUAGES, type Language } from '@/lib/bible-data';
import DarkModeToggle from '@/components/DarkModeToggle';
import Logo from '@/components/Logo';

export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

const content: Record<Language, {
  title: string;
  subtitle: string;
  whatIs: { title: string; body: string };
  vision: { title: string; body: string };
  who: { title: string; body: string };
  why: { title: string; items: string[] };
  license: { title: string; body: string };
  contribute: { title: string; body: string };
  roadmap: { title: string; items: string[] };
  regional: { title: string; body: string };
  methodLink: string;
  backLink: string;
}> = {
  pt: {
    title: 'Sobre a Bíblia Livre AI',
    subtitle: 'Um experimento aberto de paráfrase bíblica feita inteiramente por inteligência artificial.',
    whatIs: {
      title: 'O que é este projeto?',
      body: 'A Bíblia Livre AI é uma paráfrase da Bíblia criada inteiramente por inteligência artificial, a partir dos textos originais em grego (Novo Testamento) e hebraico (Antigo Testamento). Não é uma tradução palavra por palavra nem uma cópia de traduções existentes — é uma obra original que busca transmitir o significado e a emoção do texto bíblico em linguagem acessível e contemporânea.\n\nO projeto é um experimento de transparência radical: todo o processo de criação é documentado, aberto e verificável. Cada capítulo inclui notas detalhadas sobre as escolhas feitas, os termos originais consultados e o raciocínio por trás de cada decisão. Qualquer pessoa pode conferir, criticar, sugerir melhorias ou usar o texto livremente.',
    },
    vision: {
      title: 'Visão do Projeto',
      body: 'A Bíblia Livre AI é mais do que uma paráfrase — é um projeto comunitário e aberto que convida qualquer pessoa a participar. Nossa visão é criar a paráfrase bíblica mais acessível, transparente e verificável do mundo, em múltiplos idiomas, sob licença CC0 (domínio público).\n\nCada capítulo vem acompanhado de notas acadêmicas expandidas — com análise linguística do grego e hebraico, contexto histórico-cultural, crítica textual com evidência de manuscritos, debates teológicos contemporâneos e referências cruzadas. Além disso, a "Cadeia de Pensamento" documenta o raciocínio completo por trás de cada decisão de tradução.\n\nO objetivo é que qualquer pessoa — do leitor casual ao estudante de teologia — possa não apenas ler a Bíblia, mas entender por que cada palavra foi escolhida e verificar as fontes por conta própria.',
    },
    who: {
      title: 'Quem está por trás?',
      body: 'O projeto foi iniciado por Nardoto — batista desde criança, nascido e criado na igreja, hoje casado e pai de uma filha de 4 anos.\n\nA motivação veio de um desejo pessoal e prático: ter um texto bíblico em linguagem clara o suficiente pra ler pra sua filha, e que pudesse ser usado livremente em projetos como vídeos no YouTube sem preocupações com direitos autorais.\n\nNardoto não é teólogo (ainda — pretende fazer teologia), mas é quem supervisiona e verifica como o projeto está sendo feito. A IA faz a paráfrase; Nardoto garante que o processo seja honesto e o resultado, fiel.\n\nA inteligência artificial usada é o Claude (modelo Opus), da Anthropic — o modelo mais avançado disponível. Nardoto paga a assinatura mais cara do Claude Code para tocar este projeto, por vontade genuína de criar algo útil para as pessoas.',
    },
    why: {
      title: 'Por que este projeto existe?',
      items: [
        'Para ter um texto bíblico em linguagem realmente acessível, como se alguém estivesse contando pra você pessoalmente',
        'Para ser de uso completamente livre — em apps, vídeos, estudos, pregações, sem precisar pedir permissão',
        'Para ser transparente — você sabe exatamente como cada versículo foi parafraseado e pode verificar',
        'Para ser um projeto aberto a contribuições de qualquer pessoa',
        'Para explorar o potencial da IA em servir a comunidade de fé com honestidade e responsabilidade',
      ],
    },
    license: {
      title: 'Licença e uso',
      body: 'Todo o conteúdo está sob licença CC0 (domínio público). Isso significa que você pode:\n\n• Usar em qualquer projeto pessoal ou comercial\n• Copiar, modificar e distribuir livremente\n• Usar em aplicativos, vídeos, podcasts, materiais impressos\n• Criar versões derivadas (paráfrases regionais, adaptações)\n\nO único pedido (não obrigatório, mas apreciado) é dar crédito ao projeto: "Bíblia Livre AI — biblialivreai.com".',
    },
    contribute: {
      title: 'Como contribuir',
      body: 'Este é um projeto aberto para contribuição de qualquer pessoa — você não precisa saber grego ou hebraico para ajudar. Qualquer contribuição é bem-vinda:\n\n• Reportar erros de português, acentuação ou digitação\n• Sugerir melhorias na paráfrase de versículos específicos\n• Revisar e expandir as notas acadêmicas\n• Contribuir com paráfrases em novos idiomas\n• Criar paráfrases regionais (nordestina, gaúcha, etc.)\n• Contribuir com o código do site\n• Ajudar na verificação dos termos gregos e hebraicos\n\nComo participar pelo GitHub:\n\n1. Acesse github.com/Nardoto/biblia-ai-traducao\n2. Faça um fork do repositório\n3. Edite o arquivo do capítulo que quer melhorar\n4. Abra um Pull Request descrevendo sua sugestão\n\nOu simplesmente abra uma Issue descrevendo o erro ou sugestão. Toda contribuição será creditada.',
    },
    roadmap: {
      title: 'Próximos passos',
      items: [
        'Completar todos os 27 livros do Novo Testamento em português',
        'Notas acadêmicas expandidas com 5 categorias: linguística, histórico-cultural, crítica textual, teologia e referências cruzadas',
        'Cadeia de pensamento: documentação completa do raciocínio por trás de cada decisão de tradução',
        'Expansão para o Antigo Testamento a partir do hebraico bíblico',
        'Paráfrases regionais (nordestina, gaúcha, mineira, etc.)',
        'App mobile para leitura offline',
        'API pública para integração com outros projetos',
      ],
    },
    regional: {
      title: 'Paráfrases regionais',
      body: 'Uma das visões do projeto é ter paráfrases que falem a língua de cada região — uma paráfrase nordestina, uma gaúcha, uma texana, uma andaluza. O objetivo é trazer o texto bíblico o mais perto possível do leitor, na forma como ele realmente fala no dia a dia. Se você quer ajudar a criar uma paráfrase regional, entre em contato pelo GitHub.',
    },
    methodLink: 'Veja como a IA faz a paráfrase',
    backLink: 'Voltar',
  },
  en: {
    title: 'About Free Bible AI',
    subtitle: 'An open experiment in Bible paraphrase made entirely by artificial intelligence.',
    whatIs: {
      title: 'What is this project?',
      body: 'Free Bible AI is a Bible paraphrase created entirely by artificial intelligence, working from the original texts in Greek (New Testament) and Hebrew (Old Testament). It is not a word-for-word translation nor a copy of existing translations — it is an original work that seeks to convey the meaning and emotion of the biblical text in accessible, contemporary language.\n\nThe project is an experiment in radical transparency: the entire creation process is documented, open, and verifiable. Each chapter includes detailed notes about the choices made, the original terms consulted, and the reasoning behind each decision. Anyone can verify, critique, suggest improvements, or freely use the text.',
    },
    vision: {
      title: 'Project Vision',
      body: 'Free Bible AI is more than a paraphrase — it\'s a community-driven, open project that invites anyone to participate. Our vision is to create the most accessible, transparent, and verifiable Bible paraphrase in the world, in multiple languages, under CC0 (public domain) license.\n\nEach chapter comes with expanded academic notes — linguistic analysis of Greek and Hebrew, historical-cultural context, textual criticism with manuscript evidence, contemporary theological debates, and cross-references. The "Chain of Thought" documents the complete reasoning behind every translation decision.\n\nThe goal is for anyone — from casual reader to theology student — to not only read the Bible, but understand why each word was chosen and verify the sources themselves.',
    },
    who: {
      title: 'Who is behind this?',
      body: 'The project was started by Nardoto — a Baptist since childhood, born and raised in the church, now married and father of a 4-year-old daughter.\n\nThe motivation came from a personal and practical desire: to have a biblical text in language clear enough to read to his daughter, and that could be freely used in projects like YouTube videos without copyright concerns.\n\nNardoto is not a theologian (yet — he plans to study theology), but he is the one who oversees and verifies how the project is being done. The AI does the paraphrasing; Nardoto ensures the process is honest and the result is faithful.\n\nThe artificial intelligence used is Claude (Opus model) by Anthropic — the most advanced model available. Nardoto pays for the most expensive Claude Code subscription to run this project, out of a genuine desire to create something useful for people.',
    },
    why: {
      title: 'Why does this project exist?',
      items: [
        'To have a biblical text in truly accessible language, as if someone were telling it to you personally',
        'To be completely free to use — in apps, videos, studies, sermons, without needing permission',
        'To be transparent — you know exactly how each verse was paraphrased and can verify it',
        'To be an open project welcoming contributions from anyone',
        'To explore AI\'s potential to serve the faith community with honesty and responsibility',
      ],
    },
    license: {
      title: 'License and usage',
      body: 'All content is under CC0 license (public domain). This means you can:\n\n• Use in any personal or commercial project\n• Copy, modify, and distribute freely\n• Use in apps, videos, podcasts, printed materials\n• Create derivative versions (regional paraphrases, adaptations)\n\nThe only request (not mandatory, but appreciated) is to credit the project: "Free Bible AI — biblialivreai.com".',
    },
    contribute: {
      title: 'How to contribute',
      body: 'This is an open project welcoming contributions from anyone — you don\'t need to know Greek or Hebrew to help. Any contribution is welcome:\n\n• Report typos or language errors\n• Suggest improvements to specific verses\n• Review and expand academic notes\n• Contribute paraphrases in new languages\n• Create regional paraphrases (Texan, Southern, etc.)\n• Contribute to the website code\n• Help verify Greek and Hebrew terms\n\nHow to participate on GitHub:\n\n1. Visit github.com/Nardoto/biblia-ai-traducao\n2. Fork the repository\n3. Edit the chapter file you want to improve\n4. Open a Pull Request describing your suggestion\n\nOr simply open an Issue describing the error or suggestion. All contributions will be credited.',
    },
    roadmap: {
      title: 'What\'s next',
      items: [
        'Complete all 27 New Testament books in Portuguese',
        'Expanded academic notes with 5 categories: linguistics, historical-cultural, textual criticism, theology, and cross-references',
        'Chain of thought: complete documentation of reasoning behind every translation decision',
        'Old Testament expansion from Biblical Hebrew',
        'Regional paraphrases (Southern, Texan, etc.)',
        'Mobile app for offline reading',
        'Public API for integration with other projects',
      ],
    },
    regional: {
      title: 'Regional paraphrases',
      body: 'One vision for the project is to have paraphrases that speak each region\'s language — a Southern paraphrase, a Texan one, an Andalusian one. The goal is to bring the biblical text as close as possible to the reader, in the way they actually speak day to day. If you want to help create a regional paraphrase, reach out on GitHub.',
    },
    methodLink: 'See how the AI does the paraphrase',
    backLink: 'Back',
  },
  es: {
    title: 'Acerca de Biblia Libre AI',
    subtitle: 'Un experimento abierto de paráfrasis bíblica hecha enteramente por inteligencia artificial.',
    whatIs: {
      title: '¿Qué es este proyecto?',
      body: 'Biblia Libre AI es una paráfrasis de la Biblia creada enteramente por inteligencia artificial, a partir de los textos originales en griego (Nuevo Testamento) y hebreo (Antiguo Testamento). No es una traducción palabra por palabra ni una copia de traducciones existentes — es una obra original que busca transmitir el significado y la emoción del texto bíblico en lenguaje accesible y contemporáneo.\n\nEl proyecto es un experimento de transparencia radical: todo el proceso de creación está documentado, abierto y verificable. Cada capítulo incluye notas detalladas sobre las decisiones tomadas, los términos originales consultados y el razonamiento detrás de cada elección. Cualquier persona puede verificar, criticar, sugerir mejoras o usar el texto libremente.',
    },
    vision: {
      title: 'Visión del Proyecto',
      body: 'Biblia Libre AI es más que una paráfrasis — es un proyecto comunitario y abierto que invita a cualquier persona a participar. Nuestra visión es crear la paráfrasis bíblica más accesible, transparente y verificable del mundo, en múltiples idiomas, bajo licencia CC0 (dominio público).\n\nCada capítulo viene acompañado de notas académicas expandidas — con análisis lingüístico del griego y hebreo, contexto histórico-cultural, crítica textual con evidencia de manuscritos, debates teológicos contemporáneos y referencias cruzadas. La "Cadena de Pensamiento" documenta el razonamiento completo detrás de cada decisión de traducción.\n\nEl objetivo es que cualquier persona — del lector casual al estudiante de teología — pueda no solo leer la Biblia, sino entender por qué se eligió cada palabra y verificar las fuentes por cuenta propia.',
    },
    who: {
      title: '¿Quién está detrás?',
      body: 'El proyecto fue iniciado por Nardoto — bautista desde niño, nacido y criado en la iglesia, hoy casado y padre de una hija de 4 años.\n\nLa motivación vino de un deseo personal y práctico: tener un texto bíblico en un lenguaje lo suficientemente claro para leerle a su hija, y que pudiera usarse libremente en proyectos como videos de YouTube sin preocupaciones de derechos de autor.\n\nNardoto no es teólogo (todavía — planea estudiar teología), pero es quien supervisa y verifica cómo se está haciendo el proyecto. La IA hace la paráfrasis; Nardoto garantiza que el proceso sea honesto y el resultado, fiel.\n\nLa inteligencia artificial utilizada es Claude (modelo Opus) de Anthropic — el modelo más avanzado disponible. Nardoto paga la suscripción más cara de Claude Code para llevar este proyecto, por voluntad genuina de crear algo útil para las personas.',
    },
    why: {
      title: '¿Por qué existe este proyecto?',
      items: [
        'Para tener un texto bíblico en lenguaje realmente accesible, como si alguien te lo estuviera contando personalmente',
        'Para ser de uso completamente libre — en apps, videos, estudios, predicaciones, sin necesidad de pedir permiso',
        'Para ser transparente — sabes exactamente cómo se parafraseó cada versículo y puedes verificarlo',
        'Para ser un proyecto abierto a contribuciones de cualquier persona',
        'Para explorar el potencial de la IA al servicio de la comunidad de fe con honestidad y responsabilidad',
      ],
    },
    license: {
      title: 'Licencia y uso',
      body: 'Todo el contenido está bajo licencia CC0 (dominio público). Esto significa que puedes:\n\n• Usar en cualquier proyecto personal o comercial\n• Copiar, modificar y distribuir libremente\n• Usar en aplicaciones, videos, podcasts, materiales impresos\n• Crear versiones derivadas (paráfrasis regionales, adaptaciones)\n\nLa única solicitud (no obligatoria, pero apreciada) es dar crédito al proyecto: "Biblia Libre AI — biblialivreai.com".',
    },
    contribute: {
      title: 'Cómo contribuir',
      body: 'Este es un proyecto abierto a contribuciones de cualquier persona — no necesitas saber griego ni hebreo para ayudar. Cualquier contribución es bienvenida:\n\n• Reportar errores de ortografía o acentuación\n• Sugerir mejoras en versículos específicos\n• Revisar y expandir las notas académicas\n• Contribuir con paráfrasis en nuevos idiomas\n• Crear paráfrasis regionales (andaluza, mexicana, etc.)\n• Contribuir con el código del sitio\n• Ayudar en la verificación de términos griegos y hebreos\n\nCómo participar en GitHub:\n\n1. Visita github.com/Nardoto/biblia-ai-traducao\n2. Haz un fork del repositorio\n3. Edita el archivo del capítulo que quieras mejorar\n4. Abre un Pull Request describiendo tu sugerencia\n\nO simplemente abre un Issue describiendo el error o sugerencia. Toda contribución será acreditada.',
    },
    roadmap: {
      title: 'Próximos pasos',
      items: [
        'Completar los 27 libros del Nuevo Testamento en portugués',
        'Notas académicas expandidas con 5 categorías: lingüística, histórico-cultural, crítica textual, teología y referencias cruzadas',
        'Cadena de pensamiento: documentación completa del razonamiento detrás de cada decisión de traducción',
        'Expansión al Antiguo Testamento desde el hebreo bíblico',
        'Paráfrasis regionales (andaluza, mexicana, rioplatense, etc.)',
        'App móvil para lectura sin conexión',
        'API pública para integración con otros proyectos',
      ],
    },
    regional: {
      title: 'Paráfrasis regionales',
      body: 'Una de las visiones del proyecto es tener paráfrasis que hablen el idioma de cada región — una paráfrasis andaluza, una mexicana, una rioplatense. El objetivo es acercar el texto bíblico lo más posible al lector, en la forma en que realmente habla día a día. Si quieres ayudar a crear una paráfrasis regional, contáctanos en GitHub.',
    },
    methodLink: 'Ver cómo la IA hace la paráfrasis',
    backLink: 'Volver',
  },
};

export default function SobrePage({ params }: { params: { lang: Language } }) {
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

      <div className="flex items-center gap-3 mb-2">
        <Logo size={36} />
        <h1 className="text-2xl font-bold font-serif">{t.title}</h1>
      </div>
      <p className="text-[var(--muted)] mb-10 text-sm">{t.subtitle}</p>

      <section className="mb-10">
        <h2 className="text-lg font-bold font-serif mb-3">{t.whatIs.title}</h2>
        {t.whatIs.body.split('\n\n').map((p, i) => (
          <p key={i} className="mb-4 leading-relaxed">{p}</p>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold font-serif mb-3">{t.vision.title}</h2>
        {t.vision.body.split('\n\n').map((p, i) => (
          <p key={i} className="mb-4 leading-relaxed">{p}</p>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold font-serif mb-3">{t.who.title}</h2>
        {t.who.body.split('\n\n').map((p, i) => (
          <p key={i} className="mb-4 leading-relaxed">{p}</p>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold font-serif mb-3">{t.why.title}</h2>
        <ul className="space-y-3">
          {t.why.items.map((item, i) => (
            <li key={i} className="flex gap-2 leading-relaxed">
              <span className="text-[var(--accent)] mt-1 shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold font-serif mb-3">{t.license.title}</h2>
        {t.license.body.split('\n\n').map((p, i) => (
          <p key={i} className="mb-4 leading-relaxed whitespace-pre-line">{p}</p>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold font-serif mb-3">{t.contribute.title}</h2>
        {t.contribute.body.split('\n\n').map((p, i) => (
          <p key={i} className="mb-4 leading-relaxed whitespace-pre-line">{p}</p>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold font-serif mb-3">{t.roadmap.title}</h2>
        <ul className="space-y-3">
          {t.roadmap.items.map((item, i) => (
            <li key={i} className="flex gap-2 leading-relaxed">
              <span className="text-[var(--accent)] mt-1 shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold font-serif mb-3">{t.regional.title}</h2>
        <p className="leading-relaxed">{t.regional.body}</p>
      </section>

      <div className="border-t border-[var(--border)] pt-6 mt-10">
        <Link
          href={`/${lang}/metodologia/`}
          className="inline-block px-5 py-2.5 rounded-lg bg-[var(--accent)] text-white font-sans text-sm font-medium hover:opacity-90 transition"
        >
          {t.methodLink} →
        </Link>
      </div>
    </div>
  );
}
