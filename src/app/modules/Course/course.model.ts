import { Schema, model } from 'mongoose';
import { TCourse } from './course.interface';

const courseSchema = new Schema<TCourse>(
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

export const Course = model<TCourse>('Course', courseSchema);
