const express = require('express');
const router = express.Router();

// Import the entire controller object
const jobsController = require('../controllers/jobsController');

// Define routes
router.post('/postJob', jobsController.postJob);
router.get('/getJobs', jobsController.getAllJobs);
router.get('/filterJobs/:role', jobsController.filterJobsByRole);
router.get('/sortJobs', jobsController.sortJobsByDate);
router.get('/searchJobs', jobsController.searchJobsByTechStack);
router.get('/paginateJobs', jobsController.getPaginatedJobs);

module.exports = router;
