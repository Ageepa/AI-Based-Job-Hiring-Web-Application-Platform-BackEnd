import express from "express";
import jobsRouter from "./api/jobs.js";
import jobApplicationsRouter from "./api/jobApplications.js";
import "dotenv/config";
import { connectDB } from "./persistance/db.js";
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware.js";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));


connectDB();

app.use("/api/jobs", jobsRouter);
app.use("/api/jobapplications", jobApplicationsRouter);

app.use(globalErrorHandlingMiddleware);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Webservice is listening on port ${PORT}`);
});