import fs from 'fs';
import path from 'path';
import { LANG_CONFIG, type Language } from './bible-data';

export function getChapterContent(
  lang: Language,
  testament: 'nt' | 'ot',
  bookSlug: string,
  chapter: number
): string | null {
  const testamentFolder = LANG_CONFIG[lang].testament[testament];
  const chapterStr = chapter.toString().padStart(2, '0');
  const filePath = path.join(
    process.cwd(),
    '..',
    'parafrase',
    lang,
    testamentFolder,
    bookSlug,
    `${chapterStr}.md`
  );
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    if (!content.trim()) return null;
    return content;
  } catch {
    return null;
  }
}

export function chapterExists(
  lang: Language,
  testament: 'nt' | 'ot',
  bookSlug: string,
  chapter: number
): boolean {
  const testamentFolder = LANG_CONFIG[lang].testament[testament];
  const chapterStr = chapter.toString().padStart(2, '0');
  const filePath = path.join(
    process.cwd(),
    '..',
    'parafrase',
    lang,
    testamentFolder,
    bookSlug,
    `${chapterStr}.md`
  );
  try {
    const stat = fs.statSync(filePath);
    return stat.size > 0;
  } catch {
    return false;
  }
}
