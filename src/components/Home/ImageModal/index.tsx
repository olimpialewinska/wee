import { ModalProps } from "@/interfaces";
import { Close, Container, ModalBg } from "./style";

interface ImageModalProps extends ModalProps {
  image: string;
  fullScreen?: boolean;
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
          width:
            props.fullScreen && props.fullScreen === true ? "90vw" : "300px",
          height:
            props.fullScreen && props.fullScreen === true ? "80vh" : "300px",
        }}
      >
        <Close onClick={props.hide} />
      </Container>
    </ModalBg>
  );
}
