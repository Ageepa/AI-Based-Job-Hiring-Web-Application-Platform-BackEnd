import express from "express";
import { getAllJobs, createJob, getJobById } from "../application/jobs.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import AuthorizationMiddleware from "./middleware/authorization-middleware.js";

const jobsRouter = express.Router();

// api/jobs/
jobsRouter
  .route("/")
  .get(getAllJobs)
  .post(ClerkExpressRequireAuth({}), AuthorizationMiddleware, createJob);

//api/jobs/:id
jobsRouter.route("/:id").get(getJobById);

export default jobsRouter;