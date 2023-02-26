import styled from "styled-components";

export const StyledNavbar = styled.div`
  height: 60px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Brand = styled.a`
  background-color: rgb(75, 75, 75);
  width: 150px;
  height: 40px;
  cursor: pointer;
`;

export const Buttons = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Button = styled.a`
  background-color: rgba(255, 255, 255, 0.1);
  margin: 10px;
  border: none;
  color: rgb(255, 255, 255);
  font-size: 16px;
  padding: 8px 30px;
  outline: none;
  border-radius: 24px;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.2s all;
  text-decoration: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
