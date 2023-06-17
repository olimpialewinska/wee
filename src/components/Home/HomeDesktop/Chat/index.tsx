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

import { useCallback, useContext, useEffect, useState } from "react";
import { ChatSettingsModal } from "../../ChatSettingsModal";
import { ImageModal } from "../../ImageModal";
import { chatContext, onlineContext } from "..";
import { IMessage } from "@/interfaces";
import { getMessages } from "@/utils/chat/getMessages";

import { Announcement } from "../../Announcement";
import { Message } from "../../Message";
import { checkPresence } from "@/utils/chat/checkPresence";
import { addMessageToDB } from "@/utils/chat/sendMessage";
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export function Chat({ user }: { user: User }) {
  const { chatData } = useContext(chatContext);
  const { onlineUsers } = useContext(onlineContext);
  const [status, setStatus] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [statusDetails, setStatusDetails] = useState<string | null>(null);
  const [messageText, setMessageText] = useState<string>("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const backgoundImage =
    chatData?.otherMember.image !== null
      ? `url(${chatData?.otherMember.image})`
      : chatData?.isGroup === true
      ? `url(/groupDefault.png)`
      : "url(/default.png)";

  const [showImage, setShowImage] = useState(false);
  const handleCloseImage = () => setShowImage(false);
  const handleShowImage = () => {
    setShowImage(true);
  };

  const getData = useCallback(async () => {
    setMessages(await getMessages(chatData?.convId));
  }, [chatData?.convId]);

  const checkStatus = useCallback(() => {
    setStatus(
      checkPresence(user.id, chatData?.otherMember.userId, onlineUsers)
    );
  }, [chatData?.otherMember.userId, onlineUsers, user.id]);

  useEffect(() => {
    getData();
    checkStatus();
    const channel = supabase
      .channel(`chanel-${chatData?.convId}`, {
        config: {
          presence: {
            key: `${user?.id}`,
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
          if (message.convId !== chatData?.convId) return;
          setMessages((prev) => [...prev, message]);
        }
      )
      .subscribe();

    if (!chatData?.isGroup) {
      channel.on("presence", { event: "sync" }, () => {
        const users = channel.presenceState();
        console.log(users);

        const otherUserPresence = users[`${chatData?.otherMember.userId}`];
        if (otherUserPresence) {
          setStatusDetails(
            `${chatData?.otherMember.name} is currently viewing this chat`
          );
        } else {
          checkStatus();
        }
      });
    }

    return () => {
      channel.unsubscribe();
    };
  }, [
    chatData?.convId,
    chatData?.isGroup,
    chatData?.otherMember.name,
    chatData?.otherMember.userId,
    checkStatus,
    getData,
    user?.id,
  ]);

  const sendMessage = useCallback(async () => {
    if (messageText === "") return;
    const data = await addMessageToDB(messageText, chatData?.convId, user.id);
    setMessageText("");
  }, [chatData?.convId, messageText, user.id]);

  const onInputKeyUp = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    },
    [sendMessage]
  );

  return (
    <Container>
      <Bg>
        <Navbar>
          <Image
            onClick={handleShowImage}
            style={{
              backgroundImage: backgoundImage,
              border: status === true ? "2px solid #00ff00" : "",
            }}
          />

          <Wrapper>
            <Name>{chatData?.otherMember.name}</Name>
            <ActivityStatus>
              {statusDetails ? statusDetails : status ? "Online" : "Offline"}
            </ActivityStatus>
          </Wrapper>

          <Icon
            style={{
              backgroundImage: `url(/settings.svg)`,
            }}
            onClick={handleShow}
          />
        </Navbar>
        <ChatContainer>
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
        </ChatContainer>
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
          <Emoji />
          <Send onClick={sendMessage} />
        </ChatInput>
      </Bg>
      <ImageModal
        visible={showImage}
        hide={handleCloseImage}
        image={backgoundImage}
      />
      <ChatSettingsModal visible={show} hide={handleClose} />
    </Container>
  );
}
