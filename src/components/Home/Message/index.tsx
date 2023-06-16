import { getTime } from "@/utils/chatList/getChatList";
import { MessageContent, MessageTime, StyledMessage } from "./style";
import { IMessage } from "@/interfaces";

export function Message({
  message,
  isSelf,
}: {
  message: IMessage;
  isSelf: boolean;
}) {
  return (
    <StyledMessage isSelf={isSelf}>
      <MessageContent isSelf={isSelf}>{message.value}</MessageContent>
      <MessageTime>{getTime(message.created_at)}</MessageTime>
    </StyledMessage>
  );
}
