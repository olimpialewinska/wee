/* eslint-disable jsx-a11y/alt-text */
"use client";
import {
  Bg,
  Header,
  ChatSearch,
  ChatSearchContainer,
  ChatSearchInput,
  SearchIcon,
  Image,
  NewChat,
  List,
  Title,
} from "./style";
import { useCallback, useState } from "react";
import { ListItem } from "./ListItem";
import { useRouter } from "next/navigation";
import { NewChatModal } from "../../NewChatModal";

import { store } from "@/stores";
import { observer } from "mobx-react-lite";

export const ChatList = observer(() => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const list = store.chatListStore.filteredList;

  const handleImageClick = useCallback(() => {
    router.push("/settings");
  }, [router]);

  return (
    <Bg
      style={{
        display:
          store.currentChatStore.currentChatStore !== null ? "none" : "flex",
      }}
    >
      <Header>
        <Image
          onClick={handleImageClick}
          style={{
            backgroundImage:
              store.currentUserStore.currentUserStore.image !== null
                ? `url(${store.currentUserStore.currentUserStore.image})`
                : "url(/default.png)",
          }}
        />
        <Title>Chats</Title>
        <NewChat onClick={handleShow} />
      </Header>
      <ChatSearchContainer>
        <ChatSearch>
          <SearchIcon />
          <ChatSearchInput
            placeholder="Search"
            value={store.chatListStore.search}
            onChange={(e) => (store.chatListStore.search = e.target.value)}
          />
        </ChatSearch>
      </ChatSearchContainer>
      <List>
        {list.map((item) => (
          <ListItem key={item.convId} data={item} />
        ))}
      </List>
      <NewChatModal visible={show} hide={handleClose} />
    </Bg>
  );
});
