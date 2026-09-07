const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.post('/apply', applicationController.applyToJob);
router.get('/student/:student_id', applicationController.getStudentApplications);
router.get('/job/:job_id', applicationController.getApplicantsForJob);
router.put('/:application_id/status', applicationController.updateApplicationStatus);

module.exports = router;