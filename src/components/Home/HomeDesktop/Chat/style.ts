import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 40px);
  padding: 20px;
  padding-left: 0;
  overflow: hidden;
`;

export const Bg = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(54, 54, 54);
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Navbar = styled.div`
  height: 60px;
  background-color: rgb(66, 66, 66);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
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

  &:hover {
    opacity: 1;
  }
`;

export const Name = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  flex: 1;
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

export const ChatInput = styled.div`
  height: 60px;
  background-color: rgb(54, 54, 54);
  display: flex;
  flex-direction: row;
  padding: 0 20px;
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
  width: 24px;
  height: 24px;
  background-image: url("/attach.svg");
  height: auto;
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const MessageContainer = styled.div`
  flex: 1;
  background-color: rgb(64, 64, 64);
  margin: 10px;
  color: rgb(255, 255, 255);
  padding: 16px;
  padding-right: 16p;
  border-radius: 24px;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

export const MessageInput = styled.input`
  background-color: transparent;
  border: none;
  flex: 1;
  font-size: 16px;
  color: #fff;

  &:focus {
    outline: none;
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
  width: 24px;
  background-image: url("/emoji.svg");
  height: auto;
  border: none;
  background-color: transparent;
  margin-right: 10px;
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
  width: 24px;
  height: 24px;
  background-image: url("/sent.svg");
  height: auto;
  border: none;
  background-color: transparent;
`;

export const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
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
  background-color: red;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  font-size: 12px;
  font-weight: 400;
`;
