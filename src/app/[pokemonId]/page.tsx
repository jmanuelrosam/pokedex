export default async function Details({ params }: { params: { pokemonId: string } }) {
  return <div>My Post: {params.pokemonId}</div>
}
