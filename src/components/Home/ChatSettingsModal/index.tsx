import { ModalProps } from "@/interfaces";
import { Container, ModalBg } from "./style";

export function ChatSettingsModal(props: ModalProps) {
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
      <Container></Container>
    </ModalBg>
  );
}
