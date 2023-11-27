'use client'

import styles from '@/src/app/login/Login.module.css'
import { signIn } from 'next-auth/react'
import { GoogleLoginButton, GithubLoginButton } from 'react-social-login-buttons'
import { Fredoka } from 'next/font/google'

const fredoka = Fredoka({ subsets: ['latin'], weight: '300', width: 110 })

export default function Page() {
    return (
        <div className={styles.body}>
            <div className={styles.loginContainer}>
                <p style={fredoka.style} className={styles.tituloLog}>Unete a la familia B.A.T</p>
                <ul className={styles.loginButtonsList}>
                    <li className={styles.item} onClick={() => signIn('github', { callbackUrl: '/datos' })}>
                        <div className={styles.githubLoginButton}>
                            <GithubLoginButton />
                        </div>
                    </li>

                    <li className={styles.item} onClick={() => signIn('google', { callbackUrl: '/datos' })}>
                        <div className={styles.googleLoginButton}>
                            <GoogleLoginButton />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}