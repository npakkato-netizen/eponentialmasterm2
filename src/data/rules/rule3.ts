import { Question } from "../../types";

export const RULE_3_QUESTIONS: Question[] = [
  {
    id: "q_pow_1",
    question: "จงหาผลลัพธ์ของ $(4^3)^2$ ในรูปเลขยกกำลังฐาน 2",
    mathExpression: "(4^3)^2",
    topicId: "rule-power-of-power",
    topicName: "เลขยกกำลังซ้อนกัน",
    gradeLevel: "ม.2",
    difficulty: "medium",
    options: [
      { id: "A", text: "2^{12}" },
      { id: "B", text: "2^6" },
      { id: "C", text: "2^{10}" },
      { id: "D", text: "4^5" }
    ],
    correctAnswer: "A",
    hint: "แปลง 4 ให้อยู่ในฐาน 2 คือ $2^2$ แล้วนำเลขชี้กำลังทั้งหมดมาคูณกัน",
    stepByStep: [
      "แปลงฐาน: $4 = 2^2$",
      "แทนค่าลงในนิพจน์: $((2^2)^3)^2$",
      "คูณเลขชี้กำลังทั้งหมด: $2 \\times 3 \\times 2 = 12$",
      "ได้คำตอบคือ $2^{12}$"
    ],
    ruleUsed: "(a^m)^n = a^{mn}",
    xpReward: 35
  },
  {
    id: "q_pow_2",
    question: "ข้อใดมีค่าเท่ากับ $\\frac{(x^4)^3}{(x^2)^5}$ เมื่อ $x \\neq 0$",
    mathExpression: "\\frac{(x^4)^3}{(x^2)^5}",
    topicId: "rule-power-of-power",
    topicName: "เลขยกกำลังซ้อนกัน",
    gradeLevel: "ม.2",
    difficulty: "medium",
    options: [
      { id: "A", text: "x^2" },
      { id: "B", text: "x" },
      { id: "C", text: "x^{-2}" },
      { id: "D", text: "x^4" }
    ],
    correctAnswer: "A",
    hint: "ตัวเศษกำลังซ้อน $4 \\times 3 = 12$, ตัวส่วน $2 \\times 5 = 10$ แล้วนำมาลบกัน",
    stepByStep: [
      "ตัวเศษ: $(x^4)^3 = x^{4 \\times 3} = x^{12}$",
      "ตัวส่วน: $(x^2)^5 = x^{2 \\times 5} = x^{10}$",
      "หารกัน: $\\frac{x^{12}}{x^{10}} = x^{12 - 10} = x^2$"
    ],
    ruleUsed: "(a^m)^n = a^{mn}, \\quad \\frac{a^m}{a^n} = a^{m-n} \\quad (a \\neq 0)",
    xpReward: 35
  },
  {
    id: "q_pow_3",
    question: "จงหาค่าของ $[(-2)^2]^3$",
    mathExpression: "[(-2)^2]^3",
    topicId: "rule-power-of-power",
    topicName: "เลขยกกำลังซ้อนกัน",
    gradeLevel: "ม.2",
    difficulty: "easy",
    options: [
      { id: "A", text: "64" },
      { id: "B", text: "-64" },
      { id: "C", text: "16" },
      { id: "D", text: "-16" }
    ],
    correctAnswer: "A",
    hint: "คำนวณในวงเล็บก่อน: $(-2)^2 = 4$ แล้วนำ $4^3 = 64$ หรือใช้ $(-2)^{2 \\times 3} = (-2)^6 = 64$",
    stepByStep: [
      "วิธีที่ 1: $(-2)^2 = +4$ จากนั้น $4^3 = 4 \\times 4 \\times 4 = 64$",
      "วิธีที่ 2: ใช้สมบัติกำลังซ้อน $(-2)^{2 \\times 3} = (-2)^6$",
      "เนื่องจากเลขชี้กำลัง 6 เป็นจำนวนคู่ จึงได้ $+64$"
    ],
    ruleUsed: "(a^m)^n = a^{mn}",
    xpReward: 25
  },
  {
    id: "q_pow_4",
    question: "จงหาค่าของ $(a^{-3})^{-4}$ เมื่อ $a \\neq 0$",
    mathExpression: "(a^{-3})^{-4}",
    topicId: "rule-power-of-power",
    topicName: "เลขยกกำลังซ้อนกัน",
    gradeLevel: "ม.2",
    difficulty: "easy",
    options: [
      { id: "A", text: "a^{12}" },
      { id: "B", text: "a^{-7}" },
      { id: "C", text: "a^{-12}" },
      { id: "D", text: "a^7" }
    ],
    correctAnswer: "A",
    hint: "นำเลขชี้กำลังมาคูณกัน: $(-3) \\times (-4) = +12$",
    stepByStep: [
      "ใช้สมบัติเลขยกกำลังซ้อน: $a^{(-3) \\times (-4)}$",
      "จำนวนลบคูณจำนวนลบได้จำนวนบวก: $(-3) \\times (-4) = 12$",
      "ได้ผลลัพธ์เป็น $a^{12}$"
    ],
    ruleUsed: "(a^m)^n = a^{mn}",
    xpReward: 25
  },
  {
    id: "q_pow_5",
    question: "ถ้า $(3^x)^4 = 3^{20}$ แล้ว $x$ มีค่าเท่ากับเท่าใด",
    mathExpression: "(3^x)^4 = 3^{20}",
    topicId: "rule-power-of-power",
    topicName: "เลขยกกำลังซ้อนกัน",
    gradeLevel: "ม.2",
    difficulty: "easy",
    options: [
      { id: "A", text: "5" },
      { id: "B", text: "16" },
      { id: "C", text: "80" },
      { id: "D", text: "4" }
    ],
    correctAnswer: "A",
    hint: "ใช้สมบัติกำลังซ้อน $3^{4x} = 3^{20} \\implies 4x = 20$",
    stepByStep: [
      "ฝั่งซ้ายคูณเลขชี้กำลัง: $3^{4x}$",
      "เทียบเลขชี้กำลัง: $4x = 20$",
      "แก้สมการ: $x = \\frac{20}{4} = 5$"
    ],
    ruleUsed: "(a^m)^n = a^{mn}",
    xpReward: 25
  },
  {
    id: "q_pow_6",
    question: "จงหาค่าของ $\\{[(2^2)^2]^2\\}^2$",
    mathExpression: "\\{[(2^2)^2]^2\\}^2",
    topicId: "rule-power-of-power",
    topicName: "เลขยกกำลังซ้อนกัน",
    gradeLevel: "ม.2",
    difficulty: "medium",
    options: [
      { id: "A", text: "2^{16}" },
      { id: "B", text: "2^8" },
      { id: "C", text: "2^{32}" },
      { id: "D", text: "2^{10}" }
    ],
    correctAnswer: "A",
    hint: "นำเลขชี้กำลัง 2 ทั้งสี่ตัวมาคูณต่อเนื่องกัน: $2 \\times 2 \\times 2 \\times 2 = 16$",
    stepByStep: [
      "นับการซ้อนกำลัง: มีการยกกำลัง 2 ซ้อนกัน 4 ชั้น",
      "คำนวณผลคูณเลขชี้กำลัง: $2 \\times 2 \\times 2 \\times 2 = 16$",
      "ได้ผลลัพธ์เป็น $2^{16} = 65,536$"
    ],
    ruleUsed: "(a^m)^n = a^{mn}",
    xpReward: 35
  },
  {
    id: "q_pow_7",
    question: "ข้อใดมีค่าไม่เท่ากับ $(2^3)^4$",
    mathExpression: "(2^3)^4",
    topicId: "rule-power-of-power",
    topicName: "เลขยกกำลังซ้อนกัน",
    gradeLevel: "ม.2",
    difficulty: "medium",
    options: [
      { id: "A", text: "2^7" },
      { id: "B", text: "2^{12}" },
      { id: "C", text: "(2^4)^3" },
      { id: "D", text: "(2^2)^6" }
    ],
    correctAnswer: "A",
    hint: "$(2^3)^4 = 2^{3 \\times 4} = 2^{12}$ ไม่เท่ากับ $2^7$ ซึ่งเกิดจากการนำเลขชี้กำลังมาบวกกันผิด",
    stepByStep: [
      "คำนวณ $(2^3)^4 = 2^{3 \\times 4} = 2^{12}$",
      "ตัวเลือก B: $2^{12}$ (เท่ากัน)",
      "ตัวเลือก C: $(2^4)^3 = 2^{12}$ (เท่ากัน)",
      "ตัวเลือก D: $(2^2)^6 = 2^{12}$ (เท่ากัน)",
      "ตัวเลือก A: $2^7 \\neq 2^{12}$ ดังนั้น A มีค่าไม่เท่ากับโจทย์"
    ],
    commonMistake: "ระวังอย่าสับสนระหว่าง $(a^m)^n = a^{mn}$ กับ $a^m \\times a^n = a^{m+n}$",
    ruleUsed: "(a^m)^n = a^{mn}",
    xpReward: 30
  },
  {
    id: "q_pow_8",
    question: "จงหาค่าของ $[(-1)^3]^7$",
    mathExpression: "[(-1)^3]^7",
    topicId: "rule-power-of-power",
    topicName: "เลขยกกำลังซ้อนกัน",
    gradeLevel: "ม.2",
    difficulty: "easy",
    options: [
      { id: "A", text: "-1" },
      { id: "B", text: "1" },
      { id: "C", text: "0" },
      { id: "D", text: "21" }
    ],
    correctAnswer: "A",
    hint: "เลขชี้กำลังรวมคือ $3 \\times 7 = 21$ ซึ่งเป็นจำนวนคี่",
    stepByStep: [
      "ใช้สมบัติกำลังซ้อน: $(-1)^{3 \\times 7} = (-1)^{21}$",
      "เนื่องจาก 21 เป็นจำนวนคี่",
      "$-1$ ยกกำลังจำนวนคี่จะได้ $-1$"
    ],
    ruleUsed: "(a^m)^n = a^{mn}",
    xpReward: 20
  },
  {
    id: "q_pow_9",
    question: "ถ้า $2^{2^3}$ และ $(2^2)^3$ มีค่าเท่ากับ $A$ และ $B$ ตามลำดับ จงหาค่าของ $A \\div B$",
    mathExpression: "2^{2^3} \\div (2^2)^3",
    topicId: "rule-power-of-power",
    topicName: "เลขยกกำลังซ้อนกัน",
    gradeLevel: "ม.2",
    difficulty: "hard",
    options: [
      { id: "A", text: "4" },
      { id: "B", text: "1" },
      { id: "C", text: "2" },
      { id: "D", text: "8" }
    ],
    correctAnswer: "A",
    hint: "$2^{2^3} = 2^8 = 256$ ส่วน $(2^2)^3 = 2^6 = 64$",
    stepByStep: [
      "แบบไม่มีวงเล็บ (Tower Power): $2^{2^3} = 2^{(2^3)} = 2^8 = 256$",
      "แบบมีวงเล็บ: $(2^2)^3 = 2^{2 \\times 3} = 2^6 = 64$",
      "คำนวณ $A \\div B = \\frac{2^8}{2^6} = 2^{8-6} = 2^2 = 4$"
    ],
    commonMistake: "อย่าลืมว่า $a^{b^c}$ ต้องทำจากบนลงล่าง $b^c$ ก่อน ไม่เหมือน $(a^b)^c$",
    ruleUsed: "(a^m)^n = a^{mn}",
    xpReward: 40
  },
  {
    id: "q_pow_10",
    question: "จงทำให้เป็นรูปอย่างง่าย: $\\frac{(m^3 n^2)^4}{(m^2 n)^5}$",
    mathExpression: "\\frac{(m^3 n^2)^4}{(m^2 n)^5}",
    topicId: "rule-power-of-power",
    topicName: "เลขยกกำลังซ้อนกัน",
    gradeLevel: "ม.2",
    difficulty: "medium",
    options: [
      { id: "A", text: "m^2 n^3" },
      { id: "B", text: "m^7 n^3" },
      { id: "C", text: "m^2 n^{-3}" },
      { id: "D", text: "\\frac{m^2}{n^3}" }
    ],
    correctAnswer: "A",
    hint: "ตัวเศษ: $m^{12} n^8$, ตัวส่วน: $m^{10} n^5$, นำเลขชี้กำลังมาลบกัน",
    stepByStep: [
      "กระจายกำลังซ้อนตัวเศษ: $m^{3 \\times 4} n^{2 \\times 4} = m^{12} n^8$",
      "กระจายกำลังซ้อนตัวส่วน: $m^{2 \\times 5} n^{1 \\times 5} = m^{10} n^5$",
      "หารกัน: $m^{12-10} n^{8-5} = m^2 n^3$"
    ],
    ruleUsed: "(a^m)^n = a^{mn}, \\quad (ab)^n = a^n b^n",
    xpReward: 35
  },
  {
    id: "q_pow_11",
    question: "ถ้า $(x^{-2})^k = x^8$ แล้วค่าของ $k$ คือข้อใด เมื่อ $x \\neq 0, 1, -1$",
    mathExpression: "(x^{-2})^k = x^8",
    topicId: "rule-power-of-power",
    topicName: "เลขยกกำลังซ้อนกัน",
    gradeLevel: "ม.2",
    difficulty: "medium",
    options: [
      { id: "A", text: "-4" },
      { id: "B", text: "4" },
      { id: "C", text: "-16" },
      { id: "D", text: "10" }
    ],
    correctAnswer: "A",
    hint: "คูณเลขชี้กำลัง: $-2k = 8 \\implies k = \\frac{8}{-2} = -4$",
    stepByStep: [
      "ใช้สมบัติกำลังซ้อน: $x^{-2k} = x^8$",
      "เทียบเลขชี้กำลัง: $-2k = 8$",
      "แก้สมการ: $k = -4$"
    ],
    ruleUsed: "(a^m)^n = a^{mn}",
    xpReward: 30
  },
  {
    id: "q_pow_12",
    question: "จงหาค่าของ $\\left[(0.5)^2\\right]^3$ ในรูปทศนิยม",
    mathExpression: "\\left[(0.5)^2\\right]^3",
    topicId: "rule-power-of-power",
    topicName: "เลขยกกำลังซ้อนกัน",
    gradeLevel: "ม.2",
    difficulty: "medium",
    options: [
      { id: "A", text: "$0.015625$ (หรือ $\\frac{1}{64}$)" },
      { id: "B", text: "0.125" },
      { id: "C", text: "0.0625" },
      { id: "D", text: "0.000032" }
    ],
    correctAnswer: "A",
    hint: "เลขชี้กำลังคือ $2 \\times 3 = 6$ จะได้ $(0.5)^6 = \\left(\\frac{1}{2}\\right)^6 = \\frac{1}{64}$",
    stepByStep: [
      "คูณเลขชี้กำลัง: $(0.5)^{2 \\times 3} = (0.5)^6$",
      "เขียนในรูปเศษส่วน: $\\left(\\frac{1}{2}\\right)^6 = \\frac{1}{64}$",
      "แปลงเป็นทศนิยม: $1 \\div 64 = 0.015625$"
    ],
    ruleUsed: "(a^m)^n = a^{mn}",
    xpReward: 35
  },
  {
    id: "q_pow_13",
    question: "ถ้า $2^x = 3$ แล้วค่าของ $2^{3x}$ เท่ากับเท่าใด",
    mathExpression: "2^{3x}",
    topicId: "rule-power-of-power",
    topicName: "เลขยกกำลังซ้อนกัน",
    gradeLevel: "ม.2",
    difficulty: "hard",
    options: [
      { id: "A", text: "27" },
      { id: "B", text: "9" },
      { id: "C", text: "8" },
      { id: "D", text: "6" }
    ],
    correctAnswer: "A",
    hint: "จัดรูป $2^{3x} = (2^x)^3 = (3)^3 = 27$",
    stepByStep: [
      "ใช้สมบัติเลขยกกำลังซ้อนย้อนกลับ: $2^{3x} = (2^x)^3$",
      "แทนค่า $2^x = 3$ ลงไป",
      "ได้ $(3)^3 = 3 \\times 3 \\times 3 = 27$"
    ],
    ruleUsed: "(a^m)^n = a^{mn}",
    xpReward: 40
  },
  {
    id: "q_pow_14",
    question: "จงหาค่าของ $\\frac{[(a^2)^3]^4}{a^{20}}$ เมื่อ $a \\neq 0$",
    mathExpression: "\\frac{[(a^2)^3]^4}{a^{20}}",
    topicId: "rule-power-of-power",
    topicName: "เลขยกกำลังซ้อนกัน",
    gradeLevel: "ม.2",
    difficulty: "medium",
    options: [
      { id: "A", text: "a^4" },
      { id: "B", text: "a^9" },
      { id: "C", text: "a^{24}" },
      { id: "D", text: "a^2" }
    ],
    correctAnswer: "A",
    hint: "ตัวเศษ: $2 \\times 3 \\times 4 = 24$, หารด้วย $a^{20}$ นำ $24 - 20 = 4$",
    stepByStep: [
      "คูณกำลังซ้อนทั้งหมดที่ตัวเศษ: $a^{2 \\times 3 \\times 4} = a^{24}$",
      "นำไปหารด้วย $a^{20}$: $\\frac{a^{24}}{a^{20}} = a^{24 - 20} = a^4$"
    ],
    ruleUsed: "(a^m)^n = a^{mn}",
    xpReward: 30
  },
  {
    id: "q_pow_15",
    question: "ถ้า $4^{x+1} = 64$ แล้วค่าของ $(2^x)^3$ มีค่าเท่ากับเท่าใด",
    mathExpression: "(2^x)^3",
    topicId: "rule-power-of-power",
    topicName: "เลขยกกำลังซ้อนกัน",
    gradeLevel: "ม.2",
    difficulty: "exam",
    options: [
      { id: "A", text: "64" },
      { id: "B", text: "16" },
      { id: "C", text: "32" },
      { id: "D", text: "8" }
    ],
    correctAnswer: "A",
    hint: "$4^{x+1} = 4^3 \\implies x+1=3 \\implies x=2$ แล้วหา $(2^2)^3 = 2^6 = 64$",
    stepByStep: [
      "แปลง $64 = 4^3$",
      "เทียบเลขชี้กำลัง: $x + 1 = 3 \\implies x = 2$",
      "หาค่า $(2^x)^3 = (2^2)^3 = 2^{2 \\times 3} = 2^6 = 64$"
    ],
    ruleUsed: "(a^m)^n = a^{mn}",
    xpReward: 45
  }
];
