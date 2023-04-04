import Head from 'next/head'
import css from './index.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Timer from '@/component/Timer'
import { useContext, useEffect, useRef, useState } from 'react';
import { TimerContext } from '@/context/TimerContext';
import { ProgressContext } from '@/context/ProgressContext';
import QRCodeRickRoll from '@/public/youtube/qrCode.png';
import Frame from '@/public/youtube/frame.png';
import { getCookie } from 'cookies-next';
import { api_art_title, api_art_statement } from '@/lib/fetcher';
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WeiboShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon
} from "react-share";
export default function Youtube() {
  const stage = 5;
  const art = 0;
  const shareUrl = (artistCookie) => `https://blrow.world/portal?artist=${artistCookie}`;
  const router = useRouter();
  const [ artistCookie, setArtistCookie ] = useState('');
  const { progressState, pathUnlocked, stageVisited, isExhibitionReady, getArtTitle, getArtStatement, setArtTitle, setArtStatement  } = useContext(ProgressContext);
  const { speed, visits } = progressState[5];
  const { TimerState, setTimerState } = useContext(TimerContext);
  const { timeLimit } = TimerState;

  const [ titleEditing, setTitleEditing ] = useState(false);
  const titleRef= useRef();
  const [ statementEditing, setStatementEditing ] = useState(false);
  const statementRef= useRef();
  useEffect(()=>{
    stageVisited(5);
    setArtistCookie( getCookie('artist') );
    router.prefetch('/twitter');
    console.log('asPath', router.asPath);
    console.log('progressState', progressState)
    console.log('isExhibitionReady()',isExhibitionReady())
  },[]);

  const exhibitionProgress = isExhibitionReady();

  return (<>
    <Head>
        <title>blrow.world</title>
        <meta name="description" content="blrow.world" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={css.main}>
      <Timer speed={speed}/>
      <div className={css.headerContainer}>
        <div className={css.textHeader}> You're invited to</div>
        <div 
          ref = {titleRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
          className={titleEditing? css.titleInput : css.title} 
          onFocus={()=>{setTitleEditing(true)}}
          onBlur={()=>{
            setTitleEditing(false);
            const titleCandidate = titleRef.current.innerHTML.replace(/^\s+|\s+$/g, '');
            if ( getArtTitle(stage, art) === titleCandidate ){
              setTimerState ({
                timeLimit: timeLimit + 60,
                speed: speed - 200
            });
            } else {
                api_art_title({ 
                    player: getCookie('artist'),
                    stage: stage, 
                    art: art, 
                    title: titleCandidate
                });
                setArtTitle(stage, art, titleCandidate);
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
          ref = {statementRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
          className={statementEditing? css.sloganInput : css.slogan} 
          onFocus={()=>{setStatementEditing(true)}}
          onBlur={()=>{
            setStatementEditing(false);
            const statementCandidate = statementRef.current.innerHTML.replace(/^\s+|\s+$/g, '');
            if ( getArtStatement(stage, art) === statementCandidate ){
              setTimerState ({
                timeLimit: timeLimit + 60,
                speed: speed - 200
            });
            } else {
                api_art_statement({ 
                    player: getCookie('artist'),
                    stage: stage, 
                    art: art, 
                    statement: statementCandidate
                });
                setArtStatement(stage, art, statementCandidate);
                setTimerState ({
                  timeLimit: timeLimit + 60,
                  speed: speed 
              });
            }
        }}
        >
          { getArtStatement(stage, art) }
        </div>
      </div>
      <div className={css.bodyContainer}>
        <div className={css.paintingContainer}>
          <div className={css.frameContainer}>
            <Image
              alt={'frame'}
              src={Frame}
              fill
            />
          </div>
          <div 
            className={css.qrCodeContainer}
            onClick={()=>{
              if ( exhibitionProgress.reduce( (accum,curr) => accum&&curr, true ) ) {
                const lockProgress = confirm('start your exhibition?');
                if ( lockProgress ) {
                  setTimerState({
                    timeLimit: timeLimit,
                    speed: 2147483647
                  });
                  pathUnlocked(5, 'blue');
                  router.push('/twitter');
                }
              } else if ( 
                exhibitionProgress[1] === false ||
                exhibitionProgress[2] === false ||
                exhibitionProgress[3] === false ||
                exhibitionProgress[4] === false
              ) {
                alert(`
                  set 1 ${exhibitionProgress[1]}
                  set 2 ${exhibitionProgress[2]}
                  set 3 ${exhibitionProgress[3]}
                  set 4 ${exhibitionProgress[4]}
                `);
              } else if ( exhibitionProgress[5]  === false ) {
                alert('you need a title and a brief statement for your exhibition on the invitation.');
              }
            }}
          >
            <Image
              alt={'QR Code'}
              src={QRCodeRickRoll}
              fill
            />
          </div>
        </div>
        <div className={css.textPlayer}> 
          <div > {'an exhibition of'} </div>
          <div >{`#${artistCookie}`}</div>
        </div>
        
      </div>

      <div className={css.footerContainer}>
        <FacebookShareButton
          url={shareUrl(artistCookie)}
        >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl(artistCookie)}
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>

        <LineShareButton
          url={shareUrl(artistCookie)}
        >
          <LineIcon size={32} round={true} />
        </LineShareButton>

        <WeiboShareButton
          url={shareUrl(artistCookie)}
        >
          <WeiboIcon size={32} round={true} />
        </WeiboShareButton>

        <RedditShareButton
          url={shareUrl(artistCookie)}
        >
          <RedditIcon size={32} round={true} />
        </RedditShareButton>
      </div>

    </main>
  </>)
}

export async function getStaticProps(context) {

  return {
    props: {}, // will be passed to the page component as props
  }
}