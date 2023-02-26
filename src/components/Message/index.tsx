import { classNames } from "@/utils";
import { MessageContent, MessageTime, StyledMessage } from "./style";

interface MessageProps {
  message: string;
  time: string;
  isSelf: boolean;
}

export function Message(props: MessageProps) {
  return (
    <StyledMessage isSelf={props.isSelf}>
      <MessageContent isSelf={props.isSelf}>{props.message}</MessageContent>
      <MessageTime>Time</MessageTime>
    </StyledMessage>
  );
}
