/* eslint-disable react-hooks/exhaustive-deps */
import { Message } from "@/components/Message";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
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

interface ChatProps {
  id: number;
  name: string | null;
  otherUserId: string | null | undefined;
}

export function Chat(props: ChatProps) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();

  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [messageText, setMessageText] = useState<string>("");

  const chatContentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getMessages(Number(props.id));

    const messagesWatcher = supabase
      .channel(`chanel-${props.id}`)
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
      .subscribe();

    return () => {
      messagesWatcher.unsubscribe();
    }
  }, [props.id]);

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
  }, [messageText]);

  const onInputKeyUp = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }, [sendMessage]);

  return (
    <Container>
      <Header>
        <Icon />
        <Info>
          <Name>{props.name}</Name>
          <Status>Aktywny</Status>
        </Info>
        <Flex />
        <Search />
        <Menu />
      </Header>
      <ChatContent ref={chatContentRef}>
        {messages?.map((message: MessageInterface) => (
          <Message
            key={message.id}
            message={message.value}
            time={message.created_at!}
            isSelf={message.sender === user?.id}
          />
        ))}
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
    </Container>
  );
}
