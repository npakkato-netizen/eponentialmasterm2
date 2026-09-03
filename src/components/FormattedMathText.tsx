import React from "react";
import { MathView, replaceLatexNotEqual } from "./MathView";

interface FormattedMathTextProps {
  text: string;
  className?: string;
  mathClassName?: string;
}

interface Segment {
  type: "text" | "math";
  value: string;
}

/**
 * Unpacks LaTeX \text{ ... } blocks containing Thai or descriptive words
 * into plain text segments so KaTeX does not suffer from unclosed braces or font mismatches.
 */
function unpackLatexText(str: string): string {
  if (!str) return "";
  return str.replace(/\\text\{\s*([^\}]+)\s*\}/g, (_match, inner) => {
    return ` ${inner.trim()} `;
  });
}

/**
 * Helper to clean leading/trailing punctuation from math tokens (e.g. outer parens, labels)
 */
function cleanMathToken(val: string): { leading: string; math: string; trailing: string } {
  let leading = "";
  let trailing = "";
  let math = val;

  // Handle label like "A: " or "1. " at start
  const labelMatch = math.match(/^([A-D]\s*:\s*|[0-9]+\.\s*)/);
  if (labelMatch) {
    leading += labelMatch[0];
    math = math.slice(labelMatch[0].length).trim();
  }

  // Trim leading punctuation if it does not balance inside math
  if (math.startsWith(":") || math.startsWith(";") || math.startsWith(",")) {
    leading += math[0] + " ";
    math = math.slice(1).trim();
  }

  // If starts with "(" and does not contain ")", and follows a Thai text
  if (math.startsWith("(") && !math.includes(")") && !/\^[0-9]/.test(math)) {
    leading += "( ";
    math = math.slice(1).trim();
  }

  // If ends with "("
  if (math.endsWith("(")) {
    trailing = " (" + trailing;
    math = math.slice(0, -1).trim();
  }

  // If ends with ")" and has no matching "("
  const openCount = (math.match(/\(/g) || []).length;
  const closeCount = (math.match(/\)/g) || []).length;
  if (closeCount > openCount && math.endsWith(")")) {
    trailing = ")" + trailing;
    math = math.slice(0, -1).trim();
  }

  return { leading, math, trailing };
}

/**
 * Splits text into text and math segments
 */
function parseMixedSegments(rawText: string): Segment[] {
  if (!rawText) return [];

  // 1. Explicit LaTeX math delimiters ($...$)
  if (rawText.includes("$")) {
    const parts = rawText.split(/(\$[^$]+\$)/g);
    const result: Segment[] = [];
    parts.forEach((p) => {
      if (p.startsWith("$") && p.endsWith("$")) {
        const mathContent = p.slice(1, -1).trim();
        if (mathContent) {
          result.push({ type: "math", value: mathContent });
        }
      } else if (p) {
        result.push(...parseMixedSegments(p));
      }
    });
    return result;
  }

  // 2. If no Thai characters at all:
  const hasThai = /[\u0E00-\u0E7F]/.test(rawText);
  if (!hasThai) {
    const trimmed = rawText.trim();
    if (!trimmed) return [{ type: "text", value: rawText }];
    // Check if it is a math formula, fraction, exponent, operator, or variable/number
    if (
      /[\^\\\/=\+\-\*≠≤≥×÷!_⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻ⁿᵐᵃᵇˣʸ]|[0-9]/.test(trimmed) ||
      /^[a-zA-Z]$/.test(trimmed)
    ) {
      return [{ type: "math", value: trimmed }];
    }
    return [{ type: "text", value: rawText }];
  }

  // 3. Mixed Thai text + math formulas
  // Split on Thai text boundaries
  const tokens = rawText
    .split(/([\u0E00-\u0E7F][\u0E00-\u0E7F\s]*[\u0E00-\u0E7F]|[\u0E00-\u0E7F])/g)
    .filter(Boolean);

  const segments: Segment[] = [];

  tokens.forEach((token) => {
    if (/[\u0E00-\u0E7F]/.test(token)) {
      segments.push({ type: "text", value: token });
    } else {
      const trimmed = token.trim();
      if (!trimmed) {
        segments.push({ type: "text", value: token });
      } else if (
        /[\^\\\/=\+\-\*≠≤≥×÷!_⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻ⁿᵐᵃᵇˣʸ]|[0-9]/.test(trimmed) ||
        /^[a-zA-Z]$/.test(trimmed)
      ) {
        const leadingSpace = token.match(/^\s*/)?.[0] || "";
        const trailingSpace = token.match(/\s*$/)?.[0] || "";

        const { leading, math, trailing } = cleanMathToken(trimmed);

        if (leadingSpace || leading) {
          segments.push({ type: "text", value: `${leadingSpace}${leading}` });
        }
        if (math) {
          segments.push({ type: "math", value: math });
        }
        if (trailing || trailingSpace) {
          segments.push({ type: "text", value: `${trailing}${trailingSpace}` });
        }
      } else {
        segments.push({ type: "text", value: token });
      }
    }
  });

  return segments;
}

/**
 * Renders mixed text with inline mathematical expressions.
 * Automatically performs Global Replace on \neq, \ne, and != to '≠'
 * and wraps all math formulas with <MathView> for proper KaTeX font rendering.
 */
export const FormattedMathText: React.FC<FormattedMathTextProps> = ({
  text,
  className = "",
  mathClassName = "",
}) => {
  if (!text) return null;

  // Step 1: Global Replace \neq and \ne into the standard Unicode symbol ≠
  let normalizedText = replaceLatexNotEqual(text);

  // Step 2: Unpack any \text{...} blocks containing Thai text to avoid broken tokens
  if (normalizedText.includes("\\text{")) {
    normalizedText = unpackLatexText(normalizedText);
  }

  // Step 3: Parse into structured segments (math vs text)
  const segments = parseMixedSegments(normalizedText);

  return (
    <span className={className}>
      {segments.map((seg, idx) => {
        if (seg.type === "math") {
          return (
            <MathView
              key={idx}
              expression={seg.value}
              className={mathClassName}
            />
          );
        }
        return <span key={idx}>{seg.value}</span>;
      })}
    </span>
  );
};
