"use client";
import { useState } from "react";
import { File } from "./File";

export function Files({ convId }: { convId: number | undefined }) {
  return (
    <div
      style={{
        height: 350,
        overflow: "auto",
        width: "100%",
        alignItems: "center",
      }}
    >
      <File />
      <File />
      <File />
      <File />
      <File />
      <File />
      <File />
      <File />
      <File />
      <File />
      <File />
      <File />
      <File />
      <File />
      <File />
      <File />
    </div>
  );
}
