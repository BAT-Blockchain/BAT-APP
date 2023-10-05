import type { NextApiRequest, NextApiResponse } from "next"
import { getCamion, updateCamion, deleteCamion } from "@/src/lib/controllers"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let output: any
  let code: any
  let body: any
  const tag = req.query.tag as string

  switch (req.method) {
    case "GET":
      ;[output, code] = await getCamion(tag)
      body = code === 200 ? output : { mensaje: output }
      return res.status(code).json(body)

    case "PUT":
      ;[output, code] = await updateCamion(req.body, tag, "PUT")
      body = code === 200 ? output : { mensaje: output }
      return res.status(code).json(body)

    case "PATCH":
      ;[output, code] = await updateCamion(req.body, tag, "PATCH")
      body = code === 200 ? output : { mensaje: output }
      return res.status(code).json(body)

    case "DELETE":
      ;[output, code] = await deleteCamion(tag)
      return res.status(code).json({ mensaje: output })

    default:
      return res.status(405).json({ mensaje: "Metodo no soportado" })
  }
}
