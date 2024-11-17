import { z } from "zod";

export const JobApplicationDTO = z.object({
  fullName: z.string().nonempty(),
  answers: z.string().nonempty().array().optional(),
  job: z.string().nonempty(),
  rating: z.string().nonempty().optional(),
});
