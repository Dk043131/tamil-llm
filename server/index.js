const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        goal_type TEXT,
        placement_score INTEGER,
        starting_unit_id TEXT,
        xp INTEGER DEFAULT 0,
        streak INTEGER DEFAULT 0,
        last_active_date TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT,
        event_type TEXT,
        payload TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);
  }
});

// API Routes

// Create a guest session
app.post('/api/session', (req, res) => {
  const { goal_type, placement_score } = req.body;
  const userId = uuidv4();
  
  // Simple rules engine for starting unit
  let starting_unit_id = 'unit_1'; // Default: Vowels
  if (placement_score > 80) starting_unit_id = 'unit_3'; // Words
  else if (placement_score > 50) starting_unit_id = 'unit_2'; // Consonants
  
  const stmt = db.prepare('INSERT INTO users (id, goal_type, placement_score, starting_unit_id) VALUES (?, ?, ?, ?)');
  stmt.run([userId, goal_type || 'casual', placement_score || 0, starting_unit_id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      id: userId,
      goal_type,
      placement_score,
      starting_unit_id,
      xp: 0,
      streak: 0
    });
  });
});

// Get user progress
app.get('/api/progress/:userId', (req, res) => {
  const { userId } = req.params;
  db.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'User not found' });
    res.json(row);
  });
});

// Log an event (e.g. lesson completion) and update XP
app.post('/api/events', (req, res) => {
  const { user_id, event_type, payload, xp_earned } = req.body;
  
  db.serialize(() => {
    // 1. Insert event
    const stmt = db.prepare('INSERT INTO events (user_id, event_type, payload) VALUES (?, ?, ?)');
    stmt.run([user_id, event_type, JSON.stringify(payload || {})]);
    
    // 2. Update user XP and streak (simple streak logic for MVP)
    if (xp_earned) {
      const today = new Date().toISOString().split('T')[0];
      
      db.get('SELECT last_active_date, streak, xp FROM users WHERE id = ?', [user_id], (err, row) => {
        if (err || !row) return res.status(500).json({ error: 'User lookup failed' });
        
        let newStreak = row.streak;
        if (row.last_active_date !== today) {
          // If last active wasn't today, check if it was yesterday
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          
          if (row.last_active_date === yesterdayStr) {
            newStreak += 1; // Continuous streak
          } else if (row.last_active_date) {
            newStreak = 1; // Streak broken, start over
          } else {
            newStreak = 1; // First day
          }
        }
        
        db.run(
          'UPDATE users SET xp = xp + ?, streak = ?, last_active_date = ? WHERE id = ?', 
          [xp_earned, newStreak, today, user_id],
          (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, xp: row.xp + xp_earned, streak: newStreak });
          }
        );
      });
    } else {
      res.json({ success: true });
    }
  });
});

const { getTutorAdvice } = require('./tutorService');

// AI Tutor Endpoint - Selvi Companion
app.post('/api/tutor/ask', async (req, res) => {
  try {
    const { letter, queryType, attemptCount, userQuestion, context } = req.body;
    const result = await getTutorAdvice({
      letter,
      queryType,
      attemptCount,
      userQuestion,
      context
    });
    res.json(result);
  } catch (err) {
    console.error('Tutor service error:', err);
    res.status(500).json({ error: 'AI Tutor service temporarily unavailable.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
