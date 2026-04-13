import Link from 'next/link';

const labels = {
  pt: { about: 'Sobre', method: 'Metodologia', books: 'Livros', home: 'Início' },
  en: { about: 'About', method: 'Methodology', books: 'Books', home: 'Home' },
  es: { about: 'Acerca', method: 'Metodología', books: 'Libros', home: 'Inicio' },
} as const;

export default function SiteFooter({ lang }: { lang: 'pt' | 'en' | 'es' }) {
  const t = labels[lang];

  return (
    <footer className="mt-16 pt-6 border-t border-[var(--border)]">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-sans text-[var(--muted)]">
        <Link href={`/${lang}/`} className="hover:text-[var(--accent)] transition">{t.books}</Link>
        <span className="hidden sm:inline">·</span>
        <Link href={`/${lang}/sobre/`} className="hover:text-[var(--accent)] transition">{t.about}</Link>
        <span className="hidden sm:inline">·</span>
        <Link href={`/${lang}/metodologia/`} className="hover:text-[var(--accent)] transition">{t.method}</Link>
        <span className="hidden sm:inline">·</span>
        <a href="https://github.com/Nardoto/biblia-ai-traducao" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition">GitHub</a>
      </div>
      <p className="text-center text-[10px] text-[var(--muted)] mt-3 opacity-60">
        Bíblia Livre AI — CC0
      </p>
    </footer>
  );
}
