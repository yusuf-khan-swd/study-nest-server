import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseService } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await CourseService.createCourse(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Course Created Successfully',
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res) => {
  const result = await CourseService.getAllCourse(req.query);

  if (result.length > 0) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Courses retrieved successfully',
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

const getAllAdminCourse = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await CourseService.getAllAdminCourse(user);

  if (result.length > 0) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin Courses retrieved successfully',
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

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.getSingleCourse(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Course retrieved successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.updateCourse(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.deleteCourse(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Deleted successfully',
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  getAllAdminCourse,
};
