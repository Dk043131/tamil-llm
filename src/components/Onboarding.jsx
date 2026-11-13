import React, { useState } from 'react';
import { Mic, ArrowRight, PlayCircle, CheckCircle2 } from 'lucide-react';
import './Onboarding.css';

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [calibrationDone, setCalibrationDone] = useState(false);

  const handleRecordMock = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setCalibrationDone(true);
    }, 3000); // Mock 3 seconds recording
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        {step === 1 && (
          <div className="step-content">
            <h2 className="step-title">Welcome to Tamil Pronunciation!</h2>
            <p className="step-text">
              Tamil has unique sounds that might be new to you. The most important are the retroflex consonants where your tongue curls backwards:
            </p>
            
            <div className="sound-examples">
              <div className="sound-item">
                <span className="tamil-char">ட</span>
                <span className="sound-desc">ṭa (Hard 't')</span>
              </div>
              <div className="sound-item">
                <span className="tamil-char">ண</span>
                <span className="sound-desc">ṇa (Hard 'n')</span>
              </div>
              <div className="sound-item">
                <span className="tamil-char">ள</span>
                <span className="sound-desc">ḷa (Hard 'l')</span>
              </div>
              <div className="sound-item highlight">
                <span className="tamil-char">ழ</span>
                <span className="sound-desc">zha (Unique!)</span>
              </div>
            </div>

            <button className="primary-btn" onClick={() => setStep(2)}>
              Next: Setup Audio Baseline <ArrowRight size={18} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <h2 className="step-title">Let's learn your accent</h2>
            <p className="step-text">
              To provide accurate feedback, we need to establish your natural speaking baseline. Please read the following sentence aloud:
            </p>

            <div className="calibration-box">
              <p className="calibration-text tamil-text">தமிழ் எங்கள் உயிருக்கு நேர்</p>
              <p className="calibration-roman">"Tamil engal uyirukku naer"</p>
            </div>

            <div className="calibration-controls">
              {!calibrationDone ? (
                <button 
                  className={`record-btn ${isRecording ? 'recording' : ''}`}
                  onClick={handleRecordMock}
                  disabled={isRecording}
                >
                  <Mic size={24} />
                  {isRecording ? 'Recording...' : 'Start Recording'}
                </button>
              ) : (
                <div className="success-message">
                  <CheckCircle2 color="var(--success)" size={24} />
                  Baseline established!
                </div>
              )}
            </div>

            <button 
              className="primary-btn" 
              onClick={onComplete}
              disabled={!calibrationDone}
            >
              Start Learning <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
