const JobRequest = require("../models/JobRequest");

const getJobs = async (req, res, next) => {
  try {
    const filters = {};

    if (req.query.category) {
      filters.category = req.query.category;
    }

    if (req.query.status) {
      filters.status = req.query.status;
    }

    const jobs = await JobRequest.find(filters).sort({
      createdAt: -1,
    });

    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

const getSingleJob = async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

const createJob = async (req, res, next) => {
  try {
    const job = await JobRequest.create(req.body);

    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

const updateJobStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    job.status = status;

    await job.save();

    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getJobs,
  getSingleJob,
  createJob,
  updateJobStatus,
  deleteJob,
};