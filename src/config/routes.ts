import type { Routes } from '@/types/Routes';

import createRoutes from './builders/routesBuilder';

const __ROOT = '/igoristan/';

const DASHBOARD = 'dashboard';

const __ROUTES = {
  DASHBOARD_NESTED: `${DASHBOARD}/nested`,
  RANDOM_ERROR: 'random-error',
  DASHBOARD,
  HOME: ''
} as const satisfies Routes;

const ROUTES = createRoutes(__ROUTES, __ROOT);

export default ROUTES;
