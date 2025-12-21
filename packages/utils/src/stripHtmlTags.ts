export const stripHtmlTags = (html: string) => {
  const entities: Record<string, string> = {
    '&#39;': "'",
    '&amp;': '&',
    '&gt;': '>',
    '&lt;': '<',
    '&nbsp;': ' ',
    '&quot;': '"',
  };

  const text = html
    .replace(/<[^>]*>/g, '')
    .replace(/&[^;]+;/g, (entity) => entities[entity] || entity);

  return text;
};
