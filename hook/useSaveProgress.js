import { useEffect } from "react";
import { api_player_updateProgress } from '@/lib/fetcher'

export default function useSaveProgress( { playerState, progressState }, router ){

    function handleRouteChange(url, { shallow }){
        api_player_updateProgress({
            player: playerState.id,
            progressState: progressState
        });
    }

    function handleRouteChangeError(err, url) {
        if (err.cancelled) {
            api_player_updateProgress({
                player: playerState.id,
                progressState: progressState
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
    }, [router, progressState]);
}