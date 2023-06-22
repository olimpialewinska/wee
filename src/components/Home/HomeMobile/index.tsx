"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import { ChatList } from "./ChatList";
import { Chat } from "../HomeDesktop/Chat";
import { usePathname } from "next/navigation";
import { IList } from "@/interfaces";
import { store } from "@/stores";
import { observer } from "mobx-react-lite";

export const HomeMobile = observer(() => {
  const supabase = createClientComponentClient();
  const [chat, setChat] = useState<IList | null>(null);
  const pathname = usePathname();
  const id = chat || pathname.split("/")[2];
  const isChat = !!id;

  useEffect(() => {
    const channel = supabase.channel("online-users", {
      config: {
        presence: {
          key: store.currentUserStore.currentUserStore.id!,
        },
      },
    });

    channel.on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
      },
      (payload: any) => {
        store.chatListStore.getList();
      }
    );
    channel.on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "messages",
      },
      (payload: any) => {
        store.chatListStore.getList();
      }
    );
    channel.on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "convs",
      },
      (payload: any) => {
        store.chatListStore.getList();
      }
    );

    channel.on("presence", { event: "sync" }, () => {
      store.onlineUsersStore.onlineUsers = channel.presenceState();
    });

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        const status = await channel.track({
          online_at: new Date().toISOString(),
        });
      }
    });
    return () => {
      channel.unsubscribe();
    };
  }, [supabase, store.currentUserStore.currentUserStore.id]);

  return (
    <>
      <ChatList />
      {isChat && <Chat isMobile />}
    </>
  );
});
