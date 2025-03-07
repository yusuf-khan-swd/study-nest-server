import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

const userAuth = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await UserService.userAuth(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User Logged in Successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await UserService.createAdmin(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin Created Successfully',
    data: result,
  });
});

const makeAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.makeAdmin(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Making user an Admin successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsers(req.query);

  if (result.length > 0) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrieved successfully',
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: true,
      message: 'No Data Found',
      data: result,
    });
  }
});

const getUserProfile = catchAsync(async (req, res) => {
  const email = req?.query?.email;
  const result = await UserService.getUserProfile(email as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieve successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A User retrieve successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.updateUser(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.deleteUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Deleted successfully',
    data: result,
  });
});

export const UserController = {
  createAdmin,
  getAllUsers,
  updateUser,
  deleteUser,
  getSingleUser,
  makeAdmin,
  userAuth,
  getUserProfile,
};
