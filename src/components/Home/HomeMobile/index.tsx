"use client";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
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
import { RealtimePresenceState } from "@supabase/supabase-js";

interface IViewContext {
  chat: IList | null;
  setChat: Dispatch<IList | null>;
}

export const viewContext = createContext<IViewContext>({} as IViewContext);
interface IOnlineContext {
  onlineUsers: RealtimePresenceState | undefined;
}

export const onlineContext = createContext<IOnlineContext>(
  {} as IOnlineContext
);

export function HomeMobile({ user }: { user: User }) {
  const supabase = createClientComponentClient();
  const [chat, setChat] = useState<IList | null>(null);
  const [chatList, setChatList] = useState<IList[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<RealtimePresenceState>();
  const pathname = usePathname();
  const id = chat || pathname.split("/")[2];
  const isChat = !!id;

  const getChats = useCallback(async () => {
    setChatList(await getData(user.id));
  }, [user.id]);

  useEffect(() => {
    getChats();
    const channel = supabase.channel("online-users", {
      config: {
        presence: {
          key: user.id,
        },
      },
    });

    channel.on("presence", { event: "sync" }, () => {
      console.log("Online users: ", channel.presenceState());
      const onlineUsers = channel.presenceState();
      setOnlineUsers(onlineUsers);
    });

    channel.on("presence", { event: "join" }, ({ newPresences }) => {
      const onlineUsers = channel.presenceState();
      setOnlineUsers(onlineUsers);
    });

    channel.on("presence", { event: "leave" }, ({ leftPresences }) => {
      const onlineUsers = channel.presenceState();
      setOnlineUsers(onlineUsers);
    });

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        const status = await channel.track({
          online_at: new Date().toISOString(),
        });
        // console.log(status);
      }
    });
    return () => {
      channel.unsubscribe();
    };
  }, [getChats, supabase, user.id]);

  return (
    <onlineContext.Provider value={{ onlineUsers }}>
      <viewContext.Provider value={{ chat, setChat }}>
        <ChatList user={user} />
        {isChat && <Chat chat={chat} user={user} />}
      </viewContext.Provider>
    </onlineContext.Provider>
  );
}
