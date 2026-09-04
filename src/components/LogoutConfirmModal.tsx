import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogOut, X, AlertCircle, User } from "lucide-react";
import { StudentProfile } from "../services/SheetService";

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentProfile: StudentProfile | null;
}

export const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentProfile,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-[#1E293B] w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800 text-center relative overflow-hidden"
        >
          {/* Close button */}
          <button
            type="button"
            id="btn-close-logout-modal"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon Header */}
          <div className="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/60 flex items-center justify-center mx-auto mb-4 shadow-inner">
            <LogOut className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
            ยืนยันการออกจากระบบ?
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
            คุณต้องการออกจากระบบเพื่อสลับบัญชีผู้เรียน หรือให้นักเรียนคนอื่นใช้งานเครื่องนี้ใช่หรือไม่?
          </p>

          {/* Current Profile Info Box */}
          {currentProfile && (
            <div className="bg-slate-50 dark:bg-slate-900/70 rounded-2xl p-4 border border-slate-200/70 dark:border-slate-800 mb-6 text-left flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black flex items-center justify-center text-sm shadow-sm shrink-0">
                {currentProfile.name.trim().slice(0, 2)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs text-slate-400 dark:text-slate-500 font-semibold">
                  ผู้ใช้งานปัจจุบัน
                </div>
                <div className="font-extrabold text-sm text-slate-800 dark:text-white truncate">
                  {currentProfile.name}
                </div>
                <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  {currentProfile.grade} {currentProfile.studentNo ? `• เลขที่ ${currentProfile.studentNo}` : ""}
                </div>
              </div>
            </div>
          )}

          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-2xl p-3 mb-6 flex items-start gap-2.5 text-left text-xs text-amber-800 dark:text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <span>
              คะแนนและประวัติที่ส่งไปยัง Google Sheets เรียบร้อยแล้วจะยังคงอยู่ในระบบของคุณครูอย่างปลอดภัย
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              id="btn-cancel-logout"
              onClick={onClose}
              className="w-full sm:flex-1 py-3 px-4 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              id="btn-confirm-logout"
              onClick={onConfirm}
              className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-md shadow-rose-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>ยืนยันออกจากระบบ</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LogoutConfirmModal;
