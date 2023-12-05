import { db } from "@/lib/db"
import { pokemonSchema } from "@/schemas/pokemon"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
    pokemonSchema.strict().parse(body)
  } catch {
    return NextResponse.json(
      {
        error: true,
        message: "Invalid data",
      },
      { status: 422 }
    )
  }

  const pokemon = await db.pokemon.create({
    data: body
  })

  return NextResponse.json(
    {
      links: {
        self: `${decodeURI(request.nextUrl.href)}/${pokemon.id}`,
      },
      data: Object.entries(pokemon)
        .reduce((acc, [key, value]) => {
          if (key === 'deleted') {
            return acc
          }

          return { ...acc, [key]: value }
        }, {})
    },
    { status: 201 }
  )
}
