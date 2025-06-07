'use client';
import React from 'react';
import md from '../lib/markdown';

export const useMarkdown = () => {
  const [markdown, setMarkdown] = React.useState<string>('');
  const [html, setHtml] = React.useState<string>('');

  const handleMarkdownUpdate = (markdown: string) => {
    setMarkdown(markdown);
  };

  const updatedValue = React.useMemo(() => {
    const value = md.render(markdown);
    value.trim();
    return value;
  }, [markdown]);

  React.useEffect(() => {
    setHtml(updatedValue);
  }, [updatedValue]);

  return {
    markdown,
    html,
    handleMarkdownUpdate,
  };
};

