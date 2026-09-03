/**
 * ยูทิลิตี้สำหรับ Web Share API และการแชร์คะแนน/เหรียญรางวัลลงโซเชียลมีเดีย
 */

export interface ShareDataPayload {
  title: string;
  text: string;
  url?: string;
}

/**
 * ตรวจสอบว่าเบราว์เซอร์รองรับ Web Share API หรือไม่
 */
export function isWebShareSupported(): boolean {
  return typeof navigator !== "undefined" && typeof navigator.share === "function";
}

/**
 * ดึงลิงก์แอปพลิเคชันปัจจุบันสำหรับแนบในการแชร์
 */
export function getAppShareUrl(): string {
  if (typeof window !== "undefined") {
    // ตัด query params ที่ไม่จำเป็นออกหากมี
    return window.location.origin + window.location.pathname;
  }
  return "https://ais-dev-bpv66awp6423uobu3nf7xn-649808877361.asia-southeast1.run.app";
}

/**
 * ฟังก์ชันแชร์ผ่าน Web Share API พร้อมระบบตรวจจับและ fallback
 */
export async function executeWebShare(data: ShareDataPayload): Promise<{
  success: boolean;
  method: "web-share" | "clipboard" | "aborted" | "error";
  errorMessage?: string;
}> {
  const shareUrl = data.url || getAppShareUrl();
  const sharePayload: ShareData = {
    title: data.title,
    text: data.text,
    url: shareUrl,
  };

  // ตรวจสอบ Web Share API
  if (isWebShareSupported()) {
    try {
      // ตรวจสอบ canShare หากมี method
      if (typeof navigator.canShare === "function" && !navigator.canShare(sharePayload)) {
        // Fallback ไปคัดลอกลงคลิปบอร์ด
        const copySuccess = await copyToClipboard(`${data.title}\n\n${data.text}\n\n🔗 ${shareUrl}`);
        return {
          success: copySuccess,
          method: "clipboard",
        };
      }

      await navigator.share(sharePayload);
      return { success: true, method: "web-share" };
    } catch (err: any) {
      // หากผู้ใช้กดกดยกเลิกใน Share Sheet (AbortError) ไม่ถือเป็นความผิดพลาด
      if (err.name === "AbortError") {
        return { success: false, method: "aborted" };
      }

      console.warn("Web Share API failed or permission denied, falling back to clipboard:", err);
      // Fallback ไปยัง clipboard
      const copySuccess = await copyToClipboard(`${data.title}\n\n${data.text}\n\n🔗 ${shareUrl}`);
      return {
        success: copySuccess,
        method: copySuccess ? "clipboard" : "error",
        errorMessage: err.message,
      };
    }
  }

  // เบราว์เซอร์ไม่รองรับ Web Share API -> คัดลอกลงคลิปบอร์ดอัตโนมัติ
  const copySuccess = await copyToClipboard(`${data.title}\n\n${data.text}\n\n🔗 ${shareUrl}`);
  return {
    success: copySuccess,
    method: copySuccess ? "clipboard" : "error",
  };
}

/**
 * คัดลอกข้อความลงคลิปบอร์ด พร้อม fallback สำหรับเบราว์เซอร์เก่าหรือ iframe
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn("Clipboard API failed, trying execCommand fallback:", err);
    }
  }

  // Fallback textarea method
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";
    textArea.style.pointerEvents = "none";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error("Fallback copy failed:", err);
    return false;
  }
}

/**
 * สร้างลิงก์แชร์โซเชียลมีเดียยอดนิยม
 */
export function getSocialShareLinks(payload: ShareDataPayload) {
  const url = encodeURIComponent(payload.url || getAppShareUrl());
  const combinedText = encodeURIComponent(`${payload.title}\n\n${payload.text}`);
  const lineText = encodeURIComponent(`${payload.title}\n${payload.text}\n${payload.url || getAppShareUrl()}`);

  return {
    line: `https://social-plugins.line.me/lineit/share?url=${url}&text=${lineText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${combinedText}`,
    twitter: `https://twitter.com/intent/tweet?text=${combinedText}&url=${url}`,
  };
}

/**
 * สร้างข้อความสำหรับแชร์คะแนนแบบทดสอบ (Quiz / Exam)
 */
export function createQuizScoreSharePayload(options: {
  studentName?: string;
  grade?: string;
  topicTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  xpEarned: number;
}): ShareDataPayload {
  const studentInfo = options.studentName
    ? `👤 ผู้เรียน: ${options.studentName} ${options.grade ? `(${options.grade})` : ""}\n`
    : "";

  return {
    title: `🏆 ฉันทำคะแนนได้ ${options.score}/${options.totalQuestions} (${options.percentage}%) ใน ${options.topicTitle}!`,
    text: `🎉 ทำแบบทดสอบสมบัติเลขยกกำลัง ม.1-ม.2 (KruNiracha) สำเร็จแล้ว!\n${studentInfo}📝 ชุดทดสอบ: ${options.topicTitle}\n🎯 คะแนนที่ได้: ${options.score}/${options.totalQuestions} ข้อ (${options.percentage}%)\n⚡ ได้รับแต้มสะสม: +${options.xpEarned} XP\n\nมาฝึกฝนและประลองความรู้เรื่องเลขยกกำลังไปด้วยกัน! 🚀`,
    url: getAppShareUrl(),
  };
}

/**
 * สร้างข้อความสำหรับแชร์ผลการจับเวลา 15 ข้อ (Quick Drill)
 */
export function createDrillSharePayload(options: {
  studentName?: string;
  grade?: string;
  setName: string;
  correctCount: number;
  totalCount: number;
  timeSpent: string;
  xpEarned: number;
}): ShareDataPayload {
  const studentInfo = options.studentName
    ? `👤 ผู้เรียน: ${options.studentName} ${options.grade ? `(${options.grade})` : ""}\n`
    : "";

  return {
    title: `⏱️ ผ่านภารกิจจับเวลา 15 ข้อ (${options.correctCount}/${options.totalCount} ข้อ) ใน ${options.timeSpent}!`,
    text: `⚡ พิชิต 5-Minute Drill สมบัติเลขยกกำลัง ม.1-ม.2 (KruNiracha)!\n${studentInfo}📋 ชุดข้อสอบ: ${options.setName}\n✅ ความถูกต้อง: ${options.correctCount}/${options.totalCount} ข้อ\n⏳ เวลาที่ใช้: ${options.timeSpent}\n🌟 แต้ม XP ที่ได้รับ: +${options.xpEarned} XP\n\nมาทดสอบความเร็วและความแม่นยำกัน! 🏆`,
    url: getAppShareUrl(),
  };
}

/**
 * สร้างข้อความสำหรับแชร์เหรียญตราเกียรติยศ (Badge & Achievement)
 */
export function createBadgeSharePayload(options: {
  studentName?: string;
  grade?: string;
  badgeTitle: string;
  badgeDescription: string;
  requirement?: string;
}): ShareDataPayload {
  const studentInfo = options.studentName
    ? `👤 ผู้เรียน: ${options.studentName} ${options.grade ? `(${options.grade})` : ""}\n`
    : "";

  return {
    title: `🏅 ปลดล็อกเหรียญตราใหม่: "${options.badgeTitle}" สำเร็จแล้ว!`,
    text: `✨ ฉันเพิ่งปลดล็อกเหรียญรางวัลในแอปสมบัติเลขยกกำลัง ม.1-ม.2 (KruNiracha)!\n${studentInfo}🏆 เหรียญตรา: ${options.badgeTitle}\n📜 ความสำเร็จ: ${options.badgeDescription}\n${options.requirement ? `🎯 เงื่อนไข: ${options.requirement}\n` : ""}\nมาร่วมเก็บเหรียญตราและอัปเลเวลความรู้คณิตศาสตร์กัน! 🌟`,
    url: getAppShareUrl(),
  };
}

/**
 * สร้างข้อความสำหรับแชร์ความก้าวหน้ารวม (Level & Total XP)
 */
export function createLevelSharePayload(options: {
  studentName?: string;
  grade?: string;
  level: number;
  levelTitle: string;
  totalXP: number;
  streakDays: number;
}): ShareDataPayload {
  const studentInfo = options.studentName
    ? `👤 ผู้เรียน: ${options.studentName} ${options.grade ? `(${options.grade})` : ""}\n`
    : "";

  return {
    title: `🌟 ฉันบรรลุ Level ${options.level}: "${options.levelTitle}" ด้วยพลัง ${options.totalXP} XP!`,
    text: `🚀 ความก้าวหน้าในแอปสมบัติเลขยกกำลัง ม.1-ม.2 (KruNiracha)!\n${studentInfo}⭐ ระดับ: Level ${options.level} (${options.levelTitle})\n⚡ คะแนนสะสมรวม: ${options.totalXP} XP\n🔥 สตรีคการเรียนรู้: ต่อเนื่อง ${options.streakDays} วัน\n\nพร้อมลุยโจทย์เลขยกกำลังทุกระดับแล้ว! 💪`,
    url: getAppShareUrl(),
  };
}
