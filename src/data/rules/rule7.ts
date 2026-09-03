import { Question } from "../../types";

export const RULE_7_QUESTIONS: Question[] = [
  {
    id: "q_sci_1",
    question: "จงเขียนจำนวน $450,000,000$ ในรูปสัญกรณ์วิทยาศาสตร์",
    mathExpression: "450,000,000",
    topicId: "rule-scientific-notation",
    topicName: "สัญกรณ์วิทยาศาสตร์",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "4.5 \\times 10^8" },
      { id: "B", text: "45 \\times 10^7" },
      { id: "C", text: "4.5 \\times 10^7" },
      { id: "D", text: "0.45 \\times 10^9" }
    ],
    correctAnswer: "A",
    hint: "เลื่อนจุดทศนิยมไปทางซ้าย 8 ตำแหน่งให้อยู่ระหว่าง 4 และ 5 ($1 \\le A < 10$)",
    stepByStep: [
      "นับจำนวนตำแหน่งที่ต้องเลื่อนจุดทศนิยมจากหลังสุดไปไว้หลังเลข 4",
      "เลื่อนไปทางซ้าย 8 ตำแหน่ง จะได้ $4.5$",
      "เลขชี้กำลังของ 10 จะเป็นบวกเท่ากับจำนวนตำแหน่งที่เลื่อน",
      "ได้ผลลัพธ์เป็น $4.5 \\times 10^8$"
    ],
    commonMistake: "ระวังอย่าตอบ $45 \\times 10^7$ เพราะ 45 ไม่ตรงตามเงื่อนไข $1 \\le A < 10$",
    ruleUsed: "A \\times 10^n \\quad (1 \\le A < 10)",
    xpReward: 20
  },
  {
    id: "q_sci_2",
    question: "จงเขียน $0.000072$ ในรูปสัญกรณ์วิทยาศาสตร์",
    mathExpression: "0.000072",
    topicId: "rule-scientific-notation",
    topicName: "สัญกรณ์วิทยาศาสตร์",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "7.2 \\times 10^{-5}" },
      { id: "B", text: "7.2 \\times 10^{-6}" },
      { id: "C", text: "72 \\times 10^{-6}" },
      { id: "D", text: "0.72 \\times 10^{-4}" }
    ],
    correctAnswer: "A",
    hint: "เลื่อนจุดทศนิยมไปทางขวา 5 ตำแหน่งเพื่อให้ได้ 7.2 และเลขชี้กำลังติดลบ",
    stepByStep: [
      "เลื่อนจุดทศนิยมไปทางขวาจนได้ค่าระหว่าง 1 ถึง 10 คือ $7.2$",
      "นับจำนวนตำแหน่งที่เลื่อน: เลื่อนไป 5 ตำแหน่ง",
      "การเลื่อนไปทางขวาทำให้เลขชี้กำลังติดลบ: $10^{-5}$",
      "ได้ผลลัพธ์เป็น $7.2 \\times 10^{-5}$"
    ],
    ruleUsed: "A \\times 10^n \\quad (1 \\le A < 10)",
    xpReward: 25
  },
  {
    id: "q_sci_3",
    question: "จงหาผลคูณของ $(3 \\times 10^5) \\times (4 \\times 10^3)$ ในรูปสัญกรณ์วิทยาศาสตร์",
    mathExpression: "(3 \\times 10^5) \\times (4 \\times 10^3)",
    topicId: "rule-scientific-notation",
    topicName: "สัญกรณ์วิทยาศาสตร์",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "1.2 \\times 10^9" },
      { id: "B", text: "12 \\times 10^8" },
      { id: "C", text: "1.2 \\times 10^8" },
      { id: "D", text: "7 \\times 10^8" }
    ],
    correctAnswer: "A",
    hint: "คูณตัวเลข $3 \\times 4 = 12$, รวมเลขชี้กำลัง $10^{5+3} = 10^8$, แล้วปรับ $12 \\times 10^8 = 1.2 \\times 10^9$",
    stepByStep: [
      "คูณสัมประสิทธิ์: $3 \\times 4 = 12$",
      "คูณฐาน 10: $10^5 \\times 10^3 = 10^{5+3} = 10^8$",
      "ได้ $12 \\times 10^8$",
      "ปรับ 12 ให้อยู่ในรูป $1 \\le A < 10$: $12 = 1.2 \\times 10^1$",
      "ดังนั้น $1.2 \\times 10^1 \\times 10^8 = 1.2 \\times 10^9$"
    ],
    ruleUsed: "A \\times 10^n \\quad (1 \\le A < 10)",
    xpReward: 30
  },
  {
    id: "q_sci_4",
    question: "จงหาผลหารของ $\\frac{8.4 \\times 10^7}{2.1 \\times 10^3}$ ในรูปสัญกรณ์วิทยาศาสตร์",
    mathExpression: "\\frac{8.4 \\times 10^7}{2.1 \\times 10^3}",
    topicId: "rule-scientific-notation",
    topicName: "สัญกรณ์วิทยาศาสตร์",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "4 \\times 10^4" },
      { id: "B", text: "4 \\times 10^{10}" },
      { id: "C", text: "4.2 \\times 10^4" },
      { id: "D", text: "0.4 \\times 10^5" }
    ],
    correctAnswer: "A",
    hint: "หารสัมประสิทธิ์ $\\frac{8.4}{2.1} = 4$, ลบเลขชี้กำลัง $7 - 3 = 4$",
    stepByStep: [
      "หารตัวเลขข้างหน้า: $8.4 \\div 2.1 = 4$",
      "หารฐาน 10: $10^7 \\div 10^3 = 10^{7-3} = 10^4$",
      "รวมเป็น $4 \\times 10^4$"
    ],
    ruleUsed: "A \\times 10^n \\quad (1 \\le A < 10)",
    xpReward: 30
  },
  {
    id: "q_sci_5",
    question: "จงหาผลบวกของ $(2.5 \\times 10^4) + (3.1 \\times 10^3)$ ในรูปสัญกรณ์วิทยาศาสตร์",
    mathExpression: "(2.5 \\times 10^4) + (3.1 \\times 10^3)",
    topicId: "rule-scientific-notation",
    topicName: "สัญกรณ์วิทยาศาสตร์",
    gradeLevel: "ม.1",
    difficulty: "hard",
    options: [
      { id: "A", text: "2.81 \\times 10^4" },
      { id: "B", text: "5.6 \\times 10^7" },
      { id: "C", text: "5.6 \\times 10^4" },
      { id: "D", text: "2.81 \\times 10^3" }
    ],
    correctAnswer: "A",
    hint: "ปรับเลขชี้กำลังให้เท่ากันก่อน: $3.1 \\times 10^3 = 0.31 \\times 10^4$ แล้วนำ $(2.5 + 0.31) \\times 10^4$",
    stepByStep: [
      "การบวกลบสัญกรณ์วิทยาศาสตร์ ต้องปรับเลขชี้กำลังของ 10 ให้เท่ากันก่อน",
      "แปลง $3.1 \\times 10^3 = 0.31 \\times 10^4$",
      "บวกสัมประสิทธิ์: $(2.5 + 0.31) \\times 10^4 = 2.81 \\times 10^4$"
    ],
    ruleUsed: "A \\times 10^n \\quad (1 \\le A < 10)",
    xpReward: 40
  },
  {
    id: "q_sci_6",
    question: "แสงเดินทางด้วยความเร็วประมาณ $3 \\times 10^8$ เมตรต่อวินาที ในเวลา 1 นาที แสงจะเดินทางได้ระยะทางกี่เมตร",
    mathExpression: "(3 \\times 10^8) \\times 60",
    topicId: "rule-scientific-notation",
    topicName: "สัญกรณ์วิทยาศาสตร์",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "$1.8 \\times 10^{10}$ เมตร" },
      { id: "B", text: "$1.8 \\times 10^9$ เมตร" },
      { id: "C", text: "$18 \\times 10^9$ เมตร" },
      { id: "D", text: "$3 \\times 10^{10}$ เมตร" }
    ],
    correctAnswer: "A",
    hint: "1 นาที = 60 วินาที, ระยะทาง = $(3 \\times 10^8) \\times 60 = 180 \\times 10^8 = 1.8 \\times 10^{10}$ เมตร",
    stepByStep: [
      "1 นาทีมี 60 วินาที = $6 \\times 10^1$ วินาที",
      "คำนวณระยะทาง = ความเร็ว $\\times$ เวลา",
      "$(3 \\times 10^8) \\times (6 \\times 10^1) = 18 \\times 10^9$",
      "ปรับเป็นสัญกรณ์วิทยาศาสตร์: $1.8 \\times 10^{10}$ เมตร"
    ],
    ruleUsed: "A \\times 10^n \\quad (1 \\le A < 10)",
    xpReward: 35
  },
  {
    id: "q_sci_7",
    question: "จำนวน $0.0000000056$ เขียนในรูป $A \\times 10^n$ ได้ตามข้อใด",
    mathExpression: "0.0000000056",
    topicId: "rule-scientific-notation",
    topicName: "สัญกรณ์วิทยาศาสตร์",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "5.6 \\times 10^{-9}" },
      { id: "B", text: "5.6 \\times 10^{-8}" },
      { id: "C", text: "56 \\times 10^{-10}" },
      { id: "D", text: "5.6 \\times 10^{-10}" }
    ],
    correctAnswer: "A",
    hint: "เลื่อนจุดทศนิยมไปทางขวา 9 ตำแหน่งให้อยู่หลังเลข 5",
    stepByStep: [
      "นับจำนวนจุดทศนิยมที่เลื่อนไปทางขวา: 9 ตำแหน่ง",
      "ได้ค่า $A = 5.6$",
      "เลขชี้กำลัง $n = -9$",
      "ได้ $5.6 \\times 10^{-9}$"
    ],
    ruleUsed: "A \\times 10^n \\quad (1 \\le A < 10)",
    xpReward: 25
  },
  {
    id: "q_sci_8",
    question: "จงหาค่าของ $(6 \\times 10^{-4}) \\times (5 \\times 10^{-3})$ ในรูปสัญกรณ์วิทยาศาสตร์",
    mathExpression: "(6 \\times 10^{-4}) \\times (5 \\times 10^{-3})",
    topicId: "rule-scientific-notation",
    topicName: "สัญกรณ์วิทยาศาสตร์",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "3 \\times 10^{-6}" },
      { id: "B", text: "30 \\times 10^{-7}" },
      { id: "C", text: "3 \\times 10^{-7}" },
      { id: "D", text: "3 \\times 10^{-5}" }
    ],
    correctAnswer: "A",
    hint: "คูณตัวเลข $6 \\times 5 = 30$, รวมเลขชี้กำลัง $-4 + (-3) = -7$, แล้วปรับ $30 \\times 10^{-7} = 3 \\times 10^{-6}$",
    stepByStep: [
      "คูณสัมประสิทธิ์: $6 \\times 5 = 30$",
      "คูณฐาน 10: $10^{-4} \\times 10^{-3} = 10^{-7}$",
      "ได้ $30 \\times 10^{-7}$",
      "ปรับ $30 = 3 \\times 10^1$",
      "ดังนั้น $3 \\times 10^1 \\times 10^{-7} = 3 \\times 10^{-6}$"
    ],
    ruleUsed: "A \\times 10^n \\quad (1 \\le A < 10)",
    xpReward: 35
  },
  {
    id: "q_sci_9",
    question: "จงหาผลลบของ $(5.4 \\times 10^6) - (2.1 \\times 10^5)$ ในรูปสัญกรณ์วิทยาศาสตร์",
    mathExpression: "(5.4 \\times 10^6) - (2.1 \\times 10^5)",
    topicId: "rule-scientific-notation",
    topicName: "สัญกรณ์วิทยาศาสตร์",
    gradeLevel: "ม.1",
    difficulty: "hard",
    options: [
      { id: "A", text: "5.19 \\times 10^6" },
      { id: "B", text: "3.3 \\times 10^6" },
      { id: "C", text: "3.3 \\times 10^1" },
      { id: "D", text: "5.19 \\times 10^5" }
    ],
    correctAnswer: "A",
    hint: "แปลง $2.1 \\times 10^5 = 0.21 \\times 10^6$ แล้วนำ $5.4 - 0.21 = 5.19$",
    stepByStep: [
      "ปรับเลขชี้กำลังให้เป็น $10^6$: $2.1 \\times 10^5 = 0.21 \\times 10^6$",
      "ลบสัมประสิทธิ์: $(5.4 - 0.21) \\times 10^6$",
      "คำนวณ $5.4 - 0.21 = 5.19$",
      "ได้ $5.19 \\times 10^6$"
    ],
    ruleUsed: "A \\times 10^n \\quad (1 \\le A < 10)",
    xpReward: 40
  },
  {
    id: "q_sci_10",
    question: "จงหาค่าของ $(2 \\times 10^4)^3$ ในรูปสัญกรณ์วิทยาศาสตร์",
    mathExpression: "(2 \\times 10^4)^3",
    topicId: "rule-scientific-notation",
    topicName: "สัญกรณ์วิทยาศาสตร์",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "8 \\times 10^{12}" },
      { id: "B", text: "6 \\times 10^{12}" },
      { id: "C", text: "8 \\times 10^7" },
      { id: "D", text: "2 \\times 10^{12}" }
    ],
    correctAnswer: "A",
    hint: "กระจายกำลัง 3: $2^3 \\times (10^4)^3 = 8 \\times 10^{12}$",
    stepByStep: [
      "กระจายเลขชี้กำลัง: $2^3 \\times (10^4)^3$",
      "คำนวณ $2^3 = 8$",
      "คำนวณ $(10^4)^3 = 10^{4 \\times 3} = 10^{12}$",
      "ได้คำตอบคือ $8 \\times 10^{12}$"
    ],
    ruleUsed: "(ab)^n = a^n b^n",
    xpReward: 25
  },
  {
    id: "q_sci_11",
    question: "ข้อใดเขียนในรูปสัญกรณ์วิทยาศาสตร์ได้ถูกต้องตามนิยาม",
    mathExpression: "A \\times 10^n \\quad (1 \\le A < 10)",
    topicId: "rule-scientific-notation",
    topicName: "สัญกรณ์วิทยาศาสตร์",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "3.75 \\times 10^6" },
      { id: "B", text: "0.85 \\times 10^4" },
      { id: "C", text: "10.2 \\times 10^5" },
      { id: "D", text: "25 \\times 10^{-3}" }
    ],
    correctAnswer: "A",
    hint: "เงื่อนไขสัญกรณ์วิทยาศาสตร์คือ $1 \\le A < 10$ และ $n$ เป็นจำนวนเต็ม",
    stepByStep: [
      "ตรวจสอบเงื่อนไข $1 \\le A < 10$:",
      "A: $3.75$ อยู่ในช่วง $1 \\le A < 10$ (ถูกต้อง)",
      "B: $0.85 < 1$ (ไม่ถูกต้อง)",
      "C: $10.2 \\ge 10$ (ไม่ถูกต้อง)",
      "D: $25 \\ge 10$ (ไม่ถูกต้อง)"
    ],
    ruleUsed: "A \\times 10^n \\quad (1 \\le A < 10)",
    xpReward: 20
  },
  {
    id: "q_sci_12",
    question: "จงหาค่าของ $\\frac{1.44 \\times 10^{-2}}{1.2 \\times 10^{-6}}$",
    mathExpression: "\\frac{1.44 \\times 10^{-2}}{1.2 \\times 10^{-6}}",
    topicId: "rule-scientific-notation",
    topicName: "สัญกรณ์วิทยาศาสตร์",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "1.2 \\times 10^4" },
      { id: "B", text: "1.2 \\times 10^{-8}" },
      { id: "C", text: "1.2 \\times 10^{-4}" },
      { id: "D", text: "12 \\times 10^3" }
    ],
    correctAnswer: "A",
    hint: "หารสัมประสิทธิ์ $\\frac{1.44}{1.2} = 1.2$, ลบเลขชี้กำลัง $-2 - (-6) = -2 + 6 = 4$",
    stepByStep: [
      "หารสัมประสิทธิ์: $1.44 \\div 1.2 = 1.2$",
      "ลบเลขชี้กำลัง: $-2 - (-6) = -2 + 6 = 4$",
      "ได้คำตอบเป็น $1.2 \\times 10^4$"
    ],
    ruleUsed: "A \\times 10^n \\quad (1 \\le A < 10)",
    xpReward: 35
  },
  {
    id: "q_sci_13",
    question: "ไวรัสชนิดหนึ่งมีขนาดเส้นผ่านศูนย์กลาง $0.00000012$ เมตร เขียนในรูปสัญกรณ์วิทยาศาสตร์ได้กี่เมตร",
    mathExpression: "0.00000012",
    topicId: "rule-scientific-notation",
    topicName: "สัญกรณ์วิทยาศาสตร์",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "$1.2 \\times 10^{-7}$ เมตร" },
      { id: "B", text: "$1.2 \\times 10^{-8}$ เมตร" },
      { id: "C", text: "$12 \\times 10^{-8}$ เมตร" },
      { id: "D", text: "$1.2 \\times 10^{-6}$ เมตร" }
    ],
    correctAnswer: "A",
    hint: "เลื่อนจุดทศนิยมไปทางขวา 7 ตำแหน่ง",
    stepByStep: [
      "เลื่อนจุดทศนิยมไปทางขวา 7 ตำแหน่งเพื่อให้ได้ $1.2$",
      "เลขชี้กำลังคือ $-7$",
      "ได้ $1.2 \\times 10^{-7}$ เมตร"
    ],
    ruleUsed: "A \\times 10^n \\quad (1 \\le A < 10)",
    xpReward: 25
  },
  {
    id: "q_sci_14",
    question: "จงหาค่าของ $\\frac{(4 \\times 10^8) \\times (9 \\times 10^{-3})}{6 \\times 10^2}$ ในรูปสัญกรณ์วิทยาศาสตร์",
    mathExpression: "\\frac{(4 \\times 10^8)(9 \\times 10^{-3})}{6 \\times 10^2}",
    topicId: "rule-scientific-notation",
    topicName: "สัญกรณ์วิทยาศาสตร์",
    gradeLevel: "ม.1",
    difficulty: "medium",
    options: [
      { id: "A", text: "6 \\times 10^3" },
      { id: "B", text: "6 \\times 10^7" },
      { id: "C", text: "36 \\times 10^3" },
      { id: "D", text: "6 \\times 10^5" }
    ],
    correctAnswer: "A",
    hint: "ตัวเศษ: $36 \\times 10^5$, หารด้วย $6 \\times 10^2 = 6 \\times 10^3$",
    stepByStep: [
      "คำนวณตัวเศษ: $(4 \\times 9) \\times 10^{8 + (-3)} = 36 \\times 10^5$",
      "นำไปหารด้วยตัวส่วน: $\\frac{36 \\times 10^5}{6 \\times 10^2}$",
      "หารสัมประสิทธิ์: $36 \\div 6 = 6$",
      "หารฐาน 10: $10^{5-2} = 10^3$",
      "ได้ $6 \\times 10^3$"
    ],
    ruleUsed: "A \\times 10^n \\quad (1 \\le A < 10)",
    xpReward: 35
  },
  {
    id: "q_sci_15",
    question: "โลกอยู่ห่างจากดวงอาทิตย์ประมาณ $1.5 \\times 10^8$ กิโลเมตร ถ้า 1 กิโลเมตรเท่ากับ $10^3$ เมตร โลกอยู่ห่างจากดวงอาทิตย์กี่เมตร",
    mathExpression: "(1.5 \\times 10^8) \\times 10^3",
    topicId: "rule-scientific-notation",
    topicName: "สัญกรณ์วิทยาศาสตร์",
    gradeLevel: "ม.1",
    difficulty: "easy",
    options: [
      { id: "A", text: "$1.5 \\times 10^{11}$ เมตร" },
      { id: "B", text: "$1.5 \\times 10^{24}$ เมตร" },
      { id: "C", text: "$1.5 \\times 10^5$ เมตร" },
      { id: "D", text: "$15 \\times 10^{10}$ เมตร" }
    ],
    correctAnswer: "A",
    hint: "รวมเลขชี้กำลังของฐาน 10: $10^8 \\times 10^3 = 10^{8+3} = 10^{11}$",
    stepByStep: [
      "ระยะทางในหน่วยเมตร = $(1.5 \\times 10^8) \\times 10^3$",
      "รวมเลขชี้กำลัง: $8 + 3 = 11$",
      "ได้คำตอบเป็น $1.5 \\times 10^{11}$ เมตร"
    ],
    ruleUsed: "A \\times 10^n \\quad (1 \\le A < 10)",
    xpReward: 25
  }
];
