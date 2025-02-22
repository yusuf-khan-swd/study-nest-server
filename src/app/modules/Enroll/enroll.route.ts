import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { EnrollController } from './enroll.controller';
import { EnrollValidation } from './enroll.validation';

const router = express.Router();

// ! I don't think post route use in client because insert in enroll done by payment route
router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(EnrollValidation.createEnrollValidationSchema),
  EnrollController.createEnroll,
);

router.get('/', auth(USER_ROLE.user), EnrollController.getAllUserEnroll);

router.get('/:id', auth(USER_ROLE.user), EnrollController.getSingleEnroll);

router.delete('/:id', auth(USER_ROLE.user), EnrollController.deleteEnroll);

export const EnrollRoutes = router;
