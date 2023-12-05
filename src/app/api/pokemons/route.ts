import { db } from "@/lib/db"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const data = await db.pokemon.findMany()

  return NextResponse.json(
    { data },
    { status: 200 }
  )
}
