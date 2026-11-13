import React from 'react';
import './WordGrid.css';

const words = [
  { id: '1', tamil: 'வணக்கம்', roman: 'Vanakkam', meaning: 'Hello', color: 'orange' },
  { id: '2', tamil: 'ழ', roman: 'Zhaa (ழ sound)', meaning: 'The unique Tamil "zh"', color: 'orange' },
  { id: '3', tamil: 'ட', roman: 'Ta (ட sound)', meaning: 'Retroflex "t"', color: 'orange' },
  { id: '4', tamil: 'ண', roman: 'Na (ண sound)', meaning: 'Retroflex "ṇ"', color: 'orange' },
  { id: '5', tamil: 'ள', roman: 'La (ள sound)', meaning: 'Retroflex "l"', color: 'orange' },
  { id: '6', tamil: 'ற', roman: 'Ra (ற sound)', meaning: 'Alveolar trill r', color: 'orange' },
];

const WordGrid = ({ selectedWord, onSelect }) => {
  return (
    <div className="word-grid">
      {words.map((word) => (
        <button
          key={word.id}
          className={`word-card ${selectedWord?.id === word.id ? 'selected' : ''}`}
          onClick={() => onSelect(word)}
        >
          <div className="word-tamil tamil-text">{word.tamil}</div>
          <div className="word-roman">{word.roman}</div>
          <div className="word-meaning">{word.meaning}</div>
        </button>
      ))}
    </div>
  );
};

export default WordGrid;
