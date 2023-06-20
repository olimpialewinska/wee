import { styled } from "styled-components";

export const Wrapper = styled.div`
  width: 90%;
  display: flex;
  padding: 10px;
  transition: 0.1s all;
  cursor: pointer;
  margin: 0 10px;
  margin-bottom: 6px;
  border-radius: 6px;
  position: relative;
  &::after {
    content: "";
    width: calc(100% - 16px);
    height: 1px;
    background-color: rgba(255, 255, 255, 0.1);
    position: absolute;
    bottom: 0;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
  &:hover:after {
    opacity: 0;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const Image = styled.div`
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border: 2px solid #616161;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 4px;
`;

export const LastMessage = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
`;

export const Time = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 4px;
`;
