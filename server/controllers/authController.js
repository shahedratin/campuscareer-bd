const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Register a new Student
exports.registerStudent = async (req, res) => {
  const { name, email, password, university, department } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }

  try {
    // Check for duplicate email (REQ-1.4)
    db.query('SELECT * FROM student WHERE email = ?', [email], async (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err.message });
      if (results.length > 0) {
        return res.status(409).json({ message: 'An account with this email already exists' });
      }

      // Hash the password before storing (never store plain text passwords)
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = 'INSERT INTO student (name, email, password_hash, university, department) VALUES (?, ?, ?, ?, ?)';
      db.query(sql, [name, email, hashedPassword, university, department], (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err.message });
        res.status(201).json({ message: 'Student registered successfully', student_id: result.insertId });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Register a new Employer
exports.registerEmployer = async (req, res) => {
  const { company_name, email, password, address } = req.body;

  if (!company_name || !email || !password) {
    return res.status(400).json({ message: 'Company name, email and password are required' });
  }

  try {
    db.query('SELECT * FROM employer WHERE email = ?', [email], async (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err.message });
      if (results.length > 0) {
        return res.status(409).json({ message: 'An account with this email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = 'INSERT INTO employer (company_name, email, password_hash, address) VALUES (?, ?, ?, ?)';
      db.query(sql, [company_name, email, hashedPassword, address], (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err.message });
        res.status(201).json({ message: 'Employer registered successfully', employer_id: result.insertId });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login (works for Student or Employer based on `role` sent from frontend)
exports.login = (req, res) => {
  const { email, password, role } = req.body;
  const table = role === 'employer' ? 'employer' : 'student';

  db.query(`SELECT * FROM ${table} WHERE email = ?`, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err.message });
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const idField = role === 'employer' ? 'employer_id' : 'student_id';
    const token = jwt.sign(
      { id: user[idField], role: role === 'employer' ? 'employer' : 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ message: 'Login successful', token, role });
  });
};