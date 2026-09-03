import React, { useMemo } from "react";
import katex from "katex";

export interface MathViewProps {
  expression: string;
  className?: string;
  large?: boolean;
}

const UNICODE_SUPERSCRIPT_MAP: Record<string, string> = {
  "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4",
  "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9",
  "⁺": "+", "⁻": "-", "ⁿ": "n", "ᵐ": "m", "ᵃ": "a",
  "ᵇ": "b", "ˣ": "x", "ʸ": "y"
};

/**
 * Global replace LaTeX not-equal codes (\neq, \ne, \\neq, \\ne, !=, ! =, etc.)
 * into the standard Unicode not-equal symbol (≠).
 */
export function replaceLatexNotEqual(text: string): string {
  if (!text) return "";
  return text
    // Replace \neq and \\neq (with optional trailing slash/escape)
    .replace(/\\+neq(?![a-zA-Z])/g, "≠")
    // Replace \ne and \\ne (when not followed by another alphabet)
    .replace(/\\+ne(?![a-zA-Z])/g, "≠")
    // Also standardize !=, ! =, and <>
    .replace(/!=/g, "≠")
    .replace(/! =/g, "≠")
    .replace(/<>/g, "≠")
    // Clean up spacing around ≠ if directly squeezed next to letters/digits
    .replace(/([a-zA-Z0-9])≠/g, "$1 ≠")
    .replace(/≠([a-zA-Z0-9])/g, "≠ $1");
}

/**
 * Convert arbitrary mathematical text / notation into standardized LaTeX for KaTeX
 */
function normalizeToLatex(input: string): string {
  if (!input) return "";

  // 1. Global replace \neq, \ne, and != codes into standard Unicode not-equal (≠)
  let str = replaceLatexNotEqual(input.trim());

  // Normalize any accidental double-escaped LaTeX commands (e.g. \\frac -> \frac, \\left -> \left, \\quad -> \quad)
  str = str.replace(/\\{2,}([a-zA-Z]+)/g, "\\$1");

  // If purely Thai text with no math operators, return empty to fallback to normal text
  if (/^[\u0E00-\u0E7F\s&]+$/.test(str) && !/[0-9\^\\\/=\+\-\*≠≤≥×÷!]/.test(str)) {
    return "";
  }

  // Convert standard mathematical relation and operator symbols to LaTeX
  str = str
    .replace(/≠/g, " \\neq ")
    .replace(/<=/g, " \\le ")
    .replace(/>=/g, " \\ge ")
    .replace(/≤/g, " \\le ")
    .replace(/≥/g, " \\ge ")
    .replace(/×/g, " \\times ")
    .replace(/÷/g, " \\div ")
    .replace(/·/g, " \\cdot ")
    .replace(/\bkm\b/g, "\\text{ km}");
  str = str.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻ⁿᵐᵃᵇˣʸ]+/g, (match) => {
    const converted = match
      .split("")
      .map((c) => UNICODE_SUPERSCRIPT_MAP[c] || c)
      .join("");
    return `^{${converted}}`;
  });

  // Convert (\frac{a}{b})^n or (\frac{a}{b})^{n} or (\frac{a}{b}) into \left( \frac{a}{b} \right)^{n}
  str = str.replace(
    /\(\s*\\frac\{([^}]+)\}\{([^}]+)\}\s*\)\^(\{\s*([^}]+)\s*\}|\(\s*([^)]+)\s*\)|([a-zA-Z0-9\-\+\*]+))/g,
    (_, num, den, _allExp, exp1, exp2, exp3) => {
      const exp = exp1 || exp2 || exp3;
      return `\\left(\\frac{${num}}{${den}}\\right)^{${exp}}`;
    }
  );

  // Convert (a/b)^n or (a / b)^n into \left( \frac{a}{b} \right)^{n}
  str = str.replace(
    /\(\s*([a-zA-Z0-9\+\-\*\.]+)\s*\/\s*([a-zA-Z0-9\+\-\*\.]+)\s*\)\^(\{\s*([^}]+)\s*\}|\(\s*([^)]+)\s*\)|([a-zA-Z0-9\-\+\*]+))/g,
    (_, num, den, _allExp, exp1, exp2, exp3) => {
      const exp = exp1 || exp2 || exp3;
      return `\\left(\\frac{${num}}{${den}}\\right)^{${exp}}`;
    }
  );

  // Convert bare (\frac{a}{b}) into \left( \frac{a}{b} \right)
  str = str.replace(
    /\(\s*\\frac\{([^}]+)\}\{([^}]+)\}\s*\)/g,
    "\\left(\\frac{$1}{$2}\\right)"
  );

  // Convert standalone (a/b) into \left( \frac{a}{b} \right)
  str = str.replace(
    /\(\s*([a-zA-Z0-9\+\-\*\.]+)\s*\/\s*([a-zA-Z0-9\+\-\*\.]+)\s*\)/g,
    "\\left(\\frac{$1}{$2}\\right)"
  );

  // Convert simple division of powers like a^{n} / b^{n} or a^n / b^n to \frac{a^n}{b^n}
  str = str.replace(
    /([a-zA-Z0-9\(\)\{\}\^\+\-]+)\s*\/\s*([a-zA-Z0-9\(\)\{\}\^\+\-]+)/g,
    (match, num, den) => {
      // Don't replace if it's already inside \frac{...}{...} or part of a command
      if (match.includes("\\frac") || match.includes("\\left") || num.includes("\\")) {
        return match;
      }
      return `\\frac{${num}}{${den}}`;
    }
  );

  // Standard symbols
  str = str
    .replace(/≠/g, " \\neq ")
    .replace(/≤/g, " \\le ")
    .replace(/≥/g, " \\ge ")
    .replace(/×/g, " \\times ")
    .replace(/÷/g, " \\div ")
    .replace(/·/g, " \\cdot ")
    .replace(/\bkm\b/g, "\\text{ km}");

  // Wrap Thai words inside math that are NOT already in \text{...}
  // If \text{...} is already present, avoid double wrapping
  if (!str.includes("\\text{")) {
    str = str.replace(/([\u0E00-\u0E7F]+)/g, "\\text{ $1 }");
  } else {
    // Replace Thai sequences outside existing \text{...}
    str = str.replace(/(?:\\text\{[^}]*\})|([\u0E00-\u0E7F]+)/g, (match, thai) => {
      if (thai) {
        return `\\text{ ${thai} }`;
      }
      return match;
    });
  }

  // Clean up any accidental double wrapping \text{\text{...}}
  str = str.replace(/\\text\{\s*\\text\{([^}]+)\}\s*\}/g, "\\text{ $1 }");

  return str;
}

export const MathView: React.FC<MathViewProps> = ({
  expression,
  className = "",
  large = false,
}) => {
  const html = useMemo(() => {
    if (!expression) return "";
    try {
      const latex = normalizeToLatex(expression);
      if (!latex) return "";

      // For any expression with fractions, apply \displaystyle so KaTeX uses spacious display fraction metrics,
      // ensuring ample vertical room between the fraction bar and exponents in numerator and denominator.
      const hasFraction = latex.includes("\\frac") || latex.includes("\\dfrac");
      const finalLatex = hasFraction ? `\\displaystyle ${latex}` : (large ? `\\displaystyle ${latex}` : latex);

      return katex.renderToString(finalLatex, {
        throwOnError: false,
        displayMode: false,
        output: "htmlAndMathml",
        strict: false,
      });
    } catch {
      return "";
    }
  }, [expression, large]);

  const sizeClass = large
    ? "text-base sm:text-lg"
    : className.includes("text-")
    ? ""
    : "text-sm sm:text-base";

  if (!html) {
    return (
      <span className={`font-semibold tracking-wide ${sizeClass} ${className}`}>
        {replaceLatexNotEqual(expression)}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center align-middle font-medium select-none ${sizeClass} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
