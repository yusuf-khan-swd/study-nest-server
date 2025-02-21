import { Types } from 'mongoose';

export type TEnroll = {
  email: string;
  payment: Types.ObjectId;
  course: Types.ObjectId;
};
