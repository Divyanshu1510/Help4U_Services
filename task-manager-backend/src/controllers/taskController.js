import { query as _query } from '../database/db';

// Get all tasks
export function getAllTasks(req, res) {
  _query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
}

export function createTask(req, res) {
  const { title, description, completed } = req.body;
  const query = 'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)';
  _query(query, [title, description, completed || false], (err, results) => {
    if (err) {
      console.error('Error creating task:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ id: results.insertId });
    }
  });
}

export function getTaskById(req, res) {
  const taskId = req.params.id;
  _query('SELECT * FROM tasks WHERE id = ?', [taskId], (err, results) => {
    if (err) {
      console.error('Error fetching task:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json(results[0]);
    }
  });
}

export function updateTaskById(req, res) {
  const taskId = req.params.id;
  const { title, description, completed } = req.body;
  const query = 'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?';
  _query(query, [title, description, completed || false, taskId], (err, results) => {
    if (err) {
      console.error('Error updating task:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json({ message: 'Task updated successfully' });
    }
  });
}

export function deleteTaskById(req, res) {
  const taskId = req.params.id;
  _query('DELETE FROM tasks WHERE id = ?', [taskId], (err, results) => {
    if (err) {
      console.error('Error deleting task:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json({ message: 'Task deleted successfully' });
    }
  });
}
