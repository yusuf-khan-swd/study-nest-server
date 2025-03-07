import { Router } from 'express';
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
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/enrolls',
    route: EnrollRoutes,
  },
  {
    path: '/payments',
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
