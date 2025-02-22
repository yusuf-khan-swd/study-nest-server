import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from './user.constant';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(UserValidation.userValidationSchema),
  UserController.userAuth,
);

router.post(
  '/admin',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.userValidationSchema),
  UserController.createAdmin,
);

router.get(
  '/profile',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.getUserProfile,
);

router.get(
  '/profile/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.getSingleUser,
);

router.put(
  '/profile/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(UserValidation.userUpdateValidationSchema),
  UserController.updateUser,
);

router.patch(
  '/make-admin/:id',
  auth(USER_ROLE.admin),
  UserController.makeAdmin,
);

router.get('/', UserController.getAllUsers);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.deleteUser,
);

export const UserRoutes = router;
