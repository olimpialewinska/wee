import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    height: calc(100vh - 60px);
  }
`;

export const FormBg = styled.div`
  width: 400px;
  background-color: #fff;
  border-radius: 10px;
  background-color: rgb(54, 54, 54);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    width: 80% !important;
    margin-top: 20px;
  }
`;

export const Message = styled.div`
  width: 100%;
  padding-bottom: 20px;
  align-self: center;
  text-align: center;
`;

export const Logo = styled.div`
  width: 140px;
  height: 60px;
  background-image: url("/wee.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  filter: invert(1);
  margin: 30px;
  margin-bottom: 0;
`;

export const Input = styled.input`
  width: 80%;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 10px;
  border: none;
  color: rgb(255, 255, 255);
  font-size: 16px;
  padding: 16px;
  outline: none;
  border-radius: 24px;
  font-size: 14px;
`;

export const Button = styled.button`
  width: 150px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 10px;
  border: none;
  color: rgb(255, 255, 255);
  font-size: 16px;
  padding: 16px;
  outline: none;
  border-radius: 24px;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s all;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.6);
  margin: 30px 0;
`;

export const Text = styled.div`
  font-size: 14px;
`;

export const Href = styled.div`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  transition: 0.1s all;
  margin-left: 8px;
`;

export const ParagraphWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;
