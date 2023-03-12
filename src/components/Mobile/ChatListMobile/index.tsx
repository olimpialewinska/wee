import { ChatListItemMobile } from "../ChatListItemMobile";

import {
  AddIcon,
  Background,
  ChatList,
  Container,
  Navbar,
  ProfileAvatar,
  Profiles,
  Search,
  SearchContainer,
  SearchIcon,
  SearchInput,
  Title,
} from "./style";

export function ChatListMobile() {
  return (
    <Container>
      <Navbar>
        <ProfileAvatar />
        <Title>Chats</Title>
        <AddIcon />
      </Navbar>
      <SearchContainer>
        <Search>
          <SearchIcon />
          <SearchInput placeholder="Search" />
        </Search>
      </SearchContainer>
      <Background>
        <ChatList>
          <ChatListItemMobile />
          <ChatListItemMobile /> <ChatListItemMobile /> <ChatListItemMobile />{" "}
          <ChatListItemMobile /> <ChatListItemMobile /> <ChatListItemMobile />{" "}
          <ChatListItemMobile /> <ChatListItemMobile /> <ChatListItemMobile />{" "}
          <ChatListItemMobile /> <ChatListItemMobile />
        </ChatList>
      </Background>
    </Container>
  );
}
