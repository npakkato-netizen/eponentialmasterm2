import React, { useState, useEffect, useRef } from "react";
import { Question, UserStats, ExponentRuleId } from "../types";
import { WeakRuleInfo, getTop3WeakestRules, generateFocusedDrillQuestions } from "../utils/weaknessUtils";
import { MathView } from "./MathView";
import { FormattedMathText } from "./FormattedMathText";
import { Scratchpad } from "./Scratchpad";
import confetti from "canvas-confetti";
import {
  Target,
  CheckCircle2,
  XCircle,
  Sparkles,
  Bot,
  PenTool,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Flame,
  Award,
  Zap,
  Lightbulb,
  AlertCircle,
  Clock,
  BookOpen,
  X,
  TrendingUp,
  ShieldAlert,
  ChevronRight,
  Activity,
  Check,
  AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FocusedMasteryModeProps {
  stats: UserStats;
  isOpen?: boolean;
  onClose: () => void;
  onQuestionCompleted: (
    question: Question,
    isCorrect: boolean,
    xpEarned: number
  ) => void;
  onOpenLesson: (ruleId: string) => void;
}

export const FocusedMasteryMode: React.FC<FocusedMasteryModeProps> = ({
  stats,
  isOpen = true,
  onClose,
  onQuestionCompleted,
  onOpenLesson,
}) => {
  // Extract 3 weakest rules
  const [weakRules, setWeakRules] = useState<WeakRuleInfo[]>(() => getTop3WeakestRules(stats));
  const [questions, setQuestions] = useState<Question[]>([]);
  const [stage, setStage] = useState<"overview" | "drill" | "summary">("overview");

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showScratchpad, setShowScratchpad] = useState<boolean>(false);

  // Session results per question
  const [sessionAnswers, setSessionAnswers] = useState<
    { question: Question; userAnswer: string; isCorrect: boolean; ruleId: string }[]
  >([]);

  const [combo, setCombo] = useState<number>(0);
  const [earnedXpTotal, setEarnedXpTotal] = useState<number>(0);

  // AI Tutor explanation state
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // Refresh weak rules when stats change or when opened
  useEffect(() => {
    const extracted = getTop3WeakestRules(stats);
    setWeakRules(extracted);
  }, [stats]);

  // Start the drill
  const startDrillSession = () => {
    const generated = generateFocusedDrillQuestions(weakRules, 3);
    setQuestions(generated.questions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setAiExplanation(null);
    setSessionAnswers([]);
    setEarnedXpTotal(0);
    setCombo(0);
    setStage("drill");
  };

  const currentQuestion = questions[currentIndex];
  const currentTargetWeakRule = weakRules.find((w) => w.rule.id === currentQuestion?.topicId) || weakRules[0];
  const currentRuleIndex = weakRules.findIndex((w) => w.rule.id === currentQuestion?.topicId);

  const handleSelectOption = (optionId: string) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedOption(optionId);
    setIsAnswered(true);

    const isCorrect = optionId === currentQuestion.correctAnswer;
    const baseXP = currentQuestion.xpReward || 25;
    // Mastery bonus for repairing weak topics
    const masteryBonus = isCorrect ? 15 : 0;
    const comboBonus = isCorrect && combo >= 2 ? 10 : 0;
    const totalXP = isCorrect ? baseXP + masteryBonus + comboBonus : 5;

    setEarnedXpTotal((prev) => prev + totalXP);

    setSessionAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion,
        userAnswer: optionId,
        isCorrect,
        ruleId: currentQuestion.topicId,
      },
    ]);

    if (isCorrect) {
      setCombo((prev) => prev + 1);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.75 },
      });
    } else {
      setCombo(0);
    }

    onQuestionCompleted(currentQuestion, isCorrect, totalXP);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
      setAiExplanation(null);
    } else {
      // Completed drill
      finishDrill();
    }
  };

  const finishDrill = () => {
    setStage("summary");
    // Completion bonus for finishing targeted weakness drill
    const completionBonus = 60;
    setEarnedXpTotal((prev) => prev + completionBonus);

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.55 },
    });
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
          ruleTopic: `${currentQuestion.topicName} (Focused Remedial Drill)`,
        }),
      });

      const data = await res.json();
      if (data.explanation) {
        setAiExplanation(data.explanation);
      } else {
        setAiExplanation(
          `💡 **สรุปหลักการสำคัญสำหรับกฎนี้:**\n\n- คำตอบที่ถูกต้องคือ **${currentQuestion.correctAnswer}**\n- สมบัติที่ใช้: **${currentQuestion.ruleUsed}**\n- เคล็ดลับซ่อมจุดอ่อน: สังเกตการกระจายเลขชี้กำลังและเครื่องหมายบวกลบให้ละเอียด`
        );
      }
    } catch {
      setAiExplanation(
        `💡 **คำอธิบายจากระบบ:**\n\n- คำตอบที่ถูกต้องคือ **${currentQuestion.correctAnswer}**\n- ใช้สมบัติ **${currentQuestion.ruleUsed}**\n- สังเกตขั้นตอนวิธีทำในกล่องเฉลยด้านบนเพื่อความแม่นยำ`
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white dark:bg-[#1E293B] w-full max-w-4xl rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[94vh]"
      >
        {/* ========================================================================= */}
        {/* 1. MODAL HEADER */}
        {/* ========================================================================= */}
        <div className="px-6 py-4 bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl font-black shadow-inner">
              🎯
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">
                  Focused Mastery Mode
                </h3>
                <span className="bg-white/20 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  3 Weakest Rules Remediation
                </span>
              </div>
              <p className="text-xs text-purple-100 hidden sm:block">
                ระบบดึง 3 กฎที่มีจุดอ่อนสูงสุดอัตโนมัติ เพื่อสร้างคลังโจทย์ซ่อมแซมจุดบกพร่องแบบเจาะจง
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {stage === "drill" && combo >= 2 && (
              <div className="flex items-center gap-1 px-3 py-1 bg-amber-400 text-slate-950 rounded-xl text-xs font-black animate-bounce">
                <Flame className="w-3.5 h-3.5 fill-slate-950" />
                <span>{combo} Combo</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. BODY CONTENT (3 STAGES: OVERVIEW -> DRILL -> SUMMARY) */}
        {/* ========================================================================= */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* ----------------------------------------------------------------------- */}
          {/* STAGE A: PRE-DRILL OVERVIEW & 3 WEAKEST RULES PRESENTATION */}
          {/* ----------------------------------------------------------------------- */}
          {stage === "overview" && (
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 text-xs font-black border border-rose-200 dark:border-rose-900/50">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>AI Diagnostics Result</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  3 สมบัติเลขยกกำลังที่ตรวจพบจุดอ่อนสูงสุด
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  ระบบได้วิเคราะห์จากประวัติการทำโจทย์ของคุณ และคัดเลือก 3 กฎที่ควรเร่งซ่อมแซม
                  เพื่อจัดเป็นชุดแบบฝึกหัดพิเศษจำนวน {weakRules.length * 3} ข้อ (3 ข้อต่อสมบัติ)
                </p>
              </div>

              {/* 3 Weak Rules Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {weakRules.map((weakItem, idx) => {
                  const { rule, stats: rStats, accuracy, deficitReason, focusTip } = weakItem;

                  return (
                    <div
                      key={rule.id}
                      className="p-5 rounded-3xl border-2 border-rose-100 dark:border-rose-900/40 bg-gradient-to-b from-rose-50/50 dark:from-rose-950/20 to-white dark:to-slate-900 flex flex-col justify-between space-y-4 shadow-xs relative overflow-hidden group hover:border-rose-400 transition-all"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 rounded-bl-3xl flex items-center justify-center font-black text-rose-600 dark:text-rose-400 text-lg">
                        #{idx + 1}
                      </div>

                      <div>
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/80 text-rose-700 dark:text-rose-300 uppercase tracking-wider inline-block mb-2">
                          เป้าหมายที่ {idx + 1} • {rule.gradeLevel}
                        </span>

                        <h4 className="font-black text-sm text-slate-800 dark:text-white leading-snug">
                          {rule.title}
                        </h4>

                        <div className="mt-2.5 p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-indigo-600 dark:text-indigo-400 text-center">
                          <MathView expression={rule.shortFormula} />
                        </div>

                        {/* Deficit detail */}
                        <div className="mt-3 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                          <div className="flex items-start gap-1.5 text-rose-700 dark:text-rose-300 font-semibold text-[11px]">
                            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                            <span>{deficitReason}</span>
                          </div>
                        </div>
                      </div>

                      {/* Accuracy bar & baseline */}
                      <div className="pt-3 border-t border-rose-100 dark:border-rose-900/40">
                        <div className="flex items-center justify-between text-xs font-bold mb-1">
                          <span className="text-slate-500 dark:text-slate-400">ความแม่นยำปัจจุบัน</span>
                          <span className="text-rose-600 dark:text-rose-400 font-black">
                            {rStats.total > 0 ? `${accuracy}%` : "ยังไม่เริ่ม"}
                          </span>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full"
                            style={{ width: `${rStats.total > 0 ? accuracy : 10}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                          <span>ถูก {rStats.correct} จาก {rStats.total} ข้อ</span>
                          <span>โจทย์ในดริลล์: 3 ข้อ</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Drill Plan Information */}
              <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      แผนการฝึก 3 ระดับความเข้มข้น (Foundation ➔ Application)
                    </h5>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      โจทย์จะเรียงลำดับจากระดับง่ายเพื่อปรับความเข้าใจ ➔ ปานกลาง ➔ ข้อสอบประยุกต์
                      พร้อมรับโบนัสพิเศษ <span className="font-black text-indigo-600 dark:text-indigo-400">+75 XP Weakness Remedial Bonus</span>
                    </p>
                  </div>
                </div>

                <button
                  id="btn-start-focused-mastery-drill"
                  onClick={startDrillSession}
                  className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white rounded-2xl text-sm font-black shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all flex-shrink-0"
                >
                  <span>เริ่มการฝึกซ่อมจุดอ่อน ({weakRules.length * 3} ข้อ)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* STAGE B: ACTIVE QUESTION DRILL */}
          {/* ----------------------------------------------------------------------- */}
          {stage === "drill" && currentQuestion && (
            <div className="space-y-6">
              {/* Stepper Header with Rule Group Indicators */}
              <div className="bg-[#F8FAFC] dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-indigo-600 dark:text-indigo-400">
                      ข้อที่ {currentIndex + 1} / {questions.length}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="font-bold text-slate-600 dark:text-slate-300">
                      กำลังเน้น: กฎข้อที่ {currentRuleIndex + 1} จาก 3 กฎ
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowScratchpad(true)}
                      className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:bg-slate-100"
                    >
                      <PenTool className="w-3.5 h-3.5 text-indigo-600" />
                      <span>กระดานทด</span>
                    </button>

                    <span className="font-black text-amber-600 dark:text-amber-400 text-xs">
                      +{currentQuestion.xpReward || 25} XP
                    </span>
                  </div>
                </div>

                {/* Question dots */}
                <div className="flex items-center gap-1.5">
                  {questions.map((q, idx) => {
                    const isDone = idx < currentIndex || (idx === currentIndex && isAnswered);
                    const ans = sessionAnswers.find((a) => a.question.id === q.id);
                    const isCurrent = idx === currentIndex;

                    let bg = "bg-slate-200 dark:bg-slate-700";
                    if (ans) {
                      bg = ans.isCorrect ? "bg-emerald-500" : "bg-rose-500";
                    } else if (isCurrent) {
                      bg = "bg-indigo-600 scale-110 ring-2 ring-indigo-300";
                    }

                    return (
                      <div
                        key={q.id}
                        className={`h-2 flex-1 rounded-full transition-all ${bg}`}
                        title={`ข้อ ${idx + 1}: ${q.topicName}`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Target Rule Focused Header Banner */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-rose-50 via-purple-50 to-indigo-50 dark:from-rose-950/30 dark:via-purple-950/30 dark:to-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-xs flex-shrink-0">
                    #{currentRuleIndex + 1}
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                      Target Rule Focus
                    </span>
                    <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">
                      {currentTargetWeakRule?.rule.title}
                    </span>
                  </div>
                </div>

                <div className="p-1.5 px-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-indigo-600 dark:text-indigo-400 hidden sm:block">
                  <MathView expression={currentTargetWeakRule?.rule.shortFormula || ""} />
                </div>
              </div>

              {/* Main Question Display */}
              <div className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
                  <FormattedMathText text={currentQuestion.question} />
                </h2>

                {currentQuestion.mathExpression && (
                  <div className="bg-[#F8FAFC] dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border-2 border-slate-200/80 dark:border-slate-800 text-center overflow-x-auto">
                    <MathView expression={currentQuestion.mathExpression} large />
                  </div>
                )}
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {currentQuestion.options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  const isCorrect = opt.id === currentQuestion.correctAnswer;

                  let btnStyle = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-[#6366F1]";

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

              {/* Action Buttons & Helpers */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 flex items-center gap-1.5 hover:bg-amber-100"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{showHint ? "ซ่อนคำใบ้" : "ขอคำใบ้"}</span>
                  </button>

                  <button
                    onClick={() => onOpenLesson(currentQuestion.topicId)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/50 flex items-center gap-1.5 hover:bg-indigo-100"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>อ่านสรุปกฎนี้</span>
                  </button>
                </div>

                {isAnswered && (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
                  >
                    <span>
                      {currentIndex < questions.length - 1 ? "ข้อถัดไป" : "ดูรายงานการพัฒนา"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Hint Box */}
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-2.5"
                >
                  <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold">คำใบ้: </span>
                    <FormattedMathText text={currentQuestion.hint} />
                  </div>
                </motion.div>
              )}

              {/* Step-by-Step & Remedial Explanation (Shown when answered) */}
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>เฉลยละเอียด & วิเคราะห์แก้จุดที่สับสน</span>
                    </h4>

                    <button
                      onClick={askAiTutor}
                      disabled={isAiLoading}
                      className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-bold border border-indigo-200 dark:border-indigo-900/60 flex items-center gap-1.5 shadow-xs"
                    >
                      <Bot className="w-3.5 h-3.5" />
                      <span>{isAiLoading ? "กำลังวิเคราะห์..." : "ถาม AI ติวเตอร์"}</span>
                    </button>
                  </div>

                  {/* Step by step list */}
                  <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {currentQuestion.stepByStep.map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-start gap-2.5 bg-white dark:bg-slate-800/80 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60"
                      >
                        <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[11px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
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
                        <span className="font-bold">จุดดักที่ต้องจำ: </span>
                        <FormattedMathText text={currentQuestion.commonMistake} />
                      </div>
                    </div>
                  )}

                  {/* AI Explanation */}
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
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* STAGE C: SUMMARY REPORT & REMEDIAL IMPACT */}
          {/* ----------------------------------------------------------------------- */}
          {stage === "summary" && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-rose-500 via-purple-600 to-indigo-600 text-white flex items-center justify-center text-4xl shadow-xl shadow-indigo-500/20 animate-pulse">
                🏆
              </div>

              <div>
                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950 px-3 py-1 rounded-full">
                  Focused Remediation Complete
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
                  ซ่อมแซม 3 จุดอ่อนสำเร็จ!
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
                  รายงานผลการพัฒนาความแม่นยำของทั้ง 3 กฎที่ฝึกฝนในรอบนี้
                </p>
              </div>

              {/* Metric stats 3 columns */}
              <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] font-bold text-slate-400 block">ทำถูกในดริลล์นี้</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    {sessionAnswers.filter((a) => a.isCorrect).length} / {questions.length}
                  </span>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] font-bold text-slate-400 block">XP ที่ได้รับ</span>
                  <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">
                    +{earnedXpTotal}
                  </span>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] font-bold text-slate-400 block">โบนัสซ่อมจุดอ่อน</span>
                  <span className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    +75 XP
                  </span>
                </div>
              </div>

              {/* Before vs After Drill Mastery Comparison for the 3 Rules */}
              <div className="text-left space-y-3 pt-2">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider px-1">
                  เปรียบเทียบระดับความแม่นยำรายกฎ (Before vs In-Drill):
                </h4>

                <div className="space-y-3">
                  {weakRules.map((weakItem, idx) => {
                    const ruleAnswers = sessionAnswers.filter((a) => a.ruleId === weakItem.rule.id);
                    const drillCorrect = ruleAnswers.filter((a) => a.isCorrect).length;
                    const drillTotal = ruleAnswers.length || 1;
                    const drillAccuracy = Math.round((drillCorrect / drillTotal) * 100);

                    const isImproved = drillAccuracy >= weakItem.accuracy;

                    return (
                      <div
                        key={weakItem.rule.id}
                        className="p-4 bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-xs">
                            #{idx + 1}
                          </div>
                          <div>
                            <h5 className="font-extrabold text-sm text-slate-800 dark:text-white">
                              {weakItem.rule.title}
                            </h5>
                            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-mono">
                              <MathView expression={weakItem.rule.shortFormula} />
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 justify-between sm:justify-end">
                          <div className="text-right">
                            <div className="text-[10px] text-slate-400 font-bold">เดิม ➔ ในดริลล์</div>
                            <div className="font-black text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
                              <span className="text-slate-400">{weakItem.accuracy}%</span>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                              <span className={drillAccuracy >= 70 ? "text-emerald-600" : "text-amber-600"}>
                                {drillAccuracy}%
                              </span>
                            </div>
                          </div>

                          <span
                            className={`px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1 ${
                              drillAccuracy >= 70
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            }`}
                          >
                            {drillAccuracy >= 70 ? <Check className="w-3.5 h-3.5" /> : <Activity className="w-3.5 h-3.5" />}
                            <span>{drillAccuracy >= 70 ? "ผ่านเกณฑ์ซ่อมแซม" : "ควรฝึกซ้ำอีกรอบ"}</span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={startDrillSession}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>ฝึกซ่อมอีกรอบ (สุ่มโจทย์ใหม่)</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                  }}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl text-xs sm:text-sm font-black shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  <span>เสร็จสิ้นและกลับสู่หน้าหลัก</span>
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Scratchpad Overlay */}
      {showScratchpad && <Scratchpad onClose={() => setShowScratchpad(false)} />}
    </div>
  );
};
