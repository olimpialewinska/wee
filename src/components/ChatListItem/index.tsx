import {
  StyledChatListItem,
  Avatar,
  Info,
  InfoName,
  Message,
  Time,
} from "./style";

interface ChatListItemProps {
  name: string;
  message: string;
  time: string;
}

export function ChatListItem(props: ChatListItemProps) {
  return (
    <StyledChatListItem>
      <Avatar />
      <Info>
        <InfoName>{props.name}</InfoName>
        <Message>{props.message}</Message>
      </Info>
      <Time>{props.time}</Time>
    </StyledChatListItem>
  );
}
