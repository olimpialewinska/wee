import { styled } from "styled-components";

export const ModalBg = styled.div`
  transition: 0.2s opacity;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 9999;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 100%;
  }
`;

export const Container = styled.div`
  width: 400px;
  height: 600px;
  background-color: rgb(54, 54, 54);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;

  @media (max-width: 768px) {
    width: 80% !important;
  }
`;

export const Image = styled.div`
  width: 100px;
  min-height: 100px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 4px;
  margin-top: 20px;
`;

export const TitleInput = styled.input`
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.08);
  padding: 0 12px;
  color: white;
  font-size: 14px;
  outline: none;
  transition: 0.2s all;
  &:focus {
    border: 1px solid rgba(255, 255, 255, 0.4);
  }
`;

export const CancelButton = styled.div`
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(1);
  cursor: pointer;
  opacity: 0.7;
  transition: 0.1s all;
  background-image: url("/close.svg");
  margin-left: 6px;

  &:hover {
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

export const Selector = styled.div`
  background-color: "rgba(255, 255, 255, 0.08)";
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin: 0 4px;
  padding: 8px 12px;
  transition: 0.2s background-color, 0.2s border;
  cursor: pointer;
  font-size: 14px;
  margin-top: 8px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
    border: 1px solid transparent;
  }
`;

export const Close = styled.div`
  width: 20px;
  height: 20px;
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
  top: 20px;
  right: 20px;

  &:hover {
    opacity: 1;
  }
`;

export const MessagesCount = styled.div`
  font-size: 12px;

  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 4px;
  margin-top: 8px;
`;
