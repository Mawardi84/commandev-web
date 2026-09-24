// Bulletproof standalone Prism fallback wrapper (no external dependency crashes)
const Prism = {
  highlight: (code: string, _grammar?: any, _language?: string) => {
    return code;
  },
  languages: {
    javascript: {},
    python: {},
    markup: {},
    css: {}
  }
};

if (typeof window !== 'undefined') {
  (window as any).Prism = Prism;
}

export default Prism;
