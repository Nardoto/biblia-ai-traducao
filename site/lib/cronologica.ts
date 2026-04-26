import fs from 'fs';
import path from 'path';
import type { Language } from './bible-data';

const FOLDER_BY_LANG: Record<Language, string> = {
  pt: 'cronologica',
  en: 'chronological',
  es: 'cronologica',
};

export function getCronologicaChapterContent(lang: Language, slug: string): string | null {
  const folder = FOLDER_BY_LANG[lang];
  const filePath = path.join(
    process.cwd(),
    '..',
    'parafrase',
    lang,
    folder,
    `${slug}.md`
  );
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    if (!content.trim()) return null;
    return content;
  } catch {
    return null;
  }
}

export function cronologicaChapterExists(lang: Language, slug: string): boolean {
  return getCronologicaChapterContent(lang, slug) !== null;
}
