import Link from 'next/link';
import { LANGUAGES, type Language } from '@/lib/bible-data';
import DarkModeToggle from '@/components/DarkModeToggle';
import { cronologicaChapterExists } from '@/lib/cronologica';
import harmoniaData from '@/data/evangelhos-harmonia.json';

export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

interface Capitulo {
  num: number;
  slug: string;
  titulo: string;
  subtitulo: string;
  total_cenas: number;
}

interface Harmonia {
  capitulos: Capitulo[];
}

const harmonia = harmoniaData as Harmonia;

const content: Record<Language, {
  title: string;
  subtitle: string;
  intro: string;
  backLink: string;
  mapLink: string;
  mapDescription: string;
  chaptersTitle: string;
  ready: string;
  comingSoon: string;
  scenesLabel: string;
}> = {
  pt: {
    title: 'Bíblia Cronológica',
    subtitle: 'Em construção — capítulo por capítulo, você acompanha',
    intro: 'A Bíblia inteira reordenada na sequência em que os eventos aconteceram, lida como um romance contínuo — sem capítulos canônicos visíveis e sem repetições. Os 4 evangelhos vêm fundidos numa única narrativa (estilo Diatessaron, séc. II). Esta é uma leitura adicional: a Bíblia canônica continua disponível pelo menu lateral.',
    backLink: 'Voltar',
    mapLink: 'Mapa estrutural dos 4 evangelhos',
    mapDescription: 'Veja como vamos fundir Mateus, Marcos, Lucas e João — 153 cenas, 21 conflitos sinalizados',
    chaptersTitle: 'Capítulos',
    ready: 'pronto',
    comingSoon: 'em breve',
    scenesLabel: 'cenas',
  },
  en: {
    title: 'Chronological Bible',
    subtitle: 'Under construction — chapter by chapter, you follow along',
    intro: 'The entire Bible reordered in the sequence the events happened, read as a continuous novel — without visible canonical chapters and without repetitions. The 4 gospels are fused into a single narrative (Diatessaron style, 2nd century). This is an additional reading: the canonical Bible remains available in the sidebar.',
    backLink: 'Back',
    mapLink: 'Structural map of the 4 gospels',
    mapDescription: 'See how we will fuse Matthew, Mark, Luke and John — 153 scenes, 21 flagged conflicts',
    chaptersTitle: 'Chapters',
    ready: 'ready',
    comingSoon: 'coming soon',
    scenesLabel: 'scenes',
  },
  es: {
    title: 'Biblia Cronológica',
    subtitle: 'En construcción — capítulo por capítulo, tú acompañas',
    intro: 'La Biblia entera reordenada en la secuencia en que ocurrieron los eventos, leída como una novela continua — sin capítulos canónicos visibles y sin repeticiones. Los 4 evangelios vienen fusionados en una única narrativa (estilo Diatessaron, siglo II). Esta es una lectura adicional: la Biblia canónica sigue disponible en el menú lateral.',
    backLink: 'Volver',
    mapLink: 'Mapa estructural de los 4 evangelios',
    mapDescription: 'Mira cómo vamos a fusionar Mateo, Marcos, Lucas y Juan — 153 escenas, 21 conflictos señalados',
    chaptersTitle: 'Capítulos',
    ready: 'listo',
    comingSoon: 'pronto',
    scenesLabel: 'escenas',
  },
};

export default function CronologicaIndexPage({ params }: { params: { lang: Language } }) {
  const lang = params.lang;
  const t = content[lang];

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <Link href={`/${lang}/`} className="text-sm font-sans text-[var(--muted)] hover:text-[var(--accent)] transition">
          ← {t.backLink}
        </Link>
        <DarkModeToggle />
      </div>

      <h1 className="text-3xl font-bold font-serif mb-1">{t.title}</h1>
      <p className="text-[var(--muted)] mb-6 text-sm">{t.subtitle}</p>

      <p className="mb-8 leading-relaxed">{t.intro}</p>

      {/* Mapa link */}
      <Link
        href={`/${lang}/cronologica/evangelhos-mapa/`}
        className="block mb-10 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition group"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="font-serif font-bold mb-0.5">{t.mapLink}</h3>
            <p className="text-sm text-[var(--muted)]">{t.mapDescription}</p>
          </div>
          <span className="text-[var(--accent)] text-xl group-hover:translate-x-0.5 transition">→</span>
        </div>
      </Link>

      {/* Lista dos capítulos */}
      <h2 className="text-xs font-sans font-bold uppercase tracking-wide text-[var(--muted)] mb-3 border-b border-[var(--border)] pb-2">
        {t.chaptersTitle}
      </h2>

      <ol className="space-y-2">
        {harmonia.capitulos.map((cap) => {
          const exists = cronologicaChapterExists(lang, cap.slug);
          if (exists) {
            return (
              <li key={cap.num}>
                <Link
                  href={`/${lang}/cronologica/${cap.slug}/`}
                  className="block p-3 rounded-lg border border-[var(--accent-soft)] bg-[var(--accent-bg)]/50 hover:border-[var(--accent)] hover:bg-[var(--accent-bg)] transition"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-[var(--muted)] font-sans text-sm w-6 text-right">{cap.num}.</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif font-medium">{cap.titulo}</h3>
                        <span className="text-[10px] font-sans uppercase tracking-wide px-1.5 py-0.5 rounded bg-[var(--accent)] text-white">
                          {t.ready}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--muted)] italic mt-0.5">{cap.subtitulo}</p>
                    </div>
                    <span className="text-xs text-[var(--muted)] font-sans whitespace-nowrap">
                      {cap.total_cenas} {t.scenesLabel}
                    </span>
                  </div>
                </Link>
              </li>
            );
          }
          return (
            <li
              key={cap.num}
              className="block p-3 rounded-lg border border-[var(--border)] opacity-60"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[var(--muted)] font-sans text-sm w-6 text-right">{cap.num}.</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-medium">{cap.titulo}</h3>
                    <span className="text-[10px] font-sans uppercase tracking-wide px-1.5 py-0.5 rounded border border-[var(--border)] text-[var(--muted)]">
                      {t.comingSoon}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--muted)] italic mt-0.5">{cap.subtitulo}</p>
                </div>
                <span className="text-xs text-[var(--muted)] font-sans whitespace-nowrap">
                  {cap.total_cenas} {t.scenesLabel}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
