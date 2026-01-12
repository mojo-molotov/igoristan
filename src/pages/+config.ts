import type { Config } from 'vike/types';

import vikeReact from 'vike-react/config';

import BRAND from '@/config/brand';

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  description: 'Welcome to the Empire',
  extends: [vikeReact],
  prerender: true,

  // https://vike.dev/head-tags
  title: BRAND
} satisfies Config;
