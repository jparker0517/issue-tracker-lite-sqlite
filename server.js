const express = require('express');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// List
app.get('/api/issues', async (req, res) => {
  const rows = await db.all('SELECT * FROM issues ORDER BY datetime(createdAt) DESC');
  res.json(rows.map(r => ({ ...r, resolved: !!r.resolved })));
});

// Create
app.post('/api/issues', async (req, res) => {
  const { title, description, priority } = req.body || {};
  if (!title || !description) {
    return res.status(400).json({ error: 'title and description are required' });
  }
  const issue = {
    id: uuidv4(),
    title,
    description,
    priority: priority || 'low',
    resolved: 0,
    createdAt: new Date().toISOString()
  };
  await db.run(
    'INSERT INTO issues (id, title, description, priority, resolved, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
    [issue.id, issue.title, issue.description, issue.priority, issue.resolved, issue.createdAt]
  );
  res.status(201).json({ ...issue, resolved: false });
});

// Toggle/Set resolved
app.patch('/api/issues/:id', async (req, res) => {
  const { id } = req.params;
  const row = await db.get('SELECT * FROM issues WHERE id = ?', [id]);
  if (!row) return res.status(404).json({ error: 'not found' });
  let resolved = row.resolved ? 0 : 1;
  if (typeof req.body?.resolved === 'boolean') {
    resolved = req.body.resolved ? 1 : 0;
  }
  await db.run('UPDATE issues SET resolved = ? WHERE id = ?', [resolved, id]);
  const updated = await db.get('SELECT * FROM issues WHERE id = ?', [id]);
  res.json({ ...updated, resolved: !!updated.resolved });
});

// Delete
app.delete('/api/issues/:id', async (req, res) => {
  const { id } = req.params;
  const result = await db.run('DELETE FROM issues WHERE id = ?', [id]);
  if (result.changes === 0) return res.status(404).json({ error: 'not found' });
  res.status(204).end();
});

// Root -> index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Issue Tracker Lite (SQLite) on http://localhost:${PORT}`));
} else {
  module.exports = app;
}
