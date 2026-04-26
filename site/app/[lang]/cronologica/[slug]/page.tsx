import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LANGUAGES, type Language } from '@/lib/bible-data';
import DarkModeToggle from '@/components/DarkModeToggle';
import CronologicaReader from '@/components/CronologicaReader';
import { getCronologicaChapterContent } from '@/lib/cronologica';
import harmoniaData from '@/data/evangelhos-harmonia.json';

interface Capitulo {
  num: number;
  slug: string;
  titulo: string;
  subtitulo: string;
}

interface Harmonia {
  capitulos: Capitulo[];
}

const harmonia = harmoniaData as Harmonia;

export function generateStaticParams() {
  // Gerar uma rota por (lang, slug). Mesmo capítulos sem texto aparecem
  // como rota — assim a navegação prev/next sempre funciona; capítulos
  // vazios mostram um placeholder "em breve".
  const params: { lang: Language; slug: string }[] = [];
  for (const lang of LANGUAGES) {
    for (const cap of harmonia.capitulos) {
      params.push({ lang, slug: cap.slug });
    }
  }
  return params;
}

const labels: Record<Language, {
  back: string;
  index: string;
  prev: string;
  next: string;
  comingSoonTitle: string;
  comingSoonBody: string;
}> = {
  pt: {
    back: 'Voltar',
    index: 'Índice da Bíblia Cronológica',
    prev: '← Anterior',
    next: 'Próximo →',
    comingSoonTitle: 'Em breve',
    comingSoonBody: 'Este capítulo ainda não foi escrito. Estamos construindo a Bíblia Cronológica capítulo por capítulo — volte em breve.',
  },
  en: {
    back: 'Back',
    index: 'Chronological Bible index',
    prev: '← Previous',
    next: 'Next →',
    comingSoonTitle: 'Coming soon',
    comingSoonBody: 'This chapter has not been written yet. We are building the Chronological Bible chapter by chapter — come back soon.',
  },
  es: {
    back: 'Volver',
    index: 'Índice de la Biblia Cronológica',
    prev: '← Anterior',
    next: 'Siguiente →',
    comingSoonTitle: 'Pronto',
    comingSoonBody: 'Este capítulo aún no ha sido escrito. Estamos construyendo la Biblia Cronológica capítulo por capítulo — vuelve pronto.',
  },
};

export default function CronologicaChapterPage({
  params,
}: {
  params: { lang: Language; slug: string };
}) {
  const { lang, slug } = params;
  const cap = harmonia.capitulos.find((c) => c.slug === slug);
  if (!cap) notFound();

  const t = labels[lang];
  const content = getCronologicaChapterContent(lang, slug);

  const prev = harmonia.capitulos.find((c) => c.num === cap.num - 1);
  const next = harmonia.capitulos.find((c) => c.num === cap.num + 1);

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <Link
          href={`/${lang}/cronologica/`}
          className="text-sm font-sans text-[var(--muted)] hover:text-[var(--accent)] transition"
        >
          ← {t.index}
        </Link>
        <DarkModeToggle />
      </div>

      {content ? (
        <CronologicaReader markdown={content} />
      ) : (
        <div>
          <h1 className="text-3xl font-bold font-serif mb-2">
            {cap.num}. {cap.titulo}
          </h1>
          <p className="text-[var(--muted)] italic mb-8">{cap.subtitulo}</p>
          <div className="border border-[var(--border)] rounded-lg p-6 bg-[var(--accent-bg)]/30 text-center">
            <h2 className="font-serif font-bold text-lg mb-2">{t.comingSoonTitle}</h2>
            <p className="text-sm text-[var(--muted)]">{t.comingSoonBody}</p>
          </div>
        </div>
      )}

      {/* Prev / Next */}
      <nav className="flex items-center justify-between mt-12 pt-6 border-t border-[var(--border)] gap-4">
        {prev ? (
          <Link
            href={`/${lang}/cronologica/${prev.slug}/`}
            className="flex-1 p-3 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition text-sm"
          >
            <div className="text-xs text-[var(--muted)] font-sans">{t.prev}</div>
            <div className="font-medium font-serif mt-0.5 truncate">{prev.titulo}</div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <Link
            href={`/${lang}/cronologica/${next.slug}/`}
            className="flex-1 p-3 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition text-sm text-right"
          >
            <div className="text-xs text-[var(--muted)] font-sans">{t.next}</div>
            <div className="font-medium font-serif mt-0.5 truncate">{next.titulo}</div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </div>
  );
}
