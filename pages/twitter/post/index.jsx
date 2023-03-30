import Head from 'next/head'
import css from './index.module.css'

import { useRouter } from 'next/router'
import Image from 'next/image'
import Timer from '@/component/Timer'
import { useContext, useState } from 'react';
import { TimerContext, convertTime } from '@/context/TimerContext';
import { ProgressContext } from '@/context/ProgressContext';

export default function Post(props){
    const {
        stage,
        art
    } = props;

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
            <Timer speed={2147483647}/>
            <div>
                {`${stage} - ${art}`}
            </div>
            <div className={css.imageContainer}>
                <Image
                    src = { imageSrc[counter(stage,art)]}
                    alt = { stage }
                    style = {{
                        contentFit: 'cover'
                    }}
                />
            </div>
        </main>
    </>)
}

export function getServerSideProps(context){
    const { query: { stage, art } } = context;
    return {
        props:{
            stage,
            art
        }
    }
}

const imageSrc = [
    'https://xgzssoosjqorfdzkfxbw.supabase.co/storage/v1/object/public/vault/1%20eye.png',
    'https://xgzssoosjqorfdzkfxbw.supabase.co/storage/v1/object/public/vault/2%20left.png',
    'https://xgzssoosjqorfdzkfxbw.supabase.co/storage/v1/object/public/vault/2%20right.png',
    'https://xgzssoosjqorfdzkfxbw.supabase.co/storage/v1/object/public/vault/3%20left.png',
    'https://xgzssoosjqorfdzkfxbw.supabase.co/storage/v1/object/public/vault/3%20middle.png',
    'https://xgzssoosjqorfdzkfxbw.supabase.co/storage/v1/object/public/vault/3%20right.png',
    'https://xgzssoosjqorfdzkfxbw.supabase.co/storage/v1/object/public/vault/4%20blue%20green.png',
    'https://xgzssoosjqorfdzkfxbw.supabase.co/storage/v1/object/public/vault/4%20green%20yellow.png',
    'https://xgzssoosjqorfdzkfxbw.supabase.co/storage/v1/object/public/vault/4%20red%20blue.png',
    'https://xgzssoosjqorfdzkfxbw.supabase.co/storage/v1/object/public/vault/4%20yellow%20red.png'
]

const counter = (stage, art) => {
    let counter = 0;
    let value = stage - 1;
    while ( value ) {
      counter = counter + value;
      value = value - 1;
    }
    counter = counter + art;
    return counter;
}