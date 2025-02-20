import { z } from 'zod';

const paymentValidationSchema = z.object({
  body: z.object({
    price: z.string().min(1),
    transactionId: z.string().min(1),
    email: z.string().email(),
    courseId: z.string().min(1),
  }),
});

export const PaymentValidation = {
  paymentValidationSchema,
};
