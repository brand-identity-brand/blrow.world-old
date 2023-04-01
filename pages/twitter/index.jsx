import Head from 'next/head'
import css from './index.module.css'

import { useRouter } from 'next/router'
import Image from 'next/image'
import Hand from '@/public/twitter/Hand.png';
import Face from '@/public/twitter/face.png';
import { use, useEffect } from 'react'
import NavBar from './component/NavBar'
import { useContext, useState } from 'react';
import { TimerContext, convertTime } from '@/context/TimerContext';

import { ProgressContext } from '@/context/ProgressContext';
import { getCookie } from 'cookies-next';

import { imageSrc, counter } from '@/lib/art';
// import Art00 from '@/public/fakeFileServer/Asset 1.png';
// import Art01 from '@/public/fakeFileServer/Asset 2.png';
// import Art02 from '@/public/fakeFileServer/Asset 3.png';
// import Art03 from '@/public/fakeFileServer/Asset 4.png';
// import Art04 from '@/public/fakeFileServer/Asset 5.png';
// import Art05 from '@/public/fakeFileServer/Asset 6.png';
// import Art06 from '@/public/fakeFileServer/Asset 7.png';
// import Art07 from '@/public/fakeFileServer/Asset 8.png';
// import Art08 from '@/public/fakeFileServer/Asset 9.png';
// import Art09 from '@/public/fakeFileServer/Asset 10.png';

// const imageSrc=[
//   Art09,

//   Art01,
//   Art00,

//   Art06,
//   Art07,
//   Art08,

//   Art05,
//   Art02,
//   Art03,
//   Art04,
// ]
export default function Twitter() {
  
  const { progressState, setProgressState, pathUnlocked, stageVisited } = useContext(ProgressContext);

  const router = useRouter();
  const [ artistCookie, setArtistCookie ] = useState('');
  const { TimerState, setTimerState } = useContext(TimerContext);
  const { timeLimit } = TimerState;

  useEffect(()=>{
    stageVisited(1);
    setArtistCookie( getCookie('artist') );
  },[]);
  
  return (<>
    <Head>
        <title>blrow.world</title>
        <meta name="description" content="blrow.world" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={css.main}>
      <NavBar/>
      <div className={css.faceContainer} >
        <ZeFace zIndex={9} mixBlendMode={'screen'} opacity={'50%'}/>
        <ZeFace zIndex={2} mixBlendMode={'hard-light'} opacity={'20%'}/>
      </div>
      <div className={css.headingContainer}>
        <div className={css.titleContainer}>
          <div>
            THE EXHIBITION
          </div>
        </div>
        <div className={css.subTitleContainer}>
          <div>
            {`Artist #${artistCookie}`}
          </div>
          <div>
            begins in <span style={{color: 'greenyellow'}}>{convertTime(timeLimit)}</span>
          </div>
        </div>

      </div>

      <div
        className={css.paintingSetContainer}
      >
        <ZePlaceholder progressState={progressState} stage={1} art={0} router={router} setTimerState={setTimerState} timeLimit={timeLimit}/>
      </div>

      <div
        className={css.paintingSetContainer}
      >
        <ZePlaceholder progressState={progressState} stage={2} art={0} router={router} setTimerState={setTimerState} timeLimit={timeLimit}/>
        <ZePlaceholder progressState={progressState} stage={2} art={1} router={router} setTimerState={setTimerState} timeLimit={timeLimit}/>
      </div>

      <div
        className={css.paintingSetContainer}
      >
        <ZePlaceholder progressState={progressState} stage={3} art={0} router={router} setTimerState={setTimerState} timeLimit={timeLimit}/>
        <ZePlaceholder progressState={progressState} stage={3} art={1} router={router} setTimerState={setTimerState} timeLimit={timeLimit}/>
        <ZePlaceholder progressState={progressState} stage={3} art={2} router={router} setTimerState={setTimerState} timeLimit={timeLimit}/>
      </div>

      <div
        className={css.paintingSetContainer}
      >
        <ZePlaceholder progressState={progressState} stage={4} art={0} router={router} setTimerState={setTimerState} timeLimit={timeLimit}/>
        <ZePlaceholder progressState={progressState} stage={4} art={1} router={router} setTimerState={setTimerState} timeLimit={timeLimit}/>
        <ZePlaceholder progressState={progressState} stage={4} art={2} router={router} setTimerState={setTimerState} timeLimit={timeLimit}/>
        <ZePlaceholder progressState={progressState} stage={4} art={3} router={router} setTimerState={setTimerState} timeLimit={timeLimit}/>
      </div>
    </main>
  </>)
}

export async function getStaticProps(context) {

  return {
    props: {}, // will be passed to the page component as props
  }
}

function ZePlaceholder({progressState, stage, art, router, setTimerState, timeLimit}){

  // let counter = 0;
  // let value = stage - 1;
  // while ( value ) {
  //   counter = counter + value;
  //   value = value - 1;
  // }
  // counter = counter + art;
  return(
    <div
      className={css.paintingContainer + ' ' + css[`size${stage}`]}
      style={progressState[stage].paths.blue
        ? { 
          backgroundColor: 'rgb(128, 0, 128, 0)',
          filter: stage === 3
          ? 'drop-shadow( 0vw 1vw 1vw black)'
          : 'drop-shadow( 0vw 3vw 2vw black)'
        }
        : {}
      }
      onClick = {progressState[stage].paths.blue
        ? ()=>{ 
          setTimerState({
            timeLimit: timeLimit,
            speed: 1000
          });
          router.push(`/twitter/post?stage=${stage}&art=${art}`); 
        }
        : null
      }
    >
      {progressState[stage].paths.blue
        ? <ZeArt src={imageSrc[counter( stage, art )]} alt={`${stage}-${art}`} /> 
        : <ZeHand/>
      }
    </div>
  )
}

function ZeArt({alt, src}){
  return( 
    <Image
      src = {src}
      alt = {alt}
      fill
      style={{
        objectFit: 'contain',
      }}
    />
  )
}

function ZeHand(){
  return( 
    <Image
      alt={'五指山'}
      src={Hand}
      style={{
        // objectFit: 'contain',
        // position: 'absolute',
        width: '100%',
        height: 'auto'
      }}
    />
  )
}

function ZeFace({zIndex, mixBlendMode, opacity}){
  return(
    <div
      style={{
        opacity: opacity,
        zIndex: zIndex,
        width: '100vw',
        mixBlendMode: mixBlendMode, //hard-light, screen
        position: 'fixed', //'absolute'
        right: '0',
        display: 'flex',
        flexDirection: 'row-reverse',
      }}
    >
      <Image
        alt={'mask'}
        src={Face}
        style={{
          width: '69%',
          height: 'auto',
          objectFit: 'contain'
        }}
      />
    </div>
  )
}
