"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Chat } from "./Chat";
import { ChatList } from "./ChatList";
import { Container } from "./style";
import { usePathname } from "next/navigation";
import { IList } from "@/interfaces";
import { RealtimePresenceState } from "@supabase/supabase-js";

interface IViewContext {
  chatData: IList | null;
  setChatData: Dispatch<SetStateAction<IList | null>>;
}

interface IOnlineContext {
  onlineUsers: RealtimePresenceState | undefined;
}

export const chatContext = createContext<IViewContext>({} as IViewContext);

export const onlineContext = createContext<IOnlineContext>(
  {} as IOnlineContext
);

export function HomeDesktop({ user }: { user: User }) {
  const supabase = createClientComponentClient();
  const [chatData, setChatData] = useState<IList | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<RealtimePresenceState>();

  useEffect(() => {
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
  }, [supabase, user.id]);

  return (
    <onlineContext.Provider value={{ onlineUsers }}>
      <chatContext.Provider
        value={{
          chatData,
          setChatData,
        }}
      >
        <Container>
          <ChatList user={user} />
          <Chat user={user} />
        </Container>
      </chatContext.Provider>
    </onlineContext.Provider>
  );
}
