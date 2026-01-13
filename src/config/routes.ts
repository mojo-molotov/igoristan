import type { Routes } from '@/types/Routes';

import createRoutes from './builders/routesBuilder';

const __ROOT = '/igoristan/';

const __ROUTES = {
  RANDOM_ERROR: 'random-error',
  HOME: ''
} as const satisfies Routes;

const ROUTES = createRoutes(__ROUTES, __ROOT);

export default ROUTES;
