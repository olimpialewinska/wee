/* eslint-disable react/no-unescaped-entities */
import { Color, Colors, MessageContent, StyledMessage } from "./style";

interface MessageProps {
  message: string | null | undefined;
}

export function Announcement(props: MessageProps) {
  if (props.message?.includes("colors,")) {
    const [type, color] = props.message.split("colors,")[1].split(",");

    return (
      <StyledMessage>
        <MessageContent>
          {type === "bgColor"
            ? "Background color has been changed to"
            : "Message color has been changed to"}
          <Colors>
            <Color style={{ backgroundColor: color }} />
          </Colors>
        </MessageContent>
      </StyledMessage>
    );
  } else if (props.message?.includes("nickname,")) {
    const [nickname, otherUserNick] = props.message
      .split("nickname,")[1]
      .split(",");

    return (
      <StyledMessage>
        <MessageContent>
          {otherUserNick.trim()}'s username has been changed to {nickname}
        </MessageContent>
      </StyledMessage>
    );
  }

  return (
    <StyledMessage>
      <MessageContent>{props.message}</MessageContent>
    </StyledMessage>
  );
}
