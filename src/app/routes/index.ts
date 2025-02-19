import { Router } from 'express';
// import { AuthRoutes } from '../modules/Auth/auth.route';
// import { CarRoutes } from '../modules/Course/car.route';
// import { orderRoutes } from '../modules/Order/order.routes';
// import { paymentRoutes } from '../modules/Payment/payment.routes';
// import { ReviewRoutes } from '../modules/Review/review.route';
import { UserRoutes } from '../modules/User/user.route';

const router = Router();

const moduleRoutes = [
  // {
  //   path: '/auth',
  //   route: AuthRoutes,
  // },
  // {
  //   path: '/cars',
  //   route: CarRoutes,
  // },
  // {
  //   path: '/reviews',
  //   route: ReviewRoutes,
  // },
  {
    path: '/users',
    route: UserRoutes,
  },
  // {
  //   path: '/orders',
  //   route: orderRoutes,
  // },
  // {
  //   path: '/payment',
  //   route: paymentRoutes,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
