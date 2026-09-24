/**
 * Safe source parsing and comment stripping utilities for static analysis.
 * Zero dynamic code execution.
 */

/**
 * Strips single-line (#...) and multi-line ('''...''' or """...""") comments from Python source
 * to prevent false positives when searching for structural syntax nodes.
 */
export function stripPythonCommentsAndDocstrings(code: string): string {
  if (!code) return '';
  
  // Strip multi-line docstrings/strings
  let cleaned = code.replace(/"""[\s\S]*?"""|'''[\s\S]*?'''/g, ' ');
  
  // Strip single-line comments
  cleaned = cleaned.replace(/#.*$/gm, ' ');
  
  return cleaned;
}

/**
 * Strips single-line (//...) and multi-line (/*...*\/) comments from JavaScript/CSS source.
 */
export function stripJsComments(code: string): string {
  if (!code) return '';
  return code
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/\/\/.*$/gm, ' ');
}

/**
 * Strips HTML comments (<!--...-->).
 */
export function stripHtmlComments(code: string): string {
  if (!code) return '';
  return code.replace(/<!--[\s\S]*?-->/g, ' ');
}

/**
 * Strips CSS comments (/*...*\/).
 */
export function stripCssComments(code: string): string {
  if (!code) return '';
  return code.replace(/\/\*[\s\S]*?\*\//g, ' ');
}
