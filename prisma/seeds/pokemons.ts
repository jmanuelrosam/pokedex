import { PrismaClient } from '@prisma/client'

interface PokemonAPIStat {
  stat: {
    name: String,
  }
  base_stat: String,
}

interface PokemonAPIAbility {
  ability: {
    name: String,
  }
}

interface PokemonAPITypes {
  type: {
    name: String,
  }
}

async function getPokemons({ limit = 1, offset = 0 } = {}) {
  const pokemons = await fetch(`${process.env.POKE_API_URL}/pokemon?limit=${limit}&offset=${offset}`)

  if (!pokemons.ok) {
    throw new Error('Failed to fetch data')
  }

  return pokemons.json()
}

async function getPokemonDetails(url: string) {
  const pokemon = await fetch(url)

  if (!pokemon.ok) {
    throw new Error('Failed to fetch data')
  }

  return pokemon.json()
}

export async function pokemonsSeeds(db: PrismaClient) {
  const { count: limit } = await getPokemons();

  const maxIterations = Math.ceil(limit / 100)

  for(let index = 0; index <= maxIterations; index++) {
    const pokemons = await getPokemons({ limit: 100, offset: index * 100 })

    for (const pokemon of pokemons.results) {
      const details = await getPokemonDetails(pokemon.url)
      const batch = []
      batch.push(
        db.pokemon.create({
          data: {
            pokemonId: details.id,
            description: 'X',
            name: details.name,
            image: details.sprites.other['official-artwork'].front_default,
            height: details.height,
            weight: details.weight,
            category: details.species.name,
            stats: details.stats.map((stat: PokemonAPIStat) => ({
              name: stat.stat.name,
              value: stat.base_stat,
            })),
            abilities: details.abilities.map((ability: PokemonAPIAbility) => ability.ability.name),
            types: {
              connectOrCreate: details.types.map((t: PokemonAPITypes) => ({
                where: { name: t.type.name },
                create: { name: t.type.name },
              })),
            },
          },
        })
      )

      await Promise.all(batch)
    }
  }
}
