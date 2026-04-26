import Link from 'next/link';
import { LANG_CONFIG, LANGUAGES, getBooksByTestament, getTestamentLabel, type Language } from '@/lib/bible-data';
import { bookHasContent, countBookChapters } from '@/lib/markdown';
import DarkModeToggle from '@/components/DarkModeToggle';

export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

export default function LangHome({ params }: { params: { lang: Language } }) {
  const lang = params.lang;
  const config = LANG_CONFIG[lang];
  const ntBooks = getBooksByTestament('nt');
  const otBooks = getBooksByTestament('ot');

  const titles: Record<Language, string> = {
    pt: 'Escolha um livro',
    en: 'Choose a book',
    es: 'Elige un libro',
  };

  const renderBook = (book: typeof ntBooks[0], testament: 'nt' | 'ot') => {
    const hasContent = bookHasContent(lang, book);
    const chapCount = hasContent ? countBookChapters(lang, book) : 0;
    const testamentSlug = config.testament[testament];

    if (!hasContent) {
      return (
        <span
          key={book.id}
          className="px-3 py-2.5 rounded-lg text-sm font-sans text-[var(--muted)] opacity-40 cursor-default"
        >
          {book.display[lang]}
        </span>
      );
    }

    return (
      <Link
        key={book.id}
        href={`/${lang}/${testamentSlug}/${book.names[lang]}/1/`}
        className="px-3 py-2.5 rounded-lg border border-[var(--accent-soft)] bg-[var(--accent-bg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition text-sm font-sans"
      >
        <span>{book.display[lang]}</span>
        <span className="ml-1.5 text-xs text-[var(--muted)]">{chapCount}/{book.chapters}</span>
      </Link>
    );
  };

  return (
    <div>
      {/* Language selector + dark mode */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-2">
          {LANGUAGES.map((l) => (
            <Link
              key={l}
              href={`/${l}/`}
              className={`px-3 py-1.5 rounded font-sans text-sm font-medium transition ${
                l === lang
                  ? 'bg-[var(--accent)] text-white'
                  : 'border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              {LANG_CONFIG[l].label}
            </Link>
          ))}
        </div>
        <DarkModeToggle />
      </div>

      <h1 className="text-2xl font-bold mb-8 font-serif">{titles[lang]}</h1>

      {/* Bíblia Cronológica (beta) — destaque pra ser visível no celular */}
      <Link
        href={`/${lang}/cronologica/evangelhos-mapa/`}
        className="block mb-10 p-4 rounded-lg border border-[var(--accent-soft)] bg-[var(--accent-bg)] hover:border-[var(--accent)] hover:bg-[var(--accent-bg)]/70 transition group"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-sans font-bold uppercase tracking-wide text-[var(--accent)]">
                {lang === 'pt' ? 'Novo' : lang === 'en' ? 'New' : 'Nuevo'}
              </span>
              <span className="text-[10px] font-sans uppercase tracking-wide text-[var(--muted)]">
                beta
              </span>
            </div>
            <h2 className="font-serif font-bold text-lg leading-tight mb-1">
              {lang === 'pt'
                ? 'Bíblia Cronológica'
                : lang === 'en'
                  ? 'Chronological Bible'
                  : 'Biblia Cronológica'}
            </h2>
            <p className="text-sm text-[var(--muted)] leading-snug">
              {lang === 'pt'
                ? 'Mapa da fusão dos 4 evangelhos em construção — venha ver e opinar'
                : lang === 'en'
                  ? '4-gospel harmony map under construction — come see and review'
                  : 'Mapa de la armonía de los 4 evangelios en construcción — ven a ver y opinar'}
            </p>
          </div>
          <span className="text-[var(--accent)] text-xl group-hover:translate-x-0.5 transition">→</span>
        </div>
      </Link>

      {/* New Testament */}
      <section className="mb-10">
        <h2 className="text-xs font-sans font-bold uppercase tracking-wide text-[var(--muted)] mb-4 border-b border-[var(--border)] pb-2">
          {getTestamentLabel(lang, 'nt')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ntBooks.map((book) => renderBook(book, 'nt'))}
        </div>
      </section>

      {/* Old Testament */}
      <section>
        <h2 className="text-xs font-sans font-bold uppercase tracking-wide text-[var(--muted)] mb-4 border-b border-[var(--border)] pb-2">
          {getTestamentLabel(lang, 'ot')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {otBooks.map((book) => renderBook(book, 'ot'))}
        </div>
      </section>
    </div>
  );
}
