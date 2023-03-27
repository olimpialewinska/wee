/* eslint-disable react-hooks/exhaustive-deps */
import { Message } from "@/components/Message";

import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React from "react";
import { Key, useCallback, useEffect, useRef, useState } from "react";
import { Database } from "../../../types/supabase";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
import {
  Attachment,
  ChatContent,
  ChatInput,
  Container,
  Emoji,
  Flex,
  Header,
  Icon,
  Info,
  Menu,
  MessageContainer,
  MessageInput,
  Name,
  Search,
  Send,
  Status,
} from "./style";

import { MessageInterface } from "../../../interfaces";
import { ChatSettingsModal } from "@/components/Desktop/ChatSettingsModal";
import { Announcement } from "@/components/Message/Announcement";

interface ChatProps {
  id: number;
  name: string | null | undefined;
  otherUserId: string | null | undefined;
  image: string | null | undefined;
  bgColor: string;
  color: string;
  presence: string;
}

export function Chat(props: ChatProps) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();

  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [messageText, setMessageText] = useState<string>("");

  const chatContentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [show, setShow] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("/person.svg");

  const [status, setStatus] = useState(props.presence);

  useEffect(() => {
    getMessages(Number(props.id));

    const messagesWatcher = supabase
      .channel(`chanel-${props.id}`, {
        config: {
          presence: {
            key: `${user?.id}`,
          },
        },
      })
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        async (payload) => {
          const message = payload.new as MessageInterface;
          if (message.conversation_id !== props.id) return;
          if (message) {
            if (chatContentRef.current) {
              shouldScrollDown.current =
                chatContentRef.current.scrollHeight -
                  chatContentRef.current.clientHeight <=
                  chatContentRef.current.scrollTop + 32 ||
                message.sender === user?.id;
            }
            setMessages((prev) => [...prev, message]);
          }
        }
      )
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          const status = await messagesWatcher.track({
            online_at: new Date().toISOString(),
          });
        }
      });

    messagesWatcher.on("presence", { event: "sync" }, () => {
      //console.log("Online users: ", messagesWatcher.presenceState());

      const users = messagesWatcher.presenceState();

      const otherUserPresence = users[`${props.otherUserId}`];
      if (otherUserPresence) {
        setStatus(`${props.name} is currently viewing this chat`);
      } else {
        setStatus(props.presence);
      }
    });

    return () => {
      messagesWatcher.unsubscribe();
    };
  }, [props]);

  let shouldScrollDown = useRef(false);

  useEffect(() => {
    if (chatContentRef.current && shouldScrollDown.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  const getMessages = useCallback(async (conversationId: number) => {
    const { data: messages } = await supabase
      .from("messages")
      .select("id, conversation_id, value, sender, receiver, created_at")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (messages) {
      shouldScrollDown.current = true;
      setMessages(messages);
    }
  }, []);

  const sendMessage = useCallback(async () => {
    if (messageText==="") return;
    const { data: message } = await supabase.from("messages").insert([
      {
        value: messageText,
        sender: user?.id,
        receiver: props.otherUserId,
        conversation_id: props.id,
      },
    ]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setMessageText("");
  }, [messageText]);

  const onInputKeyUp = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    },
    [sendMessage]
  );

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  return (
    <Container>
      <Header>
        <Icon
          style={{
            backgroundImage: `url(${
              props.image ? props.image : "/person.svg"
            })`,
            filter: props.image ? "none" : "invert(1)",
            border: props.presence === "Online" ? "2px solid #28ca56" : "none",
          }}
        />
        <Info>
          <Name>{props.name}</Name>
          <Status>{status}</Status>
        </Info>
        <Flex />
        <Search />
        <Menu onClick={handleShow} />
      </Header>
      <ChatContent
        ref={chatContentRef}
        style={{
          backgroundColor: props.bgColor ? props.bgColor : "#363636",
        }}
      >
        {messages?.map((message: MessageInterface) => {
          if (message.sender == null) {
            return (
              <Announcement
                key={message.id}
                message={message.value}
              />
            );
          }

          return (
            <Message
              key={message.id}
              message={message.value}
              time={message.created_at!}
              isSelf={message.sender === user?.id}
              color={props.color ? props.color : "#005438"}
            />
          );
        })}
      </ChatContent>
      <ChatInput>
        <Attachment />
        <MessageContainer>
          <MessageInput
            ref={inputRef}
            placeholder="Type a message"
            onChange={(e) => setMessageText(e.target.value)}
            onKeyUp={onInputKeyUp}
          />
          <Emoji />
        </MessageContainer>
        <Send onClick={sendMessage} />
      </ChatInput>
      <ChatSettingsModal
        visible={show}
        hide={handleClose}
        conversationId={props.id}
        image={props.image}
        name={props.name}
        bgColor={props.bgColor ? props.bgColor : "#363636"}
        color={props.color ? props.color : "#005438"}
      />
    </Container>
  );
}
