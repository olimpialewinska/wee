import styled from "styled-components";

export const ModalBg = styled.div`
  transition: 0.2s opacity;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 99999;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  background-color: rgb(31, 31, 31);
  border-radius: 8px;
  width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: 0.2s transform;
  position: relative;
`;

export const Close = styled.div`
  width: 24px;
  height: 24px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(1);
  cursor: pointer;
  opacity: 0.7;
  transition: 0.1s all;
  background-image: url("/close.svg");
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    opacity: 1;
  }
`;

export const ChatSearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
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
flex: 1;
display: flex;
flex-direction: column;
overflow-y: auto;
max-height: 500px;
  

`;