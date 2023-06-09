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
import { useCallback, useContext, useEffect, useState } from "react";
import { IList } from "../../../../interfaces";
import { ListItem } from "./ListItem";
import { usePathname, useRouter } from "next/navigation";
import { NewChatModal } from "../../NewChatModal";
import { getData } from "../../../../utils/chatList/getChatList";
import { chatContext } from "..";
import { getImage } from "@/utils/settings/images";

export function ChatList({ user }: { user: User }) {
  const { setChatData } = useContext(chatContext);
  const [image, setImage] = useState<string | null>("");
  const [chatlist, setChatlist] = useState<IList[]>([]);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  console.log("chatlist", chatlist);
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const getMyImage = useCallback(async () => {
    setImage(await getImage(user.id));
  }, [user.id]);

  const getChats = useCallback(async () => {
    setChatlist(await getData(user.id));
  }, [user.id]);

  const handleImageClick = useCallback(() => {
    router.push("/settings");
  }, [router]);

  useEffect(() => {
    getChats();
    getMyImage();
    if (id == undefined) {
      setChatData(chatlist[0]);
      return;
    }
    const chat = chatlist.filter(
      (item) => (item.convId as unknown as string) == id
    );
    setChatData(chat[0]);
  }, [chatlist, getChats, getMyImage, id, router, setChatData]);

  return (
    <Container>
      <Bg>
        <Header>
          <Image
            onClick={handleImageClick}
            style={{
              backgroundImage:
                image !== null ? `url(${image})` : "url(/default.png)",
            }}
          />
          <Title>Chats</Title>
          <NewChat onClick={handleShow} />
        </Header>
        <ChatSearchContainer>
          <ChatSearch>
            <SearchIcon />
            <ChatSearchInput placeholder="Search" />
          </ChatSearch>
        </ChatSearchContainer>
        <List>
          {chatlist.map((item: IList) => (
            <ListItem key={item.convId} data={item} user={user} />
          ))}
        </List>
      </Bg>
      <NewChatModal visible={show} hide={handleClose} />
    </Container>
  );
}
