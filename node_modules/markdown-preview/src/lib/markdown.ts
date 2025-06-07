/* eslint-disable no-empty */
import { Remarkable } from 'remarkable';
import hljs from 'highlight.js';



  const md = new Remarkable('full',{
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
  quotes: '“”‘’',
  
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (__) {}

    return '';
  },
});

export default md;
