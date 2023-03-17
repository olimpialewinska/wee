/* eslint-disable @next/next/no-html-link-for-pages */
import Head from "next/head";
import { Navbar } from "@/components/Navbar";
import WelcomePage from "@/components/Desktop/WelcomePage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pigeon</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WelcomePage />
    </>
  );
}
