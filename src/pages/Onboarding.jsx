import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import useStore from '../store/useStore';

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState('');
  const [isZero, setIsZero] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      const placementScore = isZero ? 0 : 60; // Mock score logic
      const response = await fetch('http://localhost:3001/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal_type: goal || 'casual', placement_score: placementScore })
      });
      const data = await response.json();
      setUser(data);
      navigate('/');
    } catch (error) {
      console.error('Error creating session', error);
      // Fallback for local UI demo without server running
      setUser({
        id: 'local_guest',
        goal_type: goal || 'casual',
        placement_score: isZero ? 0 : 60,
        starting_unit_id: isZero ? 'unit_1' : 'unit_2',
        xp: 0,
        streak: 0
      });
      navigate('/');
    }
  };

  const steps = [
    // Step 0: Intro
    <motion.div
      key="step-0"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-center text-center h-full pt-20"
    >
      <h1 className="text-4xl font-black mb-4 text-gradient">Vanakam!</h1>
      <p className="text-slate-400 text-lg mb-12 max-w-[280px]">
        Welcome to the Tamil Learning App. Master the language module by module.
      </p>
      
      <div className="w-48 h-48 rounded-full bg-slate-800 flex items-center justify-center mb-12 shadow-[0_0_40px_rgba(249,115,22,0.2)]">
        <span className="text-8xl">அ</span>
      </div>

      <div className="mt-auto w-full p-6">
        <Button className="w-full" size="lg" onClick={() => setStep(1)}>
          Get Started
        </Button>
      </div>
    </motion.div>,

    // Step 1: Goal
    <motion.div
      key="step-1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full pt-12 px-6"
    >
      <h2 className="text-3xl font-black mb-2">Why are you learning Tamil?</h2>
      <p className="text-slate-400 mb-8">This helps us personalize your journey.</p>
      
      <div className="flex flex-col gap-4">
        {['Speak with family', 'Casual learner', 'Exam prep'].map((g) => (
          <button
            key={g}
            onClick={() => { setGoal(g); setStep(2); }}
            className="flex items-center p-4 border-2 border-slate-700 rounded-2xl bg-slate-800/50 hover:border-orange-500 hover:bg-orange-500/10 transition-all text-left text-lg font-bold"
          >
            {g}
          </button>
        ))}
      </div>
    </motion.div>,

    // Step 2: Placement
    <motion.div
      key="step-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full pt-12 px-6"
    >
      <h2 className="text-3xl font-black mb-2">What's your current level?</h2>
      <p className="text-slate-400 mb-8">Let's find the right starting point.</p>
      
      <div className="flex flex-col gap-4">
        <button
          onClick={() => { setIsZero(true); handleComplete(); }}
          disabled={isLoading}
          className="flex flex-col items-start p-4 border-2 border-slate-700 rounded-2xl bg-slate-800/50 hover:border-orange-500 transition-all"
        >
          <span className="text-lg font-bold">I'm starting from scratch</span>
          <span className="text-sm text-slate-400">Start with basic letters</span>
        </button>
        <button
          onClick={() => { setIsZero(false); handleComplete(); }}
          disabled={isLoading}
          className="flex flex-col items-start p-4 border-2 border-slate-700 rounded-2xl bg-slate-800/50 hover:border-orange-500 transition-all"
        >
          <span className="text-lg font-bold">I know some Tamil</span>
          <span className="text-sm text-slate-400">Skip the absolute basics</span>
        </button>
      </div>
    </motion.div>
  ];

  return (
    <div className="relative h-full bg-slate-900 overflow-hidden">
      {/* Skip button - always visible unless loading */}
      {!isLoading && step > 0 && (
        <button 
          onClick={handleComplete}
          className="absolute top-4 right-4 z-20 text-slate-400 font-bold p-2 hover:text-white"
        >
          Skip
        </button>
      )}

      {/* Progress Bar */}
      <div className="absolute top-4 left-6 right-20 z-10 h-3 bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-orange-500"
          initial={{ width: '0%' }}
          animate={{ width: `${(step / 2) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        {steps[step]}
      </AnimatePresence>
    </div>
  );
}
