import TimerContextProvider from '@/context/TimerContext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <TimerContextProvider>
      <Component {...pageProps} />
    </TimerContextProvider>
  )
}
