"use client";

import { signIn, useSession, signOut } from "next-auth/react";

import Menu from '@/src/components/Menu.jsx'
import Busqueda from '@/src/components/Busqueda'
import styles from '@/src/app/styles/Home.module.css'
import { Fredoka } from 'next/font/google'

const fredoka = Fredoka({ subsets: ['latin'], weight: '300', width: 110 })

function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-slate-900 flex items-center py-3 justify-between px-24 text-white">
      <div style={fredoka.style} className={styles.header}>
        <div className={styles.left}>
          <a href="" className={styles.menu} ><Menu width={24} height={23} /></a>
          <a href=""> <img className={styles.logo} src="logo-datos.png" /></a>
        </div>
        <div className={styles.center}>
          <a className={styles.nos} href="">NOSOTROS</a>
          <a className={styles.cont} href="">CONTACTO</a>
          <a className={styles.sub} href="">SUBSCRIPCIÓN</a>
        </div>
        <div className={styles.right}>
          {session?.user ? (
            <div className="flex gap-x-2 items-center">
              <p>
                {session.user.name} {session.user.email}
              </p>
              <img
                src={session.user.image ?? ""}
                alt=""
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <button
                onClick={async () => {
                  await signOut({
                    callbackUrl: "/",
                  })
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-sky-400 px-3 py-2 rounded"
            >
              Sign In
            </button>
          )}
          <a href="" className={styles.lupa}><Busqueda width={24} height={23} /></a>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
