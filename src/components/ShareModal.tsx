import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Share2,
  Copy,
  Check,
  X,
  ExternalLink,
  MessageCircle,
  Facebook,
  Twitter,
  Sparkles,
  Award,
  CheckCircle2
} from "lucide-react";
import {
  ShareDataPayload,
  executeWebShare,
  copyToClipboard,
  getSocialShareLinks,
  isWebShareSupported
} from "../utils/shareUtils";
import confetti from "canvas-confetti";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  payload: ShareDataPayload | null;
  badgeEmoji?: string;
  categoryLabel?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  payload,
  badgeEmoji = "🎉",
  categoryLabel = "แชร์ความสำเร็จ",
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState<boolean>(false);

  if (!isOpen || !payload) return null;

  const webShareAvailable = isWebShareSupported();
  const socialLinks = getSocialShareLinks(payload);

  const handleNativeShare = async () => {
    setIsSharing(true);
    const result = await executeWebShare(payload);
    setIsSharing(false);

    if (result.success) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });

      if (result.method === "web-share") {
        setShareFeedback("เปิดหน้าต่างแชร์ของอุปกรณ์เรียบร้อยแล้ว ✨");
      } else if (result.method === "clipboard") {
        setCopied(true);
        setShareFeedback("คัดลอกข้อความและลิงก์ความสำเร็จลงคลิปบอร์ดแล้ว! 📋");
        setTimeout(() => setCopied(false), 3000);
      }
      setTimeout(() => setShareFeedback(null), 4000);
    } else if (result.method === "aborted") {
      // User cancelled, no error
    } else {
      // Fallback
      await handleCopy();
    }
  };

  const handleCopy = async () => {
    const fullText = `${payload.title}\n\n${payload.text}\n\n🔗 ${payload.url || window.location.href}`;
    const success = await copyToClipboard(fullText);
    if (success) {
      setCopied(true);
      setShareFeedback("คัดลอกข้อความและลิงก์ความสำเร็จเรียบร้อยแล้ว!");
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
      });
      setTimeout(() => {
        setCopied(false);
        setShareFeedback(null);
      }, 3500);
    }
  };

  const handleOpenSocial = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full max-w-lg bg-white dark:bg-[#1E293B] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative"
      >
        {/* Top Accent Ribbon */}
        <div className="h-2 bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600" />

        {/* Close Button */}
        <button
          id="btn-close-share-modal"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10"
          aria-label="ปิดหน้าต่าง"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-3xl shadow-xs mb-1">
              {badgeEmoji}
            </div>
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-extrabold text-[11px] uppercase tracking-wider">
              {categoryLabel}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              แชร์ความสำเร็จลงโซเชียล
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              ส่งต่อคะแนนและเหรียญเกียรติยศ เพื่อเป็นแรงบันดาลใจให้เพื่อนร่วมห้อง
            </p>
          </div>

          {/* Share Preview Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pb-2 border-b border-slate-200/60 dark:border-slate-700/60">
              <span className="font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                ตัวอย่างข้อความแชร์
              </span>
              <span className="text-[10px] bg-slate-200/60 dark:bg-slate-700/60 px-2 py-0.5 rounded-md font-mono">
                Web Share
              </span>
            </div>

            <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto pr-1">
              {payload.text}
            </div>

            <div className="pt-2 text-[11px] text-indigo-600 dark:text-indigo-400 font-mono truncate flex items-center gap-1">
              <span className="text-slate-400">🔗</span>
              <span>{payload.url || window.location.href}</span>
            </div>
          </div>

          {/* Feedback Toast */}
          <AnimatePresence>
            {shareFeedback && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-xs font-bold"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>{shareFeedback}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Primary Action Button (Native Web Share API) */}
          <div className="space-y-3">
            <button
              type="button"
              id="btn-native-web-share"
              disabled={isSharing}
              onClick={handleNativeShare}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-indigo-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 group"
            >
              <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>
                {webShareAvailable ? "แชร์ผ่านอุปกรณ์ (Web Share API)" : "แชร์ความสำเร็จนี้"}
              </span>
            </button>

            {/* Quick Copy Button */}
            <button
              type="button"
              id="btn-copy-share-text"
              onClick={handleCopy}
              className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">คัดลอกข้อความและลิงก์เรียบร้อยแล้ว</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>คัดลอกข้อความและลิงก์ความสำเร็จ</span>
                </>
              )}
            </button>
          </div>

          {/* Social Platform Direct Buttons */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 text-center mb-3">
              หรือเลือกแชร์ไปยังแอปที่คุณต้องการโดยตรง
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {/* LINE */}
              <button
                type="button"
                id="btn-share-line"
                onClick={() => handleOpenSocial(socialLinks.line)}
                className="py-2.5 px-3 rounded-2xl bg-[#06C755]/10 hover:bg-[#06C755]/20 text-[#06C755] border border-[#06C755]/30 font-bold text-xs flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-colors"
                title="แชร์ไปยัง LINE"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>LINE</span>
              </button>

              {/* Facebook */}
              <button
                type="button"
                id="btn-share-facebook"
                onClick={() => handleOpenSocial(socialLinks.facebook)}
                className="py-2.5 px-3 rounded-2xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/30 font-bold text-xs flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-colors"
                title="แชร์ไปยัง Facebook"
              >
                <Facebook className="w-4 h-4 fill-current" />
                <span>Facebook</span>
              </button>

              {/* X / Twitter */}
              <button
                type="button"
                id="btn-share-twitter"
                onClick={() => handleOpenSocial(socialLinks.twitter)}
                className="py-2.5 px-3 rounded-2xl bg-slate-800/10 dark:bg-slate-700/40 hover:bg-slate-800/20 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 font-bold text-xs flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-colors"
                title="แชร์ไปยัง X (Twitter)"
              >
                <Twitter className="w-4 h-4 fill-current" />
                <span>X (Twitter)</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ShareModal;
