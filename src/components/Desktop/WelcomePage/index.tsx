/* eslint-disable @next/next/no-html-link-for-pages */
import Head from "next/head";
import Link from "next/link";
import { Navbar } from "../../Navbar";
import { Content, DownloadButtons, GetStartedButton, Info, MainContainer, MainImage, Paragraph, Title } from "./style";

export default function WelcomePage() {
  return (
    <>
      {" "}
      <Head>
        <title>Pigeon</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContainer>
        <Navbar/>
        <Content>
            <Info>
                <Title>Pigeon</Title>
                <Paragraph>Pigeon is a simple chat app that allows you to chat with your friends and family.</Paragraph>
                <GetStartedButton href="/register">Get started</GetStartedButton>
                <DownloadButtons>
                    <Link href="#" className="download-button android"></Link>
                    <Link href="#" className="download-button ios"></Link>
                </DownloadButtons>
            </Info>
            <MainImage/>
        </Content>
      </MainContainer>
    </>
  );
}
