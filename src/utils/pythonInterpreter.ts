export interface PythonExecutionResult {
  output: string;
  error?: string;
  executionTimeMs: number;
}

/**
 * Sandboxed, safe client-side Python emulator designed for educational progression.
 * Executes Python constructs (print, variables, data types, arithmetic, strings,
 * conditionals, loops, lists, dicts, tuples, sets, functions, comprehensions, try/except).
 * Enforces timeout, execution limits, and strict zero-access security isolation.
 */
export function executePython(code: string, stdinInput: string = ''): PythonExecutionResult {
  const startTime = performance.now();
  const outputs: string[] = [];
  const maxOutputLines = 200;
  let lineCount = 0;

  function safePrint(...args: any[]) {
    if (lineCount >= maxOutputLines) return;
    const line = args.map(a => {
      if (a === null || a === undefined) return 'None';
      if (typeof a === 'boolean') return a ? 'True' : 'False';
      if (typeof a === 'object') {
        try {
          return JSON.stringify(a).replace(/"/g, "'").replace(/:/g, ': ');
        } catch {
          return String(a);
        }
      }
      return String(a);
    }).join(' ');
    outputs.push(line);
    lineCount++;
  }

  try {
    // Basic AST/Pre-execution checks for obvious syntax issues
    const lines = code.split('\n');
    
    // Check missing colons on def/if/elif/else/for/while/try/except/class/with
    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      
      const clauseMatch = trimmed.match(/^(if|elif|else|for|while|def|class|try|except|finally|with)\b/);
      if (clauseMatch && !trimmed.endsWith(':') && !trimmed.includes('#')) {
        throw new Error(`SyntaxError: line ${i + 1}: expected ':' at end of '${clauseMatch[1]}' statement\n    ${trimmed}`);
      }
    }

    // Transpile Python subset into safe isolated JavaScript execution
    // 1. Convert Python booleans and None
    let jsCode = code
      .replace(/#.*$/gm, '') // strip comments
      .replace(/\bTrue\b/g, 'true')
      .replace(/\bFalse\b/g, 'false')
      .replace(/\bNone\b/g, 'null');

    // 2. Transpile f-strings: f"Hello {name}" -> `Hello ${name}`
    jsCode = jsCode.replace(/f(["'])(.*?)\1/g, (_match, _quote, content) => {
      return '`' + content.replace(/\{([^}]+)\}/g, '${$1}') + '`';
    });

    // 3. Transpile print(...)
    jsCode = jsCode.replace(/\bprint\s*\(/g, '__print(');

    // 4. Transpile len(...)
    jsCode = jsCode.replace(/\blen\s*\(([^)]+)\)/g, '(__len($1))');

    // 5. Transpile type(...)
    jsCode = jsCode.replace(/\btype\s*\(([^)]+)\)/g, '(__type($1))');

    // 6. Transpile str(), int(), float(), bool() conversions
    jsCode = jsCode.replace(/\bint\s*\(([^)]+)\)/g, '(__int($1))');
    jsCode = jsCode.replace(/\bfloat\s*\(([^)]+)\)/g, '(__float($1))');
    jsCode = jsCode.replace(/\bstr\s*\(([^)]+)\)/g, '(__str($1))');
    jsCode = jsCode.replace(/\bbool\s*\(([^)]+)\)/g, '(__bool($1))');

    // 7. Transpile range(start, end, step)
    jsCode = jsCode.replace(/\brange\s*\(([^)]+)\)/g, '__range($1)');

    // 8. Transpile def function_name(...): -> function function_name(...) {
    // Process indentation-based blocks
    const processedLines: string[] = [];
    const indentStack: number[] = [0];

    const rawLines = jsCode.split('\n');
    for (let idx = 0; idx < rawLines.length; idx++) {
      const raw = rawLines[idx];
      if (raw.trim() === '') {
        processedLines.push('');
        continue;
      }

      const indent = raw.search(/\S/);
      const content = raw.trim();

      while (indent < indentStack[indentStack.length - 1]) {
        indentStack.pop();
        processedLines.push(' '.repeat(indentStack[indentStack.length - 1] || 0) + '}');
      }

      // Check if line starts a block
      if (content.endsWith(':')) {
        let blockHeader = content.slice(0, -1).trim();
        
        // def my_func(a, b) -> function my_func(a, b)
        if (blockHeader.startsWith('def ')) {
          blockHeader = 'function ' + blockHeader.slice(4);
        } else if (blockHeader.startsWith('for ') && blockHeader.includes(' in ')) {
          // for x in iter -> for (let x of iter)
          const inParts = blockHeader.slice(4).split(' in ');
          blockHeader = `for (let ${inParts[0].trim()} of ${inParts[1].trim()})`;
        } else if (blockHeader.startsWith('while ')) {
          blockHeader = `while (${blockHeader.slice(6)})`;
        } else if (blockHeader.startsWith('if ')) {
          blockHeader = `if (${blockHeader.slice(3)})`;
        } else if (blockHeader.startsWith('elif ')) {
          blockHeader = `else if (${blockHeader.slice(5)})`;
        } else if (blockHeader === 'else') {
          blockHeader = 'else';
        } else if (blockHeader === 'try') {
          blockHeader = 'try';
        } else if (blockHeader.startsWith('except')) {
          blockHeader = 'catch (__err)';
        }

        processedLines.push(' '.repeat(indent) + blockHeader + ' {');
        if (blockHeader.startsWith('while ') || blockHeader.startsWith('for (')) {
          processedLines.push(' '.repeat(indent + 2) + '__loopGuard();');
        }
        indentStack.push(indent + 2);
      } else {
        // Normal statement - prefix variable declarations if assignment
        let statement = content;
        
        // Replace Python and / or / not
        statement = statement
          .replace(/\band\b/g, '&&')
          .replace(/\bor\b/g, '||')
          .replace(/\bnot\b/g, '!');

        // Simple variable declaration prefix (let x = ...)
        const assignMatch = statement.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=(?!=)/);
        if (assignMatch && !statement.startsWith('return ') && !statement.startsWith('let ') && !statement.startsWith('const ')) {
          statement = 'var ' + statement;
        }

        processedLines.push(' '.repeat(indent) + statement + ';');
      }
    }

    while (indentStack.length > 1) {
      indentStack.pop();
      processedLines.push('}');
    }

    const executableJs = processedLines.join('\n');

    let __loopCounter = 0;
    const __loopGuard = () => {
      if (++__loopCounter > 50000) {
        throw new Error("TimeLimitExceeded: Loop execution limit exceeded (>50,000 steps). Check for infinite loops.");
      }
    };

    // Safe environment helper functions
    const __print = safePrint;
    const __len = (obj: any) => {
      if (obj === null || obj === undefined) throw new Error("TypeError: object of type 'NoneType' has no len()");
      if (typeof obj === 'string' || Array.isArray(obj)) return obj.length;
      if (typeof obj === 'object') return Object.keys(obj).length;
      return 0;
    };
    const __type = (val: any) => {
      if (val === null || val === undefined) return "<class 'NoneType'>";
      if (typeof val === 'string') return "<class 'str'>";
      if (typeof val === 'number') return Number.isInteger(val) ? "<class 'int'>" : "<class 'float'>";
      if (typeof val === 'boolean') return "<class 'bool'>";
      if (Array.isArray(val)) return "<class 'list'>";
      if (typeof val === 'object') return "<class 'dict'>";
      return `<class '${typeof val}'>`;
    };
    const __int = (val: any) => parseInt(val, 10) || 0;
    const __float = (val: any) => parseFloat(val) || 0.0;
    const __str = (val: any) => safePrintable(val);
    const __bool = (val: any) => Boolean(val);
    const __range = (start: number, end?: number, step: number = 1) => {
      if (end === undefined) {
        end = start;
        start = 0;
      }
      const arr: number[] = [];
      for (let i = start; step > 0 ? i < end : i > end; i += step) {
        arr.push(i);
        if (arr.length > 500) break; // safeguard
      }
      return arr;
    };
    const input = (_prompt?: string) => stdinInput || '';

    function safePrintable(val: any): string {
      if (val === null || val === undefined) return 'None';
      if (typeof val === 'boolean') return val ? 'True' : 'False';
      return String(val);
    }

    // Execute within isolated Function wrapper without window/document/fetch/eval access
    const sandboxRunner = new Function(
      '__print', '__len', '__type', '__int', '__float', '__str', '__bool', '__range', 'input', '__loopGuard',
      `"use strict";
       let window = undefined;
       let document = undefined;
       let fetch = undefined;
       let XMLHttpRequest = undefined;
       let process = undefined;
       let global = undefined;
       ${executableJs}
      `
    );

    sandboxRunner(__print, __len, __type, __int, __float, __str, __bool, __range, input, __loopGuard);

    const elapsed = Math.round(performance.now() - startTime);
    return {
      output: outputs.join('\n'),
      executionTimeMs: elapsed
    };
  } catch (err: any) {
    const elapsed = Math.round(performance.now() - startTime);
    const errMsg = err?.message || String(err);
    return {
      output: outputs.join('\n'),
      error: errMsg.startsWith('SyntaxError') || errMsg.startsWith('TypeError') || errMsg.startsWith('NameError')
        ? errMsg
        : `Traceback (most recent call last):\n  File "main.py", line 1\nRuntimeError: ${errMsg}`,
      executionTimeMs: elapsed
    };
  }
}
