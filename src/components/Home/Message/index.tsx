import { getTime } from "@/utils/chatList/getChatList";
import { MessageContent, MessageTime, StyledMessage } from "./style";
import { IMessage } from "@/interfaces";

export function Message({
  message,
  isSelf,
  color,
}: {
  message: IMessage;
  isSelf: boolean;
  color: string | null;
}) {
  return (
    <StyledMessage isSelf={isSelf}>
      <MessageContent
        style={{
          backgroundColor: isSelf ? (color ? color : "") : "",
        }}
        isSelf={isSelf}
      >
        {message.value}
      </MessageContent>
      <MessageTime>{getTime(message.created_at)}</MessageTime>
    </StyledMessage>
  );
}
