import Head from 'next/head'
import css from './index.module.css'

import { useRouter } from 'next/router'
import Image from 'next/image'
import Timer from '@/component/Timer'
import { useContext, useState, useRef, useEffect } from 'react';
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

    const [titleEditing, setTitleEditing] = useState(false);
    const [statementEditing, setStatementEditing] = useState(false);

    const titleRef = useRef();
    const statementRef = useRef();
    return (<>
        <Head>
            <title>blrow.world</title>
            <meta name="description" content="blrow.world" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={css.main}>
            <Timer speed={2147483647}/>
            <div className={css.a}>
                <div className={css.imageContainer}>
                    <Image
                        src = { imageSrc[ counter(stage,art) ] }
                        alt = { stage }
                        fill
                        style = {{
                            objectFit: 'contain'
                        }}
                    />
                </div>
            </div>
            <div className={css.b}>
                <div 
                    ref = {titleRef}
                    contentEditable={true}
                    className={titleEditing? css.titleInput : css.title} 
                    onFocus={()=>{setTitleEditing(true)}}
                    onBlur={()=>{
                        setTitleEditing(false);
                        console.log(titleRef.current.innerHTML);
                    }}
                > 
                    {'Click here to assign title' }
                </div>
                <div
                    ref={statementRef}
                    contentEditable={true}
                    className={statementEditing? css.statementInput : css.statement} 
                    onFocus={()=>{setStatementEditing(true)}}
                    onBlur={()=>{
                        setStatementEditing(false);
                        console.log(statementRef.current.innerHTML);
                    }}
                >
                    Click <br/>
                    here <br/>
                    to write <br/>
                    a statement.
                </div>
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
    stage = +stage;
    art = +art;
    let counter = 0;
    let value = stage - 1;
    while ( value ) {
      counter = counter + value;
      value = value - 1;
    }
    counter = counter + art;
    return counter;
}