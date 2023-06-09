"use client";
import { User } from "@supabase/auth-helpers-nextjs";
import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
} from "react";
import { ChatList } from "./ChatList";
import { Chat } from "./Chat";
import { usePathname } from "next/navigation";
import { IList } from "@/interfaces";
import { getData } from "@/utils/chatList/getChatList";

interface IViewContext {
  chat: IList | null;
  setChat: Dispatch<IList | null>;
}

export const viewContext = createContext<IViewContext>({} as IViewContext);

export function HomeMobile({ user }: { user: User }) {
  const [chat, setChat] = useState<IList | null>(null);
  const [chatList, setChatList] = useState<IList[]>([]);
  const pathname = usePathname();
  const id = chat || pathname.split("/")[2];
  const isChat = !!id;

  const getChats = useCallback(async () => {
    setChatList(await getData(user.id));
  }, [user.id]);

  useEffect(() => {
    getChats();
  }, [chatList, getChats]);

  return (
    <viewContext.Provider value={{ chat, setChat }}>
      <ChatList user={user} />
      {isChat && <Chat chat={chat} />}
    </viewContext.Provider>
  );
}
