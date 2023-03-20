import { classNames } from "@/utils";
import { MessageContent, MessageTime, StyledMessage } from "./style";
import dateFormat from "dateformat";

interface MessageProps {
  message: string | null;
  time: string;
  isSelf: boolean;
}

export function Message(props: MessageProps) {
  const date = new Date(props.time);
  return (
    <StyledMessage isSelf={props.isSelf}>
      <MessageContent isSelf={props.isSelf}>{props.message}</MessageContent>
      <MessageTime>{dateFormat(date)}</MessageTime>
    </StyledMessage>
  );
}
