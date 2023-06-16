"use client";
import { IList } from "@/interfaces";
import { Wrapper, Image, Content, Title, LastMessage, Time } from "./style";
import { User } from "@supabase/auth-helpers-nextjs";
import { useContext } from "react";
import { viewContext } from "../..";
import { useRouter } from "next/navigation";
import { getTime } from "@/utils/chatList/getChatList";

export function ListItem({ data, user }: { data: IList; user: User }) {
  const router = useRouter();
  const { setChat } = useContext(viewContext);
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
