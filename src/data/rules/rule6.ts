import { Question } from "../../types";

export const RULE_6_QUESTIONS: Question[] = [
  {
    id: "q_zneg_1",
    question: "จงหาค่าของ $5^0 + (-3)^0 - 2^0$",
    mathExpression: "5^0 + (-3)^0 - 2^0",
    topicId: "rule-zero-negative-power",
    topicName: "เลขชี้กำลังเป็นศูนย์และลบ",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "1" },
      { id: "B", text: "0" },
      { id: "C", text: "3" },
      { id: "D", text: "4" }
    ],
    correctAnswer: "A",
    hint: "จำนวนใดๆ ที่ไม่เท่ากับศูนย์เมื่อยกกำลัง 0 มีค่าเท่ากับ 1 เสมอ: $1 + 1 - 1 = 1$",
    stepByStep: [
      "คำนวณ $5^0 = 1$",
      "คำนวณ $(-3)^0 = 1$",
      "คำนวณ $2^0 = 1$",
      "นำมาคำนวณ: $1 + 1 - 1 = 1$"
    ],
    commonMistake: "ระวังอย่าสับสนกับ $-3^0 = -(3^0) = -1$ แต่นี่คือ $(-3)^0 = 1$",
    ruleUsed: "a^0 = 1 \\quad (a \\neq 0)",
    xpReward: 20
  },
  {
    id: "q_zneg_2",
    question: "จงหาค่าของ $-7^0$",
    mathExpression: "-7^0",
    topicId: "rule-zero-negative-power",
    topicName: "เลขชี้กำลังเป็นศูนย์และลบ",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "-1" },
      { id: "B", text: "1" },
      { id: "C", text: "0" },
      { id: "D", text: "-7" }
    ],
    correctAnswer: "A",
    hint: "ไม่มีวงเล็บ หมายถึง $-(7^0) = -(1) = -1$",
    stepByStep: [
      "เครื่องหมายลบอยู่นอกฐาน: $-(7^0)$",
      "คำนวณ $7^0 = 1$",
      "ใส่เครื่องหมายลบข้างหน้าได้ $-1$"
    ],
    commonMistake: "อย่าลืมว่า $(-7)^0 = 1$ แต่ $-7^0 = -1$ เครื่องหมายอยู่นอกวงเล็บ",
    ruleUsed: "a^0 = 1 \\quad (a \\neq 0)",
    xpReward: 25
  },
  {
    id: "q_zneg_3",
    question: "จงเขียน $2^{-4}$ ในรูปเศษส่วน",
    mathExpression: "2^{-4}",
    topicId: "rule-zero-negative-power",
    topicName: "เลขชี้กำลังเป็นศูนย์และลบ",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "\\frac{1}{16}" },
      { id: "B", text: "-16" },
      { id: "C", text: "-\\frac{1}{16}" },
      { id: "D", text: "\\frac{1}{8}" }
    ],
    correctAnswer: "A",
    hint: "ใช้สมบัติ $a^{-n} = \\frac{1}{a^n}$ ดังนั้น $2^{-4} = \\frac{1}{2^4} = \\frac{1}{16}$",
    stepByStep: [
      "ใช้สมบัติเลขชี้กำลังลบ: $2^{-4} = \\frac{1}{2^4}$",
      "คำนวณ $2^4 = 2 \\times 2 \\times 2 \\times 2 = 16$",
      "ได้ผลลัพธ์เป็น $\\frac{1}{16}$"
    ],
    commonMistake: "เลขชี้กำลังติดลบไม่ได้ทำให้ค่ากลายเป็นจำนวนลบ แต่ทำให้เป็นส่วนกลับ (เศษส่วน)",
    ruleUsed: "a^{-n} = \\frac{1}{a^n} \\quad (a \\neq 0)",
    xpReward: 20
  },
  {
    id: "q_zneg_4",
    question: "จงหาค่าของ $\\frac{1}{3^{-3}}$",
    mathExpression: "\\frac{1}{3^{-3}}",
    topicId: "rule-zero-negative-power",
    topicName: "เลขชี้กำลังเป็นศูนย์และลบ",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "27" },
      { id: "B", text: "\\frac{1}{27}" },
      { id: "C", text: "-27" },
      { id: "D", text: "9" }
    ],
    correctAnswer: "A",
    hint: "ย้ายจากตัวส่วนขึ้นมาตัวเศษ: $\\frac{1}{a^{-n}} = a^n \\implies 3^3 = 27$",
    stepByStep: [
      "ใช้สมบัติ $\\frac{1}{a^{-n}} = a^n$",
      "ได้ $\\frac{1}{3^{-3}} = 3^3$",
      "คำนวณ $3^3 = 3 \\times 3 \\times 3 = 27$"
    ],
    ruleUsed: "\\frac{1}{a^{-n}} = a^n \\quad (a \\neq 0)",
    xpReward: 25
  },
  {
    id: "q_zneg_5",
    question: "จงหาค่าของ $2^{-1} + 2^{-2} + 2^{-3}$ ในรูปเศษส่วน",
    mathExpression: "2^{-1} + 2^{-2} + 2^{-3}",
    topicId: "rule-zero-negative-power",
    topicName: "เลขชี้กำลังเป็นศูนย์และลบ",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "\\frac{7}{8}" },
      { id: "B", text: "\\frac{3}{8}" },
      { id: "C", text: "\\frac{7}{16}" },
      { id: "D", text: "\\frac{1}{8}" }
    ],
    correctAnswer: "A",
    hint: "แปลงเป็นเศษส่วน $\\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} = \\frac{4+2+1}{8} = \\frac{7}{8}$",
    stepByStep: [
      "แปลงแต่ละพจน์: $2^{-1} = \\frac{1}{2}$, $2^{-2} = \\frac{1}{4}$, $2^{-3} = \\frac{1}{8}$",
      "ทำตัวส่วนให้เท่ากัน (ค.ร.น. คือ 8): $\\frac{4}{8} + \\frac{2}{8} + \\frac{1}{8}$",
      "รวมผลบวกได้ $\\frac{7}{8}$"
    ],
    ruleUsed: "a^{-n} = \\frac{1}{a^n} \\quad (a \\neq 0)",
    xpReward: 30
  },
  {
    id: "q_zneg_6",
    question: "จงทำให้เป็นรูปอย่างง่ายโดยเลขชี้กำลังเป็นบวก: $\\frac{x^{-3} y^4}{x^2 y^{-1}}$ เมื่อ $x, y \\neq 0$",
    mathExpression: "\\frac{x^{-3} y^4}{x^2 y^{-1}}",
    topicId: "rule-zero-negative-power",
    topicName: "เลขชี้กำลังเป็นศูนย์และลบ",
    gradeLevel: "ม.2",
    difficulty: "medium",
    options: [
      { id: "A", text: "\\frac{y^5}{x^5}" },
      { id: "B", text: "\\frac{y^3}{x^5}" },
      { id: "C", text: "x^5 y^5" },
      { id: "D", text: "\\frac{1}{x^5 y^5}" }
    ],
    correctAnswer: "A",
    hint: "ฐาน $x$: $-3 - 2 = -5 = \\frac{1}{x^5}$, ฐาน $y$: $4 - (-1) = 5 = y^5$",
    stepByStep: [
      "คำนวณฐาน $x$: $x^{-3 - 2} = x^{-5} = \\frac{1}{x^5}$",
      "คำนวณฐาน $y$: $y^{4 - (-1)} = y^{4+1} = y^5$",
      "รวมผลลัพธ์เป็น $\\frac{y^5}{x^5}$"
    ],
    ruleUsed: "a^{-n} = \\frac{1}{a^n} \\quad (a \\neq 0)",
    xpReward: 35
  },
  {
    id: "q_zneg_7",
    question: "ข้อใดมีค่ามากที่สุด",
    mathExpression: "(-2)^0, \\; 2^{-1}, \\; (-2)^{-2}, \\; 2^0",
    topicId: "rule-zero-negative-power",
    topicName: "เลขชี้กำลังเป็นศูนย์และลบ",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "$(-2)^0$ และ $2^0$ (มีค่าเท่ากันคือ $1$)" },
      { id: "B", text: "2^{-1}" },
      { id: "C", text: "(-2)^{-2}" },
      { id: "D", text: "มีค่าเท่ากันทั้งหมด" }
    ],
    correctAnswer: "A",
    hint: "$(-2)^0 = 1$, $2^0 = 1$, $2^{-1} = 0.5$, $(-2)^{-2} = \\frac{1}{(-2)^2} = 0.25$",
    stepByStep: [
      "คำนวณแต่ละค่า:",
      "$(-2)^0 = 1$",
      "$2^0 = 1$",
      "$2^{-1} = \\frac{1}{2} = 0.5$",
      "$(-2)^{-2} = \\frac{1}{(-2)^2} = \\frac{1}{4} = 0.25$",
      "ค่าที่มากที่สุดคือ $1$ (จาก $(-2)^0$ และ $2^0$)"
    ],
    ruleUsed: "a^0 = 1 \\quad (a \\neq 0), \\quad a^{-n} = \\frac{1}{a^n} \\quad (a \\neq 0)",
    xpReward: 30
  },
  {
    id: "q_zneg_8",
    question: "จงหาค่าของ $\\left(\\frac{1}{5}\\right)^{-3}$",
    mathExpression: "\\left(\\frac{1}{5}\\right)^{-3}",
    topicId: "rule-zero-negative-power",
    topicName: "เลขชี้กำลังเป็นศูนย์และลบ",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "125" },
      { id: "B", text: "\\frac{1}{125}" },
      { id: "C", text: "-125" },
      { id: "D", text: "15" }
    ],
    correctAnswer: "A",
    hint: "กลับเศษเป็นส่วน: $\\left(\\frac{1}{5}\\right)^{-3} = 5^3 = 125$",
    stepByStep: [
      "ใช้สมบัติส่วนกลับ: $\\left(\\frac{1}{5}\\right)^{-3} = 5^3$",
      "คำนวณ $5^3 = 5 \\times 5 \\times 5 = 125$"
    ],
    ruleUsed: "\\left(\\frac{1}{a}\\right)^{-n} = a^n \\quad (a \\neq 0)",
    xpReward: 20
  },
  {
    id: "q_zneg_9",
    question: "ถ้า $3^{-x} = \\frac{1}{81}$ แล้ว $x$ มีค่าเท่ากับเท่าใด",
    mathExpression: "3^{-x} = \\frac{1}{81}",
    topicId: "rule-zero-negative-power",
    topicName: "เลขชี้กำลังเป็นศูนย์และลบ",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "4" },
      { id: "B", text: "-4" },
      { id: "C", text: "27" },
      { id: "D", text: "3" }
    ],
    correctAnswer: "A",
    hint: "$\\frac{1}{81} = \\frac{1}{3^4} = 3^{-4} \\implies -x = -4 \\implies x = 4$",
    stepByStep: [
      "แปลง $\\frac{1}{81} = \\frac{1}{3^4} = 3^{-4}$",
      "เทียบสมการ: $3^{-x} = 3^{-4}$",
      "ได้ $-x = -4 \\implies x = 4$"
    ],
    ruleUsed: "a^{-n} = \\frac{1}{a^n} \\quad (a \\neq 0)",
    xpReward: 25
  },
  {
    id: "q_zneg_10",
    question: "จงหาค่าของ $\\frac{2^{-3} + 3^{-2}}{6^{-1}}$ ในรูปเศษส่วน",
    mathExpression: "\\frac{2^{-3} + 3^{-2}}{6^{-1}}",
    topicId: "rule-zero-negative-power",
    topicName: "เลขชี้กำลังเป็นศูนย์และลบ",
    gradeLevel: "ม.2",
    difficulty: "hard",
    options: [
      { id: "A", text: "\\frac{17}{12}" },
      { id: "B", text: "\\frac{17}{72}" },
      { id: "C", text: "\\frac{5}{6}" },
      { id: "D", text: "\\frac{12}{17}" }
    ],
    correctAnswer: "A",
    hint: "ตัวเศษ: $\\frac{1}{8} + \\frac{1}{9} = \\frac{17}{72}$, ตัวส่วน: $\\frac{1}{6}$, นำมาหารกัน $\\frac{17}{72} \\times 6 = \\frac{17}{12}$",
    stepByStep: [
      "คำนวณตัวเศษ: $2^{-3} + 3^{-2} = \\frac{1}{8} + \\frac{1}{9} = \\frac{9+8}{72} = \\frac{17}{72}$",
      "ตัวส่วน: $6^{-1} = \\frac{1}{6}$",
      "คำนวณ $\\frac{17}{72} \\div \\frac{1}{6} = \\frac{17}{72} \\times 6 = \\frac{17}{12}$"
    ],
    ruleUsed: "a^{-n} = \\frac{1}{a^n} \\quad (a \\neq 0)",
    xpReward: 40
  },
  {
    id: "q_zneg_11",
    question: "จงหาค่าของ $(-1)^{-99}$",
    mathExpression: "(-1)^{-99}",
    topicId: "rule-zero-negative-power",
    topicName: "เลขชี้กำลังเป็นศูนย์และลบ",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "-1" },
      { id: "B", text: "1" },
      { id: "C", text: "-\\frac{1}{99}" },
      { id: "D", text: "0" }
    ],
    correctAnswer: "A",
    hint: "$\\frac{1}{(-1)^{99}} = \\frac{1}{-1} = -1$",
    stepByStep: [
      "เปลี่ยนเป็นเศษส่วน: $\\frac{1}{(-1)^{99}}$",
      "เนื่องจาก 99 เป็นจำนวนคี่ $(-1)^{99} = -1$",
      "ได้ $\\frac{1}{-1} = -1$"
    ],
    ruleUsed: "a^{-n} = \\frac{1}{a^n} \\quad (a \\neq 0)",
    xpReward: 20
  },
  {
    id: "q_zneg_12",
    question: "ข้อใดมีค่าเท่ากับ $\\left(\\frac{x^{-1} + y^{-1}}{x^{-1} y^{-1}}\\right)$ เมื่อ $x, y \\neq 0$",
    mathExpression: "\\frac{x^{-1} + y^{-1}}{x^{-1} y^{-1}}",
    topicId: "rule-zero-negative-power",
    topicName: "เลขชี้กำลังเป็นศูนย์และลบ",
    gradeLevel: "ม.2",
    difficulty: "hard",
    options: [
      { id: "A", text: "x + y" },
      { id: "B", text: "\\frac{1}{x+y}" },
      { id: "C", text: "xy" },
      { id: "D", text: "\\frac{x+y}{xy}" }
    ],
    correctAnswer: "A",
    hint: "ตัวเศษ: $\\frac{1}{x} + \\frac{1}{y} = \\frac{y+x}{xy}$, ตัวส่วน: $\\frac{1}{xy}$, ตัดกันได้ $x+y$",
    stepByStep: [
      "ตัวเศษ: $x^{-1} + y^{-1} = \\frac{1}{x} + \\frac{1}{y} = \\frac{x+y}{xy}$",
      "ตัวส่วน: $x^{-1} y^{-1} = \\frac{1}{xy}$",
      "หารกัน: $\\frac{\\frac{x+y}{xy}}{\\frac{1}{xy}} = x + y$"
    ],
    ruleUsed: "a^{-n} = \\frac{1}{a^n} \\quad (a \\neq 0)",
    xpReward: 40
  },
  {
    id: "q_zneg_13",
    question: "จงหาค่าของ $(10^{-2})^3 \\times (10^4)^2$",
    mathExpression: "(10^{-2})^3 \\times (10^4)^2",
    topicId: "rule-zero-negative-power",
    topicName: "เลขชี้กำลังเป็นศูนย์และลบ",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "$100$ (หรือ $10^2$)" },
      { id: "B", text: "10^1" },
      { id: "C", text: "10^{-2}" },
      { id: "D", text: "1,000" }
    ],
    correctAnswer: "A",
    hint: "$10^{-6} \\times 10^8 = 10^{-6+8} = 10^2 = 100$",
    stepByStep: [
      "พจน์แรก: $(10^{-2})^3 = 10^{-6}$",
      "พจน์ที่สอง: $(10^4)^2 = 10^8$",
      "คูณกัน: $10^{-6 + 8} = 10^2 = 100$"
    ],
    ruleUsed: "a^m \\times a^n = a^{m+n}, \\quad a^{-n} = \\frac{1}{a^n} \\quad (a \\neq 0)",
    xpReward: 30
  },
  {
    id: "q_zneg_14",
    question: "จงหาผลลัพธ์ของ $(a^0 + b^0 + c^0)^{-1}$ เมื่อ $a, b, c \\neq 0$",
    mathExpression: "(a^0 + b^0 + c^0)^{-1} \\quad (a, b, c \\neq 0)",
    topicId: "rule-zero-negative-power",
    topicName: "เลขชี้กำลังเป็นศูนย์และลบ",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "\\frac{1}{3}" },
      { id: "B", text: "3" },
      { id: "C", text: "1" },
      { id: "D", text: "0" }
    ],
    correctAnswer: "A",
    hint: "$a^0 = 1, b^0 = 1, c^0 = 1 \\implies (1+1+1)^{-1} = 3^{-1} = \\frac{1}{3}$",
    stepByStep: [
      "คำนวณในวงเล็บ: $a^0 = 1$, $b^0 = 1$, $c^0 = 1$",
      "รวมในวงเล็บ: $1 + 1 + 1 = 3$",
      "ยกกำลัง $-1$: $3^{-1} = \\frac{1}{3}$"
    ],
    ruleUsed: "a^0 = 1, \\quad a^{-n} = \\frac{1}{a^n} \\quad (a \\neq 0)",
    xpReward: 25
  },
  {
    id: "q_zneg_15",
    question: "ถ้า $2^{x-3} = 1$ แล้วค่าของ $x^2 + 1$ เท่ากับเท่าใด",
    mathExpression: "2^{x-3} = 1",
    topicId: "rule-zero-negative-power",
    topicName: "เลขชี้กำลังเป็นศูนย์และลบ",
    gradeLevel: "ม.2",
    difficulty: "medium",
    options: [
      { id: "A", text: "10" },
      { id: "B", text: "9" },
      { id: "C", text: "4" },
      { id: "D", text: "5" }
    ],
    correctAnswer: "A",
    hint: "$1 = 2^0 \\implies x - 3 = 0 \\implies x = 3$ แล้วหา $3^2 + 1 = 10$",
    stepByStep: [
      "เขียน 1 ในรูปเลขยกกำลังฐาน 2: $1 = 2^0$",
      "เทียบสมการ: $2^{x-3} = 2^0$",
      "เทียบเลขชี้กำลัง: $x - 3 = 0 \\implies x = 3$",
      "หาค่า $x^2 + 1 = 3^2 + 1 = 9 + 1 = 10$"
    ],
    ruleUsed: "a^0 = 1 \\quad (a \\neq 0)",
    xpReward: 35
  }
];
