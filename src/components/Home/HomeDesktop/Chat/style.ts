import { css, styled } from "styled-components";

interface BaseProps {
  isMobile: boolean;
}

export const Container = styled.div<BaseProps>`
  width: 100%;
  height: calc(100vh - 40px);
  padding: 20px;
  padding-left: 0;
  overflow: hidden;
  position: relative;

  ${(props) =>
    props.isMobile &&
    css`
      width: 100%;
      height: 100%;
      padding: 0;
    `}
`;

export const Bg = styled.div<BaseProps>`
  width: 100%;
  height: 100%;
  background-color: rgb(54, 54, 54);
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;

  ${(props) =>
    props.isMobile &&
    css`
      width: 100vw;
      height: 100vh;
      border-radius: 18px 18px 0 0;
    `}
`;

export const Navbar = styled.div`
  height: 60px;
  background-color: rgb(66, 66, 66);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  position: relative;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2));
  transition: 0.2s background-color;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.08);
    pointer-events: none;
    z-index: 0;
  }
`;

export const Image = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  margin-left: 10px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 2;
`;

export const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: 26px;
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(1);
  opacity: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s all;
  z-index: 10;

  &:hover {
    opacity: 1;
  }
`;

export const Name = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  flex: 1;
  z-index: 2;
`;

export const ActivityStatus = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
`;

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const ChatContent = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  overflow: auto;
  flex-direction: column;
`;

export const ChatInput = styled.div<BaseProps>`
  height: 60px;
  background-color: rgb(54, 54, 54);
  display: flex;
  flex-direction: row;
  padding: 0 20px;
  position: relative;
  transition: 0.2s background-color;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.08);
    pointer-events: none;
    z-index: 0;
  }

  ${(props) =>
    props.isMobile &&
    css`
      padding: 0 10px;
    `}
`;

export const Attachment = styled.div`
  border-radius: 50%;
  background-size: 24px;
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(1);
  cursor: pointer;
  opacity: 0.7;
  transition: 0.1s all;
  min-width: 24px;
  height: 24px;
  background-image: url("/attach.svg");
  height: auto;
  align-items: center;
  display: flex;
  justify-content: center;
  z-index: 2;

  &:hover {
    opacity: 1;
  }
`;

export const MessageContainer = styled.div`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 10px;
  color: rgb(255, 255, 255);
  padding: 16px;
  padding-right: 16px;
  border-radius: 24px;
  font-size: 14px;
  display: flex;
  align-items: center;
  z-index: 2;
`;

export const MessageInput = styled.input`
  background-color: transparent;
  border: none;
  flex: 1;
  font-size: 16px;
  color: rgb(255, 255, 255);

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  z-index: 2;
  &:hover {
    opacity: 1;
  }
`;

export const Emoji = styled.button`
  border-radius: 50%;
  background-size: 24px;
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(1);
  cursor: pointer;
  opacity: 0.7;
  transition: 0.1s all;
  min-width: 24px;
  background-image: url("/emoji.svg");
  height: auto;
  border: none;
  background-color: transparent;
  margin-right: 10px;
  z-index: 2;
  &:hover {
    opacity: 1;
  }
`;

export const Send = styled.button`
  border-radius: 50%;
  background-size: 24px;
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(1);
  cursor: pointer;
  opacity: 0.7;
  transition: 0.1s all;
  min-width: 24px;
  height: 24px;
  background-image: url("/sent.svg");
  height: auto;
  border: none;
  background-color: transparent;
  z-index: 10;

  &:hover {
    opacity: 1;
  }
`;

export const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  transition: 0.2s background-color;
`;

export const FileRow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  background-color: rgb(64, 64, 64);
  overflow-x: auto;
  overflow-y: hidden;
`;

export const Error = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  font-size: 12px;
  font-weight: 400;
  position: absolute;
  z-index: 999;
  left: 50%;
  transform: translateX(-50%);
  transition: 0.2s opacity;
`;
