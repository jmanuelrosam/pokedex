import { db } from "@/lib/db"
import { NextResponse, type NextRequest } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await db.pokemon.update({
      where: {
        id: params.id,
      },
      data: {
        deleted: true,
      }
    })
  } catch (e) {
    return NextResponse.json(
      {
        error: true,
        message: "Invalid data",
      },
      { status: 422 }
    )
  }

  return NextResponse.json({},
    { status: 200 }
  )

}
