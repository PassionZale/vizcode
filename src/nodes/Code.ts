import {
  Code,
  CodeProps,
  LezerHighlighter,
  withDefaults,
} from "@motion-canvas/2d";
import { HighlightStyle } from "@codemirror/language";
import { parser as JavascriptParser } from "@lezer/javascript";
import { parser as JavaParser } from "@lezer/java";
import { parser as MarkdownParser, GFM } from "@lezer/markdown";
import { parser as HTMLParser } from "@lezer/html";
import { dracula } from "@uiw/codemirror-theme-dracula";

const highlightStyle: HighlightStyle = (dracula as any)[1][2].value;

const Defaults: CodeProps = {
  fontFamily: "JetBrains Mono",
  lineHeight: "150%",
  fontSize: 32,
};

const JavascriptHighlighter = new LezerHighlighter(
  JavascriptParser.configure({
    dialect: "ts tsx jsx",
  }),
  highlightStyle
);

export const JavascriptCode = withDefaults(Code, {
  highlighter: JavascriptHighlighter,
  ...Defaults,
});

const JavaHighlighter = new LezerHighlighter(
  JavaParser.configure({
    dialect: "java",
  }),
  highlightStyle
);

export const JavaCode = withDefaults(Code, {
  highlighter: JavaHighlighter,
  ...Defaults,
});

const MarkdownHighlighter = new LezerHighlighter(
  MarkdownParser.configure(GFM),
  highlightStyle
);

export const MarkdownCode = withDefaults(Code, {
  highlighter: MarkdownHighlighter,
  ...Defaults,
});

const HTMLHighlighter = new LezerHighlighter(
  HTMLParser.configure({
    dialect: "html",
  }),
  highlightStyle
);

export const HTMLCode = withDefaults(Code, {
  highlighter: HTMLHighlighter,
  ...Defaults,
});
