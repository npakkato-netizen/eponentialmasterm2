import React, { useState } from "react";
import { Question } from "../types";
import { QUESTION_BANK, STANDARD_EXAM_SETS_15, get15QuestionSetById, select15RandomQuestions } from "../data/questions";
import { MathView } from "./MathView";
import { FormattedMathText } from "./FormattedMathText";
import {
  Calendar,
  Sparkles,
  Bot,
  BookOpen,
  Award,
  CheckCircle2,
  Play,
  Flame,
  Layers,
  ArrowRight,
  ExternalLink,
  Clock
} from "lucide-react";
import { motion } from "motion/react";

interface WeeklyBankViewProps {
  onStartQuizWithQuestions: (questions: Question[]) => void;
  onOpenQuestionModal: (q: Question) => void;
}

export const WeeklyBankView: React.FC<WeeklyBankViewProps> = ({
  onStartQuizWithQuestions,
  onOpenQuestionModal,
}) => {
  const [activeWeek, setActiveWeek] = useState<number>(1);
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [aiGeneratedList, setAiGeneratedList] = useState<Question[]>([]);

  const weeklyPacks = [
    {
      week: 1,
      setId: "set-15-standard-m1",
      title: "ชุดที่ 1 (ม.1): พิชิตโจทย์แปลงฐาน & กฎการคูณหารเลขยกกำลัง",
      badge: "ชุดที่ 1 • 15 ข้อ",
      desc: "รวมโจทย์ระดับ ม.1 ยอดนิยมจากแนวข้อสอบกลางภาคและ O-NET",
      count: 15,
      time: "15 นาที",
      xp: 225,
      source: "คัดสรรจากข้อสอบมาตรฐานระดับมัธยมศึกษาตอนต้น",
    },
    {
      week: 2,
      setId: "set-15-standard-m2",
      title: "ชุดที่ 2 (ม.2): กำลังซ้อน ผลคูณผลหาร & สัญกรณ์วิทยาศาสตร์",
      badge: "ชุดที่ 2 • 15 ข้อ",
      desc: "โจทย์ประยุกต์คำนวณระยะทางดวงดาว ขนาดอนุภาค และกำลังซ้อนทศนิยม",
      count: 15,
      time: "15 นาที",
      xp: 250,
      source: "คลังข้อสอบ สสวท. & วิทยาศาสตร์ ม.ต้น",
    },
    {
      week: 3,
      setId: "set-15-hard-m1m2",
      title: "ชุดที่ 3 (ท้าทาย): กับดักเลขชี้กำลังลบศูนย์ & เศษส่วนพหุนาม",
      badge: "ชุดที่ 3 • 15 ข้อ",
      desc: "รวมข้อสอบที่นักเรียนมักเสียคะแนนมากที่สุดพร้อมเฉลยละเอียด",
      count: 15,
      time: "15 นาที",
      xp: 280,
      source: "แนวข้อสอบห้องเรียนพิเศษ Gifted / สพฐ.",
    },
    {
      week: 4,
      setId: "set-15-onet-mastery",
      title: "ชุดที่ 4 (O-NET/แข่งขัน): มหาศึกเปรียบเทียบค่า & โจทย์สมาคม",
      badge: "ชุดที่ 4 • 15 ข้อ",
      desc: "เทคนิคหา ห.ร.ม. เลขชี้กำลังเพื่อเปรียบเทียบค่าโดยไม่ต้องยกกำลังจริง",
      count: 15,
      time: "15 นาที",
      xp: 300,
      source: "ข้อสอบแข่งขันสมาคมคณิตศาสตร์ & เข้า ม.4 โรงเรียนดัง",
    },
  ];

  const handleStartWeeklySet = (setId: string) => {
    const questions15 = get15QuestionSetById(setId);
    onStartQuizWithQuestions(questions15);
  };

  const handleGenerateFreshQuestion = async () => {
    setIsGeneratingAi(true);
    try {
      const res = await fetch("/api/ai/generate-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gradeLevel: "ม.1-ม.2",
          topic: "mixed-exponents",
          difficulty: "medium",
        }),
      });

      const data = await res.json();
      if (data.question) {
        setAiGeneratedList((prev) => [data.question, ...prev]);
      } else {
        // Fallback demo fresh question
        const fallbackQ: Question = {
          id: `gen_${Date.now()}`,
          question: `จงหาค่าของ (3⁴ × 9²) ÷ 27² ในรูปจำนวนเต็ม`,
          mathExpression: "\\frac{3^4 \\times 9^2}{27^2}",
          topicId: "rule-mixed-applications",
          topicName: "โจทย์ประยุกต์และข้อสอบแข่งขัน",
          gradeLevel: "ม.2",
          difficulty: "medium",
          options: [
            { id: "A", text: "9 (หรือ 3²)" },
            { id: "B", text: "27 (หรือ 3³)" },
            { id: "C", text: "3" },
            { id: "D", text: "1" }
          ],
          correctAnswer: "A",
          hint: "แปลง 9 = 3² และ 27 = 3³ แล้วรวมเลขชี้กำลัง",
          stepByStep: [
            "แปลงให้อยู่ในฐาน 3 ทั้งหมด: 3⁴ × (3²)² ÷ (3³)²",
            "ตัวเศษ: 3⁴ × 3⁴ = 3⁸",
            "ตัวส่วน: 3⁶",
            "หารกัน: 3⁸ ÷ 3⁶ = 3² = 9"
          ],
          ruleUsed: "แปลงฐานจำนวนเฉพาะ & กฎการคูณหารเลขยกกำลัง",
          xpReward: 40
        };
        setAiGeneratedList((prev) => [fallbackQ, ...prev]);
      }
    } catch {
      // Fallback
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-md mb-3">
            <Calendar className="w-3.5 h-3.5 text-purple-300" />
            <span>Weekly Quest System • ชุดละ 15 ข้อ มาตรฐาน</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
            คลังแบบทดสอบชุดละ 15 ข้อ ครูนิรชา
          </h1>
          <p className="text-purple-100 text-sm leading-relaxed">
            แบบทดสอบชุดละ 15 ข้อ คัดสรรจาก สสวท. ข้อสอบ O-NET และข้อสอบแข่งขัน พร้อมระบบ AI สร้างโจทย์ใหม่สดๆ
          </p>
        </div>
      </div>

      {/* AI Infinite Generator Bar */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-850 dark:to-indigo-950/40 p-5 sm:p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 dark:text-white text-base">
              AI ข้อสอบสดใหม่ไม่ซ้ำ (Infinite AI Question Generator)
            </h3>
            <p className="text-xs text-slate-500">
              ให้ Gemini สร้างโจทย์แนวใหม่ตามระดับ ม.1-ม.2 แบบเรียลไทม์
            </p>
          </div>
        </div>

        <button
          onClick={handleGenerateFreshQuestion}
          disabled={isGeneratingAi}
          className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-transform active:scale-95 flex-shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{isGeneratingAi ? "กำลังเสกโจทย์ใหม่..." : "สร้างโจทย์ใหม่ด้วย AI"}</span>
        </button>
      </div>

      {/* AI Generated Questions List (if any) */}
      {aiGeneratedList.length > 0 && (
        <div className="bg-white dark:bg-slate-850 rounded-3xl border border-indigo-200 dark:border-indigo-900/50 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              โจทย์ใหม่ที่ AI เพิ่งสร้าง ({aiGeneratedList.length} ข้อ)
            </h4>
            <button
              onClick={() => onStartQuizWithQuestions(aiGeneratedList)}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>เริ่มทำชุด AI นี้ทันที</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {aiGeneratedList.map((q, idx) => (
              <div
                key={q.id || idx}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    {q.topicName || "สมบัติเลขยกกำลัง"}
                  </span>
                  <div className="font-bold text-sm text-slate-800 dark:text-white mt-2">
                    <FormattedMathText text={q.question} />
                  </div>
                  {q.mathExpression && (
                    <div className="mt-2 text-xs font-mono text-indigo-600 dark:text-indigo-400">
                      <MathView expression={q.mathExpression} />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-400 font-medium">เฉลย: {q.correctAnswer}</span>
                  <button
                    onClick={() => onStartQuizWithQuestions([q])}
                    className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>ลองทำข้อนี้</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Question Packs Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          ชุดข้อสอบมาตรฐาน 15 ข้อ (15-Question Exam Packs)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weeklyPacks.map((pack) => (
            <div
              key={pack.week}
              className="bg-white dark:bg-slate-850 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-300 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                    {pack.badge}
                  </span>
                  <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> +{pack.xp} XP
                  </span>
                </div>

                <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {pack.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">{pack.desc}</p>
                <div className="text-[11px] text-slate-400 italic">แหล่งที่มา: {pack.source}</div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" /> {pack.count} ข้อ ({pack.time})
                </span>

                <button
                  onClick={() => handleStartWeeklySet(pack.setId)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-transform active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>เริ่มทำชุด 15 ข้อนี้</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

