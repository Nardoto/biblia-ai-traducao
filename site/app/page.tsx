import Link from 'next/link';
import { LANGUAGES, LANG_CONFIG } from '@/lib/bible-data';
import Logo from '@/components/Logo';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <Logo size={56} />
      <h1 className="text-3xl font-bold mb-1 mt-4 font-serif">Bíblia Livre AI</h1>
      <p className="text-[var(--muted)] mb-8 text-center max-w-lg text-sm leading-relaxed">
        Paráfrase da Bíblia criada com IA a partir dos textos originais em grego e hebraico.<br />
        Código aberto. Uso livre. Transparência total.
      </p>
      <div className="flex gap-4 mb-6">
        {LANGUAGES.map((lang) => (
          <Link
            key={lang}
            href={`/${lang}/`}
            className="px-6 py-3 rounded-lg bg-[var(--accent)] text-white font-sans font-medium hover:opacity-90 transition"
          >
            {LANG_CONFIG[lang].label}
          </Link>
        ))}
      </div>
      <div className="flex gap-4 text-xs font-sans text-[var(--muted)]">
        <Link href="/pt/sobre/" className="hover:text-[var(--accent)] transition">Sobre</Link>
        <span>·</span>
        <Link href="/pt/metodologia/" className="hover:text-[var(--accent)] transition">Metodologia</Link>
        <span>·</span>
        <a href="https://github.com/Nardoto/biblia-ai-traducao" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition">GitHub</a>
      </div>
    </main>
  );
}
