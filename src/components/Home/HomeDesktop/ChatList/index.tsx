/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import { User } from "@supabase/auth-helpers-nextjs";
import {
  Container,
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
import { useCallback, useEffect, useRef, useState } from "react";
import { IList } from "../../../../interfaces";
import { ListItem } from "./ListItem";
import { usePathname, useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { NewChatModal } from "../../NewChatModal";
import { store } from "@/stores";

export const ChatList = observer(() => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const handleImageClick = useCallback(() => {
    router.push("/settings");
  }, [router]);

  useEffect(() => {
    (async () => {
      if (id == undefined) {
        store.currentChatStore.currentChatStore =
          store.chatListStore.chatList[0];
        return;
      }
      const chat = store.chatListStore.chatList.filter(
        (item) => (item.convId as unknown as string) == id
      );
      store.currentChatStore.currentChatStore = chat[0];
    })();
  }, [router, store.chatListStore.chatList]);

  return (
    <Container>
      <Bg>
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
              onChange={(e) => (store.chatListStore.search = e.target.value)}
              value={store.chatListStore.search}
            />
          </ChatSearch>
        </ChatSearchContainer>
        <List>
          {store.chatListStore.filteredList.map((item: IList) => (
            <ListItem key={item.convId} data={item} />
          ))}
        </List>
      </Bg>
      <NewChatModal visible={show} hide={handleClose} />
    </Container>
  );
});
