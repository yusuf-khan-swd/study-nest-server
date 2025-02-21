import { z } from 'zod';

const createEnrollValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    payment: z.string().min(1),
    course: z.string().min(1),
  }),
});

export const EnrollValidation = {
  createEnrollValidationSchema,
};
