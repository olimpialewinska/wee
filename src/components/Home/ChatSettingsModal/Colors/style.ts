import { styled } from "styled-components";

export const Button = styled.button`
  background-color: rgba(255, 255, 255, 0.1);
  margin: 10px;
  border: none;
  color: rgb(255, 255, 255);
  font-size: 16px;
  padding: 16px 30px;
  outline: none;
  border-radius: 24px;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s all;
  justify-self: flex-end;
  position: absolute;
  bottom: 20px;
  margin-bottom: 20px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const ColorCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #616161;
  margin: 6px;
  cursor: pointer;
  transition: 0.2s all;
  &:hover {
    transform: scale(1.1);
    box-shadow: 3px -2px 3px 0px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

export const ColorRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  overflow: auto;
`;
export const ColorRowNoWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  overflow: auto;

  @media (max-width: 768px) {
    flex-wrap: nowrap;
  }
`;

export const Text = styled.p`
  margin: 0;
  margin-bottom: 10px;
`;

export const UnderlineText = styled.p`
  margin: 0;
  margin-bottom: 10px;
  text-decoration: underline;
  font-size: 14px;
  opacity: 0.8;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 20px;
`;
