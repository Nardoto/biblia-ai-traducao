import React from 'react';

interface Block {
  type: 'h1' | 'h2' | 'h3' | 'p' | 'quote' | 'callout' | 'hr' | 'dialogue' | 'em-line';
  content: string;
  calloutLabel?: string;
}

function parseInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Order matters: bold (**) before italic (*)
  // We'll do a simple sequential scan.
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > lastIndex) {
      nodes.push(text.slice(lastIndex, m.index));
    }
    const token = m[0];
    if (token.startsWith('**')) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else {
      nodes.push(<em key={key++}>{token.slice(1, -1)}</em>);
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

function parseChapter(markdown: string): Block[] {
  const blocks: Block[] = [];
  const lines = markdown.split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === '') {
      i++;
      continue;
    }

    if (trimmed === '---') {
      blocks.push({ type: 'hr', content: '' });
      i++;
      continue;
    }

    if (trimmed.startsWith('# ')) {
      blocks.push({ type: 'h1', content: trimmed.slice(2) });
      i++;
      continue;
    }
    if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'h2', content: trimmed.slice(3) });
      i++;
      continue;
    }
    if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'h3', content: trimmed.slice(4) });
      i++;
      continue;
    }

    // Italic-only paragraph (subtitle line like "*De antes do tempo...*")
    if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) {
      blocks.push({ type: 'em-line', content: trimmed.slice(1, -1) });
      i++;
      continue;
    }

    // Blockquote — collect consecutive '> ' lines
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      const joined = quoteLines.join('\n').trim();
      // Detect "callout" pattern: starts with "**Word.** ..." or "**Word**.\n..."
      const calloutMatch = joined.match(/^\*\*([^*]+)\.\*\*\s*([\s\S]*)$/);
      if (calloutMatch) {
        blocks.push({
          type: 'callout',
          calloutLabel: calloutMatch[1],
          content: calloutMatch[2].trim(),
        });
      } else {
        blocks.push({ type: 'quote', content: joined });
      }
      continue;
    }

    // Dialogue line: "— ..."
    if (trimmed.startsWith('— ') || trimmed.startsWith('—')) {
      blocks.push({ type: 'dialogue', content: trimmed });
      i++;
      continue;
    }

    // Paragraph — collect consecutive non-empty, non-special lines
    const paraLines: string[] = [trimmed];
    i++;
    while (i < lines.length) {
      const next = lines[i].trim();
      if (
        next === '' ||
        next === '---' ||
        next.startsWith('#') ||
        next.startsWith('>') ||
        next.startsWith('— ') ||
        next.startsWith('—')
      ) break;
      paraLines.push(next);
      i++;
    }
    blocks.push({ type: 'p', content: paraLines.join(' ') });
  }
  return blocks;
}

export default function CronologicaReader({ markdown }: { markdown: string }) {
  const blocks = parseChapter(markdown);

  return (
    <article className="font-serif leading-relaxed">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'h1':
            return (
              <h1
                key={idx}
                className="text-3xl font-bold mb-2 mt-2"
              >
                {parseInline(block.content)}
              </h1>
            );
          case 'h2':
            return (
              <h2
                key={idx}
                className="text-xl font-bold mt-12 mb-5 pb-2 border-b border-[var(--border)] scroll-mt-4"
                id={`cena-${idx}`}
              >
                {parseInline(block.content)}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={idx} className="text-lg font-semibold mt-6 mb-3">
                {parseInline(block.content)}
              </h3>
            );
          case 'em-line':
            return (
              <p
                key={idx}
                className="text-[var(--muted)] italic mb-8 text-base"
              >
                {parseInline(block.content)}
              </p>
            );
          case 'p':
            return (
              <p key={idx} className="mb-5 text-[1.05rem]">
                {parseInline(block.content)}
              </p>
            );
          case 'dialogue':
            return (
              <p key={idx} className="mb-3 text-[1.05rem] pl-4">
                {parseInline(block.content)}
              </p>
            );
          case 'callout':
            return (
              <aside
                key={idx}
                className="my-6 p-4 rounded-lg bg-[var(--accent-bg)] border-l-4 border-[var(--accent)] font-sans text-sm leading-relaxed"
              >
                <span className="block text-[10px] font-bold uppercase tracking-wide text-[var(--accent)] mb-1.5">
                  {block.calloutLabel}
                </span>
                <div className="text-[var(--text)]">
                  {block.content.split('\n\n').map((p, i) => (
                    <p key={i} className={i > 0 ? 'mt-2' : ''}>
                      {parseInline(p.replace(/\n/g, ' '))}
                    </p>
                  ))}
                </div>
              </aside>
            );
          case 'quote':
            return (
              <blockquote
                key={idx}
                className="my-5 pl-5 border-l-2 border-[var(--accent-soft)] italic text-[var(--muted)] whitespace-pre-line"
              >
                {parseInline(block.content)}
              </blockquote>
            );
          case 'hr':
            return (
              <hr
                key={idx}
                className="my-10 border-0 border-t border-[var(--border)]"
              />
            );
        }
      })}
    </article>
  );
}
