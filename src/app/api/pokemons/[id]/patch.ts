import { db } from "@/lib/db"
import { updatePokemonSchema } from "@/schemas/pokemon"
import { NextResponse, type NextRequest } from "next/server"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json()

  const pokemon = await db.pokemon.findUnique({
    where: {
      id: params.id,
    }
  })

  let parsed
  try {
    parsed = updatePokemonSchema.parse(body)
  } catch (e) {
    return NextResponse.json(
    {
      error: true,
      message: "Invalid data",
    },
    { status: 422 }
  )
  }

  const saved = await db.pokemon.update({
    where: {
      id: params.id,
    },
    data: parsed
  })

  return NextResponse.json(
    {
      links: {
        self: `${decodeURI(request.nextUrl.href)}/${saved.id}`,
      },
      data: saved
    },
    { status: 200 }
  )
}
