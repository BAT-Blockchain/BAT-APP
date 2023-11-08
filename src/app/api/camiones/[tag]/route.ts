import { NextRequest, NextResponse } from "next/server"
import { Props } from "@/src/lib/types"
import { getCamion, updateCamion, deleteCamion } from "@/src/lib/controllers"

export async function GET(req: Request, { params: { tag } }: Props) {
  const [output, code]: any = await getCamion(tag)
  const body = code === 200 ? output : { mensaje: output }
  return NextResponse.json(body, { status: code })
}

export async function PUT(req: Request, { params: { tag } }: Props) {
  const reqBody = await req.json()
  const [output, code]: any = await updateCamion(reqBody, tag, "PUT")
  const body = code === 200 ? output : { mensaje: output }
  return NextResponse.json(body, { status: code })
}

export async function PATCH(req: NextRequest, { params: { tag } }: Props) {
  const reqBody = await req.json()
  const [output, code]: any = await updateCamion(reqBody, tag, "PATCH")
  const body = code === 200 ? output : { mensaje: output }
  return NextResponse.json(body, { status: code })
}

export async function DELETE(req: NextRequest, { params: { tag } }: Props) {
  const [output, code]: any = await deleteCamion(tag)
  return NextResponse.json({ mensaje: output }, { status: code })
}
