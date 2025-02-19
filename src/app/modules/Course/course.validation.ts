import { z } from 'zod';

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    duration: z.string().min(1),
    instructor: z.string().min(1),
    price: z.string().min(1),
    description: z.string().min(1),
    email: z.string().email(),
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    duration: z.string().min(1).optional(),
    instructor: z.string().min(1).optional(),
    price: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    email: z.string().email().optional(),
  }),
});

export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
