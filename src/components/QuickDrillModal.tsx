import React, { useState, useEffect, useRef } from "react";
import { Question, ExponentRuleId } from "../types";
import { QUESTION_BANK, STANDARD_EXAM_SETS_15, select15RandomQuestions, get15QuestionSetById } from "../data/questions";
import { MathView } from "./MathView";
import { FormattedMathText } from "./FormattedMathText";
import { Scratchpad } from "./Scratchpad";
import confetti from "canvas-confetti";
import {
  Timer,
  CheckCircle2,
  XCircle,
  Sparkles,
  Zap,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  X,
  PenTool,
  Award,
  BookOpen,
  ChevronRight,
  Flame,
  Clock,
  AlertTriangle,
  Layers,
  Check,
  Share2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ShareModal } from "./ShareModal";
import { createDrillSharePayload, ShareDataPayload } from "../utils/shareUtils";
import sheetService from "../services/SheetService";

interface QuickDrillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestionCompleted: (
    question: Question,
    isCorrect: boolean,
    xpEarned: number
  ) => void;
  onOpenFullQuiz: () => void;
  onOpenLesson: (ruleId: string) => void;
  initialSetId?: string;
}

export const QuickDrillModal: React.FC<QuickDrillModalProps> = ({
  isOpen,
  onClose,
  onQuestionCompleted,
  onOpenFullQuiz,
  onOpenLesson,
  initialSetId = "set-15-mastery-mixed",
}) => {
  const [selectedSetId, setSelectedSetId] = useState<string>(initialSetId);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showScratchpad, setShowScratchpad] = useState<boolean>(false);

  // Drill statistics
  const [results, setResults] = useState<
    { question: Question; userAnswer: string | null; isCorrect: boolean; timeTaken: number }[]
  >([]);
  const [totalXpEarned, setTotalXpEarned] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [sharePayload, setSharePayload] = useState<ShareDataPayload | null>(null);

  // 15-Minute Countdown timer (900 seconds)
  const DRILL_TIME_LIMIT = 900;
  const [timeLeft, setTimeLeft] = useState<number>(DRILL_TIME_LIMIT);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const questionStartTimeRef = useRef<number>(Date.now());

  // Initialize or reset 15-question drill
  const initDrill = (setIdToUse = selectedSetId) => {
    const picked = get15QuestionSetById(setIdToUse);
    setQuestions(picked);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setResults([]);
    setTotalXpEarned(0);
    setIsCompleted(false);
    setTimeLeft(DRILL_TIME_LIMIT);
    setIsTimerRunning(true);
    questionStartTimeRef.current = Date.now();
  };

  useEffect(() => {
    if (isOpen) {
      initDrill(initialSetId);
      setSelectedSetId(initialSetId);
    } else {
      setIsTimerRunning(false);
    }
  }, [isOpen, initialSetId]);

  // Timer countdown hook
  useEffect(() => {
    if (!isOpen || !isTimerRunning || isCompleted) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishDrill();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isTimerRunning, isCompleted]);

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (optionId: string) => {
    if (isAnswered || !currentQuestion || isCompleted) return;

    setSelectedOption(optionId);
    setIsAnswered(true);

    const isCorrect = optionId === currentQuestion.correctAnswer;
    const baseXP = currentQuestion.xpReward || 25;
    const earnedXP = isCorrect ? baseXP + 10 : 5; // Bonus for exam drill

    const timeSpent = Math.max(1, Math.round((Date.now() - questionStartTimeRef.current) / 1000));

    setResults((prev) => [
      ...prev,
      {
        question: currentQuestion,
        userAnswer: optionId,
        isCorrect,
        timeTaken: timeSpent,
      },
    ]);

    setTotalXpEarned((prev) => prev + earnedXP);

    if (isCorrect) {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.7 },
      });
    }

    onQuestionCompleted(currentQuestion, isCorrect, earnedXP);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      questionStartTimeRef.current = Date.now();
    } else {
      finishDrill();
    }
  };

  const finishDrill = () => {
    setIsCompleted(true);
    setIsTimerRunning(false);

    // Give completion bonus for finishing all 15 questions
    const completionBonus = 100;
    setTotalXpEarned((prev) => prev + completionBonus);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const handleShareDrill = () => {
    const studentProfile = sheetService.getStudentProfile();
    const currentSet = STANDARD_EXAM_SETS_15.find((s) => s.id === selectedSetId);
    const spentMinutes = Math.floor(totalTimeSpent / 60);
    const spentSeconds = totalTimeSpent % 60;
    const timeFormatted = `${spentMinutes}:${spentSeconds < 10 ? "0" : ""}${spentSeconds} นาที`;

    const payload = createDrillSharePayload({
      studentName: studentProfile?.name,
      grade: studentProfile?.grade,
      setName: currentSet?.title || "ชุดข้อสอบ 15 ข้อ",
      correctCount,
      totalCount: questions.length,
      timeSpent: timeFormatted,
      xpEarned: totalXpEarned,
    });

    setSharePayload(payload);
    setShowShareModal(true);
  };

  if (!isOpen) return null;

  const correctCount = results.filter((r) => r.isCorrect).length;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  const totalTimeSpent = DRILL_TIME_LIMIT - timeLeft;
  const spentMinutes = Math.floor(totalTimeSpent / 60);
  const spentSeconds = totalTimeSpent % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white dark:bg-[#0F172A] w-full max-w-3xl rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[94vh]"
      >
        {/* Header Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl font-black shadow-inner">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">ชุดแบบทดสอบมาตรฐาน 15 ข้อ</h3>
                <span className="bg-amber-400 text-slate-900 text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  15 Questions
                </span>
              </div>
              <p className="text-xs text-purple-100 hidden sm:block">
                แบบทดสอบชุดละ 15 ข้อ โดย ครูนิรชา (KruNiracha) • วัดผลครอบคลุมสมบัติ ม.1-ม.2
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Timer Badge */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-mono font-black text-xs sm:text-sm border backdrop-blur-md ${
                timeLeft <= 120
                  ? "bg-rose-600/90 text-white border-rose-300 animate-pulse"
                  : timeLeft <= 300
                  ? "bg-amber-600/90 text-white border-amber-300"
                  : "bg-black/20 text-white border-white/30"
              }`}
            >
              <Timer className="w-4 h-4" />
              <span>{formattedTime}</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Set Switcher Bar */}
        {!isCompleted && (
          <div className="px-4 sm:px-6 py-2.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-slate-500 font-bold whitespace-nowrap hidden sm:inline">เลือกชุด 15 ข้อ:</span>
            {STANDARD_EXAM_SETS_15.map((set) => {
              const isCurrent = set.id === selectedSetId;
              return (
                <button
                  key={set.id}
                  onClick={() => {
                    setSelectedSetId(set.id);
                    initDrill(set.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isCurrent
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{set.badge} (15 ข้อ)</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {!isCompleted && currentQuestion ? (
            <>
              {/* Question Indicator & 15-Item Progress Track */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold px-2.5 py-1 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                      ข้อที่ {currentIndex + 1} / {questions.length} (ชุด 15 ข้อ)
                    </span>
                    <span className="font-medium px-2.5 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300">
                      {currentQuestion.topicName}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {currentQuestion.gradeLevel}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowScratchpad(true)}
                      className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <PenTool className="w-3.5 h-3.5 text-indigo-500" />
                      <span>กระดานทด</span>
                    </button>
                    <span className="font-extrabold text-amber-600 dark:text-amber-400">
                      +{currentQuestion.xpReward || 25} XP
                    </span>
                  </div>
                </div>

                {/* 15 Question Steps Indicator Grid */}
                <div className="grid grid-cols-15 gap-1 sm:gap-1.5 pt-1">
                  {questions.map((q, idx) => {
                    const res = results[idx];
                    const isCur = idx === currentIndex;
                    let bg = "bg-slate-200 dark:bg-slate-800 text-slate-500";
                    if (res) {
                      bg = res.isCorrect
                        ? "bg-emerald-500 text-white font-bold"
                        : "bg-rose-500 text-white font-bold";
                    } else if (isCur) {
                      bg = "bg-indigo-600 text-white font-black ring-2 ring-indigo-400";
                    }

                    return (
                      <div
                        key={q.id || idx}
                        className={`h-6 sm:h-7 rounded-lg text-[10px] sm:text-xs flex items-center justify-center transition-all ${bg}`}
                        title={`ข้อ ${idx + 1}`}
                      >
                        {idx + 1}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Question Expression Box */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 text-center space-y-3">
                <div className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200">
                  <FormattedMathText text={currentQuestion.question} />
                </div>
                {currentQuestion.mathExpression && (
                  <div className="py-2">
                    <MathView
                      expression={currentQuestion.mathExpression}
                      className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white"
                      large
                    />
                  </div>
                )}
              </div>

              {/* 4 Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuestion.options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  const isCorrect = opt.id === currentQuestion.correctAnswer;

                  let style =
                    "bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-400 dark:hover:border-indigo-500";

                  if (isAnswered) {
                    if (isCorrect) {
                      style =
                        "bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold";
                    } else if (isSelected) {
                      style =
                        "bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-500 text-rose-900 dark:text-rose-200";
                    } else {
                      style = "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`p-4 rounded-2xl text-left transition-all flex items-center justify-between text-sm sm:text-base font-semibold ${style}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                          {opt.id}
                        </span>
                        <FormattedMathText text={opt.text} />
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

              {/* Step-by-Step & Feedback when answered */}
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-4 rounded-2xl space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span>หลักการ: <FormattedMathText text={currentQuestion.ruleUsed} /></span>
                    </span>
                    <button
                      onClick={() => onOpenLesson(currentQuestion.topicId)}
                      className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                    >
                      เปิดทบทวนกฎนี้
                    </button>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    <FormattedMathText text={currentQuestion.hint} />
                  </div>
                </motion.div>
              )}

              {/* Next Button */}
              {isAnswered && (
                <div className="pt-2">
                  <button
                    onClick={handleNext}
                    className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <span>
                      {currentIndex < questions.length - 1 ? `ทำข้อถัดไป (${currentIndex + 2}/15)` : "ดูผลลัพธ์ชุด 15 ข้อ"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Completed Screen */
            <div className="text-center py-4 space-y-6">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 text-white flex items-center justify-center text-4xl shadow-lg shadow-orange-500/20">
                🏆
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">
                  ผ่านการทดสอบชุด 15 ข้อสำเร็จ!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  ชุดแบบทดสอบมาตรฐาน 15 ข้อ โดย ครูนิรชา (KruNiracha)
                </p>
              </div>

              {/* Score Cards Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-400 font-bold block">คะแนนความถูกต้อง</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    {correctCount} / {questions.length}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {Math.round((correctCount / (questions.length || 1)) * 100)}% แม่นยำ
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-400 font-bold block">เวลาที่ใช้</span>
                  <span className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    {spentMinutes}:{spentSeconds < 10 ? "0" : ""}{spentSeconds} น.
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    เฉลี่ย {Math.round(totalTimeSpent / (questions.length || 1))} วินาที/ข้อ
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-400 font-bold block">แต้ม XP สะสม</span>
                  <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">
                    +{totalXpEarned}
                  </span>
                  <span className="text-[10px] text-amber-500 font-bold block mt-0.5">
                    +100 XP Bonus!
                  </span>
                </div>
              </div>

              {/* Question Summary Review */}
              <div className="text-left space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                  <span>สรุปผลการตอบทั้ง 15 ข้อ:</span>
                  <span className="text-indigo-500 font-semibold">{correctCount}/{questions.length} ผ่านเกณฑ์</span>
                </h4>
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {results.map((res, i) => (
                    <div
                      key={i}
                      className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        {res.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                        )}
                        <div>
                          <span className="font-bold text-slate-700 dark:text-slate-200">
                            ข้อ {i + 1}: {res.question.topicName}
                          </span>
                          <div className="text-[11px] text-slate-400">
                            ใช้เวลา {res.timeTaken} วินาที • กฎ: {res.question.ruleUsed}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`font-bold ${
                          res.isCorrect ? "text-emerald-600" : "text-rose-500"
                        }`}
                      >
                        {res.isCorrect ? "+XP สำเร็จ" : "ควรทบทวน"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  id="btn-share-drill-result"
                  onClick={handleShareDrill}
                  className="w-full py-3.5 px-5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold rounded-2xl text-sm shadow-md shadow-orange-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 group"
                >
                  <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>แชร์ผลการทดสอบชุด 15 ข้อนี้ (Web Share)</span>
                </button>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => initDrill(selectedSetId)}
                    className="w-full sm:flex-1 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>ทดสอบชุด 15 ข้อนี้อีกครั้ง</span>
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenFullQuiz();
                    }}
                    className="w-full sm:flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <span>ไปที่คลังข้อสอบใหญ่</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Scratchpad Overlay */}
      {showScratchpad && <Scratchpad onClose={() => setShowScratchpad(false)} />}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        payload={sharePayload}
        badgeEmoji="⏱️"
        categoryLabel="คะแนน 5-Minute Drill 15 ข้อ"
      />
    </div>
  );
};
