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
