import { useEffect } from "react";
import { api_player_updateScore } from '@/lib/fetcher'

export default function useSaveScore( { playerState, timeLimit }, router ){

    function handleRouteChange(url, { shallow }){
        api_player_updateScore({
            player: playerState.id,
            timeLimit: timeLimit
        });
    }

    function handleRouteChangeError(err, url) {
        if (err.cancelled) {
            api_player_updateScore({
                player: playerState.id,
                timeLimit: timeLimit
            });
        }
    }
    useEffect(() => {

        router.events.on('routeChangeStart', handleRouteChange)
        router.events.on('routeChangeError',  handleRouteChangeError)
    
        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
            router.events.off('routeChangeError',  handleRouteChangeError)
    
        }
    }, [router, timeLimit]);
}


// function handleRouteChangeError(err, url) {
//     if (err.cancelled) {
//       console.log(`Route to ${url} was cancelled!`)
//     }
//   }
// function handleRouteChange(url, { shallow }) {
//     console.log(
//         `App is changing to ${url} ${shallow 
//             ? 'with' 
//             : 'without'
//         } shallow routing`
//     )
//     api_player_updateScore({
//         player: playerState.id,
//         timeLimit: timeLimit
//     })
// }

//     useEffect(() => {

//         router.events.on('routeChangeStart', handleRouteChange)
//         router.events.on('routeChangeError', handleRouteChangeError)
    
//         // If the component is unmounted, unsubscribe
//         // from the event with the `off` method:
//         return () => {
//           router.events.off('routeChangeStart', handleRouteChange)
//           router.events.off('routeChangeError', handleRouteChangeError)
    
//         }
//     }, [router]);