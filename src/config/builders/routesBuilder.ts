import type { PrefixedRoutes, Routes } from '@/types/Routes';

const __remapRoute = <Input extends Routes, Root extends string>(k: keyof Input, v: Input[typeof k], root: Root) => [k, `${root}${v}`];

const createRoutes = <__Routes extends Routes, Root extends string>(routes: __Routes, root: Root): PrefixedRoutes<__Routes, Root> =>
  Object.freeze(Object.fromEntries(Object.entries(routes).map(([k, v]) => __remapRoute(k, v, root))));

export default createRoutes;
