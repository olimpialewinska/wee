"use client";
import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Chat } from "./Chat";
import { ChatList } from "./ChatList";
import { Container } from "./style";
import { observer } from "mobx-react-lite";
import { store } from "@/stores";

export const HomeDesktop = observer(function HomeDesktop() {
  const supabase = createClientComponentClient();

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
  }, [supabase, store.currentUserStore.currentUserStore.id!]);

  return (
    <Container>
      <ChatList />
      <Chat />
    </Container>
  );
});
