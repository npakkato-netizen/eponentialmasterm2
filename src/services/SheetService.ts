/**
 * SheetService.ts
 * บริการจัดการการส่งข้อมูลชื่อ การเข้าเรียน และคะแนนของนักเรียนไปยัง Google Sheets
 * ผ่าน Webhook ของ Google Apps Script (Apps Script Web App)
 */

export interface StudentProfile {
  name: string;
  grade?: string; // ระดับชั้น เช่น ม.1/1, ม.2
  studentNo?: string; // เลขที่
  school?: string;
}

export interface AttendancePayload {
  name: string;
  grade?: string;
  studentNo?: string;
  school?: string;
  note?: string;
  timestamp?: string;
}

export interface QuizScorePayload {
  studentName: string;
  grade?: string;
  studentNo?: string;
  topicTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  xpEarned: number;
  timeSpentSeconds?: number;
  mode?: "quiz" | "drill" | "duel" | "exam";
  note?: string;
  timestamp?: string;
}

export interface LearningHistoryRecord {
  id: string;
  actionType: "attendance" | "quiz_score" | "drill_score" | "duel_result" | "lesson_completion";
  studentName: string;
  grade?: string;
  studentNo?: string;
  summary: string;
  score?: number;
  total?: number;
  xpEarned?: number;
  timestamp: string;
  status: "synced" | "pending" | "failed";
  errorMessage?: string;
}

export interface SheetApiResponse {
  success: boolean;
  message: string;
  timestamp?: string;
  spreadsheetUrl?: string;
  error?: string;
}

const STORAGE_KEY_WEBHOOK = "exponent_master_sheet_webhook_url";
const STORAGE_KEY_STUDENT = "exponent_master_current_student";
const STORAGE_KEY_LOGS = "exponent_master_sheet_logs";

// Default or fallback URL (can also be configured via .env: VITE_APPS_SCRIPT_URL)
const DEFAULT_WEBHOOK_URL =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_APPS_SCRIPT_URL) || "";

class SheetService {
  private webhookUrl: string = "";

  constructor() {
    this.webhookUrl = this.loadWebhookUrl();
  }

  /**
   * ดึง Webhook URL ปัจจุบันที่บันทึกไว้
   */
  public getWebhookUrl(): string {
    return this.webhookUrl || this.loadWebhookUrl();
  }

  /**
   * บันทึก Webhook URL ใหม่ลงใน LocalStorage
   */
  public setWebhookUrl(url: string): void {
    const trimmed = url.trim();
    this.webhookUrl = trimmed;
    if (typeof window !== "undefined") {
      if (trimmed) {
        localStorage.setItem(STORAGE_KEY_WEBHOOK, trimmed);
      } else {
        localStorage.removeItem(STORAGE_KEY_WEBHOOK);
      }
    }
  }

  /**
   * ตรวจสอบว่ามีการตั้งค่า Webhook URL แล้วหรือไม่
   */
  public isConfigured(): boolean {
    return Boolean(this.getWebhookUrl());
  }

  /**
   * บันทึกข้อมูลโปรไฟล์นักเรียนไว้ในเครื่อง เพื่อไม่ต้องกรอกซ้ำ
   */
  public saveStudentProfile(profile: StudentProfile): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(profile));
    }
  }

  /**
   * ดึงข้อมูลโปรไฟล์นักเรียนที่เคยบันทึกไว้ในเครื่อง
   */
  public getStudentProfile(): StudentProfile | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_KEY_STUDENT);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as StudentProfile;
    } catch {
      return null;
    }
  }

  /**
   * ส่งข้อมูลการเข้าเรียน/บันทึกชื่อ (Attendance) ไปยัง Google Sheets
   */
  public async submitAttendance(payload: AttendancePayload): Promise<SheetApiResponse> {
    const timestamp = payload.timestamp || this.getFormattedTimestamp();
    const dataToSend = {
      action: "attendance",
      type: "เข้าใช้งานระบบ",
      name: payload.name.trim(),
      studentName: payload.name.trim(),
      grade: payload.grade || "-",
      number: payload.studentNo || "-",
      studentNo: payload.studentNo || "-",
      school: payload.school || "-",
      note: payload.note || "เข้าสู่ระบบ Exponential Master",
      timestamp,
    };

    // บันทึกโปรไฟล์นักเรียนล่าสุดไว้ในเครื่อง
    this.saveStudentProfile({
      name: payload.name.trim(),
      grade: payload.grade,
      studentNo: payload.studentNo,
      school: payload.school,
    });

    const result = await this.postToWebhook(dataToSend);

    // บันทึกลงประวัติการส่งในเครื่อง
    this.appendLocalLog({
      id: "log_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      actionType: "attendance",
      studentName: payload.name,
      grade: payload.grade,
      studentNo: payload.studentNo,
      summary: "บันทึกชื่อเข้าใช้งานระบบ",
      timestamp,
      status: result.success ? "synced" : "failed",
      errorMessage: result.error,
    });

    return result;
  }

  /**
   * ส่งคะแนนแบบทดสอบ / ควิซ ไปยัง Google Sheets
   */
  public async submitQuizScore(payload: QuizScorePayload): Promise<SheetApiResponse> {
    const timestamp = payload.timestamp || this.getFormattedTimestamp();
    const modeLabel =
      payload.mode === "drill"
        ? "ฝึกฝนแบบเร็ว"
        : payload.mode === "duel"
        ? "การประลองสมอง"
        : payload.mode === "exam"
        ? "ชุดข้อสอบจำลอง"
        : "แบบทดสอบท้ายบท";

    const dataToSend = {
      action: "quiz_score",
      type: modeLabel,
      name: payload.studentName.trim(),
      studentName: payload.studentName.trim(),
      grade: payload.grade || "-",
      number: payload.studentNo || "-",
      studentNo: payload.studentNo || "-",
      topic: payload.topicTitle,
      score: payload.score,
      totalQuestions: payload.totalQuestions,
      percentage: `${payload.percentage.toFixed(1)}%`,
      xpEarned: payload.xpEarned,
      timeSpent: payload.timeSpentSeconds ? `${payload.timeSpentSeconds} วินาที` : "-",
      note: payload.note || `โหมด: ${modeLabel} | ได้รับ ${payload.xpEarned} XP`,
      timestamp,
    };

    const result = await this.postToWebhook(dataToSend);

    this.appendLocalLog({
      id: "log_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      actionType: "quiz_score",
      studentName: payload.studentName,
      grade: payload.grade,
      studentNo: payload.studentNo,
      summary: `${modeLabel}: ${payload.topicTitle} (${payload.score}/${payload.totalQuestions})`,
      score: payload.score,
      total: payload.totalQuestions,
      xpEarned: payload.xpEarned,
      timestamp,
      status: result.success ? "synced" : "failed",
      errorMessage: result.error,
    });

    return result;
  }

  /**
   * ทดสอบการเชื่อมต่อกับ Webhook URL
   */
  public async testConnection(targetUrl?: string): Promise<SheetApiResponse> {
    const url = targetUrl?.trim() || this.getWebhookUrl();
    if (!url) {
      return {
        success: false,
        message: "ยังไม่ได้ระบุ Webhook URL ของ Google Apps Script",
      };
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
      });

      if (response.ok) {
        let jsonResponse: any = null;
        try {
          jsonResponse = await response.json();
        } catch {
          // ในกรณีส่งกลับเป็น text ปกติ
        }

        return {
          success: true,
          message: jsonResponse?.message || "เชื่อมต่อกับ Google Apps Script สำเร็จ",
          spreadsheetUrl: jsonResponse?.spreadsheetUrl,
        };
      } else {
        return {
          success: false,
          message: `ตอบกลับด้วยรหัสสถานะ: ${response.status} ${response.statusText}`,
        };
      }
    } catch (err: any) {
      // เนื่องจากบางครั้ง Google Apps Script Redirect อาจทำให้ GET ติด CORS แต่ POST ผ่านได้
      return {
        success: false,
        message: "ไม่สามารถเข้าถึง URL ได้ กรุณาตรวจสอบว่าเลือก 'ผู้มีสิทธิ์เข้าถึง: ทุกคน (Anyone)' ใน Google Apps Script หรือไม่",
        error: err.toString(),
      };
    }
  }

  /**
   * ดึงประวัติการส่งข้อมูลย้อนหลังที่เก็บบนเครื่อง
   */
  public getLocalLogs(): LearningHistoryRecord[] {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(STORAGE_KEY_LOGS);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as LearningHistoryRecord[];
    } catch {
      return [];
    }
  }

  /**
   * ล้างประวัติการส่งข้อมูลที่เก็บบนเครื่อง
   */
  public clearLocalLogs(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY_LOGS);
    }
  }

  /**
   * ฟังก์ชันหลักสำหรับส่ง HTTP POST ไปยัง Google Apps Script Web App
   */
  private async postToWebhook(data: Record<string, any>): Promise<SheetApiResponse> {
    const url = this.getWebhookUrl();

    if (!url) {
      return {
        success: false,
        message: "ยังไม่ได้กำหนด Webhook URL ในระบบ กรุณาตั้งค่า Google Sheets Webhook ก่อนส่งข้อมูล",
      };
    }

    try {
      // สำคัญมาก: ใช้ Content-Type: "text/plain;charset=utf-8"
      // เพื่อป้องกัน CORS Preflight (OPTIONS request) บน Google Apps Script
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(data),
      });

      let jsonResult: any = null;
      try {
        jsonResult = await response.json();
      } catch {
        // หาก Apps Script ส่งเป็น text หรือ redirect
      }

      if (jsonResult && typeof jsonResult.success === "boolean") {
        return {
          success: jsonResult.success,
          message: jsonResult.message || (jsonResult.success ? "บันทึกข้อมูลสำเร็จ" : "บันทึกข้อมูลไม่สำเร็จ"),
          timestamp: jsonResult.timestamp,
          spreadsheetUrl: jsonResult.spreadsheetUrl,
        };
      }

      if (response.ok) {
        return {
          success: true,
          message: "ส่งข้อมูลไปยัง Google Sheets สำเร็จ",
          timestamp: this.getFormattedTimestamp(),
        };
      }

      return {
        success: false,
        message: `ส่งข้อมูลไม่สำเร็จ (HTTP ${response.status})`,
        error: `Server responded with HTTP ${response.status}`,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "เกิดข้อผิดพลาดในการเชื่อมต่อไปยัง Google Apps Script",
        error: error?.message || error?.toString(),
      };
    }
  }

  private loadWebhookUrl(): string {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY_WEBHOOK);
      if (saved) return saved;
    }
    return DEFAULT_WEBHOOK_URL;
  }

  private appendLocalLog(record: LearningHistoryRecord): void {
    if (typeof window === "undefined") return;
    const current = this.getLocalLogs();
    // เก็บประวัติล่าสุดไว้ 50 รายการ
    const updated = [record, ...current].slice(0, 50);
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(updated));
  }

  private getFormattedTimestamp(): string {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1);
    const day = pad(now.getDate());
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}

// Export singleton instance และ class
export const sheetService = new SheetService();
export default sheetService;
