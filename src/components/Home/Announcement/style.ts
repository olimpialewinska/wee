import styled, { css } from "styled-components";

export const StyledMessage = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  align-items: center;
  align-self: center;
`;

export const MessageContent = styled.div`
  padding: 10px;
  font-size: 12px;
  opacity: 0.5;
  display: flex;
  flex-direction: row;
`;

export const Colors = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Color = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px #fff solid;
  cursor: pointer;
  margin-left: 5px;
`;
