import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import config from '../../config';
import AppError from '../../errors/AppError';
import { USER_ROLE } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';
import { createToken } from './user.utils';

const userAuth = async (payload: TUser) => {
  const isUserExists = await User.findOne({ email: payload.email });

  if (isUserExists) {
    const jwtPayload = {
      email: isUserExists?.email,
      role: isUserExists?.role,
      id: isUserExists?._id,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_secret as string,
      config.jwt_expires_in as string,
    );

    return { user: isUserExists, accessToken };
  }

  const data = { ...payload, role: USER_ROLE.user };
  const result = await User.create(data);

  const jwtPayload = {
    email: result.email,
    role: result.role,
    id: result._id,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_expires_in as string,
  );

  return { user: result, accessToken };
};

const createAdmin = async (payload: TUser) => {
  const isUserExists = await User.findOne({ email: payload.email });

  if (isUserExists)
    throw new AppError(httpStatus.BAD_REQUEST, 'Admin already Exist !');

  const data = { ...payload, role: USER_ROLE.admin };
  const result = await User.create(data);
  return result;
};

const makeAdmin = async (id: string) => {
  const isUserExists = await User.findById(id);

  if (!isUserExists)
    throw new AppError(httpStatus.BAD_REQUEST, 'User Does not Exist !');

  const result = await User.findByIdAndUpdate(id, { role: USER_ROLE.admin });
  return result;
};

const getAllUsers = async (query: Record<string, unknown>) => {
  const carQuery = new QueryBuilder(User.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await carQuery.modelQuery;
  return result;
};

const getUserProfile = async (email: string) => {
  const result = await User.findOne({ email });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  return result;
};

const getSingleUser = async (id: string) => {
  const result = await User.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  return result;
};

const updateUser = async (id: string, payload: Partial<TUser>) => {
  const isUserExists = await User.findById(id);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserService = {
  createAdmin,
  getAllUsers,
  updateUser,
  deleteUser,
  getSingleUser,
  makeAdmin,
  userAuth,
  getUserProfile,
};
