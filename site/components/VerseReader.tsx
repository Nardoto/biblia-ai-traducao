'use client';

import { useState, useMemo } from 'react';

interface Verse {
  number: number;
  text: string;
  noteTags: string[];
}

interface Note {
  id: string;
  verse: string;
  text: string;
}

function parseContent(markdown: string): { title: string; verses: Verse[]; notes: Note[] } {
  const lines = markdown.split('\n');
  let title = '';
  const verses: Verse[] = [];
  const notes: Note[] = [];
  let inNotes = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Title
    if (trimmed.startsWith('# ') && !trimmed.startsWith('## ')) {
      title = trimmed.slice(2);
      continue;
    }

    // Notes section
    if (trimmed === '## Notas' || trimmed === '## Notes') {
      inNotes = true;
      continue;
    }

    if (inNotes && trimmed.startsWith('- v.')) {
      const noteMatch = trimmed.match(/^- v\.(\S+?):\s*(.+)$/);
      if (noteMatch) {
        notes.push({ id: noteMatch[1], verse: noteMatch[1], text: noteMatch[2] });
      }
      continue;
    }

    // Verses - match **N** pattern
    if (!inNotes) {
      const verseMatch = trimmed.match(/^\*\*(\d+)\*\*\s+(.+)/);
      if (verseMatch) {
        const num = parseInt(verseMatch[1], 10);
        const text = verseMatch[2];
        // Find note tags (superscript letters like ᵃ ᵇ ᶜ)
        const tags = text.match(/[ᵃᵇᶜᵈᵉᶠᵍʰⁱʲ]/g) || [];
        verses.push({ number: num, text, noteTags: tags });
      } else if (trimmed && !trimmed.startsWith('---') && !trimmed.startsWith('##') && verses.length > 0) {
        // Continuation of previous verse
        verses[verses.length - 1].text += ' ' + trimmed;
      }
    }
  }

  return { title, verses, notes };
}

function formatVerseHtml(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/[ᵃᵇᶜᵈᵉᶠᵍʰⁱʲ]/g, '<sup>$&</sup>');
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
  const { title, verses, notes } = useMemo(() => parseContent(content), [content]);

  const toggleVerse = (num: number) => {
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
    const selectedVerses = sorted.map((n) => {
      const v = verses.find((v) => v.number === n);
      return v ? `${n}. ${v.text.replace(/<[^>]+>/g, '').replace(/[ᵃᵇᶜᵈᵉᶠᵍʰⁱʲ]/g, '')}` : '';
    });
    return `${bookName} ${chapter}:${sorted.join(',')}\n\n${selectedVerses.join('\n')}\n\n— Biblia Parafrase AI`;
  };

  const handleShare = async () => {
    const text = getSelectedText();
    if (navigator.share) {
      await navigator.share({ text });
    } else {
      await navigator.clipboard.writeText(text);
      alert('Copiado!');
    }
  };

  const clearSelection = () => setSelected(new Set());

  // Find notes for a specific verse number
  const getNotesForVerse = (verseNum: number): Note[] => {
    return notes.filter((n) => n.verse.startsWith(String(verseNum)));
  };

  return (
    <div className="verse-content">
      <h1>{title || `${bookName} ${chapter}`}</h1>

      <div className="space-y-1">
        {verses.map((v) => {
          const verseNotes = getNotesForVerse(v.number);
          return (
            <div key={v.number}>
              <div
                className={`verse-line ${selected.has(v.number) ? 'selected' : ''}`}
                onClick={() => toggleVerse(v.number)}
              >
                <span dangerouslySetInnerHTML={{ __html: `<strong>${v.number}</strong> ${formatVerseHtml(v.text)}` }} />
                {verseNotes.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowNote(showNote === String(v.number) ? null : String(v.number));
                    }}
                    className="inline-block ml-1 w-5 h-5 rounded-full text-xs font-sans bg-[var(--accent-bg)] text-[var(--note-tag)] hover:bg-[var(--accent-soft)] transition"
                    title="Ver nota"
                  >
                    ?
                  </button>
                )}
              </div>
              {showNote === String(v.number) && verseNotes.length > 0 && (
                <div className="ml-4 mt-1 mb-2 p-3 rounded-lg bg-[var(--accent-bg)] text-sm text-[var(--muted)] font-sans leading-relaxed border-l-2 border-[var(--note-tag)]">
                  {verseNotes.map((n, i) => (
                    <p key={i} className={i > 0 ? 'mt-2' : ''}>
                      <span className="font-medium text-[var(--note-tag)]">v.{n.verse}</span>: {n.text}
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Notes section at bottom */}
      {notes.length > 0 && (
        <>
          <hr />
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

      {/* Share bar */}
      {selected.size > 0 && (
        <div className="share-bar">
          <span>{selected.size} {selected.size === 1 ? 'versiculo' : 'versiculos'}</span>
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
