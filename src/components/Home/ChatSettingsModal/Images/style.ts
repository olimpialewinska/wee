import { styled } from "styled-components";

export const ImagesContainer = styled.div`
  align-self: center;
  width: 100%;
  max-height: 350px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 14px;
  overflow: auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr) !important;
    grid-gap: 20px;
  }
`;

export const Img = styled.div`
  width: 100%;
  height: 110px;
  background-color: rgba(0, 0, 0, 0.4);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 2px;
`;
