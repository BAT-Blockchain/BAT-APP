import { getServerSession } from "next-auth"
import { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions)
  return res.json(session)
}
