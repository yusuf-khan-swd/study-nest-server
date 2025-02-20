import mongoose from 'mongoose';

export type TPayment = {
  price: string;
  transactionId: string;
  email: string;
  courseId: mongoose.Types.ObjectId;
};
