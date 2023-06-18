import { IList, ModalProps } from "@/interfaces";
import {
  Close,
  Container,
  Content,
  Image,
  MessagesCount,
  ModalBg,
  Row,
  Selector,
  Title,
  Wrapper,
} from "./style";
import { useCallback, useEffect, useState } from "react";
import { Nicknames } from "./Nicknames";
import { Colors } from "./Colors";
import { Files } from "./Files";
import { Images } from "./Images";
import { getNumberOfMessages } from "@/utils/chatSettings/countMessages";

interface ChatSettingsModalProps extends ModalProps {
  chat: IList | null;
}

export function ChatSettingsModal(props: ChatSettingsModalProps) {
  const [contentType, setContentType] = useState<
    "nicknames" | "color" | "files" | "images"
  >("nicknames");
  const [messagesCount, setMessagesCount] = useState<number>(0);
  const backgruoundImage =
    props.chat?.otherMember.image !== null
      ? `url(${props.chat?.otherMember.image})`
      : props.chat.isGroup === true
      ? `url(/groupDefault.png)`
      : "url(/default.png)";

  const countMessages = useCallback(async () => {
    setMessagesCount(await getNumberOfMessages(props.chat?.convId));
  }, [props.chat?.convId]);

  useEffect(() => {
    countMessages();
  }, [countMessages]);

  return (
    <ModalBg
      style={{
        opacity: props.visible ? 1 : 0,
        pointerEvents: props.visible ? "inherit" : "none",
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          props.hide();
        }
      }}
    >
      <Container>
        <Close
          onClick={() => {
            props.hide();
          }}
        />
        <Image style={{ backgroundImage: backgruoundImage }} />
        <Title>{props.chat?.otherMember.name}</Title>
        <MessagesCount>
          There are {messagesCount} messages in this conversation
        </MessagesCount>
        <Wrapper>
          <Row>
            <Selector
              style={{
                backgroundColor:
                  contentType === "nicknames"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "transparent",
              }}
              onClick={() => setContentType("nicknames")}
            >
              Nicknames
            </Selector>
            <Selector
              style={{
                backgroundColor:
                  contentType === "color"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "transparent",
              }}
              onClick={() => setContentType("color")}
            >
              Color
            </Selector>
            <Selector
              style={{
                backgroundColor:
                  contentType === "images"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "transparent",
              }}
              onClick={() => setContentType("images")}
            >
              Images
            </Selector>
            <Selector
              style={{
                backgroundColor:
                  contentType === "files"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "transparent",
              }}
              onClick={() => setContentType("files")}
            >
              Files
            </Selector>
          </Row>
          <Content>
            {contentType === "nicknames" ? (
              <Nicknames />
            ) : contentType === "color" ? (
              <Colors convId={props.chat?.convId} />
            ) : contentType === "images" ? (
              <Images convId={props.chat?.convId} />
            ) : (
              <Files convId={props.chat?.convId} />
            )}
          </Content>
        </Wrapper>
      </Container>
    </ModalBg>
  );
}
