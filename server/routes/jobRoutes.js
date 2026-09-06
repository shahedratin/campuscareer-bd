const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.post('/create', jobController.createJob);
router.get('/search', jobController.searchJobs);
router.get('/employer/:employer_id', jobController.getJobsByEmployer);

module.exports = router;