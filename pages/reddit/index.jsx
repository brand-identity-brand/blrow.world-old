import Head from 'next/head'
import css from './index.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

import Timer from '@/component/Timer';
import { useContext, useEffect } from 'react';
import { TimerContext } from '@/context/TimerContext';
import { ProgressContext } from '@/context/ProgressContext';

export default function Reddit() {
  const router = useRouter();
  const { progressState, pathUnlocked, stageVisited } = useContext(ProgressContext);
  const { speed, visits } = progressState[3];

  const { TimerState, setTimerState } = useContext(TimerContext);
  const { timeLimit } = TimerState;
  useEffect(()=>{
    stageVisited(3);
  },[])
  return (<>
    <Head>
      <link rel="preload" as="image" href='../../public/reddit/background.png'/>
      <title>blrow.world</title>
      <meta name="description" content="blrow.world" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={css.main}>
      <Timer speed={speed}/>
      <button
        onClick={()=>{
          setTimerState({
            timeLimit: timeLimit,
            speed: 2147483647
          })
          pathUnlocked(3, 'blue');
          router.push('/facebook');
        }}
      >
        PROCEED THIS WAY
      </button>
    </main>
  </>)
}

export async function getStaticProps(context) {

  return {
    props: {}, // will be passed to the page component as props
  }
}