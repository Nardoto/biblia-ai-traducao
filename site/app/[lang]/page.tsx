import Link from 'next/link';
import { LANG_CONFIG, LANGUAGES, getBooksByTestament, getTestamentLabel, type Language } from '@/lib/bible-data';
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

      {/* New Testament */}
      <section className="mb-10">
        <h2 className="text-xs font-sans font-bold uppercase tracking-wide text-[var(--muted)] mb-4 border-b border-[var(--border)] pb-2">
          {getTestamentLabel(lang, 'nt')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ntBooks.map((book) => (
            <Link
              key={book.id}
              href={`/${lang}/${config.testament.nt}/${book.names[lang]}/1/`}
              className="px-3 py-2.5 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition text-sm font-sans"
            >
              {book.display[lang]}
            </Link>
          ))}
        </div>
      </section>

      {/* Old Testament */}
      <section>
        <h2 className="text-xs font-sans font-bold uppercase tracking-wide text-[var(--muted)] mb-4 border-b border-[var(--border)] pb-2">
          {getTestamentLabel(lang, 'ot')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {otBooks.map((book) => (
            <Link
              key={book.id}
              href={`/${lang}/${config.testament.ot}/${book.names[lang]}/1/`}
              className="px-3 py-2.5 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition text-sm font-sans"
            >
              {book.display[lang]}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
