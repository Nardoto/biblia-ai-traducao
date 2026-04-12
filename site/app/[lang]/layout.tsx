import Link from 'next/link';
import { BOOKS, LANG_CONFIG, LANGUAGES, getBooksByTestament, getTestamentLabel, type Language } from '@/lib/bible-data';

export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Language };
}) {
  const lang = params.lang;
  const config = LANG_CONFIG[lang];
  const ntBooks = getBooksByTestament('nt');
  const otBooks = getBooksByTestament('ot');

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 border-r border-[var(--border)] p-4 overflow-y-auto h-screen sticky top-0">
        {/* Language selector */}
        <div className="flex gap-2 mb-6">
          {LANGUAGES.map((l) => (
            <Link
              key={l}
              href={`/${l}/${LANG_CONFIG[l].testament.nt}/${ntBooks[0].names[l]}/1/`}
              className={`px-2 py-1 rounded text-sm font-sans ${l === lang ? 'bg-[var(--accent)] text-white' : 'text-[var(--muted)] hover:text-[var(--text)]'}`}
            >
              {l.toUpperCase()}
            </Link>
          ))}
        </div>

        {/* NT */}
        <h3 className="text-xs font-sans font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
          {getTestamentLabel(lang, 'nt')}
        </h3>
        <ul className="space-y-1 mb-6">
          {ntBooks.map((book) => (
            <li key={book.id}>
              <Link
                href={`/${lang}/${config.testament.nt}/${book.names[lang]}/1/`}
                className="text-sm hover:text-[var(--accent)] transition"
              >
                {book.display[lang]}
              </Link>
            </li>
          ))}
        </ul>

        {/* OT */}
        <h3 className="text-xs font-sans font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
          {getTestamentLabel(lang, 'ot')}
        </h3>
        <ul className="space-y-1">
          {otBooks.map((book) => (
            <li key={book.id}>
              <Link
                href={`/${lang}/${config.testament.ot}/${book.names[lang]}/1/`}
                className="text-sm hover:text-[var(--accent)] transition"
              >
                {book.display[lang]}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 md:px-8">
        {children}
      </main>
    </div>
  );
}
