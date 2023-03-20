import styled from "styled-components";

export const Container = styled.div`
   display: flex;
  flex-direction: column;
  flex: 1;
  background-color: rgb(54, 54, 54);
  margin: 20px 20px 20px 0;
  border-radius: 10px;
  overflow: hidden;
`;

export const Header = styled.div`
  background-color: rgba(255, 255, 255, 0.04);
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;


export const Icon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(1);
  cursor: pointer;
  margin-left:20px;
  background-image: url("/person.svg");
`;

export const Info = styled.div``;
export const Name = styled.div``;
export const Status = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
`;

export const Flex = styled.div`
  flex: 1;
`;

export const Search = styled.div`
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
  background-image: url("/search.svg");
  padding: 20px;
`;
export const Menu = styled.div`
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
  background-image: url("/menu.svg");
  padding: 20px 0px 20px 20px;
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

  &:focus{
    outline: none;
  }

`;

export const Emoji = styled.div`
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
  background-image: url("/emoji.svg");
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
