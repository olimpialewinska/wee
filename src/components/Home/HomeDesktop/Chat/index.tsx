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

import {
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ChatSettingsModal } from "../../ChatSettingsModal";
import { ImageModal } from "../../ImageModal";
import { IMessage } from "@/interfaces";
import { getMessages, getUserNick } from "@/utils/chat/getMessages";
import { Announcement } from "../../Announcement";
import { Message } from "../../Message";
import { addMessageToDB } from "@/utils/chat/sendMessage";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getChatColors } from "@/utils/chat/getColors";
import { store } from "@/stores";
import { observer } from "mobx-react-lite";
import { File } from "./File";
import { sendFile } from "@/utils/chat/sendFile";
import { Loader } from "@/components/Loader";
import { EmojiPopUp } from "../Emoji";

interface contextInterface {
  messageText: string;
  setMessageText: (c: string) => void;
}

export const messageContext = createContext<contextInterface>({
  messageText: "",
  setMessageText: () => {},
});

export const Chat = observer(({ isMobile }: { isMobile: boolean }) => {
  const supabase = createClientComponentClient();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageText, setMessageText] = useState<string>("");
  const [files, setFiles] = useState<File[] | null>(null);
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorVisible, setErrorVisible] = useState(false);
  const [image, setImage] = useState<string>("url(/default.png)");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const [showEmoji, setShowEmoji] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const [showImage, setShowImage] = useState(false);
  const handleCloseImage = () => setShowImage(false);
  const handleShowImage = () => {
    setShowImage(true);
  };

  const getChatImage = useCallback(() => {
    const backgoundImage =
      store.currentChatStore.currentChatStore?.otherMember.image !== null
        ? `url(${store.currentChatStore.currentChatStore?.otherMember.image})`
        : store.currentChatStore.currentChatStore?.isGroup === true
        ? `url(/groupDefault.png)`
        : "url(/default.png)";

    setImage(backgoundImage);
  }, [store.currentChatStore.currentChatStore?.otherMember.image]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files;
      if (selectedFile) {
        setFiles(Array.from(selectedFile));
      }
    },
    []
  );
  let shouldScrollDown = useRef(false);

  useLayoutEffect(() => {
    if (chatContentRef.current && shouldScrollDown.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  const updateMessage = useCallback((newMessage: IMessage) => {
    const newArray = (prev: IMessage[]) => {
      const index = prev.findIndex((message) => message.id === newMessage.id);
      if (index === -1) return prev;
      const newMessages = Array.from(prev);
      newMessages[index] = newMessage;
      return newMessages;
    };

    setMessages(newArray);
  }, []);
  const handleCloseEmoji = () => setShowEmoji(false);
  const handleShowEmoji = () => {
    setShowEmoji(true);
  };

  const getColors = useCallback(async () => {
    const colors = await getChatColors(
      store.currentChatStore.currentChatStore?.convId!
    );
    if (colors === null) return;
    store.currentChatStore.currentChatBgColor = colors.bgColor;
    store.currentChatStore.currentChatColor = colors.messageColor;
  }, [store.currentChatStore.currentChatStore?.convId]);

  const waitingForInitialData = useRef(-1);

  const getData = useCallback(
    async (rangeFrom: number, rangeTo: number) => {
      if (!store.currentChatStore.currentChatStore) return;

      const { convId } = store.currentChatStore.currentChatStore;

      if (rangeFrom === 0) {
        if (waitingForInitialData.current === convId) return;
        waitingForInitialData.current = convId;
        setMessages([]);
      }

      const data = await getMessages(convId, rangeFrom, rangeTo);

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

  useEffect(() => {
    getData(0, 20);
    setMessageText("");
    getColors();
    setLoadingFiles(0);
    getChatImage();

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
          ) {
            return;
          }

          if (
            (message.type === "image" || message.type === "file") &&
            message.senderId === store.currentUserStore.currentUserStore.id
          ) {
            setLoadingFiles((prev) => prev - 1);
          }
          (async () => {
            if (store.currentChatStore.currentChatStore?.isGroup === true) {
              if (message.senderId !== null) {
                const nick = await getUserNick(
                  store.currentChatStore.currentChatStore?.convId,
                  message.senderId!
                );
                message.senderNick = nick;
              }
            }

            setMessages((prev) => [...prev, message]);
          })();
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
    getColors,
    getData,
    supabase,
    updateMessage,
    store.currentUserStore.currentUserStore.id,
    store.currentChatStore.currentChatStore,
    setLoadingFiles,
  ]);

  const errorFunction = useCallback((message: string) => {
    setErrorVisible(true);
    setError(message);
    setTimeout(() => {
      setErrorVisible(false);
    }, 3000);
  }, []);

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
  }, [store.currentChatStore.currentChatStore?.convId, messageText, files]);

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

  const handleChatClose = useCallback(() => {
    store.currentChatStore.setCurrentChat(null);
    setMessages([]);
    setMessageText("");
    store.currentChatStore.currentChatBgColor = null;
    store.currentChatStore.currentChatBgColor = null;
    waitingForInitialData.current = -1;
  }, []);

  return (
    <Container isMobile={isMobile}>
      <Bg isMobile={isMobile}>
        <Navbar
          style={{
            backgroundColor: store.currentChatStore.currentChatBgColor
              ? store.currentChatStore.currentChatBgColor
              : "rgb(42, 42, 42)",
          }}
        >
          {isMobile && (
            <Icon
              style={{
                backgroundImage: `url(/left-arrow.svg)`,
              }}
              onClick={handleChatClose}
            />
          )}
          <Image
            onClick={handleShowImage}
            style={{
              backgroundImage: image,
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
        <ChatContainer
          style={{
            backgroundColor: store.currentChatStore.currentChatBgColor
              ? store.currentChatStore.currentChatBgColor
              : "transparent",
          }}
          ref={chatContentRef}
          onScroll={(e) => {
            if (e.currentTarget.scrollTop === 0) {
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
                  message.senderId ===
                  store.currentUserStore.currentUserStore.id
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
          <ChatInput
            isMobile={isMobile}
            style={{
              backgroundColor: store.currentChatStore.currentChatBgColor
                ? store.currentChatStore.currentChatBgColor
                : "rgb(42, 42, 42)",
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
            <Emoji onClick={handleShowEmoji} />
            <Send onClick={sendMessage} />
          </ChatInput>
        </div>
      </Bg>
      <ImageModal visible={showImage} hide={handleCloseImage} image={image} />
      <ChatSettingsModal visible={show} hide={handleClose} />
      <messageContext.Provider value={{ messageText, setMessageText }}>
        <EmojiPopUp visible={showEmoji} hide={handleCloseEmoji} />
      </messageContext.Provider>
    </Container>
  );
});
