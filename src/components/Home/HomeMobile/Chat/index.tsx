/* eslint-disable jsx-a11y/alt-text */
"use client";
import { useCallback, useEffect, useState } from "react";
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
import { getMessages } from "@/utils/chat/getMessages";
import { Message } from "../../Message";
import { Announcement } from "../../Announcement";
import { addMessageToDB } from "@/utils/chat/sendMessage";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getChatColors } from "@/utils/chat/getColors";
import { store } from "@/stores";
import { observer } from "mobx-react-lite";
import { IMessage } from "@/interfaces";

export const Chat = observer(() => {
  const supabase = createClientComponentClient();
  const [messageText, setMessageText] = useState<string>("");
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const [bg, setBg] = useState<string | null>("");
  const [color, setColor] = useState<string | null>("");

  const backgoundImage =
    store.currentChatStore.currentChatStore?.otherMember.image !== null
      ? `url(${store.currentChatStore.currentChatStore?.otherMember.image})`
      : store.currentChatStore.currentChatStore.isGroup === true
      ? `url(/groupDefault.png)`
      : "url(/default.png)";

  const [showImage, setShowImage] = useState(false);
  const handleCloseImage = () => setShowImage(false);
  const handleShowImage = () => {
    setShowImage(true);
  };

  const getData = useCallback(async () => {
    setMessages(
      await getMessages(store.currentChatStore.currentChatStore?.convId)
    );
  }, [store.currentChatStore.currentChatStore?.convId]);

  const getColors = useCallback(async () => {
    if (store.currentChatStore.currentChatStore === null) return;
    const colors = await getChatColors(
      store.currentChatStore.currentChatStore.convId
    );
    if (colors === null) return;
    setBg(colors.bgColor);
    setColor(colors.messageColor);
  }, [store.currentChatStore.currentChatStore?.convId]);

  useEffect(() => {
    getColors();
    getData();
    const channel = supabase
      .channel(`chanel-${store.currentChatStore.currentChatStore?.convId}`, {
        config: {
          presence: {
            key: `${store.currentUserStore.currentUserStore?.id}`,
          },
        },
      })
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload: any) => {
          const message = payload.new as IMessage;
          if (
            message.convId !== store.currentChatStore.currentChatStore?.convId
          )
            return;
          setMessages((prev) => [...prev, message]);
        }
      );

    channel.subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [
    store.currentChatStore.currentChatStore,
    getColors,
    getData,
    supabase,
    store.currentUserStore.currentUserStore?.id,
  ]);

  const sendMessage = useCallback(async () => {
    if (messageText === "") return;
    const data = await addMessageToDB(
      messageText,
      store.currentChatStore.currentChatStore?.convId,
      store.currentUserStore.currentUserStore?.id!
    );
    setMessageText("");
  }, [
    store.currentChatStore.currentChatStore?.convId,
    messageText,
    store.currentUserStore.currentUserStore?.id,
  ]);

  const onInputKeyUp = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    },
    [sendMessage]
  );

  return (
    <StyledChat
      style={{
        display:
          store.currentChatStore.currentChatStore === null ? "none" : "flex",
      }}
    >
      <Navbar>
        <Icon
          style={{
            backgroundImage: `url(/left-arrow.svg)`,
          }}
          onClick={() => store.currentChatStore.setCurrentChat(null)}
        />
        <Image
          onClick={handleShowImage}
          style={{
            backgroundImage: backgoundImage,
            border:
              store.onlineUsersStore.checkOnline(
                store.currentChatStore.currentChatStore?.otherMember.userId
              ) === true
                ? "2px solid #00ff00"
                : "",
          }}
        />

        <Wrapper>
          <Name>
            {store.currentChatStore.currentChatStore?.otherMember.name}
          </Name>
          <ActivityStatus>{status ? "Online" : "Offline"}</ActivityStatus>
        </Wrapper>

        <Icon
          style={{
            backgroundImage: `url(/settings.svg)`,
          }}
          onClick={handleShow}
        />
      </Navbar>
      <Container
        style={{
          backgroundColor: bg ? bg : "",
        }}
      >
        {messages.map((message: IMessage) =>
          message.senderId ? (
            <Message
              key={message.id}
              message={message}
              isSelf={
                message.senderId === store.currentUserStore.currentUserStore?.id
              }
              color={color}
            />
          ) : (
            <Announcement key={message.id} message={message.value} />
          )
        )}
      </Container>
      <ChatInput>
        <Attachment />
        <MessageContainer>
          <MessageInput
            placeholder="Type a message"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyUp={onInputKeyUp}
          />
        </MessageContainer>
        <Send onClick={sendMessage} />
      </ChatInput>
      <ImageModal
        visible={showImage}
        hide={handleCloseImage}
        image={backgoundImage}
      />
      <ChatSettingsModal visible={show} hide={handleClose} />
    </StyledChat>
  );
});
