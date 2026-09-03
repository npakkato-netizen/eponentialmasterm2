export type GradeLevel = "ม.1" | "ม.2" | "all";

export type Difficulty = "easy" | "medium" | "hard" | "exam";

export type ExponentRuleId =
  | "rule-product-same-base"     // a^m * a^n = a^(m+n)
  | "rule-quotient-same-base"    // a^m / a^n = a^(m-n)
  | "rule-power-of-power"        // (a^m)^n = a^(m*n)
  | "rule-power-of-product"      // (ab)^n = a^n * b^n
  | "rule-power-of-quotient"     // (a/b)^n = a^n / b^n
  | "rule-zero-negative-power"   // a^0 = 1, a^(-n) = 1/a^n
  | "rule-scientific-notation"   // A x 10^n
  | "rule-mixed-applications"    // โจทย์ประยุกต์และข้อสอบแข่งขัน

export interface ExponentRule {
  id: ExponentRuleId;
  title: string;
  shortFormula: string;
  formulaLatex: string;
  description: string;
  gradeLevel: GradeLevel;
  iconName: string;
  color: string;
  commonMistakes: string[];
  keyConcept: string;
  examples: {
    problem: string;
    steps: string[];
    result: string;
    explanation: string;
  }[];
}

export interface QuestionOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
}

export interface Question {
  id: string;
  title?: string;
  question: string;
  mathExpression?: string;
  topicId: ExponentRuleId;
  topicName: string;
  gradeLevel: GradeLevel;
  difficulty: Difficulty;
  options: QuestionOption[];
  correctAnswer: string; // 'A', 'B', 'C', or 'D'
  hint: string;
  stepByStep: string[];
  commonMistake?: string;
  ruleUsed: string;
  isWeekly?: boolean;
  weekNumber?: number;
  xpReward: number;
}

export interface UserStats {
  xp: number;
  level: number;
  coins: number;
  streakDays: number;
  lastActiveDate: string;
  totalAnswered: number;
  totalCorrect: number;
  ruleMastery: Record<ExponentRuleId, { correct: number; total: number; level: number }>;
  unlockedBadges: string[];
  duelRecord: {
    wins: number;
    losses: number;
    winStreak: number;
  };
  studyGoalPerDay: number;
  todayAnsweredCount: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  requirement: string;
  isUnlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string; // ชื่อนักเรียนที่แสดงผล
  xp: number;
  accuracy: number;
  date: string;
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  grade: string;
  school?: string;
  xp: number;
  level: number;
  winStreak: number;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond" | "Master";
  isCurrentUser?: boolean;
  badge?: string;
}

export interface ExamSet15 {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  difficulty: "มาตรฐาน ม.1" | "มาตรฐาน ม.2" | "สอบแข่งขัน" | "รวมทุกระดับ";
  totalQuestions: 15;
  timeLimitMinutes: number;
  xpReward: number;
  iconName?: string;
  color?: string;
  questions?: Question[];
}

export interface DuelPlayer {
  id: string;
  name: string;
  avatar: string;
  hp: number;
  maxHp: number;
  score: number;
  combo: number;
  isBot?: boolean;
  powerUps: {
    shield: number;
    freeze: number;
    doubleScore: number;
    fiftyFifty: number;
  };
}

export type ActiveTab =
  | "dashboard"
  | "lessons"
  | "practice"
  | "quiz"
  | "duel"
  | "weakness"
  | "weekly"
  | "vault"
  | "leaderboard"
  | "progress";

