import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function AITutorBubble({ onClick, hasNotification, notificationText }) {
  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end">
      {/* Proactive Speech Bubble if Selvi notices struggles */}
      <AnimatePresence>
        {hasNotification && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onClick}
            className="mb-2 max-w-[220px] bg-slate-800 border-2 border-orange-500/80 rounded-2xl p-3 shadow-xl cursor-pointer"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-orange-400 mb-1">
              <Sparkles size={14} />
              <span>Selvi's Tip</span>
            </div>
            <p className="text-xs text-slate-200 leading-tight">
              {notificationText || "Struggling with this stroke? Tap me for a trick!"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Mascot Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={onClick}
        className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 p-0.5 shadow-lg shadow-orange-500/30 flex items-center justify-center border-2 border-slate-900"
      >
        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
          <span className="text-2xl select-none">🦚</span>
          
          {/* Active glow pulse */}
          <div className="absolute inset-0 bg-orange-500/10 animate-pulse rounded-full" />
        </div>

        {/* Notification indicator dot */}
        {hasNotification && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 border-2 border-slate-900 animate-bounce" />
        )}
      </motion.button>
    </div>
  );
}
