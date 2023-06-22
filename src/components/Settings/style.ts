import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormBg = styled.div`
  width: 400px;
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

export const Close = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url("/close.svg");
  background-size: 26px;
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(1);
  opacity: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s all;

  &:hover {
    opacity: 1;
  }
`;

export const Image = styled.div`
  width: 160px;
  height: 160px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
`;

export const Message = styled.div`
  width: 100%;
  align-self: center;
  text-align: center;
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
  margin-bottom: 20px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const ImageInput = styled.input`
  display: none;
`;
