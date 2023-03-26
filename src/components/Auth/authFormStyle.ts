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
  width: 140px;
  height: 60px;
  background-image:url("/wee.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  filter:invert(1);
  margin: 30px;
`;

export const RegisterContent = styled.form`
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
  height:80vh;
`;

export const Login = styled.div`
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

export const LoginHeaderIcon = styled.div`
  width: 140px;
  height: 60px;
  background-image:url("/wee.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  filter:invert(1);
  margin: 30px;
`;

export const LoginContent = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
`;


export const LoginFooter = styled.div`
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





 
 


