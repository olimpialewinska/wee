import styled from "styled-components";

export const ModalBg = styled.div`
  transition: 0.2s all ease-in-out;
  background-color: transparent;
  position: fixed;
  z-index: 9999;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  position: fixed;
  bottom: 90px;
  right: 28px;
  width: 320px;
  height: 400px;
  border-radius: 16px;
  background-color: #3d3d3d;
  display: flex;
  flex-direction: column;
  overflow: auto;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
  padding: 10px;

  @media (max-width: 512px) {
    bottom: 70px;
    right: 10px;
  }
`;

export const EmojiPicker = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const Emoji = styled.div`
  width: 40px;
  height: 40px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s all;
  border-radius: 10px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const Category = styled.div``;

export const CategoryName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 10px;
`;

export const EmojiSearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  align-self: center;
  margin-bottom: 14px;
`;

export const EmojiSearch = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  width: 100%;
  padding: 8px;
  border-radius: 24px;
  display: flex;
`;

export const EmojiSearchInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  font-size: 14px;
  flex: 1;
  margin: 0;
  margin-left: 4px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const EmojiListSearch = styled.div`
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

export const List = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 0;
`;
