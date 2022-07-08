import type { AppProps } from "next/app"
import "/styles.css"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  )
}
