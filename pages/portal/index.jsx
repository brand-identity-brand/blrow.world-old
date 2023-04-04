import Head from 'next/head'
import css from './index.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import thisButton from '@/public/portal/thisButton.png'
import thisButtonPressed from '@/public/portal/thisButtonPressed.png'
import { useState, useEffect } from 'react'
import { useContext } from 'react';
import { TimerContext, convertTime } from '@/context/TimerContext';
import { ProgressContext } from '@/context/ProgressContext';
import { getCookie } from 'cookies-next';

export default function Portal(props) {
  const {} = props;
  const [ artistCookie, setArtistCookie ] = useState('');

  const router = useRouter()
  const { id } = router.query

  const [ isButtonPressed, setIsButtonPressed ] = useState(false);

  const { TimerState, setTimerState } = useContext(TimerContext);
  const { timeLimit } = TimerState;
  const { stageVisited, pathUnlocked } = useContext(ProgressContext);
  useEffect(()=>{
    stageVisited(0);
    setArtistCookie( getCookie('artist') );
  },[]);
  router.prefetch('/twitter');
  return (
    
    <>
      <Head>
        <link rel="preload" as="image" href='../../public/portal/background.png'/>
        <title>blrow.world</title>
        <meta name="description" content="blrow.world" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={css.main}>
        <div className={css.messageContainer}>
          <div className={css.messageLines}>
            {`Hi Artist #${artistCookie}`}
          </div>
          <div
            className={css.messageLines}
          >
              You have <span style={{color: 'greenyellow', fontFamily: 'VT323, monospace', fontSize: '6vw'}}>{convertTime(timeLimit)}</span> to finish <br/> decorating your exhibition.
          </div>
          <div 
            className={css.messageLines2}
          >
              You know what you should and <br/> shouldn't do.
          </div>
          <div className={css.messageLines2}>
            Have Fun,
      
          </div>
          <div className={css.messageLines2}>
              Sir Real. <br/>
              Director of THE GALLERY.
          </div>
        </div>
        <div className={css.messageLines3}>
          press 
          <span 
            className={css.messageLines3_span}
            onClick={()=>{
              setTimerState({
                timeLimit: timeLimit,
                speed: 2147483647
              });
              pathUnlocked(0 , 'red');
              // setIsButtonPressed(false);
              setTimeout(()=>{router.push('/youtube')}, 300)
            }}
          >
            THIS
          </span> 
          button to begin
        </div>
        {/* <div 
          className={isButtonPressed?  css.thisButtonPressedContainer : css.thisButtonContainer}
          onMouseDown={()=>{
            setIsButtonPressed(true);
          }}
          onClick={()=>{
            // setIsButtonPressed(false);
            setTimeout(()=>{router.push('/twitter')}, 300)
            // router.push('/twitter'); //gallery
          }}
        >
          <Image
            draggable={false}
            src={isButtonPressed? thisButtonPressed : thisButton}
            alt={'THIS button'}
            fill
          />
        </div> */}
          <ThisButton
            onClick={()=>{
              // setTimerState({
              //   timeLimit: timeLimit,
              //   speed: 2147483647
              // });
              pathUnlocked(0 , 'blue');
              // setIsButtonPressed(false);
              setTimeout(()=>{router.push('/twitter')}, 300)
            }}
          />

        {/* <Link href={'/'}> home {id} </Link> */}
      </main>
    </>
  )
}

export async function getServerSideProps(context) {

  return {
    props: {
    }, // will be passed to the page component as props
  }
}


function ThisButton({onClick}){
  const [ isButtonPressed, setIsButtonPressed ] = useState(false);

  useEffect(()=>{
    if ( isButtonPressed ){
      onClick();
    }
  },[isButtonPressed])


  return (
  <div className={css.bot}>

    <div 
      style={isButtonPressed
        ? { visibility: 'hidden' }
        : {}
      }
      className={css.thisButtonContainer}
      onMouseDown={()=>{
        setIsButtonPressed(true);
      }}
      // onClick={onClick}
    >
      <Image
        draggable={false}
        src={thisButton}
        alt={'THIS button'}
        fill
      />
    </div>
    
    <div 
      className={css.thisButtonPressedContainer }
    >
      <Image
        draggable={false}
        src={thisButtonPressed}
        alt={'THIS button'}
        fill
      />
    </div>

  </div>
  )
}