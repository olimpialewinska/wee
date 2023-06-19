import { styled } from "styled-components";

export const Bg = styled.div`
  width: 100%;
  max-height: 100%;
  background-color: rgb(54, 54, 54);
  border-radius: 18px 18px 0 0;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

export const Image = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s all;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const NewChat = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url("/add-people.svg");
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

export const ChatSearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 16px;
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

export const SearchIcon = styled.div`
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
  max-height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`;
