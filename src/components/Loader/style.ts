import { keyframes, styled } from "styled-components";

export const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const SpinAnim = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;
export const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 8px solid;
  border-color: #57adeb transparent #57adeb transparent;
  border-radius: 50%;
  animation: ${SpinAnim} 1.2s linear infinite;
`;
