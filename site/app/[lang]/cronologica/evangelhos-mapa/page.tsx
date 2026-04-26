import Link from 'next/link';
import { LANGUAGES, type Language } from '@/lib/bible-data';
import DarkModeToggle from '@/components/DarkModeToggle';
import harmoniaData from '@/data/evangelhos-harmonia.json';

export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

interface Fonte {
  evangelho: string;
  ref: string;
  ref_completa: string;
  idx_origem: number;
}

interface Cena {
  id: number;
  titulo: string;
  fontes: Fonte[];
  base: string;
  nota_editorial?: string;
  conflito_aparente?: string;
}

interface Capitulo {
  num: number;
  titulo: string;
  subtitulo: string;
  total_cenas: number;
  cenas: Cena[];
}

interface Harmonia {
  meta: {
    fonte_ordenacao: string;
    fonte_harmonizacao: string;
    esquema: string;
    total_capitulos: number;
    total_cenas: number;
    total_pericopes_khornberg: number;
    pericopes_usadas: number;
    conflitos_aparentes_sinalizados: number;
  };
  capitulos: Capitulo[];
}

const harmonia = harmoniaData as Harmonia;

const GOSPEL_COLORS: Record<string, string> = {
  Mateus: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900',
  Marcos: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-900',
  Lucas: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-900',
  João: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-900',
};

const GOSPEL_ABBR: Record<string, string> = {
  Mateus: 'Mt',
  Marcos: 'Mc',
  Lucas: 'Lc',
  João: 'Jo',
};

const content: Record<Language, {
  title: string;
  subtitle: string;
  backLink: string;
  intro: string;
  statsCaps: string;
  statsScenes: string;
  statsConflicts: string;
  baseLabel: string;
  fusionLabel: string;
  noteLabel: string;
  conflictLabel: string;
  toc: string;
  status: string;
}> = {
  pt: {
    title: 'Mapa da Harmonia dos 4 Evangelhos',
    subtitle: 'Como vamos fundir Mateus, Marcos, Lucas e João em uma narrativa única',
    backLink: 'Voltar',
    intro: 'Esta página mostra a estrutura proposta para a fusão dos quatro evangelhos na Bíblia Cronológica. Cada cena indica quais evangelhos contam aquele momento, qual será a "voz base" da fusão, e — quando relevante — uma nota editorial e/ou um conflito aparente que precisará de explicação no texto final. A ordem é a do esquema cronológico Tyndale (via khornberg/readingplans). A harmonização cena-a-cena segue a clássica Harmony of the Gospels de A.T. Robertson (1922, domínio público).',
    statsCaps: 'capítulos narrativos',
    statsScenes: 'cenas',
    statsConflicts: 'conflitos sinalizados',
    baseLabel: 'Base:',
    fusionLabel: 'fusão dos relatos',
    noteLabel: 'Nota editorial',
    conflictLabel: 'Conflito aparente',
    toc: 'Índice',
    status: 'Status: mapa estrutural — ainda sem o texto fundido escrito. Revise os títulos, agrupamentos e notas antes de partir para a redação capítulo por capítulo.',
  },
  en: {
    title: 'Map of the 4-Gospel Harmony',
    subtitle: 'How we will fuse Matthew, Mark, Luke and John into a single narrative',
    backLink: 'Back',
    intro: 'This page shows the proposed structure for fusing the four gospels in the Chronological Bible. Each scene shows which gospels tell that moment, which will be the "base voice" of the fusion, and — when relevant — an editorial note and/or an apparent conflict that will need explanation in the final text. Order follows the Tyndale chronological scheme (via khornberg/readingplans). Scene-by-scene harmonization follows the classic Harmony of the Gospels by A.T. Robertson (1922, public domain).',
    statsCaps: 'narrative chapters',
    statsScenes: 'scenes',
    statsConflicts: 'flagged conflicts',
    baseLabel: 'Base:',
    fusionLabel: 'fusion of accounts',
    noteLabel: 'Editorial note',
    conflictLabel: 'Apparent conflict',
    toc: 'Index',
    status: 'Status: structural map — fused text not yet written. Review titles, groupings, and notes before moving to chapter-by-chapter writing.',
  },
  es: {
    title: 'Mapa de la Armonía de los 4 Evangelios',
    subtitle: 'Cómo vamos a fusionar Mateo, Marcos, Lucas y Juan en una narrativa única',
    backLink: 'Volver',
    intro: 'Esta página muestra la estructura propuesta para fusionar los cuatro evangelios en la Biblia Cronológica. Cada escena indica qué evangelios cuentan ese momento, cuál será la "voz base" de la fusión y — cuando sea relevante — una nota editorial y/o un conflicto aparente que necesitará explicación en el texto final. El orden sigue el esquema cronológico Tyndale (vía khornberg/readingplans). La armonización escena por escena sigue la clásica Harmony of the Gospels de A.T. Robertson (1922, dominio público).',
    statsCaps: 'capítulos narrativos',
    statsScenes: 'escenas',
    statsConflicts: 'conflictos señalados',
    baseLabel: 'Base:',
    fusionLabel: 'fusión de relatos',
    noteLabel: 'Nota editorial',
    conflictLabel: 'Conflicto aparente',
    toc: 'Índice',
    status: 'Estado: mapa estructural — texto fusionado aún no escrito. Revisa títulos, agrupaciones y notas antes de pasar a la redacción capítulo por capítulo.',
  },
};

function GospelPill({ fonte }: { fonte: Fonte }) {
  const color = GOSPEL_COLORS[fonte.evangelho] ?? 'bg-gray-100 text-gray-700 border-gray-200';
  const abbr = GOSPEL_ABBR[fonte.evangelho] ?? fonte.evangelho;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-sans border ${color}`}
      title={fonte.ref_completa}
    >
      <span className="font-bold">{abbr}</span>
      <span>{fonte.ref}</span>
    </span>
  );
}

export default function EvangelhosMapaPage({ params }: { params: { lang: Language } }) {
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

      <h1 className="text-2xl font-bold font-serif mb-1">{t.title}</h1>
      <p className="text-[var(--muted)] mb-6 text-sm">{t.subtitle}</p>

      <p className="mb-6 leading-relaxed text-sm">{t.intro}</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="border border-[var(--border)] rounded-lg p-3 text-center">
          <div className="text-2xl font-bold font-serif">{harmonia.meta.total_capitulos}</div>
          <div className="text-xs text-[var(--muted)] font-sans">{t.statsCaps}</div>
        </div>
        <div className="border border-[var(--border)] rounded-lg p-3 text-center">
          <div className="text-2xl font-bold font-serif">{harmonia.meta.total_cenas}</div>
          <div className="text-xs text-[var(--muted)] font-sans">{t.statsScenes}</div>
        </div>
        <div className="border border-[var(--border)] rounded-lg p-3 text-center">
          <div className="text-2xl font-bold font-serif">{harmonia.meta.conflitos_aparentes_sinalizados}</div>
          <div className="text-xs text-[var(--muted)] font-sans">{t.statsConflicts}</div>
        </div>
      </div>

      <div className="border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-700 p-3 rounded-r mb-8 text-sm">
        {t.status}
      </div>

      {/* Index */}
      <h2 className="text-xs font-sans font-bold uppercase tracking-wide text-[var(--muted)] mb-3 border-b border-[var(--border)] pb-2">
        {t.toc}
      </h2>
      <ol className="mb-10 space-y-1.5">
        {harmonia.capitulos.map((cap) => (
          <li key={cap.num} className="text-sm">
            <a href={`#cap-${cap.num}`} className="hover:text-[var(--accent)] transition">
              <span className="text-[var(--muted)] font-sans mr-2">{cap.num}.</span>
              <span className="font-medium">{cap.titulo}</span>
              <span className="text-[var(--muted)] text-xs ml-2 font-sans">({cap.total_cenas})</span>
            </a>
          </li>
        ))}
      </ol>

      {/* Chapters */}
      {harmonia.capitulos.map((cap) => (
        <section key={cap.num} id={`cap-${cap.num}`} className="mb-12 scroll-mt-4">
          <h2 className="text-xl font-bold font-serif mb-1">
            <span className="text-[var(--muted)] mr-2">{cap.num}.</span>
            {cap.titulo}
          </h2>
          <p className="text-sm text-[var(--muted)] mb-5 italic">{cap.subtitulo}</p>

          <ol className="space-y-4">
            {cap.cenas.map((cena) => (
              <li
                key={cena.id}
                className="border border-[var(--border)] rounded-lg p-4 bg-[var(--accent-bg)]/30"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-medium font-serif leading-snug">
                    <span className="text-[var(--muted)] text-sm font-sans mr-2">#{cena.id}</span>
                    {cena.titulo}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-2">
                  {cena.fontes.map((f, i) => (
                    <GospelPill key={i} fonte={f} />
                  ))}
                </div>

                <div className="text-xs font-sans text-[var(--muted)] mb-2">
                  <span className="font-medium">{t.baseLabel}</span>{' '}
                  {cena.base === 'fusão' ? (
                    <em>{t.fusionLabel}</em>
                  ) : (
                    <span>{cena.base}</span>
                  )}
                </div>

                {cena.nota_editorial && (
                  <div className="mt-3 text-xs leading-relaxed border-l-2 border-[var(--accent)] pl-3 py-1 text-[var(--text)]">
                    <span className="font-bold font-sans uppercase tracking-wide text-[10px] text-[var(--accent)] block mb-1">
                      {t.noteLabel}
                    </span>
                    {cena.nota_editorial}
                  </div>
                )}

                {cena.conflito_aparente && (
                  <div className="mt-2 text-xs leading-relaxed border-l-2 border-rose-400 pl-3 py-1">
                    <span className="font-bold font-sans uppercase tracking-wide text-[10px] text-rose-600 dark:text-rose-400 block mb-1">
                      ⚠ {t.conflictLabel}
                    </span>
                    {cena.conflito_aparente}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>
      ))}

      <footer className="mt-12 pt-6 border-t border-[var(--border)] text-xs text-[var(--muted)] font-sans space-y-1">
        <p>{harmonia.meta.fonte_ordenacao}</p>
        <p>{harmonia.meta.fonte_harmonizacao}</p>
      </footer>
    </div>
  );
}
