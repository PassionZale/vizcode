import { Code, LezerHighlighter, withDefaults } from "@motion-canvas/2d";
import { HighlightStyle } from "@codemirror/language";
import { parser } from "@lezer/javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";

const highlightStyle: HighlightStyle = (dracula as any)[1][2].value;

const JavascriptHighlighter = new LezerHighlighter(
  parser.configure({
    dialect: "ts tsx jsx",
  }),
  highlightStyle
);

export const JavascriptCode = withDefaults(Code, {
  highlighter: JavascriptHighlighter,
});
