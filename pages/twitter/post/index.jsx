import Head from 'next/head'
import css from './index.module.css'

import { useRouter } from 'next/router'
import Image from 'next/image'
import Timer from '@/component/Timer'
import { useContext, useState, useRef } from 'react';
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

    const [ titleEditing, setTitleEditing ] = useState(false);
    return (<>
        <Head>
            <title>blrow.world</title>
            <meta name="description" content="blrow.world" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={css.main}
            onClick={()=>{
                setTitleEditing(false);
            }}
        >
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
                <EditableDiv controller={[ titleEditing, setTitleEditing ] }/>
                {/* <div contentEditable={true}>
                    {`Click here to write a statement.`}
                </div> */}
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

function EditableDiv(props){
    const {
        controller
    } = props;
    const [ titleEditing, setTitleEditing ] = controller;
    const inputValue = useRef('click here to edit Title');
    return (
        titleEditing
        ? <input className={css.titleInput} type={'text'} onChange={(e)=>{ inputValue.current = e.target.value }}/>
        
        : <div className={css.title} onClick={()=>{setTitleEditing(true)}}> {inputValue.current} </div>
    )
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