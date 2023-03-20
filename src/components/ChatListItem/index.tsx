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
  time: string | number | Date;
  image: string;
  onClick: () => void;
}

export function ChatListItem(props: ChatListItemProps) {
  //get hour and minutes from time
  const time = new Date(props.time);
  const hour = time.getHours();
  const minutes = time.getMinutes();

  return (
    <StyledChatListItem onClick={props.onClick}>
      <Avatar style={{ backgroundImage: `url(${props.image})` }} />
      <Info>
        <InfoName>{props.name}</InfoName>
        <Message>{props.message}</Message>
      </Info>
      <Time>
        {hour < 10 ? "0" + hour : hour}:{minutes < 10 ? "0" + minutes : minutes}
      </Time>
    </StyledChatListItem>
  );
}
