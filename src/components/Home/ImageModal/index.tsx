import { ModalProps } from "@/interfaces";
import { Container, ModalBg } from "./style";

interface ImageModalProps extends ModalProps {
  image: string;
}

export function ImageModal(props: ImageModalProps) {
  return (
    <ModalBg
      style={{
        opacity: props.visible ? 1 : 0,
        pointerEvents: props.visible ? "inherit" : "none",
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          props.hide();
        }
      }}
    >
      <Container
        style={{
          backgroundImage: props.image,
        }}
      ></Container>
    </ModalBg>
  );
}
