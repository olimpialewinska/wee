import styled from "styled-components";

export const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url("/bg.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 160px 30px;
  background-color: rgba(0, 0, 0, 0.6);
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
