import React, { useState, useEffect, useRef } from "react";
import { Question, DuelPlayer } from "../types";
import { QUESTION_BANK } from "../data/questions";
import { MathView } from "./MathView";
import { FormattedMathText } from "./FormattedMathText";
import confetti from "canvas-confetti";
import {
  Swords,
  Shield,
  Snowflake,
  Zap,
  Scissors,
  Trophy,
  Flame,
  Bot,
  User,
  Heart,
  RotateCcw,
  Sparkles,
  Timer
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DuelModeProps {
  onDuelEnded: (won: boolean, xpEarned: number) => void;
  userXP: number;
}

export const DuelMode: React.FC<DuelModeProps> = ({ onDuelEnded, userXP }) => {
  const [gameMode, setGameMode] = useState<"bot" | "local">("bot");
  const [botDifficulty, setBotDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [gameState, setGameState] = useState<"lobby" | "playing" | "gameover">("lobby");

  const [player1, setPlayer1] = useState<DuelPlayer>({
    id: "p1",
    name: "คุณ (Player 1)",
    avatar: "🦸‍♂️",
    hp: 100,
    maxHp: 100,
    score: 0,
    combo: 0,
    powerUps: { shield: 1, freeze: 1, doubleScore: 1, fiftyFifty: 1 },
  });

  const [player2, setPlayer2] = useState<DuelPlayer>({
    id: "p2",
    name: "พี่เจ็ท ม.2 (Top Class AI)",
    avatar: "🤖",
    hp: 100,
    maxHp: 100,
    score: 0,
    combo: 0,
    isBot: true,
    powerUps: { shield: 1, freeze: 1, doubleScore: 1, fiftyFifty: 1 },
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [hiddenOptions, setHiddenOptions] = useState<string[]>([]);
  const [doubleScoreActive, setDoubleScoreActive] = useState<boolean>(false);
  const [shieldActive, setShieldActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [isFrozen, setIsFrozen] = useState<boolean>(false);

  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);

  const timerRef = useRef<any>(null);

  // Initialize questions
  const startGame = () => {
    const shuffled = [...QUESTION_BANK].sort(() => 0.5 - Math.random()).slice(0, 10);
    setQuestions(shuffled);
    setCurrentQIndex(0);

    const botName =
      botDifficulty === "easy"
        ? "น้องม่อน ม.1 (ฝึกหัด)"
        : botDifficulty === "medium"
        ? "พี่เจ็ท ม.2 (ตัวตึงห้องกิฟต์)"
        : "ดร.พาวเวอร์ (บอทไอน์สไตน์)";

    const botAvatar = botDifficulty === "easy" ? "🐣" : botDifficulty === "medium" ? "🤖" : "🧙‍♂️";

    setPlayer1({
      id: "p1",
      name: "คุณ",
      avatar: "🌟",
      hp: 100,
      maxHp: 100,
      score: 0,
      combo: 0,
      powerUps: { shield: 1, freeze: 1, doubleScore: 1, fiftyFifty: 1 },
    });

    setPlayer2({
      id: "p2",
      name: gameMode === "bot" ? botName : "เพื่อน (Player 2)",
      avatar: gameMode === "bot" ? botAvatar : "🎮",
      hp: 100,
      maxHp: 100,
      score: 0,
      combo: 0,
      isBot: gameMode === "bot",
      powerUps: { shield: 1, freeze: 1, doubleScore: 1, fiftyFifty: 1 },
    });

    setBattleLog(["⚔️ การดวลเริ่มต้นขึ้นแล้ว! ขอพลังเลขยกกำลังจงสถิตกับท่าน"]);
    setHiddenOptions([]);
    setDoubleScoreActive(false);
    setShieldActive(false);
    setTimeLeft(15);
    setWinner(null);
    setGameState("playing");
  };

  // Timer loop
  useEffect(() => {
    if (gameState !== "playing") return;

    if (isFrozen) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeOut();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [gameState, isFrozen, currentQIndex]);

  // Bot response simulation
  useEffect(() => {
    if (gameState !== "playing" || !player2.isBot) return;

    const currentQ = questions[currentQIndex];
    if (!currentQ) return;

    // Bot speed and accuracy depends on difficulty
    const botSpeed =
      botDifficulty === "easy"
        ? 8000 + Math.random() * 4000
        : botDifficulty === "medium"
        ? 5000 + Math.random() * 3000
        : 3000 + Math.random() * 2000;

    const botAccuracy = botDifficulty === "easy" ? 0.6 : botDifficulty === "medium" ? 0.8 : 0.95;

    const botTimeout = setTimeout(() => {
      if (gameState !== "playing") return;

      const isBotCorrect = Math.random() < botAccuracy;
      const damage = 20;

      if (isBotCorrect) {
        setPlayer2((p) => ({ ...p, score: p.score + 50, combo: p.combo + 1 }));
        setPlayer1((p) => {
          const newHp = Math.max(0, p.hp - damage);
          if (newHp === 0) endGame("player2");
          return { ...p, hp: newHp };
        });
        setBattleLog((prev) => [
          `🤖 ${player2.name} ตอบถูก! โจมตีคุณลด ${damage} HP`,
          ...prev.slice(0, 4),
        ]);
      } else {
        setBattleLog((prev) => [`🤖 ${player2.name} ตอบผิด! พลาดโอกาสโจมตี`, ...prev.slice(0, 4)]);
      }
    }, botSpeed);

    return () => clearTimeout(botTimeout);
  }, [currentQIndex, gameState]);

  const handleTimeOut = () => {
    setBattleLog((prev) => ["⏰ หมดเวลาในข้อนี้! ไม่มีใครได้คะแนน", ...prev.slice(0, 4)]);
    nextQuestion();
  };

  const handleAnswer = (optionId: string) => {
    if (gameState !== "playing") return;
    const currentQ = questions[currentQIndex];
    if (!currentQ) return;

    const isCorrect = optionId === currentQ.correctAnswer;
    const damage = doubleScoreActive ? 40 : 25;
    const speedBonus = timeLeft > 10 ? 20 : 0;
    const points = (doubleScoreActive ? 100 : 50) + speedBonus;

    if (isCorrect) {
      setPlayer1((p) => ({
        ...p,
        score: p.score + points,
        combo: p.combo + 1,
      }));

      setPlayer2((p) => {
        const newHp = Math.max(0, p.hp - damage);
        if (newHp === 0) endGame("player1");
        return { ...p, hp: newHp };
      });

      setBattleLog((prev) => [
        `⚡ คุณตอบถูกต้อง! โจมตีใส่ ${player2.name} ลด ${damage} HP (คอมโบ x${player1.combo + 1})`,
        ...prev.slice(0, 4),
      ]);
    } else {
      if (shieldActive) {
        setShieldActive(false);
        setBattleLog((prev) => [
          "🛡️ โล่ป้องกันดูดซับดาเมจจากการตอบผิดของคุณ!",
          ...prev.slice(0, 4),
        ]);
      } else {
        setPlayer1((p) => {
          const newHp = Math.max(0, p.hp - 15);
          if (newHp === 0) endGame("player2");
          return { ...p, hp: newHp, combo: 0 };
        });
        setBattleLog((prev) => [
          `💥 คุณตอบผิด! ถูกหัก 15 HP (คำตอบที่ถูกคือ ${currentQ.correctAnswer})`,
          ...prev.slice(0, 4),
        ]);
      }
    }

    setDoubleScoreActive(false);
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setHiddenOptions([]);
      setTimeLeft(15);
    } else {
      // Determine winner by HP / Score
      if (player1.hp > player2.hp || (player1.hp === player2.hp && player1.score > player2.score)) {
        endGame("player1");
      } else {
        endGame("player2");
      }
    }
  };

  const usePowerUp = (type: "shield" | "freeze" | "doubleScore" | "fiftyFifty") => {
    if (player1.powerUps[type] <= 0) return;

    setPlayer1((p) => ({
      ...p,
      powerUps: { ...p.powerUps, [type]: p.powerUps[type] - 1 },
    }));

    const currentQ = questions[currentQIndex];

    if (type === "shield") {
      setShieldActive(true);
      setBattleLog((prev) => ["🛡️ คุณเปิดใช้งาน 'โล่ป้องกัน' (Shield) !", ...prev.slice(0, 4)]);
    } else if (type === "freeze") {
      setIsFrozen(true);
      setBattleLog((prev) => ["❄️ คุณใช้ 'แช่แข็งเวลา' 5 วินาที!", ...prev.slice(0, 4)]);
      setTimeout(() => setIsFrozen(false), 5000);
    } else if (type === "doubleScore") {
      setDoubleScoreActive(true);
      setBattleLog((prev) => ["⚡ คุณใช้ 'Double Attack' ดาเมจและคะแนน x2!", ...prev.slice(0, 4)]);
    } else if (type === "fiftyFifty" && currentQ) {
      const wrongOpts = currentQ.options
        .filter((o) => o.id !== currentQ.correctAnswer)
        .map((o) => o.id)
        .slice(0, 2);
      setHiddenOptions(wrongOpts);
      setBattleLog((prev) => ["✂️ 50:50 ตัดตัวเลือกที่ผิดออก 2 ข้อ!", ...prev.slice(0, 4)]);
    }
  };

  const endGame = (winnerId: string) => {
    setGameState("gameover");
    setWinner(winnerId);
    if (winnerId === "player1") {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      onDuelEnded(true, 100);
    } else {
      onDuelEnded(false, 30);
    }
  };

  const currentQ = questions[currentQIndex];

  return (
    <div className="space-y-6">
      {/* Lobby View Bento */}
      {gameState === "lobby" && (
        <div className="bg-white dark:bg-[#1E293B] rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 p-6 sm:p-10 shadow-xs text-center max-w-2xl mx-auto space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-[#F59E0B] mx-auto flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
            <Swords className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              1v1 Battle Arena : ดวลเลขยกกำลัง
            </h1>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              ท้าประลองความเร็วและความแม่นยำเรื่องสมบัติเลขยกกำลังกับ AI ติวเตอร์ หรือแข่งขันตัวต่อตัวกับเพื่อน
            </p>
          </div>

          {/* Mode Selector */}
          <div className="grid grid-cols-2 gap-3 text-left">
            <button
              onClick={() => setGameMode("bot")}
              className={`p-4 rounded-2xl border-2 transition-all ${
                gameMode === "bot"
                  ? "border-[#F59E0B] bg-[#FFFBEB] dark:bg-amber-950/30 ring-2 ring-amber-500/20"
                  : "border-[#F1F5F9] dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">ดวลกับ AI บ็อท</h4>
                  <p className="text-xs text-slate-400">ฝึกความเร็วกับ AI อัจฉริยะ</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setGameMode("local")}
              className={`p-4 rounded-2xl border-2 transition-all ${
                gameMode === "local"
                  ? "border-[#6366F1] bg-[#EEF2FF] dark:bg-indigo-950/30 ring-2 ring-indigo-500/20"
                  : "border-[#F1F5F9] dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-[#6366F1]">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">ดวลกับเพื่อน</h4>
                  <p className="text-xs text-slate-400">เล่น 2 คนผลัดกันตอบบนเครื่องนี้</p>
                </div>
              </div>
            </button>
          </div>

          {/* Difficulty Level if Bot */}
          {gameMode === "bot" && (
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold text-slate-500">เลือกระดับความเก่งของคู่แข่ง:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "easy", name: "น้องม่อน ม.1", desc: "ระดับฝึกหัด" },
                  { id: "medium", name: "พี่เจ็ท ม.2", desc: "สายแข่งขัน" },
                  { id: "hard", name: "ดร.พาวเวอร์", desc: "ระดับแชมป์" },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setBotDifficulty(d.id as any)}
                    className={`p-3 rounded-2xl border-2 text-center transition-all ${
                      botDifficulty === d.id
                        ? "bg-[#6366F1] text-white border-[#6366F1] font-bold shadow-xs"
                        : "bg-[#F8FAFC] dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-[#F1F5F9] dark:border-slate-700"
                    }`}
                  >
                    <div className="text-xs font-bold">{d.name}</div>
                    <div className="text-[10px] opacity-75">{d.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={startGame}
            className="w-full py-3.5 bg-[#F59E0B] hover:bg-amber-600 text-white rounded-2xl font-extrabold text-base shadow-xs transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <Swords className="w-5 h-5" />
            <span>เริ่มการดวล (Start Battle)</span>
          </button>
        </div>
      )}

      {/* Active Battle Arena View Bento */}
      {gameState === "playing" && currentQ && (
        <div className="space-y-4 max-w-4xl mx-auto">
          {/* Battle Header / Health Bars */}
          <div className="bg-slate-900 text-white p-5 rounded-3xl shadow-md border-2 border-slate-800 space-y-4">
            <div className="grid grid-cols-2 gap-6 items-center">
              {/* Player 1 Status */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{player1.avatar}</span>
                  <div>
                    <h3 className="font-extrabold text-sm">{player1.name}</h3>
                    <div className="text-xs text-amber-400 font-bold">
                      {player1.score} PTS {player1.combo > 1 && `(x${player1.combo} 🔥)`}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="flex items-center gap-1 text-rose-400">
                      <Heart className="w-3 h-3 fill-rose-400" /> HP: {player1.hp}/{player1.maxHp}
                    </span>
                    {shieldActive && <span className="text-blue-400 text-[10px]">🛡️ โล่ป้องกัน</span>}
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <div
                      className="h-full bg-[#10B981] transition-all duration-300"
                      style={{ width: `${(player1.hp / player1.maxHp) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Player 2 Status */}
              <div className="space-y-2 text-right">
                <div className="flex items-center justify-end gap-2">
                  <div>
                    <h3 className="font-extrabold text-sm">{player2.name}</h3>
                    <div className="text-xs text-amber-400 font-bold">
                      {player2.score} PTS {player2.combo > 1 && `(x${player2.combo} 🔥)`}
                    </div>
                  </div>
                  <span className="text-2xl">{player2.avatar}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span></span>
                    <span className="flex items-center gap-1 text-rose-400">
                      HP: {player2.hp}/{player2.maxHp} <Heart className="w-3 h-3 fill-rose-400" />
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <div
                      className="h-full bg-[#F43F5E] transition-all duration-300"
                      style={{ width: `${(player2.hp / player2.maxHp) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Timer & Round Status */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <span className="text-slate-400 font-semibold">
                ข้อ {currentQIndex + 1} / {questions.length}
              </span>

              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-black text-sm ${
                  isFrozen
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400"
                    : timeLeft <= 5
                    ? "bg-rose-500/20 text-rose-400 animate-pulse"
                    : "bg-slate-800 text-white"
                }`}
              >
                <Timer className="w-4 h-4" />
                <span>{isFrozen ? "แช่แข็ง!" : `${timeLeft}s`}</span>
              </div>

              <span className="text-amber-400 font-bold text-xs">{currentQ.topicName}</span>
            </div>
          </div>

          {/* Question Display Bento */}
          <div className="bg-white dark:bg-[#1E293B] rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 p-6 shadow-xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white text-center">
              <FormattedMathText text={currentQ.question} />
            </h2>

            {currentQ.mathExpression && (
              <div className="bg-[#F8FAFC] dark:bg-slate-900 p-4 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 text-center">
                <MathView expression={currentQ.mathExpression} large />
              </div>
            )}

            {/* Power-up Inventory Bar */}
            <div className="flex items-center justify-center gap-2 pt-1 flex-wrap">
              <span className="text-[11px] font-bold text-slate-400 mr-1">ไอเทมช่วยเล่น:</span>

              <button
                onClick={() => usePowerUp("shield")}
                disabled={player1.powerUps.shield <= 0 || shieldActive}
                className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800 flex items-center gap-1 disabled:opacity-40"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>โล่ ({player1.powerUps.shield})</span>
              </button>

              <button
                onClick={() => usePowerUp("freeze")}
                disabled={player1.powerUps.freeze <= 0 || isFrozen}
                className="px-3 py-1 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 text-xs font-bold border border-cyan-200 dark:border-cyan-800 flex items-center gap-1 disabled:opacity-40"
              >
                <Snowflake className="w-3.5 h-3.5" />
                <span>แช่แข็ง ({player1.powerUps.freeze})</span>
              </button>

              <button
                onClick={() => usePowerUp("doubleScore")}
                disabled={player1.powerUps.doubleScore <= 0 || doubleScoreActive}
                className="px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800 flex items-center gap-1 disabled:opacity-40"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>x2 ({player1.powerUps.doubleScore})</span>
              </button>

              <button
                onClick={() => usePowerUp("fiftyFifty")}
                disabled={player1.powerUps.fiftyFifty <= 0 || hiddenOptions.length > 0}
                className="px-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200 dark:border-purple-800 flex items-center gap-1 disabled:opacity-40"
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>50:50 ({player1.powerUps.fiftyFifty})</span>
              </button>
            </div>

            {/* Answer Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentQ.options.map((opt) => {
                const isHidden = hiddenOptions.includes(opt.id);
                if (isHidden) {
                  return (
                    <div
                      key={opt.id}
                      className="p-3.5 rounded-2xl border-2 border-dashed border-[#E2E8F0] dark:border-slate-800 text-slate-300 dark:text-slate-700 text-center text-xs flex items-center justify-center"
                    >
                      (ตัวเลือกนี้ถูกตัดออก)
                    </div>
                  );
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleAnswer(opt.id)}
                    className="p-4 rounded-2xl border-2 border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-[#6366F1] font-bold text-sm sm:text-base flex items-center gap-3 text-left transition-all active:scale-98 shadow-xs"
                  >
                    <span className="w-7 h-7 rounded-xl bg-[#F1F5F9] dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center text-xs font-black">
                      {opt.id}
                    </span>
                    <span className="text-slate-800 dark:text-white">
                      <FormattedMathText text={opt.text} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Battle Feed Log Bento */}
          <div className="p-4 bg-white dark:bg-[#1E293B] rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 shadow-xs text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <span className="font-bold text-slate-500 block mb-1">เหตุการณ์การดวล:</span>
            {battleLog.map((log, idx) => (
              <div key={idx} className="font-mono">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Game Over View Bento */}
      {gameState === "gameover" && (
        <div className="bg-white dark:bg-[#1E293B] rounded-3xl border-2 border-[#F1F5F9] dark:border-slate-800 p-8 text-center max-w-lg mx-auto shadow-xs space-y-6">
          <div className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-4xl bg-[#F59E0B] text-white shadow-lg shadow-amber-500/20">
            {winner === "player1" ? "🏆" : "🥈"}
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {winner === "player1" ? "ชัยชนะเป็นของคุณ! (Victory!)" : "พ่ายแพ้ในการดวลรอบนี้"}
            </h2>
            <p className="text-sm text-slate-500">
              {winner === "player1"
                ? "คุณตอบโจทย์ได้รวดเร็วและแม่นยำมาก รับคะแนนสะสม 100 XP!"
                : "สู้ต่อไป! กลับไปทบทวนสมบัติเลขยกกำลังแล้วมาท้าดวลใหม่"}
            </p>
          </div>

          {/* Score Summary Box */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-[#F8FAFC] dark:bg-slate-900 rounded-2xl border-2 border-[#F1F5F9] dark:border-slate-800 text-sm">
            <div>
              <span className="text-xs text-slate-400 font-semibold block">คะแนนของคุณ</span>
              <span className="text-xl font-extrabold text-[#6366F1]">{player1.score} PTS</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold block">คะแนนของคู่แข่ง</span>
              <span className="text-xl font-extrabold text-slate-600 dark:text-slate-300">{player2.score} PTS</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setGameState("lobby")}
              className="flex-1 py-3 bg-[#F1F5F9] dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-2xl font-bold text-sm transition-colors"
            >
              กลับหน้าห้องดวล
            </button>
            <button
              onClick={startGame}
              className="flex-1 py-3 bg-[#6366F1] hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-xs transition-transform active:scale-95 flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ดวลใหม่อีกครั้ง</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
