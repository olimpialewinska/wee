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
import {
  createContext,
  Key,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
import { RealtimePresenceState } from "@supabase/supabase-js";

const onlineContext = createContext(null);

type DialogType = false | "group-new-chat" | "new-chat";

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
  const [search, setSearch] = useState<string>("");
  const [dialogType, setDialogType] = useState<DialogType>(false);
  const [online, setOnline] = useState<RealtimePresenceState>({});

  useEffect(() => {
    getConversationsWithProfiles(chatId);
    setChat(conversationsWithProfiles.find((c) => c.id === chatId));
    getProfile();

    const chatsWatcher = supabase
      .channel("custom-all-channel", {
        config: {
          presence: {
            key: `${user?.id}`,
          },
        },
      })
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
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          const status = await chatsWatcher.track({
            online_at: new Date().toISOString(),
          });
        }
      });

    chatsWatcher.on("presence", { event: "sync" }, () => {
      setOnline(chatsWatcher.presenceState());
    });
  }, [chatId]);

  function checkPresence(userId: string | null | undefined) {
    const otherUserPresence = online[`${userId}`];
    if (otherUserPresence) {
      return "Online";
    }
    return "Offline";
  }

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
      .select("id, name, bg_color, color, isGroup")
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

    const { data: otherMember } = await supabase
      .from("conv_members")
      .select("conversation_id, user_id, user_name")
      .in(
        "conversation_id",
        conversations.map((c) => c.id)
      )
      .neq("user_id", user?.id);

    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, avatar_url, username, full_name")
      .in("id", otherMember?.map((m) => m.user_id) ?? []);

    if (!profiles) {
      return;
    }
    const data = conversations.map((conv) => {
      const lastMessage = messages.find((m) => m.conversation_id === conv.id);

      const otherUserId = otherMember!.find(
        (m) => m.conversation_id === conv.id
      )?.user_id;

      const otherUserName =
        otherMember!.find((m) => m.conversation_id === conv.id)?.user_name ??
        null;

      return {
        id: conv.id,
        name: conv.name,
        isGroup: conv.isGroup,
        bgColor: conv.bg_color,
        color: conv.color,
        lastMessage: lastMessage
          ? {
              id: lastMessage.id,
              value:
                lastMessage.sender == user?.id
                  ? "You: " + lastMessage.value
                  : lastMessage.sender == null
                  ? messageValue(lastMessage.value!.toString())
                  : lastMessage.value,
              createdAt: lastMessage.created_at,
              sender: lastMessage.sender,
              receiver: lastMessage.receiver,
            }
          : null,
        otherUserId: otherUserId ?? null,
        otherUserImage: downloadImage(
          profiles.find((p) => p.id === otherUserId)?.avatar_url ?? null
        ),
        otherUserName: otherUserName ?? user?.user_metadata.username,
      };
    });
    setConversationsWithProfiles(
      data.sort((a, b) => {
        if (!a.lastMessage || !b.lastMessage) {
          return 0;
        }
        return (
          new Date(b.lastMessage.createdAt!).getTime() -
          new Date(a.lastMessage.createdAt!).getTime()
        );
      })
    );
    setChat(data.find((c) => c.id === chatId));
  }

  function messageValue(value: string) {
    if (value.includes("colors,")) {
      return "Chat color changes";
    } else if (value.includes("nickname,")) {
      return "Nickname changes";
    }

    return "Start chat conversation";
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

  function downloadImage(url: string | null | undefined) {
    if (!url) {
      return null;
    }
    const image = supabase.storage.from("avatars").getPublicUrl(`${url}`);
    return image["data"].publicUrl.toString();
  }

  const handleClose = () => setDialogType(false);
  const createHandleShow = useCallback((type: DialogType) => {
    return () => {
      setDialogType(type);
    }
  }, [setDialogType]);

  const filteredList = conversationsWithProfiles.filter(
    (item) =>
      item.otherUserName &&
      item.otherUserName!.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Chats>
        <ChatHeader>
          <Link href={"/profil"}>
            <Avatar url={avatar_url} />
          </Link>
          <ChatHeaderInfo>Chats</ChatHeaderInfo>
          <ChatHeaderIconsContainer>
            <NewChat onClick={createHandleShow("new-chat")} />
            <NewChat 
            style={{backgroundImage: "url('/add-people.svg')",
          }}
          onClick={createHandleShow("group-new-chat")}
            />
          </ChatHeaderIconsContainer>
        </ChatHeader>
        <ChatSearchContainer>
          <ChatSearch>
            <ChatListSearch />
            <ChatSearchInput
              placeholder="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
            />
          </ChatSearch>
        </ChatSearchContainer>
        <ChatList>
          {filteredList.map((chatListItem: Data, i) => (
            <ChatListItem
              key={i}
              name={
                chatListItem.isGroup
                  ? chatListItem.name
                  : chatListItem.otherUserName
              }
              time={chatListItem.lastMessage?.createdAt!}
              message={chatListItem.lastMessage?.value}
              image={chatListItem.otherUserImage}
              presence={checkPresence(chatListItem.otherUserId)}
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
          name={chat.isGroup ? chat.name : chat.otherUserName}
          otherUserId={chat.otherUserId}
          bgColor={chat.bgColor}
          color={chat.color}
          image={chat.otherUserImage}
          presence={checkPresence(chat.otherUserId)}
        />
      )}
      <NewChatModal visible={dialogType !== false} hide={handleClose} type={dialogType}/>
    </Container>
  );
}
