"use client";
import { ImagesContainer, Img } from "./style";
import { useCallback, useEffect, useState } from "react";
import { getImages } from "@/utils/chatSettings/getImages";
import { store } from "@/stores";
import { getFile } from "@/utils/chat/getFile";

export function Images() {
  const [images, setImages] = useState<string[] | undefined>([]);
  const getData = useCallback(async () => {
    const data = await getImages(
      store.currentChatStore.currentChatStore?.convId
    );
    const urls = data?.map((item) => {
      const bg = getFile(item.value!);
      return bg;
    });
    setImages(urls);
  }, [store.currentChatStore.currentChatStore?.convId, images]);

  useEffect(() => {
    getData();
  }, [store.currentChatStore.currentChatStore?.convId]);
  return (
    <ImagesContainer>
      {images?.map((image) => {
        return <Img style={{ backgroundImage: `url("${image}")` }} />;
      })}
    </ImagesContainer>
  );
}
