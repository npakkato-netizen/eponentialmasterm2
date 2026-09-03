import React, { useState, useEffect, useMemo } from "react";
import { Question, ExponentRuleId, GradeLevel, Difficulty, ExamSet15 } from "../types";
import { QUESTION_BANK, STANDARD_EXAM_SETS_15, get15QuestionSetById, select15RandomQuestions } from "../data/questions";
import { EXPONENT_RULES } from "../data/lessons";
import { MathView } from "./MathView";
import { FormattedMathText } from "./FormattedMathText";
import { Scratchpad } from "./Scratchpad";
import sheetService from "../services/SheetService";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Bot,
  PenTool,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Flame,
  Award,
  Zap,
  Filter,
  Lightbulb,
  AlertCircle,
  Clock,
  BookOpen,
  Layers,
  ChevronRight,
  Check,
  Compass,
  Trophy,
  Share2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { QuizResultModal } from "./QuizResultModal";

interface QuizModeProps {
  initialRuleFilter?: string | null;
  onQuestionCompleted: (
    question: Question,
    isCorrect: boolean,
    xpEarned: number
  ) => void;
  onOpenLesson: (ruleId: string) => void;
  onOpen15DrillModal?: (setId: string) => void;
}

export const QuizMode: React.FC<QuizModeProps> = ({
  initialRuleFilter,
  onQuestionCompleted,
  onOpenLesson,
  onOpen15DrillModal,
}) => {
  const [activeMode, setActiveMode] = useState<"rule-practice" | "exam-sets-15">("exam-sets-15");
  const [activeSet15Id, setActiveSet15Id] = useState<string>("set-15-standard-m1");
  const [gradeFilter, setGradeFilter] = useState<GradeLevel>("all");
  const [topicFilter, setTopicFilter] = useState<string>(initialRuleFilter || "all");
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "all">("all");
  const [showRuleSelectorGrid, setShowRuleSelectorGrid] = useState<boolean>(false);

  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showScratchpad, setShowScratchpad] = useState<boolean>(false);

  // Track answer state for questions in current set { [questionId]: { selected: string, isCorrect: boolean } }
  const [answeredHistory, setAnsweredHistory] = useState<Record<string, { selected: string; isCorrect: boolean }>>({});

  const [combo, setCombo] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  // Result Summary & Web Share Modal State
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [completedResultData, setCompletedResultData] = useState<{
    topicTitle: string;
    totalQuestions: number;
    correctCount: number;
    xpEarned: number;
    questions: Question[];
    answeredHistory: Record<string, { selected: string; isCorrect: boolean }>;
  } | null>(null);

  // AI Tutor explanation state
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // Sync initialRuleFilter when prop changes
  useEffect(() => {
    if (initialRuleFilter) {
      setTopicFilter(initialRuleFilter);
      setActiveMode("rule-practice");
    }
  }, [initialRuleFilter]);

  // Load questions based on active mode (15-question sets or rule-based filter)
  useEffect(() => {
    if (activeMode === "exam-sets-15") {
      const setQuestions = get15QuestionSetById(activeSet15Id);
      setFilteredQuestions(setQuestions);
      setCurrentIndex(0);
      resetQuestionState();
    } else {
      let list = [...QUESTION_BANK];
      if (gradeFilter !== "all") {
        list = list.filter((q) => q.gradeLevel === gradeFilter || q.gradeLevel === "all");
      }
      if (topicFilter !== "all") {
        if (topicFilter === "weekly") {
          list = list.filter((q) => q.isWeekly === true);
        } else {
          list = list.filter((q) => q.topicId === topicFilter);
        }
      }
      if (difficultyFilter !== "all") {
        list = list.filter((q) => q.difficulty === difficultyFilter);
      }

      setFilteredQuestions(list.length > 0 ? list : QUESTION_BANK);
      setCurrentIndex(0);
      resetQuestionState();
    }
  }, [activeMode, activeSet15Id, gradeFilter, topicFilter, difficultyFilter]);

  const resetQuestionState = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setAiExplanation(null);
  };

  const currentQuestion = filteredQuestions[currentIndex] || QUESTION_BANK[0];

  // When switching to a question that was previously answered in this session
  useEffect(() => {
    if (currentQuestion && answeredHistory[currentQuestion.id]) {
      const history = answeredHistory[currentQuestion.id];
      setSelectedOption(history.selected);
      setIsAnswered(true);
    } else {
      resetQuestionState();
    }
  }, [currentIndex, currentQuestion]);

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;

    setSelectedOption(optionId);
    setIsAnswered(true);

    const isCorrect = optionId === currentQuestion.correctAnswer;
    const baseXP = currentQuestion.xpReward || 25;
    const bonusXP = isCorrect ? (combo >= 2 ? 15 : 0) : 0;
    const totalXP = isCorrect ? baseXP + bonusXP : 5;

    // Save to local session answer history
    setAnsweredHistory((prev) => ({
      ...prev,
      [currentQuestion.id]: { selected: optionId, isCorrect },
    }));

    if (isCorrect) {
      setCombo((prev) => prev + 1);
      setScore((prev) => prev + totalXP);
      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.8 },
      });
    } else {
      setCombo(0);
    }

    onQuestionCompleted(currentQuestion, isCorrect, totalXP);
  };

  const handleNextQuestion = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed current quiz set
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });

      const totalQ = filteredQuestions.length;
      const historyList = Object.values(answeredHistory) as { selected: string; isCorrect: boolean }[];
      const correctCount = historyList.filter((a) => a.isCorrect).length;
      const accuracy = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
      const topicName =
        activeMode === "exam-sets-15"
          ? `ชุดข้อสอบมาตรฐาน 15 ข้อ (${activeSet15Id})`
          : ruleSets.find((r) => r.id === topicFilter)?.name || "ชุดรวม";

      // Submit score to Google Sheets if student is registered
      const studentProfile = sheetService.getStudentProfile();
      if (studentProfile) {
        sheetService.submitQuizScore({
          studentName: studentProfile.name,
          grade: studentProfile.grade,
          studentNo: studentProfile.studentNo,
          topicTitle: `แบบทดสอบ: ${topicName}`,
          score: correctCount,
          totalQuestions: totalQ,
          percentage: accuracy,
          xpEarned: score,
          mode: activeMode === "exam-sets-15" ? "exam" : "quiz",
        });
      }

      setCompletedResultData({
        topicTitle: `แบบทดสอบ: ${topicName}`,
        totalQuestions: totalQ,
        correctCount,
        xpEarned: score,
        questions: filteredQuestions,
        answeredHistory: { ...answeredHistory },
      });
      setShowResultModal(true);
    }
  };

  const handleRetryQuiz = () => {
    setShowResultModal(false);
    setCurrentIndex(0);
    setAnsweredHistory({});
    setScore(0);
    setCombo(0);
    resetQuestionState();
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const askAiTutor = async () => {
    if (!currentQuestion) return;
    setIsAiLoading(true);
    setAiExplanation(null);

    try {
      const res = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestion.question,
          options: currentQuestion.options,
          correctAnswer: currentQuestion.correctAnswer,
          userAnswer: selectedOption,
          ruleTopic: currentQuestion.topicName,
        }),
      });

      const data = await res.json();
      if (data.explanation) {
        setAiExplanation(data.explanation);
      } else {
        setAiExplanation(
          `💡 **สรุปหลักการสำคัญ:**\n\n- คำตอบที่ถูกต้องคือ **${currentQuestion.correctAnswer}**\n- ใช้สมบัติ: **${currentQuestion.ruleUsed}**\n- ตรวจสอบว่าได้แปลงฐานหรือรวมเลขชี้กำลังถูกต้องหรือไม่`
        );
      }
    } catch (e) {
      setAiExplanation(
        `💡 **คำอธิบายจากระบบ:**\n\n- คำตอบที่ถูกต้องคือ **${currentQuestion.correctAnswer}**\n- ใช้สมบัติ **${currentQuestion.ruleUsed}**\n- ลองตรวจสอบวิธีทำทีละขั้นในกล่องด้านบน`
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  // Rule sets definition for quick switcher
  const ruleSets = [
    {
      id: "all",
      name: "รวมทุกสมบัติ (คละข้อสอบ)",
      formula: "\\text{รวมข้อสอบ } 60+ \\text{ ข้อ}",
      grade: "ม.1 - ม.2",
      count: QUESTION_BANK.length,
      badge: "⭐ แนะนำ",
      color: "from-indigo-600 to-violet-700"
    },
    {
      id: "rule-product-same-base",
      name: "1. การคูณฐานเดียวกัน",
      formula: "a^m \\times a^n = a^{m+n}",
      grade: "ม.1",
      count: QUESTION_BANK.filter((q) => q.topicId === "rule-product-same-base").length,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: "rule-quotient-same-base",
      name: "2. การหารฐานเดียวกัน",
      formula: "\\frac{a^m}{a^n} = a^{m-n}",
      grade: "ม.1",
      count: QUESTION_BANK.filter((q) => q.topicId === "rule-quotient-same-base").length,
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "rule-power-of-power",
      name: "3. กำลังซ้อนกัน",
      formula: "(a^m)^n = a^{mn}",
      grade: "ม.2",
      count: QUESTION_BANK.filter((q) => q.topicId === "rule-power-of-power").length,
      color: "from-purple-500 to-pink-600"
    },
    {
      id: "rule-power-of-product",
      name: "4. กำลังของผลคูณ",
      formula: "(ab)^n = a^n b^n",
      grade: "ม.1",
      count: QUESTION_BANK.filter((q) => q.topicId === "rule-power-of-product").length,
      color: "from-amber-500 to-orange-600"
    },
    {
      id: "rule-power-of-quotient",
      name: "5. กำลังของผลหาร",
      formula: "\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}",
      grade: "ม.1",
      count: QUESTION_BANK.filter((q) => q.topicId === "rule-power-of-quotient").length,
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: "rule-zero-negative-power",
      name: "6. กำลังศูนย์และลบ",
      formula: "a^0 = 1, \\, a^{-n} = \\frac{1}{a^n}",
      grade: "ม.1-ม.2",
      count: QUESTION_BANK.filter((q) => q.topicId === "rule-zero-negative-power").length,
      color: "from-rose-500 to-red-600"
    },
    {
      id: "rule-scientific-notation",
      name: "7. สัญกรณ์วิทยาศาสตร์",
      formula: "A \\times 10^n \\; (1 \\le A < 10)",
      grade: "ม.1",
      count: QUESTION_BANK.filter((q) => q.topicId === "rule-scientific-notation").length,
      color: "from-teal-500 to-emerald-600"
    },
    {
      id: "rule-mixed-applications",
      name: "8. โจทย์ประยุกต์ & O-NET",
      formula: "\\text{ข้อสอบเข้า ม.3 / แข่งขัน}",
      grade: "ม.2",
      count: QUESTION_BANK.filter((q) => q.topicId === "rule-mixed-applications").length,
      color: "from-fuchsia-600 to-pink-600"
    }
  ];

  const currentRuleInfo = ruleSets.find((r) => r.id === topicFilter) || ruleSets[0];
  const currentExamSet15 = STANDARD_EXAM_SETS_15.find((s) => s.id === activeSet15Id) || STANDARD_EXAM_SETS_15[0];

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* 0. TOP-LEVEL MODE SWITCHER: 15-QUESTION SETS vs RULE-BASED PRACTICE */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-5 sm:p-6 text-white shadow-xl space-y-4 border border-indigo-700/50">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-900 font-black text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                ชุดละ 15 ข้อ
              </span>
              <h2 className="text-xl sm:text-2xl font-black">
                คลังแบบทดสอบชุดละ 15 ข้อ โดย ครูนิรชา (KruNiracha)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-indigo-200">
              ฝึกทำโจทย์แบบชุดมาตรฐาน 15 ข้อ เพื่อจำลองการสอบจริง หรือเลือกฝึกเฉพาะรายกฎ 8 สมบัติ
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center bg-black/30 p-1.5 rounded-2xl border border-white/10 w-full md:w-auto">
            <button
              onClick={() => setActiveMode("exam-sets-15")}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                activeMode === "exam-sets-15"
                  ? "bg-amber-400 text-slate-950 shadow-md font-black"
                  : "text-indigo-200 hover:text-white"
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>ชุดข้อสอบ 15 ข้อ (4 ชุดมาตรฐาน)</span>
            </button>
            <button
              onClick={() => setActiveMode("rule-practice")}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                activeMode === "rule-practice"
                  ? "bg-white text-indigo-950 shadow-md font-black"
                  : "text-indigo-200 hover:text-white"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>ฝึกตาม 8 สมบัติ</span>
            </button>
          </div>
        </div>

        {/* If 15-question exam mode is selected, show 4 standard sets */}
        {activeMode === "exam-sets-15" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {STANDARD_EXAM_SETS_15.map((set, idx) => {
              const isSelected = activeSet15Id === set.id;
              return (
                <div
                  key={set.id}
                  onClick={() => setActiveSet15Id(set.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border-2 flex flex-col justify-between ${
                    isSelected
                      ? "bg-white text-slate-900 border-amber-400 shadow-lg scale-102 ring-2 ring-amber-400"
                      : "bg-white/10 hover:bg-white/15 text-white border-white/20"
                  }`}
                >
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isSelected ? "bg-indigo-100 text-indigo-700" : "bg-white/20 text-white"
                      }`}>
                        {set.badge}
                      </span>
                      <span className="text-[11px] font-bold opacity-80">
                        ชุดที่ {idx + 1}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-xs sm:text-sm leading-snug">
                      {set.title}
                    </h4>
                    <p className={`text-[11px] line-clamp-2 ${isSelected ? "text-slate-600" : "text-indigo-200"}`}>
                      {set.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-current/10 text-[11px] font-bold">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> 15 ข้อ ({set.timeLimitMinutes} นาที)
                    </span>
                    <span className="text-amber-500 font-black">
                      +{set.xpReward} XP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 1. RULE SET SELECTOR (ONLY WHEN IN RULE-PRACTICE MODE) */}
      {/* ========================================================================= */}
      {activeMode === "rule-practice" && (
        <div className="bg-white dark:bg-[#1E293B] rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 p-4 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-[#6366F1] dark:text-indigo-400">
                  <Compass className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    เลือกฝึกตามรายสมบัติ (Rule Question Sets)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    เลือกเจาะลึกเฉพาะสมบัติที่ต้องการเพื่อสะสม XP และแก้จุดอ่อน
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
                กำลังทำ: <span className="text-[#6366F1] dark:text-indigo-300 font-extrabold">{currentRuleInfo.name}</span>
              </span>

              <button
                onClick={() => setShowRuleSelectorGrid(!showRuleSelectorGrid)}
                className="text-xs font-bold px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-[#6366F1] dark:text-indigo-300 hover:bg-indigo-100 rounded-xl transition-all flex items-center gap-1.5 border border-indigo-100 dark:border-indigo-900/50"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{showRuleSelectorGrid ? "ย่อเมนูชุดข้อสอบ" : "ดูทุกชุดข้อสอบ (8 หมวด)"}</span>
              </button>
            </div>
          </div>

          {/* Scrollable Quick Rule Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
            {ruleSets.map((set) => {
              const isSelected = topicFilter === set.id;
              return (
                <button
                  key={set.id}
                  onClick={() => {
                    setTopicFilter(set.id);
                    setShowRuleSelectorGrid(false);
                  }}
                  className={`flex-shrink-0 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border-2 ${
                    isSelected
                      ? "bg-[#6366F1] text-white border-[#6366F1] shadow-md shadow-indigo-500/20"
                      : "bg-[#F8FAFC] dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-slate-600"
                  }`}
                >
                  <span>{set.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {set.count} ข้อ
                  </span>
                </button>
              );
            })}
          </div>

          {/* Expandable Grid of all Rule Sets */}
          {showRuleSelectorGrid && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800"
            >
              {ruleSets.map((set) => {
                const isSelected = topicFilter === set.id;
                return (
                  <div
                    key={set.id}
                    onClick={() => {
                      setTopicFilter(set.id);
                      setShowRuleSelectorGrid(false);
                    }}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "bg-indigo-50/70 dark:bg-indigo-950/40 border-[#6366F1] ring-2 ring-indigo-400"
                        : "bg-[#F8FAFC] dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/60 hover:border-indigo-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-extrabold text-xs text-slate-800 dark:text-slate-200">
                        {set.name}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                        {set.grade}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 mb-2">
                      <MathView expression={set.formula} />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                      <span>คลังข้อสอบ: {set.count} ข้อ</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
                        เลือกชุดนี้ <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SUB-FILTER & TOOLBAR (ระดับชั้น, ความยาก, กระดานทด) */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-[#1E293B] p-3.5 sm:p-4 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> ระดับชั้น:
          </span>

          {/* Grade Selector */}
          <div className="flex items-center bg-[#F1F5F9] dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            {(["all", "ม.1", "ม.2"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGradeFilter(g)}
                className={`px-3 py-1 rounded-lg transition-all font-bold ${
                  gradeFilter === g
                    ? "bg-white dark:bg-slate-700 text-[#6366F1] dark:text-indigo-300 shadow-xs"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {g === "all" ? "ทุกระดับชั้น" : g}
              </button>
            ))}
          </div>

          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-2">
            ความยาก:
          </span>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as any)}
            className="text-xs font-bold bg-[#F1F5F9] dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-none rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">ทุกระดับความยาก</option>
            <option value="easy">ระดับง่าย (Easy)</option>
            <option value="medium">ระดับปานกลาง (Medium)</option>
            <option value="hard">ระดับยาก (Hard)</option>
            <option value="exam">ระดับข้อสอบแข่งขัน (Exam)</option>
          </select>
        </div>

        {/* Stats / Tools */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          {combo >= 2 && (
            <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded-full text-xs font-extrabold animate-bounce">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{combo} Combo Streak!</span>
            </div>
          )}

          <button
            onClick={() => setShowScratchpad(true)}
            className="px-3.5 py-1.5 bg-[#F1F5F9] dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700"
          >
            <PenTool className="w-3.5 h-3.5 text-[#6366F1]" />
            <span>กระดานทดเลข</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. QUESTION STEPPER / NUMBER JUMPER (15 ข้อ Matrix) */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 p-3 sm:p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {activeMode === "exam-sets-15" ? "แบบทดสอบชุดละ 15 ข้อ" : `ข้อสอบในชุดนี้ (${filteredQuestions.length} ข้อ)`}:
          </span>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            ทำแล้ว {Object.keys(answeredHistory).filter((id) => filteredQuestions.some((q) => q.id === id)).length} / {filteredQuestions.length} ข้อ
          </span>
        </div>

        <div className="grid grid-cols-8 sm:grid-cols-15 gap-1.5 pt-1">
          {filteredQuestions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const history = answeredHistory[q.id];
            const isAnswered = !!history;
            const isCorrect = history?.isCorrect;

            let btnStyle = "bg-[#F1F5F9] dark:bg-slate-800 text-slate-600 dark:text-slate-400";
            if (isAnswered) {
              btnStyle = isCorrect
                ? "bg-emerald-500 text-white font-black"
                : "bg-rose-500 text-white font-black";
            }
            if (isCurrent) {
              btnStyle = "bg-[#6366F1] text-white ring-2 ring-indigo-300 dark:ring-indigo-700 font-black scale-105";
            }

            return (
              <button
                key={q.id || idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-8 rounded-xl flex items-center justify-center text-xs transition-all ${btnStyle}`}
                title={`ข้อที่ ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MAIN QUESTION CARD BENTO */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-[#1E293B] rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 p-5 sm:p-8 shadow-xs space-y-6">
        {/* Progress header */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#EEF2FF] dark:bg-indigo-950 text-[#6366F1] dark:text-indigo-300 font-bold">
              {currentQuestion.topicName}
            </span>
            <span className="font-semibold text-slate-500">
              ระดับ: {currentQuestion.gradeLevel} ({currentQuestion.difficulty})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-200">
              ข้อ {currentIndex + 1} / {filteredQuestions.length} (ชุด 15 ข้อ)
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 font-black">
              +{currentQuestion.xpReward} XP
            </span>
          </div>
        </div>

        {/* Question Text */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed">
            <FormattedMathText text={currentQuestion.question} />
          </h2>

          {currentQuestion.mathExpression && (
            <div className="bg-[#F8FAFC] dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 text-center overflow-x-auto">
              <MathView expression={currentQuestion.mathExpression} large />
            </div>
          )}
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {currentQuestion.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const isCorrect = opt.id === currentQuestion.correctAnswer;

            let btnStyle = "bg-white dark:bg-slate-800 border-[#E2E8F0] dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-[#6366F1]";

            if (isAnswered) {
              if (isCorrect) {
                btnStyle = "bg-emerald-50 dark:bg-emerald-950/60 border-[#10B981] text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500";
              } else if (isSelected && !isCorrect) {
                btnStyle = "bg-rose-50 dark:bg-rose-950/60 border-[#F43F5E] text-rose-900 dark:text-rose-200 ring-2 ring-rose-500";
              } else {
                btnStyle = "bg-[#F8FAFC] dark:bg-slate-900/50 border-[#F1F5F9] dark:border-slate-800 text-slate-400 opacity-60";
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                disabled={isAnswered}
                className={`p-4 rounded-2xl border-2 font-semibold text-sm sm:text-base flex items-center justify-between text-left transition-all ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isSelected
                        ? "bg-[#6366F1] text-white"
                        : "bg-[#F1F5F9] dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {opt.id}
                  </span>
                  <span className="flex-1">
                    <FormattedMathText text={opt.text} />
                  </span>
                </div>

                {isAnswered && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Controls & Hints */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#F1F5F9] dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 flex items-center gap-1.5 hover:bg-amber-100 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{showHint ? "ซ่อนคำใบ้" : "ขอคำใบ้"}</span>
            </button>

            <button
              onClick={() => onOpenLesson(currentQuestion.topicId)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#EEF2FF] dark:bg-indigo-950 text-[#6366F1] dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50 flex items-center gap-1.5 hover:bg-indigo-100 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>อ่านสรุปกฎนี้</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {currentIndex > 0 && (
              <button
                onClick={handlePrevQuestion}
                className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>ข้อย้อนหลัง</span>
              </button>
            )}

            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 bg-[#6366F1] hover:bg-indigo-600 text-white rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
              >
                <span>{currentIndex < filteredQuestions.length - 1 ? `ข้อถัดไป (${currentIndex + 2}/${filteredQuestions.length})` : "ดูผลลัพธ์ชุด 15 ข้อ"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Hint Container */}
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-2.5"
          >
            <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-bold">คำใบ้: </span>
              <FormattedMathText text={currentQuestion.hint} />
            </div>
          </motion.div>
        )}

        {/* Detailed Explanation & Step-by-Step Box (Shown after answered) */}
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] dark:bg-slate-900 border-2 border-[#E2E8F0] dark:border-slate-800 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>เฉลยละเอียด & วิธีคิดทีละขั้นตอน</span>
              </h4>

              <button
                onClick={askAiTutor}
                disabled={isAiLoading}
                className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-bold border border-indigo-200 dark:border-indigo-900/60 flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>{isAiLoading ? "กำลังวิเคราะห์..." : "ถาม AI ติวเตอร์"}</span>
              </button>
            </div>

            {/* Step by step list */}
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {currentQuestion.stepByStep.map((step, sIdx) => (
                <div key={sIdx} className="flex items-start gap-2.5 bg-white dark:bg-slate-800/80 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60">
                  <span className="w-5 h-5 rounded-full bg-[#EEF2FF] dark:bg-indigo-950 text-[#6366F1] dark:text-indigo-300 text-[11px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                    {sIdx + 1}
                  </span>
                  <div className="flex-1 leading-relaxed">
                    <FormattedMathText text={step} />
                  </div>
                </div>
              ))}
            </div>

            {/* Common Mistake Alert */}
            {currentQuestion.commonMistake && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-800 dark:text-rose-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold">จุดที่นักเรียนมักผิดบ่อย: </span>
                  <FormattedMathText text={currentQuestion.commonMistake} />
                </div>
              </div>
            )}

            {/* AI Explanation Box */}
            {aiExplanation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 whitespace-pre-line space-y-2"
              >
                <div className="font-bold flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                  <Sparkles className="w-4 h-4" />
                  <span>คำแนะนำพิเศษจาก AI ติวเตอร์:</span>
                </div>
                <div className="leading-relaxed">
                  <FormattedMathText text={aiExplanation} />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Scratchpad Modal */}
      {showScratchpad && (
        <Scratchpad onClose={() => setShowScratchpad(false)} />
      )}

      {/* Quiz Result Summary & Web Share Modal */}
      {showResultModal && completedResultData && (
        <QuizResultModal
          isOpen={showResultModal}
          onClose={() => {
            setShowResultModal(false);
            setCurrentIndex(0);
          }}
          onRetry={handleRetryQuiz}
          topicTitle={completedResultData.topicTitle}
          totalQuestions={completedResultData.totalQuestions}
          correctCount={completedResultData.correctCount}
          xpEarned={completedResultData.xpEarned}
          questions={completedResultData.questions}
          answeredHistory={completedResultData.answeredHistory}
          studentProfile={sheetService.getStudentProfile()}
          onOpenLesson={onOpenLesson}
        />
      )}
    </div>
  );
};
