import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, Volume2 } from 'lucide-react';
import { Button } from '../ui/Button';

export default function AITutorModal({ isOpen, onClose, currentLetter, initialQuestion = '' }) {
  const [question, setQuestion] = useState(initialQuestion);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedAdvice, setDisplayedAdvice] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialQuestion) {
        handleAsk(initialQuestion);
      } else if (messages.length === 0) {
        // Default greeting
        setMessages([
          {
            sender: 'selvi',
            text: `Vanakam! I'm Selvi, your Tamil AI companion. Ask me anything about '${currentLetter?.letter || 'Tamil script'}', mnemonics, or pronunciation!`
          }
        ]);
      }
    }
  }, [isOpen, initialQuestion, currentLetter]);

  const handleAsk = async (queryText) => {
    const q = queryText || question;
    if (!q.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    setQuestion('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:3001/api/tutor/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          letter: currentLetter?.letter || 'ழ',
          queryType: 'custom_question',
          userQuestion: q
        })
      });

      const data = await res.json();
      const answerText = data.advice || "Keep practicing your stroke curves! Tamil script comes with visual rhythm.";

      // Add Selvi message
      setMessages(prev => [...prev, { sender: 'selvi', text: answerText }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          sender: 'selvi',
          text: `Here's Selvi's tip for ${currentLetter?.letter || 'Tamil letters'}: Focus on smooth continuous stroke movement from left to right!`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 backdrop-blur-sm p-0 sm:p-4">
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-md bg-slate-900 border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/80 sticky top-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <span className="text-xl">🦚</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-slate-100 flex items-center gap-1.5">
                  Selvi AI Tutor
                  <Sparkles size={14} className="text-orange-400" />
                </h3>
                <p className="text-xs text-slate-400">Tamil Script Companion</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Action Chips */}
          <div className="flex gap-2 p-3 overflow-x-auto bg-slate-900/50 border-b border-slate-800/50 no-scrollbar">
            <button
              onClick={() => handleAsk(`How to remember ${currentLetter?.letter || 'this letter'}?`)}
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-800 hover:bg-orange-500/20 border border-slate-700 text-xs font-semibold text-orange-400 transition"
            >
              💡 Give Mnemonic
            </button>
            <button
              onClick={() => handleAsk(`How is ழ different from ள and ல?`)}
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-800 hover:bg-orange-500/20 border border-slate-700 text-xs font-semibold text-orange-400 transition"
            >
              👅 ழ vs ள vs ல
            </button>
            <button
              onClick={() => handleAsk(`What is the Pulli dot on top?`)}
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-800 hover:bg-orange-500/20 border border-slate-700 text-xs font-semibold text-orange-400 transition"
            >
              • Pulli Dot Rule
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'selvi' && (
                  <div className="w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    🦚
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-3.5 text-sm ${
                    msg.sender === 'user'
                      ? 'bg-orange-500 text-white rounded-br-none font-medium shadow-sm'
                      : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-bl-none leading-relaxed'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>
                  
                  {msg.sender === 'selvi' && (
                    <button
                      onClick={() => speakText(msg.text)}
                      className="mt-2 flex items-center gap-1 text-xs text-orange-400 hover:underline font-semibold"
                    >
                      <Volume2 size={13} /> Listen
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic p-2">
                <span className="animate-spin">✨</span> Selvi is thinking...
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-slate-800 bg-slate-900 flex items-center gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder={`Ask Selvi about ${currentLetter?.letter || 'Tamil'}...`}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
            <Button
              variant="primary"
              size="icon"
              onClick={() => handleAsk()}
              disabled={isLoading || !question.trim()}
              className="rounded-xl w-10 h-10"
            >
              <Send size={16} />
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
