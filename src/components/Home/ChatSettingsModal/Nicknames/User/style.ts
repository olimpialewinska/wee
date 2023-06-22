import styled from "styled-components";

export const Item = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  transition: 0.1s all;
  cursor: pointer;
  margin-top: 0;
  border-radius: 6px;
  position: relative;
  margin-bottom: 4px;

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
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 16px;
  background-image: url("/person.svg");
`;

export const ProfileName = styled.div`
  margin: 0;
  font-size: 14px;
`;

export const Close = styled.div`
  min-width: 18px;
  height: 18px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("/close.svg");
  filter: invert(1);
`;

export const Input = styled.input`
  height: 40px;
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
