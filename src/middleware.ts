export { default } from "next-auth/middleware"

export const config = { matcher: ["/datos", "/api/camiones", "/api/camiones/:tag", "/api/camiones/:tag/sensores"] }
