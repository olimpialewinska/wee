import {
  StyledChatListItem,
  Avatar,
  Info,
  InfoName,
  Message,
  Time,
} from "./style";

interface ChatListItemProps {
  name: string | null;
  message: string | null | undefined;
  time: string;
  image: string;
  onClick: () => void;
}

export function ChatListItem(props: ChatListItemProps) {
  return (
    <StyledChatListItem>
      <Avatar style={{backgroundImage:
        `url(${props.image})`}}
      />
      <Info>
        <InfoName>{props.name}</InfoName>
        <Message>{props.message}</Message>
      </Info>
      <Time>{props.time}</Time>
    </StyledChatListItem>
  );
}
