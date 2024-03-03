import { createContext, useEffect, useState } from "react";
import { getCookie } from 'cookies-next';

export const ProgressContext = createContext(null);
ProgressContext.displayName = 'ProgressContext';

export default function ProgressContextProvider({children}){
    const artist = getCookie('artist');
    useEffect(()=>{
        const artist = getCookie('artist');

        const { id, score, progress_context } = JSON.parse(artist);
        setProgressState(progress_context)
        
    },[]);
    const [ progressState, setProgressState ] = useState( defaultProgressState );

    
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
        const placeholder = (stage == 5)
            ? 'Click here to assign title.'
            : 'Click here to assign title.'
        ;
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
        const placeholder = (stage == 5)
            ? 'click here to write slogan.'
            : ` 
                Click <br/>
                here <br/>
                to write <br/>
                a statement.
            `
        ;
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
    const isExhibitionReady = function (){
        return progressState.map( (stage, index) => {
            const isArtComplete = stage.art.map( art => {
                return (art.title !== '') && (art.statement !== '');
            });
            return isArtComplete.reduce((accum, curr)=> accum && curr ,true);
        });
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
            setArtStatement,
            isExhibitionReady
        }}>
            {children}
        </ProgressContext.Provider>
    )
}

export const defaultProgressState = [
    {
        speed: 2147483647,
        stageUrl: '/portal',
        stageName: 'Portal',
        paths: {
            blue: false,
            red: false
        },
        visits: 0,
        art: [
            {
                title: 'The Game',
                statement: 'This is freedom.'
            }
        ]
    },{
        speed: 2147483647,
        stageUrl: '/twitter',
        stageName: 'The Gallery',
        paths: {
            blue: false,
            red: false
        },
        visits: 0,
        art: [ //exhibition
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
            },
            {
                title: '',
                statement: ''
            }
        ]
    },{
        speed: 200,
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
        art: [ // 1piece art
            {
                title: '',
                statement: ''
            },
        ]
    }
]
