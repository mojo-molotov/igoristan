import type { NonEmptyArray } from '@/types/utils';

/**
 * Picks a random element from an array
 * @param arr - The array to pick from
 * @returns A random element from the array
 */
export function pickRandom<T extends NonEmptyArray<any>>(arr: T): T[number] {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
