import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { MapHeader } from "@/components/MapHeader";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>MUNDO Maps - Maps for Model UN DevOps</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/unopengis_logo.png" />
      </Head>
      <main className={styles.main}>
        <MapHeader />
        <h1 className={`${inter.className} ${styles.header}`}>
          MUNDO Maps - Maps for Model UN DevOps
        </h1>
        <div className={styles.content}>
          <div className={styles.missions}>
            <h2 className={inter.className}>Select mission</h2>
            <ul className={styles.list}>
              <li>
                <Link href="/missions/Taito-ku">Taito-ku (demo)</Link>
              </li>
              <li>
                <Link href="/missions/UNMISS">UNMISS</Link>
              </li>
              <li>
                <Link href="/missions/UNMIK">UNMIK</Link>
              </li>
            </ul>
          </div>
          <div className={styles.about}>
            <h2>What?</h2>
            <p>
              MUNDO is an acronym for Model United Nations Developments and
              Operations.
            </p>
            <p>
              MUNDO is a Model United Nations focusing on UN peacekeeping
              operations and the UNDP.
            </p>
            <p>
              mundo-maps is focusing to simulates the development and operation
              of geospatial information systems in the United Nations.
            </p>
            <p>
              mundo-maps is based on OpenStreetMap, ReliefWeb and other Open
              Data.
            </p>
            <h2>Why?</h2>
            <p>
              The United Nations actively promotes the development of open
              source software.
            </p>
            <p>
              However, much of the actual data from the UN is confidential and
              not publicly available.
            </p>
            <p>
              It is also not clear what kind of software and data the UN is
              looking for.
            </p>
            <p>
              Therefore, MUNDO explores the requirements of the UN by conducting
              a Model UN based on Open Data.
            </p>
            <p>
              The goal is to develop more useful OSS through these simulations.
            </p>
            <h2>How?</h2>
            <p>
              See{" "}
              <a href="https://github.com/yuiseki/mundo-maps">Code on GitHub</a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
