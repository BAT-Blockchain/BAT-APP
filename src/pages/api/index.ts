import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method == 'GET'){
        return res.status(200).send("Bienvenido a la API!")
    }
    else{
        return res.status(405).json({mensaje: "Solo se permite GET a esta ruta"})
    }
}