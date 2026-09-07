const db = require('../config/db');

// Student applies to a job (REQ-5.1, REQ-5.2, REQ-5.3)
exports.applyToJob = (req, res) => {
  const { student_id, job_id } = req.body;

  if (!student_id || !job_id) {
    return res.status(400).json({ message: 'student_id and job_id are required' });
  }

  // Check if the job exists and is approved
  db.query('SELECT * FROM job WHERE job_id = ? AND status = "Approved"', [job_id], (err, jobResults) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err.message });
    if (jobResults.length === 0) {
      return res.status(404).json({ message: 'Job not found or not open for applications' });
    }

    // REQ-5.2: block duplicate application (the UNIQUE KEY in the table also enforces this)
    db.query(
      'SELECT * FROM application WHERE student_id = ? AND job_id = ?',
      [student_id, job_id],
      (err, existing) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err.message });
        if (existing.length > 0) {
          return res.status(409).json({ message: 'You have already applied to this job' });
        }

        // REQ-5.3: initial status is Applied, applied_date is auto-set by the DB
        db.query(
          'INSERT INTO application (student_id, job_id, status) VALUES (?, ?, "Applied")',
          [student_id, job_id],
          (err, result) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err.message });
            res.status(201).json({ message: 'Application submitted successfully', application_id: result.insertId });
          }
        );
      }
    );
  });
};

// Student views their own applications with status (REQ-6.1)
exports.getStudentApplications = (req, res) => {
  const { student_id } = req.params;

  const sql = `
    SELECT a.application_id, a.status, a.applied_date, j.title, j.location, j.job_type,
           e.company_name
    FROM application a
    JOIN job j ON a.job_id = j.job_id
    JOIN employer e ON j.employer_id = e.employer_id
    WHERE a.student_id = ?
    ORDER BY a.applied_date DESC
  `;

  db.query(sql, [student_id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err.message });
    res.status(200).json({ applications: results });
  });
};

// Employer views applicants for their job (REQ-10.1, REQ-10.2)
exports.getApplicantsForJob = (req, res) => {
  const { job_id } = req.params;

  const sql = `
    SELECT a.application_id, a.status, a.applied_date, s.student_id, s.name, s.university, s.department
    FROM application a
    JOIN student s ON a.student_id = s.student_id
    WHERE a.job_id = ?
  `;

  db.query(sql, [job_id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err.message });
    res.status(200).json({ applicants: results });
  });
};

// Employer updates application status (REQ-12.1, REQ-12.3)
exports.updateApplicationStatus = (req, res) => {
  const { application_id } = req.params;
  const { status } = req.body;

  const validStatuses = ['Applied', 'Shortlisted', 'Interview', 'Selected', 'Rejected'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  db.query(
    'UPDATE application SET status = ? WHERE application_id = ?',
    [status, application_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Application not found' });
      }
      res.status(200).json({ message: `Application status updated to ${status}` });
    }
  );
};