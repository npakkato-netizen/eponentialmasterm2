import { Question, ExamSet15 } from "../types";
import { RULE_1_QUESTIONS } from "./rules/rule1";
import { RULE_2_QUESTIONS } from "./rules/rule2";
import { RULE_3_QUESTIONS } from "./rules/rule3";
import { RULE_4_QUESTIONS } from "./rules/rule4";
import { RULE_5_QUESTIONS } from "./rules/rule5";
import { RULE_6_QUESTIONS } from "./rules/rule6";
import { RULE_7_QUESTIONS } from "./rules/rule7";
import { RULE_8_QUESTIONS } from "./rules/rule8";

// 120 total questions: exactly 15 curated questions for each of the 8 Exponent Rules
export const QUESTION_BANK: Question[] = [
  ...RULE_1_QUESTIONS,
  ...RULE_2_QUESTIONS,
  ...RULE_3_QUESTIONS,
  ...RULE_4_QUESTIONS,
  ...RULE_5_QUESTIONS,
  ...RULE_6_QUESTIONS,
  ...RULE_7_QUESTIONS,
  ...RULE_8_QUESTIONS
];

// Curated 15-question sets for the Standard 15-Question System
export const STANDARD_EXAM_SETS_15: ExamSet15[] = [
  {
    id: "set-15-standard-m1",
    title: "ชุดที่ 1: มาตรฐาน ม.1 (Basic 15)",
    subtitle: "สมบัติพื้นฐาน การคูณ หาร กำลังศูนย์ กำลังลบ และสัญกรณ์วิทยาศาสตร์",
    description: "แบบทดสอบมาตรฐาน 15 ข้อ สำหรับปูพื้นฐานและวัดผลหลักสูตร ม.1 สสวท.",
    badge: "ม.1 มาตรฐาน",
    difficulty: "มาตรฐาน ม.1",
    totalQuestions: 15,
    timeLimitMinutes: 15,
    xpReward: 300,
    color: "from-blue-600 to-indigo-700"
  },
  {
    id: "set-15-advanced-m2",
    title: "ชุดที่ 2: เข้มข้น ม.2 (Advanced 15)",
    subtitle: "กำลังซ้อน กำลังผลคูณ กำลังผลหาร นิพจน์ซับซ้อน และการจัดรูป",
    description: "แบบทดสอบเจาะลึก 15 ข้อ ยกระดับทักษะการคำนวณสมบัติชั้นสูงสำหรับ ม.2",
    badge: "ม.2 ขั้นสูง",
    difficulty: "มาตรฐาน ม.2",
    totalQuestions: 15,
    timeLimitMinutes: 18,
    xpReward: 350,
    color: "from-purple-600 to-indigo-800"
  },
  {
    id: "set-15-onet-gifted",
    title: "ชุดที่ 3: O-NET & พิชิตสอบเข้า ม.3 (Competitive 15)",
    subtitle: "ข้อสอบแข่งขัน สมการเลขยกกำลัง เปรียบเทียบค่า และประยุกต์เข้มข้น",
    description: "คลังข้อสอบคัดสรรพิเศษ 15 ข้อ จำลองแนวข้อสอบ O-NET และสนามแข่งขันชั้นนำ",
    badge: "O-NET & สวฐ.",
    difficulty: "สอบแข่งขัน",
    totalQuestions: 15,
    timeLimitMinutes: 20,
    xpReward: 400,
    color: "from-emerald-600 to-teal-700"
  },
  {
    id: "set-15-mastery-mixed",
    title: "ชุดที่ 4: มหาศึกชิงแชมป์รวม 8 กฎ (Comprehensive 15)",
    subtitle: "สุ่มกระจายครบทุก 8 สมบัติของเลขยกกำลัง วัดระดับความแม่นยำรอบด้าน",
    description: "ชุดทดสอบวัดผลรวม 15 ข้อ คัดสัดส่วนทุกกฎเพื่อประเมินความพร้อมแบบครบวงจร",
    badge: "รวม 8 กฎสมบูรณ์",
    difficulty: "รวมทุกระดับ",
    totalQuestions: 15,
    timeLimitMinutes: 15,
    xpReward: 380,
    color: "from-amber-500 to-orange-600"
  }
];

// Helper to select 15 well-distributed questions covering all 8 exponent rules
export function select15RandomQuestions(seedRuleId?: string): Question[] {
  const byTopic: Record<string, Question[]> = {};
  for (const q of QUESTION_BANK) {
    if (!byTopic[q.topicId]) {
      byTopic[q.topicId] = [];
    }
    byTopic[q.topicId].push(q);
  }

  const topicIds = Object.keys(byTopic);
  const selected: Question[] = [];

  // If a seed rule was requested, pick 3 from it first
  if (seedRuleId && byTopic[seedRuleId]) {
    const seedQs = [...byTopic[seedRuleId]].sort(() => Math.random() - 0.5);
    selected.push(...seedQs.slice(0, 3));
  }

  // Ensure at least 1-2 questions from each of the 8 rules
  const shuffledTopics = [...topicIds].sort(() => Math.random() - 0.5);
  for (const tid of shuffledTopics) {
    if (selected.length >= 15) break;
    const pool = byTopic[tid].filter((q) => !selected.some((s) => s.id === q.id));
    if (pool.length > 0) {
      const pick = pool[Math.floor(Math.random() * pool.length)];
      selected.push(pick);
    }
  }

  // Fill up to 15 from remaining questions
  if (selected.length < 15) {
    const remaining = QUESTION_BANK.filter((q) => !selected.some((s) => s.id === q.id));
    const shuffledRem = [...remaining].sort(() => Math.random() - 0.5);
    while (selected.length < 15 && shuffledRem.length > 0) {
      selected.push(shuffledRem.pop()!);
    }
  }

  return selected.slice(0, 15);
}

// Helper to get curated 15-question sets by Set ID
export function get15QuestionSetById(setId: string): Question[] {
  if (setId === "set-15-standard-m1") {
    // M.1 Focus: product, quotient, zero-negative, sci-notation, power-of-product
    const m1Topics = ["rule-product-same-base", "rule-quotient-same-base", "rule-zero-negative-power", "rule-scientific-notation", "rule-power-of-product"];
    const pool = QUESTION_BANK.filter((q) => m1Topics.includes(q.topicId) || q.gradeLevel === "ม.1");
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 15);
  } else if (setId === "set-15-advanced-m2") {
    // M.2 Focus: power-of-power, power-of-product, power-of-quotient, zero-neg hard, mixed
    const m2Topics = ["rule-power-of-power", "rule-power-of-product", "rule-power-of-quotient", "rule-zero-negative-power", "rule-mixed-applications"];
    const pool = QUESTION_BANK.filter((q) => m2Topics.includes(q.topicId) || q.gradeLevel === "ม.2");
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 15);
  } else if (setId === "set-15-onet-gifted") {
    // Competition & Exam focus
    const pool = QUESTION_BANK.filter((q) => q.difficulty === "exam" || q.difficulty === "hard" || q.topicId === "rule-mixed-applications" || q.isWeekly);
    const remainder = QUESTION_BANK.filter((q) => !pool.some((p) => p.id === q.id));
    const merged = [...pool, ...remainder];
    return merged.slice(0, 15);
  }

  // Default: balanced 15 questions
  return select15RandomQuestions();
}

export const BADGES_LIST = [
  {
    id: "first_win",
    title: "ก้าวแรกสู่พลังเลขยกกำลัง",
    description: "ตอบคำถามถูกต้องข้อแรกสำเร็จ",
    icon: "Sparkles",
    color: "from-amber-400 to-yellow-500",
    requirement: "ตอบถูก 1 ข้อ",
    isUnlocked: false
  },
  {
    id: "rule_master_1",
    title: "ปรมาจารย์ฐานเดียวกัน",
    description: "ผ่านการทดสอบกฎการคูณและหารฐานเดียวกันครบ 5 ข้อ",
    icon: "Flame",
    color: "from-blue-500 to-indigo-600",
    requirement: "ตอบถูกในหมวดคูณหาร 5 ข้อ",
    isUnlocked: false
  },
  {
    id: "power_sorcerer",
    title: "จอมเวทกำลังซ้อน",
    description: "แก้โจทย์เลขยกกำลังซ้อนและกระจายวงเล็บสำเร็จ 5 ข้อ",
    icon: "Layers",
    color: "from-purple-500 to-pink-600",
    requirement: "ตอบถูกในหมวดกำลังซ้อน 5 ข้อ",
    isUnlocked: false
  },
  {
    id: "zero_negative_hero",
    title: "ผู้ปราบเลขชี้กำลังลบ",
    description: "พิชิตโจทย์เลขชี้กำลัง 0 และลบโดยไม่พลาด",
    icon: "ShieldAlert",
    color: "from-rose-500 to-red-600",
    requirement: "ตอบถูกในหมวดกำลังลบ 5 ข้อ",
    isUnlocked: false
  },
  {
    id: "sci_master",
    title: "นักล่าสัญกรณ์วิทยาศาสตร์",
    description: "ตอบโจทย์สัญกรณ์วิทยาศาสตร์ถูกต้องต่อเนื่อง 3 ข้อ",
    icon: "Globe",
    color: "from-teal-500 to-emerald-600",
    requirement: "ตอบถูกหมวดสัญกรณ์ 3 ข้อ",
    isUnlocked: false
  },
  {
    id: "arena_champion",
    title: "แชมเปี้ยนอารีน่า",
    description: "ชนะการดวล 1v1 ในโหมด Battle Arena 3 ครั้ง",
    icon: "Swords",
    color: "from-orange-500 to-amber-600",
    requirement: "ชนะโหมด Duel 3 ครั้ง",
    isUnlocked: false
  },
  {
    id: "streak_warrior",
    title: "นักสู้สายสตรีค 3 วัน",
    description: "เข้าฝึกฝนสมบัติเลขยกกำลังต่อเนื่อง 3 วัน",
    icon: "Zap",
    color: "from-yellow-400 to-amber-500",
    requirement: "สตรีคการเรียน 3 วัน",
    isUnlocked: false
  },
  {
    id: "exam_destroyer",
    title: "ผู้พิชิตข้อสอบเข้า ม.3",
    description: "ทำโจทย์ระดับยาก/แข่งขันสำเร็จ 3 ข้อ",
    icon: "Trophy",
    color: "from-emerald-400 to-teal-600",
    requirement: "ตอบถูกโจทย์ระดับ Exam 3 ข้อ",
    isUnlocked: false
  }
];
