import type { InferOutput } from 'valibot';

import { optional, number, object, string, array } from 'valibot';

const PokemonSpritesSchema = object({
  other: object({
    'official-artwork': object({
      front_default: string()
    })
  }),
  front_default: string()
});

const PokemonCriesSchema = object({
  latest: optional(string()),
  legacy: optional(string())
});

const PokemonTypeSchema = object({
  type: object({
    name: string()
  })
});

export const PokemonSchema = object({
  cries: optional(PokemonCriesSchema),
  types: array(PokemonTypeSchema),
  sprites: PokemonSpritesSchema,
  height: number(),
  weight: number(),
  name: string(),
  id: number()
});

export type Pokemon = InferOutput<typeof PokemonSchema>;
