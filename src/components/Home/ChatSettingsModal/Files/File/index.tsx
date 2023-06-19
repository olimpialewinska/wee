"use client";
import { Item, Name, Icon } from "./style";
import { IFileItem } from "..";
import { useCallback } from "react";

export function File({ file }: { file: IFileItem }) {
  const handleDownload = useCallback(() => {
    window.open(file.url);
  }, [file.url]);

  return (
    <Item>
      <Name>{file.name ? file.name : "unknown file"}</Name>
      <Icon onClick={handleDownload} />
    </Item>
  );
}
