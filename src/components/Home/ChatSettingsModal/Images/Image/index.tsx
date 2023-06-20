"use client";
import { useState } from "react";
import { Img } from "./style";
import { ImageModal } from "@/components/Home/ImageModal";
import { getFile } from "@/utils/chat/getFile";

export function Image({ image }: { image: string }) {
  const [showImage, setShowImage] = useState(false);
  const handleCloseImage = () => setShowImage(false);
  const handleShowImage = () => {
    setShowImage(true);
  };

  return (
    <>
      <Img
        style={{ backgroundImage: `url("${image}")` }}
        onClick={handleShowImage}
      />
      <ImageModal
        image={`url("${image}")`}
        visible={showImage}
        hide={handleCloseImage}
        fullScreen={true}
      />
    </>
  );
}
