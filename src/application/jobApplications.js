import ValidationError from "../domain/errors/validation-error.js";
import JobApplication from "../persistance/entities/jobApplications.js";
import { JobApplicationDTO } from "./dto/jopApplications.js";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const getAllJobApplications = async (req, res, next) => {
  try {

    const { jobID } = req.query;
    if (jobID) {
      const jobApplications = await JobApplication.find({ job: jobID })
      .populate("job", ["title", "description"])
      .exec();
      return res.status(200).json(jobApplications);
    }

    const jobApplications = await JobApplication.find()
      .populate("job", ["title", "description"])
      .exec();
    return res.status(200).json(jobApplications);
  } catch (error) {
    next(error);
  }
};

export const createJobApplication = async (req, res, next) => {
  try {
    // console.log(req.auth);
    const { userId } = req.auth;

    // We can get more info about the user with this method
    // const user = await clerkClient.users.getUser(userId);
    // console.log(user);

    const jobApplication = JobApplicationDTO.safeParse(req.body);
    if (!jobApplication.success) {
      throw new ValidationError(jobApplication.error);
    }

    await JobApplication.create({ ...jobApplication.data, userId: userId });
    return res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export const getJobApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const jobApplication = await JobApplication.findById(id).populate("job", [
      "title",
      "description",
    ]);
    if (jobApplication === null) {
      throw new NotFoundError("Job Application not found");
    }
    return res.status(200).json(jobApplication);
  } catch (error) {
    next(error);
  }
};