//! DTO => Data Transfer Object

import { z } from "zod";

export const JobDTO = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  type: z.string().nonempty(),
  location: z.string().nonempty(),
  questions: z.string().nonempty().array().optional(),
});
