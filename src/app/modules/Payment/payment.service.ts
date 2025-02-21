import { TEnroll } from '../Enroll/enroll.interface';
import { Enroll } from '../Enroll/enroll.model';
import { TPayment } from './payment.interface';
import { Payment } from './payment.model';

const createPayment = async (payload: TPayment) => {
  const result = await Payment.create(payload);

  const { email, course } = payload;
  const enrollData: TEnroll = { email, course, payment: result._id };
  await Enroll.create(enrollData);

  return result;
};

export const PaymentService = {
  createPayment,
};
