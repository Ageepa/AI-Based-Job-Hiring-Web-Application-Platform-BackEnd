import express from "express";
import {
  createJobApplication,
  getAllJobApplications,
} from "./../application/jobApplications.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import AuthorizationMiddleware from "./middleware/authorization-middleware.js";
import { getJobApplicationById } from "./../application/jobApplications.js";

const jobApplicationsRouter = express.Router();

jobApplicationsRouter
  .route("/")
  .post(ClerkExpressRequireAuth({}), createJobApplication)
  .get(
    ClerkExpressRequireAuth({}),
    AuthorizationMiddleware,
    getAllJobApplications
  );

jobApplicationsRouter
  .route("/:id")
  .get(
    ClerkExpressRequireAuth({}),
    AuthorizationMiddleware,
    getJobApplicationById
  );

export default jobApplicationsRouter;