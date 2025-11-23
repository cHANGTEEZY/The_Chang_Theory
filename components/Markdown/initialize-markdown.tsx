"use client";
// InitializedMDXEditor.tsx
import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  InsertCodeBlock,
} from "@mdxeditor/editor";

/**
 * Initialize and render an MDXEditor preconfigured with common editing plugins and toolbar controls.
 *
 * The editor instance includes heading, lists, quote, thematic break, and markdown shortcut plugins;
 * link and link-dialog handling; image support with empty autocomplete suggestions; table support;
 * code block support (default language "js") with CodeMirror language mappings; and a toolbar containing
 * undo/redo, text-format toggles, block type selection, link creation, image insertion, table insertion,
 * and code block insertion controls.
 *
 * @param editorRef - Forwarded ref that receives the underlying MDXEditor methods
 * @returns A JSX element of MDXEditor configured with the predefined plugins and toolbar
 */
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        // Core plugins
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        // This plugin automatically converts markdown syntax as you type
        markdownShortcutPlugin(),

        // Link plugins
        linkPlugin(),
        linkDialogPlugin(),

        // Image plugin
        imagePlugin({
          imageAutocompleteSuggestions: [],
        }),

        // Table plugin
        tablePlugin(),

        // Code block plugins
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: "JavaScript",
            ts: "TypeScript",
            tsx: "TypeScript (React)",
            jsx: "JavaScript (React)",
            css: "CSS",
            html: "HTML",
            json: "JSON",
            python: "Python",
            bash: "Bash",
            go: "Go",
            rust: "Rust",
            sql: "SQL",
            yaml: "YAML",
            markdown: "Markdown",
          },
        }),

        // Toolbar plugin with all controls
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <InsertCodeBlock />
            </>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
      autoFocus={false}
    />
  );
}
