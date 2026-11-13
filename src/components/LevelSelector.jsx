import React from 'react';
import { Sprout, Baby, BookOpen, GraduationCap, Globe2 } from 'lucide-react';
import './LevelSelector.css';

const LevelSelector = ({ activeLevel, onSelect }) => {
  const levels = [
    { id: 'Beginner', icon: <Sprout size={18} color="#4caf50" />, label: 'Beginner' },
    { id: 'Children', icon: <Baby size={18} color="#ffd54f" />, label: 'Children' },
    { id: 'Intermediate', icon: <BookOpen size={18} color="#64b5f6" />, label: 'Intermediate' },
    { id: 'Advanced', icon: <GraduationCap size={18} color="#e0e0e0" />, label: 'Advanced' },
    { id: 'Foreigners', icon: <Globe2 size={18} color="#81c784" />, label: 'Foreigners' },
  ];

  return (
    <div className="level-selector">
      {levels.map((level) => (
        <button
          key={level.id}
          className={`level-btn ${activeLevel === level.id ? 'active' : ''}`}
          onClick={() => onSelect(level.id)}
        >
          <span className="level-icon">{level.icon}</span>
          <span className="level-label">{level.label}</span>
        </button>
      ))}
    </div>
  );
};

export default LevelSelector;
