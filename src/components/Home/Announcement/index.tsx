/* eslint-disable react/no-unescaped-entities */
import { Color, Colors, MessageContent, StyledMessage } from "./style";

interface MessageProps {
  message: string | null | undefined;
}

export function Announcement(props: MessageProps) {
  if (props.message?.includes("colors,")) {
    const [color, bgColor] = props.message.split("colors,")[1].split(",");

    return (
      <StyledMessage>
        <MessageContent>
          Colors have been changed
          <Colors>
            <Color style={{ backgroundColor: color }} />
            <Color style={{ backgroundColor: bgColor }} />
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
          {otherUserNick}'s username has been changed to {nickname}
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
