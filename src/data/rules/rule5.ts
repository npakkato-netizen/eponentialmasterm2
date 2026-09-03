import { Question } from "../../types";

export const RULE_5_QUESTIONS: Question[] = [
  {
    id: "q_poq_1",
    question: "จงหาค่าของ $\\left(\\frac{2}{3}\\right)^4$",
    mathExpression: "\\left(\\frac{2}{3}\\right)^4",
    topicId: "rule-power-of-quotient",
    topicName: "เลขยกกำลังของผลหาร",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "\\frac{16}{81}" },
      { id: "B", text: "\\frac{8}{12}" },
      { id: "C", text: "\\frac{16}{3}" },
      { id: "D", text: "\\frac{2}{81}" }
    ],
    correctAnswer: "A",
    hint: "กระจายเลขชี้กำลัง 4 ทั้งตัวเศษและตัวส่วน: $\\frac{2^4}{3^4}$",
    stepByStep: [
      "กระจายเลขชี้กำลัง 4: $\\frac{2^4}{3^4}$",
      "คำนวณตัวเศษ: $2^4 = 16$",
      "คำนวณตัวส่วน: $3^4 = 81$",
      "ได้ผลลัพธ์เป็น $\\frac{16}{81}$"
    ],
    commonMistake: "ระวังอย่ายกกำลังเฉพาะตัวเศษหรือตัวส่วนเพียงตัวเดียว",
    ruleUsed: "\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n} \\quad (b \\neq 0)",
    xpReward: 20
  },
  {
    id: "q_poq_2",
    question: "จงหาผลลัพธ์ของ $\\left(-\\frac{3}{5}\\right)^3$",
    mathExpression: "\\left(-\\frac{3}{5}\\right)^3",
    topicId: "rule-power-of-quotient",
    topicName: "เลขยกกำลังของผลหาร",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "-\\frac{27}{125}" },
      { id: "B", text: "\\frac{27}{125}" },
      { id: "C", text: "-\\frac{9}{15}" },
      { id: "D", text: "-\\frac{27}{5}" }
    ],
    correctAnswer: "A",
    hint: "จำนวนลบยกกำลังคี่ ผลลัพธ์ต้องติดลบ: $-\\frac{3^3}{5^3}$",
    stepByStep: [
      "เครื่องหมายลบยกกำลัง 3 (จำนวนคี่) ยังคงได้ค่าลบ",
      "กระจายกำลัง 3: $-\\frac{3^3}{5^3}$",
      "คำนวณ $3^3 = 27$ และ $5^3 = 125$",
      "ได้คำตอบเป็น $-\\frac{27}{125}$"
    ],
    ruleUsed: "\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n} \\quad (b \\neq 0)",
    xpReward: 25
  },
  {
    id: "q_poq_3",
    question: "จงทำให้เป็นรูปอย่างง่าย: $\\left(\\frac{2x^3}{y^2}\\right)^3$ เมื่อ $y \\neq 0$",
    mathExpression: "\\left(\\frac{2x^3}{y^2}\\right)^3",
    topicId: "rule-power-of-quotient",
    topicName: "เลขยกกำลังของผลหาร",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "\\frac{8x^9}{y^6}" },
      { id: "B", text: "\\frac{2x^9}{y^6}" },
      { id: "C", text: "\\frac{6x^6}{y^5}" },
      { id: "D", text: "\\frac{8x^6}{y^5}" }
    ],
    correctAnswer: "A",
    hint: "กระจายกำลัง 3 ให้ $2, x^3$ และ $y^2$: $\\frac{2^3 (x^3)^3}{(y^2)^3}$",
    stepByStep: [
      "กระจายเลขชี้กำลัง 3: $\\frac{2^3 \\times (x^3)^3}{(y^2)^3}$",
      "คำนวณตัวเศษ: $2^3 = 8$ และ $(x^3)^3 = x^9$",
      "คำนวณตัวส่วน: $(y^2)^3 = y^6$",
      "รวมผลลัพธ์เป็น $\\frac{8x^9}{y^6}$"
    ],
    ruleUsed: "\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n} \\quad (b \\neq 0)",
    xpReward: 30
  },
  {
    id: "q_poq_4",
    question: "จงหาค่าของ $\\left(\\frac{3}{4}\\right)^{-2}$",
    mathExpression: "\\left(\\frac{3}{4}\\right)^{-2}",
    topicId: "rule-power-of-quotient",
    topicName: "เลขยกกำลังของผลหาร",
    gradeLevel: "ม.2",
    difficulty: "medium",
    options: [
      { id: "A", text: "\\frac{16}{9}" },
      { id: "B", text: "\\frac{9}{16}" },
      { id: "C", text: "-\\frac{9}{16}" },
      { id: "D", text: "-\\frac{16}{9}" }
    ],
    correctAnswer: "A",
    hint: "กลับเศษเป็นส่วนเมื่อเลขชี้กำลังติดลบ: $\\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n$",
    stepByStep: [
      "ใช้สมบัติเลขชี้กำลังลบกับเศษส่วน: $\\left(\\frac{3}{4}\\right)^{-2} = \\left(\\frac{4}{3}\\right)^2$",
      "กระจายกำลัง 2: $\\frac{4^2}{3^2}$",
      "คำนวณ $4^2 = 16$ และ $3^2 = 9$",
      "ได้คำตอบคือ $\\frac{16}{9}$"
    ],
    ruleUsed: "\\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n \\quad (a, b \\neq 0)",
    xpReward: 35
  },
  {
    id: "q_poq_5",
    question: "จงทำให้เป็นรูปอย่างง่าย: $\\left(\\frac{a^{-2} b^3}{c^{-1}}\\right)^2$ เมื่อ $a, b, c \\neq 0$",
    mathExpression: "\\left(\\frac{a^{-2} b^3}{c^{-1}}\\right)^2",
    topicId: "rule-power-of-quotient",
    topicName: "เลขยกกำลังของผลหาร",
    gradeLevel: "ม.2",
    difficulty: "hard",
    options: [
      { id: "A", text: "\\frac{b^6 c^2}{a^4}" },
      { id: "B", text: "\\frac{a^4 b^6}{c^2}" },
      { id: "C", text: "\\frac{b^5 c^2}{a^4}" },
      { id: "D", text: "\\frac{b^6}{a^4 c^2}" }
    ],
    correctAnswer: "A",
    hint: "กระจายกำลัง 2: $\\frac{a^{-4} b^6}{c^{-2}}$ แล้วย้าย $a^{-4}$ ลงล่างและ $c^{-2}$ ขึ้นบน",
    stepByStep: [
      "กระจายกำลัง 2 ไปยังทุกตัวแปร: $\\frac{a^{-4} b^6}{c^{-2}}$",
      "ย้ายพจน์ที่มีเลขชี้กำลังติดลบ: $a^{-4} = \\frac{1}{a^4}$ และ $\\frac{1}{c^{-2}} = c^2$",
      "ได้ผลลัพธ์เป็น $\\frac{b^6 c^2}{a^4}$"
    ],
    ruleUsed: "\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n} \\quad (b \\neq 0)",
    xpReward: 40
  },
  {
    id: "q_poq_6",
    question: "จงหาค่าของ $\\left(-\\frac{1}{2}\\right)^6$",
    mathExpression: "\\left(-\\frac{1}{2}\\right)^6",
    topicId: "rule-power-of-quotient",
    topicName: "เลขยกกำลังของผลหาร",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "\\frac{1}{64}" },
      { id: "B", text: "-\\frac{1}{64}" },
      { id: "C", text: "\\frac{1}{12}" },
      { id: "D", text: "-\\frac{1}{32}" }
    ],
    correctAnswer: "A",
    hint: "เลขชี้กำลัง 6 เป็นจำนวนคู่ ค่าติดลบยกกำลังคู่จะได้ค่าบวก: $\\frac{1}{2^6} = \\frac{1}{64}$",
    stepByStep: [
      "จำนวนลบยกกำลังคู่ได้ค่าบวกเสมอ",
      "กระจายกำลัง 6: $\\frac{1^6}{2^6}$",
      "คำนวณ $2^6 = 64$",
      "ได้คำตอบเป็น $\\frac{1}{64}$"
    ],
    ruleUsed: "\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n} \\quad (b \\neq 0)",
    xpReward: 20
  },
  {
    id: "q_poq_7",
    question: "จงหาค่าของ $\\frac{18^3}{9^3}$",
    mathExpression: "\\frac{18^3}{9^3}",
    topicId: "rule-power-of-quotient",
    topicName: "เลขยกกำลังของผลหาร",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "8" },
      { id: "B", text: "2" },
      { id: "C", text: "6" },
      { id: "D", text: "4" }
    ],
    correctAnswer: "A",
    hint: "ใช้สมบัติย้อนกลับ: $\\frac{a^n}{b^n} = \\left(\\frac{a}{b}\\right)^n \\implies \\left(\\frac{18}{9}\\right)^3 = 2^3 = 8$",
    stepByStep: [
      "เนื่องจากเลขชี้กำลังเท่ากันคือ 3",
      "รวมผลหาร: $\\left(\\frac{18}{9}\\right)^3$",
      "ตัดทอน $\\frac{18}{9} = 2$",
      "คำนวณ $2^3 = 8$"
    ],
    ruleUsed: "\\frac{a^n}{b^n} = \\left(\\frac{a}{b}\\right)^n \\quad (b \\neq 0)",
    xpReward: 25
  },
  {
    id: "q_poq_8",
    question: "ข้อใดมีค่าเท่ากับ $\\left(\\frac{5a}{2b}\\right)^3$ เมื่อ $b \\neq 0$",
    mathExpression: "\\left(\\frac{5a}{2b}\\right)^3",
    topicId: "rule-power-of-quotient",
    topicName: "เลขยกกำลังของผลหาร",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "\\frac{125a^3}{8b^3}" },
      { id: "B", text: "\\frac{15a^3}{6b^3}" },
      { id: "C", text: "\\frac{125a^3}{2b}" },
      { id: "D", text: "\\frac{5a^3}{2b^3}" }
    ],
    correctAnswer: "A",
    hint: "ยกกำลัง 3 ทั้งตัวเลขและตัวแปร: $\\frac{5^3 a^3}{2^3 b^3} = \\frac{125a^3}{8b^3}$",
    stepByStep: [
      "กระจายกำลัง 3 ทั้งเศษและส่วน: $\\frac{(5a)^3}{(2b)^3}$",
      "คำนวณตัวเศษ: $5^3 a^3 = 125a^3$",
      "คำนวณตัวส่วน: $2^3 b^3 = 8b^3$",
      "ได้ผลลัพธ์เป็น $\\frac{125a^3}{8b^3}$"
    ],
    ruleUsed: "\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n} \\quad (b \\neq 0)",
    xpReward: 25
  },
  {
    id: "q_poq_9",
    question: "จงหาค่าของ $\\left(\\frac{10}{2}\\right)^4 \\div 5^2$",
    mathExpression: "\\left(\\frac{10}{2}\\right)^4 \\div 5^2",
    topicId: "rule-power-of-quotient",
    topicName: "เลขยกกำลังของผลหาร",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "25" },
      { id: "B", text: "5" },
      { id: "C", text: "125" },
      { id: "D", text: "1" }
    ],
    correctAnswer: "A",
    hint: "$\\frac{10}{2} = 5$ จะได้ $5^4 \\div 5^2 = 5^{4-2} = 5^2 = 25$",
    stepByStep: [
      "ตัดทอนในวงเล็บ: $\\frac{10}{2} = 5$",
      "ยกกำลัง: $5^4$",
      "หารด้วย $5^2$: $\\frac{5^4}{5^2} = 5^{4-2} = 5^2 = 25$"
    ],
    ruleUsed: "\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n} \\quad (b \\neq 0)",
    xpReward: 30
  },
  {
    id: "q_poq_10",
    question: "จงทำให้เป็นรูปอย่างง่าย: $\\left(\\frac{x^2}{2y}\\right)^{-3}$ เมื่อ $x, y \\neq 0$",
    mathExpression: "\\left(\\frac{x^2}{2y}\\right)^{-3}",
    topicId: "rule-power-of-quotient",
    topicName: "เลขยกกำลังของผลหาร",
    gradeLevel: "ม.2",
    difficulty: "hard",
    options: [
      { id: "A", text: "\\frac{8y^3}{x^6}" },
      { id: "B", text: "\\frac{2y^3}{x^6}" },
      { id: "C", text: "\\frac{8y^3}{x^5}" },
      { id: "D", text: "\\frac{y^3}{8x^6}" }
    ],
    correctAnswer: "A",
    hint: "กลับเศษเป็นส่วน: $\\left(\\frac{2y}{x^2}\\right)^3 = \\frac{2^3 y^3}{(x^2)^3} = \\frac{8y^3}{x^6}$",
    stepByStep: [
      "กลับเศษเป็นส่วนเพื่อเปลี่ยนเลขชี้กำลังเป็นบวก: $\\left(\\frac{2y}{x^2}\\right)^3$",
      "กระจายกำลัง 3: $\\frac{2^3 y^3}{(x^2)^3}$",
      "คำนวณ $2^3 = 8$ และ $(x^2)^3 = x^6$",
      "ได้คำตอบเป็น $\\frac{8y^3}{x^6}$"
    ],
    ruleUsed: "\\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n \\quad (a, b \\neq 0)",
    xpReward: 40
  },
  {
    id: "q_poq_11",
    question: "จงหาค่าของ $\\left(\\frac{2}{5}\\right)^3 \\times \\left(\\frac{5}{2}\\right)^3$",
    mathExpression: "\\left(\\frac{2}{5}\\right)^3 \\times \\left(\\frac{5}{2}\\right)^3",
    topicId: "rule-power-of-quotient",
    topicName: "เลขยกกำลังของผลหาร",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "1" },
      { id: "B", text: "0" },
      { id: "C", text: "\\frac{4}{25}" },
      { id: "D", text: "\\frac{8}{125}" }
    ],
    correctAnswer: "A",
    hint: "รวมวงเล็บ $\\left(\\frac{2}{5} \\times \\frac{5}{2}\\right)^3 = (1)^3 = 1$",
    stepByStep: [
      "เลขชี้กำลังเท่ากัน นำฐานมาคูณกัน: $\\left(\\frac{2}{5} \\times \\frac{5}{2}\\right)^3$",
      "ตัดทอนเศษส่วนด้านใน: $1^3$",
      "คำนวณ $1^3 = 1$"
    ],
    ruleUsed: "\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n} \\quad (b \\neq 0)",
    xpReward: 20
  },
  {
    id: "q_poq_12",
    question: "ถ้า $\\left(\\frac{2}{3}\\right)^x = \\frac{16}{81}$ แล้วค่าของ $x$ คือเท่าใด",
    mathExpression: "\\left(\\frac{2}{3}\\right)^x = \\frac{16}{81}",
    topicId: "rule-power-of-quotient",
    topicName: "เลขยกกำลังของผลหาร",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "4" },
      { id: "B", text: "2" },
      { id: "C", text: "3" },
      { id: "D", text: "8" }
    ],
    correctAnswer: "A",
    hint: "$16 = 2^4$ และ $81 = 3^4$ ดังนั้น $\\frac{16}{81} = \\left(\\frac{2}{3}\\right)^4$",
    stepByStep: [
      "เขียน $\\frac{16}{81}$ ในรูปเลขยกกำลัง: $\\frac{2^4}{3^4} = \\left(\\frac{2}{3}\\right)^4$",
      "เทียบกับ $\\left(\\frac{2}{3}\\right)^x$",
      "ได้ $x = 4$"
    ],
    ruleUsed: "\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n} \\quad (b \\neq 0)",
    xpReward: 25
  },
  {
    id: "q_poq_13",
    question: "จงทำให้เป็นรูปอย่างง่าย: $\\frac{\\left(\\frac{a}{b}\\right)^4 \\left(\\frac{b}{c}\\right)^4}{\\left(\\frac{a}{c}\\right)^4}$ เมื่อ $a, b, c \\neq 0$",
    mathExpression: "\\frac{\\left(\\frac{a}{b}\\right)^4 \\left(\\frac{b}{c}\\right)^4}{\\left(\\frac{a}{c}\\right)^4}",
    topicId: "rule-power-of-quotient",
    topicName: "เลขยกกำลังของผลหาร",
    gradeLevel: "ม.2",
    difficulty: "medium",
    options: [
      { id: "A", text: "1" },
      { id: "B", text: "\\frac{a}{b}" },
      { id: "C", text: "0" },
      { id: "D", text: "\\left(\\frac{a}{c}\\right)^8" }
    ],
    correctAnswer: "A",
    hint: "ตัวเศษ: $\\left(\\frac{a}{b} \\times \\frac{b}{c}\\right)^4 = \\left(\\frac{a}{c}\\right)^4$, ตัดกับตัวส่วนได้ 1",
    stepByStep: [
      "รวมตัวเศษ: $\\left(\\frac{a}{b} \\times \\frac{b}{c}\\right)^4 = \\left(\\frac{a}{c}\\right)^4$",
      "หารด้วยตัวส่วน: $\\frac{\\left(\\frac{a}{c}\\right)^4}{\\left(\\frac{a}{c}\\right)^4} = 1$"
    ],
    ruleUsed: "\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n} \\quad (b \\neq 0)",
    xpReward: 35
  },
  {
    id: "q_poq_14",
    question: "จงหาค่าของ $\\left(\\frac{-4}{6}\\right)^2$ ในรูปเศษส่วนอย่างต่ำ",
    mathExpression: "\\left(\\frac{-4}{6}\\right)^2",
    topicId: "rule-power-of-quotient",
    topicName: "เลขยกกำลังของผลหาร",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "\\frac{4}{9}" },
      { id: "B", text: "-\\frac{4}{9}" },
      { id: "C", text: "\\frac{16}{36}" },
      { id: "D", text: "\\frac{2}{3}" }
    ],
    correctAnswer: "A",
    hint: "ตัดทอนเศษส่วนก่อน: $-\\frac{4}{6} = -\\frac{2}{3}$ แล้วยกกำลัง 2: $\\left(-\\frac{2}{3}\\right)^2 = \\frac{4}{9}$",
    stepByStep: [
      "ทอนเป็นเศษส่วนอย่างต่ำ: $-\\frac{4}{6} = -\\frac{2}{3}$",
      "ยกกำลัง 2: $\\left(-\\frac{2}{3}\\right)^2 = \\frac{(-2)^2}{3^2} = \\frac{4}{9}$"
    ],
    ruleUsed: "\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n} \\quad (b \\neq 0)",
    xpReward: 25
  },
  {
    id: "q_poq_15",
    question: "ถ้า $\\left(\\frac{2}{5}\\right)^x = \\frac{125}{8}$ แล้วค่าของ $x$ คือข้อใด",
    mathExpression: "\\left(\\frac{2}{5}\\right)^x = \\frac{125}{8}",
    topicId: "rule-power-of-quotient",
    topicName: "เลขยกกำลังของผลหาร",
    gradeLevel: "ม.2",
    difficulty: "hard",
    options: [
      { id: "A", text: "-3" },
      { id: "B", text: "3" },
      { id: "C", text: "-\\frac{1}{3}" },
      { id: "D", text: "-2" }
    ],
    correctAnswer: "A",
    hint: "$\\frac{125}{8} = \\frac{5^3}{2^3} = \\left(\\frac{5}{2}\\right)^3 = \\left(\\frac{2}{5}\\right)^{-3}$",
    stepByStep: [
      "เขียน $\\frac{125}{8}$ ในรูปเลขยกกำลัง: $\\left(\\frac{5}{2}\\right)^3$",
      "กลับเศษเป็นส่วนเพื่อเทียบฐาน $\\frac{2}{5}$: $\\left(\\frac{5}{2}\\right)^3 = \\left(\\frac{2}{5}\\right)^{-3}$",
      "เทียบเลขชี้กำลัง: $x = -3$"
    ],
    ruleUsed: "\\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n \\quad (a, b \\neq 0)",
    xpReward: 40
  }
];
