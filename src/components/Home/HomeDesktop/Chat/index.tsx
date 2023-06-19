/* eslint-disable jsx-a11y/alt-text */
import {
  Container,
  ActivityStatus,
  Attachment,
  ChatInput,
  Icon,
  MessageContainer,
  MessageInput,
  Name,
  Navbar,
  Send,
  Wrapper,
  Image,
  Bg,
  ChatContainer,
  Emoji,
  FileRow,
  Error,
} from "./style";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChatSettingsModal } from "../../ChatSettingsModal";
import { ImageModal } from "../../ImageModal";
import { IMessage } from "@/interfaces";
import { getMessages } from "@/utils/chat/getMessages";
import { Announcement } from "../../Announcement";
import { Message } from "../../Message";
import { addMessageToDB } from "@/utils/chat/sendMessage";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getChatColors } from "@/utils/chat/getColors";
import { store } from "@/stores";
import { observer } from "mobx-react-lite";
import { File } from "./File";
import { sendFile } from "@/utils/chat/sendFile";

export const Chat = observer(() => {
  const supabase = createClientComponentClient();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageText, setMessageText] = useState<string>("");
  const [files, setFiles] = useState<File[] | null>(null);
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };
  const [bg, setBg] = useState<string | null>("");
  const [color, setColor] = useState<string | null>("");
  const backgoundImage =
    store.currentChatStore.currentChatStore?.otherMember.image !== null
      ? `url(${store.currentChatStore.currentChatStore?.otherMember.image})`
      : store.currentChatStore.currentChatStore?.isGroup === true
      ? `url(/groupDefault.png)`
      : "url(/default.png)";

  const [showImage, setShowImage] = useState(false);
  const handleCloseImage = () => setShowImage(false);
  const handleShowImage = () => {
    setShowImage(true);
  };

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files;
      console.log(selectedFile);
      if (selectedFile) {
        setFiles(Array.from(selectedFile));
        console.log(Array.from(selectedFile));
      }
    },
    []
  );

  const getColors = useCallback(async () => {
    const colors = await getChatColors(
      store.currentChatStore.currentChatStore?.convId!
    );
    if (colors === null) return;
    setBg(colors.bgColor);
    setColor(colors.messageColor);
  }, [store.currentChatStore.currentChatStore?.convId]);

  const getData = useCallback(async () => {
    setMessages(
      await getMessages(store.currentChatStore.currentChatStore?.convId)
    );
  }, [store.currentChatStore.currentChatStore?.convId]);

  useEffect(() => {
    getColors();
    getData();

    const channel = supabase
      .channel(`chanel-${store.currentChatStore.currentChatStore?.convId}`, {
        config: {
          presence: {
            key: `${store.currentUserStore.currentUserStore.id}`,
          },
        },
      })
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload: any) => {
          const message = payload.new as IMessage;
          if (
            message.convId !== store.currentChatStore.currentChatStore?.convId
          )
            return;
          setMessages((prev) => [...prev, message]);
        }
      );

    channel.subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [
    getData,
    supabase,
    getColors,
    store.currentUserStore.currentUserStore.id,
    store.currentChatStore.currentChatStore?.convId,
  ]);

  const errorFunction = useCallback(
    (message: string) => {
      setError(message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    },
    [error]
  );

  const sendMessage = useCallback(async () => {
    if (files !== null) {
      files.map((file) => {
        if (file.size > 15728640) {
          errorFunction("File size should be less than 15mb");
          setFiles(null);
          return;
        }
      });
      const data = await sendFile(
        store.currentChatStore.currentChatStore?.convId,
        files,
        store.currentUserStore.currentUserStore.id
      );
      if (!data) {
        errorFunction("Error sending file");
      }
      setFiles(null);
    }

    if (messageText === "") return;
    const data = await addMessageToDB(
      messageText,
      store.currentChatStore.currentChatStore?.convId,
      store.currentUserStore.currentUserStore.id
    );
    setMessageText("");
  }, [
    store.currentChatStore.currentChatStore?.convId,
    messageText,
    store.currentUserStore.currentUserStore.id,
    files,
    errorFunction,
  ]);

  const onInputKeyUp = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    },
    [sendMessage]
  );

  const deleteFile = useCallback((file: File) => {
    setFiles((prev) => {
      if (prev === null) return null;
      const newFiles = Array.from(prev);
      const index = newFiles.indexOf(file);
      if (index > -1) {
        newFiles.splice(index, 1);
      }
      return newFiles.length === 0 ? null : newFiles;
    });
  }, []);

  return (
    <Container>
      <Bg>
        <Navbar>
          <Image
            onClick={handleShowImage}
            style={{
              backgroundImage: backgoundImage,
              border:
                store.onlineUsersStore.checkOnline(
                  store.currentChatStore.currentChatStore?.otherMember.userId
                ) === true
                  ? "2px solid #00ff00"
                  : "",
            }}
          />

          <Wrapper>
            <Name>
              {store.currentChatStore.currentChatStore?.otherMember.name}
            </Name>
            <ActivityStatus>
              {store.onlineUsersStore.checkOnline(
                store.currentChatStore.currentChatStore?.otherMember.userId
              )
                ? "Online"
                : "Offline"}
            </ActivityStatus>
          </Wrapper>
          {error !== null ? <Error>{error}</Error> : <></>}

          <Icon
            style={{
              backgroundImage: `url(/settings.svg)`,
            }}
            onClick={handleShow}
          />
        </Navbar>
        <ChatContainer style={{ backgroundColor: bg ? bg : "transparent" }}>
          {messages.map((message: IMessage) =>
            message.senderId ? (
              <Message
                key={message.id}
                message={message}
                isSelf={
                  message.senderId ===
                  store.currentUserStore.currentUserStore.id
                }
                color={color}
              />
            ) : (
              <Announcement key={message.id} message={message.value} />
            )
          )}
        </ChatContainer>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <FileRow>
            {files
              ? Array.from(files).map((file) => {
                  return (
                    <File key={file.name} file={file} deleteFile={deleteFile} />
                  );
                })
              : ""}
          </FileRow>
          <ChatInput>
            <Attachment onClick={handleDivClick}>
              <input
                type="file"
                ref={fileInputRef}
                multiple={true}
                onChange={(e) => handleFileChange(e)}
                style={{ display: "none" }}
              />
            </Attachment>
            <MessageContainer>
              <MessageInput
                placeholder="Type a message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyUp={onInputKeyUp}
              />
            </MessageContainer>
            <Emoji />
            <Send onClick={sendMessage} />
          </ChatInput>
        </div>
      </Bg>
      <ImageModal
        visible={showImage}
        hide={handleCloseImage}
        image={backgoundImage}
      />
      <ChatSettingsModal visible={show} hide={handleClose} />
    </Container>
  );
});
