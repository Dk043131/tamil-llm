import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Heart, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import useStore from '../store/useStore';
import { tamilScriptData } from '../data/scriptData';
import AITutorBubble from '../components/tutor/AITutorBubble';
import AITutorModal from '../components/tutor/AITutorModal';

export default function Lesson() {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const addXp = useStore(state => state.addXp);
  const user = useStore(state => state.user);

  // Lesson queue based on unit
  const lessonQueue = unitId === 'unit_2' ? tamilScriptData.consonants : tamilScriptData.vowels;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentLetter = lessonQueue[currentIndex] || lessonQueue[0];

  const [progress, setProgress] = useState(0);
  const [isTracing, setIsTracing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  
  // Selvi AI Tutor States
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [proactiveTip, setProactiveTip] = useState(null);
  const [initialQuestion, setInitialQuestion] = useState('');
  const [showReward, setShowReward] = useState(false);

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    initCanvas();
  }, [currentIndex]);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#f97316'; // Orange stroke

    ctxRef.current = ctx;
    setHasDrawn(false);
  };

  const startDrawing = (e) => {
    const { offsetX, offsetY } = getCoordinates(e);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsTracing(true);
    setHasDrawn(true);
  };

  const draw = (e) => {
    if (!isTracing) return;
    const { offsetX, offsetY } = getCoordinates(e);
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    if (isTracing) {
      ctxRef.current.closePath();
      setIsTracing(false);
    }
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    if (e.touches && e.touches.length > 0) {
      return {
        offsetX: e.touches[0].clientX - rect.left,
        offsetY: e.touches[0].clientY - rect.top
      };
    }
    return {
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY
    };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (ctxRef.current && canvas) {
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
      setHasDrawn(false);
    }
  };

  const speakLetter = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentLetter.name);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCheck = () => {
    // Increment stroke attempt count
    const nextAttempts = attemptCount + 1;
    setAttemptCount(nextAttempts);

    // AI Tutor Proactive Trigger: If 2 or more attempts without clean draw, notify via Selvi
    if (!hasDrawn || nextAttempts >= 2) {
      const tipText = `Struggling with ${currentLetter.letter}? ${currentLetter.mnemonic}`;
      setProactiveTip(tipText);
    }

    if (!hasDrawn) {
      return;
    }

    // Advance to next letter or finish
    const nextProgress = ((currentIndex + 1) / lessonQueue.length) * 100;
    setProgress(nextProgress);

    if (currentIndex + 1 < lessonQueue.length) {
      setCurrentIndex(prev => prev + 1);
      setAttemptCount(0);
      setProactiveTip(null);
    } else {
      // Lesson Complete
      finishLesson();
    }
  };

  const finishLesson = () => {
    setTimeout(() => {
      setShowReward(true);
      if (user?.id && user.id !== 'local_guest') {
        fetch('http://localhost:3001/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: user.id,
            event_type: 'script_lesson_completed',
            payload: { unitId },
            xp_earned: 20
          })
        }).catch(err => console.error(err));
      }
      addXp(20);
    }, 400);
  };

  const openTutorWithQuestion = (q = '') => {
    setInitialQuestion(q);
    setIsTutorOpen(true);
    setProactiveTip(null);
  };

  if (showReward) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-900 px-6 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 12 }}
        >
          <div className="w-32 h-32 rounded-full bg-orange-500/20 flex items-center justify-center mb-6 mx-auto border-2 border-orange-500/50">
            <span className="text-6xl">🦚</span>
          </div>
          <h2 className="text-3xl font-black text-white mb-2">Lesson Mastered!</h2>
          <p className="text-slate-400 text-sm mb-2">Selvi is proud of your progress!</p>
          <p className="text-orange-400 font-bold text-2xl mb-10">+20 XP Earned</p>

          <Button className="w-full" size="lg" onClick={() => navigate('/')}>
            Back to Map
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 relative">
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 glass-panel sticky top-0 z-20">
        <button onClick={() => navigate('/')} className="p-2 text-slate-400 hover:text-white">
          <X size={24} />
        </button>

        <div className="flex-1 mx-4 h-3 bg-slate-800 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-orange-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-1 text-red-500 font-bold">
          <Heart size={20} className="fill-red-500" />
          <span>5</span>
        </div>
      </div>

      {/* Main Lesson Content */}
      <div className="flex-1 flex flex-col items-center pt-6 px-6 pb-28 overflow-y-auto">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">
            {currentLetter.type === 'uyir' ? 'Uyir (Vowel)' : 'Mei (Consonant)'}
          </span>
          <button
            onClick={speakLetter}
            className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-orange-400"
          >
            <Volume2 size={18} />
          </button>
        </div>

        <h2 className="text-2xl font-black text-white mb-1">Trace the letter</h2>
        <p className="text-slate-400 text-sm mb-6">{currentLetter.sound}</p>

        {/* Tracing Canvas Card */}
        <div className="relative w-full aspect-square max-w-[280px] bg-slate-800 rounded-3xl border-2 border-slate-700 overflow-hidden shadow-2xl mb-4">
          {/* Watermark Reference */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 text-slate-100">
            <span className="text-[170px] font-black font-sans leading-none select-none">
              {currentLetter.letter}
            </span>
          </div>

          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>

        {/* Canvas Toolbar & Tap-To-Ask Selvi */}
        <div className="w-full max-w-[280px] flex items-center justify-between gap-2 mb-4">
          <button
            onClick={clearCanvas}
            className="text-xs font-bold text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg bg-slate-800/80"
          >
            Clear Stroke
          </button>

          <button
            onClick={() => openTutorWithQuestion(`Give me a tip for ${currentLetter.letter}`)}
            className="flex items-center gap-1.5 text-xs font-bold text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 px-3 py-1.5 rounded-lg border border-orange-500/30"
          >
            <Sparkles size={13} />
            Ask Selvi
          </button>
        </div>

        {/* Mnemonic Banner */}
        <div className="w-full max-w-[280px] bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3 text-xs text-slate-300 leading-relaxed flex gap-2 items-start">
          <span className="text-base">💡</span>
          <div>
            <span className="font-bold text-slate-200 block mb-0.5">Selvi's Mnemonic</span>
            {currentLetter.mnemonic}
          </div>
        </div>
      </div>

      {/* Floating AI Companion Mascot */}
      <AITutorBubble
        onClick={() => openTutorWithQuestion(proactiveTip || '')}
        hasNotification={!!proactiveTip}
        notificationText={proactiveTip}
      />

      {/* Interactive AI Tutor Dialog */}
      <AITutorModal
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        currentLetter={currentLetter}
        initialQuestion={initialQuestion}
      />

      {/* Bottom Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 flex gap-4 max-w-md mx-auto z-20">
        <Button
          variant="primary"
          size="lg"
          className="flex-1"
          onClick={handleCheck}
        >
          {currentIndex + 1 < lessonQueue.length ? (
            <span className="flex items-center gap-2">
              Next Letter <ArrowRight size={18} />
            </span>
          ) : (
            'Complete Lesson'
          )}
        </Button>
      </div>
    </div>
  );
}
