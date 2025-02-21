import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    email: z.string({ required_error: 'Email is required' }).email(),
  }),
});

const userUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
  }),
});

export const UserValidation = {
  userValidationSchema,
  userUpdateValidationSchema,
};
