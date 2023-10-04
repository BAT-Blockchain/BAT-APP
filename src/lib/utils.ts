import { ZodCamionPayload, ZodSensoresPayload } from "./types"
import { Prisma } from "@prisma/client"

export function isValidCamion(obj: any, acceptEmpty: "permit" | "deny") {
  if (acceptEmpty === "deny") {
    return ZodCamionPayload.safeParse(obj)
  } else {
    return ZodCamionPayload.partial().safeParse(obj)
  }
}

export async function isValidSensor(obj: any) {
  return await ZodSensoresPayload.safeParseAsync(obj)
}

export function checkPrismaError(err: any): [string, number] {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    let output: string
    switch (err.code) {
      case "P2025":
        output = "No se encontro un camion con el tag correspondiente"
        console.log(output)
        return [output, 404]

      case "P2002":
        output = "Datos duplicados"
        console.log(err, output)
        return [output, 400]

      default:
        break
    }
  }
  console.log(err)
  return ["Error del servidor", 500]
}
