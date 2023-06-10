import styled from "styled-components";

export const ProfileCircle = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 0 12px 0 20px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  transition: 0.2s all ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const Name = styled.div``;

export const DeleteIcon = styled.div`
  width: 18px;
  height: 18px;
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
