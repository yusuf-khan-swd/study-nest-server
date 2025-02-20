import { Payment } from './payment.model';

const createPayment = async (payload: any) => {
  const { payment, course } = payload;

  console.log(course);

  // TODO: Add course data to enroll collection

  const result = await Payment.create(payment);
  return result;
};

export const PaymentService = {
  createPayment,
};
