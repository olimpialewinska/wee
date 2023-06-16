/* eslint-disable jsx-a11y/alt-text */
"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { onlineContext, viewContext } from "..";
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
import { IList, IMessage } from "@/interfaces";
import { getMessages } from "@/utils/chat/getMessages";
import { Message } from "../../Message";
import { Announcement } from "../../Announcement";
import { User } from "@supabase/auth-helpers-nextjs";
import { checkPresence } from "@/utils/chat/checkPresence";

export function Chat({ chat, user }: { chat: IList | null; user: User }) {
  const { setChat } = useContext(viewContext);
  const { onlineUsers } = useContext(onlineContext);
  const [status, setStatus] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
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

  const getData = useCallback(async () => {
    setMessages(await getMessages(chat?.convId));
  }, [chat?.convId]);

  const checkStatus = useCallback(() => {
    setStatus(checkPresence(user.id, chat?.otherMember.userId, onlineUsers));
  }, [chat, onlineUsers, user.id]);

  useEffect(() => {
    getData();
    checkStatus();
  }, [checkStatus, getData]);

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
            border: status === true ? "2px solid #00ff00" : "",
          }}
        />

        <Wrapper>
          <Name>{chat?.otherMember.name}</Name>
          <ActivityStatus>{status ? "Online" : "Offline"}</ActivityStatus>
        </Wrapper>

        <Icon
          style={{
            backgroundImage: `url(/settings.svg)`,
          }}
          onClick={handleShow}
        />
      </Navbar>
      <Container>
        {messages.map((message: IMessage) =>
          message.senderId ? (
            <Message
              key={message.id}
              message={message}
              isSelf={message.senderId === user.id}
            />
          ) : (
            <Announcement key={message.id} message={message.value} />
          )
        )}
      </Container>
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
