import { classNames } from "@/utils";
import { MessageContent, StyledMessage } from "./style";
import dateFormat from "dateformat";

interface MessageProps {
  message: string | null;
}

export function Announcement(props: MessageProps) {
  return (
    <StyledMessage>
      <MessageContent>{props.message}</MessageContent>
    </StyledMessage>
  );
}
