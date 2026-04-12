import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Biblia Parafrase - AI',
  description: 'Parafrase da Biblia em portugues, ingles e espanhol, criada com IA a partir dos textos originais.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="font-serif antialiased">
        {children}
      </body>
    </html>
  );
}
