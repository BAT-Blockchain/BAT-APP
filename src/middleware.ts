import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  if (request.headers.get("key") === process.env.ADMIN_API_KEY) {
    return NextResponse.next()
  } else {
    return NextResponse.json({ mensaje: "No autorizado" }, { status: 401 })
  }
}

export const config = {
  matcher: ["/api/camiones", "/api/camiones/:tag/"],
}
