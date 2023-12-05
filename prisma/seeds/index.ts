import { PrismaClient } from '@prisma/client'
import { pokemonsSeeds } from './pokemons';

const db = new PrismaClient({
  log: process.env.DATABASE_DEBUG === 'true'
    ? ['query', 'info', 'warn', 'error']
    : []
})

async function seeds (): Promise<void> {
  await pokemonsSeeds(db);

  await db.$disconnect()
}

try {
  await seeds()
} catch (error) {
  console.error('Error', error)

  await db.$disconnect()

  process.exit(1)
}
