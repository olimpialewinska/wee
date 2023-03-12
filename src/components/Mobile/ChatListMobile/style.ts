import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  //border-radius: 0 0 16px 16px;
`;

export const Title = styled.h1`
  flex: 1;
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
`;

export const ProfileAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e6e6e6;
  margin-left: 10px;
`;

export const AddIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url("/plus.svg");
  background-size: 30px;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 10px;
  filter: invert(1);
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 90%;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

export const Search = styled.div`
  background-color: rgb(64, 64, 64);
  width: 100%;
  padding: 8px;
  border-radius: 24px;
  display: flex;
`;

export const SearchInput = styled.input`
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

export const Background = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  background-color: rgb(64, 64, 64);
  flex: 1;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
`;

export const Profiles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow: auto;
`;

export const ChatList = styled.div`
  display: flex;
  margin-top:16px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex:1;
  overflow: auto;

`;
