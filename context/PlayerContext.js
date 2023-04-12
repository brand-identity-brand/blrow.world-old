import { createContext, useEffect, useState } from "react";
import { getCookie } from 'cookies-next';

const PlayerContext = createContext(null);
PlayerContext.displayName = 'PlayerContext';

export default function PlayerContextProvider({children}){
    const [ playerState, setPlayerState ] = useState({
        id: undefined,
        score: undefined
    });

    useEffect(()=>{
        const artist = getCookie('artist');

        const { id, score } = JSON.parse(artist);
        setPlayerState({
            id,
            score
        })
        
    },[]);

    return (
        <PlayerContext.Provider value={{ playerState, setPlayerState }}>
            {children}
        </PlayerContext.Provider>
    )
}

export {
    PlayerContext
}