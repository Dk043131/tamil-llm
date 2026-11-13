import React from 'react';
import { Volume2, BookOpen, MessageCircle, FileText, SplitSquareHorizontal } from 'lucide-react';
import './ModeSelector.css';

const ModeSelector = ({ activeMode, onSelect }) => {
  const modes = [
    { id: 'Letters', label: 'Letters & Sounds', icon: <Volume2 size={16} /> },
    { id: 'Syllables', label: 'Syllables', icon: <BookOpen size={16} /> },
    { id: 'Words', label: 'Words', icon: <FileText size={16} /> },
    { id: 'MinimalPairs', label: 'Minimal Pairs', icon: <SplitSquareHorizontal size={16} /> },
    { id: 'Sentences', label: 'Sentences', icon: <MessageCircle size={16} /> },
    { id: 'Stories', label: 'Stories', icon: <BookOpen size={16} /> },
  ];

  return (
    <div className="mode-selector">
      {modes.map((mode) => (
        <button
          key={mode.id}
          className={`mode-btn ${activeMode === mode.id ? 'active' : ''}`}
          onClick={() => onSelect(mode.id)}
        >
          <span className="mode-icon">{mode.icon}</span>
          <span>{mode.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;
