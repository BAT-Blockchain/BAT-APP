import type { NextApiRequest, NextApiResponse } from "next"
import { getCamion, createCamion } from "@/lib/controllers"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let code: any
  let output: any
  switch (req.method) {
    case "GET":
      ;[output, code] = await getCamion()
      const body = code === 200 ? output : { mensaje: output }
      return res.status(code).json(body)

    case "POST":
      ;[output, code] = await createCamion(req.body)
      return res.status(code).json({ mensaje: output })

    default:
      return res.status(405).json({ mensaje: "Solo se permite GET y POST a esta ruta" })
  }
}
