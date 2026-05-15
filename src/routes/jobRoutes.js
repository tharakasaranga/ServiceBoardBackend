const express = require("express");

const {
  getJobs,
  getSingleJob,
  createJob,
  updateJobStatus,
  deleteJob,
} = require("../controllers/jobController");

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getSingleJob);

router.post("/", createJob);

router.patch("/:id", updateJobStatus);

router.delete("/:id", deleteJob);

module.exports = router;