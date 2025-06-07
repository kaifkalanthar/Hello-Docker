# Markdown Editor and Previewer

This package provides a Markdown editor with a live preview feature for React applications. It allows users to write Markdown content and view its rendered HTML output in real-time. The editor also supports syntax highlighting for code blocks.

## Installation

To use this package in your React project, you can install it using npm or yarn:

```bash
npm install markdown-preview
```

or

```bash
yarn add markdown-preview
```

## Usage

Import the necessary components and set up your React application as follows:

```jsx
import React from 'react';
import MDProvider from "markdown-preview/lib/context/MDProvider";
import MD from "markdown-preview/components/MD";
import './globals.css';

export default function App() {   
    return (
        <MDProvider>
            <MD />
        </MDProvider>
    );
}
```

The `App` component should wrap the editor inside the `MDProvider`, which sets up the context for handling Markdown content.

## MD Component

The `MD` component provides the Markdown editor and live preview. It uses the `MarkdownContext` provided by `MDProvider` to manage the Markdown content.

```jsx
import React from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { MarkdownContext } from 'markdown-preview/lib/context/MarkdownProvider';

const MDPreview = React.lazy(() => import('markdown-preview/components/MDPreview'));

export default function MD() { 
  const { markdown, handleMarkdownUpdate } =
    React.useContext(MarkdownContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Your logic for handling the Markdown content goes here
  };

  return (
    // JSX code for the editor and preview components
  );
}
```

## MarkdownProvider

The `MarkdownProvider` component is used to set up the context for managing Markdown content.

```jsx
import React from 'react';
import { MarkdownContextProps } from 'markdown-preview/lib/context/MarkdownProvider';

export const MarkdownContext = React.createContext<MarkdownContextProps>({
  markdown: '',
  html: '',
  handleMarkdownUpdate: () => {}, // Provide a default function
});

export default function MarkdownProvider({
  children,
  markdown,
  html,
  handleMarkdownUpdate,
}: MarkdownProviderProps & MarkdownContextProps) {
  return (
    <MarkdownContext.Provider value={{ markdown, html, handleMarkdownUpdate }}>
      {children}
    </MarkdownContext.Provider>
  );
}
```

## Custom Markdown Parser

This package uses the `remarkable` library for parsing Markdown and the `highlight.js` library for syntax highlighting in code blocks. The Markdown parser and syntax highlighter are configured in the `./lib/context/MarkdownParser.js` file.

## Contributing

If you encounter any issues or have suggestions for improvement, feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/your-repo).

## License

This package is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use it in your projects.
