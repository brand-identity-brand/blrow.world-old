import Head from 'next/head'
import css from './index.module.css'

import { useRouter } from 'next/router'
import Image from 'next/image'
import Timer from '@/component/Timer'
import { useContext, useState, useRef, useEffect } from 'react';
import { TimerContext } from '@/context/TimerContext';
import { ProgressContext } from '@/context/ProgressContext';

export default function Post(props){
    const {
        stage,
        art
    } = props;

    const { isStageVisited, getArtTitle, getArtStatement, setArtTitle, setArtStatement } = useContext(ProgressContext);

    if ( isStageVisited(stage) === false ) {
        return (<>
            <Head>
                <title>blrow.world</title>
                <meta name="description" content="blrow.world" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={css.main}>
                <Timer speed={100}/>
                <div className={css.a}>
                    {'art missing.'}
                </div>
            </main>s
        </>)
    }

    const router = useRouter();
    // const [ artistCookie, setArtistCookie ] = useState('');
    const { TimerState, setTimerState } = useContext(TimerContext);
    const { timeLimit, speed } = TimerState;

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
            <Timer speed={speed}/>
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
                        if ( getArtTitle(stage, art) === titleRef.current.innerHTML.replace(/^\s+|\s+$/g, '') ){
                            setTimerState ({
                                timeLimit: timeLimit + 60,
                                speed: speed - 200
                            });
                        } else {
                            setArtTitle(stage, art, titleRef.current.innerHTML);
                            setTimerState ({
                                timeLimit: timeLimit + 60,
                                speed: speed 
                            });
                        }
                    }}
                > 
                    { getArtTitle(stage, art) }
                </div>
                <div
                    ref={statementRef}
                    contentEditable={true}
                    className={statementEditing? css.statementInput : css.statement} 
                    onFocus={()=>{setStatementEditing(true)}}
                    onBlur={()=>{
                        setStatementEditing(false);
                        if ( getArtStatement(stage, art) === statementRef.current.innerHTML.replace(/^\s+|\s+$/g, '') ){
                            setTimerState ({
                                timeLimit: timeLimit + 600,
                                speed: speed - 200
                            });
                        } else {
                            setArtStatement(stage, art, statementRef.current.innerHTML);
                            setTimerState ({
                                timeLimit: timeLimit + 600,
                                speed: speed
                            });
                        }
                    }}
                    dangerouslySetInnerHTML={{ __html: getArtStatement(stage, art) }}
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

// TODO will return counter even if stage = 1, art = 9... add the restriction
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