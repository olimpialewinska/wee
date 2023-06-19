import { getTime } from "@/utils/chatList/getChatList";
import {
  MessageContent,
  MessageTime,
  StyledMessage,
  DownloadButton,
  MessageImage,
} from "./style";
import { IMessage } from "@/interfaces";
import { useCallback } from "react";
import { getFile } from "@/utils/chat/getFile";

export function Message({
  message,
  isSelf,
  color,
}: {
  message: IMessage;
  isSelf: boolean;
  color: string | null;
}) {
  const handleDownload = useCallback(() => {
    window.open(getFile(message.value!), "_blank");
  }, [message.value]);

  if (message.type === "file") {
    return (
      <StyledMessage isSelf={isSelf}>
        <MessageContent
          style={{
            backgroundColor: isSelf ? (color ? color : "") : "",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 12,
          }}
          isSelf={isSelf}
        >
          <DownloadButton onClick={handleDownload} />
          {message.value!.split("()")[1]}
        </MessageContent>
        <MessageTime>{getTime(message.created_at)}</MessageTime>
      </StyledMessage>
    );
  }

  if (message.type === "image") {
    return (
      <StyledMessage isSelf={isSelf}>
        <MessageImage
          style={{
            backgroundImage: `url("${getFile(message.value!)}")`,
          }}
        />
        <MessageTime>{getTime(message.created_at)}</MessageTime>
      </StyledMessage>
    );
  }
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
