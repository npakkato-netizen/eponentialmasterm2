import { Question } from "../../types";

export const RULE_1_QUESTIONS: Question[] = [
  {
    id: "q_prod_1",
    question: "จงหาผลลัพธ์ของ $3^4 \\times 3^5$ ในรูปเลขยกกำลัง",
    mathExpression: "3^4 \\times 3^5",
    topicId: "rule-product-same-base",
    topicName: "การคูณเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "3^9" },
      { id: "B", text: "3^{20}" },
      { id: "C", text: "9^9" },
      { id: "D", text: "9^{20}" }
    ],
    correctAnswer: "A",
    hint: "ใช้สมบัติ $a^m \\times a^n = a^{m+n}$ นำเลขชี้กำลังมาบวกกันโดยคงฐานเดิมไว้",
    stepByStep: [
      "ตรวจสอบฐาน: ทั้งสองพจน์มีฐานเท่ากันคือ 3",
      "ใช้สมบัติการคูณเลขยกกำลัง: $3^4 \\times 3^5 = 3^{4+5}$",
      "คำนวณผลบวกของเลขชี้กำลัง: $4 + 5 = 9$",
      "ได้ผลลัพธ์ในรูปเลขยกกำลังคือ $3^9$"
    ],
    commonMistake: "ระวังอย่านำฐานมาคูณกันเป็น 9 หรือนำเลขชี้กำลังมาคูณกันเป็น 20",
    ruleUsed: "a^m \\times a^n = a^{m+n}",
    xpReward: 20
  },
  {
    id: "q_prod_2",
    question: "จงหาผลลัพธ์ของ $(-2)^3 \\times (-2)^4$",
    mathExpression: "(-2)^3 \\times (-2)^4",
    topicId: "rule-product-same-base",
    topicName: "การคูณเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "$(-2)^7$ (หรือ $-128$)" },
      { id: "B", text: "$2^7$ (หรือ $128$)" },
      { id: "C", text: "(-2)^{12}" },
      { id: "D", text: "-2^{12}" }
    ],
    correctAnswer: "A",
    hint: "ฐานคือ $(-2)$ ยกกำลังด้วย $(3+4) = 7$ ซึ่งเป็นจำนวนคี่",
    stepByStep: [
      "ทั้งสองพจน์มีฐานคือ $(-2)$ เหมือนกัน",
      "นำเลขชี้กำลังมาบวกกัน: $3 + 4 = 7$",
      "ได้ $(-2)^7 = -128$"
    ],
    commonMistake: "ระวังเครื่องหมายลบในวงเล็บ จำนวนลบยกกำลังด้วยจำนวนคี่ ผลลัพธ์จะได้ค่าลบ",
    ruleUsed: "a^m \\times a^n = a^{m+n}",
    xpReward: 25
  },
  {
    id: "q_prod_3",
    question: "จงหาผลลัพธ์ของ $a^5 \\times a^{-2} \\times a^3$ เมื่อ $a \\neq 0$",
    mathExpression: "a^5 \\times a^{-2} \\times a^3",
    topicId: "rule-product-same-base",
    topicName: "การคูณเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "a^6" },
      { id: "B", text: "a^{10}" },
      { id: "C", text: "a^{-30}" },
      { id: "D", text: "a^4" }
    ],
    correctAnswer: "A",
    hint: "นำเลขชี้กำลังทั้งหมดมาบวกกัน: $5 + (-2) + 3$",
    stepByStep: [
      "ใช้สมบัติการคูณฐานเดียวกัน: $a^{5 + (-2) + 3}$",
      "คำนวณเลขชี้กำลัง: $5 - 2 + 3 = 6$",
      "ได้ผลลัพธ์เป็น $a^6$"
    ],
    ruleUsed: "a^m \\times a^n = a^{m+n}",
    xpReward: 30
  },
  {
    id: "q_prod_4",
    question: "จงหาผลลัพธ์ของ $2^3 \\times 4^2 \\times 8$ ในรูปเลขยกกำลังฐาน 2",
    mathExpression: "2^3 \\times 4^2 \\times 8",
    topicId: "rule-product-same-base",
    topicName: "การคูณเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "2^{10}" },
      { id: "B", text: "2^8" },
      { id: "C", text: "2^{12}" },
      { id: "D", text: "64^3" }
    ],
    correctAnswer: "A",
    hint: "แปลง $4 = 2^2$ และ $8 = 2^3$ ก่อน จากนั้นนำเลขชี้กำลังมารวมกัน",
    stepByStep: [
      "แปลงฐานทุกจำนวนให้เป็นฐาน 2: $4^2 = (2^2)^2 = 2^4$ และ $8 = 2^3$",
      "เขียนพจน์ใหม่: $2^3 \\times 2^4 \\times 2^3$",
      "นำเลขชี้กำลังมาบวกกัน: $3 + 4 + 3 = 10$",
      "ได้ผลลัพธ์เป็น $2^{10}$"
    ],
    ruleUsed: "a^m \\times a^n = a^{m+n}",
    xpReward: 35
  },
  {
    id: "q_prod_5",
    question: "จงหาผลลัพธ์ของ $(x^2 y^3)(x^4 y^2)$ ในรูปอย่างง่าย",
    mathExpression: "(x^2 y^3)(x^4 y^2)",
    topicId: "rule-product-same-base",
    topicName: "การคูณเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "x^6 y^5" },
      { id: "B", text: "x^8 y^6" },
      { id: "C", text: "(xy)^{11}" },
      { id: "D", text: "x^6 y^6" }
    ],
    correctAnswer: "A",
    hint: "จัดกลุ่มตัวแปรฐานเดียวกัน: รวม $x$ กับ $x$ ($2+4$) และรวม $y$ กับ $y$ ($3+2$)",
    stepByStep: [
      "จัดกลุ่มฐาน $x$: $x^2 \\times x^4 = x^{2+4} = x^6$",
      "จัดกลุ่มฐาน $y$: $y^3 \\times y^2 = y^{3+2} = y^5$",
      "นำมารวมกันได้ $x^6 y^5$"
    ],
    ruleUsed: "a^m \\times a^n = a^{m+n}",
    xpReward: 30
  },
  {
    id: "q_prod_6",
    question: "จงหาผลคูณของ $(-1)^8 \\times (-1)^{15} \\times (-1)^4$",
    mathExpression: "(-1)^8 \\times (-1)^{15} \\times (-1)^4",
    topicId: "rule-product-same-base",
    topicName: "การคูณเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "-1" },
      { id: "B", text: "1" },
      { id: "C", text: "(-1)^{27} = 1" },
      { id: "D", text: "0" }
    ],
    correctAnswer: "A",
    hint: "รวมเลขชี้กำลัง: $8 + 15 + 4 = 27$ เมื่อ $-1$ ยกกำลังจำนวนคี่ จะได้ $-1$",
    stepByStep: [
      "ฐานคือ $(-1)$ เหมือนกันทุกพจน์",
      "รวมเลขชี้กำลัง: $8 + 15 + 4 = 27$",
      "ได้ $(-1)^{27}$ เนื่องจาก 27 เป็นจำนวนคี่",
      "ดังนั้น $(-1)^{27} = -1$"
    ],
    ruleUsed: "a^m \\times a^n = a^{m+n}",
    xpReward: 25
  },
  {
    id: "q_prod_7",
    question: "ถ้า $5^x \\times 5^3 = 5^9$ แล้วค่าของ $x$ เท่ากับเท่าใด",
    mathExpression: "5^x \\times 5^3 = 5^9",
    topicId: "rule-product-same-base",
    topicName: "การคูณเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "6" },
      { id: "B", text: "3" },
      { id: "C", text: "12" },
      { id: "D", text: "27" }
    ],
    correctAnswer: "A",
    hint: "รวมเลขชี้กำลังฝั่งซ้าย $5^{x+3} = 5^9$ แล้วจับเลขชี้กำลังเท่ากัน $x+3=9$",
    stepByStep: [
      "ฝั่งซ้ายรวมเลขชี้กำลัง: $5^{x+3}$",
      "เนื่องจากฐานเท่ากัน ($5 = 5$) จึงจับเลขชี้กำลังเท่ากัน: $x + 3 = 9$",
      "แก้สมการ: $x = 9 - 3 = 6$"
    ],
    ruleUsed: "a^m \\times a^n = a^{m+n}",
    xpReward: 35
  },
  {
    id: "q_prod_8",
    question: "จงหาผลลัพธ์ของ $b^7 \\times b^{-7}$ เมื่อ $b \\neq 0$",
    mathExpression: "b^7 \\times b^{-7}",
    topicId: "rule-product-same-base",
    topicName: "การคูณเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "1" },
      { id: "B", text: "0" },
      { id: "C", text: "b^{14}" },
      { id: "D", text: "b^{-49}" }
    ],
    correctAnswer: "A",
    hint: "นำเลขชี้กำลังมาบวกกัน $7 + (-7) = 0$ และ $b^0 = 1$",
    stepByStep: [
      "นำเลขชี้กำลังมารวมกัน: $b^{7 + (-7)} = b^0$",
      "จำนวนใดๆ ยกเว้นศูนย์ เมื่อยกกำลัง 0 ย่อมได้ค่าเท่ากับ 1",
      "ดังนั้นคำตอบคือ 1"
    ],
    ruleUsed: "a^m \\times a^n = a^{m+n}",
    xpReward: 20
  },
  {
    id: "q_prod_9",
    question: "จงหาผลคูณของ $(0.1)^2 \\times (0.1)^3$ ในรูปทศนิยม",
    mathExpression: "(0.1)^2 \\times (0.1)^3",
    topicId: "rule-product-same-base",
    topicName: "การคูณเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "0.00001" },
      { id: "B", text: "0.0001" },
      { id: "C", text: "0.000001" },
      { id: "D", text: "0.001" }
    ],
    correctAnswer: "A",
    hint: "รวมเลขชี้กำลังได้ $(0.1)^5$ ซึ่งหมายถึงทศนิยม 5 ตำแหน่ง",
    stepByStep: [
      "รวมเลขชี้กำลัง: $(0.1)^{2+3} = (0.1)^5$",
      "$(0.1)^5 = 10^{-5} = 0.00001$",
      "ได้ผลลัพธ์เป็นทศนิยม 5 ตำแหน่ง คือ 0.00001"
    ],
    ruleUsed: "a^m \\times a^n = a^{m+n}",
    xpReward: 30
  },
  {
    id: "q_prod_10",
    question: "จงหาค่าของ $3^n \\times 3^{2n} \\times 3^{3n}$",
    mathExpression: "3^n \\times 3^{2n} \\times 3^{3n}",
    topicId: "rule-product-same-base",
    topicName: "การคูณเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.2",
    difficulty: "medium",
    options: [
      { id: "A", text: "3^{6n}" },
      { id: "B", text: "3^{6n^3}" },
      { id: "C", text: "27^{6n}" },
      { id: "D", text: "3^{5n}" }
    ],
    correctAnswer: "A",
    hint: "นำสัมประสิทธิ์หน้า $n$ มารวมกัน: $n + 2n + 3n = 6n$",
    stepByStep: [
      "ฐานคือ 3 เท่ากันทั้งหมด",
      "รวมเลขชี้กำลัง: $n + 2n + 3n = 6n$",
      "ได้ผลลัพธ์คือ $3^{6n}$"
    ],
    ruleUsed: "a^m \\times a^n = a^{m+n}",
    xpReward: 35
  },
  {
    id: "q_prod_11",
    question: "จงหาผลคูณของ $\\left(\\frac{2}{3}\\right)^3 \\times \\left(\\frac{2}{3}\\right)^2$",
    mathExpression: "\\left(\\frac{2}{3}\\right)^3 \\times \\left(\\frac{2}{3}\\right)^2",
    topicId: "rule-product-same-base",
    topicName: "การคูณเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "\\left(\\frac{2}{3}\\right)^5" },
      { id: "B", text: "\\left(\\frac{2}{3}\\right)^6" },
      { id: "C", text: "\\left(\\frac{4}{9}\\right)^5" },
      { id: "D", text: "\\left(\\frac{2}{3}\\right)^1" }
    ],
    correctAnswer: "A",
    hint: "ฐานเศษส่วน $\\frac{2}{3}$ เท่ากัน นำเลขชี้กำลังบวกกัน $3 + 2 = 5$",
    stepByStep: [
      "ฐานคือ $\\frac{2}{3}$ เหมือนกัน",
      "นำเลขชี้กำลังมาบวกกัน: $3 + 2 = 5$",
      "ได้คำตอบคือ $\\left(\\frac{2}{3}\\right)^5 = \\frac{32}{243}$"
    ],
    ruleUsed: "a^m \\times a^n = a^{m+n}",
    xpReward: 25
  },
  {
    id: "q_prod_12",
    question: "ถ้า $2^{2x-1} \\times 2^{x+4} = 2^{12}$ แล้วค่าของ $x$ คือข้อใด",
    mathExpression: "2^{2x-1} \\times 2^{x+4} = 2^{12}",
    topicId: "rule-product-same-base",
    topicName: "การคูณเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.2",
    difficulty: "hard",
    options: [
      { id: "A", text: "3" },
      { id: "B", text: "4" },
      { id: "C", text: "5" },
      { id: "D", text: "2" }
    ],
    correctAnswer: "A",
    hint: "รวมเลขชี้กำลัง $(2x-1) + (x+4) = 3x + 3 = 12$",
    stepByStep: [
      "รวมเลขชี้กำลังฝั่งซ้าย: $2^{(2x-1) + (x+4)} = 2^{3x+3}$",
      "เทียบเลขชี้กำลัง: $3x + 3 = 12$",
      "แก้สมการ: $3x = 9 \\implies x = 3$"
    ],
    ruleUsed: "a^m \\times a^n = a^{m+n}",
    xpReward: 40
  },
  {
    id: "q_prod_13",
    question: "จงหาผลลัพธ์ของ $(-5)^2 \\times (-5)^3 \\times 5^4$",
    mathExpression: "(-5)^2 \\times (-5)^3 \\times 5^4",
    topicId: "rule-product-same-base",
    topicName: "การคูณเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.2",
    difficulty: "hard",
    options: [
      { id: "A", text: "-5^9" },
      { id: "B", text: "5^9" },
      { id: "C", text: "(-5)^{24}" },
      { id: "D", text: "-5^{24}" }
    ],
    correctAnswer: "A",
    hint: "แปลง $(-5)^2 = 5^2$ และ $(-5)^3 = -(5^3)$ แล้วดึงเครื่องหมายลบออกมา",
    stepByStep: [
      "$(-5)^2 = 5^2$ (กำลังคู่ได้บวก)",
      "$(-5)^3 = -(5^3)$ (กำลังคี่ได้ลบ)",
      "คูณทั้งหมด: $5^2 \\times -(5^3) \\times 5^4 = -(5^{2+3+4}) = -5^9$"
    ],
    ruleUsed: "a^m \\times a^n = a^{m+n}",
    xpReward: 40
  },
  {
    id: "q_prod_14",
    question: "จงหาค่าของ $x^{a-b} \\times x^{b-c} \\times x^{c-a}$ เมื่อ $x \\neq 0$",
    mathExpression: "x^{a-b} \\times x^{b-c} \\times x^{c-a}",
    topicId: "rule-product-same-base",
    topicName: "การคูณเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.2",
    difficulty: "hard",
    options: [
      { id: "A", text: "1" },
      { id: "B", text: "x" },
      { id: "C", text: "0" },
      { id: "D", text: "x^{2a+2b+2c}" }
    ],
    correctAnswer: "A",
    hint: "นำเลขชี้กำลังบวกกัน: $(a-b) + (b-c) + (c-a) = 0$",
    stepByStep: [
      "รวมเลขชี้กำลังทั้งหมด: $x^{(a-b) + (b-c) + (c-a)}$",
      "คำนวณ: $a - b + b - c + c - a = 0$",
      "ได้ $x^0 = 1$ (เนื่องจาก $x \\neq 0$)"
    ],
    ruleUsed: "a^m \\times a^n = a^{m+n}",
    xpReward: 40
  },
  {
    id: "q_prod_15",
    question: "ถ้า $3^a = x$ และ $3^b = y$ แล้วค่าของ $3^{a+b+1}$ เท่ากับข้อใด",
    mathExpression: "3^{a+b+1}",
    topicId: "rule-product-same-base",
    topicName: "การคูณเลขยกกำลังฐานเดียวกัน",
    gradeLevel: "ม.2",
    difficulty: "exam",
    options: [
      { id: "A", text: "3xy" },
      { id: "B", text: "xy + 3" },
      { id: "C", text: "3(x+y)" },
      { id: "D", text: "(xy)^3" }
    ],
    correctAnswer: "A",
    hint: "แยก $3^{a+b+1} = 3^a \\times 3^b \\times 3^1 = x \\times y \\times 3$",
    stepByStep: [
      "กระจายผลบวกของเลขชี้กำลังเป็นการคูณ: $3^{a+b+1} = 3^a \\times 3^b \\times 3^1$",
      "แทนค่า $3^a = x$ และ $3^b = y$ ลงไป",
      "ได้ $x \\times y \\times 3 = 3xy$"
    ],
    ruleUsed: "a^m \\times a^n = a^{m+n}",
    xpReward: 45
  }
];
