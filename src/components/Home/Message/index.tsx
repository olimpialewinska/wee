"use client";
import { getTime } from "@/utils/chatList/getChatList";
import {
  MessageContent,
  MessageTime,
  StyledMessage,
  DownloadButton,
  MessageImage,
  Popup,
  Content,
} from "./style";
import { IMessage } from "@/interfaces";
import { useCallback, useState } from "react";
import { getFile } from "@/utils/chat/getFile";
import { ImageModal } from "../ImageModal";
import { MouseEvent } from "react";
import { deleteMessage } from "@/utils/chat/deleteMessage";

export function Message({
  message,
  isSelf,
  color,
}: {
  message: IMessage;
  isSelf: boolean;
  color: string | null;
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const handleCloseImage = () => setShowImage(false);
  const handleShowImage = () => {
    setShowImage(true);
  };

  const handleDownload = useCallback(() => {
    window.open(getFile(message.value!), "_blank");
  }, [message.value]);

  const handleContextMenu = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsPopupOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    await deleteMessage(id);
  }, []);

  if (message.type === "file") {
    return (
      <StyledMessage isSelf={isSelf}>
        {isPopupOpen && (
          <Popup onMouseLeave={handleMouseLeave}>
            <Content
              onClick={() => {
                handleDelete(message.id!);
              }}
            >
              Delete Message
            </Content>
          </Popup>
        )}
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
          onContextMenu={(event) => {
            if (!isSelf) return;
            handleContextMenu(event);
          }}
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
        {isPopupOpen && (
          <Popup onMouseLeave={handleMouseLeave}>
            <Content
              onClick={() => {
                handleDelete(message.id!);
              }}
            >
              Delete Message
            </Content>
          </Popup>
        )}
        <MessageImage
          onContextMenu={(event) => {
            if (!isSelf) return;
            handleContextMenu(event);
          }}
          style={{
            backgroundImage: `url("${getFile(message.value!)}")`,
          }}
          onClick={handleShowImage}
        />

        <MessageTime>{getTime(message.created_at)}</MessageTime>
        <ImageModal
          image={`url("${getFile(message.value!)}")`}
          visible={showImage}
          hide={handleCloseImage}
          fullScreen={true}
        />
      </StyledMessage>
    );
  }

  if (message.type === "deleted") {
    return (
      <StyledMessage isSelf={isSelf}>
        <MessageContent
          style={{
            backgroundColor: isSelf ? (color ? color : "") : "",
            borderRadius: "10px",
            border: "2px solid #7a7a7a",
            color: "#7a7a7a",
          }}
          isSelf={isSelf}
        >
          Message has been deleted
        </MessageContent>
        <MessageTime>{getTime(message.created_at)}</MessageTime>
      </StyledMessage>
    );
  }
  return (
    <StyledMessage isSelf={isSelf}>
      {isPopupOpen && (
        <Popup onMouseLeave={handleMouseLeave}>
          <Content
            onClick={() => {
              handleDelete(message.id!);
            }}
          >
            Delete Message
          </Content>
        </Popup>
      )}
      <MessageContent
        onContextMenu={(event) => {
          if (!isSelf) return;
          handleContextMenu(event);
        }}
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
