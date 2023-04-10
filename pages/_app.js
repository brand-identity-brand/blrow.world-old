import PlayerContextProvider, {PlayerContext} from '@/context/PlayerContext'
import ProgressContextProvider, {ProgressContext} from '@/context/ProgressContext'
import TimerContextProvider, {TimerContext} from '@/context/TimerContext'
import '@/styles/globals.css'



export default function App({ Component, pageProps }) {


  return (
    <PlayerContextProvider>
      <ProgressContextProvider>
        <TimerContextProvider>
          <Component {...pageProps} />
        </TimerContextProvider>
      </ProgressContextProvider>
    </PlayerContextProvider>
  )
}
