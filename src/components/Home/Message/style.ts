import styled, { css } from "styled-components";

interface BaseMessageProps {
  isSelf: boolean;
}

export const StyledMessage = styled.div<BaseMessageProps>`
  display: flex;
  flex-direction: column;
  margin: 10px;
  align-items: flex-start;
  position: relative;

  ${(props) =>
    props.isSelf &&
    css`
      align-self: flex-end;
    `}
`;

export const Row = styled.div<BaseMessageProps>`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isSelf &&
    css`
      flex-direction: row-reverse;
      align-items: center;
    `}
`;

export const Nick = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
  margin-bottom: 2px;
`;

export const MessageContent = styled.div<BaseMessageProps>`
  background-color: rgb(64, 64, 64);
  border-radius: 20px;
  padding: 10px;
  white-space: pre-wrap;

  ${(props) =>
    props.isSelf &&
    css`
      background-color: rgb(0, 84, 56);
      color: rgb(255, 255, 255);
      align-self: flex-end;
      flex-direction: row-reverse;
    `}
`;

export const MessageTime = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
  margin: 10px;
`;

export const DownloadButton = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 0.6);
  background-image: url("/download.png");
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
  margin-right: 16px;
  padding: 4px;

  &:hover {
    opacity: 1;
  }
`;

export const MessageImage = styled.div`
  width: 200px;
  height: 200px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const Popup = styled.div`
  position: absolute;
  background-color: rgb(66, 66, 66);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 8px;
  min-width: 100px;
  z-index: 9999999;
`;

export const Content = styled.div`
  padding: 4px 10px;
  white-space: nowrap;
  border-radius: 4px;
  font-size: 14px;
  margin: 0 2px;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
