/* eslint-disable jsx-a11y/alt-text */
import { IList } from "@/interfaces";
import { Wrapper, Image, Content, Title, LastMessage, Time } from "./style";
import { User } from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";
import { getTime } from "@/utils/chatList/getChatList";
import { chatContext, onlineContext } from "../..";
import { useCallback, useContext, useEffect, useState } from "react";
import { checkPresence } from "@/utils/chat/checkPresence";

export function ListItem({
  data,
  user,
  status,
}: {
  data: IList;
  user: User;
  status: boolean;
}) {
  const router = useRouter();

  const { setChatData } = useContext(chatContext);

  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const handleClick = useCallback(() => {
    router.push(`/home/${data.convId}`);
    setChatData(data);
  }, [data, router, setChatData]);

  return (
    <Wrapper
      onClick={handleClick}
      style={{
        backgroundColor:
          id == (data.convId as any) ? "rgba(255, 255, 255, 0.1)" : "",
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
