import { ModalProps } from "@/interfaces";
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
  TitleInput,
  Wrapper,
  CancelButton,
} from "./style";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { Nicknames } from "./Nicknames";
import { Colors } from "./Colors";
import { Files } from "./Files";
import { Images } from "./Images";
import { getNumberOfMessages } from "@/utils/chatSettings/countMessages";
import { store } from "@/stores";
import { changeGroupImage } from "@/utils/chatSettings/changeGroupImage";
import { Loader } from "@/components/Loader";
import { changeGroupName } from "@/utils/chatSettings/changeGroupName";

export function ChatSettingsModal(props: ModalProps) {
  const [contentType, setContentType] = useState<
    "nicknames" | "color" | "files" | "images"
  >("nicknames");

  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [name, setName] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [messagesCount, setMessagesCount] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const backgruoundImage =
    store.currentChatStore.currentChatStore?.otherMember.image !== null
      ? `url(${store.currentChatStore.currentChatStore?.otherMember.image})`
      : store.currentChatStore.currentChatStore?.isGroup === true
      ? `url(/groupDefault.png)`
      : "url(/default.png)";

  const countMessages = useCallback(async () => {
    setMessagesCount(
      await getNumberOfMessages(store.currentChatStore.currentChatStore?.convId)
    );
  }, [store.currentChatStore.currentChatStore?.convId]);

  useEffect(() => {
    countMessages();
    setContentType("nicknames");
    setName(store.currentChatStore.currentChatStore?.otherMember.name!);
  }, [
    countMessages,
    store.currentChatStore.currentChatStore?.otherMember.name,
    store.currentChatStore.currentChatStore?.convId,
  ]);

  const handleDivClick = () => {
    if (store.currentChatStore.currentChatStore?.isGroup === true) {
      inputRef.current?.click();
    }
  };

  const handleChangeGroupName = useCallback(async () => {
    if (name === store.currentChatStore.currentChatStore?.otherMember.name) {
      setEditingMode(false);
      return;
    }
    if (name!.length > 0) {
      const res = await changeGroupName(
        store.currentChatStore.currentChatStore?.convId,
        name!
      );
      if (res === false) return;
      store.currentChatStore.currentChatStore!.otherMember.name = name;
      setEditingMode(false);
    }
  }, [name, store.currentChatStore.currentChatStore?.convId]);

  const handleChangeGroupImage = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setImageLoading(true);
        const path = await changeGroupImage(
          store.currentChatStore.currentChatStore?.convId,
          file
        );

        if (path) {
          store.currentChatStore.currentChatStore!.otherMember.image = path;
        }
        setImageLoading(false);
      }
      return;
    },
    [store.currentChatStore.currentChatStore?.convId]
  );

  const onInputKeyUp = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleChangeGroupName();
      }
    },
    [handleChangeGroupName]
  );

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
        <Image
          style={{ backgroundImage: backgruoundImage }}
          onClick={handleDivClick}
        >
          {imageLoading && (
            <Loader
              color={
                store.currentChatStore.currentChatColor
                  ? store.currentChatStore.currentChatColor
                  : "red"
              }
            />
          )}

          {store.currentChatStore.currentChatStore?.isGroup === true ? (
            <input
              ref={inputRef}
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleChangeGroupImage(e);
              }}
            />
          ) : null}
        </Image>
        {editingMode === true ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 4,
              marginTop: 20,
            }}
          >
            <TitleInput
              type="text"
              value={name!}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              onBlur={(e) => handleChangeGroupName()}
              onKeyUp={onInputKeyUp}
            />
            <CancelButton
              onMouseDown={() => {
                setEditingMode(false);
              }}
            />
          </div>
        ) : (
          <Title
            onClick={() => {
              if (store.currentChatStore.currentChatStore?.isGroup === true) {
                setEditingMode(true);
              }
            }}
            style={{
              cursor:
                store.currentChatStore.currentChatStore?.isGroup === true
                  ? "pointer"
                  : "default",
            }}
          >
            {store.currentChatStore.currentChatStore?.otherMember.name}
          </Title>
        )}

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
              <Colors />
            ) : contentType === "images" ? (
              <Images />
            ) : (
              <Files />
            )}
          </Content>
        </Wrapper>
      </Container>
    </ModalBg>
  );
}
