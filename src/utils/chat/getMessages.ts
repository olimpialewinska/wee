import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";

const supabase = createClientComponentClient<Database>();

const getMessages = async (convId: number) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("convId", convId)
    .order("created_at", { ascending: true });

  if (error) {
    return [];
  }

  return data;
};
