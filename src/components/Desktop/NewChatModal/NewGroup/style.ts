import styled from "styled-components";

export const ChatSearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-left: 18px;
  padding-right: 18px;
  margin-bottom: 18px;
  margin-top: 18px;

`;

export const ChatSearch = styled.div`
  background-color: rgb(64, 64, 64);
  width: 100%;
  padding: 8px;
  border-radius: 24px;
  display: flex;
  overflow: auto;
`;

export const ChatSearchInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  font-size: 14px;
  flex: 1;
  margin: 0;
  margin-left: 4px;
`;

export const ChatListSearch = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-size: 18px;
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(1);
  opacity: 0.7;
  background-image: url("/search.svg");
`;

export const ProfileList = styled.div`
width:100%;
height: 400px;
display: flex;
flex-direction: column;
overflow-y: auto;
max-height: 500px;

`;

export const Button = styled.div`
 background-color: rgba(255, 255, 255, 0.1);
  margin: 10px;
  border: none;
  color: rgb(255, 255, 255);
  font-size: 16px;
  padding: 12px 30px;
  outline: none;
  border-radius: 24px;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.2s all;
  text-decoration: none;
  display:flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  width: 200px;


  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const ButtonWrapper = styled.div`
    width:100%;
  display: flex;
  justify-content: center;
  margin-top: 18px;
`;



