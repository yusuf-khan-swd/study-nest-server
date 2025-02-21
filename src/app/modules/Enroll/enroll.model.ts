import { Schema, model } from 'mongoose';
import { TEnroll } from './enroll.interface';

const enrollSchema = new Schema<TEnroll>(
  {
    payment: { type: Schema.Types.ObjectId, required: true, ref: 'Payment' },
    email: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, required: true, ref: 'Course' },
  },
  {
    timestamps: true,
  },
);

export const Enroll = model<TEnroll>('Enroll', enrollSchema);
