import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { ChatListView } from "@/components/Desktop/ChatListView";
import Login from "../login";

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();

  return <>{!session ? <Login /> : <ChatListView />}</>;
}
