import styled from "styled-components";

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  transition: 0.1s all;
  cursor: pointer;
  margin: 6px;
  margin-top: 0;
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
`;

export const ProfileAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-right:16px;
  background-image: url("/person.svg");
`;

export const ProfileName = styled.div`
  margin: 0;
  font-size: 14px;
`;

export const Arrow = styled.div`
  width: 24px;
  height: 24px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("/right-arrow.svg");
  filter: invert(1);
  margin-left: auto;
  margin-right: 10px;
  opacity: 0.7;
  transition: 0.1s all;
  &:hover {
    opacity: 1;
    transform: translateX(6px);
  }
`;
