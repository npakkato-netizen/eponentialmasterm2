import React, { useState } from "react";
import { EXPONENT_RULES } from "../data/lessons";
import { ExponentRule } from "../types";
import { MathView } from "./MathView";
import { FormattedMathText } from "./FormattedMathText";
import { InteractiveRuleSandbox } from "./InteractiveRuleSandbox";
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Play
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LessonViewerProps {
  onStartQuizWithRule: (ruleId: string) => void;
  completedLessons: string[];
  onMarkLessonCompleted: (ruleId: string) => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  onStartQuizWithRule,
  completedLessons,
  onMarkLessonCompleted,
}) => {
  const [selectedRuleId, setSelectedRuleId] = useState<string>(EXPONENT_RULES[0].id);
  const currentRule = EXPONENT_RULES.find((r) => r.id === selectedRuleId) || EXPONENT_RULES[0];
  const currentIndex = EXPONENT_RULES.findIndex((r) => r.id === selectedRuleId);

  const handleNext = () => {
    if (currentIndex < EXPONENT_RULES.length - 1) {
      setSelectedRuleId(EXPONENT_RULES[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedRuleId(EXPONENT_RULES[currentIndex - 1].id);
    }
  };

  const isCompleted = completedLessons.includes(currentRule.id);

  return (
    <div className="space-y-6">
      {/* Header Banner Bento */}
      <div className="bg-[#6366F1] rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-4 top-4 text-8xl opacity-15 font-black italic select-none pointer-events-none">
          a<sup>n</sup>
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
            <span>หลักสูตรคณิตศาสตร์ ม.1 & ม.2 สสวท.</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            สรุปครบทุกสมบัติเลขยกกำลัง
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base leading-relaxed">
            เรียนรู้หลักการ คำอธิบายแบบเห็นภาพ ข้อควรระวังที่มักจะผิดบ่อย และทดลองปรับตัวแปรในห้องทดลองโต้ตอบ
          </p>
        </div>
      </div>

      {/* Multi-line Rules Selector Bento Section */}
      <div className="bg-white dark:bg-[#1E293B] rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F1F5F9] dark:border-slate-800">
          <div>
            <h2 className="text-base font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#6366F1]" />
              เลือกหัวข้อสมบัติเลขยกกำลัง (8 สมบัติสำคัญ)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              คลิกเลือกหัวข้อที่ต้องการเรียนรู้หรือทบทวนสูตรและตัวอย่าง
            </p>
          </div>

          {/* Progress pill */}
          <div className="flex items-center gap-2 bg-[#F8FAFC] dark:bg-slate-900 px-3 py-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              ความก้าวหน้า: {completedLessons.length}/{EXPONENT_RULES.length} บท
            </span>
            <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${(completedLessons.length / EXPONENT_RULES.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Multi-line Bento Grid for all 8 Rules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {EXPONENT_RULES.map((rule, idx) => {
            const isSelected = rule.id === selectedRuleId;
            const isDone = completedLessons.includes(rule.id);
            const cleanTitle = rule.title.replace(/^\d+\.\s*/, "");

            return (
              <button
                key={rule.id}
                onClick={() => setSelectedRuleId(rule.id)}
                className={`p-3.5 rounded-2xl text-left transition-all relative border-2 flex flex-col justify-between gap-2.5 group ${
                  isSelected
                    ? "bg-[#EEF2FF] dark:bg-indigo-950/70 border-[#6366F1] shadow-xs scale-[1.01]"
                    : "bg-[#F8FAFC] dark:bg-slate-800/80 border-[#F1F5F9] dark:border-slate-700/80 hover:border-indigo-200 dark:hover:border-slate-600 hover:bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${
                        isSelected
                          ? "bg-[#6366F1] text-white shadow-xs"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 group-hover:bg-indigo-100 group-hover:text-[#6366F1]"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        rule.gradeLevel === "ม.1"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                          : "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
                      }`}
                    >
                      {rule.gradeLevel}
                    </span>
                  </div>

                  {isDone ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      เรียนแล้ว
                    </span>
                  ) : null}
                </div>

                <div>
                  <h3
                    className={`text-xs sm:text-sm font-bold line-clamp-1 mb-1 transition-colors ${
                      isSelected
                        ? "text-[#4F46E5] dark:text-indigo-300 font-extrabold"
                        : "text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {cleanTitle}
                  </h3>
                  <div
                    className={`text-xs px-2.5 py-1.5 min-h-fit w-fit max-w-full rounded-xl inline-flex items-center font-medium transition-all ${
                      isSelected
                        ? "bg-white dark:bg-slate-900 text-[#4F46E5] dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/80 shadow-2xs"
                        : "bg-slate-200/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 group-hover:bg-white dark:group-hover:bg-slate-900"
                    }`}
                  >
                    <MathView expression={rule.shortFormula} className="text-xs sm:text-[13px] leading-normal" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Lesson Content Card Bento */}
      <motion.div
        key={currentRule.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white dark:bg-[#1E293B] rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 p-5 sm:p-8 shadow-xs space-y-6"
      >
        {/* Lesson Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9] dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EEF2FF] dark:bg-indigo-950/60 text-[#6366F1] dark:text-indigo-300">
                ระดับชั้น: {currentRule.gradeLevel}
              </span>
              {isCompleted ? (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> ผ่านการศึกษาแล้ว
                </span>
              ) : null}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
              {currentRule.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onMarkLessonCompleted(currentRule.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                isCompleted
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isCompleted ? "เสร็จสิ้นแล้ว" : "ทำเครื่องหมายว่าเรียนแล้ว"}
            </button>
            <button
              onClick={() => onStartQuizWithRule(currentRule.id)}
              className="px-4 py-2 bg-[#6366F1] hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              ทำแบบฝึกหัดกฎนี้
            </button>
          </div>
        </div>

        {/* Formula Hero Bento */}
        <div className="bg-[#EEF2FF] dark:bg-indigo-950/40 p-4 sm:p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/50 space-y-4">
          {/* Header Badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-100 dark:bg-indigo-900/70 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-bold shadow-2xs border border-indigo-200/80 dark:border-indigo-800/80">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              สูตรหลัก (Core Formula) :
            </span>
          </div>

          {/* Full Width Formula Card - Expands fully with ample padding, no scrollbars */}
          <div className="w-full bg-white dark:bg-slate-900 px-5 sm:px-8 py-4 sm:py-6 rounded-2xl border border-indigo-200 dark:border-indigo-900/70 shadow-xs flex items-center justify-center sm:justify-start">
            <MathView expression={currentRule.formulaLatex || currentRule.shortFormula} large className="text-base sm:text-xl md:text-2xl text-slate-900 dark:text-white" />
          </div>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed pl-0.5">
            {currentRule.description}
          </p>

          {/* Key Concept Box (Underneath the formula box) */}
          <div className="bg-white dark:bg-slate-900 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl shadow-xs border border-indigo-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full min-h-fit">
            <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              หัวใจสำคัญ :
            </span>
            <div className="text-xs sm:text-sm font-bold text-[#6366F1] dark:text-indigo-400 flex-1 min-w-0 break-words leading-relaxed">
              <FormattedMathText text={currentRule.keyConcept} />
            </div>
          </div>
        </div>

        {/* Interactive Sandbox Section */}
        <InteractiveRuleSandbox ruleId={currentRule.id} />

        {/* Examples Section Bento */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#6366F1]" />
            ตัวอย่างโจทย์แสดงวิธีทำละเอียดทีละขั้นตอน
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentRule.examples.map((ex, i) => (
              <div
                key={i}
                className="bg-[#F8FAFC] dark:bg-slate-900 p-5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EEF2FF] dark:bg-indigo-950/60 text-[#6366F1] dark:text-indigo-300">
                    ตัวอย่างที่ {i + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Step-by-step</span>
                </div>

                <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-white flex flex-wrap items-center gap-2">
                  <span>โจทย์:</span>
                  <div className="inline-flex items-center min-h-fit py-0.5">
                    <MathView expression={ex.problem} />
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#E2E8F0] dark:border-slate-800 text-sm">
                  {ex.steps.map((step, sIdx) => (
                    <div key={sIdx} className="text-slate-600 dark:text-slate-300 flex items-start gap-2 py-0.5">
                      <span className="w-4 h-4 rounded-full bg-[#EEF2FF] dark:bg-indigo-900 text-[#6366F1] dark:text-indigo-300 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <div className="flex-1 min-w-0 leading-relaxed">
                        <FormattedMathText text={step} className="leading-relaxed" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 p-3 sm:p-3.5 bg-[#ECFDF5] dark:bg-emerald-950/40 rounded-xl border border-[#D1FAE5] dark:border-emerald-900/40 flex flex-wrap items-center justify-between gap-2 min-h-fit">
                  <span className="text-xs font-bold text-[#065F46] dark:text-emerald-300 whitespace-nowrap">ผลลัพธ์สุดท้าย:</span>
                  <span className="font-extrabold text-[#059669] dark:text-emerald-300 text-base sm:text-lg min-h-fit py-0.5">
                    <MathView expression={ex.result} />
                  </span>
                </div>

                {ex.explanation && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-800/60 p-2.5 rounded-lg">
                    <span className="font-semibold text-slate-600 dark:text-slate-300 mr-1">💡 คำอธิบาย:</span>
                    <FormattedMathText text={ex.explanation} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Common Pitfalls / Misconceptions Bento */}
        <div className="bg-[#FFF1F2] dark:bg-rose-950/30 p-5 rounded-2xl border border-rose-200 dark:border-rose-900/50 space-y-3">
          <h3 className="text-sm font-bold text-[#F43F5E] dark:text-rose-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#F43F5E]" />
            ข้อผิดพลาดยอดฮิตที่นักเรียนมักเสียคะแนน (Common Pitfalls)
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {currentRule.commonMistakes.map((mistake, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#F43F5E] font-bold">✗</span>
                <FormattedMathText text={mistake} className="leading-relaxed" />
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] dark:border-slate-800">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
              currentIndex === 0
                ? "text-slate-300 dark:text-slate-700 cursor-not-allowed"
                : "text-slate-700 dark:text-slate-200 bg-[#F1F5F9] dark:bg-slate-800 hover:bg-slate-200"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            สมบัติก่อนหน้า
          </button>

          <span className="text-xs text-slate-400 font-bold">
            {currentIndex + 1} / {EXPONENT_RULES.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentIndex === EXPONENT_RULES.length - 1}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
              currentIndex === EXPONENT_RULES.length - 1
                ? "text-slate-300 dark:text-slate-700 cursor-not-allowed"
                : "text-white bg-[#6366F1] hover:bg-indigo-700 shadow-sm"
            }`}
          >
            สมบัติถัดไป
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
