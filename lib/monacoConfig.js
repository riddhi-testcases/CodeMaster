// Monaco Editor configuration and themes
export const customThemes = {
  "codemaster-dark": {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6A9955", fontStyle: "italic" },
      { token: "keyword", foreground: "569CD6", fontStyle: "bold" },
      { token: "string", foreground: "CE9178" },
      { token: "number", foreground: "B5CEA8" },
      { token: "function", foreground: "DCDCAA" },
      { token: "variable", foreground: "9CDCFE" },
      { token: "type", foreground: "4EC9B0" },
      { token: "operator", foreground: "D4D4D4" },
    ],
    colors: {
      "editor.background": "#0F172A",
      "editor.foreground": "#E2E8F0",
      "editor.lineHighlightBackground": "#1E293B",
      "editor.selectionBackground": "#3B82F6",
      "editor.inactiveSelectionBackground": "#1E40AF",
      "editorCursor.foreground": "#3B82F6",
      "editorLineNumber.foreground": "#64748B",
      "editorLineNumber.activeForeground": "#E2E8F0",
      "editor.findMatchBackground": "#7C3AED",
      "editor.findMatchHighlightBackground": "#5B21B6",
    },
  },

  "codemaster-light": {
    base: "vs",
    inherit: true,
    rules: [
      { token: "comment", foreground: "008000", fontStyle: "italic" },
      { token: "keyword", foreground: "0000FF", fontStyle: "bold" },
      { token: "string", foreground: "A31515" },
      { token: "number", foreground: "098658" },
      { token: "function", foreground: "795E26" },
      { token: "variable", foreground: "001080" },
      { token: "type", foreground: "267F99" },
      { token: "operator", foreground: "000000" },
    ],
    colors: {
      "editor.background": "#FFFFFF",
      "editor.foreground": "#000000",
      "editor.lineHighlightBackground": "#F3F4F6",
      "editor.selectionBackground": "#3B82F6",
      "editor.inactiveSelectionBackground": "#93C5FD",
      "editorCursor.foreground": "#3B82F6",
      "editorLineNumber.foreground": "#6B7280",
      "editorLineNumber.activeForeground": "#000000",
    },
  },
}

export const languageFeatures = {
  javascript: {
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: "`", close: "`" },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: "`", close: "`" },
    ],
    folding: {
      markers: {
        start: /^\s*\/\*\s*#?region\b/,
        end: /^\s*\*\/\s*#?endregion\b/,
      },
    },
  },

  python: {
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: '"""', close: '"""' },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    indentationRules: {
      increaseIndentPattern: /^\s*(class|def|if|elif|else|for|while|with|try|except|finally).*:$/,
      decreaseIndentPattern: /^\s*(elif|else|except|finally)\b.*:$/,
    },
  },

  java: {
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    folding: {
      markers: {
        start: /^\s*\/\*\s*#?region\b/,
        end: /^\s*\*\/\s*#?endregion\b/,
      },
    },
  },
}

export const editorShortcuts = [
  { key: "Ctrl+S", description: "Save file" },
  { key: "Ctrl+D", description: "Duplicate line" },
  { key: "Ctrl+/", description: "Toggle comment" },
  { key: "Ctrl+Shift+K", description: "Delete line" },
  { key: "Alt+Up/Down", description: "Move line up/down" },
  { key: "Ctrl+Shift+L", description: "Select all occurrences" },
  { key: "Ctrl+F", description: "Find" },
  { key: "Ctrl+H", description: "Replace" },
  { key: "F12", description: "Go to definition" },
  { key: "Shift+F12", description: "Find all references" },
]

export function configureMonaco(monaco) {
  // Register custom themes
  Object.entries(customThemes).forEach(([name, theme]) => {
    monaco.editor.defineTheme(name, theme)
  })

  // Configure language features
  Object.entries(languageFeatures).forEach(([language, config]) => {
    if (config.autoClosingPairs) {
      monaco.languages.setLanguageConfiguration(language, {
        autoClosingPairs: config.autoClosingPairs,
        surroundingPairs: config.surroundingPairs,
        folding: config.folding,
        indentationRules: config.indentationRules,
      })
    }
  })

  // Add custom completion providers
  monaco.languages.registerCompletionItemProvider("javascript", {
    provideCompletionItems: (model, position) => {
      const suggestions = [
        {
          label: "console.log",
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: "console.log(${1:message});",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Log a message to the console",
        },
        {
          label: "function",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "function ${1:name}(${2:params}) {\n\t${3:// body}\n}",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Create a function",
        },
        {
          label: "arrow function",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "const ${1:name} = (${2:params}) => {\n\t${3:// body}\n};",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Create an arrow function",
        },
      ]
      return { suggestions }
    },
  })

  // Configure diagnostics
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  })

  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    reactNamespace: "React",
    allowJs: true,
    typeRoots: ["node_modules/@types"],
  })
}
