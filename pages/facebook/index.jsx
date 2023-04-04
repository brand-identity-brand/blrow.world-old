import Head from 'next/head'
import css from './index.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

import Timer from '@/component/Timer';
import { useContext, useEffect, useState } from 'react';
import { TimerContext } from '@/context/TimerContext';
import { ProgressContext } from '@/context/ProgressContext';
import ThisButton from '@/component/ThisButton';

export default function Facebook() {
  const router = useRouter();
  const { progressState, pathUnlocked, stageVisited } = useContext(ProgressContext);
  const { speed, visits } = progressState[4];
  const { TimerState, setTimerState } = useContext(TimerContext);
  const { timeLimit } = TimerState;

  const [ messageFade, setMessageFade] = useState(false);
  useEffect(()=>{
    stageVisited(4);
    
  },[]);

  setTimeout(()=>{setMessageFade(true)},18000);

  return (<>
    <Head>
      <link rel="preload" as="image" href='../../public/facebook/background.png'/>
      <title>blrow.world</title>
      <meta name="description" content="blrow.world" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={`${css.hoverMessage} ${messageFade? css.fade : ''}`}>
      <div className={css.messageLines0}>THE</div>
      <div className={css.messageLines0}>GREATEST</div>
      <div className={css.messageLines0}>PLEASURE</div>
      <div className={css.messageLines0}>IN LIFE</div>
      <div className={css.messageLines0}>IS</div>
      <div className={css.messageLines0}>DOING</div>
      <div className={css.messageLines0}>WHAT</div>
      <div className={css.messageLines0}>OTHERS SAY</div>
      <div className={css.messageLines0}>YOU CANNOT DO. </div>
    </div>
    <main className={css.main}>
      <Timer speed={speed}/>
      <div className={css.top}>
        <div className={css.messageLines}> Except this time</div>
        <div className={css.messageLines}> you really</div>
        <div className={css.messageLines}> have to</div>
        <div className={css.messageLines}>press</div>
        <div className={css.messageLines}>this</div>
        <div 
          className={`${css.messageLines} ${css.redPath}`}
          onClick={()=>{
            setTimerState({
              timeLimit: timeLimit,
              speed: 2147483647
            });
            pathUnlocked(4 , 'red');
            // setIsButtonPressed(false);
            setTimeout(()=>{router.push('/youtube')}, 300)
          }}
        >button</div>
      </div>
      {/* <div className={css.bot}> */}
      <ThisButton 
        onClick={()=>{
          setTimerState({
            timeLimit: timeLimit,
            speed: 2147483647
          });
          pathUnlocked(4 , 'blue');
          // setIsButtonPressed(false);
          setTimeout(()=>{router.push('/twitter')}, 300)
        }}
      />
      {/* </div> */}
    </main>
  </>)
}

export async function getStaticProps(context) {

  return {
    props: {}, // will be passed to the page component as props
  }
}