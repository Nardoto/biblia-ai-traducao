import Link from 'next/link';
import { LANGUAGES, LANG_CONFIG } from '@/lib/bible-data';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-2 font-serif">Biblia Parafrase</h1>
      <p className="text-[var(--muted)] mb-8 text-center max-w-md">
        Parafrase da Biblia criada com IA a partir dos textos originais em grego e hebraico.
      </p>
      <div className="flex gap-4">
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
    </main>
  );
}
