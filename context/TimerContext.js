import { createContext, useState } from "react";

const TimerContext = createContext(null);
TimerContext.displayName = 'TimerContext';

export default function TimerContextProvider({children}){
    const [ TimerState, setTimerState ] = useState({
        timeLimit: 1800,
        speed: 2147483647 //32bit max
    })
    return (
        <TimerContext.Provider value={{ TimerState, setTimerState }}>
            {children}
        </TimerContext.Provider>
    )
}

function convertTime(timeLimit) {
    const minute = Math.floor( timeLimit / 60 );
    const second = timeLimit % 60;

    const convertSecond = () => {
        if (second < 10) return `0${second}`;
        return `${second}`
    }

    return `${minute}:${convertSecond()}`;
}

export {
    TimerContext,
    convertTime
}