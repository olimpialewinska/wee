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
import { useEffect, useState } from "react";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
import { Avatar } from "./Avatar";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";

export function ChatListView({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<Profiles["username"]>(null);
  const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);

  useEffect(() => {
    getProfile();
  }, [session]);

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
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Container>
      <Chats>
        <ChatHeader>
          <ChatHeaderInfo>Chats</ChatHeaderInfo>
          <ChatHeaderIconsContainer>
            <NewChat />
            <Link href={"/profil"}>
              <Avatar url={avatar_url} />
            </Link>
          </ChatHeaderIconsContainer>
        </ChatHeader>
        <ChatSearchContainer>
          <ChatSearch>
            <ChatListSearch />
            <ChatSearchInput placeholder="Search" />
          </ChatSearch>
        </ChatSearchContainer>
        <ChatList>
          {new Array(100).fill(0).map((chatListItem, i) => (
            <ChatListItem
              key={i}
              name={"aa"}
              time={"12:03"}
              message={"jxsnsdn"}
            />
          ))}
        </ChatList>
      </Chats>
      <Chat />
    </Container>
  );
}
