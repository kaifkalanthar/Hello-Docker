'use client';
import React from 'react';
import MarkdownProvider from './MarkdownProvider';
import { useMarkdown } from '../../hooks/use-markdown';
export interface MDProviderProps {
    children: React.ReactNode;
}

export default function MDProvider({ children }: MDProviderProps) {
    const { markdown, html, handleMarkdownUpdate } = useMarkdown();
    return (
        <MarkdownProvider
            markdown={markdown}
            html={html}
            handleMarkdownUpdate={handleMarkdownUpdate}
        >
            {children}
        </MarkdownProvider>
    );
}
