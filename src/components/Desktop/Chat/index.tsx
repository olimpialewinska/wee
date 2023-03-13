import { Message } from "@/components/Message";
import Link from "next/link";
import {
  Attachment,
  ChatContent,
  ChatInput,
  Container,
  Emoji,
  Flex,
  Header,
  Icon,
  Info,
  Menu,
  MessageContainer,
  MessageInput,
  Name,
  Search,
  Send,
  Status,
} from "./style";

export function Chat() {
  return (
    <Container>
      <Header>
        <Icon />
        <Info>
          <Name>Name</Name>
          <Status>Aktywny</Status>
        </Info>
        <Flex />
        <Search />
        <Menu />
      </Header>
      <ChatContent>
        <Message isSelf message={"asdfadsfsasf"} time={""} />
        <Message message={"asdfafsasdf"} time={""} isSelf={false} />
        <Message isSelf message={"asgfdxvxxzcc"} time={""} />
        <Message message={"dgsdfrerraw"} time={""} isSelf={false} />
        <Message isSelf message={"asdfadsfsasf"} time={""} />
        <Message message={"asdfafsasdf"} time={""} isSelf={false} />
        <Message isSelf message={"asgfdxvxxzcc"} time={""} />
        <Message message={"dgsdfrerraw"} time={""} isSelf={false} />
        <Message isSelf message={"asdfadsfsasf"} time={""} />
        <Message message={"asdfafsasdf"} time={""} isSelf={false} />
        <Message isSelf message={"asgfdxvxxzcc"} time={""} />
        <Message message={"dgsdfrerraw"} time={""} isSelf={false} />
      </ChatContent>
      <ChatInput>
        <Attachment />
        <MessageContainer>
          <MessageInput placeholder="Type a message"/>
            <Emoji />
        </MessageContainer>
        <Send />
      </ChatInput>
    </Container>
  );
}
