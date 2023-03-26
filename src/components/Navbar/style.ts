import styled from "styled-components";

export const StyledNavbar = styled.div`
  height: 60px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export const Brand = styled.a`
  width: 150px;
  height: 40px;
  background-image:url("/wee.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  filter:invert(1);
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


  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
