import { UserStats, ExponentRuleId, ExponentRule, Question } from "../types";
import { EXPONENT_RULES } from "../data/lessons";
import { QUESTION_BANK } from "../data/questions";

export interface WeakRuleInfo {
  rule: ExponentRule;
  stats: { correct: number; total: number; level: number };
  accuracy: number;
  errorCount: number;
  priorityScore: number;
  status: "weak" | "moderate" | "strong" | "untested";
  deficitReason: string;
  focusTip: string;
}

/**
 * Extracts all rules sorted from weakest to strongest,
 * and specifically returns the Top 3 weakest exponent rules needing remediation.
 */
export function extractWeaknessRankings(stats: UserStats): WeakRuleInfo[] {
  const allAnalysis: WeakRuleInfo[] = EXPONENT_RULES.map((rule) => {
    const rStats = stats.ruleMastery[rule.id] || { correct: 0, total: 0, level: 1 };
    const accuracy = rStats.total > 0 ? Math.round((rStats.correct / rStats.total) * 100) : 0;
    const errorCount = rStats.total - rStats.correct;

    let status: "weak" | "moderate" | "strong" | "untested" = "untested";
    if (rStats.total === 0) {
      status = "untested";
    } else if (accuracy >= 80) {
      status = "strong";
    } else if (accuracy >= 55) {
      status = "moderate";
    } else {
      status = "weak";
    }

    // Priority score: lower means more urgent to fix
    // Factors: low accuracy is most urgent, more errors increases urgency, untested is medium-high urgency
    let priorityScore = accuracy;
    if (rStats.total === 0) {
      priorityScore = 40; // Untested gets high priority to assess
    } else {
      // Each error reduces score by 3 to prioritize rules with real failures
      priorityScore = Math.max(0, accuracy - errorCount * 3);
    }

    // Tailored deficit reason and tips for each rule
    let deficitReason = "มีอัตราการตอบผิดสูง หรือยังไม่ได้ฝึกฝนอย่างเพียงพอ";
    let focusTip = "ฝึกทำโจทย์แบบ Step-by-step สังเกตฐานและเลขชี้กำลัง";

    if (rule.id === "rule-zero-negative-power") {
      deficitReason = "มักสับสนการแปลงกำลังลบเป็นเศษส่วน และจำสับสนว่า a^0 = 1";
      focusTip = "จำหลักการ: a^(-n) = 1/a^n คือส่วนกลับเสมอ และเลขใดๆ (ยกเว้น 0) ยกกำลัง 0 เท่ากับ 1";
    } else if (rule.id === "rule-power-of-power") {
      deficitReason = "มักสับสนระหว่างการบวกและการคูณเลขชี้กำลังเมื่อมีวงเล็บซ้อน";
      focusTip = "จำหลักการ: (a^m)^n = a^(m*n) กำลังซ้อนกันให้นำเลขชี้กำลังมาคูณกัน";
    } else if (rule.id === "rule-mixed-applications") {
      deficitReason = "ข้อสอบประยุกต์หลายขั้นตอน ตัดทอนฐานไม่ตรงกัน หรือจัดรูปซับซ้อน";
      focusTip = "แปลงฐานทุกตัวให้เป็นจำนวนเฉพาะ (Prime Factorization) ก่อนรวมกำลัง";
    } else if (rule.id === "rule-power-of-quotient") {
      deficitReason = "ลืมกระจายเลขชี้กำลังไปยังตัวส่วนด้านล่าง";
      focusTip = "กระจายกำลังทั้งเศษและส่วน (a/b)^n = a^n / b^n อย่าลืมตัวส่วนเด็ดขาด";
    } else if (rule.id === "rule-power-of-product") {
      deficitReason = "ลืมกระจายกำลังเข้าสัมประสิทธิ์ตัวเลข เช่น (2x)^3 = 8x^3";
      focusTip = "กระจายกำลังเข้าทุกพจน์ในวงเล็บ ทั้งตัวเลขและตัวแปร";
    } else if (rule.id === "rule-scientific-notation") {
      deficitReason = "นับจำนวนเลื่อนจุดทศนิยมผิด หรือสับสนเครื่องหมายกำลัง 10";
      focusTip = "รูปมาตรฐานคือ A x 10^n โดยที่ 1 <= A < 10 เลื่อนซ้ายกำลังบวก เลื่อนขวากำลังลบ";
    } else if (rule.id === "rule-quotient-same-base") {
      deficitReason = "สับสนการนำเลขชี้กำลังเศษลบส่วน หรือเครื่องหมายลบซ้อนลบ";
      focusTip = "ฐานเท่ากันหารกัน ให้นำเลขชี้กำลังมาลบกัน a^m / a^n = a^(m-n)";
    } else if (rule.id === "rule-product-same-base") {
      deficitReason = "เผลอนำฐานมาคูณกัน หรือเผลอนำเลขชี้กำลังมาคูณแทนบวก";
      focusTip = "ฐานเท่ากันคูณกัน คงฐานเดิมไว้แล้วนำเลขชี้กำลังมาบวกกัน";
    }

    return {
      rule,
      stats: rStats,
      accuracy,
      errorCount,
      priorityScore,
      status,
      deficitReason,
      focusTip,
    };
  });

  // Sort ascending by priorityScore (weakest first)
  return allAnalysis.sort((a, b) => a.priorityScore - b.priorityScore);
}

/**
 * Extracts specifically the Top 3 weakest exponent rules.
 */
export function getTop3WeakestRules(stats: UserStats): WeakRuleInfo[] {
  const sorted = extractWeaknessRankings(stats);
  return sorted.slice(0, 3);
}

/**
 * Generates a targeted custom drill session tailored to the 3 weakest rules.
 * Each weak rule receives a balanced set of progressive questions (e.g. 2-3 questions each = 6-9 questions).
 */
export function generateFocusedDrillQuestions(
  weakRules: WeakRuleInfo[],
  questionsPerRule: number = 3
): {
  questions: Question[];
  targetRules: WeakRuleInfo[];
} {
  const selectedQuestions: Question[] = [];

  weakRules.forEach((weakItem) => {
    const ruleQuestions = QUESTION_BANK.filter((q) => q.topicId === weakItem.rule.id);
    
    // Sort to get progressive difficulty: easy -> medium -> hard/exam
    const easy = ruleQuestions.filter((q) => q.difficulty === "easy");
    const medium = ruleQuestions.filter((q) => q.difficulty === "medium");
    const hard = ruleQuestions.filter((q) => q.difficulty === "hard" || q.difficulty === "exam");

    const pickedForRule: Question[] = [];

    // Try to pick 1 easy, 1 medium, 1 hard if available
    if (easy.length > 0) pickedForRule.push(easy[Math.floor(Math.random() * easy.length)]);
    if (medium.length > 0) {
      const remainingMedium = medium.filter((q) => !pickedForRule.some((p) => p.id === q.id));
      if (remainingMedium.length > 0) {
        pickedForRule.push(remainingMedium[Math.floor(Math.random() * remainingMedium.length)]);
      }
    }
    if (hard.length > 0 && pickedForRule.length < questionsPerRule) {
      const remainingHard = hard.filter((q) => !pickedForRule.some((p) => p.id === q.id));
      if (remainingHard.length > 0) {
        pickedForRule.push(remainingHard[Math.floor(Math.random() * remainingHard.length)]);
      }
    }

    // Fill remaining if needed
    const remainingInRule = ruleQuestions.filter((q) => !pickedForRule.some((p) => p.id === q.id));
    while (pickedForRule.length < questionsPerRule && remainingInRule.length > 0) {
      const idx = Math.floor(Math.random() * remainingInRule.length);
      pickedForRule.push(remainingInRule.splice(idx, 1)[0]);
    }

    selectedQuestions.push(...pickedForRule);
  });

  return {
    questions: selectedQuestions,
    targetRules: weakRules,
  };
}
