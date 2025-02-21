import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { TEnroll } from './enroll.interface';
import { Enroll } from './enroll.model';

const createEnroll = async (payload: TEnroll) => {
  const result = await Enroll.create(payload);
  return result;
};

const getAllUserEnroll = async (user: JwtPayload) => {
  const { email } = user;

  const isUserExist = await User.findOne({ email: email });

  if (!isUserExist)
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');

  const result = await Enroll.find({ email: email })
    .populate('course')
    .sort('-createdAt');

  return result;
};

const getSingleEnroll = async (id: string) => {
  const result = await Enroll.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Enroll not found');
  }

  return result;
};

const deleteEnroll = async (id: string) => {
  const isEnrollExists = await Enroll.findById(id);

  if (!isEnrollExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Enroll not found');
  }

  const result = await Enroll.findByIdAndDelete(id);
  return result;
};

export const EnrollService = {
  createEnroll,
  getAllUserEnroll,
  getSingleEnroll,
  deleteEnroll,
};
