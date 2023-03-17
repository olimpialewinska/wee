import styled from "styled-components";

interface AvatarProp{
  avatar_url: string
}

export const Container = styled.div`
 width: 100%;
  height: 100vh;
  display: flex;`;

export const Chats = styled.div`
width: 300px;
  background-color: rgb(54, 54, 54);
  margin: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;`;

export const ChatHeader = styled.div`
padding: 0 24px;
  padding-left: 18px;
  padding-right: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 68px;`;

export const ChatHeaderInfo = styled.div`font-weight: bold;
font-size: 20px;
color: rgb(255, 255, 255);`;

export const ChatHeaderIconsContainer = styled.div`
display: flex;
  flex-direction: row;`;

export const NewChat = styled.div`
width: 42px;
  height: 42px;
  border-radius: 50%;
  background-size: 24px;
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(1);
  cursor: pointer;
  opacity: 0.7;
  transition: 0.1s all;
  background-image: url("/plus.svg");`;

export const Avatar = styled.div`
width: 42px;
  height: 42px;
  border-radius: 50%;
  background-size: 24px;
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(1);
  cursor: pointer;
  opacity: 0.7;
  transition: 0.1s all;
`;

export const ChatSearchContainer= styled.div`
 display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-left: 18px;
  padding-right: 18px;
  margin-bottom: 18px;`;


export const ChatSearch = styled.div`background-color: rgb(64, 64, 64);
width: 100%;
padding: 8px;
border-radius: 24px;
display: flex;`;

export const ChatSearchInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  font-size: 14px;
  flex: 1;
  margin: 0;
  margin-left: 4px;`;

export const ChatListSearch = styled.div`
width: 18px;
  height: 18px;
  border-radius: 50%;
  background-size: 18px;
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(1);
  opacity: 0.7;
  background-image: url("/search.svg");`;

export const ChatList = styled.div`
flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;
  
