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
  const router = useRouter();
  const [ artistCookie, setArtistCookie ] = useState('');
  const { progressState, pathUnlocked, stageVisited, isExhibitionReady } = useContext(ProgressContext);
  const { speed, visits } = progressState[5];
  const { TimerState, setTimerState } = useContext(TimerContext);
  const { timeLimit } = TimerState;

  const [ titleEditing, setTitleEditing ] = useState(false);
  const titleRef= useRef();
  useEffect(()=>{
    stageVisited(5);
    setArtistCookie( getCookie('artist') );
    console.log(isExhibitionReady())
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
            setTitleEditing(false)
          }}
        >
          Click here to title the exhibition
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
        <FacebookShareButton>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>

        <TwitterShareButton>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>

        <LineShareButton>
          <LineIcon size={32} round={true} />
        </LineShareButton>

        <WeiboShareButton>
          <WeiboIcon size={32} round={true} />
        </WeiboShareButton>

        <RedditShareButton>
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