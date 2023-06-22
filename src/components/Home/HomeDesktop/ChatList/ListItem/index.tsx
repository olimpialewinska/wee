/* eslint-disable jsx-a11y/alt-text */
import { IList } from "@/interfaces";
import { Wrapper, Image, Title, LastMessage, Time, Row } from "./style";
import { usePathname, useRouter } from "next/navigation";
import { getTime } from "@/utils/chatList/getChatList";
import { useCallback } from "react";
import { store } from "@/stores";
import { observer } from "mobx-react-lite";

export const ListItem = observer((props: { data: IList }) => {
  const router = useRouter();

  const value =
    props.data.lastMessage?.type === "image"
      ? "Image has been sent"
      : props.data.lastMessage?.type === "file"
      ? "File has been sent"
      : props.data.lastMessage?.type === "deleted"
      ? "Message has been deleted"
      : props.data.lastMessage?.value?.includes("colors,") &&
        props.data.lastMessage?.senderId === null
      ? "Color has been changed"
      : props.data.lastMessage?.value?.includes("nickname,") &&
        props.data.lastMessage?.senderId === null
      ? "Nickname has been changed"
      : props.data.lastMessage?.value;

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
          border: !props.data.isGroup
            ? store.onlineUsersStore.checkOnline(
                store.currentChatStore.currentChatStore?.otherMember.userId
              ) === true
              ? "2px solid #00ff00"
              : "2px solid #616161;"
            : "",
        }}
      />
      <div style={{ width: "100%", marginLeft: 10, flex: 1 }}>
        <Row>
          {" "}
          <Title>{props.data.otherMember.name}</Title>{" "}
          <Time>{getTime(props.data.lastMessage?.created_at)}</Time>
        </Row>
        <LastMessage>
          {props.data.lastMessage?.senderId ===
          store.currentUserStore.currentUserStore.id
            ? "You: "
            : ""}
          {value && value.length > 25 ? value.substring(0, 25) + "..." : value}
        </LastMessage>
      </div>
    </Wrapper>
  );
});
