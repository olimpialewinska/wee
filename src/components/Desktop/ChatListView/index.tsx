/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { Chat } from "@/components/Desktop/Chat";
import { ChatListItem } from "@/components/ChatListItem";
import {
  ChatHeader,
  ChatList,
  ChatHeaderIconsContainer,
  ChatHeaderInfo,
  ChatListSearch,
  Chats,
  ChatSearch,
  ChatSearchContainer,
  ChatSearchInput,
  Container,
  NewChat,
} from "./style";
import Link from "next/link";
import { Database } from "../../../types/supabase";
import { Key, useEffect, useRef, useState } from "react";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
import { Avatar } from "./Avatar";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import { Data } from "@/interfaces";
import { NewChatModal } from "../NewChatModal";
import { useRouter } from "next/router";

export function ChatListView({ session }: { session: Session }) {
  const router = useRouter();
  const chatId = Number(router.query.id as string);

  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<Profiles["username"]>(null);
  const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);
  const [conversationsWithProfiles, setConversationsWithProfiles] = useState<
    Data[]
  >([]);
  const [chat, setChat] = useState<Data>();
  const [show, setShow] = useState(false);
  const chatsWatcher = useRef<any>();

  useEffect(() => {
    getConversationsWithProfiles(chatId);
    setChat(conversationsWithProfiles.find((c) => c.id === chatId));
    getProfile();

    chatsWatcher.current?.unsubscribe();
    chatsWatcher.current = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "conversation" },
        async (payload) => {
          getConversationsWithProfiles(chatId);
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        async (payload) => {
          getConversationsWithProfiles(chatId);
        }
      )
      .subscribe();
  }, [chatId]);

  async function getConversationsWithProfiles(chatId: number) {
    const conversationsOfUser = await supabase
      .from("conv_members")
      .select("conversation_id")
      .eq("user_id", user?.id);

    if (!conversationsOfUser.data) {
      return;
    }

    const { data: conversations } = await supabase
      .from("conversation")
      .select("id, name, bg_color, color")
      .in(
        "id",
        conversationsOfUser.data.map((x) => x.conversation_id)
      );

    if (!conversations) {
      return;
    }

    const { data: messages } = await supabase
      .from("messages")
      .select("id, conversation_id, value, created_at, sender, receiver")
      .in(
        "conversation_id",
        conversations.map((c) => c.id)
      )
      .order("created_at", { ascending: false });

    if (!messages) {
      return;
    }

    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, avatar_url, username, full_name")
      .in(
        "id",
        messages
          ?.map((m) => (m.sender !== user?.id ? m.sender : m.receiver))
          .filter(Boolean)
      );

    if (!profiles) {
      return;
    }
    const data = conversations.map((conv) => {
      const lastMessage = messages.find((m) => m.conversation_id === conv.id);

    








      const otherUserId =
        lastMessage?.sender !== user?.id
          ? lastMessage?.sender
          : lastMessage?.receiver;


      const otherUserImage =
        profiles.find((p) => p.id === otherUserId)?.avatar_url ?? null;
      const image = process.env.NEXT_PUBLIC_SUPABASE_URL + "/" + otherUserImage;

      return {
        id: conv.id,
        name: conv.name,
        bgColor: conv.bg_color,
        color: conv.color,
        lastMessage: lastMessage
          ? {
              id: lastMessage.id,
              value: lastMessage.value,
              createdAt: lastMessage.created_at,
            }
          : null,
        otherUserId,
        otherUserImage:
          profiles.find((p) => p.id === otherUserId)?.avatar_url,
        otherUserName:
          profiles.find((p) => p.id === otherUserId)?.full_name ?? null,
        image,
      };
    });
    setConversationsWithProfiles(data.sort((a, b) => {
      if (!a.lastMessage || !b.lastMessage) {
        return 0;
      }
      return new Date(b.lastMessage.createdAt!).getTime() - new Date(a.lastMessage.createdAt!).getTime();
    }));
    setChat(data.find((c) => c.id === chatId));
  }

  async function getProfile() {
    try {
      if (!user) throw new Error("No user");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  return (
    <Container>
      <Chats>
        <ChatHeader>
          <Link href={"/profil"}>
            <Avatar url={avatar_url} />
          </Link>
          <ChatHeaderInfo>Chats</ChatHeaderInfo>
          <ChatHeaderIconsContainer>
            <NewChat onClick={handleShow} />
          </ChatHeaderIconsContainer>
        </ChatHeader>
        <ChatSearchContainer>
          <ChatSearch>
            <ChatListSearch />
            <ChatSearchInput placeholder="Search" />
          </ChatSearch>
        </ChatSearchContainer>
        <ChatList>
          {conversationsWithProfiles.map((chatListItem: Data, i) => (
            <ChatListItem
              key={i}
              name={chatListItem.name}
              time={chatListItem.lastMessage?.createdAt!}
              message={chatListItem.lastMessage?.value}
              image={chatListItem.otherUserImage}
              onClick={() => {
                router.push(`/Chats/${chatListItem.id}`);
              }}
            />
          ))}
        </ChatList>
      </Chats>
      {chat && (
        <Chat
          id={chat.id}
          name={chat.name}
          otherUserId={chat.otherUserId}
          bgColor={chat.bgColor}
          color={chat.color}
          image={chat.otherUserImage}
        />
      )}
      <NewChatModal visible={show} hide={handleClose} />
    </Container>
  );
}
