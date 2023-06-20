import { styled } from "styled-components";

export const ModalBg = styled.div`
  transition: 0.2s opacity;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 99999;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding: 20px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 999999;

  @media (max-width: 768px) {
    width: 80% !important;
    height: 300px;
  }
`;

export const Close = styled.div`
  width: 40px;
  height: 40px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(1);
  cursor: pointer;
  opacity: 0.7;
  transition: 0.1s all;
  background-image: url("/close.svg");
  margin-left: 6px;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    opacity: 1;
  }
`;
