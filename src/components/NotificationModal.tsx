import React, { useState } from "react";
import {
  Bell,
  Check,
  X,
  Clock,
  Flame,
  Calendar,
  Sparkles,
  Volume2
} from "lucide-react";

interface NotificationModalProps {
  onClose: () => void;
  streakDays: number;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  onClose,
  streakDays,
}) => {
  const [reminderEnabled, setReminderEnabled] = useState<boolean>(true);
  const [reminderTime, setReminderTime] = useState<string>("19:00");
  const [streakProtection, setStreakProtection] = useState<boolean>(true);
  const [weekendSpecial, setWeekendSpecial] = useState<boolean>(true);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSave = () => {
    // Request notification permission if supported
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    setSavedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 dark:text-white text-base">
                ระบบแจ้งเตือนฝึกฝนสม่ำเสมอ
              </h3>
              <p className="text-xs text-slate-400">ตั้งเวลาเตือนความจำเพื่อความต่อเนื่อง</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Streak Status Box */}
        <div className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-500/20 flex items-center gap-3">
          <Flame className="w-6 h-6 text-amber-500 fill-amber-500 flex-shrink-0" />
          <div className="text-xs text-slate-700 dark:text-slate-300">
            <span className="font-bold block text-slate-900 dark:text-white">
              คุณกำลังสะสมสตรีค {streakDays} วัน!
            </span>
            ทำแบบฝึกหัดวันละเพียง 5 ข้อ เพื่อไม่ให้สถิติต่อเนื่องหลุดหาย
          </div>
        </div>

        {/* Settings List */}
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-800 dark:text-white text-xs block">
                แจ้งเตือนทำโจทย์รายวัน
              </span>
              <span className="text-[11px] text-slate-400">ส่งการแจ้งเตือนตามเวลาที่เลือก</span>
            </div>
            <input
              type="checkbox"
              checked={reminderEnabled}
              onChange={(e) => setReminderEnabled(e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded-lg focus:ring-indigo-500"
            />
          </div>

          {reminderEnabled && (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span className="font-bold text-slate-800 dark:text-white text-xs">
                  เวลาแจ้งเตือน:
                </span>
              </div>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800 dark:text-white"
              />
            </div>
          )}

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-800 dark:text-white text-xs block">
                แจ้งเตือนป้องกันสตรีคหลุด (Streak Saver)
              </span>
              <span className="text-[11px] text-slate-400">เตือนตอน 21:00 น. หากยังไม่ได้ทำโจทย์วันนี้</span>
            </div>
            <input
              type="checkbox"
              checked={streakProtection}
              onChange={(e) => setStreakProtection(e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded-lg focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-800 dark:text-white text-xs block">
                แจ้งเตือนข้อสอบใหม่ประจำสัปดาห์
              </span>
              <span className="text-[11px] text-slate-400">แจ้งเตือนทุกวันเสาร์เมื่อมีโจทย์ชุดใหม่</span>
            </div>
            <input
              type="checkbox"
              checked={weekendSpecial}
              onChange={(e) => setWeekendSpecial(e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded-lg focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSave}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 transition-transform active:scale-95"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>บันทึกการตั้งค่าเรียบร้อยแล้ว!</span>
            </>
          ) : (
            <>
              <Bell className="w-4 h-4" />
              <span>บันทึกการแจ้งเตือน</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
