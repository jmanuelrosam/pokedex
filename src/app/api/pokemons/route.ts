import { db } from "@/lib/db"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams

  const data = await db.pokemon.findMany({
    where: {
      name: {
        contains: params.get('filter[name]') ?? undefined,
        mode: 'insensitive',
      }
    },
  })

  return NextResponse.json(
    { data },
    { status: 200 }
  )
}
