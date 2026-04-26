import { BOOKS, type Language } from './bible-data';

// Mapa de aliases (abreviações + nomes completos PT/EN/ES) → book.id
// Cobre PT (foco principal), EN e ES.
// Importante: chaves em lowercase. Nomes compostos (1 Coríntios) devem aparecer
// inteiros aqui — a regex tenta os mais longos primeiro.
const BOOK_ALIASES: Record<string, string> = {
  // ===== NT =====
  // Mateus
  'mt': 'matthew', 'mateus': 'matthew', 'matthew': 'matthew', 'mateo': 'matthew',
  // Marcos
  'mc': 'mark', 'marcos': 'mark', 'mark': 'mark', 'mk': 'mark',
  // Lucas
  'lc': 'luke', 'lucas': 'luke', 'luke': 'luke', 'lk': 'luke',
  // João
  'jo': 'john', 'joão': 'john', 'joao': 'john', 'john': 'john', 'juan': 'john', 'jn': 'john',
  // Atos
  'at': 'acts', 'atos': 'acts', 'acts': 'acts', 'hechos': 'acts',
  // Romanos
  'rm': 'romans', 'romanos': 'romans', 'romans': 'romans', 'rom': 'romans',
  // 1 Coríntios
  '1co': '1corinthians', '1cor': '1corinthians',
  '1 coríntios': '1corinthians', '1coríntios': '1corinthians',
  '1 corintios': '1corinthians', '1corintios': '1corinthians',
  '1 corinthians': '1corinthians', '1corinthians': '1corinthians',
  // 2 Coríntios
  '2co': '2corinthians', '2cor': '2corinthians',
  '2 coríntios': '2corinthians', '2coríntios': '2corinthians',
  '2 corintios': '2corinthians', '2corintios': '2corinthians',
  '2 corinthians': '2corinthians', '2corinthians': '2corinthians',
  // Gálatas
  'gl': 'galatians', 'gálatas': 'galatians', 'galatas': 'galatians',
  'galatians': 'galatians', 'gal': 'galatians',
  // Efésios
  'ef': 'ephesians', 'efésios': 'ephesians', 'efesios': 'ephesians',
  'ephesians': 'ephesians', 'eph': 'ephesians',
  // Filipenses
  'fp': 'philippians', 'filipenses': 'philippians',
  'philippians': 'philippians', 'phil': 'philippians',
  // Colossenses
  'cl': 'colossians', 'colossenses': 'colossians', 'colosenses': 'colossians',
  'colossians': 'colossians', 'col': 'colossians',
  // 1 Tessalonicenses
  '1ts': '1thessalonians', '1tess': '1thessalonians',
  '1 tessalonicenses': '1thessalonians', '1tessalonicenses': '1thessalonians',
  '1 tesalonicenses': '1thessalonians', '1tesalonicenses': '1thessalonians',
  '1 thessalonians': '1thessalonians', '1thessalonians': '1thessalonians',
  // 2 Tessalonicenses
  '2ts': '2thessalonians', '2tess': '2thessalonians',
  '2 tessalonicenses': '2thessalonians', '2tessalonicenses': '2thessalonians',
  '2 tesalonicenses': '2thessalonians', '2tesalonicenses': '2thessalonians',
  '2 thessalonians': '2thessalonians', '2thessalonians': '2thessalonians',
  // 1 Timóteo
  '1tm': '1timothy', '1tim': '1timothy',
  '1 timóteo': '1timothy', '1timóteo': '1timothy',
  '1 timoteo': '1timothy', '1timoteo': '1timothy',
  '1 timothy': '1timothy', '1timothy': '1timothy',
  // 2 Timóteo
  '2tm': '2timothy', '2tim': '2timothy',
  '2 timóteo': '2timothy', '2timóteo': '2timothy',
  '2 timoteo': '2timothy', '2timoteo': '2timothy',
  '2 timothy': '2timothy', '2timothy': '2timothy',
  // Tito
  'tt': 'titus', 'tito': 'titus', 'titus': 'titus', 'tit': 'titus',
  // Filêmon
  'fm': 'philemon', 'filemom': 'philemon', 'filêmon': 'philemon', 'filemon': 'philemon',
  'philemon': 'philemon', 'phlm': 'philemon',
  // Hebreus
  'hb': 'hebrews', 'hebreus': 'hebrews', 'hebreos': 'hebrews',
  'hebrews': 'hebrews', 'heb': 'hebrews',
  // Tiago
  'tg': 'james', 'tiago': 'james', 'santiago': 'james', 'james': 'james', 'jas': 'james',
  // 1 Pedro
  '1pe': '1peter', '1pet': '1peter',
  '1 pedro': '1peter', '1pedro': '1peter',
  '1 peter': '1peter', '1peter': '1peter',
  // 2 Pedro
  '2pe': '2peter', '2pet': '2peter',
  '2 pedro': '2peter', '2pedro': '2peter',
  '2 peter': '2peter', '2peter': '2peter',
  // 1 João
  '1jo': '1john',
  '1 joão': '1john', '1joão': '1john', '1 joao': '1john', '1joao': '1john',
  '1 juan': '1john', '1juan': '1john',
  '1 john': '1john', '1john': '1john', '1jn': '1john',
  // 2 João
  '2jo': '2john',
  '2 joão': '2john', '2joão': '2john', '2 joao': '2john', '2joao': '2john',
  '2 juan': '2john', '2juan': '2john',
  '2 john': '2john', '2john': '2john', '2jn': '2john',
  // 3 João
  '3jo': '3john',
  '3 joão': '3john', '3joão': '3john', '3 joao': '3john', '3joao': '3john',
  '3 juan': '3john', '3juan': '3john',
  '3 john': '3john', '3john': '3john', '3jn': '3john',
  // Judas (epístola)
  'jd': 'jude', 'judas': 'jude', 'jude': 'jude',
  // Apocalipse
  'ap': 'revelation', 'apocalipse': 'revelation', 'apocalipsis': 'revelation',
  'revelation': 'revelation', 'rev': 'revelation',
  // ===== AT =====
  // Gênesis
  'gn': 'genesis', 'gen': 'genesis',
  'gênesis': 'genesis', 'genesis': 'genesis',
  // Êxodo
  'êx': 'exodus', 'ex': 'exodus', 'exo': 'exodus',
  'êxodo': 'exodus', 'exodo': 'exodus', 'exodus': 'exodus',
  // Levítico
  'lv': 'leviticus', 'lev': 'leviticus',
  'levítico': 'leviticus', 'levitico': 'leviticus', 'leviticus': 'leviticus',
  // Números
  'nm': 'numbers', 'num': 'numbers',
  'números': 'numbers', 'numeros': 'numbers', 'numbers': 'numbers',
  // Deuteronômio
  'dt': 'deuteronomy', 'deut': 'deuteronomy',
  'deuteronômio': 'deuteronomy', 'deuteronomio': 'deuteronomy',
  'deuteronomy': 'deuteronomy',
  // Josué
  'js': 'joshua', 'josh': 'joshua',
  'josué': 'joshua', 'josue': 'joshua', 'joshua': 'joshua',
  // Juízes
  'jz': 'judges', 'judg': 'judges',
  'juízes': 'judges', 'juizes': 'judges', 'judges': 'judges', 'jueces': 'judges',
  // Rute
  'rt': 'ruth', 'rute': 'ruth', 'ruth': 'ruth', 'rut': 'ruth',
  // 1 Samuel
  '1sm': '1samuel', '1sam': '1samuel',
  '1 samuel': '1samuel', '1samuel': '1samuel',
  // 2 Samuel
  '2sm': '2samuel', '2sam': '2samuel',
  '2 samuel': '2samuel', '2samuel': '2samuel',
  // 1 Reis
  '1rs': '1kings', '1kgs': '1kings',
  '1 reis': '1kings', '1reis': '1kings',
  '1 reyes': '1kings', '1reyes': '1kings',
  '1 kings': '1kings', '1kings': '1kings',
  // 2 Reis
  '2rs': '2kings', '2kgs': '2kings',
  '2 reis': '2kings', '2reis': '2kings',
  '2 reyes': '2kings', '2reyes': '2kings',
  '2 kings': '2kings', '2kings': '2kings',
  // 1 Crônicas
  '1cr': '1chronicles', '1chr': '1chronicles', '1ch': '1chronicles',
  '1 crônicas': '1chronicles', '1crônicas': '1chronicles',
  '1 cronicas': '1chronicles', '1cronicas': '1chronicles',
  '1 chronicles': '1chronicles', '1chronicles': '1chronicles',
  // 2 Crônicas
  '2cr': '2chronicles', '2chr': '2chronicles', '2ch': '2chronicles',
  '2 crônicas': '2chronicles', '2crônicas': '2chronicles',
  '2 cronicas': '2chronicles', '2cronicas': '2chronicles',
  '2 chronicles': '2chronicles', '2chronicles': '2chronicles',
  // Esdras
  'ed': 'ezra', 'esdras': 'ezra', 'ezra': 'ezra',
  // Neemias
  'ne': 'nehemiah', 'neh': 'nehemiah',
  'neemias': 'nehemiah', 'nehemías': 'nehemiah', 'nehemiah': 'nehemiah',
  // Ester
  'et': 'esther', 'esth': 'esther',
  'ester': 'esther', 'esther': 'esther',
  // Jó (livro)
  'jó': 'job', 'job': 'job',
  // Salmos
  'sl': 'psalms', 'sal': 'psalms', 'ps': 'psalms', 'psa': 'psalms',
  'salmo': 'psalms', 'salmos': 'psalms', 'psalm': 'psalms', 'psalms': 'psalms',
  // Provérbios
  'pv': 'proverbs', 'prov': 'proverbs',
  'provérbios': 'proverbs', 'proverbios': 'proverbs', 'proverbs': 'proverbs',
  // Eclesiastes
  'ec': 'ecclesiastes', 'ecl': 'ecclesiastes', 'eccl': 'ecclesiastes',
  'eclesiastes': 'ecclesiastes', 'ecclesiastes': 'ecclesiastes',
  // Cantares
  'ct': 'song-of-solomon',
  'cantares': 'song-of-solomon',
  'song of solomon': 'song-of-solomon', 'song': 'song-of-solomon',
  // Isaías
  'is': 'isaiah', 'isa': 'isaiah',
  'isaías': 'isaiah', 'isaias': 'isaiah', 'isaiah': 'isaiah',
  // Jeremias
  'jr': 'jeremiah', 'jer': 'jeremiah',
  'jeremias': 'jeremiah', 'jeremiah': 'jeremiah',
  // Lamentações
  'lm': 'lamentations', 'lam': 'lamentations',
  'lamentações': 'lamentations', 'lamentacoes': 'lamentations',
  'lamentaciones': 'lamentations', 'lamentations': 'lamentations',
  // Ezequiel
  'ez': 'ezekiel', 'ezeq': 'ezekiel', 'ezek': 'ezekiel',
  'ezequiel': 'ezekiel', 'ezekiel': 'ezekiel',
  // Daniel
  'dn': 'daniel', 'dan': 'daniel', 'daniel': 'daniel',
  // Oseias
  'os': 'hosea', 'hos': 'hosea',
  'oseias': 'hosea', 'oseas': 'hosea', 'hosea': 'hosea',
  // Joel
  'jl': 'joel', 'joel': 'joel',
  // Amós
  'am': 'amos', 'amós': 'amos', 'amos': 'amos',
  // Obadias
  'ob': 'obadiah', 'obad': 'obadiah',
  'obadias': 'obadiah', 'abdias': 'obadiah', 'obadiah': 'obadiah',
  // Jonas
  'jon': 'jonah', 'jonas': 'jonah', 'jonah': 'jonah',
  // Miqueias
  'mq': 'micah', 'mic': 'micah',
  'miqueias': 'micah', 'miqueas': 'micah', 'micah': 'micah',
  // Naum
  'na': 'nahum', 'nah': 'nahum',
  'naum': 'nahum', 'nahum': 'nahum',
  // Habacuque
  'hc': 'habakkuk', 'hab': 'habakkuk',
  'habacuque': 'habakkuk', 'habacuc': 'habakkuk', 'habakkuk': 'habakkuk',
  // Sofonias
  'sf': 'zephaniah', 'zeph': 'zephaniah',
  'sofonias': 'zephaniah', 'zephaniah': 'zephaniah',
  // Ageu
  'ag': 'haggai', 'hag': 'haggai',
  'ageu': 'haggai', 'hageo': 'haggai', 'haggai': 'haggai',
  // Zacarias
  'zc': 'zechariah', 'zech': 'zechariah',
  'zacarias': 'zechariah', 'zechariah': 'zechariah',
  // Malaquias
  'ml': 'malachi', 'mal': 'malachi',
  'malaquias': 'malachi', 'malachi': 'malachi',
};

const TESTAMENT_FOLDERS: Record<Language, { ot: string; nt: string }> = {
  pt: { ot: 'antigo-testamento', nt: 'novo-testamento' },
  en: { ot: 'old-testament', nt: 'new-testament' },
  es: { ot: 'antiguo-testamento', nt: 'nuevo-testamento' },
};

let cachedRegex: RegExp | null = null;
function getRegex(): RegExp {
  if (cachedRegex) return cachedRegex;
  // Mais longos primeiro para evitar match parcial (ex: "1 Coríntios" antes de "1Co")
  const aliases = Object.keys(BOOK_ALIASES).sort((a, b) => b.length - a.length);
  const escaped = aliases.map(a => a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  // Prefixo: início de string OU caractere não-alfanumérico (inclui acentos)
  // Captura: alias + espaço + capítulo + opcional :versículos (com ranges/listas)
  cachedRegex = new RegExp(
    `(^|[^A-Za-z0-9À-ÿ])(${escaped.join('|')})\\s+(\\d+)(?::(\\d+(?:\\s*[\\-–,]\\s*\\d+)*))?`,
    'gi'
  );
  return cachedRegex;
}

export function linkifyBibleRefs(text: string, lang: Language): string {
  return text.replace(getRegex(), (match, prefix, alias, chap, verses) => {
    const key = alias.toLowerCase().trim();
    const bookId = BOOK_ALIASES[key];
    if (!bookId) return match;
    const book = BOOKS.find(b => b.id === bookId);
    if (!book) return match;

    const chapNum = parseInt(chap, 10);
    if (chapNum < 1 || chapNum > book.chapters) return match;

    const slug = book.names[lang];
    const testFolder = TESTAMENT_FOLDERS[lang][book.testament];
    const url = `/${lang}/${testFolder}/${slug}/${chapNum}/`;

    const refText = verses ? `${alias} ${chap}:${verses}` : `${alias} ${chap}`;
    return `${prefix}<a href="${url}" class="bible-ref">${refText}</a>`;
  });
}
