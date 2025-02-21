import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrollService } from './enroll.service';

const createEnroll = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await EnrollService.createEnroll(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Enroll Created Successfully',
    data: result,
  });
});

const getAllEnroll = catchAsync(async (req, res) => {
  const result = await EnrollService.getAllEnroll(req.query);

  if (result.length > 0) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Enrolls retrieved successfully',
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

const getSingleEnroll = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EnrollService.getSingleEnroll(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Enroll retrieved successfully',
    data: result,
  });
});

const deleteEnroll = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EnrollService.deleteEnroll(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enroll Deleted successfully',
    data: result,
  });
});

export const EnrollController = {
  createEnroll,
  getAllEnroll,
  getSingleEnroll,
  deleteEnroll,
};
