import { NextResponse } from "next/server"
import { getCamion, createCamion } from "@/src/lib/controllers"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (session) {
    const [output, code]: any = await getCamion()
    const body = code === 200 ? output : { mensaje: output }
    return NextResponse.json(body, { status: code })
  }
  return NextResponse.redirect(process.env.NEXTAUTH_URL + "/api/auth/signin")
}

export async function POST(req: Request) {
  const body = await req.json()
  const [output, code]: any = await createCamion(body)
  return NextResponse.json({ mensaje: output }, { status: code })
}
