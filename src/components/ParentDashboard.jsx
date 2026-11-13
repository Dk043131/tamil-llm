import React from 'react';
import { LineChart, Clock, Award, AlertTriangle, ArrowLeft } from 'lucide-react';
import './ParentDashboard.css';

const ParentDashboard = ({ onBack }) => {
  return (
    <div className="parent-dashboard">
      <div className="dashboard-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} /> Back to Learning
        </button>
        <h2 className="dashboard-title">Parent & Teacher Dashboard</h2>
        <p className="dashboard-subtitle">Monitor progress and identify areas for improvement.</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon"><Clock color="#64b5f6" /></div>
          <div className="metric-info">
            <div className="metric-value">4h 20m</div>
            <div className="metric-label">Total Practice Time</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon"><Award color="#4caf50" /></div>
          <div className="metric-info">
            <div className="metric-value">85%</div>
            <div className="metric-label">Avg. Accuracy</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon"><LineChart color="#ffd54f" /></div>
          <div className="metric-info">
            <div className="metric-value">7 Days</div>
            <div className="metric-label">Current Streak</div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="chart-section glass-panel">
          <h3 className="section-title">Phoneme Mastery</h3>
          <div className="progress-bars">
            <div className="progress-item">
              <div className="progress-label">
                <span className="tamil-text">அ</span> (a) - Easy
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '95%', backgroundColor: 'var(--success)' }}></div>
              </div>
              <div className="progress-percent">95%</div>
            </div>
            <div className="progress-item">
              <div className="progress-label">
                <span className="tamil-text">ட</span> (ta) - Medium
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '70%', backgroundColor: 'var(--warning)' }}></div>
              </div>
              <div className="progress-percent">70%</div>
            </div>
            <div className="progress-item">
              <div className="progress-label">
                <span className="tamil-text">ழ</span> (zha) - Hard
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '40%', backgroundColor: 'var(--error)' }}></div>
              </div>
              <div className="progress-percent">40%</div>
            </div>
          </div>
        </div>

        <div className="recommendation-section glass-panel">
          <h3 className="section-title">
            <AlertTriangle size={18} color="var(--warning)" /> Focus Areas
          </h3>
          <p className="recommendation-text">
            The learner is consistently struggling with retroflex sounds (ட, ண, ள). 
            We recommend spending 10 minutes in the <strong>Alphabet Mode</strong> focusing specifically on tongue placement for these characters.
          </p>
          <button className="action-btn">Assign Practice Module</button>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
