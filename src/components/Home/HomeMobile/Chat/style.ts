import { styled } from "styled-components";

export const StyledChat = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #242424;
  box-sizing: border-box;
  border-radius: 18px 18px 0 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const Navbar = styled.div`
  height: 60px;
  background-color: rgb(54, 54, 54);
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
  padding: 0 10px;
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

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
