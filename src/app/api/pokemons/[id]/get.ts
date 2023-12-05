import { db } from "@/lib/db"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const data = await db.pokemon.findUnique({
    where: {
      id: params.id,
    },
    include: {
      types: true,
    },
  })

  if (data === null) {
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
      data,
    },
    { status: 200 }
  )

}
