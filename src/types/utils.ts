export type UnionToTuple<T> = (
  (T extends any ? (t: T) => T : never) extends infer U ? ((U extends any ? (u: U) => any : never) extends (v: infer V) => any ? V : never) : never
) extends (_: any) => infer W
  ? readonly [...UnionToTuple<Exclude<T, W>>, W]
  : readonly [];

export type NonEmptyArray<T> = readonly [T, ...T[]];
