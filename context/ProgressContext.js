import { createContext, useState } from "react";

const ProgressContext = createContext(null);
ProgressContext.displayName = 'ProgressContext';

export default function ProgressContextProvider({children}){
    const [ progressState, setProgressState ] = useState([
        {
            stageUrl: '/twitter',
            stageName: 'The Gallery',
            paths: {
                blue: false,
                red: false
            }
        },{
            stageUrl: '/google',
            stageName: 'Goggles.com',
            paths: {
                blue: false,
                red: false
            }
        },{
            stageUrl: '/reddit',
            stageName: 'reddit',
            paths: {
                blue: false,
                red: false
            }
        },{
            stageUrl: '/facebook',
            stageName: 'facebook',
            paths: {
                blue: false,
                red: false
            }
        },{
            stageUrl: '/youtube',
            stageName: 'Invitation',
            paths: {
                blue: false,
                red: false
            }
        }
    ]);

    const pathBlueUnlocked = function (stage){
        if ( progressState[stage].paths.blue === false ) {
            const updatedProgressState = [...progressState];
            updatedProgressState[stage].paths.blue = true;
            setProgressState(updatedProgressState);
        }
    }

    return (
        <ProgressContext.Provider value={{ progressState, setProgressState, pathBlueUnlocked }}>
            {children}
        </ProgressContext.Provider>
    )
}

export {
    ProgressContext
}
