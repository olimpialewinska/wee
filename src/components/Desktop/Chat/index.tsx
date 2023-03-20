/* eslint-disable react-hooks/exhaustive-deps */
import { Message } from "@/components/Message";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { Key, useEffect, useState } from "react";
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

import Data from "../../../interfaces"

interface ChatProps {
  id: string;
  name: string | null;
}

export function Chat(props: ChatProps) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();

  const [messages, setMessages] = useState();

  useEffect(() => {
    getMessages(Number(props.id));

  }, [props.id]);

  async function getMessages(conversationId: number) {
    const { data: messages } = await supabase
      .from('messages')
      .select('id, value, sender, receiver, created_at')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    setMessages(messages)
  }

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
      <ChatContent>
        {messages?.map(
          (message: {
            id: Key | null | undefined;
            value: string;
            created_at: string;
            sender: any;
          }) => (
            <Message
              key={message.id}
              message={message.value}
              time={message.created_at}
              isSelf={message.sender === user?.id}
            />
          )
        )}
      </ChatContent>
      <ChatInput>
        <Attachment />
        <MessageContainer>
          <MessageInput placeholder="Type a message" />
          <Emoji />
        </MessageContainer>
        <Send />
      </ChatInput>
    </Container>
  );
}
