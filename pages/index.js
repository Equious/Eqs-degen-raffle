//imports work with front end
//'require' does not
//nodejs != javascript

import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
//import ManualHeader from "../components/ManualHeader.jsx"
import Header from "../components/Header"
import LotterEntrance from "../components/LotteryEntrance"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title> The China Shop </title>
                <meta name="Degen Gambling" content="A great way to lose money" />
                <link rel="icon" href="/bullicon.ico" />
            </Head>
            <Header />
            {/* header / connect button / nav bar */}
            <LotterEntrance />
        </div>
    )
}
