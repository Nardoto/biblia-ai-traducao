import Link from 'next/link';
import { BOOKS, LANG_CONFIG, LANGUAGES, findBook, type Language } from '@/lib/bible-data';
import { getChainOfThoughtContent, chainOfThoughtExists, chapterExists } from '@/lib/markdown';
import DarkModeToggle from '@/components/DarkModeToggle';
import ChapterTabNav from '@/components/ChapterTabNav';

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { lang: string; testament: string; book: string; chapter: string }[] = [];

  for (const lang of LANGUAGES) {
    for (const book of BOOKS) {
      const testament = LANG_CONFIG[lang].testament[book.testament];
      for (let ch = 1; ch <= book.chapters; ch++) {
        if (chainOfThoughtExists(lang, book.testament, book.names[lang], ch)) {
          params.push({
            lang,
            testament,
            book: book.names[lang],
            chapter: ch.toString(),
          });
        }
      }
    }
  }

  return params;
}

function renderMarkdown(md: string): string {
  return md
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal">$2</li>')
    .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
}

export default function CadeiaPage({
  params,
}: {
  params: { lang: Language; testament: string; book: string; chapter: string };
}) {
  const { lang, testament, book: bookSlug, chapter: chapterStr } = params;
  const chapter = parseInt(chapterStr, 10);
  const book = findBook(lang, bookSlug);

  if (!book) {
    return <div className="p-8 text-center text-[var(--muted)]">Livro não encontrado.</div>;
  }

  const testamentKey = book.testament;
  const content = getChainOfThoughtContent(lang, testamentKey, bookSlug, chapter);
  const hasChain = chainOfThoughtExists(lang, testamentKey, bookSlug, chapter);

  const bookLabels: Record<Language, string> = {
    pt: 'Livros',
    en: 'Books',
    es: 'Libros',
  };

  // Remove the first # heading from content (we render title separately)
  const bodyContent = content
    ? content.replace(/^# .+\n+/, '')
    : '';

  return (
    <div>
      {/* Mobile header */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <Link
          href={`/${lang}/`}
          className="text-[var(--accent)] font-sans text-sm flex items-center gap-1"
        >
          &larr; {bookLabels[lang]}
        </Link>
        <div className="flex items-center gap-2">
          <DarkModeToggle />
        </div>
      </div>

      {/* Book title */}
      <h2 className="text-lg font-bold font-serif mb-3">{book.display[lang]}</h2>

      {/* Chapter grid */}
      <div className="mb-6 flex flex-wrap gap-1">
        {Array.from({ length: book.chapters }, (_, i) => i + 1).map((ch) => {
          const exists = chapterExists(lang, testamentKey, bookSlug, ch);
          const isCurrent = ch === chapter;

          if (!exists && !isCurrent) {
            return (
              <span
                key={ch}
                className="w-8 h-8 flex items-center justify-center text-xs rounded font-sans text-[var(--muted)] opacity-30 cursor-default"
              >
                {ch}
              </span>
            );
          }

          return (
            <Link
              key={ch}
              href={`/${lang}/${testament}/${bookSlug}/${ch}/`}
              className={`w-8 h-8 flex items-center justify-center text-xs rounded font-sans transition
                ${isCurrent ? 'bg-[var(--accent)] text-white' : 'bg-[var(--accent-bg)] text-[var(--text)] hover:bg-[var(--accent)] hover:text-white'}`}
            >
              {ch}
            </Link>
          );
        })}
      </div>

      {/* Tab navigation */}
      <ChapterTabNav
        lang={lang}
        testament={testament}
        bookSlug={bookSlug}
        chapter={chapter}
        active="chain"
        hasChainOfThought={hasChain}
      />

      {/* Content */}
      {content ? (
        <div className="chain-of-thought">
          <h1 className="text-xl font-bold font-serif mb-6">
            {lang === 'pt' ? 'Cadeia de Pensamento' :
             lang === 'es' ? 'Cadena de Pensamiento' :
             'Chain of Thought'} — {book.display[lang]} {chapter}
          </h1>
          <div
            className="chain-content"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(bodyContent) }}
          />
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-[var(--muted)] text-lg">
            {lang === 'pt' ? 'Cadeia de pensamento ainda não disponível para este capítulo.' :
             lang === 'es' ? 'Cadena de pensamiento aún no disponible.' :
             'Chain of thought not yet available for this chapter.'}
          </p>
        </div>
      )}

      {/* Prev/Next */}
      <nav className="flex justify-between mt-12 pt-6 border-t border-[var(--border)] font-sans text-sm">
        {chapter > 1 ? (
          <Link href={`/${lang}/${testament}/${bookSlug}/${chapter - 1}/`} className="text-[var(--accent)] hover:underline">
            &larr; {book.display[lang]} {chapter - 1}
          </Link>
        ) : <span />}
        {chapter < book.chapters ? (
          <Link href={`/${lang}/${testament}/${bookSlug}/${chapter + 1}/`} className="text-[var(--accent)] hover:underline">
            {book.display[lang]} {chapter + 1} &rarr;
          </Link>
        ) : <span />}
      </nav>
    </div>
  );
}
