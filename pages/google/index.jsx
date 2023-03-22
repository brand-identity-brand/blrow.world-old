import Head from 'next/head'
import css from './index.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Logo from './public/logo.png'

import Timer from '@/component/Timer'
import { useContext } from 'react';
import { TimerContext } from '@/context/TimerContext';

export default function Google() {
  const router = useRouter();

  const { TimerState, setTimerState } = useContext(TimerContext);
  const { timeLimit } = TimerState;

  return (
    <>
        <Head>
            <title>blrow.world</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={css.main}>
          <Timer speed={1000}/>
          <div className={css.logoContainer}>
            <Image
              src={Logo}
              fill
              style={{
                objectFit: 'contain'
              }}
            />
          </div>
          <input 
            autoFocus={true}
            className={css.input}
            type={'text'}
          />
          <button
            className={css.searchButton}
            onClick={()=>{
              router.push('/reddit');
            }}
          >
            SEARCH
          </button>
          <button
            className={css.luckyButton}
            onClick={()=>{
              setTimerState({
                timeLimit: timeLimit,
                speed: 2147483647
              })
              router.push('/reddit');
            }}
          >
            I'm feeling lucky
          </button>
        </main>
    </>
  )
}

export async function getStaticProps(context) {

  return {
    props: {}, // will be passed to the page component as props
  }
}
