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
  height: 500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: 0.2s transform;
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Image = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(1);
  cursor: pointer;
`;

export const Name = styled.h1``;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding:20px;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Label = styled.div`
  font-size: 16px;
  color: #fff;
`;

export const BackgroundColor = styled.input`
  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  margin-left: 20px;
`;

export const Color = styled.input`
  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  margin-left: 20px;
`;

export const Button = styled.button`
  background-color: rgba(255, 255, 255, 0.1);
  margin: 12px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
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
  top: 10px;
  right: 10px;
  position: absolute;

  &:hover {
    opacity: 1;
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CircleButton = styled.div`
  width: 38px;
  height: 38px;
  filter: invert(0.5);
  cursor: pointer;
  opacity: 0.7;
  transition: 0.1s all;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  margin: 0 18px;
  &:hover {
    opacity: 1;
  }
`;

export const UsersList = styled.div`
  height: 100%;
  overflow: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  
`;

export const User = styled.div`
  display: flex;
  padding: 10px;
  transition: 0.1s all;
  cursor: pointer;
  margin: 6px;
  margin-top: 0;
  border-radius: 6px;
  position: relative;
  align-items: center;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
  &:hover:after {
    opacity: 0;
  }


`;

export const UserImage = styled.div`
 width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("/person.svg");
`;

export const UserName = styled.input`
  flex:1;
  border: none;
  outline: none;
  color: #fff;
  font-size: 16px;
  background-color: transparent;
  border-radius: 24px;
  cursor: pointer;
  transition: 0.2s all;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  margin-left: 30px;

  `;

export const Change = styled.div`
   width: 24px;
  height: 24px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("/right-arrow.svg");
  filter: invert(1);
  margin-left: auto;
  margin-right: 10px;
  opacity: 0.7;
  transition: 0.1s all;
  &:hover {
    opacity: 1;
    transform: translateX(6px);
  }
`;
  
