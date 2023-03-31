import { createContext, useState } from "react";

const ProgressContext = createContext(null);
ProgressContext.displayName = 'ProgressContext';

export default function ProgressContextProvider({children}){
    const [ progressState, setProgressState ] = useState([
        {
            speed: 2147483647,
            stageUrl: '/portal',
            stageName: 'Portal',
            paths: {
                blue: false,
                red: false
            },
            visits: 0,
            art:[]
        },{
            speed: 2147483647,
            stageUrl: '/twitter',
            stageName: 'The Gallery',
            paths: {
                blue: false,
                red: false
            },
            visits: 0,
            art: [
                {
                    title: '',
                    statement: ''
                }
            ]
        },{
            speed: 200,
            stageUrl: '/google',
            stageName: 'Goggles.com',
            paths: {
                blue: false,
                red: false
            },
            visits: 0,
            art: [
                {
                    title: '',
                    statement: ''
                },
                {
                    title: '',
                    statement: ''
                }
            ]
        },{
            speed: 1000,
            stageUrl: '/reddit',
            stageName: 'reddit',
            paths: {
                blue: false,
                red: false
            },
            visits: 0,
            art: [
                {
                    title: '',
                    statement: ''
                },
                {
                    title: '',
                    statement: ''
                },
                {
                    title: '',
                    statement: ''
                }
            ]
        },{
            speed: 100,
            stageUrl: '/facebook',
            stageName: 'facebook',
            paths: {
                blue: false,
                red: false
            },
            visits: 0,
            art: [
                {
                    title: '',
                    statement: ''
                },
                {
                    title: '',
                    statement: ''
                },
                {
                    title: '',
                    statement: ''
                },
                {
                    title: '',
                    statement: ''
                }
            ]
        },{
            speed: 50,
            stageUrl: '/youtube',
            stageName: 'Invitation',
            paths: {
                blue: false,
                red: false
            },
            visits: 0,
            art: [
                {
                    title: '',
                    statement: ''
                },
                {
                    title: '',
                    statement: ''
                },
                {
                    title: '',
                    statement: ''
                },
                {
                    title: '',
                    statement: ''
                },
                {
                    title: '',
                    statement: ''
                }
            ]
        }
    ]);
    const pathUnlocked = function (stage, colour){
        if ( progressState[stage].paths[colour] === false ) {
            const updatedProgressState = [...progressState];
            updatedProgressState[stage].paths[colour] = true;
            setProgressState(updatedProgressState);
        }
    }
 
    const stageVisited = function (stage){
        const updatedProgressState = [...progressState];
        updatedProgressState[stage].visits = progressState[stage].visits + 1;
        setProgressState(updatedProgressState);
    }
    return (
        <ProgressContext.Provider value={{ progressState, setProgressState, pathUnlocked, stageVisited }}>
            {children}
        </ProgressContext.Provider>
    )
}

export {
    ProgressContext
}
