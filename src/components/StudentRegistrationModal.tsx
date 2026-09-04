import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  User,
  GraduationCap,
  Hash,
  School,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileSpreadsheet,
  ChevronDown,
  X,
  ArrowRight,
  ShieldCheck,
  LogOut
} from "lucide-react";
import sheetService, { StudentProfile } from "../services/SheetService";

interface StudentRegistrationModalProps {
  isOpen: boolean;
  canClose?: boolean; // false เมื่อเปิดครั้งแรกแบบบังคับกรอก
  currentProfile: StudentProfile | null;
  onSave: (profile: StudentProfile) => void;
  onClose?: () => void;
  onLogout?: () => void;
}

const CLASS_OPTIONS = [
  "ม.1/1",
  "ม.1/2",
  "ม.1/3",
  "ม.1/4",
  "ม.1/5",
  "ม.2/1",
  "ม.2/2",
  "ม.2/3",
  "ม.2/4",
  "ม.2/5",
];

export const StudentRegistrationModal: React.FC<StudentRegistrationModalProps> = ({
  isOpen,
  canClose = false,
  currentProfile,
  onSave,
  onClose,
  onLogout,
}) => {
  const [name, setName] = useState<string>("");
  const [grade, setGrade] = useState<string>("ม.1/1");
  const [customGrade, setCustomGrade] = useState<string>("");
  const [isCustomGrade, setIsCustomGrade] = useState<boolean>(false);
  const [studentNo, setStudentNo] = useState<string>("");
  const [school, setSchool] = useState<string>("โรงเรียนมัธยมศึกษา");

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{
    message: string;
    sheetSyncStatus: "synced" | "saved_local" | "failed";
  } | null>(null);

  // Initialize fields when modal opens or profile changes
  useEffect(() => {
    if (isOpen) {
      const activeProfile = currentProfile || sheetService.getStudentProfile();
      if (activeProfile) {
        setName(activeProfile.name || "");
        setStudentNo(activeProfile.studentNo || "");
        setSchool(activeProfile.school || "โรงเรียนมัธยมศึกษา");

        const savedGrade = activeProfile.grade || "ม.1/1";
        if (CLASS_OPTIONS.includes(savedGrade)) {
          setGrade(savedGrade);
          setIsCustomGrade(false);
          setCustomGrade("");
        } else {
          setIsCustomGrade(true);
          setCustomGrade(savedGrade);
        }
      } else {
        // Defaults for first time student
        setName("");
        setGrade("ม.1/1");
        setIsCustomGrade(false);
        setCustomGrade("");
        setStudentNo("");
        setSchool("โรงเรียนมัธยมศึกษา");
      }

      setErrorMessage(null);
      setSuccessInfo(null);
    }
  }, [isOpen, currentProfile]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = name.trim();
    const finalGrade = isCustomGrade ? customGrade.trim() : grade.trim();
    const trimmedStudentNo = studentNo.trim();
    const trimmedSchool = school.trim();

    // Validation
    if (!trimmedName || trimmedName.length < 2) {
      setErrorMessage("กรุณากรอก 'ชื่อ - นามสกุล' ของนักเรียนให้ครบถ้วน");
      return;
    }

    if (!finalGrade) {
      setErrorMessage("กรุณาเลือกหรือระบุ 'ระดับชั้น' ของนักเรียน");
      return;
    }

    if (!trimmedStudentNo) {
      setErrorMessage("กรุณากรอก 'เลขที่' ของนักเรียน");
      return;
    }

    setIsSubmitting(true);

    const profileData: StudentProfile = {
      name: trimmedName,
      grade: finalGrade,
      studentNo: trimmedStudentNo,
      school: trimmedSchool,
    };

    try {
      // 1. บันทึกลง localStorage ทันทีผ่าน sheetService
      sheetService.saveStudentProfile(profileData);

      // 2. ส่งข้อมูลการลงทะเบียน / การเข้าเรียนไปยัง Google Sheets ผ่าน Webhook อัตโนมัติ
      const attendanceResult = await sheetService.submitAttendance({
        name: trimmedName,
        grade: finalGrade,
        studentNo: trimmedStudentNo,
        school: trimmedSchool,
        note: currentProfile ? "อัปเดตข้อมูลผู้เรียน" : "ลงทะเบียนเข้าใช้งานระบบใหม่",
      });

      const syncStatus = attendanceResult.success ? "synced" : "saved_local";

      setSuccessInfo({
        message:
          syncStatus === "synced"
            ? "บันทึกและเชื่อมต่อ Google Sheets สำเร็จ! พร้อมเริ่มทำข้อสอบ"
            : "บันทึกข้อมูลเรียบร้อย พร้อมเริ่มทำข้อสอบและสะสมคะแนน",
        sheetSyncStatus: syncStatus,
      });

      // หน่วงเวลาเล็กน้อยเพื่อให้ผู้เรียนเห็น Feedback สวยงามก่อนเข้าสู่แอป
      setTimeout(() => {
        setIsSubmitting(false);
        onSave(profileData);
        if (onClose) onClose();
      }, 900);
    } catch (err: any) {
      console.error("Failed to submit student registration:", err);
      // Fallback: บันทึกข้อมูลลง local เสมอเพื่อให้นักเรียนไม่ถูกขัดขวางการเรียน
      sheetService.saveStudentProfile(profileData);
      setIsSubmitting(false);
      onSave(profileData);
      if (onClose) onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full max-w-lg bg-white dark:bg-[#1E293B] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative"
      >
        {/* Decorative Top Accent Bar */}
        <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        {/* Close Button (เฉพาะเมื่อได้รับอนุญาตให้ปิดได้ เช่น กดเข้ามาแก้ไขข้อมูล) */}
        {canClose && onClose && (
          <button
            id="btn-close-registration-modal"
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10"
            aria-label="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="p-6 sm:p-8">
          {/* Header & Greeting */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/60 shadow-xs mb-1">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {currentProfile ? "แก้ไขข้อมูลนักเรียน" : "ลงทะเบียนเข้าสู่ระบบผู้เรียน"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
              {currentProfile
                ? "อัปเดตชื่อ ชั้น และเลขที่ เพื่อใช้สำหรับบันทึกคะแนนและส่งผลการเรียน"
                : "กรุณากรอกข้อมูลเพื่อบันทึกสถิติการเรียนรู้ และคะแนนแบบทดสอบเข้าสู่ระบบ"}
            </p>
          </div>

          {/* Automatic Google Sheets Connection Badge (ซ่อนหน้าต่างตั้งค่า เชื่อมต่ออัตโนมัติ) */}
          <div className="mb-5 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-3 text-xs">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div className="text-left flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-emerald-950 dark:text-emerald-200">
                  ระบบส่งคะแนน Google Sheets:
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-900/80 text-emerald-700 dark:text-emerald-300">
                  🟢 เชื่อมต่ออัตโนมัติ
                </span>
              </div>
              <p className="text-[11px] text-emerald-700/90 dark:text-emerald-400/90 truncate">
                บันทึกการเข้าเรียนและคะแนนส่งตรงถึงครูผู้สอนทันที
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="input-student-name"
                className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5"
              >
                ชื่อ - นามสกุล <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="input-student-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="เช่น ด.ช. ธนภัทร สุขเกษม หรือ กัญญาณัฐ"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Grade & Student Number Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Grade */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  ระดับชั้น <span className="text-rose-500">*</span>
                </label>
                {!isCustomGrade ? (
                  <div className="space-y-2">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <select
                        id="select-student-grade"
                        value={grade}
                        onChange={(e) => {
                          if (e.target.value === "custom") {
                            setIsCustomGrade(true);
                          } else {
                            setGrade(e.target.value);
                          }
                        }}
                        className="w-full pl-10 pr-8 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all appearance-none cursor-pointer"
                      >
                        {CLASS_OPTIONS.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                        <option value="custom">✏️ ระบุห้องเรียนอื่น ๆ</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="input-custom-grade"
                        value={customGrade}
                        onChange={(e) => setCustomGrade(e.target.value)}
                        placeholder="เช่น ม.1/6 หรือ ม.3"
                        required
                        className="w-full pl-10 pr-8 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomGrade(false);
                          setGrade("ม.1/1");
                        }}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                      >
                        ตัวเลือก
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Student Number */}
              <div>
                <label
                  htmlFor="input-student-no"
                  className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5"
                >
                  เลขที่ <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Hash className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    id="input-student-no"
                    value={studentNo}
                    onChange={(e) => setStudentNo(e.target.value)}
                    placeholder="เช่น 15"
                    min="1"
                    max="99"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* School (Optional) */}
            <div>
              <label
                htmlFor="input-student-school"
                className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1"
              >
                โรงเรียน (ระบุหรือไม่ก็ได้)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <School className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="input-student-school"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="เช่น โรงเรียนสาธิตมหาวิทยาลัย..."
                  className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Error Feedback */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-2 text-rose-700 dark:text-rose-300 text-xs font-medium"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {/* Success Feedback */}
            {successInfo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-2 text-emerald-700 dark:text-emerald-300 text-xs font-medium"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>{successInfo.message}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                id="btn-submit-registration"
                disabled={isSubmitting}
                className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-indigo-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>กำลังบันทึกข้อมูลและเชื่อมต่อ...</span>
                  </>
                ) : (
                  <>
                    <span>ยืนยันข้อมูลและเริ่มเรียนรู้</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {currentProfile && onLogout && (
                <button
                  type="button"
                  id="btn-logout-registration-modal"
                  onClick={onLogout}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>ออกจากระบบ / สลับบัญชีผู้เรียนคนอื่น</span>
                </button>
              )}
            </div>
          </form>

          {/* Privacy Note */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>ระบบจำลองและจดจำชื่ออัตโนมัติ ไม่ต้องกรอกซ้ำในครั้งถัดไป</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentRegistrationModal;
