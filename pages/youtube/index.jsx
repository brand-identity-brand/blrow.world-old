import Head from 'next/head'
import css from './index.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Timer from '@/component/Timer'
import { useContext, useEffect, useRef } from 'react';
import { TimerContext } from '@/context/TimerContext';
import { ProgressContext } from '@/context/ProgressContext';
import QRCodeRickRoll from '@/public/youtube/qrCode.png';

export default function Youtube() {
  const router = useRouter();
  const { progressState, pathUnlocked, stageVisited, isExhibitionReady } = useContext(ProgressContext);
  const { speed, visits } = progressState[5];
  const { TimerState, setTimerState } = useContext(TimerContext);
  const { timeLimit } = TimerState;
  useEffect(()=>{
    stageVisited(5);
    console.log(isExhibitionReady())
  },[]);

  const exhibitionProgress = isExhibitionReady();

  return (<>
    <Head>
        <title>blrow.world</title>
        <meta name="description" content="blrow.world" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={css.main}>
      <Timer speed={speed}/>
      <div 
        className={css.qrCodeContainer}
        onClick={()=>{
          if ( exhibitionProgress.reduce( (accum,curr) => accum&&curr, true ) ) {
            const lockProgress = confirm('start your exhibition?');
            if ( lockProgress ) {
              setTimerState({
                timeLimit: timeLimit,
                speed: 2147483647
              });
              pathUnlocked(5, 'blue');
              router.push('/twitter');
            }
          } else if ( 
            exhibitionProgress[1] === false ||
            exhibitionProgress[2] === false ||
            exhibitionProgress[3] === false ||
            exhibitionProgress[4] === false
          ) {
            alert(`
              set 1 ${exhibitionProgress[1]}
              set 2 ${exhibitionProgress[2]}
              set 3 ${exhibitionProgress[3]}
              set 4 ${exhibitionProgress[4]}
            `);
          } else if ( exhibitionProgress[5]  === false ) {
            alert('you need a title and a brief statement for your exhibition on the invitation.');
          }
        }}
      >
        <Image
          alt={'QR Code'}
          src={QRCodeRickRoll}
          fill
        />
      </div>
    </main>
  </>)
}

export async function getStaticProps(context) {

  return {
    props: {}, // will be passed to the page component as props
  }
}