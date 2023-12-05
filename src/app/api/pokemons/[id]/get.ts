import { db } from "@/lib/db"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const pokemon = await db.pokemon.findUnique({
    where: {
      id: params.id,
      deleted: false,
    },
    include: {
      types: true,
    },
  })

  if (pokemon === null) {
    return NextResponse.json(
      {
        error: true,
        message: 'Pokemon not found',
      },
      { status: 404 }
    )
  }

  return NextResponse.json(
    {
      links: {
        self: decodeURI(request.nextUrl.href),
      },
      data: Object.entries(pokemon)
        .reduce((acc, [key, value]) => {
          if (key === 'deleted') {
            return acc
          }

          return { ...acc, [key]: value }
        }, {}),
    },
    { status: 200 }
  )

}
