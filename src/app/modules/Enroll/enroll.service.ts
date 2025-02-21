import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TEnroll } from './enroll.interface';
import { Enroll } from './enroll.model';

const createEnroll = async (payload: TEnroll) => {
  const result = await Enroll.create(payload);
  return result;
};

const getAllEnroll = async (query: Record<string, unknown>) => {
  const enrollQuery = new QueryBuilder(Enroll.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await enrollQuery.modelQuery;
  return result;
};

const getSingleEnroll = async (id: string) => {
  const result = await Enroll.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Enroll not found');
  }

  return result;
};

const updateEnroll = async (id: string, payload: Partial<TEnroll>) => {
  const isEnrollExists = await Enroll.findById(id);

  if (!isEnrollExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Enroll not found');
  }

  const result = await Enroll.findByIdAndUpdate(id, payload, {
    new: true,
  });

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
  getAllEnroll,
  getSingleEnroll,
  updateEnroll,
  deleteEnroll,
};
