import React, { useState } from 'react';
import { Volume2, Mic, ArrowRight } from 'lucide-react';
import './MinimalPairPractice.css';

const minimalPairs = [
  {
    id: 1,
    pair: ['ல', 'ள', 'ழ'],
    sounds: [
      { char: 'ல', desc: 'Alveolar "l" (Tongue behind front teeth)', audio: 'la' },
      { char: 'ள', desc: 'Retroflex "l" (Tongue curled back)', audio: 'Lla' },
      { char: 'ழ', desc: 'Retroflex approximant "zh" (Tongue curled back, not touching)', audio: 'zha' }
    ]
  },
  {
    id: 2,
    pair: ['ர', 'ற'],
    sounds: [
      { char: 'ர', desc: 'Alveolar tap "r" (Soft)', audio: 'ra' },
      { char: 'ற', desc: 'Alveolar trill "R" (Hard)', audio: 'RRa' }
    ]
  },
  {
    id: 3,
    pair: ['ந', 'ண'],
    sounds: [
      { char: 'ந', desc: 'Dental "n" (Tongue touching front teeth)', audio: 'na' },
      { char: 'ண', desc: 'Retroflex "n" (Tongue curled back)', audio: 'NNa' }
    ]
  }
];

const MinimalPairPractice = () => {
  const [activePairIndex, setActivePairIndex] = useState(0);
  const [selectedSound, setSelectedSound] = useState(null);

  const activePair = minimalPairs[activePairIndex];

  return (
    <div className="minimal-pair-container">
      <div className="minimal-pair-header">
        <h3 className="section-title">MINIMAL PAIR TRAINING</h3>
        <p className="section-desc">Learn to distinguish between similar sounds.</p>
      </div>

      <div className="pair-selector">
        {minimalPairs.map((mp, index) => (
          <button 
            key={mp.id} 
            className={`pair-tab ${activePairIndex === index ? 'active' : ''}`}
            onClick={() => { setActivePairIndex(index); setSelectedSound(null); }}
          >
            {mp.pair.join(' vs ')}
          </button>
        ))}
      </div>

      <div className="comparison-board">
        {activePair.sounds.map((sound, idx) => (
          <div 
            key={idx} 
            className={`sound-card ${selectedSound === idx ? 'selected' : ''}`}
            onClick={() => setSelectedSound(idx)}
          >
            <div className="sound-char tamil-text">{sound.char}</div>
            <div className="sound-desc">{sound.desc}</div>
            
            <div className="sound-actions">
              <button className="action-btn listen" onClick={(e) => { e.stopPropagation(); alert(`Playing native audio for ${sound.char}`); }}>
                <Volume2 size={18} /> Listen
              </button>
              <button className="action-btn practice" onClick={(e) => { e.stopPropagation(); alert(`Opening recorder for ${sound.char}`); }}>
                <Mic size={18} /> Practice
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="discrimination-test-prompt">
        <div className="prompt-content">
          <h4>Listening Discrimination Test</h4>
          <p>Ready to test your ear? Listen to a random sound from this group and identify which one it is.</p>
        </div>
        <button className="start-test-btn">Start Test <ArrowRight size={18} /></button>
      </div>
    </div>
  );
};

export default MinimalPairPractice;
