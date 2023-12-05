import Link from "next/link"

import { PokemonCard } from "@/app/_components/PokemonCard"
import { IconSearch } from "@/app/_components/icons/search"
import { Suspense } from "react";
import { Pokemon } from "@prisma/client";

async function getPokemons () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/pokemons`);

  if (!res.ok) {
    throw new Error('Failed to fetch Pokemons')
  }

  return res.json()
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  console.log('[DEBUG] ~ file: page.tsx:20 ~ Page ~ searchParams:', searchParams)

  const { data: pokemons } = await getPokemons() as { data: Pokemon[] };

  return (
    <>
      <header>
        <div className="container mx-auto">
          <h1 className="text-2xl text-slate-600 py-4">Pokedex</h1>
        </div>
        <div className="bg-neutral-700 py-4 text-white">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 items-center">
            <form className="space-y-4">
              <label htmlFor="q" className="block text-white text-xl">Name or Number</label>
              <div className="flex flex-row gap-x-4">
                <input type="search" name="q" className="grow py-4 px-2 outline-none rounded-md text-slate-600" placeholder="Name or Number" />
                <button type="submit"><IconSearch className="h-4 w-4" /></button>
              </div>
              <p className="">Use the Advanced Search to explore Pokémon by type, weakness, Ability, and more!</p>
            </form>
            <div className="bg-green-700 p-8">Search for a Pokémon by name or using its National Pokédex number.</div>
          </div>
        </div>
      </header>

      <aside>
        <div></div>
        <div>Show Advanced Search</div>
      </aside>

      <main className="container mx-auto">
        <button>Surprise Me!</button>
        <div>
          <label htmlFor="">Sort By</label>
          <select name="">
            <option value="">Height (ascending)</option>
            <option value="">Height (descending)</option>
            <option value="">Width (ascending)</option>
            <option value="">Width (descending)</option>
            <option value="">A-Z</option>
            <option value="">Z-A</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
          <Suspense fallback={<p>loading</p>}>
            {pokemons.map(pokemon => <Link key={pokemon.id} href={`/${pokemon.id}`}>
              <PokemonCard types={[]} {...pokemon} />
            </Link>)}
          </Suspense>
        </div>
      </main>
    </>
  )
}
