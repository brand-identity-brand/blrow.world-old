import css from './index.module.css'
import TimerBar from '@/component/TimerBar';
import Head from 'next/head'
import Image from 'next/image'
// import { Inter } from 'next/font/google'
import Link from 'next/link'
import Portal from '@/public/index/portal.png';
import Crowd from '@/public/index/crowd.png';
// const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>
      <Head>
        <title>blrow.world</title>
        <meta name="description" content="blrow.world" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={css.master}>
        <div className={css.portalContainer}>
          <Image
            alt={'portal'}
            src={Portal}
            fill
            style={{
              objectFit: 'contain'
            }}
          />
        </div>
        <div className={css.crowdContainer}>
          <Image
            alt={'crowd'}
            src={Crowd}
            fill
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
      </main>
    </>
  )
}
