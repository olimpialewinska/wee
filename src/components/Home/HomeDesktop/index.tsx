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

interface IViewContext {
  chatData: IList | null;
  setChatData: Dispatch<SetStateAction<IList | null>>;
}

export const chatContext = createContext<IViewContext>({} as IViewContext);

export function HomeDesktop({ user }: { user: User }) {
  const supabase = createClientComponentClient();
  const [chatData, setChatData] = useState<IList | null>(null);

  useEffect(() => {
    const channel = supabase.channel("online-users", {
      config: {
        presence: {
          key: user.id,
        },
      },
    });

    channel.on("presence", { event: "sync" }, () => {
      // console.log("Online users: ", channel.presenceState());
    });

    channel.on("presence", { event: "join" }, ({ newPresences }) => {
      // console.log("New users have joined: ", newPresences);
    });

    channel.on("presence", { event: "leave" }, ({ leftPresences }) => {
      // console.log("Users have left: ", leftPresences);
    });

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        const status = await channel.track({
          online_at: new Date().toISOString(),
        });
        // console.log(status);
      }
    });
  }, [supabase, user.id]);

  return (
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
  );
}
