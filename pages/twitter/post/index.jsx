import Head from 'next/head'
import css from './index.module.css'

import { useRouter } from 'next/router'
import Image from 'next/image'
import Timer from '@/component/Timer'
import { useContext, useState, useRef, useEffect } from 'react';
import { TimerContext } from '@/context/TimerContext';
import { ProgressContext } from '@/context/ProgressContext';
import { PlayerContext } from '@/context/PlayerContext'
import { getCookie } from 'cookies-next';
import { api_art_title, api_art_statement } from '@/lib/fetcher';

import { imageSrc, counter } from '@/lib/art';
import useSaveScore from '@/hook/useSaveScore';
import useSaveProgress from '@/hook/useSaveProgress'

export default function Post(props){
    const {
        stage,
        art
    } = props;
// console.log('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone)
    const { isStageVisited, getArtTitle, getArtStatement, setArtTitle, setArtStatement } = useContext(ProgressContext);
    const router = useRouter();

    if ( isStageVisited(stage) === false ) {
        return (<>
            <Head>
                <title>blrow.world</title>
                <meta name="description" content="blrow.world" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={css.main}>
                <Timer speed={100} router={router}/>
                <div className={css.a}>
                    {'art missing.'}
                </div>
            </main>
        </>)
    }

    
    const { playerState } = useContext(PlayerContext);
    const { progressState } = useContext(ProgressContext);
    const { TimerState, setTimerState } = useContext(TimerContext);
    const { timeLimit, speed } = TimerState;

    const [titleEditing, setTitleEditing] = useState(false);
    const [statementEditing, setStatementEditing] = useState(false);

    const titleRef = useRef();
    const statementRef = useRef();

    useSaveScore( { playerState, timeLimit }, router );
    useSaveProgress( { playerState, progressState }, router );

    return (<>
        <Head>
            <title>blrow.world</title>
            <meta name="description" content="blrow.world" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={css.main}>
            <Timer speed={speed} router={router}/>
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
                    suppressContentEditableWarning={true}
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
                            // TODO: check for duplicated title withint the same account before uploading
                            api_art_title({ 
                                player: getCookie('artist'),
                                stage: stage, 
                                art: art, 
                                title: titleRef.current.innerHTML.replace(/^\s+|\s+$/g, '') 
                            });
                            setArtTitle(stage, art, titleRef.current.innerHTML.replace(/^\s+|\s+$/g, ''));
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
                    suppressContentEditableWarning={true}
                    className={statementEditing? css.statementInput : css.statement} 
                    onFocus={()=>{setStatementEditing(true)}}
                    onBlur={()=>{
                        setStatementEditing(false);
                        if ( getArtStatement(stage, art) === statementRef.current.innerHTML ){
                            setTimerState ({
                                timeLimit: timeLimit + 600,
                                speed: speed - 200
                            });
                        } else {
                            api_art_statement({ 
                                player: getCookie('artist'),
                                stage: stage, 
                                art: art, 
                                statement: statementRef.current.innerHTML
                            });
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