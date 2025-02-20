import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { PaymentController } from './payment.controller';
import { PaymentValidation } from './payment.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(PaymentValidation.paymentValidationSchema),
  PaymentController.createPayment,
);

export const PaymentRoutes = router;
