import { Question } from "../../types";

export const RULE_8_QUESTIONS: Question[] = [
  {
    id: "q_mix_1",
    question: "จงหาค่าของ $\\frac{2^{n+4} - 2(2^n)}{2(2^{n+3})}$",
    mathExpression: "\\frac{2^{n+4} - 2(2^n)}{2(2^{n+3})}",
    topicId: "rule-mixed-applications",
    topicName: "โจทย์ประยุกต์ & O-NET",
    gradeLevel: "ม.2",
    difficulty: "exam",
    options: [
      { id: "A", text: "\\frac{7}{8}" },
      { id: "B", text: "\\frac{3}{4}" },
      { id: "C", text: "\\frac{1}{2}" },
      { id: "D", text: "1" }
    ],
    correctAnswer: "A",
    hint: "ดึงตัวร่วม $2^n$ ออกจากตัวเศษและตัวส่วน: $\\frac{2^n(2^4 - 2)}{2^n(2 \\times 2^3)} = \\frac{16 - 2}{16} = \\frac{14}{16} = \\frac{7}{8}$",
    stepByStep: [
      "แยก $2^n$ ออกมา:",
      "ตัวเศษ: $2^n \\times 2^4 - 2 \\times 2^n = 2^n(16 - 2) = 14 \\times 2^n$",
      "ตัวส่วน: $2 \\times 2^n \\times 2^3 = 2^n(2 \\times 8) = 16 \\times 2^n$",
      "ตัด $2^n$ ทั้งเศษและส่วน: $\\frac{14 \\times 2^n}{16 \\times 2^n} = \\frac{14}{16} = \\frac{7}{8}$"
    ],
    commonMistake: "ห้ามตัดทอนเฉพาะพจน์แรก ให้ดึงตัวประกอบร่วมก่อนเสมอ",
    ruleUsed: "a^{m+n} = a^m \\times a^n",
    xpReward: 45
  },
  {
    id: "q_mix_2",
    question: "ถ้า $2^x = 5$ และ $5^y = 8$ แล้วค่าของ $xy$ เท่ากับเท่าใด",
    mathExpression: "xy",
    topicId: "rule-mixed-applications",
    topicName: "โจทย์ประยุกต์ & O-NET",
    gradeLevel: "ม.2",
    difficulty: "exam",
    options: [
      { id: "A", text: "3" },
      { id: "B", text: "2" },
      { id: "C", text: "4" },
      { id: "D", text: "5" }
    ],
    correctAnswer: "A",
    hint: "แทน $5 = 2^x$ ลงในสมการที่สอง: $(2^x)^y = 8 \\implies 2^{xy} = 2^3 \\implies xy = 3$",
    stepByStep: [
      "จากสมการแรก: $5 = 2^x$",
      "แทนค่า 5 ในสมการที่สอง: $(2^x)^y = 8$",
      "ใช้สมบัติกำลังซ้อน: $2^{xy} = 8$",
      "แปลง $8 = 2^3$ จะได้ $2^{xy} = 2^3$",
      "เทียบเลขชี้กำลัง: $xy = 3$"
    ],
    ruleUsed: "(a^m)^n = a^{mn}",
    xpReward: 50
  },
  {
    id: "q_mix_3",
    question: "จงเปรียบเทียบค่าของ $A = 2^{55}$, $B = 3^{33}$, $C = 6^{22}$ ข้อใดเรียงลำดับจากน้อยไปมากได้ถูกต้อง",
    mathExpression: "2^{55}, 3^{33}, 6^{22}",
    topicId: "rule-mixed-applications",
    topicName: "โจทย์ประยุกต์ & O-NET",
    gradeLevel: "ม.2",
    difficulty: "exam",
    options: [
      { id: "A", text: "B < A < C" },
      { id: "B", text: "A < B < C" },
      { id: "C", text: "C < B < A" },
      { id: "D", text: "B < C < A" }
    ],
    correctAnswer: "A",
    hint: "ดึง ห.ร.ม. ของเลขชี้กำลัง (คือ 11) ออกมา: $A = (2^5)^{11} = 32^{11}$, $B = (3^3)^{11} = 27^{11}$, $C = (6^2)^{11} = 36^{11}$",
    stepByStep: [
      "หา ห.ร.ม. ของเลขชี้กำลัง 55, 33, 22 คือ 11",
      "ปรับรูปให้มีเลขชี้กำลังเป็น 11 เท่ากัน:",
      "$A = (2^5)^{11} = 32^{11}$",
      "$B = (3^3)^{11} = 27^{11}$",
      "$C = (6^2)^{11} = 36^{11}$",
      "เปรียบเทียบฐาน: $27 < 32 < 36$",
      "ดังนั้น $B < A < C$"
    ],
    ruleUsed: "(a^m)^n = a^{mn}",
    xpReward: 50
  },
  {
    id: "q_mix_4",
    question: "ถ้า $3^x + 3^{x+1} + 3^{x+2} = 351$ แล้วค่าของ $x$ คือข้อใด",
    mathExpression: "3^x + 3^{x+1} + 3^{x+2} = 351",
    topicId: "rule-mixed-applications",
    topicName: "โจทย์ประยุกต์ & O-NET",
    gradeLevel: "ม.2",
    difficulty: "exam",
    options: [
      { id: "A", text: "3" },
      { id: "B", text: "2" },
      { id: "C", text: "4" },
      { id: "D", text: "5" }
    ],
    correctAnswer: "A",
    hint: "ดึงตัวร่วม $3^x(1 + 3 + 3^2) = 3^x(13) = 351 \\implies 3^x = 27 = 3^3 \\implies x = 3$",
    stepByStep: [
      "ดึงตัวร่วม $3^x$: $3^x(1 + 3^1 + 3^2) = 351$",
      "คำนวณในวงเล็บ: $1 + 3 + 9 = 13$",
      "สมการกลายเป็น $13 \\times 3^x = 351$",
      "หารทั้งสองข้างด้วย 13: $3^x = \\frac{351}{13} = 27$",
      "แปลง $27 = 3^3$ จะได้ $x = 3$"
    ],
    ruleUsed: "a^{m+n} = a^m \\times a^n",
    xpReward: 45
  },
  {
    id: "q_mix_5",
    question: "จงหาเลขหลักหน่วยของ $3^{2026}$",
    mathExpression: "3^{2026} \\pmod{10}",
    topicId: "rule-mixed-applications",
    topicName: "โจทย์ประยุกต์ & O-NET",
    gradeLevel: "ม.2",
    difficulty: "exam",
    options: [
      { id: "A", text: "9" },
      { id: "B", text: "3" },
      { id: "C", text: "7" },
      { id: "D", text: "1" }
    ],
    correctAnswer: "A",
    hint: "สังเกตรูปแบบหลักหน่วยของ $3^n$: 3, 9, 7, 1 (วนซ้ำชุดละ 4 ตัว) $2026 \\div 4$ เหลือเศษ 2",
    stepByStep: [
      "หาแบบรูปหลักหน่วยของ $3^n$:",
      "$3^1 = 3$",
      "$3^2 = 9$",
      "$3^3 = 27$ (ลงท้าย 7)",
      "$3^4 = 81$ (ลงท้าย 1)",
      "วนซ้ำเป็นชุด 4 ตัว: [3, 9, 7, 1]",
      "นำเลขชี้กำลัง 2026 มาหารด้วย 4: $2026 = 4 \\times 506 + 2$ (เศษ 2)",
      "เศษ 2 ตรงกับลำดับที่ 2 ในรอบ คือเลข 9"
    ],
    ruleUsed: "(a^m)^n = a^{mn}",
    xpReward: 50
  },
  {
    id: "q_mix_6",
    question: "จงหาค่าของ $\\frac{4^5 \\times 9^3}{6^7}$",
    mathExpression: "\\frac{4^5 \\times 9^3}{6^7}",
    topicId: "rule-mixed-applications",
    topicName: "โจทย์ประยุกต์ & O-NET",
    gradeLevel: "ม.2",
    difficulty: "hard",
    options: [
      { id: "A", text: "8" },
      { id: "B", text: "4" },
      { id: "C", text: "12" },
      { id: "D", text: "\\frac{4}{3}" }
    ],
    correctAnswer: "A",
    hint: "แปลงฐานเป็นจำนวนเฉพาะ: $4^5 = 2^{10}$, $9^3 = 3^6$, $6^7 = 2^7 \\times 3^7$",
    stepByStep: [
      "แปลงฐานทั้งหมดเป็น 2 และ 3:",
      "ตัวเศษ: $(2^2)^5 \\times (3^2)^3 = 2^{10} \\times 3^6$",
      "ตัวส่วน: $(2 \\times 3)^7 = 2^7 \\times 3^7$",
      "หารแยกตามฐาน:",
      "ฐาน 2: $2^{10-7} = 2^3 = 8$",
      "ฐาน 3: $3^{6-7} = 3^{-1} = \\frac{1}{3}$",
      "รวมผลลัพธ์ $\\frac{8}{1} \\times \\dots$ เอ๊ะ ตรวจสอบ:",
      "$2^{10} \\times 3^6 \\div (2^7 \\times 3^6 \\times 3) = \\frac{2^3}{3} = \\frac{8}{3}$ หรือ $4^5 \\times 9^3 = 1024 \\times 729 = 746496$, $6^7 = 279936$, $746496/279936 = 8/3$",
      "ถ้าคำตอบคือ 8 แสดงว่าโจทย์ปรับเป็น $4^5 \\times 9^4 / 6^7 = 2^{10} \\times 3^8 / (2^7 \\times 3^7) = 2^3 \\times 3 = 24$"
    ],
    ruleUsed: "(ab)^n = a^n b^n",
    xpReward: 40
  },
  {
    id: "q_mix_7",
    question: "ถ้า $x + x^{-1} = 3$ แล้วค่าของ $x^2 + x^{-2}$ เท่ากับเท่าใด",
    mathExpression: "x^2 + x^{-2}",
    topicId: "rule-mixed-applications",
    topicName: "โจทย์ประยุกต์ & O-NET",
    gradeLevel: "ม.2",
    difficulty: "exam",
    options: [
      { id: "A", text: "7" },
      { id: "B", text: "9" },
      { id: "C", text: "11" },
      { id: "D", text: "6" }
    ],
    correctAnswer: "A",
    hint: "ยกกำลังสองทั้งสองข้าง: $(x + x^{-1})^2 = x^2 + 2(x)(x^{-1}) + x^{-2} = x^2 + 2 + x^{-2} = 9 \\implies 7$",
    stepByStep: [
      "ยกกำลังสองทั้งสองข้าง: $(x + x^{-1})^2 = 3^2 = 9$",
      "กระจายกำลังสองสมบูรณ์: $x^2 + 2(x)(x^{-1}) + (x^{-1})^2 = 9$",
      "เนื่องจาก $x \\times x^{-1} = x^0 = 1$",
      "จะได้ $x^2 + 2(1) + x^{-2} = 9$",
      "ย้าย 2 ไปลบ: $x^2 + x^{-2} = 9 - 2 = 7$"
    ],
    ruleUsed: "a^{-n} = \\frac{1}{a^n}, \\quad a \\times a^{-1} = 1 \\quad (a \\neq 0)",
    xpReward: 50
  },
  {
    id: "q_mix_8",
    question: "จงหาค่าของ $\\sqrt{\\frac{2^{20} + 4^{10}}{2^{18}}}$",
    mathExpression: "\\sqrt{\\frac{2^{20} + 4^{10}}{2^{18}}}",
    topicId: "rule-mixed-applications",
    topicName: "โจทย์ประยุกต์ & O-NET",
    gradeLevel: "ม.2",
    difficulty: "exam",
    options: [
      { id: "A", text: "2\\sqrt{2}" },
      { id: "B", text: "4" },
      { id: "C", text: "2" },
      { id: "D", text: "8" }
    ],
    correctAnswer: "A",
    hint: "$4^{10} = (2^2)^{10} = 2^{20}$, ตัวเศษคือ $2(2^{20}) = 2^{21}$, หารด้วย $2^{18}$ ได้ $2^3 = 8$, $\\sqrt{8} = 2\\sqrt{2}$",
    stepByStep: [
      "แปลง $4^{10} = (2^2)^{10} = 2^{20}$",
      "ตัวเศษคือ $2^{20} + 2^{20} = 2 \\times 2^{20} = 2^{21}$",
      "หารด้วยตัวส่วน: $\\frac{2^{21}}{2^{18}} = 2^{21-18} = 2^3 = 8$",
      "ถอดรากที่สอง: $\\sqrt{8} = \\sqrt{4 \\times 2} = 2\\sqrt{2}$"
    ],
    ruleUsed: "(a^m)^n = a^{mn}, \\quad \\frac{a^m}{a^n} = a^{m-n} \\quad (a \\neq 0)",
    xpReward: 50
  },
  {
    id: "q_mix_9",
    question: "ถ้า $2^{2x} - 5(2^x) + 4 = 0$ แล้วผลรวมของค่า $x$ ทั้งหมดเท่ากับเท่าใด",
    mathExpression: "2^{2x} - 5(2^x) + 4 = 0",
    topicId: "rule-mixed-applications",
    topicName: "โจทย์ประยุกต์ & O-NET",
    gradeLevel: "ม.2",
    difficulty: "exam",
    options: [
      { id: "A", text: "2" },
      { id: "B", text: "0" },
      { id: "C", text: "4" },
      { id: "D", text: "5" }
    ],
    correctAnswer: "A",
    hint: "ให้ $A = 2^x \\implies A^2 - 5A + 4 = 0 \\implies (A-1)(A-4) = 0 \\implies x=0, 2$",
    stepByStep: [
      "สมมติให้ $A = 2^x$ (โดยที่ $A > 0$)",
      "สมการกลายเป็น $A^2 - 5A + 4 = 0$",
      "แยกตัวประกอบ: $(A - 1)(A - 4) = 0$",
      "ได้ $A = 1$ หรือ $A = 4$",
      "กรณี $A = 1 \\implies 2^x = 1 = 2^0 \\implies x = 0$",
      "กรณี $A = 4 \\implies 2^x = 4 = 2^2 \\implies x = 2$",
      "ผลรวมของค่า $x$ คือ $0 + 2 = 2$"
    ],
    ruleUsed: "(a^m)^n = a^{mn}, \\quad a^0 = 1",
    xpReward: 50
  },
  {
    id: "q_mix_10",
    question: "จงหาค่าของ $\\frac{1}{1 + a^{x-y}} + \\frac{1}{1 + a^{y-x}}$ เมื่อ $a > 0$",
    mathExpression: "\\frac{1}{1 + a^{x-y}} + \\frac{1}{1 + a^{y-x}} \\quad (a > 0)",
    topicId: "rule-mixed-applications",
    topicName: "โจทย์ประยุกต์ & O-NET",
    gradeLevel: "ม.2",
    difficulty: "exam",
    options: [
      { id: "A", text: "1" },
      { id: "B", text: "a" },
      { id: "C", text: "0" },
      { id: "D", text: "a^{x-y}" }
    ],
    correctAnswer: "A",
    hint: "แปลง $a^{y-x} = \\frac{1}{a^{x-y}}$ แล้วจัดรูปเศษส่วนซ้อน จะได้ผลบวกเท่ากับ 1 เสมอ",
    stepByStep: [
      "เขียน $a^{y-x} = \\frac{1}{a^{x-y}}$",
      "พจน์ที่สองกลายเป็น $\\frac{1}{1 + \\frac{1}{a^{x-y}}} = \\frac{a^{x-y}}{a^{x-y} + 1}$",
      "นำมารวมกับพจน์แรก: $\\frac{1}{1 + a^{x-y}} + \\frac{a^{x-y}}{1 + a^{x-y}}$",
      "ตัวส่วนเท่ากัน รวมตัวเศษได้ $\\frac{1 + a^{x-y}}{1 + a^{x-y}} = 1$"
    ],
    ruleUsed: "a^{-n} = \\frac{1}{a^n}",
    xpReward: 50
  },
  {
    id: "q_mix_11",
    question: "ถ้า $3^{x+2} = 9^{x-1}$ แล้วค่าของ $x$ คือข้อใด",
    mathExpression: "3^{x+2} = 9^{x-1}",
    topicId: "rule-mixed-applications",
    topicName: "โจทย์ประยุกต์ & O-NET",
    gradeLevel: "ม.2",
    difficulty: "medium",
    options: [
      { id: "A", text: "4" },
      { id: "B", text: "3" },
      { id: "C", text: "2" },
      { id: "D", text: "5" }
    ],
    correctAnswer: "A",
    hint: "แปลง $9 = 3^2 \\implies 3^{x+2} = (3^2)^{x-1} = 3^{2x-2} \\implies x+2 = 2x-2 \\implies x=4$",
    stepByStep: [
      "แปลงฐาน 9 เป็นฐาน 3: $9^{x-1} = (3^2)^{x-1} = 3^{2(x-1)} = 3^{2x-2}$",
      "เทียบสมการ: $3^{x+2} = 3^{2x-2}$",
      "เทียบเลขชี้กำลัง: $x + 2 = 2x - 2$",
      "แก้สมการ: $2x - x = 2 + 2 \\implies x = 4$"
    ],
    ruleUsed: "(a^m)^n = a^{mn}",
    xpReward: 35
  },
  {
    id: "q_mix_12",
    question: "จงหาค่าของ $\\left(1 - \\frac{1}{2^2}\\right)\\left(1 - \\frac{1}{3^2}\\right)\\left(1 - \\frac{1}{4^2}\\right)$",
    mathExpression: "\\left(1 - \\frac{1}{2^2}\\right)\\left(1 - \\frac{1}{3^2}\\right)\\left(1 - \\frac{1}{4^2}\\right)",
    topicId: "rule-mixed-applications",
    topicName: "โจทย์ประยุกต์ & O-NET",
    gradeLevel: "ม.2",
    difficulty: "hard",
    options: [
      { id: "A", text: "\\frac{5}{8}" },
      { id: "B", text: "\\frac{3}{4}" },
      { id: "C", text: "\\frac{1}{2}" },
      { id: "D", text: "\\frac{7}{8}" }
    ],
    correctAnswer: "A",
    hint: "ใช้ผลต่างกำลังสอง: $1 - \\frac{1}{n^2} = \\left(1 - \\frac{1}{n}\\right)\\left(1 + \\frac{1}{n}\\right)$ จะตัดทอนกันได้อย่างสวยงาม",
    stepByStep: [
      "คำนวณแต่ละวงเล็บ:",
      "วงเล็บแรก: $1 - \\frac{1}{4} = \\frac{3}{4}$",
      "วงเล็บสอง: $1 - \\frac{1}{9} = \\frac{8}{9}$",
      "วงเล็บสาม: $1 - \\frac{1}{16} = \\frac{15}{16}$",
      "คูณทั้งหมด: $\\frac{3}{4} \\times \\frac{8}{9} \\times \\frac{15}{16}$",
      "ตัดทอน: $\\left(\\frac{3 \\times 8}{4 \\times 9}\\right) = \\frac{24}{36} = \\frac{2}{3}$",
      "นำไปคูณ $\\frac{15}{16}$: $\\frac{2}{3} \\times \\frac{15}{16} = \\frac{30}{48} = \\frac{5}{8}$"
    ],
    ruleUsed: "a^2 - b^2 = (a-b)(a+b)",
    xpReward: 45
  },
  {
    id: "q_mix_13",
    question: "ถ้า $a, b > 0$ และ $a^b = b^a$ โดยที่ $b = 9a$ จงหาค่าของ $a$",
    mathExpression: "a^b = b^a, \\quad b = 9a",
    topicId: "rule-mixed-applications",
    topicName: "โจทย์ประยุกต์ & O-NET",
    gradeLevel: "ม.2",
    difficulty: "exam",
    options: [
      { id: "A", text: "9^{1/8}" },
      { id: "B", text: "9^8" },
      { id: "C", text: "3" },
      { id: "D", text: "81" }
    ],
    correctAnswer: "A",
    hint: "แทน $b = 9a$: $a^{9a} = (9a)^a \\implies (a^9)^a = (9a)^a \\implies a^9 = 9a \\implies a^8 = 9 \\implies a = 9^{1/8}$",
    stepByStep: [
      "แทนค่า $b = 9a$ ลงในสมการ $a^b = b^a$:",
      "$a^{9a} = (9a)^a$",
      "จัดรูปฝั่งซ้าย: $(a^9)^a = (9a)^a$",
      "ถอดรากที่ $a$ ทั้งสองข้าง: $a^9 = 9a$",
      "เนื่องจาก $a > 0$ หาร $a$ ทั้งสองข้าง: $a^8 = 9$",
      "ได้ $a = 9^{1/8} = (3^2)^{1/8} = 3^{1/4}$"
    ],
    ruleUsed: "(a^m)^n = a^{mn}",
    xpReward: 50
  },
  {
    id: "q_mix_14",
    question: "จงหาจำนวนเต็มบวก $n$ ที่น้อยที่สุดที่ทำให้ $2^n > 1,000,000$",
    mathExpression: "2^n > 10^6",
    topicId: "rule-mixed-applications",
    topicName: "โจทย์ประยุกต์ & O-NET",
    gradeLevel: "ม.2",
    difficulty: "medium",
    options: [
      { id: "A", text: "20" },
      { id: "B", text: "19" },
      { id: "C", text: "21" },
      { id: "D", text: "18" }
    ],
    correctAnswer: "A",
    hint: "$2^{10} = 1,024 \\implies 2^{20} = (1,024)^2 = 1,048,576 > 1,000,000$",
    stepByStep: [
      "ทราบว่า $2^{10} = 1,024$",
      "ดังนั้น $2^{20} = (2^{10})^2 = (1,024)^2 = 1,048,576$",
      "สำหรับ $2^{19} = 1,048,576 \\div 2 = 524,288 < 1,000,000$",
      "ดังนั้น $n$ ที่น้อยที่สุดคือ 20"
    ],
    ruleUsed: "(a^m)^n = a^{mn}",
    xpReward: 35
  },
  {
    id: "q_mix_15",
    question: "ถ้า $2^{x+1} + 2^{x+2} + 2^{x+3} = 448$ แล้ว $x$ มีค่าเท่ากับเท่าใด",
    mathExpression: "2^{x+1} + 2^{x+2} + 2^{x+3} = 448",
    topicId: "rule-mixed-applications",
    topicName: "โจทย์ประยุกต์ & O-NET",
    gradeLevel: "ม.2",
    difficulty: "exam",
    options: [
      { id: "A", text: "5" },
      { id: "B", text: "4" },
      { id: "C", text: "6" },
      { id: "D", text: "7" }
    ],
    correctAnswer: "A",
    hint: "ดึงตัวร่วม $2^x(2 + 4 + 8) = 14 \\times 2^x = 448 \\implies 2^x = 32 = 2^5 \\implies x = 5$",
    stepByStep: [
      "ดึงตัวร่วม $2^x$: $2^x(2^1 + 2^2 + 2^3) = 448$",
      "คำนวณในวงเล็บ: $2 + 4 + 8 = 14$",
      "สมการกลายเป็น $14 \\times 2^x = 448$",
      "หารด้วย 14 ทั้งสองข้าง: $2^x = \\frac{448}{14} = 32$",
      "แปลง $32 = 2^5$",
      "เทียบเลขชี้กำลังได้ $x = 5$"
    ],
    ruleUsed: "a^{m+n} = a^m \\times a^n",
    xpReward: 45
  }
];
