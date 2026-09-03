import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Trophy,
  Share2,
  RotateCcw,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  ArrowRight,
  Sparkles,
  Zap,
  GraduationCap,
  X,
  BookOpen
} from "lucide-react";
import { FormattedMathText } from "./FormattedMathText";
import { ShareModal } from "./ShareModal";
import { createQuizScoreSharePayload, ShareDataPayload } from "../utils/shareUtils";
import { Question } from "../types";
import { StudentProfile } from "../services/SheetService";
import sheetService from "../services/SheetService";
import confetti from "canvas-confetti";

interface QuizResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  topicTitle: string;
  totalQuestions: number;
  correctCount: number;
  xpEarned: number;
  questions: Question[];
  answeredHistory: Record<string, { selected: string; isCorrect: boolean }>;
  studentProfile: StudentProfile | null;
  onOpenLesson?: (topicId: string) => void;
}

export const QuizResultModal: React.FC<QuizResultModalProps> = ({
  isOpen,
  onClose,
  onRetry,
  topicTitle,
  totalQuestions,
  correctCount,
  xpEarned,
  questions,
  answeredHistory,
  studentProfile,
  onOpenLesson,
}) => {
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [sharePayload, setSharePayload] = useState<ShareDataPayload | null>(null);

  if (!isOpen) return null;

  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const isPassing = percentage >= 60;

  const handleOpenShare = () => {
    const payload = createQuizScoreSharePayload({
      studentName: studentProfile?.name,
      grade: studentProfile?.grade,
      topicTitle,
      score: correctCount,
      totalQuestions,
      percentage,
      xpEarned,
    });
    setSharePayload(payload);
    setShowShareModal(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-2xl bg-white dark:bg-[#1E293B] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative my-6"
        >
          {/* Top Decorative Bar */}
          <div
            className={`h-2.5 bg-gradient-to-r ${
              isPassing
                ? "from-emerald-400 via-indigo-600 to-purple-600"
                : "from-amber-400 via-orange-500 to-rose-500"
            }`}
          />

          {/* Close button */}
          <button
            id="btn-close-quiz-result"
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10"
            aria-label="ปิด"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Header / Celebration */}
            <div className="text-center space-y-2">
              <div
                className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl shadow-lg mb-2 ${
                  isPassing
                    ? "bg-gradient-to-tr from-amber-400 via-yellow-400 to-orange-500 text-white shadow-amber-500/25"
                    : "bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-indigo-500/25"
                }`}
              >
                {isPassing ? "🏆" : "📚"}
              </div>

              {studentProfile?.name && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-bold text-xs">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>
                    {studentProfile.name} • {studentProfile.grade || "ม.1"}
                    {studentProfile.studentNo ? ` #${studentProfile.studentNo}` : ""}
                  </span>
                </div>
              )}

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {isPassing ? "ยินดีด้วย! ผ่านการทดสอบเรียบร้อย" : "ยอดเยี่ยม! การเรียนรู้คือการฝึกฝน"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                {topicTitle}
              </p>
            </div>

            {/* Score Grid Cards */}
            <div className="grid grid-cols-3 gap-3">
              {/* Score / Accuracy */}
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-center">
                <span className="text-[11px] font-bold text-slate-400 block mb-0.5">คะแนนที่ได้</span>
                <span className="text-xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                  {correctCount} / {totalQuestions}
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block mt-1">
                  {percentage}% ถูกต้อง
                </span>
              </div>

              {/* XP Earned */}
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-center">
                <span className="text-[11px] font-bold text-slate-400 block mb-0.5">แต้มสะสม</span>
                <span className="text-xl sm:text-3xl font-black text-amber-500 dark:text-amber-400">
                  +{xpEarned}
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-amber-500 dark:text-amber-400 block mt-1 flex items-center justify-center gap-1">
                  <Zap className="w-3 h-3 fill-amber-500" />
                  <span>XP Boost</span>
                </span>
              </div>

              {/* Sheets Sync Status */}
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-center">
                <span className="text-[11px] font-bold text-slate-400 block mb-0.5">Google Sheets</span>
                <div className="my-1">
                  <FileSpreadsheet className="w-6 h-6 mx-auto text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block">
                  {sheetService.isConfigured() ? "ซิงค์คะแนนแล้ว 🟢" : "บันทึกในเครื่อง 🟡"}
                </span>
              </div>
            </div>

            {/* Questions Review Breakdown */}
            <div className="space-y-2 text-left">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>สรุปผลการตอบรายข้อ:</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                  ถูก {correctCount} / ผิด {totalQuestions - correctCount} ข้อ
                </span>
              </h4>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {questions.map((q, idx) => {
                  const history = answeredHistory[q.id];
                  const isCorrect = history?.isCorrect;

                  return (
                    <div
                      key={q.id || idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/70 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        )}
                        <div className="truncate">
                          <span className="font-bold text-slate-800 dark:text-slate-200 mr-2">
                            ข้อ {idx + 1}:
                          </span>
                          <span className="text-slate-600 dark:text-slate-300">
                            {q.question}
                          </span>
                          <div className="text-[10px] text-slate-400 truncate">
                            กฎ: {q.ruleUsed} • คำตอบที่ถูก: {q.correctAnswer}
                          </div>
                        </div>
                      </div>

                      {onOpenLesson && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenLesson(q.topicId);
                          }}
                          className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0 ml-2"
                        >
                          ทบทวน
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              {/* Main Share Button with Web Share API */}
              <button
                type="button"
                id="btn-share-quiz-result"
                onClick={handleOpenShare}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-indigo-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 group"
              >
                <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>แชร์ผลคะแนนลงโซเชียลมีเดีย (Web Share)</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  id="btn-retry-quiz"
                  onClick={onRetry}
                  className="py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>ทำใหม่อีกครั้ง</span>
                </button>
                <button
                  type="button"
                  id="btn-finish-quiz-modal"
                  onClick={onClose}
                  className="py-3 px-4 rounded-2xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <span>เสร็จสิ้น</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        payload={sharePayload}
        badgeEmoji="🏆"
        categoryLabel="คะแนนแบบทดสอบ"
      />
    </>
  );
};

export default QuizResultModal;
