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
  who: { title: string; body: string };
  why: { title: string; items: string[] };
  license: { title: string; body: string };
  contribute: { title: string; body: string };
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
      body: 'Este é um projeto aberto para contribuição de qualquer pessoa. Você pode:\n\n• Reportar erros ou sugerir melhorias nos textos\n• Contribuir com paráfrases em novos idiomas\n• Ajudar a revisar notas e referências\n• Criar paráfrases regionais (nordestina, gaúcha, etc.)\n• Contribuir com o código do site\n\nTudo acontece no GitHub: github.com/Nardoto/biblia-ai-traducao',
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
      body: 'This is an open project welcoming contributions from anyone. You can:\n\n• Report errors or suggest improvements to texts\n• Contribute paraphrases in new languages\n• Help review notes and references\n• Create regional paraphrases (Texan, Southern, etc.)\n• Contribute to the website code\n\nEverything happens on GitHub: github.com/Nardoto/biblia-ai-traducao',
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
      body: 'Este es un proyecto abierto a contribuciones de cualquier persona. Puedes:\n\n• Reportar errores o sugerir mejoras en los textos\n• Contribuir con paráfrasis en nuevos idiomas\n• Ayudar a revisar notas y referencias\n• Crear paráfrasis regionales (andaluza, mexicana, etc.)\n• Contribuir con el código del sitio\n\nTodo sucede en GitHub: github.com/Nardoto/biblia-ai-traducao',
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
