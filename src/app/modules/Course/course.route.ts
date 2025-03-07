import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);

router.get('/', CourseController.getAllCourse);
router.get(
  '/admin-courses',
  auth(USER_ROLE.admin),
  CourseController.getAllAdminCourse,
);

router.get('/:id', CourseController.getSingleCourse);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
);

router.delete('/:id', auth(USER_ROLE.admin), CourseController.deleteCourse);

export const CourseRoutes = router;
