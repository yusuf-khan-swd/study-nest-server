import { Router } from 'express';
// import { AuthRoutes } from '../modules/Auth/auth.route';
// import { CarRoutes } from '../modules/Course/car.route';
// import { orderRoutes } from '../modules/Order/order.routes';
// import { paymentRoutes } from '../modules/Payment/payment.routes';
// import { ReviewRoutes } from '../modules/Review/review.route';
import { CourseRoutes } from '../modules/Course/course.route';
import { EnrollRoutes } from '../modules/Enroll/enroll.route';
import { PaymentRoutes } from '../modules/Payment/payment.route';
import { UserRoutes } from '../modules/User/user.route';

const router = Router();

const moduleRoutes = [
  // {
  //   path: '/auth',
  //   route: AuthRoutes,
  // },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/enrolls',
    route: EnrollRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/payments',
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
