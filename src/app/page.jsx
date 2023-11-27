'use client'
import React from 'react';
import styles from '@/src/app/styles/Inicio.module.css'
import { Fredoka } from 'next/font/google'
import { useRouter } from 'next/navigation';

const fredoka = Fredoka({ subsets: ['latin'], weight: '300', width: 110 })

export default function Page() {
    const router = useRouter()

    return (
        <>
            <div className={styles.body}>
                <div className={styles.infoContainer}>
                    <img className={styles.logo} src="logoLanding.png" alt="" />
                    <h2 style={fredoka.style} className={styles.titulo}>TU SEGURIDAD EN CAMINO</h2>
                    <button style={fredoka.style} onClick={() => router.push('/login')} className={styles.log}>Log In</button>
                    <div className={styles.fondo}>
                        <img className={styles.laptop} src="laptop.png" alt="" />
                        <img className={styles.celular} src="celular.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

