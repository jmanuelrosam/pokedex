import { z } from "zod";

export const pokemonSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  image: z.string().url().optional(),
  height: z.number().int().positive(),
  weight: z.number().int().positive(),
  stats: z.array(
    z.object({
      name: z.string(),
      value: z.number().int().positive(),
    })
  ),
  category: z.string(),
  abilities: z.array(z.string()),
})

export const updatePokemonSchema = pokemonSchema.partial()
