export const LANGUAGES = ['pt', 'en', 'es'] as const;
export type Language = (typeof LANGUAGES)[number];

export const LANG_CONFIG: Record<Language, { label: string; testament: { ot: string; nt: string } }> = {
  pt: { label: 'Portugues', testament: { ot: 'antigo-testamento', nt: 'novo-testamento' } },
  en: { label: 'English', testament: { ot: 'old-testament', nt: 'new-testament' } },
  es: { label: 'Espanol', testament: { ot: 'antiguo-testamento', nt: 'nuevo-testamento' } },
};

export interface Book {
  id: string;
  chapters: number;
  testament: 'nt' | 'ot';
  names: Record<Language, string>;
  display: Record<Language, string>;
}

export const BOOKS: Book[] = [
  // NT
  { id: 'matthew', chapters: 28, testament: 'nt', names: { pt: 'mateus', en: 'matthew', es: 'mateo' }, display: { pt: 'Mateus', en: 'Matthew', es: 'Mateo' } },
  { id: 'mark', chapters: 16, testament: 'nt', names: { pt: 'marcos', en: 'mark', es: 'marcos' }, display: { pt: 'Marcos', en: 'Mark', es: 'Marcos' } },
  { id: 'luke', chapters: 24, testament: 'nt', names: { pt: 'lucas', en: 'luke', es: 'lucas' }, display: { pt: 'Lucas', en: 'Luke', es: 'Lucas' } },
  { id: 'john', chapters: 21, testament: 'nt', names: { pt: 'joao', en: 'john', es: 'juan' }, display: { pt: 'Joao', en: 'John', es: 'Juan' } },
  { id: 'acts', chapters: 28, testament: 'nt', names: { pt: 'atos', en: 'acts', es: 'hechos' }, display: { pt: 'Atos', en: 'Acts', es: 'Hechos' } },
  { id: 'romans', chapters: 16, testament: 'nt', names: { pt: 'romanos', en: 'romans', es: 'romanos' }, display: { pt: 'Romanos', en: 'Romans', es: 'Romanos' } },
  { id: '1corinthians', chapters: 16, testament: 'nt', names: { pt: '1corintios', en: '1corinthians', es: '1corintios' }, display: { pt: '1 Corintios', en: '1 Corinthians', es: '1 Corintios' } },
  { id: '2corinthians', chapters: 13, testament: 'nt', names: { pt: '2corintios', en: '2corinthians', es: '2corintios' }, display: { pt: '2 Corintios', en: '2 Corinthians', es: '2 Corintios' } },
  { id: 'galatians', chapters: 6, testament: 'nt', names: { pt: 'galatas', en: 'galatians', es: 'galatas' }, display: { pt: 'Galatas', en: 'Galatians', es: 'Galatas' } },
  { id: 'ephesians', chapters: 6, testament: 'nt', names: { pt: 'efesios', en: 'ephesians', es: 'efesios' }, display: { pt: 'Efesios', en: 'Ephesians', es: 'Efesios' } },
  { id: 'philippians', chapters: 4, testament: 'nt', names: { pt: 'filipenses', en: 'philippians', es: 'filipenses' }, display: { pt: 'Filipenses', en: 'Philippians', es: 'Filipenses' } },
  { id: 'colossians', chapters: 4, testament: 'nt', names: { pt: 'colossenses', en: 'colossians', es: 'colosenses' }, display: { pt: 'Colossenses', en: 'Colossians', es: 'Colosenses' } },
  { id: '1thessalonians', chapters: 5, testament: 'nt', names: { pt: '1tessalonicenses', en: '1thessalonians', es: '1tesalonicenses' }, display: { pt: '1 Tessalonicenses', en: '1 Thessalonians', es: '1 Tesalonicenses' } },
  { id: '2thessalonians', chapters: 3, testament: 'nt', names: { pt: '2tessalonicenses', en: '2thessalonians', es: '2tesalonicenses' }, display: { pt: '2 Tessalonicenses', en: '2 Thessalonians', es: '2 Tesalonicenses' } },
  { id: '1timothy', chapters: 6, testament: 'nt', names: { pt: '1timoteo', en: '1timothy', es: '1timoteo' }, display: { pt: '1 Timoteo', en: '1 Timothy', es: '1 Timoteo' } },
  { id: '2timothy', chapters: 4, testament: 'nt', names: { pt: '2timoteo', en: '2timothy', es: '2timoteo' }, display: { pt: '2 Timoteo', en: '2 Timothy', es: '2 Timoteo' } },
  { id: 'titus', chapters: 3, testament: 'nt', names: { pt: 'tito', en: 'titus', es: 'tito' }, display: { pt: 'Tito', en: 'Titus', es: 'Tito' } },
  { id: 'philemon', chapters: 1, testament: 'nt', names: { pt: 'filemom', en: 'philemon', es: 'filemon' }, display: { pt: 'Filemom', en: 'Philemon', es: 'Filemon' } },
  { id: 'hebrews', chapters: 13, testament: 'nt', names: { pt: 'hebreus', en: 'hebrews', es: 'hebreos' }, display: { pt: 'Hebreus', en: 'Hebrews', es: 'Hebreos' } },
  { id: 'james', chapters: 5, testament: 'nt', names: { pt: 'tiago', en: 'james', es: 'santiago' }, display: { pt: 'Tiago', en: 'James', es: 'Santiago' } },
  { id: '1peter', chapters: 5, testament: 'nt', names: { pt: '1pedro', en: '1peter', es: '1pedro' }, display: { pt: '1 Pedro', en: '1 Peter', es: '1 Pedro' } },
  { id: '2peter', chapters: 3, testament: 'nt', names: { pt: '2pedro', en: '2peter', es: '2pedro' }, display: { pt: '2 Pedro', en: '2 Peter', es: '2 Pedro' } },
  { id: '1john', chapters: 5, testament: 'nt', names: { pt: '1joao', en: '1john', es: '1juan' }, display: { pt: '1 Joao', en: '1 John', es: '1 Juan' } },
  { id: '2john', chapters: 1, testament: 'nt', names: { pt: '2joao', en: '2john', es: '2juan' }, display: { pt: '2 Joao', en: '2 John', es: '2 Juan' } },
  { id: '3john', chapters: 1, testament: 'nt', names: { pt: '3joao', en: '3john', es: '3juan' }, display: { pt: '3 Joao', en: '3 John', es: '3 Juan' } },
  { id: 'jude', chapters: 1, testament: 'nt', names: { pt: 'judas', en: 'jude', es: 'judas' }, display: { pt: 'Judas', en: 'Jude', es: 'Judas' } },
  { id: 'revelation', chapters: 22, testament: 'nt', names: { pt: 'apocalipse', en: 'revelation', es: 'apocalipsis' }, display: { pt: 'Apocalipse', en: 'Revelation', es: 'Apocalipsis' } },
  // OT
  { id: 'genesis', chapters: 50, testament: 'ot', names: { pt: 'genesis', en: 'genesis', es: 'genesis' }, display: { pt: 'Genesis', en: 'Genesis', es: 'Genesis' } },
  { id: 'exodus', chapters: 40, testament: 'ot', names: { pt: 'exodo', en: 'exodus', es: 'exodo' }, display: { pt: 'Exodo', en: 'Exodus', es: 'Exodo' } },
  { id: 'leviticus', chapters: 27, testament: 'ot', names: { pt: 'levitico', en: 'leviticus', es: 'levitico' }, display: { pt: 'Levitico', en: 'Leviticus', es: 'Levitico' } },
  { id: 'numbers', chapters: 36, testament: 'ot', names: { pt: 'numeros', en: 'numbers', es: 'numeros' }, display: { pt: 'Numeros', en: 'Numbers', es: 'Numeros' } },
  { id: 'deuteronomy', chapters: 34, testament: 'ot', names: { pt: 'deuteronomio', en: 'deuteronomy', es: 'deuteronomio' }, display: { pt: 'Deuteronomio', en: 'Deuteronomy', es: 'Deuteronomio' } },
  { id: 'joshua', chapters: 24, testament: 'ot', names: { pt: 'josue', en: 'joshua', es: 'josue' }, display: { pt: 'Josue', en: 'Joshua', es: 'Josue' } },
  { id: 'judges', chapters: 21, testament: 'ot', names: { pt: 'juizes', en: 'judges', es: 'jueces' }, display: { pt: 'Juizes', en: 'Judges', es: 'Jueces' } },
  { id: 'ruth', chapters: 4, testament: 'ot', names: { pt: 'rute', en: 'ruth', es: 'rut' }, display: { pt: 'Rute', en: 'Ruth', es: 'Rut' } },
  { id: '1samuel', chapters: 31, testament: 'ot', names: { pt: '1samuel', en: '1samuel', es: '1samuel' }, display: { pt: '1 Samuel', en: '1 Samuel', es: '1 Samuel' } },
  { id: '2samuel', chapters: 24, testament: 'ot', names: { pt: '2samuel', en: '2samuel', es: '2samuel' }, display: { pt: '2 Samuel', en: '2 Samuel', es: '2 Samuel' } },
  { id: '1kings', chapters: 22, testament: 'ot', names: { pt: '1reis', en: '1kings', es: '1reyes' }, display: { pt: '1 Reis', en: '1 Kings', es: '1 Reyes' } },
  { id: '2kings', chapters: 25, testament: 'ot', names: { pt: '2reis', en: '2kings', es: '2reyes' }, display: { pt: '2 Reis', en: '2 Kings', es: '2 Reyes' } },
  { id: '1chronicles', chapters: 29, testament: 'ot', names: { pt: '1cronicas', en: '1chronicles', es: '1cronicas' }, display: { pt: '1 Cronicas', en: '1 Chronicles', es: '1 Cronicas' } },
  { id: '2chronicles', chapters: 36, testament: 'ot', names: { pt: '2cronicas', en: '2chronicles', es: '2cronicas' }, display: { pt: '2 Cronicas', en: '2 Chronicles', es: '2 Cronicas' } },
  { id: 'ezra', chapters: 10, testament: 'ot', names: { pt: 'esdras', en: 'ezra', es: 'esdras' }, display: { pt: 'Esdras', en: 'Ezra', es: 'Esdras' } },
  { id: 'nehemiah', chapters: 13, testament: 'ot', names: { pt: 'neemias', en: 'nehemiah', es: 'nehemias' }, display: { pt: 'Neemias', en: 'Nehemiah', es: 'Nehemias' } },
  { id: 'esther', chapters: 10, testament: 'ot', names: { pt: 'ester', en: 'esther', es: 'ester' }, display: { pt: 'Ester', en: 'Esther', es: 'Ester' } },
  { id: 'job', chapters: 42, testament: 'ot', names: { pt: 'jo', en: 'job', es: 'job' }, display: { pt: 'Jo', en: 'Job', es: 'Job' } },
  { id: 'psalms', chapters: 150, testament: 'ot', names: { pt: 'salmos', en: 'psalms', es: 'salmos' }, display: { pt: 'Salmos', en: 'Psalms', es: 'Salmos' } },
  { id: 'proverbs', chapters: 31, testament: 'ot', names: { pt: 'proverbios', en: 'proverbs', es: 'proverbios' }, display: { pt: 'Proverbios', en: 'Proverbs', es: 'Proverbios' } },
  { id: 'ecclesiastes', chapters: 12, testament: 'ot', names: { pt: 'eclesiastes', en: 'ecclesiastes', es: 'eclesiastes' }, display: { pt: 'Eclesiastes', en: 'Ecclesiastes', es: 'Eclesiastes' } },
  { id: 'song-of-solomon', chapters: 8, testament: 'ot', names: { pt: 'cantares', en: 'song-of-solomon', es: 'cantares' }, display: { pt: 'Cantares', en: 'Song of Solomon', es: 'Cantares' } },
  { id: 'isaiah', chapters: 66, testament: 'ot', names: { pt: 'isaias', en: 'isaiah', es: 'isaias' }, display: { pt: 'Isaias', en: 'Isaiah', es: 'Isaias' } },
  { id: 'jeremiah', chapters: 52, testament: 'ot', names: { pt: 'jeremias', en: 'jeremiah', es: 'jeremias' }, display: { pt: 'Jeremias', en: 'Jeremiah', es: 'Jeremias' } },
  { id: 'lamentations', chapters: 5, testament: 'ot', names: { pt: 'lamentacoes', en: 'lamentations', es: 'lamentaciones' }, display: { pt: 'Lamentacoes', en: 'Lamentations', es: 'Lamentaciones' } },
  { id: 'ezekiel', chapters: 48, testament: 'ot', names: { pt: 'ezequiel', en: 'ezekiel', es: 'ezequiel' }, display: { pt: 'Ezequiel', en: 'Ezekiel', es: 'Ezequiel' } },
  { id: 'daniel', chapters: 12, testament: 'ot', names: { pt: 'daniel', en: 'daniel', es: 'daniel' }, display: { pt: 'Daniel', en: 'Daniel', es: 'Daniel' } },
  { id: 'hosea', chapters: 14, testament: 'ot', names: { pt: 'oseias', en: 'hosea', es: 'oseas' }, display: { pt: 'Oseias', en: 'Hosea', es: 'Oseas' } },
  { id: 'joel', chapters: 3, testament: 'ot', names: { pt: 'joel', en: 'joel', es: 'joel' }, display: { pt: 'Joel', en: 'Joel', es: 'Joel' } },
  { id: 'amos', chapters: 9, testament: 'ot', names: { pt: 'amos', en: 'amos', es: 'amos' }, display: { pt: 'Amos', en: 'Amos', es: 'Amos' } },
  { id: 'obadiah', chapters: 1, testament: 'ot', names: { pt: 'obadias', en: 'obadiah', es: 'abdias' }, display: { pt: 'Obadias', en: 'Obadiah', es: 'Abdias' } },
  { id: 'jonah', chapters: 4, testament: 'ot', names: { pt: 'jonas', en: 'jonah', es: 'jonas' }, display: { pt: 'Jonas', en: 'Jonah', es: 'Jonas' } },
  { id: 'micah', chapters: 7, testament: 'ot', names: { pt: 'miqueias', en: 'micah', es: 'miqueas' }, display: { pt: 'Miqueias', en: 'Micah', es: 'Miqueas' } },
  { id: 'nahum', chapters: 3, testament: 'ot', names: { pt: 'naum', en: 'nahum', es: 'nahum' }, display: { pt: 'Naum', en: 'Nahum', es: 'Nahum' } },
  { id: 'habakkuk', chapters: 3, testament: 'ot', names: { pt: 'habacuque', en: 'habakkuk', es: 'habacuc' }, display: { pt: 'Habacuque', en: 'Habakkuk', es: 'Habacuc' } },
  { id: 'zephaniah', chapters: 3, testament: 'ot', names: { pt: 'sofonias', en: 'zephaniah', es: 'sofonias' }, display: { pt: 'Sofonias', en: 'Zephaniah', es: 'Sofonias' } },
  { id: 'haggai', chapters: 2, testament: 'ot', names: { pt: 'ageu', en: 'haggai', es: 'hageo' }, display: { pt: 'Ageu', en: 'Haggai', es: 'Hageo' } },
  { id: 'zechariah', chapters: 14, testament: 'ot', names: { pt: 'zacarias', en: 'zechariah', es: 'zacarias' }, display: { pt: 'Zacarias', en: 'Zechariah', es: 'Zacarias' } },
  { id: 'malachi', chapters: 4, testament: 'ot', names: { pt: 'malaquias', en: 'malachi', es: 'malaquias' }, display: { pt: 'Malaquias', en: 'Malachi', es: 'Malaquias' } },
];

export function getBooksByTestament(testament: 'nt' | 'ot'): Book[] {
  return BOOKS.filter(b => b.testament === testament);
}

export function findBook(lang: Language, bookSlug: string): Book | undefined {
  return BOOKS.find(b => b.names[lang] === bookSlug);
}

export function getTestamentLabel(lang: Language, testament: 'nt' | 'ot'): string {
  const labels: Record<Language, Record<string, string>> = {
    pt: { nt: 'Novo Testamento', ot: 'Antigo Testamento' },
    en: { nt: 'New Testament', ot: 'Old Testament' },
    es: { nt: 'Nuevo Testamento', ot: 'Antiguo Testamento' },
  };
  return labels[lang][testament];
}
