/* eslint-disable jsx-a11y/alt-text */
import { IList } from "@/interfaces";
import { Wrapper, Image, Content, Title, LastMessage, Time } from "./style";
import { usePathname, useRouter } from "next/navigation";
import { getTime } from "@/utils/chatList/getChatList";
import { useCallback } from "react";
import { store } from "@/stores";
import { observer } from "mobx-react-lite";

export const ListItem = observer((props: { data: IList }) => {
  const router = useRouter();

  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const handleClick = useCallback(() => {
    router.push(`/home/${props.data.convId}`);
    store.currentChatStore.currentChatStore = props.data;
  }, [props.data, router, store.currentChatStore.currentChatStore]);

  return (
    <Wrapper
      onClick={handleClick}
      style={{
        backgroundColor:
          id == (props.data.convId as any) ? "rgba(255, 255, 255, 0.1)" : "",
      }}
    >
      <Image
        style={{
          backgroundImage:
            props.data.otherMember.image !== null
              ? `url(${props.data.otherMember.image})`
              : props.data.isGroup === true
              ? `url(/groupDefault.png)`
              : "url(/default.png)",
          border: store.onlineUsersStore.checkOnline(
            props.data.otherMember.userId
          )
            ? "2px solid #00ff00"
            : "",
        }}
      />
      <Content>
        <Title>{props.data.otherMember.name}</Title>
        <LastMessage>
          {props.data.lastMessage?.senderId ===
          store.currentUserStore.currentUserStore.id
            ? "You: "
            : ""}
          {props.data.lastMessage?.type === "image"
            ? "Image has been send"
            : props.data.lastMessage?.type === "file"
            ? "File has been send"
            : props.data.lastMessage?.value?.includes("colors,") &&
              props.data.lastMessage?.senderId === null
            ? "Color has been changed"
            : props.data.lastMessage?.value?.includes("nickname,") &&
              props.data.lastMessage?.senderId === null
            ? "Nickname has been changed"
            : props.data.lastMessage?.value}
        </LastMessage>
      </Content>

      <Time>{getTime(props.data.lastMessage?.created_at)}</Time>
    </Wrapper>
  );
});
