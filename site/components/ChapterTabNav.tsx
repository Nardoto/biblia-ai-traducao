import Link from 'next/link';
import type { Language } from '@/lib/bible-data';

const labels: Record<Language, { paraphrase: string; chain: string }> = {
  pt: { paraphrase: 'Paráfrase', chain: 'Cadeia de Pensamento' },
  en: { paraphrase: 'Paraphrase', chain: 'Chain of Thought' },
  es: { paraphrase: 'Paráfrasis', chain: 'Cadena de Pensamiento' },
};

export default function ChapterTabNav({
  lang,
  testament,
  bookSlug,
  chapter,
  active,
  hasChainOfThought,
}: {
  lang: Language;
  testament: string;
  bookSlug: string;
  chapter: number;
  active: 'paraphrase' | 'chain';
  hasChainOfThought: boolean;
}) {
  const t = labels[lang];
  const base = `/${lang}/${testament}/${bookSlug}/${chapter}`;

  return (
    <div className="chapter-tab-nav">
      <Link
        href={`${base}/`}
        className={`chapter-tab ${active === 'paraphrase' ? 'active' : ''}`}
      >
        {t.paraphrase}
      </Link>
      {hasChainOfThought && (
        <Link
          href={`${base}/cadeia/`}
          className={`chapter-tab ${active === 'chain' ? 'active' : ''}`}
        >
          {t.chain}
        </Link>
      )}
    </div>
  );
}
