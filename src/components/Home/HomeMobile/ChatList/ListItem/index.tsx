"use client";
import { IList } from "@/interfaces";
import { Wrapper, Image, Content, Title, LastMessage, Time } from "./style";
import { User } from "@supabase/auth-helpers-nextjs";
import { useCallback, useContext, useEffect, useState } from "react";
import { onlineContext, viewContext } from "../..";
import { useRouter } from "next/navigation";
import { getTime } from "@/utils/chatList/getChatList";
import { checkPresence } from "@/utils/chat/checkPresence";

export function ListItem({ data, user }: { data: IList; user: User }) {
  const router = useRouter();
  const [status, setStatus] = useState<boolean>(false);
  const { onlineUsers } = useContext(onlineContext);
  const { setChat } = useContext(viewContext);
  const checkStatus = useCallback(() => {
    setStatus(checkPresence(user.id, data.otherMember.userId, onlineUsers));
  }, [data.otherMember.userId, onlineUsers, user.id]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);
  return (
    <Wrapper
      onClick={() => {
        router.push(`/home/${data.convId}`);
        setChat(data);
      }}
    >
      <Image
        style={{
          backgroundImage:
            data.otherMember.image !== null
              ? `url(${data.otherMember.image})`
              : data.isGroup === true
              ? `url(/groupDefault.png)`
              : "url(/default.png)",
          border: status === true ? "2px solid #00ff00" : "",
        }}
      />
      <Content>
        <Title>{data.otherMember.name}</Title>
        <LastMessage>
          {data.lastMessage?.senderId === user.id ? "You: " : ""}
          {data.lastMessage?.value}
        </LastMessage>
      </Content>
      <Time>{getTime(data.lastMessage?.created_at)}</Time>
    </Wrapper>
  );
}
