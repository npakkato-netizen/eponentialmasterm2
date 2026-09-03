import { Question } from "../../types";

export const RULE_4_QUESTIONS: Question[] = [
  {
    id: "q_pop_1",
    question: "จงกระจายและหาค่าของ $(2xy^2)^3$",
    mathExpression: "(2xy^2)^3",
    topicId: "rule-power-of-product",
    topicName: "เลขยกกำลังของผลคูณ",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "8x^3y^6" },
      { id: "B", text: "2x^3y^6" },
      { id: "C", text: "6x^3y^5" },
      { id: "D", text: "8x^3y^5" }
    ],
    correctAnswer: "A",
    hint: "กระจายเลขชี้กำลัง 3 ให้กับ $2, x$ และ $y^2$ ทุกตัว ($2^3 = 8$)",
    stepByStep: [
      "กระจายเลขชี้กำลัง 3 เข้าไปในวงเล็บ: $2^3 \\times x^3 \\times (y^2)^3$",
      "คำนวณ $2^3 = 8$",
      "คำนวณ $(y^2)^3 = y^{2 \\times 3} = y^6$",
      "รวมผลลัพธ์เป็น $8x^3y^6$"
    ],
    commonMistake: "อย่าลืมยกกำลังตัวเลขสัมประสิทธิ์ข้างหน้า ($2^3 = 8$ ไม่ใช่ 2)",
    ruleUsed: "(ab)^n = a^n b^n",
    xpReward: 30
  },
  {
    id: "q_pop_2",
    question: "จงหาค่าของ $(-3a^2b)^4$",
    mathExpression: "(-3a^2b)^4",
    topicId: "rule-power-of-product",
    topicName: "เลขยกกำลังของผลคูณ",
    gradeLevel: "ม.2",
    difficulty: "medium",
    options: [
      { id: "A", text: "81a^8b^4" },
      { id: "B", text: "-81a^8b^4" },
      { id: "C", text: "12a^8b^4" },
      { id: "D", text: "-12a^6b^4" }
    ],
    correctAnswer: "A",
    hint: "$(-3)^4$ เป็นเลขชี้กำลังคู่ ผลลัพธ์ได้ค่าบวกเสมอ ($+81$)",
    stepByStep: [
      "กระจายเลขชี้กำลัง 4: $(-3)^4 \\times (a^2)^4 \\times b^4$",
      "คำนวณ $(-3)^4 = 81$",
      "คำนวณ $(a^2)^4 = a^{2 \\times 4} = a^8$",
      "ได้คำตอบเป็น $81a^8b^4$"
    ],
    ruleUsed: "(ab)^n = a^n b^n",
    xpReward: 35
  },
  {
    id: "q_pop_3",
    question: "จงหาค่าของ $(5 \\times 10^3)^2$",
    mathExpression: "(5 \\times 10^3)^2",
    topicId: "rule-power-of-product",
    topicName: "เลขยกกำลังของผลคูณ",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "$2.5 \\times 10^7$ (หรือ $25 \\times 10^6$)" },
      { id: "B", text: "10 \\times 10^6" },
      { id: "C", text: "25 \\times 10^5" },
      { id: "D", text: "5 \\times 10^6" }
    ],
    correctAnswer: "A",
    hint: "กระจายกำลัง 2: $5^2 \\times (10^3)^2 = 25 \\times 10^6$",
    stepByStep: [
      "กระจายเลขชี้กำลัง 2: $5^2 \\times (10^3)^2$",
      "คำนวณ $5^2 = 25$",
      "คำนวณ $(10^3)^2 = 10^6$",
      "ได้ $25 \\times 10^6 = 2.5 \\times 10^7$"
    ],
    ruleUsed: "(ab)^n = a^n b^n",
    xpReward: 25
  },
  {
    id: "q_pop_4",
    question: "จงทำให้เป็นรูปอย่างง่าย: $(2a^{-2} b^3)^{-2}$ เมื่อ $a, b \\neq 0$",
    mathExpression: "(2a^{-2} b^3)^{-2}",
    topicId: "rule-power-of-product",
    topicName: "เลขยกกำลังของผลคูณ",
    gradeLevel: "ม.2",
    difficulty: "hard",
    options: [
      { id: "A", text: "\\frac{a^4}{4b^6}" },
      { id: "B", text: "\\frac{4a^4}{b^6}" },
      { id: "C", text: "\\frac{a^4}{2b^6}" },
      { id: "D", text: "4a^4 b^6" }
    ],
    correctAnswer: "A",
    hint: "กระจายกำลัง $-2$: $2^{-2} \\times a^{(-2)(-2)} \\times b^{(3)(-2)} = \\frac{1}{4} a^4 b^{-6}$",
    stepByStep: [
      "กระจายเลขชี้กำลัง $-2$: $2^{-2} \\times a^{(-2) \\times (-2)} \\times b^{3 \\times (-2)}$",
      "คำนวณ $2^{-2} = \\frac{1}{2^2} = \\frac{1}{4}$",
      "คำนวณ $a^4$ และ $b^{-6} = \\frac{1}{b^6}$",
      "รวมเป็น $\\frac{a^4}{4b^6}$"
    ],
    ruleUsed: "(ab)^n = a^n b^n, \\quad a^{-n} = \\frac{1}{a^n} \\quad (a \\neq 0)",
    xpReward: 40
  },
  {
    id: "q_pop_5",
    question: "ข้อใดมีค่าเท่ากับ $12^4$",
    mathExpression: "12^4",
    topicId: "rule-power-of-product",
    topicName: "เลขยกกำลังของผลคูณ",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "2^8 \\times 3^4" },
      { id: "B", text: "2^4 \\times 3^4" },
      { id: "C", text: "2^6 \\times 3^4" },
      { id: "D", text: "6^4 \\times 6^4" }
    ],
    correctAnswer: "A",
    hint: "แยกตัวประกอบ $12 = 2^2 \\times 3$ แล้วยกกำลัง 4: $(2^2 \\times 3)^4 = 2^8 \\times 3^4$",
    stepByStep: [
      "แยกตัวประกอบเฉพาะของ 12: $12 = 4 \\times 3 = 2^2 \\times 3$",
      "เขียนในรูปเลขยกกำลัง: $(2^2 \\times 3)^4$",
      "กระจายกำลัง 4: $(2^2)^4 \\times 3^4 = 2^8 \\times 3^4$"
    ],
    ruleUsed: "(ab)^n = a^n b^n",
    xpReward: 35
  },
  {
    id: "q_pop_6",
    question: "จงหาค่าของ $(-2xy)^5$",
    mathExpression: "(-2xy)^5",
    topicId: "rule-power-of-product",
    topicName: "เลขยกกำลังของผลคูณ",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "-32x^5y^5" },
      { id: "B", text: "32x^5y^5" },
      { id: "C", text: "-10x^5y^5" },
      { id: "D", text: "-32xy^5" }
    ],
    correctAnswer: "A",
    hint: "$(-2)^5 = -32$ และกระจาย 5 ให้ทั้ง $x$ และ $y$",
    stepByStep: [
      "กระจายเลขชี้กำลัง 5 ไปยังทุกตัวในวงเล็บ",
      "$(-2)^5 \\times x^5 \\times y^5$",
      "คำนวณ $(-2)^5 = -32$",
      "ได้ผลลัพธ์เป็น $-32x^5y^5$"
    ],
    ruleUsed: "(ab)^n = a^n b^n",
    xpReward: 25
  },
  {
    id: "q_pop_7",
    question: "ข้อใดคือข้อผิดพลาดที่พบบ่อยในการกระจายเลขชี้กำลังของการบวก",
    mathExpression: "(a+b)^2 \\neq a^2 + b^2",
    topicId: "rule-power-of-product",
    topicName: "เลขยกกำลังของผลคูณ",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "(a+b)^2 = a^2 + 2ab + b^2 \\neq a^2 + b^2" },
      { id: "B", text: "(a+b)^2 = a^2 b^2" },
      { id: "C", text: "(ab)^2 \\neq a^2 b^2" },
      { id: "D", text: "(a+b)^2 = 2a + 2b" }
    ],
    correctAnswer: "A",
    hint: "เลขชี้กำลังกระจายได้เฉพาะผลคูณและผลหารเท่านั้น $(a+b)^2 = a^2 + 2ab + b^2 \\neq a^2 + b^2$",
    stepByStep: [
      "สมบัติ $(ab)^n = a^n b^n$ ใช้ได้เฉพาะการคูณ",
      "สำหรับการบวก $(a+b)^2 = (a+b)(a+b) = a^2 + 2ab + b^2$",
      "ดังนั้น $(a+b)^2 \\neq a^2 + b^2$ ห้ามกระจายเลขชี้กำลังข้ามเครื่องหมายบวกหรือลบ"
    ],
    commonMistake: "ห้ามกระจายเลขชี้กำลังเมื่อเป็นการบวกหรือลบ เช่น $(a+b)^2 \\neq a^2 + b^2$",
    ruleUsed: "(ab)^n = a^n b^n",
    xpReward: 20
  },
  {
    id: "q_pop_8",
    question: "จงหาค่าของ $(3 \\times 4)^3$",
    mathExpression: "(3 \\times 4)^3",
    topicId: "rule-power-of-product",
    topicName: "เลขยกกำลังของผลคูณ",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "1,728" },
      { id: "B", text: "144" },
      { id: "C", text: "864" },
      { id: "D", text: "216" }
    ],
    correctAnswer: "A",
    hint: "$12^3 = 1,728$ หรือ $3^3 \\times 4^3 = 27 \\times 64 = 1,728$",
    stepByStep: [
      "วิธีที่ 1: $12^3 = 12 \\times 12 \\times 12 = 1,728$",
      "วิธีที่ 2: ใช้สมบัติ $3^3 \\times 4^3 = 27 \\times 64 = 1,728$",
      "ทั้งสองวิธีได้ผลลัพธ์ตรงกันคือ 1,728"
    ],
    ruleUsed: "(ab)^n = a^n b^n",
    xpReward: 20
  },
  {
    id: "q_pop_9",
    question: "จงทำให้เป็นรูปอย่างง่าย: $\\frac{(4x^3 y)^2}{8x^4 y^2}$",
    mathExpression: "\\frac{(4x^3 y)^2}{8x^4 y^2}",
    topicId: "rule-power-of-product",
    topicName: "เลขยกกำลังของผลคูณ",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "2x^2" },
      { id: "B", text: "2x" },
      { id: "C", text: "x^2" },
      { id: "D", text: "\\frac{x^2}{2}" }
    ],
    correctAnswer: "A",
    hint: "ตัวเศษ: $4^2 (x^3)^2 y^2 = 16 x^6 y^2$, หารด้วย $8x^4 y^2$",
    stepByStep: [
      "กระจายตัวเศษ: $16 x^6 y^2$",
      "หารสัมประสิทธิ์: $16 \\div 8 = 2$",
      "หารตัวแปร: $x^{6-4} = x^2$ และ $y^{2-2} = y^0 = 1$",
      "ได้คำตอบเป็น $2x^2$"
    ],
    ruleUsed: "(ab)^n = a^n b^n",
    xpReward: 30
  },
  {
    id: "q_pop_10",
    question: "จงหาค่าของ $(2^3 \\times 5^3)$",
    mathExpression: "2^3 \\times 5^3",
    topicId: "rule-power-of-product",
    topicName: "เลขยกกำลังของผลคูณ",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "1,000" },
      { id: "B", text: "100" },
      { id: "C", text: "10,000" },
      { id: "D", text: "10^6" }
    ],
    correctAnswer: "A",
    hint: "ใช้สมบัติย้อนกลับ: $a^n b^n = (ab)^n \\implies (2 \\times 5)^3 = 10^3 = 1,000$",
    stepByStep: [
      "เลขชี้กำลังเท่ากันคือ 3",
      "รวมฐาน: $(2 \\times 5)^3 = 10^3$",
      "$10^3 = 1,000$"
    ],
    ruleUsed: "a^n b^n = (ab)^n",
    xpReward: 20
  },
  {
    id: "q_pop_11",
    question: "จงหาค่าของ $(-a^3 b^{-2} c)^3$",
    mathExpression: "(-a^3 b^{-2} c)^3",
    topicId: "rule-power-of-product",
    topicName: "เลขยกกำลังของผลคูณ",
    gradeLevel: "ม.2",
    difficulty: "medium",
    options: [
      { id: "A", text: "-\\frac{a^9 c^3}{b^6}" },
      { id: "B", text: "\\frac{a^9 c^3}{b^6}" },
      { id: "C", text: "-a^9 b^6 c^3" },
      { id: "D", text: "-\\frac{a^6 c^3}{b^5}" }
    ],
    correctAnswer: "A",
    hint: "$(-1)^3 = -1$, $a^{3 \\times 3} = a^9$, $b^{-2 \\times 3} = b^{-6} = \\frac{1}{b^6}$, $c^3$",
    stepByStep: [
      "กระจายกำลัง 3: $(-1)^3 \\times a^{3 \\times 3} \\times b^{-2 \\times 3} \\times c^3$",
      "คำนวณ $(-1)^3 = -1$",
      "ได้ $-a^9 b^{-6} c^3 = -\\frac{a^9 c^3}{b^6}$"
    ],
    ruleUsed: "(ab)^n = a^n b^n",
    xpReward: 35
  },
  {
    id: "q_pop_12",
    question: "ถ้า $(3a)^x = 81a^4$ แล้วค่าของ $x$ คือข้อใด",
    mathExpression: "(3a)^x = 81a^4",
    topicId: "rule-power-of-product",
    topicName: "เลขยกกำลังของผลคูณ",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "4" },
      { id: "B", text: "3" },
      { id: "C", text: "27" },
      { id: "D", text: "81" }
    ],
    correctAnswer: "A",
    hint: "$(3a)^x = 3^x a^x$ เทียบกับ $81a^4 = 3^4 a^4 \\implies x = 4$",
    stepByStep: [
      "กระจายฝั่งซ้าย: $3^x a^x$",
      "แปลง $81 = 3^4$",
      "ฝั่งขวาคือ $3^4 a^4$",
      "เทียบเลขชี้กำลัง: $x = 4$"
    ],
    ruleUsed: "(ab)^n = a^n b^n",
    xpReward: 25
  },
  {
    id: "q_pop_13",
    question: "จงหาค่าของ $(2^4 \\times 5^3)$",
    mathExpression: "2^4 \\times 5^3",
    topicId: "rule-power-of-product",
    topicName: "เลขยกกำลังของผลคูณ",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "2,000" },
      { id: "B", text: "1,000" },
      { id: "C", text: "4,000" },
      { id: "D", text: "10,000" }
    ],
    correctAnswer: "A",
    hint: "แยก $2^4 = 2^1 \\times 2^3$ แล้วรวม $(2 \\times 5)^3 = 10^3 = 1,000 \\implies 2 \\times 1,000 = 2,000$",
    stepByStep: [
      "แยกตัวประกอบ: $2^4 \\times 5^3 = 2^1 \\times (2^3 \\times 5^3)$",
      "ใช้สมบัติผลคูณ: $2^3 \\times 5^3 = (2 \\times 5)^3 = 10^3 = 1,000$",
      "นำ 2 มาคูณ: $2 \\times 1,000 = 2,000$"
    ],
    ruleUsed: "(ab)^n = a^n b^n",
    xpReward: 30
  },
  {
    id: "q_pop_14",
    question: "จงทำให้เป็นรูปอย่างง่าย: $[(-2a^3)(3b^2)]^2$",
    mathExpression: "[(-2a^3)(3b^2)]^2",
    topicId: "rule-power-of-product",
    topicName: "เลขยกกำลังของผลคูณ",
    gradeLevel: "ม.2",
    difficulty: "medium",
    options: [
      { id: "A", text: "36a^6b^4" },
      { id: "B", text: "-36a^6b^4" },
      { id: "C", text: "18a^6b^4" },
      { id: "D", text: "36a^5b^4" }
    ],
    correctAnswer: "A",
    hint: "คูณข้างในวงเล็บก่อน: $-6a^3b^2$ แล้วยกกำลังสอง $(-6)^2 = 36$",
    stepByStep: [
      "คูณในวงเล็บ: $(-2 \\times 3) a^3 b^2 = -6a^3b^2$",
      "ยกกำลัง 2: $(-6a^3b^2)^2 = (-6)^2 (a^3)^2 (b^2)^2$",
      "ได้ $36 a^6 b^4$"
    ],
    ruleUsed: "(ab)^n = a^n b^n",
    xpReward: 35
  },
  {
    id: "q_pop_15",
    question: "ถ้า $A = 2^{2026} \\times 5^{2024}$ จงหาว่า $A$ มีทั้งหมดกี่หลัก (digits)",
    mathExpression: "2^{2026} \\times 5^{2024}",
    topicId: "rule-power-of-product",
    topicName: "เลขยกกำลังของผลคูณ",
    gradeLevel: "ม.2",
    difficulty: "exam",
    options: [
      { id: "A", text: "2,025 หลัก" },
      { id: "B", text: "2,024 หลัก" },
      { id: "C", text: "2,026 หลัก" },
      { id: "D", text: "4,050 หลัก" }
    ],
    correctAnswer: "A",
    hint: "จัดรูป $2^2 \\times (2^{2024} \\times 5^{2024}) = 4 \\times 10^{2024}$ มีเลข 4 ตามด้วยศูนย์ 2,024 ตัว รวมเป็น 2,025 หลัก",
    stepByStep: [
      "แยก $2^{2026} = 2^2 \\times 2^{2024} = 4 \\times 2^{2024}$",
      "รวมฐาน 2 และ 5: $2^{2024} \\times 5^{2024} = (2 \\times 5)^{2024} = 10^{2024}$",
      "ดังนั้น $A = 4 \\times 10^{2024}$",
      "$4 \\times 10^{2024}$ คือเลข 4 แล้วตามด้วยเลข 0 จำนวน 2,024 ตัว",
      "จำนวนหลักทั้งหมดคือ $1 + 2,024 = 2,025$ หลัก"
    ],
    ruleUsed: "a^n b^n = (ab)^n",
    xpReward: 50
  }
];
