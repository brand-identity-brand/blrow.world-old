import Head from 'next/head'
import css from './index.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Logo from '../public/logo.png'

import Timer from '@/component/Timer'
import { useContext, useRef, useEffect, useState } from 'react';
import { TimerContext } from '@/context/TimerContext';

import ReactTestUtils from "react-dom/test-utils";

export default function Google(props) {
  const {
    keyword,
    searchResult
  } = props;
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
          <div className={css.top}>
            {/* <div className={css.logoContainer}>
              <Image
                src={Logo}
                fill
                style={{
                  objectFit: 'contain'
                }}
              />
            </div> */}
            <div className={css.searchBarContainer}>
                <input className={css.input}/>
                <button
                    className={css.searchButton}
                >
                    Go
                </button>
            </div>
            
          </div>
          <div className={css.mid}>
            { searchResult.map(item => {
                return (
                    <div
                        key = { item }
                        className = { css.searchResultCard}
                    >
                        {keyword}
                    </div>
                )
            })}
          </div>
        </main>
    </>
  )
}

export async function getServerSideProps({query}) {
    const { keyword } = query;

    let randomResultLength = Math.floor(Math.random() * 30);
    let randomSearchResult = [];
    while (randomResultLength) {
        [ ...randomSearchResult, randomResultLength ]
    }
    return {
        props: {
            keyword,
            searchResult: randomSearchResult
        }, // will be passed to the page component as props
    }
}
