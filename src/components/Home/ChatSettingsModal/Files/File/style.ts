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
  justify-content: space-between;

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
export const Name = styled.div`
  margin: 0;
  font-size: 14px;
`;

export const Icon = styled.div`
  width: 18px;
  height: 18px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("/download.png");
  filter: invert(1);
`;
