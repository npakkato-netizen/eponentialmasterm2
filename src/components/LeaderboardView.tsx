import React, { useState } from "react";
import { LeaderboardUser } from "../types";
import { INITIAL_LEADERBOARD } from "../data/leaderboardData";
import {
  Trophy,
  Flame,
  Users,
  Calendar,
  Globe,
  Medal,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Share2
} from "lucide-react";
import { motion } from "motion/react";
import { ShareModal } from "./ShareModal";
import { ShareDataPayload } from "../utils/shareUtils";

interface LeaderboardViewProps {
  userXP: number;
  userLevel: number;
  studentName?: string;
  studentGrade?: string;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  userXP,
  userLevel,
  studentName,
  studentGrade,
}) => {
  const [activeCategory, setActiveCategory] = useState<"class" | "weekly" | "all">("class");

  // Dynamic leaderboard that incorporates current user's XP and real profile
  const leaderboardList: LeaderboardUser[] = INITIAL_LEADERBOARD.map((u) => {
    if (u.isCurrentUser) {
      return {
        ...u,
        name: studentName ? `${studentName} (คุณ)` : u.name,
        grade: studentGrade || u.grade,
        xp: Math.max(u.xp, userXP),
        level: Math.max(u.level, userLevel),
      };
    }
    return u;
  }).sort((a, b) => b.xp - a.xp).map((u, idx) => ({ ...u, rank: idx + 1 }));

  const top3 = leaderboardList.slice(0, 3);
  const rest = leaderboardList.slice(3);
  const currentUserEntry = leaderboardList.find((u) => u.isCurrentUser);

  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [sharePayload, setSharePayload] = useState<ShareDataPayload | null>(null);

  const handleShareRank = () => {
    if (!currentUserEntry) return;
    const nameLabel = studentName || "ฉัน";
    const shareText = `🏆 ตอนนี้ ${nameLabel} อยู่อันดับที่ #${currentUserEntry.rank} บนกระดานผู้นำสมบัติเลขยกกำลัง ม.1-ม.2 (KruNiracha) ด้วยพลัง ${currentUserEntry.xp.toLocaleString()} XP (Lv.${currentUserEntry.level})! มาร่วมสนุกและทดสอบความรู้เลขยกกำลังกันเลย! 🚀\n#ExponentialMaster #เรียนคณิตศาสตร์ #เลขยกกำลัง`;

    setSharePayload({
      title: `อันดับบนกระดานผู้นำของ ${nameLabel} - Exponential Master (KruNiracha)`,
      text: shareText,
      url: window.location.href,
    });
    setShowShareModal(true);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Master":
        return "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border-purple-300";
      case "Diamond":
        return "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300 border-cyan-300";
      case "Platinum":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300";
      case "Gold":
        return "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-300";
      case "Silver":
        return "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300";
      default:
        return "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 border-orange-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-md mb-3">
            <Trophy className="w-3.5 h-3.5 text-yellow-300" />
            <span>กระดานจัดอันดับผู้พิชิตเลขยกกำลัง (Season 4)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
            จัดอันดับแข่งขันกับเพื่อนในห้องและทั่วประเทศ
          </h1>
          <p className="text-amber-100 text-sm leading-relaxed">
            สะสม XP จากการทำแบบฝึกหัดและการดวล 1v1 เพื่อเลื่อนขั้นสู่ Master League และรับเกียรติบัตรประจำสัปดาห์
          </p>
        </div>

        {currentUserEntry && (
          <div className="relative z-10 bg-black/20 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-2xl shrink-0 w-full md:w-auto text-center md:text-right flex md:flex-col items-center md:items-end justify-between gap-3">
            <div>
              <span className="text-xs text-amber-200 block font-medium">อันดับปัจจุบันของคุณ</span>
              <div className="text-2xl sm:text-3xl font-black text-amber-300">
                #{currentUserEntry.rank}
              </div>
              <span className="text-[11px] text-white/80 block mt-0.5">
                {currentUserEntry.xp.toLocaleString()} XP
              </span>
            </div>
            <button
              type="button"
              id="btn-share-leaderboard-rank"
              onClick={handleShareRank}
              className="px-4 py-2.5 bg-white text-orange-700 hover:bg-amber-50 font-bold rounded-xl text-xs shadow-md flex items-center gap-1.5 transition-all active:scale-95"
              title="แชร์อันดับนี้ผ่าน Web Share API"
            >
              <Share2 className="w-4 h-4" />
              <span>แชร์อันดับ</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter Tabs Bento */}
      <div className="flex items-center justify-between bg-white dark:bg-[#1E293B] p-2 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setActiveCategory("class")}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeCategory === "class"
                ? "bg-[#F59E0B] text-white shadow-xs"
                : "text-slate-600 dark:text-slate-300 hover:bg-[#F1F5F9] dark:hover:bg-slate-800"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>เพื่อนในห้องเรียน</span>
          </button>

          <button
            onClick={() => setActiveCategory("weekly")}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeCategory === "weekly"
                ? "bg-[#F59E0B] text-white shadow-xs"
                : "text-slate-600 dark:text-slate-300 hover:bg-[#F1F5F9] dark:hover:bg-slate-800"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>ลีกประจำสัปดาห์</span>
          </button>

          <button
            onClick={() => setActiveCategory("all")}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeCategory === "all"
                ? "bg-[#F59E0B] text-white shadow-xs"
                : "text-slate-600 dark:text-slate-300 hover:bg-[#F1F5F9] dark:hover:bg-slate-800"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>ระดับประเทศ (ม.1-ม.2)</span>
          </button>
        </div>

        <span className="hidden sm:block text-xs font-bold text-slate-400 mr-3">
          รีเซ็ตในอีก 3 วัน 14 ชม.
        </span>
      </div>

      {/* Top 3 Podium Cards Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        {top3.map((user, idx) => {
          const isFirst = user.rank === 1;
          const isSecond = user.rank === 2;
          const isThird = user.rank === 3;

          const crownColor = isFirst
            ? "bg-[#F59E0B] text-white shadow-amber-500/30"
            : isSecond
            ? "bg-slate-400 text-white shadow-slate-400/20"
            : "bg-amber-700 text-white shadow-amber-700/20";

          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-3xl border-2 bg-white dark:bg-[#1E293B] text-center relative shadow-xs flex flex-col justify-between ${
                isFirst
                  ? "border-[#F59E0B] sm:-translate-y-2 ring-4 ring-amber-400/15"
                  : isSecond
                  ? "border-slate-300 dark:border-slate-700"
                  : "border-amber-600/60 dark:border-amber-900/60"
              }`}
            >
              {/* Rank Badge */}
              <div
                className={`w-9 h-9 rounded-2xl ${crownColor} absolute -top-4 left-1/2 -translate-x-1/2 flex items-center justify-center font-black text-sm shadow-md`}
              >
                #{user.rank}
              </div>

              <div className="pt-3 space-y-2">
                <div className="w-16 h-16 rounded-3xl bg-[#F8FAFC] dark:bg-slate-800 mx-auto flex items-center justify-center text-3xl shadow-inner border border-[#E2E8F0] dark:border-slate-700">
                  {user.avatar}
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-800 dark:text-white text-base">
                    {user.name}
                  </h3>
                  <p className="text-xs text-slate-400">{user.school}</p>
                </div>

                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${getTierColor(user.tier)}">
                  <span>{user.tier} Tier</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F1F5F9] dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold">คะแนนสะสม</span>
                <span className="font-black text-[#6366F1] dark:text-indigo-400 text-base">
                  {user.xp.toLocaleString()} XP
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Leaderboard Table Bento */}
      <div className="bg-white dark:bg-[#1E293B] rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#F1F5F9] dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            อันดับผู้เรียนทั้งหมด
          </h3>
          <span className="text-xs text-slate-400 font-semibold">อัปเดตแบบเรียลไทม์</span>
        </div>

        <div className="divide-y divide-[#F1F5F9] dark:divide-slate-800">
          {leaderboardList.map((user) => (
            <div
              key={user.id}
              className={`p-4 sm:p-5 flex items-center justify-between transition-colors ${
                user.isCurrentUser
                  ? "bg-[#EEF2FF] dark:bg-indigo-950/40 border-l-4 border-[#6366F1]"
                  : "hover:bg-[#F8FAFC] dark:hover:bg-slate-800/50"
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <span
                  className={`w-7 text-center font-black text-sm ${
                    user.rank <= 3
                      ? "text-[#F59E0B]"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  #{user.rank}
                </span>

                <span className="text-2xl">{user.avatar}</span>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                      {user.name}
                    </span>
                    {user.isCurrentUser && (
                      <span className="px-2 py-0.5 rounded-lg bg-[#6366F1] text-white text-[10px] font-bold">
                        YOU
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{user.school}</span>
                    <span>•</span>
                    <span className="text-[#6366F1] dark:text-indigo-400 font-semibold">
                      Lv.{user.level}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-black text-slate-800 dark:text-white text-sm sm:text-base">
                  {user.xp.toLocaleString()} <span className="text-xs font-normal text-slate-400">XP</span>
                </div>
                {user.winStreak > 0 && (
                  <span className="text-[11px] font-bold text-[#F59E0B] flex items-center justify-end gap-1">
                    <Flame className="w-3 h-3 fill-amber-500" /> ชนะต่อเนื่อง {user.winStreak} ครั้ง
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        payload={sharePayload}
        badgeEmoji="🏆"
        categoryLabel="อันดับบนกระดานผู้นำ"
      />
    </div>
  );
};
