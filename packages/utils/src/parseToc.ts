export interface TocItem {
  id: string;
  level: number;
  text: string;
}

export const generateHeadingId = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\uAC00-\uD7A3-]/g, '');
};

export const parseToc = (content: string): TocItem[] => {
  const headings: TocItem[] = [];
  const lines = content.split('\n');

  lines.forEach((line) => {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = generateHeadingId(text);
      headings.push({ id, level, text });
    }
  });

  return headings;
};
