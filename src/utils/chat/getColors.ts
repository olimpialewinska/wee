import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";

const supabase = createClientComponentClient<Database>();

export async function getChatColors(chatId: number) {
  const { data, error } = await supabase
    .from("convs")
    .select("bgColor, messageColor")
    .eq("id", chatId);

  if (error) {
    return null;
  }

  return data[0];
}
