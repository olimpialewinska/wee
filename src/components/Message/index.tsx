import { classNames } from "@/utils";
import { MessageContent, MessageTime, StyledMessage } from "./style";
import dateFormat from "dateformat";

interface MessageProps {
  message: string | null;
  time: string;
  isSelf: boolean;
  color: string;
}

export function Message(props: MessageProps) {
  if (props.isSelf) {
    return (
      <StyledMessage isSelf={props.isSelf}>
        <MessageContent
          isSelf={props.isSelf}
          style={{
            backgroundColor: props.color,
          }}
        >
          {props.message}
        </MessageContent>
        <MessageTime>{dateFormat(new Date(props.time))}</MessageTime>
      </StyledMessage>
    );
  } else {
    return (
      <StyledMessage isSelf={props.isSelf}>
        <MessageContent isSelf={props.isSelf}>{props.message}</MessageContent>
        <MessageTime>{dateFormat(new Date(props.time))}</MessageTime>
      </StyledMessage>
    );
  }
}
