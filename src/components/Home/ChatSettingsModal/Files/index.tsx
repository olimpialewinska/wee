"use client";
import { useCallback, useEffect, useState } from "react";
import { File } from "./File";
import { store } from "@/stores";
import { getFiles } from "@/utils/chatSettings/getFiles";
import { getFile } from "@/utils/chat/getFile";

export interface IFileItem {
  url: string;
  name: string;
}

export function Files() {
  const [files, setFiles] = useState<IFileItem[] | undefined>([]);
  const getData = useCallback(async () => {
    const data = await getFiles(
      store.currentChatStore.currentChatStore?.convId
    );
    const urls = data?.map((item) => {
      const name = item.value!.split("()")[1];
      const url = getFile(item.value!);
      return {
        url: url,
        name: name,
      };
    });
    setFiles(urls);
  }, [store.currentChatStore.currentChatStore?.convId, files]);

  useEffect(() => {
    getData();
  }, [store.currentChatStore.currentChatStore?.convId]);
  return (
    <div
      style={{
        height: 350,
        overflow: "auto",
        width: "100%",
        alignItems: "center",
      }}
    >
      {files?.map((file) => {
        return <File file={file} />;
      })}
    </div>
  );
}
