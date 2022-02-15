import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import AuthLayout from '../layouts/auth/AuthLayout'
import DefaultLayout from '../layouts/default/DefaultLayout'
import PageWithLayoutType from '../layouts/PageWithLayout'
import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getToken } from '../utils/storageUtil'
import { message } from 'antd'
import { CartStoreProvider } from '../common/CartContext'

type AppLayoutProps = AppProps & {
  Component: PageWithLayoutType
  pageProps: any
}

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const router = useRouter()
  const canAuth = Component.canAuth

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // let token = ""
  // if (typeof window !== 'undefined') {
  //   token = getToken() as string
  // }
  // if (router.asPath === '/home') {
  //   router.push('/')
  // }
  // if (canAuth !== null && canAuth && token === null || token === "") {
  //   message.error({ content: 'Please login first!', key: 'error', duration: 2 });
  //   // router.push('/login')
  // }
  const Layout =
    Component.layout || ((children: ReactElement) => <>{children}</>)



  return (
    <CartStoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartStoreProvider>
  )
}

export default MyApp
