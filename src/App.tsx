/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { UserStats, Question, ExponentRuleId } from "./types";
import { EXPONENT_RULES } from "./data/lessons";
import { QUESTION_BANK } from "./data/questions";
import { LessonViewer } from "./components/LessonViewer";
import { QuizMode } from "./components/QuizMode";
import { DuelMode } from "./components/DuelMode";
import { WeaknessAnalysis } from "./components/WeaknessAnalysis";
import { ProgressDashboard } from "./components/ProgressDashboard";
import { LeaderboardView } from "./components/LeaderboardView";
import { WeeklyBankView } from "./components/WeeklyBankView";
import { NotificationModal } from "./components/NotificationModal";
import { QuickDrillModal } from "./components/QuickDrillModal";
import { FocusedMasteryMode } from "./components/FocusedMasteryMode";
import { MathView } from "./components/MathView";
import { StudentRegistrationModal } from "./components/StudentRegistrationModal";
import { LogoutConfirmModal } from "./components/LogoutConfirmModal";
import sheetService, { StudentProfile } from "./services/SheetService";
import {
  BookOpen,
  Edit3,
  Swords,
  Stethoscope,
  TrendingUp,
  Trophy,
  Calendar,
  Bell,
  Flame,
  Moon,
  Sun,
  Sparkles,
  Menu,
  X,
  Zap,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Target,
  GraduationCap,
  Users,
  Timer,
  Layers,
  Compass,
  ArrowRight,
  LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const INITIAL_STATS: UserStats = {
  xp: 1250,
  level: 14,
  coins: 480,
  streakDays: 5,
  lastActiveDate: new Date().toISOString().split("T")[0],
  totalAnswered: 48,
  totalCorrect: 41,
  todayAnsweredCount: 8,
  studyGoalPerDay: 10,
  ruleMastery: {
    "rule-product-same-base": { correct: 10, total: 10, level: 3 },
    "rule-quotient-same-base": { correct: 9, total: 10, level: 3 },
    "rule-power-of-power": { correct: 6, total: 9, level: 2 },
    "rule-power-of-product": { correct: 5, total: 6, level: 2 },
    "rule-power-of-quotient": { correct: 4, total: 6, level: 2 },
    "rule-zero-negative-power": { correct: 3, total: 6, level: 1 },
    "rule-scientific-notation": { correct: 5, total: 6, level: 2 },
    "rule-mixed-applications": { correct: 3, total: 5, level: 1 },
  },
  duelRecord: { wins: 9, losses: 3, winStreak: 4 },
  unlockedBadges: ["first_win", "combo_master", "streak_3", "flawless_10"],
};

export default function App() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "lessons" | "quiz" | "duel" | "weakness" | "progress" | "leaderboard" | "weekly"
  >("dashboard");

  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem("exponent_master_stats");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_STATS;
      }
    }
    return INITIAL_STATS;
  });

  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem("exponent_master_completed_lessons");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return ["rule-product-same-base", "rule-quotient-same-base", "rule-power-of-power"];
      }
    }
    return ["rule-product-same-base", "rule-quotient-same-base", "rule-power-of-power"];
  });

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showNotificationModal, setShowNotificationModal] = useState<boolean>(false);
  const [showQuickDrill, setShowQuickDrill] = useState<boolean>(false);
  const [showFocusedMastery, setShowFocusedMastery] = useState<boolean>(false);
  const [selectedRuleFilterForQuiz, setSelectedRuleFilterForQuiz] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [ruleSubMenuOpen, setRuleSubMenuOpen] = useState<boolean>(false);

  // Student Profile & Mandatory Welcome / Registration Modal state
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(() => {
    return sheetService.getStudentProfile();
  });

  const [showRegistrationModal, setShowRegistrationModal] = useState<boolean>(() => {
    const profile = sheetService.getStudentProfile();
    return !profile || !profile.name || profile.name.trim().length === 0;
  });

  // Logout state
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);

  const handleRequestLogout = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    sheetService.clearStudentProfile();
    setStudentProfile(null);
    setShowLogoutConfirm(false);
    setShowRegistrationModal(true);
  };

  const handleSaveStudentProfile = (profile: StudentProfile) => {
    setStudentProfile(profile);
    setShowRegistrationModal(false);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("exponent_master_stats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem(
      "exponent_master_completed_lessons",
      JSON.stringify(completedLessons)
    );
  }, [completedLessons]);

  // Handle Question Completed in Quiz Mode
  const handleQuestionCompleted = (
    question: Question,
    isCorrect: boolean,
    xpEarned: number
  ) => {
    setStats((prev) => {
      const topicId = question.topicId as ExponentRuleId;
      const currentTopicStats = prev.ruleMastery[topicId] || {
        correct: 0,
        total: 0,
        level: 1,
      };

      const newCorrect = isCorrect
        ? currentTopicStats.correct + 1
        : currentTopicStats.correct;
      const newTotal = currentTopicStats.total + 1;

      const newXP = prev.xp + xpEarned;
      const newLevel = Math.floor(newXP / 100) + 1;
      const newCoins = prev.coins + (isCorrect ? 10 : 2);

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        coins: newCoins,
        totalAnswered: prev.totalAnswered + 1,
        totalCorrect: prev.totalCorrect + (isCorrect ? 1 : 0),
        todayAnsweredCount: prev.todayAnsweredCount + 1,
        ruleMastery: {
          ...prev.ruleMastery,
          [topicId]: {
            ...currentTopicStats,
            correct: newCorrect,
            total: newTotal,
          },
        },
      };
    });
  };

  // Handle 1v1 Duel Ended
  const handleDuelEnded = (won: boolean, xpEarned: number) => {
    setStats((prev) => {
      const newXP = prev.xp + xpEarned;
      const newLevel = Math.floor(newXP / 100) + 1;
      const newCoins = prev.coins + (won ? 50 : 15);
      const newWins = prev.duelRecord.wins + (won ? 1 : 0);
      const newLosses = prev.duelRecord.losses + (won ? 0 : 1);
      const newStreak = won ? prev.duelRecord.winStreak + 1 : 0;

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        coins: newCoins,
        duelRecord: {
          wins: newWins,
          losses: newLosses,
          winStreak: newStreak,
        },
      };
    });
  };

  const handleMarkLessonCompleted = (ruleId: string) => {
    if (!completedLessons.includes(ruleId)) {
      setCompletedLessons((prev) => [...prev, ruleId]);
      setStats((prev) => ({
        ...prev,
        xp: prev.xp + 30,
        coins: prev.coins + 15,
      }));
    }
  };

  const startQuizWithRule = (ruleId: string) => {
    setSelectedRuleFilterForQuiz(ruleId);
    setActiveTab("quiz");
  };

  const startTargetedDrill = (ruleId: ExponentRuleId) => {
    setSelectedRuleFilterForQuiz(ruleId);
    setActiveTab("quiz");
  };

  // Grouped Navigation Menus
  const navSections = [
    {
      title: "เรียนรู้ & ฝึกฝน (Learning & Practice)",
      items: [
        { id: "dashboard", label: "หน้าหลัก & แดชบอร์ด", icon: "🏠", tag: "ภาพรวม" },
        { id: "lessons", label: "บทเรียน & สรุป 8 กฎ", icon: "📚", tag: "ทฤษฎี" },
        { id: "quiz", label: "ชุดข้อสอบแยกตามสมบัติ", icon: "📝", tag: "50+ ข้อ", hasSubMenu: true },
      ],
    },
    {
      title: "ประเมินผล & ท้าทาย (Challenge & Mastery)",
      items: [
        { id: "weakness", label: "วิเคราะห์จุดอ่อน AI", icon: "🔍", tag: "ตรวจเช็ก" },
        { id: "duel", label: "ประลอง 1v1 Arena", icon: "⚔️", tag: "PvP ดวล" },
        { id: "progress", label: "สถิติ & พัฒนาการ", icon: "📊", tag: "เหรียญ" },
        { id: "leaderboard", label: "ตารางอันดับผู้เรียน", icon: "🏆", tag: "ลีดเดอร์บอร์ด" },
        { id: "weekly", label: "คลังโจทย์รายสัปดาห์", icon: "📅", tag: "โจทย์ใหม่" },
      ],
    },
  ];

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex h-screen w-full bg-[#F8FAFC] dark:bg-[#0F172A] font-sans overflow-hidden text-[#1E293B] dark:text-slate-100 transition-colors duration-200">
        
        {/* ========================================================================= */}
        {/* 1. SIDEBAR FOR DESKTOP (จัดหมวดหมู่ชัดเจน ใช้งานง่าย) */}
        {/* ========================================================================= */}
        <aside className="hidden lg:flex w-72 bg-white dark:bg-[#1E293B] border-r border-[#E2E8F0] dark:border-slate-800 flex-col p-5 flex-shrink-0 select-none">
          {/* Brand Logo */}
          <div
            onClick={() => {
              setSelectedRuleFilterForQuiz(null);
              setActiveTab("dashboard");
            }}
            className="flex items-center gap-3 mb-6 cursor-pointer group px-2"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              ^
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-[#0F172A] dark:text-white">
                EXPON<span className="text-[#6366F1]">ENT</span>
              </h1>
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 block -mt-1 uppercase tracking-wider">
                Mastery ม.1-ม.2 • KruNiracha
              </span>
            </div>
          </div>

          {/* Navigation Sections */}
          <nav className="flex-1 space-y-5 overflow-y-auto pr-1">
            {navSections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1">
                <div className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-2">
                  {section.title}
                </div>
                {section.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <div key={item.id} className="space-y-1">
                      <button
                        onClick={() => {
                          if (item.id === "quiz") {
                            setSelectedRuleFilterForQuiz(null);
                            setRuleSubMenuOpen(!ruleSubMenuOpen);
                          }
                          setActiveTab(item.id as any);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-semibold text-xs sm:text-sm transition-all text-left ${
                          isActive
                            ? "bg-[#EEF2FF] dark:bg-indigo-950/60 text-[#6366F1] dark:text-indigo-300 shadow-xs font-bold border border-indigo-100 dark:border-indigo-900/50"
                            : "text-[#64748B] dark:text-slate-400 hover:bg-[#F1F5F9] dark:hover:bg-slate-800/80 hover:text-[#1E293B] dark:hover:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{item.icon}</span>
                          <span>{item.label}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                            {item.tag}
                          </span>
                          {isActive && (
                            <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                          )}
                        </div>
                      </button>

                      {/* Sub-menu for 8 Rule sets when on Quiz tab */}
                      {item.hasSubMenu && (activeTab === "quiz" || ruleSubMenuOpen) && (
                        <div className="pl-6 pr-1 py-1 space-y-0.5 border-l-2 border-indigo-100 dark:border-indigo-950 ml-5 my-1">
                          <button
                            onClick={() => {
                              setSelectedRuleFilterForQuiz(null);
                              setActiveTab("quiz");
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center justify-between ${
                              selectedRuleFilterForQuiz === null && activeTab === "quiz"
                                ? "bg-indigo-100 dark:bg-indigo-900/60 text-[#6366F1] dark:text-indigo-300"
                                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                          >
                            <span>⭐ รวมทุกสมบัติ (50+ ข้อ)</span>
                          </button>
                          {EXPONENT_RULES.map((rule) => {
                            const isSubActive = selectedRuleFilterForQuiz === rule.id && activeTab === "quiz";
                            return (
                              <button
                                key={rule.id}
                                onClick={() => {
                                  setSelectedRuleFilterForQuiz(rule.id);
                                  setActiveTab("quiz");
                                }}
                                className={`w-full text-left px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all flex items-center justify-between ${
                                  isSubActive
                                    ? "bg-indigo-100 dark:bg-indigo-900/60 text-[#6366F1] dark:text-indigo-300 font-bold"
                                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                }`}
                              >
                                <span className="truncate">{rule.title}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Student Profile Card Bento */}
          <div className="mt-3 p-3.5 bg-[#F1F5F9] dark:bg-slate-800/80 rounded-2xl border border-slate-200/60 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-black shadow-xs shrink-0">
                  {studentProfile && studentProfile.name ? studentProfile.name.trim().slice(0, 2) : "นัก"}
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] dark:text-slate-400">
                    โปรไฟล์นักเรียน
                  </div>
                  <div className="font-bold text-xs text-[#334155] dark:text-slate-200 truncate" title={studentProfile?.name}>
                    {studentProfile?.name || "ยังไม่ได้ลงทะเบียน"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-0.5 shrink-0">
                <button
                  id="btn-edit-student-sidebar"
                  onClick={() => setShowRegistrationModal(true)}
                  className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors shrink-0"
                  title="แก้ไขข้อมูลนักเรียน"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                {studentProfile && (
                  <button
                    id="btn-logout-sidebar"
                    onClick={handleRequestLogout}
                    className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors shrink-0"
                    title="ออกจากระบบ / สลับบัญชีผู้เรียน"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
            <div className="text-[11px] text-[#64748B] dark:text-slate-400 flex items-center justify-between pt-1 border-t border-slate-200/50 dark:border-slate-700/40 font-medium">
              <span className="truncate">
                {studentProfile?.grade || "ม.1"}
                {studentProfile?.studentNo ? ` เลขที่ ${studentProfile.studentNo}` : ""}
              </span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold shrink-0 ml-1">เลเวล {stats.level}</span>
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* 2. MAIN VIEWPORT & HEADER */}
        {/* ========================================================================= */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Header Bar */}
          <header className="px-6 py-4 bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-md border-b border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between flex-shrink-0 z-20">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-[#F1F5F9] dark:hover:bg-slate-800"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#0F172A] dark:text-white capitalize">
                  {activeTab === "dashboard" && "หน้าหลัก & แดชบอร์ดรวม"}
                  {activeTab === "lessons" && "สรุป 8 กฎสมบัติเลขยกกำลัง"}
                  {activeTab === "quiz" && "ชุดข้อสอบแยกตามสมบัติ (50+ ข้อ)"}
                  {activeTab === "duel" && "โหมดดวล 1v1 Real-Time Arena"}
                  {activeTab === "weakness" && "วิเคราะห์จุดอ่อน & แนะนำจุดซ่อม"}
                  {activeTab === "progress" && "สถิติและพัฒนาการการเรียนรู้"}
                  {activeTab === "leaderboard" && "ตารางจัดอันดับผู้เรียนยอดเยี่ยม"}
                  {activeTab === "weekly" && "คลังโจทย์ประจำสัปดาห์ & สร้างโจทย์สด"}
                </h2>
                <p className="text-xs text-[#64748B] dark:text-slate-400 hidden sm:block">
                  คลังข้อสอบ 50+ ข้อ โดย ครูนิรชา (KruNiracha) • เตรียมสอบ ม.1-ม.2
                </p>
              </div>
            </div>

            {/* User Stats & Student Profile Pill Bar */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Student Profile Pill Header (มุมบนของแอปพลิเคชัน) */}
              <button
                id="btn-student-profile-header"
                onClick={() => setShowRegistrationModal(true)}
                className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-2xl bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900/60 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-indigo-500/10 active:scale-95 transition-all text-left group"
                title="คลิกเพื่อแก้ไขข้อมูลนักเรียน / บันทึก Google Sheets"
              >
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
                  {studentProfile && studentProfile.name ? (
                    studentProfile.name.trim().slice(0, 2)
                  ) : (
                    "นัก"
                  )}
                </div>
                <div className="hidden sm:flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-800 dark:text-white truncate max-w-[110px] md:max-w-[140px]">
                      {studentProfile?.name || "ลงทะเบียนผู้เรียน"}
                    </span>
                    {studentProfile?.grade && (
                      <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/70 px-1.5 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900/50">
                        {studentProfile.grade}{studentProfile.studentNo ? ` #${studentProfile.studentNo}` : ""}
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold group-hover:text-indigo-500 transition-colors flex items-center gap-1">
                    <span>ข้อมูลผู้เรียน</span> • <span className="underline">แก้ไข</span>
                  </span>
                </div>
              </button>

              {/* Logout Button in Header */}
              {studentProfile && (
                <button
                  type="button"
                  id="btn-logout-header"
                  onClick={handleRequestLogout}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-900/60 hover:bg-rose-50/70 dark:hover:bg-rose-950/40 text-xs font-bold shadow-xs active:scale-95 transition-all"
                  title="ออกจากระบบ / สลับบัญชีผู้เรียน"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span className="hidden xl:inline">ออกจากระบบ</span>
                </button>
              )}

              {/* Focused Mastery CTA Header */}
              <button
                id="btn-header-focused-mastery"
                onClick={() => setShowFocusedMastery(true)}
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 text-white px-3.5 py-1.5 rounded-2xl text-xs font-black shadow-xs hover:shadow-indigo-500/25 active:scale-95 transition-all"
              >
                <Target className="w-3.5 h-3.5 text-rose-300" />
                <span>Focused Mastery</span>
              </button>

              {/* Quick 5-Min Drill CTA Header */}
              <button
                onClick={() => setShowQuickDrill(true)}
                className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3.5 py-1.5 rounded-2xl text-xs font-black shadow-xs hover:shadow-orange-500/20 active:scale-95 transition-all"
              >
                <Timer className="w-3.5 h-3.5" />
                <span>5-Min Drill</span>
              </button>

              {/* Streak */}
              <div className="flex items-center gap-1.5 bg-[#FFFBEB] dark:bg-amber-950/40 text-[#D97706] dark:text-amber-300 px-2.5 sm:px-3 py-1.5 rounded-2xl text-xs font-bold border border-amber-200/60 dark:border-amber-900/40">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{stats.streakDays} วัน</span>
              </div>

              {/* Coins */}
              <div className="hidden sm:flex items-center gap-1.5 bg-[#FEF3C7] dark:bg-yellow-950/40 text-[#B45309] dark:text-yellow-300 px-3 py-1.5 rounded-2xl text-xs font-bold border border-yellow-200/60 dark:border-yellow-900/40">
                <span>🪙</span>
                <span>{stats.coins}</span>
              </div>

              {/* XP */}
              <div className="flex items-center gap-1.5 bg-[#EEF2FF] dark:bg-indigo-950/40 text-[#6366F1] dark:text-indigo-300 px-2.5 sm:px-3.5 py-1.5 rounded-2xl text-xs font-bold border border-indigo-200/60 dark:border-indigo-900/40">
                <Zap className="w-4 h-4 text-[#6366F1] fill-[#6366F1]" />
                <span>{stats.xp} XP</span>
              </div>

              {/* Notification Bell */}
              <button
                onClick={() => setShowNotificationModal(true)}
                className="p-2 rounded-2xl text-[#64748B] dark:text-slate-400 hover:bg-[#F1F5F9] dark:hover:bg-slate-800 transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F43F5E] rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-2xl text-[#64748B] dark:text-slate-400 hover:bg-[#F1F5F9] dark:hover:bg-slate-800 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </header>

          {/* Mobile Drawer Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="lg:hidden bg-white dark:bg-[#1E293B] border-b border-slate-200 dark:border-slate-800 p-4 space-y-4 shadow-lg z-30 overflow-y-auto max-h-[80vh]"
              >
                {/* Mobile Student Profile Badge */}
                <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
                      {studentProfile && studentProfile.name ? studentProfile.name.trim().slice(0, 2) : "นัก"}
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                        {studentProfile?.name || "ยังไม่ได้ลงทะเบียน"}
                      </div>
                      <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                        {studentProfile?.grade || "ม.1"}{studentProfile?.studentNo ? ` เลขที่ ${studentProfile.studentNo}` : ""}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setShowRegistrationModal(true);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 shadow-2xs hover:bg-indigo-50"
                    >
                      แก้ไข
                    </button>
                    {studentProfile && (
                      <button
                        type="button"
                        id="btn-logout-mobile"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleRequestLogout();
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-[11px] font-bold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 shadow-2xs hover:bg-rose-100 flex items-center gap-1"
                        title="ออกจากระบบ / สลับบัญชีผู้เรียน"
                      >
                        <LogOut className="w-3 h-3" />
                        <span>ออก</span>
                      </button>
                    )}
                  </div>
                </div>
                {navSections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-1">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-2">
                      {section.title}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {section.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            if (item.id === "quiz") setSelectedRuleFilterForQuiz(null);
                            setActiveTab(item.id as any);
                            setMobileMenuOpen(false);
                          }}
                          className={`p-2.5 rounded-xl font-bold text-xs flex items-center gap-2 text-left ${
                            activeTab === item.id
                              ? "bg-[#6366F1] text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          <span className="text-base">{item.icon}</span>
                          <span className="truncate">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Stage Viewport */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              {/* ========================================================================= */}
              {/* BENTO DASHBOARD (HOME VIEW) */}
              {/* ========================================================================= */}
              {activeTab === "dashboard" && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Top Bento Row */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Bento Tile 1: Hero Banner (Col 8) */}
                    <div className="md:col-span-12 lg:col-span-8 bg-[#6366F1] rounded-3xl p-6 sm:p-8 relative overflow-hidden text-white flex flex-col justify-between shadow-lg shadow-indigo-500/15 min-h-[300px]">
                      <div className="relative z-10 max-w-xl">
                        <span className="bg-white/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md inline-block">
                          {studentProfile && studentProfile.name
                            ? `👋 ยินดีต้อนรับ: ${studentProfile.name} (${studentProfile.grade || "ม.1"}${studentProfile.studentNo ? ` #${studentProfile.studentNo}` : ""})`
                            : "บทเรียน & ข้อสอบ โดย ครูนิรชา (KruNiracha) • ม.1-ม.2"}
                        </span>
                        <h3 className="text-2xl sm:text-4xl font-extrabold mt-4 mb-2 leading-tight">
                          สมบัติเลขยกกำลัง <br className="hidden sm:inline" />
                          คลังข้อสอบ 50+ ข้อครบ 8 กฎ
                        </h3>
                        <p className="text-indigo-100 text-sm sm:text-base opacity-95 max-w-md leading-relaxed">
                          ฝึกทำโจทย์แยกตามแต่ละสมบัติ พร้อมเฉลยละเอียดทีละขั้น และระบบ AI ติวเตอร์แนะนำแบบจุดต่อจุด
                        </p>
                      </div>

                      <div className="relative z-10 flex items-center gap-3 pt-6 flex-wrap">
                        <button
                          id="btn-hero-quick-drill"
                          onClick={() => setShowQuickDrill(true)}
                          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-3 px-5 sm:px-6 rounded-2xl text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
                        >
                          <Timer className="w-4 h-4 text-slate-950" />
                          <span>วอร์มอัป 5 นาที (Quick Drill)</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedRuleFilterForQuiz(null);
                            setActiveTab("quiz");
                          }}
                          className="bg-white text-[#6366F1] hover:bg-slate-50 font-bold py-3 px-5 sm:px-6 rounded-2xl text-sm shadow-md active:scale-95 transition-all"
                        >
                          เริ่มทำข้อสอบรวมทุกชุด
                        </button>
                        <button
                          onClick={() => setActiveTab("lessons")}
                          className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-5 rounded-2xl text-sm backdrop-blur-md active:scale-95 transition-all"
                        >
                          ดูสรุป 8 กฎหลัก
                        </button>
                      </div>

                      {/* Mathematical Watermark & Ambient Blur */}
                      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                      <div className="absolute right-6 top-8 text-8xl sm:text-9xl opacity-20 font-black italic select-none pointer-events-none">
                        a<sup>n</sup>
                      </div>
                    </div>

                    {/* Bento Tile 2: Leaderboard Rankings (Col 4) */}
                    <div className="md:col-span-12 lg:col-span-4 bg-white dark:bg-[#1E293B] rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between">
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white mb-4 flex items-center justify-between">
                          <span>อันดับผู้เรียน</span>
                          <span className="text-xl">🏆</span>
                        </h4>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-100 dark:border-amber-900/40">
                            <div className="flex items-center gap-3">
                              <span className="font-black text-amber-600 dark:text-amber-400 w-4 text-center">1</span>
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 flex items-center justify-center text-white text-xs font-bold">
                                น
                              </div>
                              <span className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                                น้องน้ำหนาว
                              </span>
                            </div>
                            <span className="font-bold text-xs sm:text-sm text-amber-700 dark:text-amber-300">
                              2,840 XP
                            </span>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                            <div className="flex items-center gap-3">
                              <span className="font-black text-slate-400 w-4 text-center">2</span>
                              <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 text-xs font-bold">
                                ก
                              </div>
                              <span className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                                ก้องภพ
                              </span>
                            </div>
                            <span className="font-bold text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                              2,410 XP
                            </span>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-900/50">
                            <div className="flex items-center gap-3">
                              <span className="font-black text-[#6366F1] dark:text-indigo-400 w-4 text-center">3</span>
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                                คุณ
                              </div>
                              <span className="font-bold text-xs sm:text-sm text-indigo-950 dark:text-indigo-200">
                                คุณ (น้องแมค)
                              </span>
                            </div>
                            <span className="font-bold text-xs sm:text-sm text-[#6366F1] dark:text-indigo-300">
                              {stats.xp} XP
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        id="btn-open-leaderboard"
                        onClick={() => setActiveTab("leaderboard")}
                        className="w-full mt-4 py-2.5 text-[#6366F1] dark:text-indigo-400 font-bold text-xs sm:text-sm border-2 border-[#EEF2FF] dark:border-slate-700 rounded-xl hover:bg-[#EEF2FF] dark:hover:bg-slate-800 transition-colors"
                      >
                        ดูตารางจัดอันดับทั้งหมด
                      </button>
                    </div>
                  </div>

                  {/* ========================================================================= */}
                  {/* DEDICATED BENTO SECTION: คลังชุดข้อสอบแยกตาม 8 สมบัติหลัก */}
                  {/* ========================================================================= */}
                  <div className="bg-white dark:bg-[#1E293B] rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-[#6366F1] dark:text-indigo-400 font-bold">
                            📝
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                            ชุดข้อสอบแยกตามสมบัติเลขยกกำลัง (8 หมวด)
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                          เลือกทำข้อสอบเฉพาะสมบัติที่ต้องการ เพื่อฝึกฝนความแม่นยำและสะสมค่าประสบการณ์ XP
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedRuleFilterForQuiz(null);
                          setActiveTab("quiz");
                        }}
                        className="text-xs font-black text-[#6366F1] dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-4 py-2.5 rounded-2xl hover:bg-indigo-100 transition-all flex items-center gap-1.5"
                      >
                        <span>เปิดคลังข้อสอบทั้งหมด</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* 8 Rule Practice Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {EXPONENT_RULES.map((rule, idx) => {
                        const ruleCount = QUESTION_BANK.filter((q) => q.topicId === rule.id).length;
                        const userRuleStats = stats.ruleMastery[rule.id as ExponentRuleId] || { correct: 0, total: 0 };
                        const accuracy = userRuleStats.total > 0 ? Math.round((userRuleStats.correct / userRuleStats.total) * 100) : 0;

                        return (
                          <div
                            key={rule.id}
                            onClick={() => startQuizWithRule(rule.id)}
                            className="bg-[#F8FAFC] dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 p-5 rounded-2xl border-2 border-slate-200/80 dark:border-slate-700/60 hover:border-[#6366F1] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                                  {rule.gradeLevel}
                                </span>
                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                                  {ruleCount} ข้อ
                                </span>
                              </div>

                              <h4 className="font-black text-sm text-slate-800 dark:text-slate-100 group-hover:text-[#6366F1] transition-colors">
                                {rule.title}
                              </h4>

                              <div className="mt-2.5 p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                                <MathView expression={rule.shortFormula} />
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                                <span>ความแม่นยำ</span>
                                <span className="text-indigo-600 dark:text-indigo-400">{accuracy}%</span>
                              </div>
                              <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
                                <div
                                  className="h-full bg-[#6366F1] rounded-full"
                                  style={{ width: `${accuracy}%` }}
                                />
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  startQuizWithRule(rule.id);
                                }}
                                className="w-full py-2 bg-white dark:bg-slate-700 group-hover:bg-[#6366F1] text-slate-700 dark:text-slate-200 group-hover:text-white rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-600 group-hover:border-transparent transition-all flex items-center justify-center gap-1"
                              >
                                <span>ทำชุดข้อสอบนี้</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Secondary Bento Row */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Bento Tile 3: Weakness Analysis Tile (Col 4) */}
                    <div className="md:col-span-6 lg:col-span-4 bg-[#ECFDF5] dark:bg-emerald-950/30 rounded-3xl border-2 border-[#D1FAE5] dark:border-emerald-900/50 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-base sm:text-lg font-bold text-[#065F46] dark:text-emerald-300">
                            วิเคราะห์จุดอ่อน 🔍
                          </h4>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-200/60 dark:bg-emerald-900/60 text-[#065F46] dark:text-emerald-300">
                            AI Diagnostic
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#065F46] dark:text-emerald-400/90 mb-3">
                          ระบบ AI ตรวจพบสมบัติที่ควรซ่อมแซม:
                        </p>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-[#A7F3D0] dark:border-emerald-800 shadow-xs">
                          <div className="text-[#059669] dark:text-emerald-400 font-bold text-sm mb-1 font-mono">
                            (a<sup>m</sup>)<sup>n</sup> = a<sup>m × n</sup>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            การซ้อนเลขยกกำลัง คุณมักจะนำเลขชี้กำลังมาบวกกันแทนการคูณ
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="h-2 bg-[#D1FAE5] dark:bg-emerald-900/50 rounded-full overflow-hidden">
                          <div className="h-full bg-[#10B981] w-[75%] rounded-full" />
                        </div>
                        <div className="flex justify-between text-[11px] font-bold text-[#065F46] dark:text-emerald-300 mt-2">
                          <span>ความแม่นยำรวม</span>
                          <span>75%</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button
                            id="btn-bento-focused-mastery"
                            onClick={() => setShowFocusedMastery(true)}
                            className="flex-1 py-2 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white rounded-xl text-xs font-black shadow-xs transition-transform active:scale-95 flex items-center justify-center gap-1.5"
                          >
                            <Target className="w-3.5 h-3.5" />
                            <span>ซ่อม 3 กฎทันที</span>
                          </button>
                          <button
                            onClick={() => setActiveTab("weakness")}
                            className="px-3 py-2 bg-emerald-100 dark:bg-emerald-900/60 hover:bg-emerald-200 text-[#065F46] dark:text-emerald-300 rounded-xl text-xs font-bold transition-colors"
                          >
                            ตรวจเช็ก
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bento Tile 4: Weekly Progress Chart (Col 4) */}
                    <div className="md:col-span-6 lg:col-span-4 bg-white dark:bg-[#1E293B] rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 p-6 flex flex-col justify-between shadow-xs">
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white mb-2">
                          ความก้าวหน้ารายสัปดาห์
                        </h4>
                        <p className="text-xs text-[#64748B] dark:text-slate-400 mb-4">
                          อัตราการทำโจทย์และเป้าหมายรายวัน
                        </p>

                        <div className="flex items-end justify-between h-28 px-2 pt-4">
                          {[
                            { day: "จ.", height: "40%", active: false },
                            { day: "อ.", height: "65%", active: false },
                            { day: "พ.", height: "35%", active: false },
                            { day: "พฤ.", height: "85%", active: true },
                            { day: "ศ.", height: "95%", active: true },
                            { day: "ส.", height: "20%", active: false },
                            { day: "อา.", height: "15%", active: false },
                          ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-1.5 w-7">
                              <div className="w-full bg-[#F1F5F9] dark:bg-slate-800 h-20 rounded-t-lg flex items-end overflow-hidden">
                                <div
                                  className={`w-full rounded-t-lg transition-all ${
                                    item.active
                                      ? "bg-[#6366F1] shadow-xs"
                                      : "bg-[#CBD5E1] dark:bg-slate-600"
                                  }`}
                                  style={{ height: item.height }}
                                />
                              </div>
                              <span className="text-[10px] text-slate-400 font-bold">
                                {item.day}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveTab("progress")}
                        className="w-full mt-4 py-2.5 text-[#6366F1] dark:text-indigo-400 font-bold text-xs sm:text-sm border-2 border-[#EEF2FF] dark:border-slate-700 rounded-xl hover:bg-[#EEF2FF] dark:hover:bg-slate-800 transition-colors"
                      >
                        ดูสถิติและเหรียญรางวัล
                      </button>
                    </div>

                    {/* Bento Tile 5: 1v1 Real-Time Duel Card (Col 4) */}
                    <div className="md:col-span-12 lg:col-span-4 bg-[#F43F5E] dark:bg-rose-900/80 rounded-3xl p-6 text-white flex flex-col items-center justify-center text-center shadow-lg shadow-rose-900/20">
                      <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-3 shadow-inner">
                        ⚡
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold mb-1">
                        โหมดดวลเรียลไทม์ 1v1
                      </h4>
                      <p className="text-xs text-rose-100 mb-5 max-w-xs leading-relaxed">
                        ท้าทายเพื่อนในห้องหรือ AI Bots ด้วยโจทย์ 10 ข้อ <br />
                        ใครตอบไวและถูกมากกว่าเป็นฝ่ายชนะ!
                      </p>
                      <button
                        onClick={() => setActiveTab("duel")}
                        className="bg-white text-[#F43F5E] hover:bg-rose-50 font-bold py-3 px-8 rounded-2xl text-xs sm:text-sm shadow-md active:scale-95 transition-all"
                      >
                        ค้นหาคู่ดวล 1v1
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Lessons View */}
              {activeTab === "lessons" && (
                <motion.div
                  key="lessons"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <LessonViewer
                    onStartQuizWithRule={startQuizWithRule}
                    completedLessons={completedLessons}
                    onMarkLessonCompleted={handleMarkLessonCompleted}
                  />
                </motion.div>
              )}

              {/* Quiz Mode (ชุดข้อสอบแยกตามสมบัติ 50+ ข้อ) */}
              {activeTab === "quiz" && (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <QuizMode
                    initialRuleFilter={selectedRuleFilterForQuiz}
                    onQuestionCompleted={handleQuestionCompleted}
                    onOpenLesson={(ruleId) => {
                      setSelectedRuleFilterForQuiz(ruleId);
                      setActiveTab("lessons");
                    }}
                  />
                </motion.div>
              )}

              {/* Duel Mode */}
              {activeTab === "duel" && (
                <motion.div
                  key="duel"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <DuelMode onDuelEnded={handleDuelEnded} userXP={stats.xp} />
                </motion.div>
              )}

              {/* Weakness Diagnostic */}
              {activeTab === "weakness" && (
                <motion.div
                  key="weakness"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <WeaknessAnalysis
                    stats={stats}
                    onStartTargetedDrill={startTargetedDrill}
                    onOpenLesson={(ruleId) => {
                      setSelectedRuleFilterForQuiz(ruleId);
                      setActiveTab("lessons");
                    }}
                    onStartFocusedMastery={() => setShowFocusedMastery(true)}
                  />
                </motion.div>
              )}

              {/* Progress Dashboard */}
              {activeTab === "progress" && (
                <motion.div
                  key="progress"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProgressDashboard
                    stats={stats}
                    onOpenQuests={() => setActiveTab("weekly")}
                    studentProfile={studentProfile}
                    onEditProfile={() => setShowRegistrationModal(true)}
                    onLogout={handleRequestLogout}
                  />
                </motion.div>
              )}

              {/* Leaderboard View */}
              {activeTab === "leaderboard" && (
                <motion.div
                  key="leaderboard"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <LeaderboardView
                    userXP={stats.xp}
                    userLevel={stats.level}
                    studentName={studentProfile?.name}
                    studentGrade={studentProfile?.grade}
                  />
                </motion.div>
              )}

              {/* Weekly Bank & AI Generator */}
              {activeTab === "weekly" && (
                <motion.div
                  key="weekly"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <WeeklyBankView
                    onStartQuizWithQuestions={(questions) => {
                      setSelectedRuleFilterForQuiz(null);
                      setActiveTab("quiz");
                    }}
                    onOpenQuestionModal={(q) => {}}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>

        {/* Reminder Modal */}
        {showNotificationModal && (
          <NotificationModal
            onClose={() => setShowNotificationModal(false)}
            streakDays={stats.streakDays}
          />
        )}

        {/* Quick 5-Minute Drill Modal */}
        <QuickDrillModal
          isOpen={showQuickDrill}
          onClose={() => setShowQuickDrill(false)}
          onQuestionCompleted={handleQuestionCompleted}
          onOpenFullQuiz={() => {
            setSelectedRuleFilterForQuiz(null);
            setActiveTab("quiz");
          }}
          onOpenLesson={(ruleId) => {
            setSelectedRuleFilterForQuiz(ruleId);
            setActiveTab("lessons");
          }}
        />

        {/* Focused Mastery Mode Modal (3 Weakest Rules Remediation) */}
        <FocusedMasteryMode
          isOpen={showFocusedMastery}
          onClose={() => setShowFocusedMastery(false)}
          stats={stats}
          onQuestionCompleted={handleQuestionCompleted}
          onOpenLesson={(ruleId) => {
            setSelectedRuleFilterForQuiz(ruleId);
            setActiveTab("lessons");
          }}
        />

        {/* Student Registration / Mandatory Welcome Modal */}
        <StudentRegistrationModal
          isOpen={showRegistrationModal}
          canClose={Boolean(studentProfile && studentProfile.name && studentProfile.name.trim().length > 0)}
          currentProfile={studentProfile}
          onSave={handleSaveStudentProfile}
          onClose={() => setShowRegistrationModal(false)}
          onLogout={() => {
            setShowRegistrationModal(false);
            handleRequestLogout();
          }}
        />

        {/* Logout Confirmation Modal */}
        <LogoutConfirmModal
          isOpen={showLogoutConfirm}
          onClose={() => setShowLogoutConfirm(false)}
          onConfirm={handleConfirmLogout}
          currentProfile={studentProfile}
        />
      </div>
    </div>
  );
}
