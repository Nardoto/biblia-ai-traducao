import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Biblia Parafrase - AI',
  description: 'Parafrase da Biblia em portugues, ingles e espanhol, criada com IA a partir dos textos originais.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var t = localStorage.getItem('theme');
            if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            }
          })();
        `}} />
      </head>
      <body className="font-serif antialiased">
        {children}
      </body>
    </html>
  );
}
