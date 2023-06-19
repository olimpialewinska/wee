"use client";
import { Navbar } from "../Navbar";
import {
  Content,
  GetStartedButton,
  Info,
  MainContainer,
  MainImage,
  Paragraph,
  Title,
} from "./style";

export default function IndexPage() {
  return (
    <>
      <MainContainer>
        <Navbar />
        <Content>
          <Info>
            <Title>Wee</Title>
            <Paragraph>
              Wee is a simple chat app that allows you to chat with your friends
              and family.
            </Paragraph>
            <GetStartedButton href="/register">Get started</GetStartedButton>
          </Info>
          <MainImage />
        </Content>
      </MainContainer>
    </>
  );
}
