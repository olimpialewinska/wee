import React from "react";
import { FileContainer, FileImage, Image, ImageOverLay, Name } from "./style";

interface FileProps {
  file: File;
  deleteFile: (file: File) => void;
}

export function File(props: FileProps) {
  const isImageFile = props.file.type.includes("image");

  const handleDelete = () => {
    props.deleteFile(props.file);
  };

  return (
    <FileContainer style={{ maxWidth: isImageFile ? 100 : 80 }}>
      {isImageFile ? (
        <Image
          style={{ backgroundImage: `url(${URL.createObjectURL(props.file)})` }}
        >
          <ImageOverLay onClick={handleDelete} />
        </Image>
      ) : (
        <>
          <FileImage onClick={handleDelete} />
          <Name>{props.file.name}</Name>
        </>
      )}
    </FileContainer>
  );
}
