import { Fragment, ReactNode } from 'react';

// These authored publications use paragraphs, h2s, lists, links and inline code.
// Render this limited format as React elements; never interpret raw HTML.
function inline(text: string): ReactNode[] {
  return text.split(/(`[^`]+`|\[[^\]]+\]\(https:\/\/[^\s)]+\))/g).map((part, index) => {
    if (part.startsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    const link = part.match(/^\[([^\]]+)\]\((https:\/\/[^\s)]+)\)$/);
    if (link) return <a key={index} href={link[2]}>{link[1]}</a>;
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export default function PublicationContent({ markdown }: { markdown: string }): ReactNode {
  const blocks = markdown.trim().split(/\n\s*\n/);
  return <div className="publication-prose">{blocks.map((block, index) => {
    // The page renders the title from metadata, once.
    if (block.startsWith('# ')) return null;
    if (block === '---') return <hr key={index} />;
    if (block.startsWith('## ')) return <h2 key={index}>{inline(block.slice(3))}</h2>;
    if (block.startsWith('- ')) {
      return <ul key={index}>{block.split('\n').map((item, itemIndex) => <li key={itemIndex}>{inline(item.slice(2))}</li>)}</ul>;
    }
    return <p key={index}>{inline(block)}</p>;
  })}</div>;
}
