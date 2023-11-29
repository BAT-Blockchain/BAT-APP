import React from 'react';
import Temperatura from '@/src/components/LineChartTemperatura.jsx'
import Humedad from '@/src/components/LineChartHumedad'
import styles from '@/src/app/styles/Home.module.css'
import { Fredoka } from 'next/font/google'
import { prisma } from '@/src/lib/db'
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route"

const fredoka = Fredoka({ subsets: ['latin'], weight: '300', width: 110 })

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (!session) return (<h1 style={fredoka.style} className={styles.msjDatos}> ACCESO DENEGADO, DEBES ESTAR LOGUEADO PARA VER TUS DATOS</h1>)
  const data = await getData(session.user.email)
  if (data === null) return (<h1 style={fredoka.style} className={styles.msjDatos}>NO HAY DATOS EN TU CUENTA</h1>)
  return (
    <div className={styles.body}>
      <div className={styles.datos}>
        {
          <div className={styles.resu}>
            <h2 style={fredoka.style} className={styles.titulo}> RESULTADOS DE TRAZABILIDAD</h2>
            <div className={styles.izquierda}>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <div className={styles.cardRegistro}>
                    <p style={fredoka.style} className={styles.tituloRegistro}>Recorrido del transporte</p>
                    <p style={fredoka.style} className={styles.textoRegistro}>{data.idCam}</p>
                    <img className={styles.camion} src="camion-de-reparto.png" alt="" />
                  </div>
                </li>
                <li className={styles.item}>
                  <div className={styles.cardGps}>
                    <p style={fredoka.style} className={styles.tituloGps}>Ubicación</p>
                    <p style={fredoka.style} className={styles.textoLatitud}>Latitud: {data.ubicacion.latitud}</p>
                    <p style={fredoka.style} className={styles.textoLongitud}>Longitud: {data.ubicacion.longitud} </p>
                    <img className={styles.gps} src="ubicacion.png" alt="" />
                  </div>
                </li>
                <li className={styles.item}>
                  <div className={styles.cardTiempo}>
                    <p style={fredoka.style} className={styles.tituloTiempo}>Peso </p>
                    <p style={fredoka.style} className={styles.textoTiempo}> {data.peso} g </p>
                    <img className={styles.reloj} src="reloj-de-pared-2.png" alt="" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        }
      </div>
      <div className={styles.divchart}>
        <Temperatura
          data={data.temperatura}
          labels={data.time}
        />
        <Humedad
          data={data.humedad}
          labels={data.time}
        />
      </div>
    </div>
  )
}

async function getData(company) {

  try {
    const result = await prisma.sensores.findMany({
      where: {
        Camion: {
          companiaId: company
        }
      }
    })
    if(result.length === 0) {
      return null
    }
    let humedad = []
    let temperatura = []
    let time = []
    for (const obj of result) {
      humedad.push(obj.humedad)
      temperatura.push(obj.temperatura)
      let date = new Date(obj.tiempoMedicion)
      let hours = date.getHours()
      let minutes = date.getMinutes() === 0 ? "00" : date.getMinutes()
      time.push(hours + ':' + minutes)
    }
    return {
      humedad: humedad,
      temperatura: temperatura,
      time: time,
      ubicacion: { latitud: result[0].latitud, longitud: result[0].longitud },
      peso: result[0].peso,
      idCam: result[0].idCamion
    }
  }
  catch (err) {
    throw new Error(err)
  }
}