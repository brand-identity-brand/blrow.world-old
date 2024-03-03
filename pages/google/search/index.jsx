import Head from "next/head";
import css from "./index.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Logo from "@/public/google/logo.png";

import TimerBar from "@/component/TimerBar";
import { useContext, useRef, useEffect, useState } from "react";
import { TimerContext } from "@/context/TimerContext";
import { ProgressContext } from "@/context/ProgressContext";

import ReactTestUtils from "react-dom/test-utils";

import { supabase } from "@/lib/supabaseClient";

import { imageSrc, counter } from "@/lib/art";
import { PlayerContext } from "@/context/PlayerContext";
import useSaveScore from "@/hook/useSaveScore";
import useSaveProgress from "@/hook/useSaveProgress";

export default function Google(props) {
  const { keyword, searchResult } = props;
  const router = useRouter();

  const { playerState } = useContext(PlayerContext);
  const { TimerState, setTimerState } = useContext(TimerContext);
  const { timeLimit } = TimerState;
  // const { progressState, stageVisited } = useContext(ProgressContext);
  // const { speed } = progressState[1];

  useSaveScore({ playerState, timeLimit }, router);

  return (
    <>
      <Head>
        <title>blrow.world</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={css.main}>
        <TimerBar speed={1000} router={router} />
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
            <input
              type={"text"}
              defaultValue={router.query.keyword}
              className={css.input}
            />
            <button className={css.searchButton}>Go</button>
          </div>
        </div>
        <div className={css.mid}>
          {searchResult.map((item) => {
            const {
              id,
              created_at,
              updated_at,
              player_id,
              stage,
              art,
              title,
              statement,
            } = item;

            return (
              <div key={id} className={css.searchResultCard}>
                <div className={css.searchResultCard_left}>
                  <div className={css.searchResultCard_left_top}>
                    <Image
                      alt={`${stage}-${art}`}
                      src={imageSrc[counter(stage, art)]}
                      fill
                      style={{
                        // width: '100%',
                        // height: 'auto',
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div>{player_id}</div>
                </div>
                <div className={css.searchResultCard_right}>
                  <div className={css.searchResultCard_right_top}>{title}</div>
                  <div
                    className={css.searchResultCard_right_mid}
                    dangerouslySetInnerHTML={{ __html: statement }}
                  />
                  {/* <div className={css.searchResultCard_right_bot}>
                    {'#0000001'}
                  </div> */}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ req, query }) {
  const { keyword } = query;
  // if user loaded /google on first visit, artist cookie will not exist
  const { artist } = req.cookies;

  if (keyword === "freedom is") {
    // return none .. end game default prompt
    return {
      props: {
        keyword,
        searchResult: [],
      },
    };
  }

  if (keyword === "this is freedom") {
    // return everything and rank by "engagement"
    const { data: searchResult, error } = await supabase
      .from("gallery")
      .select();

    return {
      props: {
        keyword,
        searchResult,
      },
    };
  }

  const { data, _error } = await supabase
    .from("gallery")
    .select("stage, art")
    .eq("player_id", JSON.parse(artist).id)
    .eq("title", keyword);

  const { data: searchResult, error } = await supabase
    .from("gallery")
    .select()
    .eq("stage", data[0].stage)
    .eq("art", data[0].art)
    .neq("title", null)
    .neq("statement", null);

  return {
    props: {
      keyword,
      searchResult,
    },
  };
}
