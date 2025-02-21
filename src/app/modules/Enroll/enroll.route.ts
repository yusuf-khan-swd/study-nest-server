import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { EnrollController } from './enroll.controller';
import { EnrollValidation } from './enroll.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(EnrollValidation.createEnrollValidationSchema),
  EnrollController.createEnroll,
);

router.get('/', EnrollController.getAllEnroll);

router.get('/:id', EnrollController.getSingleEnroll);

router.delete('/:id', auth(USER_ROLE.user), EnrollController.deleteEnroll);

export const EnrollRoutes = router;
