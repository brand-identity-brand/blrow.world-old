import Head from 'next/head'
import css from './index.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Logo from '@/public/google/logo.png'

import Timer from '@/component/Timer'
import { useContext, useRef, useEffect, useState } from 'react';
import { TimerContext } from '@/context/TimerContext';
import { ProgressContext } from '@/context/ProgressContext';

import ReactTestUtils from "react-dom/test-utils";

import { supabase } from '@/lib/supabaseClient';


export default function Google(props) {
  const {
    searchTerms
  } = props;

  const router = useRouter();
  const { progressState, pathUnlocked, stageVisited } = useContext(ProgressContext);
  const { speed, visits } = progressState[2];
  
  const { TimerState, setTimerState } = useContext(TimerContext);
  const { timeLimit } = TimerState;

  // const [ doneTyping, setDoneTyping ] = useState(false);

	const inputRef = useRef(null);

  const validSearchTermsRef = useRef(searchTerms);

  const doneTypingRef = useRef(false);

  useEffect(()=>{
    // inputRef.current.focus();
    stageVisited(2);
    ReactTestUtils.Simulate.click(inputRef.current);
    if ( visits < 1 ) {
      // simulare onChange event using test utilities.
      ReactTestUtils.Simulate.change(inputRef.current, { target: { value: searchTerms[0]} });
    }
    // ReactTestUtils.Simulate.click(inputRef.current);
  },[]); 

  return (
    <>
        <Head>
          <link rel="preload" as="image" href='../../public/google/background.png'/>
          <title>blrow.world</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={css.main}>
          <Timer speed={speed}/>
          <div className={css.top}>
            <div className={css.logoContainer}>
              <Image
                alt={'goggles logo'}
                src={Logo}
                fill
                style={{
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>
          <div className={css.mid}>
            <input 

              ref={inputRef}
              // autoFocus={true}
              className={css.input}
              type={'text'}
              onChange={(e)=>{
                const value = e.target.value;
                // let forcedTerm = [];
                if ( value.length < 2 ) {
                  const forcedTerm = searchTerms.filter( term => term.substring(0, value.length) === value);
                  processTerm(forcedTerm);
                } else {
                  const forcedTerm = validSearchTermsRef.current.filter( term => term.substring(0, value.length) === value);
                  processTerm(forcedTerm);
                }
                function processTerm(forcedTerm){
                  forcedTerm.length > 0
                    ? validSearchTermsRef.current = forcedTerm
                    : validSearchTermsRef.current = [ validSearchTermsRef.current[ getRandomInt(validSearchTermsRef.current.length) ] ];
                  inputRef.current.value = validSearchTermsRef.current[0].substring(0, value.length);

                  inputRef.current.value.length === validSearchTermsRef.current[0].length
                    ? doneTypingRef.current = true
                    : doneTypingRef.current = false;
                }
              }}
            />
            <button
              className={css.searchButton}
              onClick={()=>{
                if ( inputRef.current.value.length === 0 ) {
                  setTimerState({
                    timeLimit: timeLimit,
                    speed: 2147483647
                  })
                  pathUnlocked(2 , 'blue');
                  router.push('/reddit');
                } else if (doneTypingRef.current) {
                  router.push(`/google/search?keyword=${inputRef.current.value}`)
                } else {
                  alert('you need to finish typing your keyword(s)')
                }
              }}
            >
              Go
            </button>
          </div>


          <button
            className={css.luckyButton}
            onClick={()=>{
              if ( inputRef.current.value.length === 0 ) {
                setTimerState({
                  timeLimit: timeLimit,
                  speed: 2147483647
                })
                pathUnlocked(2 , 'red');
                router.push('/reddit');
              } else if (doneTypingRef.current) {
                router.push(`/google/search?keyword=${inputRef.current.value}`)
              } else {
                alert('you need to finish typing your keyword(s)')
              }
              

              router.push('/youtube');
            }}
          >
            I'm feeling lucky
          </button>
        </main>
    </>
  )
}

export async function getServerSideProps(context) {
  // if user loaded /google on first visit, artist cookie will not exist
  const { artist } = context.req.cookies;

  if ( artist === undefined ) {
    return {
      props: {
        searchTerms: [
          'this is freedom',
        ]
      },
    }
  }
  // or use local state
  const { data, error } = await supabase
    .from('gallery')
    .select('title')
    .eq('player_id', artist)
    .neq('title', null);
  
  const searchTerms = [
    'this is freedom',
    ...data.map( item => item.title )
  ]

  return {
    props: {
      searchTerms
    }, 
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
