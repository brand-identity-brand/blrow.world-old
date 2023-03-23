import Head from 'next/head'
import css from './index.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Timer from '@/component/Timer'
import { useContext } from 'react';
import { TimerContext } from '@/context/TimerContext';

export default function Youtube() {
  const router = useRouter();
  
  const { TimerState, setTimerState } = useContext(TimerContext);
  const { timeLimit } = TimerState;

  return (<>
    <Head>
        <title>blrow.world</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={css.main}>
      <Timer speed={50}/>
      <button
        onClick={()=>{
          setTimerState({
            timeLimit: timeLimit,
            speed: 2147483647
          });
          router.push('/twitter');
        }}
      >
        QR
      </button>
    </main>
  </>)
}

export async function getStaticProps(context) {

  return {
    props: {}, // will be passed to the page component as props
  }
}