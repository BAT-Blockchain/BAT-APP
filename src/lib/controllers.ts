import { prisma } from "@/lib/db"
import { isValidCamion, isValidSensor, checkPrismaError } from "./utils"
import { camionPayload } from "./types"

export async function updateCamion(body: any, tag: string, method: "PUT" | "PATCH") {
  const acceptEmpty = method === "PATCH" ? "permit" : "deny"
  const parse = isValidCamion(body, acceptEmpty)
  if (!parse.success) {
    let output = parse.error.issues
    console.log(output)
    return [output, 400]
  }
  const payload: any = parse.data
  try {
    await prisma.camiones.update({
      where: {
        tag: tag,
      },
      data: payload,
    })
    const jsonStr = JSON.stringify(payload, null, 2)
    const output = "Valores actualizados:\n" + jsonStr
    console.log(output)
    return [{ actualizado: payload }, 200]
  } catch (err) {
    return checkPrismaError(err)
  }
}

export async function deleteCamion(tag: string) {
  try {
    await prisma.camiones.delete({
      where: {
        tag: tag,
      },
    })
    let output = `Recurso borrado exitosamente`
    return [output, 200]
  } catch (err) {
    return checkPrismaError(err)
  }
}

export async function getCamion(tag?: string) {
  try {
    if (typeof tag === "undefined") {
      const result = await prisma.camiones.findMany()
      let output = "GET a /api/camiones"
      console.log(output)
      return [result, 200]
    }
    const result = await prisma.camiones.findUnique({
      where: {
        tag: tag,
      },
    })
    let output = `GET a /api/camiones/${tag}`
    console.log(output)
    if (result) {
      return [result, 200]
    }
    output = "No se encontro el camion con el tag correspondiente"
    return [output, 404]
  } catch (err) {
    return checkPrismaError(err)
  }
}

export async function createCamion(body: any) {
  const parse: any = isValidCamion(body, "deny")
  if (!parse.success) {
    let output = parse.error.issues
    console.log(output)
    return [output, 400]
  }
  const payload: camionPayload = parse.data
  try {
    const result = await prisma.camiones.create({
      data: payload,
    })
    let output = `Recurso creado con ID: ${result.id}`
    console.log(output)
    return [output, 201]
  } catch (err) {
    return checkPrismaError(err)
  }
}

export async function getSensores(tag: string) {
  try {
    const result = await prisma.sensores.findMany({
      where: {
        idCamion: tag,
      },
    })
    if (result.length === 0) {
      let output = "Este camion no tiene datos de sensores"
      console.log(output)
      return [output, 404]
    }
    let output = `GET a /api/camiones/${tag}`
    console.log(output)
    return [result, 200]
  } catch (err) {
    return checkPrismaError(err)
  }
}

export async function createSensor(body: any, tag: string) {
  const parse = await isValidSensor(body)
  if (!parse.success) {
    let output = parse.error.issues
    console.log(output)
    return [output, 400]
  }
  const payload: any = parse.data
  try {
    let result = await prisma.sensores.create({
      data: { ...payload, idCamion: tag },
    })
    let output = `Recurso creado con ID: ${result.id}`
    console.log(output)
    return [output, 201]
  } catch (err) {
    return checkPrismaError(err)
  }
}
