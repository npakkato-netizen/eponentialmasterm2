import React, { useState } from "react";
import { UserStats, ExponentRuleId } from "../types";
import { EXPONENT_RULES } from "../data/lessons";
import { QUESTION_BANK } from "../data/questions";
import { getTop3WeakestRules } from "../utils/weaknessUtils";
import { MathView } from "./MathView";
import {
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Bot,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Target,
  BrainCircuit,
  Stethoscope,
  BookOpen,
  Zap,
  Flame
} from "lucide-react";
import { motion } from "motion/react";

interface WeaknessAnalysisProps {
  stats: UserStats;
  onStartTargetedDrill: (ruleId: ExponentRuleId) => void;
  onOpenLesson: (ruleId: string) => void;
  onStartFocusedMastery?: () => void;
}

export const WeaknessAnalysis: React.FC<WeaknessAnalysisProps> = ({
  stats,
  onStartTargetedDrill,
  onOpenLesson,
  onStartFocusedMastery,
}) => {
  const [aiReport, setAiReport] = useState<any | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  // Extract top 3 weakest rules
  const top3Weak = getTop3WeakestRules(stats);

  // Calculate mastery percentages per rule
  const ruleAnalysis = EXPONENT_RULES.map((rule) => {
    const data = stats.ruleMastery[rule.id] || { correct: 0, total: 0, level: 1 };
    const accuracy = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;

    let status: "strong" | "moderate" | "weak" | "untested" = "untested";
    if (data.total === 0) status = "untested";
    else if (accuracy >= 80) status = "strong";
    else if (accuracy >= 55) status = "moderate";
    else status = "weak";

    return {
      rule,
      stats: data,
      accuracy,
      status,
    };
  });

  const weakRules = ruleAnalysis.filter((r) => r.status === "weak" || (r.status === "untested" && stats.totalAnswered > 3));
  const strongRules = ruleAnalysis.filter((r) => r.status === "strong");

  const runAiWeaknessDiagnostic = async () => {
    setIsLoadingAi(true);
    setAiReport(null);

    const accuracyByTopic = ruleAnalysis.reduce((acc, curr) => {
      acc[curr.rule.title] = `${curr.accuracy}% (${curr.stats.correct}/${curr.stats.total})`;
      return acc;
    }, {} as any);

    try {
      const res = await fetch("/api/ai/analyze-weakness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: [],
          accuracyByTopic,
        }),
      });

      const data = await res.json();
      if (data.data) {
        setAiReport(data.data);
      } else if (data.analysis) {
        setAiReport({
          summary: data.analysis,
          weakTopic: "เลขชี้กำลังเป็นศูนย์และลบ & สัญกรณ์วิทยาศาสตร์",
          whyConfused: "มักสับสนการแปลงส่วนกลับ และการเลื่อนจุดทศนิยมเครื่องหมายบวกลบ",
          actionPlan: data.recommendations || [
            "ฝึกทำโจทย์แปลงเลขชี้กำลังลบให้เป็นเศษส่วนวันละ 5 ข้อ",
            "ระวังการกระจายเลขชี้กำลังที่มีวงเล็บ เช่น (-2)^4 vs -2^4",
            "ใช้เทคนิคแปลงฐานเป็นจำนวนเฉพาะก่อนตัดทอนเสมอ"
          ],
          encouragement: "คณิตศาสตร์เรื่องเลขยกกำลังแค่เข้าใจหลักการและระวังจุดกับดัก คุณก็ทำคะแนนเต็มได้แน่นอน!"
        });
      }
    } catch {
      setAiReport({
        summary: "วิเคราะห์ภาพรวม: คุณมีความเข้าใจพื้นฐานการคูณหารเลขยกกำลังเป็นอย่างดี แต่ยังมีจุดที่ต้องระวังในส่วนของเลขชี้กำลังติดลบ และการกระจายกำลังซ้อนในวงเล็บ",
        weakTopic: "เลขชี้กำลังเป็นศูนย์และลบ & กำลังซ้อน",
        whyConfused: "มักสับสนระหว่าง (a^m)^n กับ a^m * a^n และระวังเครื่องหมายลบหน้าฐาน",
        actionPlan: [
          "ทบทวนสมบัติ (a^m)^n = a^(m*n) นำเลขชี้กำลังมาคูณกัน",
          "ฝึกท่องจำว่า a^(-n) = 1/a^n กำลังลบไม่ใช่ผลลัพธ์ติดลบ แต่คือส่วนกลับ",
          "เข้าทำคลินิกแก้จุดอ่อน 10 ข้อวันนี้"
        ],
        encouragement: "สู้ๆ นะครับ! ฝึกทำซ้ำในจุดที่ยังสับสนอีกนิดเดียว จะกลายเป็นเซียนเลขยกกำลังแน่นอน!"
      });
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner Bento */}
      <div className="bg-[#065F46] dark:bg-emerald-950/80 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-4 top-4 text-8xl opacity-10 font-black italic select-none pointer-events-none">
          🔍
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md mb-3">
            <Stethoscope className="w-3.5 h-3.5 text-emerald-300" />
            <span>AI Diagnostic & Targeted Remedial Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
            ระบบวิเคราะห์จุดอ่อนและความแม่นยำรายบุคคล
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            ตรวจจับจุดที่สับสนและข้อผิดพลาดยอดฮิต พร้อมระบบ "คลินิกแก้จุดอ่อน" ช่วยเจาะฝึกเฉพาะหัวข้อที่ยังไม่คล่อง
          </p>
        </div>
      </div>

      {/* NEW: Focused Mastery Mode Hero Banner */}
      <div className="bg-gradient-to-br from-rose-950 via-purple-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-rose-500/30 shadow-xl relative overflow-hidden space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30 text-xs font-bold">
              <Target className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>โหมดแนะนำพิเศษ: Focused Mastery Mode</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              ดึง 3 กฎที่อ่อนที่สุดเพื่อสร้าง Drill ซ่อมแซมทันที
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ระบบตรวจสอบพบ 3 สมบัติที่ยังมีข้อผิดพลาดสะสมสูงสุด ทำแบบฝึกหัดเจาะจง 9 ข้อ เพื่อยกระดับความแม่นยำอย่างเป็นระบบ
            </p>
          </div>

          {onStartFocusedMastery && (
            <button
              id="btn-open-focused-mastery-from-weakness"
              onClick={onStartFocusedMastery}
              className="px-6 py-3.5 bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 hover:from-rose-600 hover:to-indigo-600 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2.5 active:scale-95 transition-all flex-shrink-0"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>เริ่ม Focused Mastery (3 กฎ)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 3 Quick Preview Cards of the weakest rules */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {top3Weak.map((item, idx) => (
            <div
              key={item.rule.id}
              className="bg-white/10 dark:bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-rose-300">
                  จุดอ่อน #{idx + 1}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-rose-500/30 text-rose-200 font-bold text-[10px]">
                  แม่นยำ {item.stats.total > 0 ? `${item.accuracy}%` : "ยังไม่เริ่ม"}
                </span>
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-white line-clamp-1">
                {item.rule.title}
              </h4>
              <div className="text-xs font-mono text-purple-200 pt-0.5">
                <MathView expression={item.rule.shortFormula} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overview Metric Bento Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-black">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold block">หัวข้อที่เชี่ยวชาญ (Mastered)</span>
            <span className="text-xl font-black text-slate-800 dark:text-white">
              {strongRules.length} / {EXPONENT_RULES.length} หัวข้อ
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 dark:text-rose-400 font-black">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold block">จุดที่ต้องระวัง (Needs Focus)</span>
            <span className="text-xl font-black text-slate-800 dark:text-white">
              {weakRules.length} หัวข้อ
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] dark:bg-indigo-950/60 flex items-center justify-center text-[#6366F1] dark:text-indigo-400 font-black">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold block">ความแม่นยำรวมทั้งหมด</span>
            <span className="text-xl font-black text-[#6366F1] dark:text-indigo-400">
              {stats.totalAnswered > 0
                ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
                : 0}
              %
            </span>
          </div>
        </div>
      </div>

      {/* AI Doctor Diagnostic Card Bento */}
      <div className="bg-white dark:bg-[#1E293B] rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#6366F1] flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                คำวินิจฉัยและแผนพัฒนาเฉพาะบุคคลจาก AI
              </h2>
              <p className="text-xs text-slate-400">ประเมินจากประวัติการทำโจทย์และอัตราการตอบถูก/ผิด</p>
            </div>
          </div>

          <button
            onClick={runAiWeaknessDiagnostic}
            disabled={isLoadingAi}
            className="px-5 py-2.5 bg-[#6366F1] hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold shadow-xs flex items-center gap-2 transition-transform active:scale-95 flex-shrink-0"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isLoadingAi ? "AI กำลังวิเคราะห์..." : "วิเคราะห์จุดอ่อนด้วย AI"}</span>
          </button>
        </div>

        {aiReport && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-[#EEF2FF] dark:bg-indigo-950/40 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 space-y-4 text-sm"
          >
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#6366F1] dark:text-indigo-300 uppercase tracking-wide">
                บทสรุปการวิเคราะห์:
              </span>
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                {aiReport.summary}
              </p>
            </div>

            {aiReport.whyConfused && (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5">สาเหตุที่อาจกำลังสับสน:</span>
                  <span>{aiReport.whyConfused}</span>
                </div>
              </div>
            )}

            {aiReport.actionPlan && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  📋 แผนปฏิบัติการ 3 ขั้นตอนเพื่ออัปคะแนน:
                </span>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {aiReport.actionPlan.map((action: string, i: number) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#6366F1] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {aiReport.encouragement && (
              <p className="text-xs italic text-[#6366F1] dark:text-indigo-400 pt-2 border-t border-indigo-200 dark:border-indigo-900">
                💬 "{aiReport.encouragement}"
              </p>
            )}
          </motion.div>
        )}
      </div>

      {/* Detailed Mastery Breakdown Table / Cards Bento */}
      <div className="bg-white dark:bg-[#1E293B] rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-[#059669]" />
            ระดับความแม่นยำแยกตาม 8 สมบัติเลขยกกำลัง
          </h3>
          <span className="text-xs text-slate-400">คลิก "เข้าคลินิกเจาะลึก" เพื่อเน้นเฉพาะข้อนั้น</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ruleAnalysis.map((item) => {
            const { rule, stats: rStats, accuracy, status } = item;

            return (
              <div
                key={rule.id}
                className="p-5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900/60 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-slate-400 block">{rule.gradeLevel}</span>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white">{rule.title}</h4>
                    <div className="text-xs text-[#6366F1] dark:text-indigo-400 font-mono mt-0.5">
                      <MathView expression={rule.shortFormula} />
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold flex-shrink-0 ${
                      status === "strong"
                        ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                        : status === "moderate"
                        ? "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                        : status === "weak"
                        ? "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {status === "untested" ? "ยังไม่เริ่ม" : `${accuracy}% แม่นยำ`}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        status === "strong"
                          ? "bg-[#10B981]"
                          : status === "moderate"
                          ? "bg-[#F59E0B]"
                          : "bg-[#F43F5E]"
                      }`}
                      style={{ width: `${status === "untested" ? 5 : accuracy}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>ทำถูก {rStats.correct} / {rStats.total} ข้อ</span>
                    <span>{status === "strong" ? "คล่องแคล่ว" : status === "weak" ? "ควรฝึกเพิ่ม" : "ปานกลาง"}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onStartTargetedDrill(rule.id)}
                    className="flex-1 py-2 bg-[#059669] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Target className="w-3.5 h-3.5" />
                    <span>เข้าคลินิกเจาะลึก</span>
                  </button>
                  <button
                    onClick={() => onOpenLesson(rule.id)}
                    className="px-3.5 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                  >
                    ดูสรุปสูตร
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
