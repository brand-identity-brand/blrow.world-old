import css from './index.module.css';
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';

import { TimerContext, convertTime } from '@/context/TimerContext';

export default function Timer(props){
    const {
        speed = 2147483647
    } = props;

    const router = useRouter();

    const { TimerState, setTimerState } = useContext(TimerContext);
    const { timeLimit } = TimerState;


    // const [minutes, setMinutes] = useState(0);
    // const [seconds, setSeconds] = useState(timeLimit);

    useEffect(() => {
        const interval = setInterval(()=>{
            setTimerState({ 
                timeLimit: timeLimit - 1,
                speed
            });
        }, speed);
    
        return () => clearInterval(interval);
    }, [TimerState]);

    return (
        <div className={css.container}>
            <span 
                className={css.timer}
                onClick={()=>{
                    setTimerState({
                        timeLimit,
                        speed
                    });
                    router.push('/twitter');
                }}
            >
                { convertTime(timeLimit) }
            </span> 
        </div>
    )
}