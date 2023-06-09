/* eslint-disable jsx-a11y/alt-text */
import { User } from "@supabase/auth-helpers-nextjs";
import {
  Container,
  ActivityStatus,
  Attachment,
  ChatInput,
  Icon,
  MessageContainer,
  MessageInput,
  Name,
  Navbar,
  Send,
  Wrapper,
  Image,
  Bg,
  ChatContainer,
  Emoji,
} from "./style";

import { useContext, useEffect, useState } from "react";
import { ChatSettingsModal } from "../../ChatSettingsModal";
import { ImageModal } from "../../ImageModal";
import { chatContext } from "..";

export function Chat({ user }: { user: User }) {
  const { chatData } = useContext(chatContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const [showImage, setShowImage] = useState(false);
  const handleCloseImage = () => setShowImage(false);
  const handleShowImage = () => {
    setShowImage(true);
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <Bg>
        <Navbar>
          <Image
            onClick={handleShowImage}
            style={{
              backgroundImage:
                chatData?.otherMember.image !== null
                  ? `url(${chatData?.otherMember.image})`
                  : "url(/default.png)",
            }}
          />

          <Wrapper>
            <Name>{chatData?.otherMember.name}</Name>
            <ActivityStatus> Online</ActivityStatus>
          </Wrapper>

          <Icon
            style={{
              backgroundImage: `url(/settings.svg)`,
            }}
            onClick={handleShow}
          />
        </Navbar>
        <ChatContainer>{chatData?.lastMessage?.convId}</ChatContainer>
        <ChatInput>
          <Attachment />
          <MessageContainer>
            <MessageInput placeholder="Type a message" />
          </MessageContainer>
          <Emoji />
          <Send />
        </ChatInput>
      </Bg>
      <ImageModal visible={showImage} hide={handleCloseImage} />
      <ChatSettingsModal visible={show} hide={handleClose} />
    </Container>
  );
}
