import Head from 'next/head'
import css from './index.module.css'

import { useRouter } from 'next/router'
import Image from 'next/image'

import { useContext, useState } from 'react';
import { TimerContext, convertTime } from '@/context/TimerContext';

export default function Post(props){

    const { progressState, setProgressState, pathUnlocked, stageVisited } = useContext(ProgressContext);

    const router = useRouter();
    const [ artistCookie, setArtistCookie ] = useState('');
    const { TimerState, setTimerState } = useContext(TimerContext);
    const { timeLimit } = TimerState;

    
    return (<>
        <Head>
            <title>blrow.world</title>
            <meta name="description" content="blrow.world" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={css.main}>
            <Timer speed={speed}/>
        </main>
    </>)
}

// export function getServerSideProps(context){
//     return {
//         props:{
//             artId: 2
//         }
//     }
// }