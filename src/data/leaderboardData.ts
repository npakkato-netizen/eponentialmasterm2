import { LeaderboardUser } from "../types";

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    id: "user_1",
    rank: 1,
    name: "น้องพลอย ม.2/1 (หัวหน้าห้อง)",
    avatar: "👑",
    grade: "ม.2",
    school: "โรงเรียนเตรียมอุดมศึกษาพัฒนาการ",
    xp: 3450,
    level: 14,
    winStreak: 8,
    tier: "Master",
    badge: "ปรมาจารย์เลขยกกำลัง"
  },
  {
    id: "user_2",
    rank: 2,
    name: "ภูริภัทร Math Wizard",
    avatar: "⚡",
    grade: "ม.2",
    school: "โรงเรียนสวนกุหลาบวิทยาลัย",
    xp: 2980,
    level: 12,
    winStreak: 5,
    tier: "Diamond",
    badge: "จอมเวทกำลังซ้อน"
  },
  {
    id: "user_3",
    rank: 3,
    name: "ต้นกล้า ม.1/3",
    avatar: "🚀",
    grade: "ม.1",
    school: "โรงเรียนสาธิต มศว ปทุมวัน",
    xp: 2620,
    level: 11,
    winStreak: 4,
    tier: "Diamond",
    badge: "นักล่าสัญกรณ์"
  },
  {
    id: "user_current",
    rank: 4,
    name: "คุณ (ผู้เรียนปัจจุบัน)",
    avatar: "🌟",
    grade: "ม.1-ม.2",
    school: "ห้องเรียนคณิตคิดเร็ว",
    xp: 1250,
    level: 6,
    winStreak: 2,
    tier: "Gold",
    isCurrentUser: true,
    badge: "ผู้ปราบเลขชี้กำลังลบ"
  },
  {
    id: "user_4",
    rank: 5,
    name: "มินตรา สายคำนวณ",
    avatar: "🐱",
    grade: "ม.1",
    school: "โรงเรียนสตรีวิทยา",
    xp: 1180,
    level: 5,
    winStreak: 1,
    tier: "Gold",
    badge: "สตรีคเกอร์"
  },
  {
    id: "user_5",
    rank: 6,
    name: "ก้องภพ ตัวตึงห้อง ม.2",
    avatar: "🔥",
    grade: "ม.2",
    school: "โรงเรียนบดินทรเดชา",
    xp: 940,
    level: 4,
    winStreak: 0,
    tier: "Silver",
    badge: "ก้าวแรกสู่อารีน่า"
  },
  {
    id: "user_6",
    rank: 7,
    name: "น้องเนย ขยันซ้อม",
    avatar: "🌸",
    grade: "ม.1",
    school: "โรงเรียนวัฒนาวิทยาลัย",
    xp: 720,
    level: 3,
    winStreak: 0,
    tier: "Silver",
    badge: "ผู้มุ่งมั่น"
  },
  {
    id: "user_7",
    rank: 8,
    name: "ไอซ์ ซ้อมสอบ O-NET",
    avatar: "🎯",
    grade: "ม.2",
    school: "โรงเรียนสามเสนวิทยาลัย",
    xp: 450,
    level: 2,
    winStreak: 0,
    tier: "Bronze",
    badge: "น้องใหม่"
  }
];
