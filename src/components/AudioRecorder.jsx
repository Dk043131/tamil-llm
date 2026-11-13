import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Loader, CheckCircle2, XCircle, Search } from 'lucide-react';
import './AudioRecorder.css';

const AudioRecorder = ({ selectedWord, onScoreUpdate }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [jobStatus, setJobStatus] = useState(''); // Queued, Processing, Polling
  const [jobId, setJobId] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        // In a real app, we would process this into 16kHz mono WAV via AudioContext here
        // before sending to the backend to save bandwidth and compute.
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        audioChunksRef.current = [];
        submitAudioJob(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setAudioUrl(null);
      setJobId(null);
      setJobStatus('');
      onScoreUpdate(null);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Microphone access is required to practice pronunciation.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const submitAudioJob = (blob) => {
    setIsProcessing(true);
    setJobStatus('Queuing audio job...');
    
    // Simulate sending 16kHz WAV to FastAPI and getting a Job ID from Celery
    setTimeout(() => {
      const mockJobId = `job_${Math.random().toString(36).substr(2, 9)}`;
      setJobId(mockJobId);
      setJobStatus('Job queued! Polling for results...');
      pollJobResult(mockJobId);
    }, 800);
  };

  const pollJobResult = (jobId) => {
    // Simulate polling the Redis/Celery queue every 1 second
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      setJobStatus(`Polling job... (Attempt ${attempts})`);
      
      if (attempts >= 3) {
        clearInterval(interval);
        setIsProcessing(false);
        setJobStatus('');
        
        // Mock Whisper/MFA output
        const score = Math.floor(Math.random() * 30) + 70;
        let feedback = "";
        let phonemes = [];
        
        if (selectedWord.tamil === 'ழ') {
          feedback = score > 85 
            ? "Excellent! You nailed the unique 'zh' sound."
            : "You pronounced it closer to 'la'. Try curling your tongue backward without touching the roof of your mouth.";
          phonemes = [
            { char: 'ழ்', score: score, status: score > 85 ? 'good' : 'bad' },
            { char: 'அ', score: 95, status: 'good' }
          ];
        } else {
          feedback = score > 80 ? "Good job!" : "Keep practicing the retroflex sounds.";
          phonemes = selectedWord.tamil.split('').map(char => ({
            char,
            score: Math.floor(Math.random() * 40) + 60,
            status: Math.random() > 0.3 ? 'good' : 'warning'
          }));
        }

        onScoreUpdate({ score, feedback, phonemes });
      }
    }, 1000);
  };

  return (
    <div className="audio-recorder-container">
      <div className="recorder-controls">
        {!isRecording && !isProcessing && (
          <button className="record-btn start" onClick={startRecording} disabled={!selectedWord}>
            <Mic size={24} />
            <span>Start Recording</span>
          </button>
        )}
        
        {isRecording && (
          <button className="record-btn stop" onClick={stopRecording}>
            <Square size={24} />
            <span>Stop Recording</span>
            <div className="recording-indicator"></div>
          </button>
        )}
        
        {isProcessing && (
          <div className="processing-state-container">
            <div className="processing-state">
              <Loader className="spinner" size={24} />
              <span>{jobStatus}</span>
            </div>
            {jobId && <div className="job-id-text">Task ID: {jobId}</div>}
          </div>
        )}
      </div>

      {audioUrl && !isProcessing && (
        <div className="playback-container">
          <audio src={audioUrl} controls className="audio-player" />
          <div className="audio-format-badge">16kHz mono WAV (simulated)</div>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
