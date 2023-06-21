/* eslint-disable jsx-a11y/alt-text */
"use client";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  ActivityStatus,
  Attachment,
  ChatInput,
  Container,
  Icon,
  Image,
  MessageContainer,
  MessageInput,
  Name,
  Navbar,
  Send,
  Error,
  StyledChat,
  Wrapper,
  FileRow,
} from "./style";
import { ChatSettingsModal } from "../../ChatSettingsModal";
import { ImageModal } from "../../ImageModal";
import { getMessages } from "@/utils/chat/getMessages";
import { Message } from "../../Message";
import { Announcement } from "../../Announcement";
import { addMessageToDB } from "@/utils/chat/sendMessage";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getChatColors } from "@/utils/chat/getColors";
import { store } from "@/stores";
import { observer } from "mobx-react-lite";
import { IMessage } from "@/interfaces";
import { sendFile } from "@/utils/chat/sendFile";
import { File } from "./File";
import { set } from "mobx";
import { Loader } from "@/components/Loader";

export const Chat = observer(() => {
  const supabase = createClientComponentClient();
  const [messageText, setMessageText] = useState<string>("");
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const [errorVisible, setErrorVisible] = useState(false);
  const [files, setFiles] = useState<File[] | null>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingFiles, setLoadingFiles] = useState<number>(0);

  const backgoundImage =
    store.currentChatStore.currentChatStore?.otherMember.image !== null
      ? `url(${store.currentChatStore.currentChatStore?.otherMember.image})`
      : store.currentChatStore.currentChatStore.isGroup === true
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
      if (selectedFile) {
        setFiles(Array.from(selectedFile));
      }
    },
    []
  );
  const errorFunction = useCallback((message: string) => {
    setErrorVisible(true);
    setError(message);
    setTimeout(() => {
      setErrorVisible(false);
    }, 3000);
  }, []);

  let shouldScrollDown = useRef(false);

  useLayoutEffect(() => {
    if (chatContentRef.current && shouldScrollDown.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  const getData = useCallback(
    async (rangeFrom: number, rangeTo: number) => {
      const data = await getMessages(
        store.currentChatStore.currentChatStore?.convId,
        rangeFrom,
        rangeTo
      );

      if (data && rangeFrom === 0 && rangeTo === 20) {
        shouldScrollDown.current = true;
        setMessages(data);
      }
      if (data && rangeFrom !== 0 && rangeTo !== 20) {
        shouldScrollDown.current = false;
        chatContentRef.current!.scrollTop = 1;
        setMessages((prev) => [...data, ...prev]);
      }
    },
    [store.currentChatStore.currentChatStore?.convId]
  );

  const getColors = useCallback(async () => {
    if (store.currentChatStore.currentChatStore === null) return;
    const colors = await getChatColors(
      store.currentChatStore.currentChatStore.convId
    );
    if (colors === null) return;
    store.currentChatStore.currentChatBgColor = colors.bgColor;
    store.currentChatStore.currentChatColor = colors.messageColor;
  }, [store.currentChatStore.currentChatStore?.convId]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const updateMessage = useCallback(
    (newMessage: IMessage) => {
      const newArray = (prev: IMessage[]) => {
        const index = prev.findIndex((message) => message.id === newMessage.id);
        if (index === -1) return prev;
        const newMessages = Array.from(prev);
        newMessages[index] = newMessage;
        return newMessages;
      };

      setMessages(newArray);
    },
    [setMessages]
  );

  useEffect(() => {
    getColors();
    getData(0, 20);
    const channel = supabase
      .channel(`chanel-${store.currentChatStore.currentChatStore?.convId}`, {
        config: {
          presence: {
            key: `${store.currentUserStore.currentUserStore?.id}`,
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
          ) {
            return;
          }

          if (
            (message.type === "image" || message.type === "file") &&
            message.senderId === store.currentUserStore.currentUserStore.id
          ) {
            setLoadingFiles((prev) => prev - 1);
          }

          setMessages((prev) => [...prev, message]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "messages",
        },
        (payload: any) => {
          shouldScrollDown.current = false;
          const message = payload.new as IMessage;
          if (
            message.convId !== store.currentChatStore.currentChatStore?.convId
          ) {
            return;
          }
          updateMessage(message);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "convs",
          filter: `id=eq.${store.currentChatStore.currentChatStore?.convId}`,
        },
        (payload: any) => {
          shouldScrollDown.current = true;
          const bgColor = payload.new.bgColor;
          const color = payload.new.messageColor;
          if (bgColor && color) {
            store.currentChatStore.currentChatBgColor = bgColor;
            store.currentChatStore.currentChatColor = color;
          }
        }
      );

    channel.subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [
    store.currentChatStore.currentChatStore,
    getColors,
    getData,
    supabase,
    store.currentUserStore.currentUserStore?.id,
    store.currentChatStore.currentChatBgColor,
    store.currentChatStore.currentChatColor,
    setLoadingFiles,
  ]);

  const sendMessage = useCallback(async () => {
    shouldScrollDown.current = true;

    if (files !== null) {
      files.forEach((file) => {
        if (file.size > 15728640) {
          errorFunction("File size should be less than 15mb");
          setFiles(null);
          return;
        }
      });

      const lengthOfValidFiles = files.filter(
        (file) => file.size <= 15728640
      ).length;
      setLoadingFiles(lengthOfValidFiles);

      const data = await sendFile(
        store.currentChatStore.currentChatStore?.convId,
        files,
        store.currentUserStore.currentUserStore.id
      );

      chatContentRef.current!.scrollTop = chatContentRef.current!.scrollHeight;

      if (!data) {
        errorFunction("Error sending file");
        setLoadingFiles(0);
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

  const onInputKeyUp = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    },
    [sendMessage]
  );

  return (
    <StyledChat
      style={{
        display:
          store.currentChatStore.currentChatStore === null ? "none" : "flex",
      }}
    >
      <Navbar
        style={{
          backgroundColor: store.currentChatStore.currentChatBgColor
            ? store.currentChatStore.currentChatBgColor
            : "rgb(100, 100, 100)",
        }}
      >
        <Icon
          style={{
            backgroundImage: `url(/left-arrow.svg)`,
          }}
          onClick={() => store.currentChatStore.setCurrentChat(null)}
        />
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

        <Icon
          style={{
            backgroundImage: `url(/settings.svg)`,
          }}
          onClick={handleShow}
        />
      </Navbar>
      <Container
        style={{
          backgroundColor: store.currentChatStore.currentChatBgColor
            ? store.currentChatStore.currentChatBgColor
            : "",
        }}
        ref={chatContentRef}
        onScroll={(e) => {
          if (e.currentTarget.scrollTop === 0) {
            shouldScrollDown.current = false;
            getData(messages.length, messages.length + 20);
          }
        }}
      >
        <Error
          style={{
            opacity: errorVisible ? 1 : 0,
            pointerEvents: errorVisible ? "inherit" : "none",
          }}
        >
          {error}
        </Error>
        {messages.map((message: IMessage) =>
          message.senderId ? (
            <Message
              key={message.id}
              message={message}
              isSelf={
                message.senderId === store.currentUserStore.currentUserStore?.id
              }
              color={store.currentChatStore.currentChatColor}
            />
          ) : (
            <Announcement key={message.id} message={message.value} />
          )
        )}
        {loadingFiles > 0 &&
          Array(loadingFiles).fill(
            <div style={{ alignSelf: "flex-end", margin: 10 }}>
              <Loader
                color={
                  store.currentChatStore.currentChatColor
                    ? store.currentChatStore.currentChatColor
                    : "rgb(0, 84, 56)"
                }
              />
            </div>
          )}
      </Container>
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
        <ChatInput
          style={{
            backgroundColor: store.currentChatStore.currentChatBgColor
              ? store.currentChatStore.currentChatBgColor
              : "rgb(100, 100, 100)",
          }}
        >
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
          <Send onClick={sendMessage} />
        </ChatInput>
      </div>
      <ImageModal
        visible={showImage}
        hide={handleCloseImage}
        image={backgoundImage}
      />
      <ChatSettingsModal visible={show} hide={handleClose} />
    </StyledChat>
  );
});
