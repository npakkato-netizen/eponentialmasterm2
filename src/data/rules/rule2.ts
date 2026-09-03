import { Question } from "../../types";

export const RULE_2_QUESTIONS: Question[] = [
  {
    id: "q_quot_1",
    question: "จงหาผลลัพธ์ของ $7^8 \\div 7^3$ ในรูปเลขยกกำลัง",
    mathExpression: "7^8 \\div 7^3",
    topicId: "rule-quotient-same-base",
    topicName: "การหารเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "7^5" },
      { id: "B", text: "7^{11}" },
      { id: "C", text: "7^{24}" },
      { id: "D", text: "1^5" }
    ],
    correctAnswer: "A",
    hint: "การหารเลขยกกำลังฐานเดียวกัน ให้นำเลขชี้กำลังมาลบกัน: $8 - 3$",
    stepByStep: [
      "ตรวจสอบฐาน: ทั้งสองพจน์มีฐานคือ $7$ เท่ากัน (โดยที่ฐานไม่เท่ากับศูนย์)",
      "ใช้สมบัติการหาร: $7^8 \\div 7^3 = 7^{8-3}$",
      "คำนวณเลขชี้กำลัง $8 - 3 = 5$ จะได้คำตอบคือ $7^5$"
    ],
    ruleUsed: "\\frac{a^m}{a^n} = a^{m-n} \\quad (a \\neq 0)",
    xpReward: 20
  },
  {
    id: "q_quot_2",
    question: "จงหาผลลัพธ์ของ $\\frac{5^4 \\times 5^3}{5^6}$ ในรูปอย่างง่าย",
    mathExpression: "\\frac{5^4 \\times 5^3}{5^6}",
    topicId: "rule-quotient-same-base",
    topicName: "การหารเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "5" },
      { id: "B", text: "5^2" },
      { id: "C", text: "5^0" },
      { id: "D", text: "25" }
    ],
    correctAnswer: "A",
    hint: "รวมเลขชี้กำลังที่ตัวเศษก่อน ($4+3=7$) แล้วนำไปลบกับตัวส่วน ($7-6=1$)",
    stepByStep: [
      "คำนวณตัวเศษ: $5^4 \\times 5^3 = 5^{4+3} = 5^7$",
      "นำไปหารด้วยตัวส่วน: $\\frac{5^7}{5^6} = 5^{7-6} = 5^1$",
      "ได้ผลลัพธ์คือ $5^1 = 5$"
    ],
    ruleUsed: "\\frac{a^m}{a^n} = a^{m-n} \\quad (a \\neq 0)",
    xpReward: 30
  },
  {
    id: "q_quot_3",
    question: "จงหาค่าของ $2^5 \\div 2^{-3}$",
    mathExpression: "2^5 \\div 2^{-3}",
    topicId: "rule-quotient-same-base",
    topicName: "การหารเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "$2^8$ (หรือ $256$)" },
      { id: "B", text: "$2^2$ (หรือ $4$)" },
      { id: "C", text: "2^{-2}" },
      { id: "D", text: "2^{-15}" }
    ],
    correctAnswer: "A",
    hint: "ระวังการลบจำนวนติดลบ: $5 - (-3) = 5 + 3 = 8$",
    stepByStep: [
      "ใช้สมบัติการหาร: $2^5 \\div 2^{-3} = 2^{5 - (-3)}$",
      "คำนวณเลขชี้กำลัง: $5 - (-3) = 5 + 3 = 8$",
      "ได้ผลลัพธ์เป็น $2^8 = 256$"
    ],
    commonMistake: "หลายคนคิดว่า $5 - 3 = 2$ ซึ่งลืมว่าตัวหารมีเลขชี้กำลังติดลบอยู่ ต้องเป็น $5 - (-3) = 8$",
    ruleUsed: "\\frac{a^m}{a^n} = a^{m-n} \\quad (a \\neq 0)",
    xpReward: 35
  },
  {
    id: "q_quot_4",
    question: "จงหาผลลัพธ์ของ $\\frac{12 a^7 b^5}{3 a^3 b^2}$ เมื่อ $a, b \\neq 0$",
    mathExpression: "\\frac{12 a^7 b^5}{3 a^3 b^2} \\quad (a, b \\neq 0)",
    topicId: "rule-quotient-same-base",
    topicName: "การหารเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "4 a^4 b^3" },
      { id: "B", text: "4 a^{10} b^7" },
      { id: "C", text: "9 a^4 b^3" },
      { id: "D", text: "4 a^4 b^{2.5}" }
    ],
    correctAnswer: "A",
    hint: "ตัดสัมประสิทธิ์ $\\frac{12}{3} = 4$, ตัวแปร $a^{7-3} = a^4$, ตัวแปร $b^{5-2} = b^3$ เมื่อ $a, b \\neq 0$",
    stepByStep: [
      "ตัดทอนสัมประสิทธิ์ตัวเลข: $\\frac{12}{3} = 4$",
      "หารฐาน $a$: $\\frac{a^7}{a^3} = a^{7-3} = a^4$",
      "หารฐาน $b$: $\\frac{b^5}{b^2} = b^{5-2} = b^3$",
      "รวมผลลัพธ์ได้เป็น $4 a^4 b^3$ เมื่อ $a, b \\neq 0$"
    ],
    ruleUsed: "\\frac{a^m}{a^n} = a^{m-n} \\quad (a \\neq 0)",
    xpReward: 35
  },
  {
    id: "q_quot_5",
    question: "จงหาผลลัพธ์ของ $\\frac{(-3)^9}{(-3)^5}$",
    mathExpression: "\\frac{(-3)^9}{(-3)^5}",
    topicId: "rule-quotient-same-base",
    topicName: "การหารเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "$(-3)^4$ (หรือ $81$)" },
      { id: "B", text: "-81" },
      { id: "C", text: "(-3)^{14}" },
      { id: "D", text: "-3^4" }
    ],
    correctAnswer: "A",
    hint: "นำเลขชี้กำลัง $9 - 5 = 4$ ซึ่งเป็นเลขคู่ ดังนั้น $(-3)^4 = +81$",
    stepByStep: [
      "ฐานคือ $(-3)$ เท่ากัน (โดยที่ฐานไม่เท่ากับศูนย์)",
      "ใช้สมบัติการหาร: $\\frac{(-3)^9}{(-3)^5} = (-3)^{9 - 5} = (-3)^4$",
      "เนื่องจากฐานติดลบยกกำลังคู่ ค่าที่ได้จะเป็นบวก: $(-3)^4 = 81$"
    ],
    ruleUsed: "\\frac{a^m}{a^n} = a^{m-n} \\quad (a \\neq 0)",
    xpReward: 25
  },
  {
    id: "q_quot_6",
    question: "ถ้า $\\frac{10^n}{10^4} = 100,000$ แล้ว $n$ มีค่าเท่าใด",
    mathExpression: "\\frac{10^n}{10^4} = 100,000",
    topicId: "rule-quotient-same-base",
    topicName: "การหารเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "9" },
      { id: "B", text: "5" },
      { id: "C", text: "1" },
      { id: "D", text: "20" }
    ],
    correctAnswer: "A",
    hint: "แปลง $100,000 = 10^5$ แล้วแก้สมการ $\\frac{10^n}{10^4} = 10^5 \\implies 10^{n-4} = 10^5$",
    stepByStep: [
      "เขียน $100,000$ ในรูปเลขยกกำลังฐาน $10$: $10^5$",
      "ฝั่งซ้ายใช้สมบัติการหาร: $\\frac{10^n}{10^4} = 10^{n-4}$",
      "เทียบเลขชี้กำลัง: $n - 4 = 5$",
      "แก้สมการ: $n = 5 + 4 = 9$"
    ],
    ruleUsed: "\\frac{a^m}{a^n} = a^{m-n} \\quad (a \\neq 0)",
    xpReward: 35
  },
  {
    id: "q_quot_7",
    question: "จงทำให้เป็นรูปอย่างง่าย: $\\frac{x^3 y^{-2}}{x^{-1} y^4}$ เมื่อ $x, y \\neq 0$",
    mathExpression: "\\frac{x^3 y^{-2}}{x^{-1} y^4} \\quad (x, y \\neq 0)",
    topicId: "rule-quotient-same-base",
    topicName: "การหารเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.2",
    difficulty: "hard",
    options: [
      { id: "A", text: "\\frac{x^4}{y^6}" },
      { id: "B", text: "\\frac{x^2}{y^2}" },
      { id: "C", text: "x^4 y^2" },
      { id: "D", text: "\\frac{1}{x^4 y^6}" }
    ],
    correctAnswer: "A",
    hint: "ฐาน $x$: $3 - (-1) = 4$, ฐาน $y$: $-2 - 4 = -6$ ซึ่ง $y^{-6} = \\frac{1}{y^6}$ เมื่อ $x, y \\neq 0$",
    stepByStep: [
      "คำนวณฐาน $x$: $x^{3 - (-1)} = x^{3+1} = x^4$",
      "คำนวณฐาน $y$: $y^{-2 - 4} = y^{-6} = \\frac{1}{y^6}$",
      "รวมผลลัพธ์เป็น $\\frac{x^4}{y^6}$ เมื่อ $x, y \\neq 0$"
    ],
    ruleUsed: "\\frac{a^m}{a^n} = a^{m-n} \\quad (a \\neq 0)",
    xpReward: 40
  },
  {
    id: "q_quot_8",
    question: "จงหาค่าของ $\\frac{6^7}{6^7}$",
    mathExpression: "\\frac{6^7}{6^7}",
    topicId: "rule-quotient-same-base",
    topicName: "การหารเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "1" },
      { id: "B", text: "0" },
      { id: "C", text: "6" },
      { id: "D", text: "6^{14}" }
    ],
    correctAnswer: "A",
    hint: "ลบเลขชี้กำลัง $7 - 7 = 0$ และ $6^0 = 1$ ตามสมบัติ $a^0 = 1 \\quad (a \\neq 0)$",
    stepByStep: [
      "ใช้สมบัติการหาร: $\\frac{6^7}{6^7} = 6^{7 - 7} = 6^0$",
      "จำนวนจริงใดๆ ยกกำลังศูนย์มีค่าเท่ากับ $1$: $6^0 = 1$",
      "ดังนั้น $\\frac{6^7}{6^7} = 1$"
    ],
    ruleUsed: "\\frac{a^m}{a^n} = a^{m-n} \\quad (a \\neq 0)",
    xpReward: 20
  },
  {
    id: "q_quot_9",
    question: "จงหาผลลัพธ์ของ $\\frac{8^5}{2^6}$ ในรูปเลขยกกำลังฐาน $2$",
    mathExpression: "\\frac{8^5}{2^6}",
    topicId: "rule-quotient-same-base",
    topicName: "การหารเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "2^9" },
      { id: "B", text: "2^{-1}" },
      { id: "C", text: "4^{-1}" },
      { id: "D", text: "2^{11}" }
    ],
    correctAnswer: "A",
    hint: "แปลง $8 = 2^3$ จะได้ $8^5 = (2^3)^5 = 2^{15}$ แล้วหารด้วย $2^6$",
    stepByStep: [
      "แปลงฐาน $8$ เป็นฐาน $2$: $8^5 = (2^3)^5 = 2^{15}$",
      "นำมาหารด้วย $2^6$: $\\frac{2^{15}}{2^6} = 2^{15-6}$",
      "คำนวณเลขชี้กำลัง $15 - 6 = 9$ ได้คำตอบคือ $2^9$"
    ],
    ruleUsed: "\\frac{a^m}{a^n} = a^{m-n} \\quad (a \\neq 0)",
    xpReward: 35
  },
  {
    id: "q_quot_10",
    question: "จงหาค่าของ $\\frac{(-4)^7}{4^5}$",
    mathExpression: "\\frac{(-4)^7}{4^5}",
    topicId: "rule-quotient-same-base",
    topicName: "การหารเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "-16" },
      { id: "B", text: "16" },
      { id: "C", text: "-4^{12}" },
      { id: "D", text: "4^2" }
    ],
    correctAnswer: "A",
    hint: "$(-4)^7 = -(4^7)$ เพราะเลขชี้กำลังเป็นเลขคี่",
    stepByStep: [
      "ตัวเศษเป็นลบยกกำลังคี่: $(-4)^7 = -(4^7)$",
      "นำมาหาร: $\\frac{-(4^7)}{4^5} = -(4^{7-5}) = -(4^2)$",
      "คำนวณ $-(4^2) = -(16) = -16$"
    ],
    ruleUsed: "\\frac{a^m}{a^n} = a^{m-n} \\quad (a \\neq 0)",
    xpReward: 30
  },
  {
    id: "q_quot_11",
    question: "จงทำให้เป็นรูปอย่างง่าย: $\\frac{15 x^5 y^4 z^2}{25 x^2 y^4 z^5}$ เมื่อ $x, y, z \\neq 0$",
    mathExpression: "\\frac{15 x^5 y^4 z^2}{25 x^2 y^4 z^5} \\quad (x, y, z \\neq 0)",
    topicId: "rule-quotient-same-base",
    topicName: "การหารเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.2",
    difficulty: "medium",
    options: [
      { id: "A", text: "\\frac{3x^3}{5z^3}" },
      { id: "B", text: "\\frac{3x^3 y}{5z^3}" },
      { id: "C", text: "\\frac{3x^7}{5z^7}" },
      { id: "D", text: "\\frac{5x^3}{3z^3}" }
    ],
    correctAnswer: "A",
    hint: "ตัดสัมประสิทธิ์ $\\frac{15}{25} = \\frac{3}{5}$, $y^{4-4} = y^0 = 1$, $z^{2-5} = z^{-3} = \\frac{1}{z^3}$ เมื่อ $x, y, z \\neq 0$",
    stepByStep: [
      "ตัดทอนสัมประสิทธิ์ตัวเลข: $\\frac{15}{25} = \\frac{3}{5}$",
      "ฐาน $x$: $\\frac{x^5}{x^2} = x^{5-2} = x^3$",
      "ฐาน $y$: $\\frac{y^4}{y^4} = y^{4-4} = y^0 = 1$",
      "ฐาน $z$: $\\frac{z^2}{z^5} = z^{2-5} = z^{-3} = \\frac{1}{z^3}$",
      "รวมคำตอบได้ $\\frac{3x^3}{5z^3}$ เมื่อ $x, y, z \\neq 0$"
    ],
    ruleUsed: "\\frac{a^m}{a^n} = a^{m-n} \\quad (a \\neq 0)",
    xpReward: 35
  },
  {
    id: "q_quot_12",
    question: "ถ้า $\\frac{3^{2x+1}}{3^{x-2}} = 3^8$ แล้ว $x$ มีค่าเท่ากับเท่าใด",
    mathExpression: "\\frac{3^{2x+1}}{3^{x-2}} = 3^8",
    topicId: "rule-quotient-same-base",
    topicName: "การหารเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.2",
    difficulty: "hard",
    options: [
      { id: "A", text: "5" },
      { id: "B", text: "7" },
      { id: "C", text: "9" },
      { id: "D", text: "3" }
    ],
    correctAnswer: "A",
    hint: "ลบเลขชี้กำลัง: $(2x+1) - (x-2) = x + 3 = 8$",
    stepByStep: [
      "ใช้สมบัติการหาร: $\\frac{3^{2x+1}}{3^{x-2}} = 3^{(2x+1) - (x-2)} = 3^8$",
      "กระจายเครื่องหมายลบ: $(2x + 1) - (x - 2) = 2x + 1 - x + 2 = x + 3$",
      "เทียบเลขชี้กำลัง: $x + 3 = 8 \\implies x = 8 - 3 = 5$"
    ],
    ruleUsed: "\\frac{a^m}{a^n} = a^{m-n} \\quad (a \\neq 0)",
    xpReward: 40
  },
  {
    id: "q_quot_13",
    question: "จงหาค่าของ $\\frac{2^{n+3} - 2^{n+1}}{2^n}$",
    mathExpression: "\\frac{2^{n+3} - 2^{n+1}}{2^n}",
    topicId: "rule-quotient-same-base",
    topicName: "การหารเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.2",
    difficulty: "exam",
    options: [
      { id: "A", text: "6" },
      { id: "B", text: "4" },
      { id: "C", text: "2" },
      { id: "D", text: "8" }
    ],
    correctAnswer: "A",
    hint: "ดึงตัวร่วม $2^n$ ที่ตัวเศษ: $2^n(2^3 - 2^1) = 2^n(8 - 2) = 6 \\times 2^n$",
    stepByStep: [
      "แยกพจน์: $2^{n+3} = 2^n \\times 2^3 = 8 \\cdot 2^n$ และ $2^{n+1} = 2^n \\times 2^1 = 2 \\cdot 2^n$",
      "ดึงตัวร่วมตัวเศษ: $8(2^n) - 2(2^n) = (8 - 2)2^n = 6(2^n)$",
      "นำไปหารด้วยตัวส่วน: $\\frac{6(2^n)}{2^n} = 6$"
    ],
    ruleUsed: "\\frac{a^m}{a^n} = a^{m-n} \\quad (a \\neq 0)",
    xpReward: 45
  },
  {
    id: "q_quot_14",
    question: "จงหาผลลัพธ์ของ $\\frac{(0.2)^8 \\times (0.2)^{-3}}{(0.2)^2}$",
    mathExpression: "\\frac{(0.2)^8 \\times (0.2)^{-3}}{(0.2)^2}",
    topicId: "rule-quotient-same-base",
    topicName: "การหารเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "0.008" },
      { id: "B", text: "0.08" },
      { id: "C", text: "0.0016" },
      { id: "D", text: "0.8" }
    ],
    correctAnswer: "A",
    hint: "คำนวณเลขชี้กำลัง $8 + (-3) - 2 = 3$ จะได้ $(0.2)^3 = 0.008$",
    stepByStep: [
      "รวมเลขชี้กำลังทั้งหมดตามกฎการคูณและการหาร: $(0.2)^{8 + (-3) - 2}$",
      "คำนวณเลขชี้กำลัง: $8 - 3 - 2 = 3$",
      "ได้ผลลัพธ์: $(0.2)^3 = 0.2 \\times 0.2 \\times 0.2 = 0.008$"
    ],
    ruleUsed: "\\frac{a^m}{a^n} = a^{m-n} \\quad (a \\neq 0)",
    xpReward: 35
  },
  {
    id: "q_quot_15",
    question: "ถ้า $a \\neq 0$ และ $m, n$ เป็นจำนวนเต็ม ข้อใดถูกต้องเสมอ",
    mathExpression: "\\frac{a^m}{a^n} \\quad (a \\neq 0)",
    topicId: "rule-quotient-same-base",
    topicName: "การหารเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "\\frac{a^m}{a^n} = a^{m-n}" },
      { id: "B", text: "\\frac{a^m}{a^n} = a^{\\frac{m}{n}}" },
      { id: "C", text: "\\frac{a^m}{a^n} = a^{m+n}" },
      { id: "D", text: "\\frac{a^m}{a^n} = (a-a)^{m-n}" }
    ],
    correctAnswer: "A",
    hint: "สมบัติการหารเลขยกกำลังที่มีฐานเท่ากันและฐานไม่เท่ากับศูนย์ คือ $\\frac{a^m}{a^n} = a^{m-n} \\quad (a \\neq 0)$",
    stepByStep: [
      "ตามนิยามและสมบัติของเลขยกกำลัง เมื่อ $a \\neq 0$",
      "การหารเลขยกกำลังฐานเดียวกันให้นำเลขชี้กำลังของตัวตั้งลบด้วยเลขชี้กำลังของตัวหาร",
      "นั่นคือ $\\frac{a^m}{a^n} = a^{m-n} \\quad (a \\neq 0)$"
    ],
    ruleUsed: "\\frac{a^m}{a^n} = a^{m-n} \\quad (a \\neq 0)",
    xpReward: 20
  }
];
