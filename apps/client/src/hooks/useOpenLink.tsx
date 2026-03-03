interface OpenLinkProps {
  blogUrl: string;
  sourceUrl: string;
}

export const useOpenLink = () => {
  const handleOpenLink = ({ blogUrl, sourceUrl }: OpenLinkProps) => {
    const url = handleParseUrl({ blogUrl, sourceUrl });

    window.open(url, '_blank');
  };

  const handleParseUrl = ({ blogUrl, sourceUrl }: OpenLinkProps) => {
    let url = sourceUrl;

    if (!sourceUrl.startsWith('http')) {
      url = blogUrl;

      if (blogUrl.endsWith('/')) {
        url = blogUrl.slice(0, -1);
      }

      if (!sourceUrl.startsWith('/')) {
        url = `${url}/`;
      }

      url = `${url}${sourceUrl}`;
    }
    return url;
  };

  return { openLink: handleOpenLink, parseUrl: handleParseUrl };
};
