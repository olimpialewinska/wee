import { Color, Colors, MessageContent, StyledMessage } from "./style";

interface MessageProps {
  message: string | null | undefined;
}

export function Announcement(props: MessageProps) {
  if (props.message?.includes("colors,")) {
    const color = props.message.split("colors,")[1].split(",")[0];
    const bgColor = props.message.split("colors,")[1].split(",")[1];

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
    const nickname = props.message.split("nickname,")[1].split(",")[0];
    const otherUsenNick = props.message.split("nickname,")[1].split(",")[1];

    return (
      <StyledMessage>
        <MessageContent>
          {otherUsenNick}`s username has been changed to {nickname}
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
