import { Schema, model } from 'mongoose';
import { TEnroll } from './enroll.interface';

const enrollSchema = new Schema<TEnroll>(
  {
    title: { type: String, required: true },
    duration: { type: String, required: true },
    instructor: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Enroll = model<TEnroll>('Enroll', enrollSchema);
