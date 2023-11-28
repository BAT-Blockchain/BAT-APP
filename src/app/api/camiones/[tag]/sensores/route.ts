import { NextRequest, NextResponse } from "next/server"
import { Props } from "@/src/lib/types"
import { getSensores, createSensor } from "@/src/lib/controllers"

export async function GET(req: NextRequest, { params: { tag } }: Props) {
  if (req.headers.get("key") === process.env.ADMIN_API_KEY) {
    const [output, code]: any = await getSensores(tag)
    const body = code === 200 ? output : { mensaje: output }
    return NextResponse.json(body, { status: code })
  }
  return NextResponse.json({ mensaje: "No autorizado" }, { status: 401 })
}

export async function POST(req: Request, { params: { tag } }: Props) {
  if (req.headers.get("key") === process.env.HARDWARE_API_KEY) {
    const body = await req.json()
    const [output, code]: any = await createSensor(body, tag)
    return NextResponse.json({ mensaje: output }, { status: code })
  }
  return NextResponse.json({ mensaje: "No autorizado" }, { status: 401 })
}
