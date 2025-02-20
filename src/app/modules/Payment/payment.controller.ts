import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PaymentService } from './payment.service';

const createPayment = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await PaymentService.createPayment(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Payment Created Successfully',
    data: result,
  });
});

export const PaymentController = {
  createPayment,
};
