import React from 'react';
import Head from 'next/head'
import styles from '@/src/app/landing/Inicio.module.css'
import { Fredoka } from 'next/font/google'

const fredoka = Fredoka({ subsets: ['latin'], weight: '300', width: 110 })

export default function Page() {
    return (
        <div className={styles.body}>
            <Head>
                <title> B.A.T </title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/LogoB.png/" />
            </Head>
            <div className={styles.infoContainer}>
                <img className={styles.logo} src="logoLanding.png" alt="" />
                <h2 style={fredoka.style} className={styles.titulo}>TU SEGURIDAD EN CAMINO</h2>
                <button style={fredoka.style} className={styles.log}>Log In</button>
                <div className={styles.fondo}>
                    <img className={styles.laptop} src="laptop.png" alt="" />
                    <img className={styles.celular} src="celular.png" alt="" />             
                </div>  
            </div>       
        </div>
    )
}

