/*import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { AuthProvider } from '../contexts/AuthContext'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}*/

import App from 'next/app'
import { AuthProvider } from '../contexts/AuthContext'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'

const NoOption =  ({ children }: any) => children

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    const Layout = (Component as any).layout || NoOption

    return (
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps}/>
          </Layout>
        </ChakraProvider>
      </AuthProvider>
    )
  }
}

export default MyApp