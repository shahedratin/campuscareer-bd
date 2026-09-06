const db = require('../config/db');

// Employer creates a job post (REQ-9.1) — status starts as Pending for Admin review
exports.createJob = (req, res) => {
  const { employer_id, title, description, job_type, location, working_hours } = req.body;

  if (!employer_id || !title || !job_type || !location) {
    return res.status(400).json({ message: 'Required job fields are missing' });
  }

  const sql = `INSERT INTO job (employer_id, title, description, job_type, location, working_hours, status)
               VALUES (?, ?, ?, ?, ?, ?, 'Pending')`;

  db.query(sql, [employer_id, title, description, job_type, location, working_hours], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err.message });
    res.status(201).json({ message: 'Job submitted for admin review', job_id: result.insertId });
  });
};

// Student searches/filters jobs (REQ-4.1, REQ-4.2) — only Approved jobs are shown
exports.searchJobs = (req, res) => {
  const { title, location, job_type } = req.query;

  let sql = "SELECT * FROM job WHERE status = 'Approved'";
  const params = [];

  if (title) {
    sql += ' AND title LIKE ?';
    params.push(`%${title}%`);
  }
  if (location) {
    sql += ' AND location = ?';
    params.push(location);
  }
  if (job_type) {
    sql += ' AND job_type = ?';
    params.push(job_type);
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err.message });
    // REQ-4.3: appropriate message when nothing matches
    if (results.length === 0) {
      return res.status(200).json({ message: 'No jobs match your search criteria', jobs: [] });
    }
    res.status(200).json({ jobs: results });
  });
};

// Employer views their own postings
exports.getJobsByEmployer = (req, res) => {
  const { employer_id } = req.params;
  db.query('SELECT * FROM job WHERE employer_id = ?', [employer_id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err.message });
    res.status(200).json({ jobs: results });
  });
};