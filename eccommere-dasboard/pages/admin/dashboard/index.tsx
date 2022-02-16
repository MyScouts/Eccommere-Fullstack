import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import DefaultLayout from '../../../layouts/default/DefaultLayout'

const Home = () => {
    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>
        </div>
    )
}

Home.layout = DefaultLayout
Home.canAuth = true
export default Home
