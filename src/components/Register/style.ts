import styled from "styled-components";

export const Register = styled.div`
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
    }

`;

export const RegisterHeaderIcon = styled.div`
  width: 42px;
  height: 42px;
  background-color: aqua;
  margin: 30px;
`;

export const RegisterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

export const Input = styled.input`
  width: 100%;
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

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
