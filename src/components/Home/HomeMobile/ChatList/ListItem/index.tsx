"use client";
import { IList } from "@/interfaces";
import { Wrapper, Image, Content, Title, LastMessage, Time } from "./style";
import { useRouter } from "next/navigation";
import { getTime } from "@/utils/chatList/getChatList";
import { store } from "@/stores";
import { observer } from "mobx-react-lite";

export const ListItem = observer(({ data }: { data: IList }) => {
  const router = useRouter();
  const value =
    data.lastMessage?.type === "image"
      ? "Image has been sent"
      : data.lastMessage?.type === "file"
      ? "File has been sent"
      : data.lastMessage?.type === "deleted"
      ? "Message has been deleted"
      : data.lastMessage?.value?.includes("colors,") &&
        data.lastMessage?.senderId === null
      ? "Color has been changed"
      : data.lastMessage?.value?.includes("nickname,") &&
        data.lastMessage?.senderId === null
      ? "Nickname has been changed"
      : data.lastMessage?.value;

  return (
    <Wrapper
      onClick={() => {
        router.push(`/home/${data.convId}`);
        store.currentChatStore.currentChatStore = data;
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
          border:
            store.onlineUsersStore.checkOnline(data.otherMember.userId) === true
              ? "2px solid #00ff00"
              : "",
        }}
      />
      <Content>
        <Title>{data.otherMember.name}</Title>
        <LastMessage>
          {data.lastMessage?.senderId ===
          store.currentUserStore.currentUserStore.id
            ? "You: "
            : ""}
          {value && value.length > 35 ? value.slice(0, 35) + "..." : value}
        </LastMessage>
      </Content>
      <Time>{getTime(data.lastMessage?.created_at)}</Time>
    </Wrapper>
  );
});
