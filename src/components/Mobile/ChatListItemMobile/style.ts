import styled from "styled-components";

export const StyledChatListItem = styled.div`
  display: flex;
  padding: 10px;
  transition: 0.1s all;
  cursor: pointer;
  margin: 6px;
  margin-top: 0;
  border-radius: 6px;
  position: relative;
  width: 90%;
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
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #fff;
  filter: invert(1);
`;

export const Info = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const InfoName = styled.div`
  margin: 0;
  font-size: 14px;
`;

export const Message = styled.div`
  margin: 4px 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`;

export const Time = styled.div`
  flex: 1;
  font-size: 12px;
  text-align: right;
  color: rgb(110, 110, 110);
`;