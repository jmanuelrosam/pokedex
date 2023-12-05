import { db } from "@/lib/db"
import { NextResponse, type NextRequest } from "next/server"

const SORTABLE_FIELDS:readonly string[] = ['name', 'height', 'weight']

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams

  const sort = params.get('sort') ?? 'name'
  const normalizeSort = sort.split(',')
    .filter((field) => SORTABLE_FIELDS.includes(field))
    .map((field) => {
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
    {
      data,
      links: {
        self: request.url
      }
    },
    { status: 200 }
  )
}
