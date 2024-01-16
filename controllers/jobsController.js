const Job = require('../models/jobModel'); 

const postJob=async (req, res)=>{
  try{
    const {company,postedAt,city,location,role,level,contract,position,language}=req.body;

    const newJob = new Job({company,postedAt,city,location,role,level,contract,position,language,});

    const savedJob = await newJob.save();

    res.status(201).json(savedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

};


const getAllJobs=async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const filterJobsByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const filteredJobs = await Job.find({ role });
    res.status(200).json(filteredJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const sortJobsByDate = async (req, res) => {
  try {
    const sortedJobs = await Job.find().sort({ postedAt: -1 });
    res.status(200).json(sortedJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const searchJobsByTechStack = async (req, res) => {
  try {
    const { language } = req.query;
    const regex = new RegExp(language, 'i'); // Case-insensitive search
    const searchedJobs = await Job.find({ language: regex });
    res.status(200).json(searchedJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getPaginatedJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const jobs = await Job.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  postJob,
  getAllJobs,
  filterJobsByRole,
  sortJobsByDate,
  searchJobsByTechStack,
  getPaginatedJobs,
  
};
