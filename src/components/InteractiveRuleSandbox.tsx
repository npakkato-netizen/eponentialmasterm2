import React, { useState } from "react";
import { MathView } from "./MathView";
import { Sparkles, Eye, Lightbulb } from "lucide-react";
import { motion } from "motion/react";

interface InteractiveRuleSandboxProps {
  ruleId: string;
}

export const InteractiveRuleSandbox: React.FC<InteractiveRuleSandboxProps> = ({
  ruleId,
}) => {
  const [baseA, setBaseA] = useState<number>(2);
  const [baseB, setBaseB] = useState<number>(3);
  const [expM, setExpM] = useState<number>(3);
  const [expN, setExpN] = useState<number>(2);
  const [sciCoeff, setSciCoeff] = useState<number>(4.5);
  const [sciExp, setSciExp] = useState<number>(4);
  const [showExpansion, setShowExpansion] = useState<boolean>(true);

  // Helper calculation
  const safePow = (b: number, e: number) => {
    try {
      return Math.pow(b, e);
    } catch {
      return 0;
    }
  };

  const renderExponentBadge = (val: number, label: string, colorClass: string) => {
    return (
      <div className="flex justify-between items-center text-xs font-bold">
        <span className="text-slate-500 dark:text-slate-400">{label}</span>
        <span
          className={`px-2 py-0.5 rounded-lg text-xs font-black transition-all ${
            val < 0
              ? "bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
              : val === 0
              ? "bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
              : colorClass
          }`}
        >
          {val > 0 ? `+${val}` : val}
        </span>
      </div>
    );
  };

  const renderSandbox = () => {
    switch (ruleId) {
      case "rule-product-same-base": {
        const sumExp = expM + expN;
        const resultVal = safePow(baseA, sumExp);

        return (
          <div className="space-y-4">
            <div className="bg-[#EEF2FF] dark:bg-slate-800/90 p-5 rounded-2xl border-2 border-indigo-100 dark:border-slate-700">
              <div className="text-center py-2 space-y-3">
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#6366F1] dark:text-indigo-400">
                  <span>กฎการคูณ: ฐานเดียวกันคูณกัน ให้นำเลขชี้กำลังมาบวกกัน</span>
                  <MathView expression="a^m \times a^n = a^{m+n}" />
                </div>

                {/* Primary Math Equation Step-by-Step */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-slate-800 dark:text-white">
                  {/* First Power */}
                  <div className="bg-white dark:bg-slate-700 px-3.5 py-1.5 rounded-xl shadow-xs border border-slate-200 dark:border-slate-600">
                    <MathView expression={`${baseA}^{${expM}}`} large />
                  </div>

                  <span className="text-base font-bold text-[#6366F1]">×</span>

                  {/* Second Power */}
                  <div className="bg-white dark:bg-slate-700 px-3.5 py-1.5 rounded-xl shadow-xs border border-slate-200 dark:border-slate-600">
                    <MathView expression={`${baseA}^{${expN}}`} large />
                  </div>

                  <span className="text-base font-bold text-[#6366F1]">=</span>

                  {/* Step 1: Addition of Exponents */}
                  <div className="bg-white dark:bg-slate-700 px-3.5 py-1.5 rounded-xl shadow-xs border border-indigo-200 dark:border-slate-600 text-indigo-700 dark:text-indigo-300">
                    <MathView
                      expression={`${baseA}^{${expM} + ${expN < 0 ? `(${expN})` : expN}}`}
                      large
                    />
                  </div>

                  <span className="text-base font-bold text-[#6366F1]">=</span>

                  {/* Step 2: Final Power with Result Exponent */}
                  <div className="bg-[#6366F1] text-white px-4 py-1.5 rounded-xl shadow-xs font-black">
                    <MathView expression={`${baseA}^{${sumExp}}`} large />
                  </div>

                  <span className="text-base font-bold text-slate-400">=</span>

                  {/* Step 3: Numeric Result */}
                  <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 px-3.5 py-1.5 rounded-xl font-black text-base md:text-lg">
                    {sumExp >= 0 ? (
                      resultVal.toLocaleString()
                    ) : (
                      <MathView expression={`\\frac{1}{${baseA}^{${Math.abs(sumExp)}}} = \\frac{1}{${safePow(baseA, Math.abs(sumExp))}}`} />
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  สังเกต: ฐานคงเดิมคือ <span className="font-bold text-[#6366F1]">{baseA}</span> ส่วนเลขชี้กำลังนำมาบวกกัน ({expM} + {expN < 0 ? `(${expN})` : expN} = <span className="font-bold text-[#6366F1]">{sumExp}</span>)
                </p>
              </div>

              {/* Expansion breakdown */}
              {showExpansion && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-2"
                >
                  <p className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-500" /> ทำไมถึงเป็นแบบนี้? (ดูหลักการคิด):
                  </p>
                  <div className="font-mono text-slate-700 dark:text-slate-200 bg-[#F8FAFC] dark:bg-slate-800 p-3 rounded-xl overflow-x-auto leading-relaxed border border-slate-100 dark:border-slate-700">
                    {expM > 0 && expN > 0 ? (
                      <span>
                        <span className="text-[#6366F1] font-bold">({Array(expM).fill(baseA).join(" × ")})</span>
                        <span className="text-slate-400 mx-2">×</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">({Array(expN).fill(baseA).join(" × ")})</span>
                        <span className="text-slate-400 mx-2">=</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                          มี {baseA} ทั้งหมด {expM} + {expN} = {sumExp} ตัวคูณกัน = {baseA}<sup>{sumExp}</sup>
                        </span>
                      </span>
                    ) : (
                      <span>
                        ใช้สมบัติการบวกเลขชี้กำลัง: ฐานเท่ากันนำเลขชี้กำลังมาบวกกันโดยตรง{" "}
                        <span className="text-[#6366F1] font-bold">{expM} + ({expN}) = {sumExp}</span>
                        {sumExp < 0 && (
                          <span> → แปลงรูปเลขชี้กำลังลบเป็นเศษส่วน: <MathView expression={`${baseA}^{${sumExp}} = \\frac{1}{${baseA}^{${Math.abs(sumExp)}}}`} /></span>
                        )}
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Interactive Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white dark:bg-[#1E293B] p-3.5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex justify-between">
                  <span>ฐาน (a)</span>
                  <span className="text-[#6366F1] font-black">{baseA}</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={baseA}
                  onChange={(e) => setBaseA(Number(e.target.value))}
                  className="w-full mt-2 accent-[#6366F1]"
                />
              </div>

              <div className="bg-white dark:bg-[#1E293B] p-3.5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
                {renderExponentBadge(expM, "เลขชี้กำลัง m", "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300")}
                <input
                  type="range"
                  min="-4"
                  max="5"
                  value={expM}
                  onChange={(e) => setExpM(Number(e.target.value))}
                  className="w-full mt-2 accent-[#6366F1]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5 mt-1">
                  <span>-4</span>
                  <span>0</span>
                  <span>+5</span>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1E293B] p-3.5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
                {renderExponentBadge(expN, "เลขชี้กำลัง n", "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300")}
                <input
                  type="range"
                  min="-4"
                  max="5"
                  value={expN}
                  onChange={(e) => setExpN(Number(e.target.value))}
                  className="w-full mt-2 accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5 mt-1">
                  <span>-4</span>
                  <span>0</span>
                  <span>+5</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case "rule-quotient-same-base": {
        const diffExp = expM - expN;
        const resultVal = safePow(baseA, diffExp);
        return (
          <div className="space-y-4">
            <div className="bg-teal-50/80 dark:bg-slate-800/80 p-5 rounded-2xl border-2 border-teal-100 dark:border-slate-700">
              <div className="text-center py-2 space-y-3">
                <div className="flex flex-col items-center justify-center gap-2 text-center pb-1">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100/90 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200 shadow-xs">
                    <span className="text-xs sm:text-sm font-bold">สมบัติการหาร:</span>
                    <MathView expression="\frac{a^m}{a^n} = a^{m-n} \quad (a \neq 0)" large />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                    ฐานเดียวกันหารกัน ให้นำเลขชี้กำลังของตัวตั้ง (เศษ) ลบด้วยเลขชี้กำลังของตัวหาร (ส่วน)
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-slate-800 dark:text-white py-1">
                  <span className="bg-white dark:bg-slate-700 px-4 py-2.5 rounded-xl shadow-xs border border-teal-200 dark:border-slate-600 inline-flex items-center justify-center min-h-[52px]">
                    <MathView expression={`\\frac{${baseA}^{${expM}}}{${baseA}^{${expN}}}`} large />
                  </span>
                  <span className="text-lg font-bold text-teal-500 select-none">=</span>
                  <span className="bg-white dark:bg-slate-700 px-4 py-2.5 rounded-xl shadow-xs border border-teal-300 dark:border-slate-600 text-teal-700 dark:text-teal-300 inline-flex items-center justify-center min-h-[52px]">
                    {expN < 0 ? (
                      <MathView expression={`${baseA}^{${expM} - (${expN})} = ${baseA}^{${expM} + ${Math.abs(expN)}}`} large />
                    ) : (
                      <MathView expression={`${baseA}^{${expM} - ${expN}}`} large />
                    )}
                  </span>
                  <span className="text-lg font-bold text-teal-500 select-none">=</span>
                  <span className="bg-teal-600 text-white px-4 py-2.5 rounded-xl shadow-xs font-black inline-flex items-center justify-center min-h-[52px]">
                    <MathView expression={`${baseA}^{${diffExp}}`} large className="text-white" />
                  </span>
                  <span className="text-lg font-bold text-slate-400 select-none">=</span>
                  <span className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 px-4 py-2.5 rounded-xl font-black text-base sm:text-lg inline-flex items-center justify-center min-h-[52px]">
                    {diffExp >= 0 ? (
                      resultVal.toLocaleString()
                    ) : (
                      <MathView expression={`\\frac{1}{${baseA}^{${Math.abs(diffExp)}}} = \\frac{1}{${safePow(baseA, Math.abs(diffExp)).toLocaleString()}}`} large />
                    )}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium pt-1">
                  <span>สรุปหลักคิด:</span>
                  <span className="bg-teal-100/70 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 px-2.5 py-1 rounded-lg font-semibold">
                    ฐานคงเดิมคือ {baseA}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="bg-teal-100/70 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 px-2.5 py-1 rounded-lg font-semibold inline-flex items-center gap-1.5">
                    <span>เลขชี้กำลัง:</span>
                    <MathView expression={`${expM} - (${expN < 0 ? `(${expN})` : expN}) = ${diffExp}`} />
                  </span>
                </div>

                {expN < 0 && (
                  <div className="text-xs sm:text-sm text-teal-800 dark:text-teal-200 font-medium bg-teal-100/80 dark:bg-teal-950/60 p-3 rounded-xl border border-teal-200 dark:border-teal-800 flex items-center justify-center gap-2 flex-wrap text-center">
                    <span className="font-bold">💡 ข้อควรระวังเมื่อตัวหารมีเลขชี้กำลังติดลบ:</span>
                    <span>การลบด้วยจำนวนลบจะเปลี่ยนเป็นการบวก</span>
                    <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 font-bold text-teal-700 dark:text-teal-300 shadow-2xs border border-teal-200 dark:border-slate-700">
                      <MathView expression={`${expM} - (${expN}) = ${expM} + ${Math.abs(expN)} = ${diffExp}`} />
                    </span>
                  </div>
                )}
              </div>

              {showExpansion && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-3"
                >
                  <p className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-500" /> ทำไมถึงเป็นแบบนี้? (ดูหลักการคิดและการตัดทอน):
                  </p>

                  <div className="text-slate-700 dark:text-slate-200 bg-[#F8FAFC] dark:bg-slate-800/80 p-3.5 rounded-xl overflow-x-auto leading-relaxed border border-slate-100 dark:border-slate-700 space-y-2.5">
                    {expM > 0 && expN > 0 ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-teal-700 dark:text-teal-300">กระจายตัวเลขคูณกันในรูปเศษส่วน:</span>
                          <span className="inline-flex items-center gap-2 bg-white dark:bg-slate-700 px-3 py-1.5 rounded-lg border border-teal-200 dark:border-slate-600">
                            <span className="flex flex-col items-center">
                              <span className="text-teal-700 dark:text-teal-300 font-bold px-1 border-b border-slate-400 dark:border-slate-500">
                                {Array(expM).fill(baseA).join(" × ")}
                              </span>
                              <span className="text-indigo-600 dark:text-indigo-400 font-bold px-1">
                                {Array(expN).fill(baseA).join(" × ")}
                              </span>
                            </span>
                          </span>
                        </div>

                        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1">
                          {expM > expN ? (
                            <p>
                              ตัดทอนตัวเลข <span className="font-bold text-teal-600">{baseA}</span> ระหว่างเศษและส่วนออกไปได้ <span className="font-bold">{expN}</span> ตัว
                              {" "}→ เหลือตัวเลข <span className="font-bold text-teal-600">{baseA}</span> อยู่ที่ตัวเศษ <span className="font-bold text-emerald-600">{expM} - {expN} = {diffExp}</span> ตัว
                              {" "}คำตอบจึงเป็น <span className="font-bold text-teal-600">{baseA}<sup>{diffExp}</sup> = {resultVal.toLocaleString()}</span>
                            </p>
                          ) : expM === expN ? (
                            <p>
                              ตัดทอนตัวเลข <span className="font-bold text-teal-600">{baseA}</span> เท่ากันหมดทั้งเศษและส่วน
                              {" "}→ หารกันได้ <span className="font-bold text-emerald-600">1</span> เสมอ (ตรงกับนิยาม <MathView expression={`${baseA}^0 = 1`} />)
                            </p>
                          ) : (
                            <p>
                              ตัดทอนตัวเลข <span className="font-bold text-teal-600">{baseA}</span> ออกไปได้ <span className="font-bold">{expM}</span> ตัว
                              {" "}→ เหลือตัวเลข <span className="font-bold text-teal-600">{baseA}</span> อยู่ที่ตัวส่วน <span className="font-bold text-amber-600">{expN} - {expM} = {Math.abs(diffExp)}</span> ตัว
                              {" "}ได้เป็น <MathView expression={`\\frac{1}{${baseA}^{${Math.abs(diffExp)}}} = ${baseA}^{${diffExp}}`} />
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1.5 text-xs sm:text-sm">
                        <p className="font-semibold text-teal-700 dark:text-teal-300">วิเคราะห์ตามกฎการลบเลขชี้กำลัง:</p>
                        <p>
                          นำเลขชี้กำลังตัวตั้งลบด้วยตัวหาร: <span className="font-bold text-teal-600 dark:text-teal-400">{expM} - ({expN}) = {diffExp}</span>
                        </p>
                        {diffExp < 0 && (
                          <p className="flex items-center gap-1.5 flex-wrap">
                            <span>เมื่อเลขชี้กำลังติดลบ ให้แปลงเป็นเศษส่วนตามนิยาม:</span>
                            <MathView expression={`${baseA}^{${diffExp}} = \\frac{1}{${baseA}^{${Math.abs(diffExp)}}} = \\frac{1}{${safePow(baseA, Math.abs(diffExp)).toLocaleString()}}`} />
                          </p>
                        )}
                        {diffExp === 0 && (
                          <p className="flex items-center gap-1.5 flex-wrap">
                            <span>เลขชี้กำลังลบกันได้ 0 ตามนิยามจำนวนใดๆ ที่ไม่เท่ากับศูนย์ยกกำลัง 0:</span>
                            <MathView expression={`${baseA}^0 = 1`} />
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white dark:bg-[#1E293B] p-3.5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
                <label className="text-xs font-bold text-slate-500 flex justify-between">
                  <span>ฐาน (a)</span>
                  <span className="text-teal-600 font-bold">{baseA}</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="5"
                  value={baseA}
                  onChange={(e) => setBaseA(Number(e.target.value))}
                  className="w-full mt-2 accent-teal-600"
                />
              </div>

              <div className="bg-white dark:bg-[#1E293B] p-3.5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
                {renderExponentBadge(expM, "ตัวตั้งกำลัง m", "bg-teal-100 text-teal-700 dark:bg-teal-950/70 dark:text-teal-300")}
                <input
                  type="range"
                  min="-4"
                  max="6"
                  value={expM}
                  onChange={(e) => setExpM(Number(e.target.value))}
                  className="w-full mt-2 accent-teal-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5 mt-1">
                  <span>-4</span>
                  <span>0</span>
                  <span>+6</span>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1E293B] p-3.5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
                {renderExponentBadge(expN, "ตัวหารกำลัง n", "bg-teal-100 text-teal-700 dark:bg-teal-950/70 dark:text-teal-300")}
                <input
                  type="range"
                  min="-4"
                  max="6"
                  value={expN}
                  onChange={(e) => setExpN(Number(e.target.value))}
                  className="w-full mt-2 accent-teal-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5 mt-1">
                  <span>-4</span>
                  <span>0</span>
                  <span>+6</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case "rule-power-of-power": {
        const mulExp = expM * expN;
        const resultVal = safePow(baseA, mulExp);
        return (
          <div className="space-y-4">
            <div className="bg-amber-50/80 dark:bg-slate-800/80 p-5 rounded-2xl border-2 border-amber-100 dark:border-slate-700">
              <div className="text-center py-2 space-y-3">
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400">
                  <span>กำลังซ้อน: นำเลขชี้กำลังทั้งสองมาคูณกัน</span>
                  <MathView expression="(a^m)^n = a^{mn}" />
                </div>
                <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-slate-800 dark:text-white">
                  <span className="bg-white dark:bg-slate-700 px-3.5 py-1.5 rounded-xl shadow-xs border border-amber-200 dark:border-slate-600">
                    <MathView expression={`(${baseA}^{${expM}})^{${expN}}`} large />
                  </span>
                  <span className="text-base font-bold text-amber-500">=</span>
                  <span className="bg-white dark:bg-slate-700 px-3.5 py-1.5 rounded-xl shadow-xs border border-amber-200 dark:border-slate-600 text-amber-700 dark:text-amber-300">
                    <MathView
                      expression={`${baseA}^{${expM} \\times ${expN < 0 ? `(${expN})` : expN}}`}
                      large
                    />
                  </span>
                  <span className="text-base font-bold text-amber-500">=</span>
                  <span className="bg-[#F59E0B] text-white px-4 py-1.5 rounded-xl shadow-xs font-black">
                    <MathView expression={`${baseA}^{${mulExp}}`} large />
                  </span>
                  <span className="text-base font-bold text-slate-400">=</span>
                  <span className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 px-3.5 py-1.5 rounded-xl font-black text-base md:text-lg">
                    {mulExp >= 0 ? (
                      resultVal.toLocaleString()
                    ) : (
                      <MathView expression={`\\frac{1}{${baseA}^{${Math.abs(mulExp)}}} = \\frac{1}{${safePow(baseA, Math.abs(mulExp))}}`} />
                    )}
                  </span>
                </div>
              </div>

              {showExpansion && (
                <div className="mt-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-mono space-y-1">
                  <p className="font-bold text-slate-700 dark:text-slate-300">
                    หลักการคูณเลขชี้กำลัง:
                  </p>
                  <p className="text-amber-600 dark:text-amber-400 font-bold">
                    ({expM}) × ({expN}) = {mulExp} {mulExp < 0 && `(ได้เลขชี้กำลังติดลบ → กลับเป็นตัวส่วนด้านล่าง)`}
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white dark:bg-[#1E293B] p-3.5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
                <label className="text-xs font-bold text-slate-500 flex justify-between">
                  <span>ฐาน (a)</span>
                  <span className="text-amber-600 font-bold">{baseA}</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="4"
                  value={baseA}
                  onChange={(e) => setBaseA(Number(e.target.value))}
                  className="w-full mt-2 accent-amber-500"
                />
              </div>

              <div className="bg-white dark:bg-[#1E293B] p-3.5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
                {renderExponentBadge(expM, "กำลังด้านใน m", "bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300")}
                <input
                  type="range"
                  min="-3"
                  max="4"
                  value={expM}
                  onChange={(e) => setExpM(Number(e.target.value))}
                  className="w-full mt-2 accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5 mt-1">
                  <span>-3</span>
                  <span>0</span>
                  <span>+4</span>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1E293B] p-3.5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
                {renderExponentBadge(expN, "กำลังด้านนอก n", "bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300")}
                <input
                  type="range"
                  min="-3"
                  max="3"
                  value={expN}
                  onChange={(e) => setExpN(Number(e.target.value))}
                  className="w-full mt-2 accent-orange-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5 mt-1">
                  <span>-3</span>
                  <span>0</span>
                  <span>+3</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case "rule-power-of-product": {
        const mulBase = baseA * baseB;
        return (
          <div className="space-y-4">
            <div className="bg-purple-50/80 dark:bg-slate-800/80 p-5 rounded-2xl border-2 border-purple-100 dark:border-slate-700">
              <div className="text-center py-2 space-y-3">
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400">
                  <span>เลขยกกำลังของผลคูณ: กระจายกำลังให้ทุกตัว</span>
                  <MathView expression="(ab)^n = a^n b^n" />
                </div>
                <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-slate-800 dark:text-white">
                  <span className="bg-white dark:bg-slate-700 px-3.5 py-1.5 rounded-xl shadow-xs border border-purple-200 dark:border-slate-600">
                    <MathView expression={`(${baseA} \\times ${baseB})^{${expN}}`} large />
                  </span>
                  <span className="text-base font-bold text-purple-500">=</span>
                  <span className="bg-white dark:bg-slate-700 px-3.5 py-1.5 rounded-xl shadow-xs border border-purple-200 dark:border-slate-600 text-purple-700 dark:text-purple-300">
                    <MathView expression={`${baseA}^{${expN}} \\times ${baseB}^{${expN}}`} large />
                  </span>
                  <span className="text-base font-bold text-purple-500">=</span>
                  <span className="bg-purple-600 text-white px-4 py-1.5 rounded-xl shadow-xs font-black text-base md:text-lg">
                    {expN >= 0 ? (
                      safePow(mulBase, expN).toLocaleString()
                    ) : (
                      <MathView expression={`\\frac{1}{${mulBase}^{${Math.abs(expN)}}} = \\frac{1}{${safePow(mulBase, Math.abs(expN))}}`} />
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white dark:bg-[#1E293B] p-3.5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
                <label className="text-xs font-bold text-slate-500 flex justify-between">
                  <span>ฐานตัวหน้า (a)</span>
                  <span className="text-purple-600 font-bold">{baseA}</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="5"
                  value={baseA}
                  onChange={(e) => setBaseA(Number(e.target.value))}
                  className="w-full mt-2 accent-purple-600"
                />
              </div>

              <div className="bg-white dark:bg-[#1E293B] p-3.5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
                <label className="text-xs font-bold text-slate-500 flex justify-between">
                  <span>ฐานตัวหลัง (b)</span>
                  <span className="text-purple-600 font-bold">{baseB}</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="5"
                  value={baseB}
                  onChange={(e) => setBaseB(Number(e.target.value))}
                  className="w-full mt-2 accent-purple-600"
                />
              </div>

              <div className="bg-white dark:bg-[#1E293B] p-3.5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
                {renderExponentBadge(expN, "เลขชี้กำลัง (n)", "bg-purple-100 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300")}
                <input
                  type="range"
                  min="-3"
                  max="4"
                  value={expN}
                  onChange={(e) => setExpN(Number(e.target.value))}
                  className="w-full mt-2 accent-purple-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5 mt-1">
                  <span>-3</span>
                  <span>0</span>
                  <span>+4</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case "rule-power-of-quotient": {
        return (
          <div className="space-y-4">
            <div className="bg-cyan-50/80 dark:bg-slate-800/80 p-5 rounded-2xl border-2 border-cyan-100 dark:border-slate-700">
              <div className="text-center py-2 space-y-3">
                <div className="flex flex-col items-center justify-center gap-2 text-center pb-1">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100/90 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800 text-cyan-900 dark:text-cyan-200 shadow-xs">
                    <span className="text-xs sm:text-sm font-bold">สมบัติเลขยกกำลังของผลหาร:</span>
                    <MathView expression="\left(\frac{a}{b}\right)^n = \frac{a^n}{b^n} \quad (b \neq 0)" large />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                    กระจายเลขชี้กำลังเข้าไปให้กับทั้งตัวเศษและตัวส่วน (โดยที่ตัวส่วน b ≠ 0)
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-slate-800 dark:text-white py-1">
                  <span className="bg-white dark:bg-slate-700 px-4 py-2.5 rounded-xl shadow-xs border border-cyan-200 dark:border-slate-600 inline-flex items-center justify-center min-h-[52px]">
                    <MathView expression={`\\left(\\frac{${baseA}}{${baseB}}\\right)^{${expN}}`} large />
                  </span>
                  <span className="text-lg font-bold text-cyan-500 select-none">=</span>
                  <span className="bg-white dark:bg-slate-700 px-4 py-2.5 rounded-xl shadow-xs border border-cyan-200 dark:border-slate-600 text-cyan-700 dark:text-cyan-300 inline-flex items-center justify-center min-h-[52px]">
                    <MathView expression={`\\frac{${baseA}^{${expN}}}{${baseB}^{${expN}}}`} large />
                  </span>
                  <span className="text-lg font-bold text-cyan-500 select-none">=</span>
                  <span className="bg-cyan-600 text-white px-4 py-2.5 rounded-xl shadow-xs font-black text-lg inline-flex items-center justify-center min-h-[52px]">
                    {expN >= 0 ? (
                      <MathView expression={`\\frac{${safePow(baseA, expN).toLocaleString()}}{${safePow(baseB, expN).toLocaleString()}}`} large className="text-white" />
                    ) : (
                      <MathView expression={`\\left(\\frac{${baseB}}{${baseA}}\\right)^{${Math.abs(expN)}} = \\frac{${safePow(baseB, Math.abs(expN)).toLocaleString()}}{${safePow(baseA, Math.abs(expN)).toLocaleString()}}`} large className="text-white" />
                    )}
                  </span>
                </div>

                {expN < 0 && (
                  <div className="text-xs sm:text-sm text-cyan-800 dark:text-cyan-200 font-medium bg-cyan-100/80 dark:bg-cyan-950/60 p-3 rounded-xl border border-cyan-200 dark:border-cyan-800 flex items-center justify-center gap-2 flex-wrap text-center">
                    <span className="font-bold">💡 เมื่อเศษส่วนยกกำลังติดลบ:</span>
                    <span>สามารถสลับเศษเป็นส่วนแล้วเปลี่ยนเลขชี้กำลังเป็นบวก</span>
                    <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 font-bold text-cyan-700 dark:text-cyan-300 shadow-2xs border border-cyan-200 dark:border-slate-700">
                      <MathView expression="\left(\frac{a}{b}\right)^{-n} = \left(\frac{b}{a}\right)^n" />
                    </span>
                  </div>
                )}
              </div>

              {showExpansion && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-3"
                >
                  <p className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-500" /> ทำไมถึงเป็นแบบนี้? (ดูหลักการคิด):
                  </p>
                  <div className="text-slate-700 dark:text-slate-200 bg-[#F8FAFC] dark:bg-slate-800/80 p-3.5 rounded-xl overflow-x-auto leading-relaxed border border-slate-100 dark:border-slate-700 space-y-2">
                    {expN > 0 ? (
                      <div>
                        <p className="font-semibold text-cyan-700 dark:text-cyan-300 mb-1">กระจายผลคูณของเศษส่วน:</p>
                        <p className="inline-flex items-center gap-2 flex-wrap">
                          <span>คูณเศษส่วนซ้ำกัน {expN} ครั้ง:</span>
                          <span className="font-bold text-cyan-700 dark:text-cyan-300">
                            {Array(expN).fill(`(${baseA}/${baseB})`).join(" × ")}
                          </span>
                          <span>=</span>
                          <span>เศษคูณเศษ ({Array(expN).fill(baseA).join(" × ")}) ส่วนคูณส่วน ({Array(expN).fill(baseB).join(" × ")})</span>
                          <span>=</span>
                          <MathView expression={`\\frac{${baseA}^{${expN}}}{${baseB}^{${expN}}}`} />
                        </p>
                      </div>
                    ) : expN === 0 ? (
                      <p>
                        เศษส่วนทั้งก้อนยกกำลังศูนย์: มีค่าเท่ากับ <span className="font-bold text-emerald-600">1</span> เสมอ เมื่อตัวส่วนไม่เท่ากับ 0
                      </p>
                    ) : (
                      <div className="space-y-1">
                        <p className="font-semibold text-cyan-700 dark:text-cyan-300">กรณีเลขชี้กำลังติดลบ:</p>
                        <p>
                          สลับตัวเศษและตัวส่วน: <MathView expression={`\\left(\\frac{${baseA}}{${baseB}}\\right)^{${expN}} = \\left(\\frac{${baseB}}{${baseA}}\\right)^{${Math.abs(expN)}} = \\frac{${safePow(baseB, Math.abs(expN)).toLocaleString()}}{${safePow(baseA, Math.abs(expN)).toLocaleString()}}`} />
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white dark:bg-[#1E293B] p-3.5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
                <label className="text-xs font-bold text-slate-500 flex justify-between">
                  <span>ตัวเศษ (a)</span>
                  <span className="text-cyan-600 font-bold">{baseA}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={baseA}
                  onChange={(e) => setBaseA(Number(e.target.value))}
                  className="w-full mt-2 accent-cyan-600"
                />
              </div>

              <div className="bg-white dark:bg-[#1E293B] p-3.5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
                <label className="text-xs font-bold text-slate-500 flex justify-between">
                  <span>ตัวส่วน (b ≠ 0)</span>
                  <span className="text-cyan-600 font-bold">{baseB}</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={baseB}
                  onChange={(e) => setBaseB(Number(e.target.value))}
                  className="w-full mt-2 accent-cyan-600"
                />
              </div>

              <div className="bg-white dark:bg-[#1E293B] p-3.5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
                {renderExponentBadge(expN, "เลขชี้กำลัง (n)", "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/70 dark:text-cyan-300")}
                <input
                  type="range"
                  min="-3"
                  max="4"
                  value={expN}
                  onChange={(e) => setExpN(Number(e.target.value))}
                  className="w-full mt-2 accent-cyan-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5 mt-1">
                  <span>-3</span>
                  <span>0</span>
                  <span>+4</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case "rule-zero-negative-power": {
        const absM = Math.abs(expM);
        const powVal = safePow(baseA, absM);

        return (
          <div className="space-y-4">
            <div className="bg-rose-50/80 dark:bg-slate-800/80 p-5 rounded-2xl border-2 border-rose-100 dark:border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xs border-2 border-rose-100 dark:border-slate-700 space-y-2">
                  <span className="text-xs font-bold text-rose-500 uppercase flex items-center justify-center gap-1.5">
                    <span>สมบัติยกกำลังศูนย์</span>
                    <MathView expression="a^0 = 1" />
                  </span>
                  <div className="text-2xl font-black text-slate-800 dark:text-white">
                    <MathView expression={`${baseA}^{0} = 1`} large />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">จำนวนจริงใดๆ ที่ไม่ใช่ศูนย์ เมื่อยกกำลัง 0 มีค่าเท่ากับ 1 เสมอ</p>
                </div>

                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xs border-2 border-rose-100 dark:border-slate-700 space-y-2">
                  <span className="text-xs font-bold text-rose-500 uppercase flex items-center justify-center gap-1.5">
                    <span>สมบัติเลขชี้กำลังติดลบ</span>
                    <MathView expression="a^{-n} = \frac{1}{a^n}" />
                  </span>
                  <div className="text-xl font-black text-slate-800 dark:text-white">
                    {expM < 0 ? (
                      <MathView expression={`${baseA}^{${expM}} = \\frac{1}{${baseA}^{${absM}}} = \\frac{1}{${powVal}}`} large />
                    ) : expM === 0 ? (
                      <MathView expression={`${baseA}^0 = 1`} large />
                    ) : (
                      <MathView expression={`${baseA}^{-${expM}} = \\frac{1}{${baseA}^{${expM}}} = \\frac{1}{${powVal}}`} large />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">เลขชี้กำลังติดลบ ให้ย้ายมาเป็นตัวส่วนด้านล่างด้วยเลขชี้กำลังบวก</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white dark:bg-[#1E293B] p-3.5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
                <label className="text-xs font-bold text-slate-500 flex justify-between">
                  <span>ฐาน (a)</span>
                  <span className="text-rose-600 font-bold">{baseA}</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="7"
                  value={baseA}
                  onChange={(e) => setBaseA(Number(e.target.value))}
                  className="w-full mt-2 accent-rose-600"
                />
              </div>

              <div className="bg-white dark:bg-[#1E293B] p-3.5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
                {renderExponentBadge(expM, "ปรับเลขชี้กำลัง (เลื่อนดูลบ-ศูนย์-บวก)", "bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300")}
                <input
                  type="range"
                  min="-5"
                  max="5"
                  value={expM}
                  onChange={(e) => setExpM(Number(e.target.value))}
                  className="w-full mt-2 accent-rose-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5 mt-1">
                  <span>-5 (ติดลบ)</span>
                  <span>0 (กำลังศูนย์)</span>
                  <span>+5 (จำนวนบวก)</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case "rule-scientific-notation": {
        const standardValue = sciCoeff * Math.pow(10, sciExp);
        const formattedStd = sciExp >= 0 
          ? standardValue.toLocaleString("en-US", { maximumFractionDigits: 10 })
          : standardValue.toFixed(Math.abs(sciExp) + 2).replace(/0+$/, "");

        return (
          <div className="space-y-4">
            <div className="bg-violet-50/80 dark:bg-slate-800/80 p-5 rounded-2xl border-2 border-violet-100 dark:border-slate-700">
              <div className="text-center py-2 space-y-3">
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-violet-600 dark:text-violet-400">
                  <span>สัญกรณ์วิทยาศาสตร์:</span>
                  <MathView expression="A \times 10^n \quad (1 \le A < 10)" />
                </div>
                <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-slate-800 dark:text-white">
                  <div className="bg-white dark:bg-slate-700 px-4 py-1.5 rounded-xl shadow-xs border border-violet-200 dark:border-slate-600">
                    <MathView expression={`${sciCoeff} \\times 10^{${sciExp}}`} large />
                  </div>
                  <span className="text-base font-bold text-violet-500">=</span>
                  <div className="bg-violet-600 text-white px-4 py-1.5 rounded-xl shadow-xs font-black text-base md:text-lg">
                    {formattedStd}
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {sciExp >= 0 ? "เลขชี้กำลังบวกแทนจำนวนค่ามาก" : "เลขชี้กำลังลบแทนจำนวนค่าน้อยมากๆ (ทศนิยม)"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white dark:bg-[#1E293B] p-3.5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
                <label className="text-xs font-bold text-slate-500 flex justify-between">
                  <span>สัมประสิทธิ์ A (1 ≤ A &lt; 10)</span>
                  <span className="text-violet-600 font-bold">{sciCoeff}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="9.9"
                  step="0.1"
                  value={sciCoeff}
                  onChange={(e) => setSciCoeff(Number(e.target.value))}
                  className="w-full mt-2 accent-violet-600"
                />
              </div>

              <div className="bg-white dark:bg-[#1E293B] p-3.5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
                {renderExponentBadge(sciExp, "เลขชี้กำลัง n (จำนวนเต็มลบ - บวก)", "bg-violet-100 text-violet-700 dark:bg-violet-950/70 dark:text-violet-300")}
                <input
                  type="range"
                  min="-6"
                  max="8"
                  value={sciExp}
                  onChange={(e) => setSciExp(Number(e.target.value))}
                  className="w-full mt-2 accent-violet-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5 mt-1">
                  <span>-6 (ทศนิยม)</span>
                  <span>0</span>
                  <span>+8 (จำนวนมาก)</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case "rule-mixed-applications": {
        const primeBase = baseA === 2 ? 2 : baseA === 3 ? 3 : 5;
        const primeExp = 2;
        const compBase = Math.pow(primeBase, primeExp);
        const totalExp = primeExp * expN;
        const resultVal = safePow(primeBase, totalExp);

        return (
          <div className="space-y-4">
            <div className="bg-amber-50/80 dark:bg-slate-800/80 p-5 rounded-2xl border-2 border-amber-100 dark:border-slate-700">
              <div className="text-center py-2 space-y-3">
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400">
                  <span>เทคนิค ม.2: การแปลงฐานประกอบเป็นฐานจำนวนเฉพาะ</span>
                  <MathView expression="c^n = (a^k)^n = a^{kn}" />
                </div>
                <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-slate-800 dark:text-white">
                  <span className="bg-white dark:bg-slate-700 px-3.5 py-1.5 rounded-xl shadow-xs border border-amber-200 dark:border-slate-600">
                    <MathView expression={`${compBase}^{${expN}}`} large />
                  </span>
                  <span className="text-base font-bold text-amber-500">=</span>
                  <span className="bg-white dark:bg-slate-700 px-3.5 py-1.5 rounded-xl shadow-xs border border-amber-200 dark:border-slate-600 text-amber-700 dark:text-amber-300">
                    <MathView
                      expression={`(${primeBase}^{${primeExp}})^{${expN < 0 ? `(${expN})` : expN}}`}
                      large
                    />
                  </span>
                  <span className="text-base font-bold text-amber-500">=</span>
                  <span className="bg-amber-500 text-white px-4 py-1.5 rounded-xl shadow-xs font-black">
                    <MathView expression={`${primeBase}^{${totalExp}}`} large />
                  </span>
                  <span className="text-base font-bold text-slate-400">=</span>
                  <span className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 px-3.5 py-1.5 rounded-xl font-black text-base md:text-lg">
                    {totalExp >= 0 ? (
                      resultVal.toLocaleString()
                    ) : (
                      <MathView expression={`\\frac{1}{${primeBase}^{${Math.abs(totalExp)}}} = \\frac{1}{${safePow(primeBase, Math.abs(totalExp))}}`} />
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white dark:bg-[#1E293B] p-3.5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
                <label className="text-xs font-bold text-slate-500 flex justify-between">
                  <span>เลือกฐานจำนวนเฉพาะ</span>
                  <span className="text-amber-600 font-bold">{primeBase} (ฐานประกอบ: {compBase})</span>
                </label>
                <div className="flex gap-2 mt-2">
                  {[2, 3, 5].map((p) => (
                    <button
                      key={p}
                      onClick={() => setBaseA(p)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        baseA === p
                          ? "bg-amber-500 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      ฐาน {p} ({p}² = {p * p})
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-[#1E293B] p-3.5 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs">
                {renderExponentBadge(expN, "เลขชี้กำลัง n", "bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300")}
                <input
                  type="range"
                  min="-4"
                  max="5"
                  value={expN}
                  onChange={(e) => setExpN(Number(e.target.value))}
                  className="w-full mt-2 accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5 mt-1">
                  <span>-4</span>
                  <span>0</span>
                  <span>+5</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      default:
        return (
          <div className="p-4 bg-indigo-50 dark:bg-slate-800 rounded-2xl text-center">
            <p className="text-sm text-indigo-700 dark:text-indigo-300 font-medium">
              💡 ทดลองคลิกปรับตัวแปรและดูการเปลี่ยนแปลงของเลขยกกำลังได้แบบเรียลไทม์
            </p>
          </div>
        );
    }
  };

  return (
    <div className="rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 bg-[#F8FAFC]/50 dark:bg-slate-900/50 p-4 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          ห้องทดลองปรับตัวแปร (Interactive Formula Sandbox)
        </h4>
        <button
          onClick={() => setShowExpansion(!showExpansion)}
          className="text-xs font-bold text-[#6366F1] dark:text-indigo-400 hover:underline flex items-center gap-1 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1.5 rounded-xl border border-indigo-100 dark:border-indigo-900"
        >
          <Eye className="w-3.5 h-3.5" />
          {showExpansion ? "ซ่อนวิธีกระจาย" : "ดูวิธีกระจาย"}
        </button>
      </div>

      {renderSandbox()}
    </div>
  );
};


