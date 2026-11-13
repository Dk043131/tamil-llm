import React from 'react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import './PronunciationResult.css';

const PronunciationResult = ({ result }) => {
  if (!result) return null;

  const { score, feedback, phonemes } = result;

  const getScoreColor = (s) => {
    if (s >= 85) return 'var(--success)';
    if (s >= 70) return 'var(--warning)';
    return 'var(--error)';
  };

  return (
    <div className="result-card">
      <div className="score-section" style={{ borderColor: getScoreColor(score) }}>
        <div className="score-circle" style={{ color: getScoreColor(score) }}>
          {score}
          <span className="score-max">/100</span>
        </div>
        <div className="score-label">Overall Score</div>
      </div>

      <div className="feedback-section">
        <h4 className="feedback-title">Intelligent Feedback</h4>
        <p className="feedback-text">{feedback}</p>
        
        {score < 90 && (
          <div className="articulation-guidance">
            <h5 className="articulation-title">Visual Articulation Guide</h5>
            <div className="articulation-diagram-placeholder">
              <div className="tongue-diagram">
                {/* SVG/CSS Placeholder for tongue placement diagram */}
                <div className="palate"></div>
                <div className="tongue retroflex"></div>
              </div>
              <p className="diagram-caption">Curl your tongue back to touch the roof of your mouth, just behind the alveolar ridge.</p>
            </div>
          </div>
        )}
        
        {phonemes && phonemes.length > 0 && (
          <div className="phoneme-breakdown">
            <h5 className="phoneme-title">Phoneme Analysis</h5>
            <div className="phoneme-list">
              {phonemes.map((p, idx) => (
                <div key={idx} className={`phoneme-item ${p.status}`}>
                  <span className="phoneme-char">{p.char}</span>
                  {p.status === 'good' && <CheckCircle2 size={16} className="status-icon success" />}
                  {p.status === 'warning' && <AlertCircle size={16} className="status-icon warning" />}
                  {p.status === 'bad' && <XCircle size={16} className="status-icon error" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PronunciationResult;
