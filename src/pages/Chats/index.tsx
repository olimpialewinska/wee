import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { ChatListView } from "@/components/Desktop/ChatListView";
import Login from "../login";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const channel = supabase.channel("test");

  return <>{!session ? <Login /> : <ChatListView />}</>;
}
