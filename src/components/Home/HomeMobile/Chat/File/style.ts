import { styled } from "styled-components";

export const FileContainer = styled.div`
  width: 100px;
  height: 100px;
  margin: 20px;
  flex-shrink: 0;
  margin-right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

export const Image = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px;
  transition: 0.2s all;
  overflow: hidden;
`;

export const Name = styled.div`
  font-size: 12px;
  font-weight: 400;
  max-width: 100%;
  margin-top: 4px;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ImageOverLay = styled.div`
  width: 100%;
  height: 100%;
  transition: 0.2s all;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  filter: invert(1);
  background-size: 40px;
  cursor: pointer;
  ${Image}:hover & {
    background-color: rgba(255, 255, 255, 0.7);
    background-image: url("/delete.png");
  }
`;

export const FileImage = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px;
  transition: 0.2s all;
  overflow: hidden;
  background-image: url("/file.png");
  filter: invert(1);

  &:hover {
    background-image: url("/delete.png");
  }
`;
