import styled, { css } from "styled-components";

interface BaseMessageProps {
  isSelf: boolean;
}

export const StyledMessage = styled.div<BaseMessageProps>`
  display: flex;
  flex-direction: row;
  margin: 10px;
  align-items: center;

  ${(props) =>
    props.isSelf &&
    css`
      align-self: flex-end;
      flex-direction: row-reverse;
    `}
`;

export const MessageContent = styled.div<BaseMessageProps>`
  background-color: rgb(64, 64, 64);
  border-radius: 20px;
  padding: 10px;

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
