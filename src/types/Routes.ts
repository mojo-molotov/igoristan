export type PrefixedRoutes<__Routes extends Routes, Root extends string> = {
  readonly [K in keyof __Routes]: `${Root}${__Routes[K]}`;
};

export type Routes = Record<string, string>;
