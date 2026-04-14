'use client';

import { useState, useMemo } from 'react';

interface Verse {
  number: number;
  text: string;
}

interface Note {
  id: string;
  verse: string;
  text: string;
}

interface ExpandedEntry {
  verse: string;
  title: string;
  content: string;
}

interface ExpandedNoteSection {
  category: string;
  entries: ExpandedEntry[];
}

// Converte numero pra sobrescrito Unicode (1 → ¹, 23 → ²³)
function toSuperscript(n: number): string {
  const map: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  };
  return String(n).split('').map(c => map[c] || c).join('');
}

const CATEGORY_LABELS: Record<string, string> = {
  'Linguística e Semântica': 'Linguística',
  'Contexto Histórico-Cultural': 'Histórico',
  'Crítica Textual': 'Textual',
  'Teologia e Debate Acadêmico': 'Teologia',
  'Referências Cruzadas e Intertextualidade': 'Referências',
};

function parseContent(markdown: string): { title: string; verses: Verse[]; notes: Note[] } {
  const lines = markdown.split('\n');
  let title = '';
  const verses: Verse[] = [];
  const notes: Note[] = [];
  let inNotes = false;
  let inExpanded = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('# ') && !trimmed.startsWith('## ')) {
      title = trimmed.slice(2);
      continue;
    }

    if (trimmed === '## Notas Expandidas' || trimmed === '## Expanded Notes') {
      inExpanded = true;
      continue;
    }

    if (trimmed === '## Notas' || trimmed === '## Notes') {
      inNotes = true;
      inExpanded = false;
      continue;
    }

    if (inExpanded) continue;

    if (inNotes && trimmed.startsWith('- v.')) {
      const noteMatch = trimmed.match(/^- v\.(\S+?):\s*(.+)$/);
      if (noteMatch) {
        notes.push({ id: noteMatch[1], verse: noteMatch[1], text: noteMatch[2] });
      }
      continue;
    }

    if (!inNotes) {
      const verseMatch = trimmed.match(/^\*\*(\d+)\*\*\s+(.+)/);
      if (verseMatch) {
        const num = parseInt(verseMatch[1], 10);
        const text = verseMatch[2];
        verses.push({ number: num, text });
      } else if (trimmed && !trimmed.startsWith('---') && !trimmed.startsWith('##') && verses.length > 0) {
        verses[verses.length - 1].text += ' ' + trimmed;
      }
    }
  }

  return { title, verses, notes };
}

function parseExpandedNotes(markdown: string): ExpandedNoteSection[] {
  const sections: ExpandedNoteSection[] = [];
  const lines = markdown.split('\n');
  let inExpanded = false;
  let currentSection: ExpandedNoteSection | null = null;
  let currentEntry: ExpandedEntry | null = null;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === '## Notas Expandidas' || trimmed === '## Expanded Notes') {
      inExpanded = true;
      continue;
    }

    if (!inExpanded) continue;

    // New top-level heading after expanded notes ends the section
    if (trimmed.startsWith('## ') && !trimmed.startsWith('### ') && !trimmed.startsWith('#### ')) {
      break;
    }

    // Category header: ### Linguística e Semântica
    if (trimmed.startsWith('### ') && !trimmed.startsWith('#### ')) {
      if (currentEntry && currentSection) {
        currentSection.entries.push(currentEntry);
        currentEntry = null;
      }
      if (currentSection) sections.push(currentSection);
      currentSection = { category: trimmed.slice(4), entries: [] };
      continue;
    }

    // Entry header: #### v.3 — ἄνωθεν (ánōthen)
    if (trimmed.startsWith('#### ')) {
      if (currentEntry && currentSection) {
        currentSection.entries.push(currentEntry);
      }
      const entryTitle = trimmed.slice(5);
      const verseMatch = entryTitle.match(/^v\.(\S+)/);
      currentEntry = {
        verse: verseMatch ? verseMatch[1] : '',
        title: entryTitle,
        content: '',
      };
      continue;
    }

    // Content lines within an entry
    if (currentEntry && trimmed) {
      currentEntry.content += (currentEntry.content ? '\n' : '') + trimmed;
    }
  }

  // Flush remaining
  if (currentEntry && currentSection) {
    currentSection.entries.push(currentEntry);
  }
  if (currentSection && currentSection.entries.length > 0) {
    sections.push(currentSection);
  }

  return sections;
}

function cleanText(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/[ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿ]/g, '');
}

function formatVerseHtml(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/[ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿ]/g, '<sup class="note-tag">$&</sup>');
}

export default function VerseReader({
  content,
  bookName,
  chapter,
}: {
  content: string;
  bookName: string;
  chapter: number;
}) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [showNote, setShowNote] = useState<string | null>(null);
  const [readingMode, setReadingMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('resumo');
  const { title, verses, notes } = useMemo(() => parseContent(content), [content]);
  const expandedSections = useMemo(() => parseExpandedNotes(content), [content]);

  const toggleVerse = (num: number) => {
    if (readingMode) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(num)) {
        next.delete(num);
      } else {
        next.add(num);
      }
      return next;
    });
  };

  const getSelectedText = () => {
    const sorted = Array.from(selected).sort((a, b) => a - b);
    const verseRanges = formatVerseRange(sorted);
    const text = sorted.map((n) => {
      const v = verses.find((v) => v.number === n);
      return v ? `${toSuperscript(n)}${cleanText(v.text)}` : '';
    }).join(' ');
    return `${bookName} ${chapter}:${verseRanges}\n\n${text}\n\n— Bíblia Paráfrase AI`;
  };

  // Formata ranges: [1,2,3,5,7,8] → "1-3,5,7-8"
  const formatVerseRange = (nums: number[]): string => {
    if (nums.length === 0) return '';
    const ranges: string[] = [];
    let start = nums[0];
    let end = nums[0];
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] === end + 1) {
        end = nums[i];
      } else {
        ranges.push(start === end ? String(start) : `${start}-${end}`);
        start = nums[i];
        end = nums[i];
      }
    }
    ranges.push(start === end ? String(start) : `${start}-${end}`);
    return ranges.join(',');
  };

  const handleShare = async () => {
    const text = getSelectedText();
    if (navigator.share) {
      await navigator.share({ text });
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  const clearSelection = () => setSelected(new Set());

  const getNotesForVerse = (verseNum: number): Note[] => {
    return notes.filter((n) => n.verse.startsWith(String(verseNum)));
  };

  // Modo leitura: texto corrido sem números
  if (readingMode) {
    const fullText = verses.map((v) => cleanText(v.text)).join(' ');
    return (
      <div className="verse-content">
        <div className="flex items-center justify-between mb-6">
          <h1 className="mb-0">{title || `${bookName} ${chapter}`}</h1>
          <button
            onClick={() => setReadingMode(false)}
            className="px-3 py-1.5 rounded-full text-xs font-sans border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] transition"
          >
            Versículos
          </button>
        </div>
        <p className="leading-[2.2] text-[1.15rem]">{fullText}</p>
      </div>
    );
  }

  return (
    <div className="verse-content">
      <div className="flex items-center justify-between mb-6">
        <h1 className="mb-0">{title || `${bookName} ${chapter}`}</h1>
        <button
          onClick={() => { setReadingMode(true); clearSelection(); }}
          className="px-3 py-1.5 rounded-full text-xs font-sans border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] transition"
        >
          Leitura
        </button>
      </div>

      <div>
        {verses.map((v) => {
          const verseNotes = getNotesForVerse(v.number);
          const isSelected = selected.has(v.number);
          return (
            <span key={v.number}>
              <span
                className={`verse-inline ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleVerse(v.number)}
              >
                <sup className="verse-num">{v.number}</sup>
                <span dangerouslySetInnerHTML={{ __html: formatVerseHtml(v.text) }} />
              </span>
              {verseNotes.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowNote(showNote === String(v.number) ? null : String(v.number));
                  }}
                  className="note-btn"
                  title="Ver nota"
                >
                  ✦
                </button>
              )}
              {showNote === String(v.number) && verseNotes.length > 0 && (
                <span className="note-inline">
                  {verseNotes.map((n, i) => (
                    <span key={i}>
                      {i > 0 && ' '}
                      <span className="font-medium text-[var(--note-tag)]">v.{n.verse}</span>: {n.text}
                    </span>
                  ))}
                </span>
              )}
              {' '}
            </span>
          );
        })}
      </div>

      {/* Notes section at bottom */}
      {notes.length > 0 && (
        <>
          <hr />
          <div className="notes-tabs">
            <button
              onClick={() => setActiveTab('resumo')}
              className={`notes-tab ${activeTab === 'resumo' ? 'active' : ''}`}
            >
              Resumo
            </button>
            {expandedSections.map((s) => (
              <button
                key={s.category}
                onClick={() => setActiveTab(s.category)}
                className={`notes-tab ${activeTab === s.category ? 'active' : ''}`}
              >
                {CATEGORY_LABELS[s.category] || s.category}
              </button>
            ))}
          </div>

          {activeTab === 'resumo' && (
            <>
              <h2>Notas</h2>
              <ul>
                {notes.map((n, i) => (
                  <li key={i}>
                    <span className="font-medium text-[var(--note-tag)] font-sans">v.{n.verse}</span>: {n.text}
                  </li>
                ))}
              </ul>
            </>
          )}

          {expandedSections.map((section) =>
            activeTab === section.category ? (
              <div key={section.category} className="expanded-notes">
                <h2>{section.category}</h2>
                {section.entries.map((entry, i) => (
                  <div key={i} className="expanded-entry">
                    <h3 className="expanded-entry-title">{entry.title}</h3>
                    <div className="expanded-entry-content">
                      {entry.content.split('\n').map((line, j) => (
                        <p key={j} dangerouslySetInnerHTML={{
                          __html: line
                            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\*(.+?)\*/g, '<em>$1</em>')
                        }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : null
          )}
        </>
      )}

      {/* Share bar */}
      {selected.size > 0 && (
        <div className="share-bar">
          <span>{selected.size} {selected.size === 1 ? 'versículo' : 'versículos'}</span>
          <button onClick={handleShare} className="underline underline-offset-2">
            Compartilhar
          </button>
          <button onClick={clearSelection} className="opacity-70 hover:opacity-100">
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
