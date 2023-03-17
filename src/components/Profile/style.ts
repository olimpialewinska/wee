import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  background-color: rgb(54, 54, 54);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    width: 80% !important;
  }
`;

export const Arrow = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-size: 24px;
  background-image: url("/left-arrow.svg");
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(1);
  cursor: pointer;
  opacity: 0.7;
  transition: 0.1s all;
  position: absolute;
  top: 20px;
  left: 20px;
`;

export const WidgetForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 40px 100px;
`;

export const Button = styled.button`

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

export const SignOut = styled.button`

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
  margin-top: 40px;


  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const Input = styled.input`

  background-color: rgba(255, 255, 255, 0.1);
  margin: 10px;
  border: none;
  color: rgb(255, 255, 255);
  font-size: 16px;
  padding: 16px;
  outline: none;
  border-radius: 24px;
  font-size: 14px;
    width: 70%;
`;

export const Form = styled.div`
margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width:100%
`;

