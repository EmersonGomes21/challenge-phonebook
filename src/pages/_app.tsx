import { PhoneBookProvider } from 'contexts/PhoneBook'
import { AppProps } from 'next/app'
import Head from 'next/head'
import GlobalStyles from 'styles/global'
function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SPX PhoneBook</title>
        <link
          rel="shortcut icon"
          href="https://cdn.cardume.digital/public/sites/saperx/favicons/favicon-32x32.png"
        />
        <link
          rel="apple-touch-icon"
          href="https://cdn.cardume.digital/public/sites/saperx/favicons/favicon-32x32.png"
        />
        <link rel="manifest" href="manifest.json" />

        <meta
          name="description"
          content="A simple project starter to work with TypeScript, React, NextJS and Styled Components"
        />
      </Head>
      <GlobalStyles />
      <PhoneBookProvider>
        <Component {...pageProps} />
      </PhoneBookProvider>
    </>
  )
}

export default App
