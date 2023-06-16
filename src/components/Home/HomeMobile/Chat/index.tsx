/* eslint-disable jsx-a11y/alt-text */
import { useContext, useState } from "react";
import { viewContext } from "..";
import { usePathname } from "next/navigation";
import {
  ActivityStatus,
  Attachment,
  ChatInput,
  Container,
  Icon,
  Image,
  MessageContainer,
  MessageInput,
  Name,
  Navbar,
  Send,
  StyledChat,
  Wrapper,
} from "./style";
import { ChatSettingsModal } from "../../ChatSettingsModal";
import { ImageModal } from "../../ImageModal";
import { IList } from "@/interfaces";

export function Chat({ chat }: { chat: IList | null }) {
  const { setChat } = useContext(viewContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const backgoundImage =
    chat?.otherMember.image !== null
      ? `url(${chat?.otherMember.image})`
      : chat.isGroup === true
      ? `url(/groupDefault.png)`
      : "url(/default.png)";

  const [showImage, setShowImage] = useState(false);
  const handleCloseImage = () => setShowImage(false);
  const handleShowImage = () => {
    setShowImage(true);
  };

  return (
    <StyledChat
      style={{
        display: chat === null ? "none" : "flex",
      }}
    >
      <Navbar>
        <Icon
          style={{
            backgroundImage: `url(/left-arrow.svg)`,
          }}
          onClick={() => setChat(null)}
        />
        <Image
          onClick={handleShowImage}
          style={{
            backgroundImage: backgoundImage,
          }}
        />

        <Wrapper>
          <Name>{chat?.otherMember.name}</Name>
          <ActivityStatus> Online</ActivityStatus>
        </Wrapper>

        <Icon
          style={{
            backgroundImage: `url(/settings.svg)`,
          }}
          onClick={handleShow}
        />
      </Navbar>
      <Container>{chat?.convId}</Container>
      <ChatInput>
        <Attachment />
        <MessageContainer>
          <MessageInput placeholder="Type a message" />
        </MessageContainer>
        <Send />
      </ChatInput>
      <ImageModal
        visible={showImage}
        hide={handleCloseImage}
        image={backgoundImage}
      />
      <ChatSettingsModal visible={show} hide={handleClose} />
    </StyledChat>
  );
}
