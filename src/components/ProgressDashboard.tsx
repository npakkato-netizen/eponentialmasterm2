import React, { useState } from "react";
import { UserStats, Badge } from "../types";
import { EXPONENT_RULES } from "../data/lessons";
import { BADGES_LIST } from "../data/questions";
import {
  Trophy,
  Flame,
  Zap,
  CheckCircle2,
  Calendar,
  Award,
  Swords,
  TrendingUp,
  Target,
  Clock,
  Sparkles,
  User,
  FileSpreadsheet,
  Edit3,
  Share2
} from "lucide-react";
import { motion } from "motion/react";
import { StudentProfile } from "../services/SheetService";
import { ShareModal } from "./ShareModal";
import {
  createBadgeSharePayload,
  createLevelSharePayload,
  ShareDataPayload
} from "../utils/shareUtils";

interface ProgressDashboardProps {
  stats: UserStats;
  onOpenQuests: () => void;
  studentProfile?: StudentProfile | null;
  onEditProfile?: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  stats,
  onOpenQuests,
  studentProfile,
  onEditProfile,
}) => {
  const currentXPInLevel = stats.xp % 200;
  const xpForNextLevel = 200;
  const progressPercent = Math.min(100, Math.round((currentXPInLevel / xpForNextLevel) * 100));

  const totalAnswered = stats.totalAnswered || 0;
  const totalCorrect = stats.totalCorrect || 0;
  const overallAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  // Level Titles
  const getLevelTitle = (lvl: number) => {
    if (lvl >= 15) return "มหาปรมาจารย์แห่งเลขชี้กำลัง (Exponent Grand Master)";
    if (lvl >= 10) return "จอมเวทคณิตศาสตร์ขั้นสูง (Senior Math Wizard)";
    if (lvl >= 7) return "ผู้พิชิตสัญกรณ์วิทยาศาสตร์ (Scientific Notation Pro)";
    if (lvl >= 4) return "นักล่าฐานเดียวกัน (Same-Base Champion)";
    if (lvl >= 2) return "นักสำรวจเลขยกกำลัง ม.ต้น (Power Explorer)";
    return "ผู้เริ่มต้นเส้นทางคณิตศาสตร์ (Novice Explorer)";
  };

  // Web Share State
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [sharePayload, setSharePayload] = useState<ShareDataPayload | null>(null);
  const [shareEmoji, setShareEmoji] = useState<string>("🏆");
  const [shareCategory, setShareCategory] = useState<string>("เหรียญเกียรติยศ");

  const handleShareLevel = () => {
    const payload = createLevelSharePayload({
      studentName: studentProfile?.name,
      grade: studentProfile?.grade,
      level: stats.level,
      levelTitle: getLevelTitle(stats.level),
      totalXP: stats.xp,
      streakDays: stats.streakDays,
    });
    setSharePayload(payload);
    setShareEmoji("🌟");
    setShareCategory("เลเวล & ค่าพลังสะสม");
    setShowShareModal(true);
  };

  const handleShareBadge = (badge: Badge) => {
    const payload = createBadgeSharePayload({
      studentName: studentProfile?.name,
      grade: studentProfile?.grade,
      badgeTitle: badge.title,
      badgeDescription: badge.description,
      requirement: badge.requirement,
    });
    setSharePayload(payload);
    setShareEmoji("🏅");
    setShareCategory("เหรียญเกียรติยศ");
    setShowShareModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Hero Profile Bento Card */}
      <div className="bg-[#6366F1] rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-4 top-4 text-8xl opacity-15 font-black italic select-none pointer-events-none">
          XP
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl sm:text-4xl shadow-inner border border-white/30">
              🌟
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-xs font-bold backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Level {stats.level}</span>
                </div>
                {studentProfile?.grade && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold backdrop-blur-sm">
                    {studentProfile.grade}{studentProfile.studentNo ? ` #${studentProfile.studentNo}` : ""}
                  </span>
                )}
                {onEditProfile && (
                  <button
                    onClick={onEditProfile}
                    className="text-[11px] text-white/80 hover:text-white underline inline-flex items-center gap-1 font-semibold ml-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>แก้ไขโปรไฟล์</span>
                  </button>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                {studentProfile?.name || getLevelTitle(stats.level)}
              </h2>
              <p className="text-indigo-100 text-xs sm:text-sm">
                {studentProfile?.name ? getLevelTitle(stats.level) : "สะสมความรู้และพัฒนาความเชี่ยวชาญอย่างต่อเนื่อง"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
              <div className="text-center px-2">
                <span className="text-[11px] text-indigo-200 block">สตรีคต่อเนื่อง</span>
                <span className="text-lg font-black text-amber-300 flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 fill-amber-300" />
                  {stats.streakDays} วัน
                </span>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center px-2">
                <span className="text-[11px] text-indigo-200 block">เหรียญทอง</span>
                <span className="text-lg font-black text-yellow-300">
                  💰 {stats.coins}
                </span>
              </div>
            </div>

            <button
              type="button"
              id="btn-share-level-progress"
              onClick={handleShareLevel}
              className="p-3.5 px-4 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm backdrop-blur-md border border-white/30 shadow-xs flex items-center gap-2 transition-all active:scale-95 shrink-0"
              title="แชร์ความก้าวหน้าและเลเวลนี้ (Web Share)"
            >
              <Share2 className="w-4 h-4" />
              <span className="inline">แชร์เลเวล</span>
            </button>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mt-6 pt-5 border-t border-white/15 space-y-2">
          <div className="flex justify-between text-xs font-bold text-indigo-100">
            <span>ความก้าวหน้าสู่ Level {stats.level + 1}</span>
            <span>
              {currentXPInLevel} / {xpForNextLevel} XP ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-3 bg-black/25 rounded-full overflow-hidden p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-amber-300 rounded-full shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* 4 Quick Stat Summary Bento Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">ทำโจทย์ทั้งหมด</span>
            <CheckCircle2 className="w-4 h-4 text-[#6366F1]" />
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-white">
            {totalAnswered} <span className="text-xs font-normal text-slate-400">ข้อ</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">ความแม่นยำเฉลี่ย</span>
            <Target className="w-4 h-4 text-[#10B981]" />
          </div>
          <div className="text-2xl font-black text-[#10B981] dark:text-emerald-400">
            {overallAccuracy}%
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">สถิติดวล 1v1</span>
            <Swords className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-white">
            {stats.duelRecord.wins}{" "}
            <span className="text-xs font-normal text-slate-400">
              ชนะ ({stats.duelRecord.losses} แพ้)
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">เป้าหมายประจำวัน</span>
            <Calendar className="w-4 h-4 text-[#8B5CF6]" />
          </div>
          <div className="text-2xl font-black text-[#6366F1] dark:text-indigo-400">
            {stats.todayAnsweredCount} / {stats.studyGoalPerDay} <span className="text-xs font-normal text-slate-400">ข้อ</span>
          </div>
        </div>
      </div>

      {/* Mastery by Rule Visual Graph Bento */}
      <div className="bg-white dark:bg-[#1E293B] rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#6366F1]" />
              กราฟความชำนาญรายทฤษฎีบท (Topic Mastery Breakdown)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">แสดงเปอร์เซ็นต์ความถูกต้องของแต่ละสมบัติเลขยกกำลัง</p>
          </div>
        </div>

        <div className="space-y-4">
          {EXPONENT_RULES.map((rule) => {
            const data = stats.ruleMastery[rule.id] || { correct: 0, total: 0 };
            const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;

            return (
              <div key={rule.id} className="space-y-1.5">
                <div className="flex justify-between text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <span>{rule.title}</span>
                  <span className="font-bold font-mono text-[#6366F1] dark:text-indigo-400">
                    {pct}% ({data.correct}/{data.total} ข้อ)
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6 }}
                    className={`h-full rounded-full ${
                      pct >= 80
                        ? "bg-[#10B981]"
                        : pct >= 50
                        ? "bg-[#F59E0B]"
                        : pct > 0
                        ? "bg-[#F43F5E]"
                        : "bg-slate-300 dark:bg-slate-700"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Gallery Bento */}
      <div className="bg-white dark:bg-[#1E293B] rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              หอเกียรติยศและเหรียญตรา (Badges & Achievements)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              ปลดล็อกแล้ว {stats.unlockedBadges.length} จาก {BADGES_LIST.length} ตราสัญลักษณ์
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
          {BADGES_LIST.map((badge) => {
            const isUnlocked = stats.unlockedBadges.includes(badge.id) || (badge.id === "first_win" && totalCorrect > 0);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border-2 transition-all text-center space-y-2 flex flex-col justify-between ${
                  isUnlocked
                    ? "bg-[#FFFBEB] dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50 shadow-xs"
                    : "bg-[#F8FAFC] dark:bg-slate-900/40 border-[#F1F5F9] dark:border-slate-800 opacity-50 grayscale"
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 mx-auto flex items-center justify-center text-2xl mb-2 shadow-xs">
                    {isUnlocked ? "🏆" : "🔒"}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white">
                    {badge.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    {badge.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F1F5F9] dark:border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold text-[#6366F1] dark:text-indigo-400 block">
                    {badge.requirement}
                  </span>
                  {isUnlocked && (
                    <button
                      type="button"
                      id={`btn-share-badge-${badge.id}`}
                      onClick={() => handleShareBadge(badge)}
                      className="w-full py-1.5 px-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 dark:text-amber-200 font-bold text-[11px] flex items-center justify-center gap-1 transition-colors active:scale-95"
                      title={`แชร์เหรียญ ${badge.title} (Web Share)`}
                    >
                      <Share2 className="w-3 h-3" />
                      <span>แชร์เหรียญนี้</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        payload={sharePayload}
        badgeEmoji={shareEmoji}
        categoryLabel={shareCategory}
      />
    </div>
  );
};
