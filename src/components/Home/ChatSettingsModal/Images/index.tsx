"use client";
import { useState } from "react";
import { ImagesContainer } from "./style";
import { Image } from "./Image";

export function Images({ convId }: { convId: number | undefined }) {
  return (
    <ImagesContainer>
      <Image />
      <Image />
      <Image />
      <Image />
      <Image />
      <Image />
      <Image />
      <Image />
      <Image />
      <Image />
      <Image />
      <Image />
      <Image />
      <Image />
      <Image />
    </ImagesContainer>
  );
}
