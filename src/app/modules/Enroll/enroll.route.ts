import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { EnrollController } from './enroll.controller';
import { EnrollValidation } from './enroll.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(EnrollValidation.createCourseValidationSchema),
  EnrollController.createEnroll,
);

router.get('/', EnrollController.getAllEnroll);

router.get('/:id', EnrollController.getSingleEnroll);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(EnrollValidation.updateCourseValidationSchema),
  EnrollController.updateEnroll,
);

router.delete('/:id', auth(USER_ROLE.admin), EnrollController.deleteEnroll);

export const EnrollRoutes = router;
