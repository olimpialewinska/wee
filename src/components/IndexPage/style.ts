import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 160px 30px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px;
`;

export const Title = styled.h1``;

export const Paragraph = styled.p``;

export const GetStartedButton = styled.a`
  width: 200px;
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

export const MainImage = styled.div`
  width: 300px;
  height: 300px;
`;
