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
 
    const isStageVisited = function (stage){
        const isVisited = progressState[stage].visits > 0;
        return isVisited;
    }
    const stageVisited = function (stage){
        const updatedProgressState = [...progressState];
        updatedProgressState[stage].visits = progressState[stage].visits + 1;
        setProgressState(updatedProgressState);
    }

    const getArtTitle = function ( stage, art ) {
        const title =  progressState[stage].art[art].title;
        const placeholder = 'Click here to assign title.'
        if ( title === null ) {
            return placeholder;
        } else if ( title === undefined ) {
            return placeholder;
        } else if ( title === '' ) {
            return placeholder;
        } else {
            return title;
        }
    }
    const getArtStatement = function ( stage, art ) {
        const statement =  progressState[stage].art[art].statement;
        const placeholder = ` 
            Click <br/>
            here <br/>
            to write <br/>
            a statement.
        `;
        if ( statement === null ) {
            return placeholder;
        } else if ( statement === undefined ) {
            return placeholder;
        } else if ( statement === '' ) {
            return placeholder;
        } else {
            return statement;
        }
    }
    const setArtTitle = function (stage, art, title){
        const updatedProgressState = [...progressState];
        updatedProgressState[stage].art[art].title = title;
        setProgressState(updatedProgressState);
    }
    const setArtStatement = function (stage, art, statement){
        const updatedProgressState = [...progressState];
        updatedProgressState[stage].art[art].statement = statement;
        setProgressState(updatedProgressState);
    }

    return (
        <ProgressContext.Provider value={{ 
            progressState, 
            setProgressState, 
            pathUnlocked, 
            isStageVisited,
            stageVisited, 
            getArtTitle,
            getArtStatement, 
            setArtTitle, 
            setArtStatement 
        }}>
            {children}
        </ProgressContext.Provider>
    )
}

export {
    ProgressContext
}
