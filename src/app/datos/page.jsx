import React from 'react';
import Head from 'next/head'
import Temperatura from '@/src/components/LineChartTemperatura.jsx'
import Humedad from '@/src/components/LineChartHumedad'
import styles from '@/src/app/styles/Home.module.css'
import { Fredoka } from 'next/font/google'

import { getServerSession } from "next-auth"
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route"

const fredoka = Fredoka({ subsets: ['latin'], weight: '300', width: 110 })

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (!session) return (<h1>Acceso denegado</h1>)
  const data = await getData()
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

async function getData() {
  const options = { method: 'GET' };
  const res = await fetch("https://next-app-api.vercel.app/api/camiones/caba-cor/sensores", options)
  const datos = await res.json()
  let humedad = []
  let temperatura = []
  let time = []
  for (const obj of datos) {
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
    ubicacion: { latitud: datos[0].latitud, longitud: datos[0].longitud },
    peso: datos[0].peso,
    idCam: datos[0].idCamion
  }
}