import type { NextApiRequest, NextApiResponse } from "next"
import { getSensores, createSensor } from "@/lib/controllers"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let code: any
  let output: any
  let body: any
  switch (req.method) {
    case "GET":
      ;[output, code] = await getSensores(req.query.tag as string)
      body = code === 200 ? output : { mensaje: output }
      return res.status(code).json(body)

    case "POST":
      ;[output, code] = await createSensor(req.body, req.query.tag as string)
      return res.status(code).json({ mensaje: output })

    default:
      return res.status(405).json({ mensaje: "Solo se permite GET y POST a esta ruta" })
  }
}
