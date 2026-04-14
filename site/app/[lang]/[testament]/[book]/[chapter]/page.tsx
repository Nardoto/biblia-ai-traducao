import Link from 'next/link';
import { BOOKS, LANG_CONFIG, LANGUAGES, findBook, type Language } from '@/lib/bible-data';
import { getChapterContent, chapterExists, chainOfThoughtExists } from '@/lib/markdown';
import DarkModeToggle from '@/components/DarkModeToggle';
import VerseReader from '@/components/VerseReader';
import ChapterTabNav from '@/components/ChapterTabNav';

export function generateStaticParams() {
  const params: { lang: string; testament: string; book: string; chapter: string }[] = [];

  for (const lang of LANGUAGES) {
    for (const book of BOOKS) {
      const testament = LANG_CONFIG[lang].testament[book.testament];
      for (let ch = 1; ch <= book.chapters; ch++) {
        params.push({
          lang,
          testament,
          book: book.names[lang],
          chapter: ch.toString(),
        });
      }
    }
  }

  return params;
}

export default function ChapterPage({
  params,
}: {
  params: { lang: Language; testament: string; book: string; chapter: string };
}) {
  const { lang, testament, book: bookSlug, chapter: chapterStr } = params;
  const chapter = parseInt(chapterStr, 10);
  const book = findBook(lang, bookSlug);

  if (!book) {
    return <div className="p-8 text-center text-[var(--muted)]">Livro nao encontrado.</div>;
  }

  const testamentKey = book.testament;
  const content = getChapterContent(lang, testamentKey, bookSlug, chapter);

  // Navigation
  const prevChapter = chapter > 1 ? chapter - 1 : null;
  const nextChapter = chapter < book.chapters ? chapter + 1 : null;

  const bookLabels: Record<Language, string> = {
    pt: 'Livros',
    en: 'Books',
    es: 'Libros',
  };

  return (
    <div>
      {/* Mobile header: back to books + language selector + dark mode */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <Link
          href={`/${lang}/`}
          className="text-[var(--accent)] font-sans text-sm flex items-center gap-1"
        >
          &larr; {bookLabels[lang]}
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {LANGUAGES.map((l) => (
              <Link
                key={l}
                href={`/${l}/${LANG_CONFIG[l].testament[testamentKey]}/${book.names[l]}/1/`}
                className={`px-2 py-0.5 rounded text-xs font-sans ${
                  l === lang ? 'bg-[var(--accent)] text-white' : 'text-[var(--muted)]'
                }`}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <DarkModeToggle />
        </div>
      </div>

      {/* Book title */}
      <h2 className="text-lg font-bold font-serif mb-3">{book.display[lang]}</h2>

      {/* Chapter navigation grid */}
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
        active="paraphrase"
        hasChainOfThought={chainOfThoughtExists(lang, testamentKey, bookSlug, chapter)}
      />

      {/* Content */}
      {content ? (
        <VerseReader content={content} bookName={book.display[lang]} chapter={chapter} />
      ) : (
        <div className="text-center py-16">
          <p className="text-[var(--muted)] text-lg mb-2">
            {lang === 'pt' ? 'Este capitulo ainda nao foi parafraseado.' :
             lang === 'es' ? 'Este capitulo aun no ha sido parafraseado.' :
             'This chapter has not been paraphrased yet.'}
          </p>
          <p className="text-sm text-[var(--muted)]">
            {book.display[lang]} {chapter}
          </p>
        </div>
      )}

      {/* Prev/Next */}
      <nav className="flex justify-between mt-12 pt-6 border-t border-[var(--border)] font-sans text-sm">
        {prevChapter ? (
          <Link href={`/${lang}/${testament}/${bookSlug}/${prevChapter}/`} className="text-[var(--accent)] hover:underline">
            &larr; {book.display[lang]} {prevChapter}
          </Link>
        ) : <span />}
        {nextChapter ? (
          <Link href={`/${lang}/${testament}/${bookSlug}/${nextChapter}/`} className="text-[var(--accent)] hover:underline">
            {book.display[lang]} {nextChapter} &rarr;
          </Link>
        ) : <span />}
      </nav>
    </div>
  );
}

