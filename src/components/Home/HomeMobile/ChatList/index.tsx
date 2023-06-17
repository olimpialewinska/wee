/* eslint-disable jsx-a11y/alt-text */
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
import { useCallback, useContext, useEffect, useState } from "react";
import { IList } from "../../../../interfaces";
import { ListItem } from "./ListItem";
import { useRouter } from "next/navigation";
import { NewChatModal } from "../../NewChatModal";
import { getImage } from "@/utils/settings/images";
import { onlineContext } from "..";
import { checkPresence } from "@/utils/chat/checkPresence";

export function ChatList({
  user,
  chatlist,
}: {
  user: User;
  chatlist: IList[];
}) {
  const [image, setImage] = useState<string | null>("");
  const { onlineUsers } = useContext(onlineContext);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState<string>("");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const filteredList = chatlist.filter((item: IList) => {
    return (
      item.otherMember.name &&
      item.otherMember.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const getMyImage = useCallback(async () => {
    setImage(await getImage(user.id));
  }, [user.id]);

  const handleImageClick = useCallback(() => {
    router.push("/settings");
  }, [router]);

  const checkOnline = (id: string | null | undefined) => {
    return checkPresence(user.id, id, onlineUsers);
  };

  useEffect(() => {
    getMyImage();
  }, [getMyImage]);

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
          <ChatSearchInput
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </ChatSearch>
      </ChatSearchContainer>
      <List>
        {filteredList.map((item) => (
          <ListItem
            key={item.convId}
            data={item}
            user={user}
            status={checkOnline(item.otherMember.userId)}
          />
        ))}
      </List>
      <NewChatModal visible={show} hide={handleClose} user={user} />
    </Bg>
  );
}
