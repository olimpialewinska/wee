/* eslint-disable jsx-a11y/alt-text */
import { IList } from "@/interfaces";
import { Wrapper, Image, Content, Title, LastMessage, Time } from "./style";
import { User } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { getTime } from "@/utils/chatList/getChatList";
import { chatContext } from "../..";
import { useContext } from "react";

export function ListItem({ data, user }: { data: IList; user: User }) {
  const router = useRouter();
  const { setChatData } = useContext(chatContext);
  return (
    <Wrapper
      onClick={() => {
        router.push(`/home/${data.convId}`);
        setChatData(data);
      }}
    >
      <Image
        style={{
          backgroundImage:
            data.otherMember.image !== null
              ? `url(${data.otherMember.image})`
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
