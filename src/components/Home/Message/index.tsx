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
  Row,
  Nick,
} from "./style";
import { IMessage } from "@/interfaces";
import { useCallback, useState } from "react";
import { getFile } from "@/utils/chat/getFile";
import { ImageModal } from "../ImageModal";
import { MouseEvent } from "react";
import { deleteMessage } from "@/utils/chat/deleteMessage";
import { store } from "@/stores";
import { observer } from "mobx-react-lite";

interface MessageProps {
  message: IMessage;
  isSelf: boolean;
  color: string | null;
}

export const Message = observer((props: MessageProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const handleCloseImage = () => setShowImage(false);
  const handleShowImage = () => {
    setShowImage(true);
  };

  const handleDownload = useCallback(() => {
    window.open(getFile(props.message.value!), "_blank");
  }, [props.message.value]);

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

  if (props.message.type === "file") {
    return (
      <StyledMessage isSelf={props.isSelf}>
        {props.isSelf === false &&
          store.currentChatStore.currentChatStore?.isGroup === true && (
            <Nick>{props.message.senderNick!}</Nick>
          )}
        {isPopupOpen && (
          <Popup onMouseLeave={handleMouseLeave}>
            <Content
              onClick={() => {
                handleDelete(props.message.id!);
              }}
            >
              Delete Message
            </Content>
          </Popup>
        )}

        <Row isSelf={props.isSelf}>
          <MessageContent
            style={{
              backgroundColor: props.isSelf
                ? props.color
                  ? props.color
                  : ""
                : "",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              padding: 12,
            }}
            isSelf={props.isSelf}
            onContextMenu={(event) => {
              if (!props.isSelf) return;
              handleContextMenu(event);
            }}
          >
            <DownloadButton onClick={handleDownload} />

            {props.message.value!.split("()")[1]}
          </MessageContent>
          <MessageTime>{getTime(props.message.created_at)}</MessageTime>
        </Row>
      </StyledMessage>
    );
  }

  if (props.message.type === "image") {
    return (
      <StyledMessage isSelf={props.isSelf}>
        {props.isSelf === false &&
          store.currentChatStore.currentChatStore?.isGroup === true && (
            <Nick>{props.message.senderNick!}</Nick>
          )}
        {isPopupOpen && (
          <Popup onMouseLeave={handleMouseLeave}>
            <Content
              onClick={() => {
                handleDelete(props.message.id!);
              }}
            >
              Delete Message
            </Content>
          </Popup>
        )}
        <Row isSelf={props.isSelf}>
          <MessageImage
            onContextMenu={(event) => {
              if (!props.isSelf) return;
              handleContextMenu(event);
            }}
            style={{
              backgroundImage: `url("${getFile(props.message.value!)}")`,
            }}
            onClick={handleShowImage}
          />

          <MessageTime>{getTime(props.message.created_at)}</MessageTime>
        </Row>
        <ImageModal
          image={`url("${getFile(props.message.value!)}")`}
          visible={showImage}
          hide={handleCloseImage}
          fullScreen={true}
        />
      </StyledMessage>
    );
  }

  if (props.message.type === "deleted") {
    return (
      <StyledMessage isSelf={props.isSelf}>
        {props.isSelf === false &&
          store.currentChatStore.currentChatStore?.isGroup === true && (
            <Nick>{props.message.senderNick!}</Nick>
          )}
        <Row isSelf={props.isSelf}>
          <MessageContent
            style={{
              backgroundColor: "transparent",
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              color: "rgba(255, 255, 255, 0.5)",
            }}
            isSelf={props.isSelf}
          >
            Message has been deleted
          </MessageContent>
          <MessageTime>{getTime(props.message.created_at)}</MessageTime>
        </Row>
      </StyledMessage>
    );
  }
  return (
    <StyledMessage isSelf={props.isSelf}>
      {props.isSelf === false &&
        store.currentChatStore.currentChatStore?.isGroup === true && (
          <Nick>{props.message.senderNick!}</Nick>
        )}

      {isPopupOpen && (
        <Popup onMouseLeave={handleMouseLeave}>
          <Content
            onClick={() => {
              handleDelete(props.message.id!);
            }}
          >
            Delete Message
          </Content>
        </Popup>
      )}
      <Row isSelf={props.isSelf}>
        <MessageContent
          onContextMenu={(event) => {
            if (!props.isSelf) return;
            handleContextMenu(event);
          }}
          style={{
            backgroundColor: props.isSelf
              ? props.color
                ? props.color
                : ""
              : "",
          }}
          isSelf={props.isSelf}
        >
          {props.message.value}
        </MessageContent>
        <MessageTime>{getTime(props.message.created_at)}</MessageTime>
      </Row>
    </StyledMessage>
  );
});
