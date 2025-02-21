import { TPayment } from './payment.interface';
import { Payment } from './payment.model';

const createPayment = async (payload: {
  payment: TPayment;
  course: string;
}) => {
  const { payment, course } = payload;

  console.log(course);

  // TODO: Add course data to enroll collection

  const result = await Payment.create(payment);
  return result;
};

export const PaymentService = {
  createPayment,
};
