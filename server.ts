import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// AI Math Tutor explanation endpoint
app.post("/api/ai/explain", async (req, res) => {
  try {
    const { question, options, correctAnswer, userAnswer, ruleTopic } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        success: true,
        explanation: `💡 **สรุปหลักการสำคัญ (${ruleTopic || "สมบัติเลขยกกำลัง"}):**\n\n- คำตอบที่ถูกต้องคือ: **${correctAnswer}**\n- สังเกตว่าในโจทย์นี้ให้แปลงฐานหรือใช้สมบัติเลขยกกำลังทีละขั้นตอน\n- อย่าลืมตรวจสอบเครื่องหมายบวกลบ และกรณีเลขชี้กำลังเป็นศูนย์หรือลบ`,
        tips: "ฝึกจำแนกฐานและเลขชี้กำลังก่อนลงมือคำนวณเสมอ!",
      });
    }

    const prompt = `คุณคือ "ครูพี่ AI ติวเตอร์สมบัติเลขยกกำลัง ม.1-ม.2" ที่ใจดี อธิบายเข้าใจง่ายและกระชับ
โจทย์: ${question}
ตัวเลือก: ${JSON.stringify(options || [])}
คำตอบที่ถูกต้อง: ${correctAnswer}
คำตอบที่ผู้เรียนเลือก: ${userAnswer || "ยังไม่ได้ตอบ"}
หัวข้อสมบัติ: ${ruleTopic || "สมบัติเลขยกกำลัง"}

กรุณาอธิบายทีละขั้นตอน (Step-by-step) เป็นภาษาไทย โดย:
1. บอกกฎหรือสมบัติเลขยกกำลังที่ใช้ในข้อนี้อย่างชัดเจน (เช่น a^m * a^n = a^(m+n))
2. แสดงวิธีทำทีละขั้นแบบเห็นภาพ เข้าใจง่ายสำหรับเด็ก ม.1-ม.2
3. จุดที่เด็กมักจะพลาดหรือเข้าใจผิด (Common Pitfall)
4. ให้กำลังใจสั้นๆ และเทคนิคจำแม่น`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: "คุณเป็นครูสอนคณิตศาสตร์ระดับมัธยมต้นที่เชี่ยวชาญเรื่องเลขยกกำลัง เน้นอธิบายทีละขั้นเป็นภาษาไทย ใช้ภาษาเป็นกันเอง กระชับและสนุกสนาน",
      },
    });

    res.json({
      success: true,
      explanation: response.text || "สามารถดูวิธีทำได้จากสมบัติเลขยกกำลังที่เกี่ยวข้อง",
    });
  } catch (error: any) {
    console.error("Gemini explain error:", error);
    res.json({
      success: false,
      explanation: "ขออภัย ไม่สามารถเชื่อมต่อกับระบบ AI ได้ในขณะนี้ กรุณาดูคำอธิบายมาตรฐานของระบบ",
      error: error.message,
    });
  }
});

// AI Question Generator endpoint for infinite fresh weekly practice
app.post("/api/ai/generate-question", async (req, res) => {
  try {
    const { gradeLevel = "ม.1-ม.2", topic = "all", difficulty = "medium" } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        success: false,
        message: "API key is required for dynamic AI question generation.",
      });
    }

    const prompt = `สร้างโจทย์คณิตศาสตร์เรื่อง "สมบัติเลขยกกำลัง" สำหรับระดับชั้น ${gradeLevel} 
หัวข้อ: ${topic}
ระดับความยาก: ${difficulty} (easy / medium / hard / exam-challenge)

กรุณาตอบเป็น JSON ในรูปแบบ:
{
  "id": "ai_gen_${Date.now()}",
  "question": "ข้อความโจทย์ เช่น จงหาค่าของ (2^3 * 2^4) / 2^5",
  "mathExpression": "(2^3 \\times 2^4) \\div 2^5",
  "topicId": "multiplication-division",
  "topicName": "การคูณและหารเลขยกกำลัง",
  "difficulty": "${difficulty}",
  "options": [
    {"id": "A", "text": "2^2 หรือ 4"},
    {"id": "B", "text": "2^3 หรือ 8"},
    {"id": "C", "text": "2^1 หรือ 2"},
    {"id": "D", "text": "2^0 หรือ 1"}
  ],
  "correctAnswer": "A",
  "hint": "คำใบ้สั้นๆ",
  "stepByStep": [
    "ขั้นที่ 1: นำตัวเศษมาคูณกัน...",
    "ขั้นที่ 2: นำมาหารกับตัวส่วน..."
  ],
  "commonMistake": "ข้อผิดพลาดยอดฮิต...",
  "ruleUsed": "a^m \\times a^n = a^{m+n} และ a^m \\div a^n = a^{m-n}"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({
      success: true,
      question: parsed,
    });
  } catch (error: any) {
    console.error("Gemini generate error:", error);
    res.json({
      success: false,
      error: error.message,
    });
  }
});

// AI Personalized Weakness Analysis
app.post("/api/ai/analyze-weakness", async (req, res) => {
  try {
    const { history, accuracyByTopic } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        success: true,
        analysis: "วิเคราะห์จุดอ่อนของคุณ: คุณทำได้ดีในหัวข้อการคูณเลขยกกำลัง แนะนำให้ทบทวนเรื่องเลขชี้กำลังที่เป็นลบ ($a^{-n} = 1/a^n$) และกำลังซ้อน $((a^m)^n)$ เพิ่มเติมเพื่อความแม่นยำ 100%!",
        recommendations: [
          "ฝึกแปลงเลขชี้กำลังติดลบให้เป็นเศษส่วน",
          "ระวังการกระจายเลขชี้กำลังเมื่อมีเครื่องหมายลบหน้าฐาน เช่น (-2)^4 vs -2^4",
          "ฝึกทำโจทย์ผสม 5 ข้อต่อวัน"
        ]
      });
    }

    const prompt = `วิเคราะห์ผลการทำแบบฝึกหัดเรื่องสมบัติเลขยกกำลังของนักเรียน ม.1-ม.2:
สถิติความแม่นยำตามหัวข้อ: ${JSON.stringify(accuracyByTopic)}
ประวัติการตอบผิดล่าสุด: ${JSON.stringify(history?.slice(-5) || [])}

กรุณาวิเคราะห์จุดอ่อนและให้คำแนะนำแบบเจาะจง 3 ข้อ พร้อมกำลังใจเชิงบวกในรูปแบบ JSON:
{
  "summary": "สรุปภาพรวมจุดแข็งและจุดที่ต้องระวัง",
  "weakTopic": "ชื่อหัวข้อที่ผิดบ่อยที่สุด",
  "whyConfused": "สาเหตุที่เด็กมักสับสนในจุดนี้",
  "actionPlan": ["คำแนะนำข้อที่ 1", "คำแนะนำข้อที่ 2", "คำแนะนำข้อที่ 3"],
  "encouragement": "คำคมหรือข้อความให้กำลังใจสั้นๆ สไตล์ครูใจดี"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({
      success: true,
      data: parsed,
    });
  } catch (error: any) {
    console.error("Gemini weakness error:", error);
    res.json({
      success: false,
      error: error.message,
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Exponential Master server running on http://localhost:${PORT}`);
  });
}

startServer();
