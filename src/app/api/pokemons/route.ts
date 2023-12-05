import { db } from "@/lib/db"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams

  const sort = params.get('sort') ?? 'name'
  const normalizeSort = sort.split(',').map((field) => {
    if (field.startsWith('-')) {
      return { [field.slice(1)]: 'desc' }
    }

    return {[field]: 'asc'}
  })

  const data = await db.pokemon.findMany({
    where: {
      name: {
        contains: params.get('filter[name]') ?? undefined,
        mode: 'insensitive',
      }
    },
    orderBy: normalizeSort,
  })

  return NextResponse.json(
    { data },
    { status: 200 }
  )
}
