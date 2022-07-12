import type { AppProps } from "next/app"
import Navbar from "../components/Navbar"
import "/styles.css"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <div className="h-screen bg-violet-100">
        <Component {...pageProps} />
      </div>
    </>
  )
}
