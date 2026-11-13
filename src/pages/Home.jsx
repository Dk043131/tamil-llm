import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Star, BookOpen } from 'lucide-react';
import useStore from '../store/useStore';

export default function Home() {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/onboarding');
    }
  }, [user, navigate]);

  if (!user) return null;

  const dummyNodes = [
    { id: 'unit_1', title: 'Uyir (Vowels)', status: 'unlocked', icon: 'A' },
    { id: 'unit_2', title: 'Mei (Consonants)', status: 'locked', icon: 'க்' },
    { id: 'unit_3', title: 'Uyirmei (Combined)', status: 'locked', icon: 'க' },
    { id: 'unit_4', title: 'Words (Level 1)', status: 'locked', icon: <BookOpen size={20} /> },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900 pb-20 overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 glass-panel px-4 py-4 flex justify-between items-center border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-orange-400">
            {user?.goal_type?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-orange-500 font-bold">
            <Flame size={20} className="fill-orange-500" />
            <span>{user?.streak || 0}</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Star size={20} className="fill-amber-400" />
            <span>{user?.xp || 0}</span>
          </div>
        </div>
      </header>

      {/* Map / Skill Tree Area */}
      <div className="flex-1 flex flex-col items-center py-12 gap-8 relative">
        {/* Background connector line */}
        <div className="absolute top-12 bottom-12 w-2 bg-slate-800 rounded-full left-1/2 -translate-x-1/2 z-0" />

        {dummyNodes.map((node, index) => {
          const isUnlocked = node.id === user.starting_unit_id || node.status === 'unlocked';
          const isOffset = index % 2 !== 0;
          
          return (
            <motion.div 
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative z-10 w-full flex justify-center ${isOffset ? 'pl-24' : 'pr-24'}`}
            >
              <button
                onClick={() => isUnlocked && navigate(`/lesson/${node.id}`)}
                className={`
                  relative flex items-center justify-center w-20 h-20 rounded-full border-4 shadow-xl
                  transition-transform active:scale-95
                  ${isUnlocked 
                    ? 'bg-orange-500 border-orange-300 text-white shadow-[0_8px_0_0_#c2410c]' 
                    : 'bg-slate-700 border-slate-600 text-slate-400 shadow-[0_8px_0_0_#475569]'}
                `}
              >
                <span className="text-2xl font-bold">{node.icon}</span>
                
                {/* Floating Title */}
                <div className={`absolute top-full mt-4 whitespace-nowrap text-sm font-bold ${isUnlocked ? 'text-slate-200' : 'text-slate-500'}`}>
                  {node.title}
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
