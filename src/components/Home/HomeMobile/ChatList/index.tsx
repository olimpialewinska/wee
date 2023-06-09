"use client";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
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
import { useCallback, useEffect, useState } from "react";
import { IList } from "../../../../interfaces";
import { ListItem } from "./ListItem";
import { useRouter } from "next/navigation";
import { NewChatModal } from "../../NewChatModal";
import { getData } from "../../../../utils/chatList/getChatList";
import { getImage } from "@/utils/settings/images";

export function ChatList({ user }: { user: User }) {
  const [chatlist, setChatlist] = useState<IList[]>([]);
  const [image, setImage] = useState<string | null>("");
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const getChats = useCallback(async () => {
    setChatlist(await getData(user.id));
  }, [user.id]);

  const getMyImage = useCallback(async () => {
    setImage(await getImage(user.id));
  }, [user.id]);

  const handleImageClick = useCallback(() => {
    router.push("/settings");
  }, [router]);

  useEffect(() => {
    getChats();
    getMyImage();
  }, [getChats, getMyImage]);

  return (
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
      <NewChatModal visible={show} hide={handleClose} />
    </Bg>
  );
}
