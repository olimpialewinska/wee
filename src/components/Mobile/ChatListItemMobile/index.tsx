import { Avatar, Info, InfoName, Message, StyledChatListItem, Time } from "./style";

export function ChatListItemMobile() {
  return (
    <StyledChatListItem>
      <Avatar />
      <Info>
        <InfoName>Name</InfoName>
        <Message>Message</Message>
      </Info>
      <Time>10:30</Time>
    </StyledChatListItem>
  );
}
