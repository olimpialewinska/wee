import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Link = styled.a`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-image: url("/left-arrow.svg");
  background-size: 24px;
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(1);
  cursor: pointer;
  opacity: 0.7;
  transition: 0.1s all;
  position: absolute;
  top: 12px;
  left: 12px;
`;

export const Card = styled.div`
  width: 800px;
  background-color: #fff;
  border-radius: 10px;
  background-color: rgb(54, 54, 54);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media only screen and (max-width: 600px) {

    width: 80% !important;
  }
`;

export const ProfileImg = styled.div`
  background-repeat: "no-repeat";
  background-size: "cover";
  background-position: "center";
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;
