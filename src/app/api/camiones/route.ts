import { NextResponse } from "next/server"
import { getCamion, createCamion } from "@/src/lib/controllers"

export async function GET() {
  const [output, code]: any = await getCamion()
  const body = code === 200 ? output : { mensaje: output }
  return NextResponse.json(body, { status: code })
}

export async function POST(req: Request) {
  const body = await req.json()
  const [output, code]: any = await createCamion(body)
  return NextResponse.json({ mensaje: output }, { status: code })
}
