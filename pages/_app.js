import ProgressContextProvider from '@/context/ProgressContext'
import TimerContextProvider from '@/context/TimerContext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {

  return (
    <ProgressContextProvider>
      <TimerContextProvider>
        <Component {...pageProps} />
      </TimerContextProvider>
    </ProgressContextProvider>
  )
}
