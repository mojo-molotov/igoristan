import type { Config } from 'vike/types';

import vikeReact from 'vike-react/config';

import BRAND from '@/config/brand';

export default {
  description: 'Welcome to the Empire',
  extends: [vikeReact],
  prerender: true,
  title: BRAND
} satisfies Config;
