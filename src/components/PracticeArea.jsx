import React, { useState } from 'react';
import { ArrowUpRight, Lightbulb } from 'lucide-react';
import AudioRecorder from './AudioRecorder';
import PronunciationResult from './PronunciationResult';
import './PracticeArea.css';

const PracticeArea = ({ selectedWord }) => {
  const [result, setResult] = useState(null);

  // Reset result when selected word changes
  React.useEffect(() => {
    setResult(null);
  }, [selectedWord]);

  return (
    <div className="practice-section">
      <div className="practice-card">
        <div className="practice-header">
          <div className="accent-line"></div>
          <h2 className="practice-title">
            {selectedWord ? `Practice: ${selectedWord.tamil}` : 'Select a word above'}
          </h2>
        </div>

        {selectedWord && (
          <div className="native-audio-section">
            <p className="native-audio-label">Listen to a native speaker:</p>
            <div className="native-audio-controls">
              <button 
                className="native-play-btn"
                onClick={() => alert(`Playing native audio for: ${selectedWord.tamil}`)}
              >
                <Lightbulb size={16} /> <span>Play Reference Audio (Male, Madurai)</span>
              </button>
              <button 
                className="native-play-btn female"
                onClick={() => alert(`Playing native audio for: ${selectedWord.tamil}`)}
              >
                <Lightbulb size={16} /> <span>Play Reference Audio (Female, Chennai)</span>
              </button>
            </div>
          </div>
        )}
        
        <AudioRecorder 
          selectedWord={selectedWord} 
          onScoreUpdate={setResult} 
        />

        <PronunciationResult result={result} />
      </div>

      <div className="tip-card">
        <div className="tip-icon">
          <Lightbulb size={20} color="#d95d1e" />
        </div>
        <div className="tip-content">
          <strong>Tip:</strong> Focus on the 4 unique Tamil sounds: ழ (zh), ட (ṭ), ண (ṇ), ள (ḷ). Once you master these, Tamil pronunciation becomes much clearer!
        </div>
      </div>
    </div>
  );
};

export default PracticeArea;
