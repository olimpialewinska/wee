import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";

const supabase = createClientComponentClient<Database>();

export async function addMessageToDB(
  text: string,
  convId: number | undefined,
  userId: string | null
) {
  if (!convId || !userId) {
    return;
  }

  const { data, error } = await supabase
    .from("messages")
    .insert([{ convId, senderId: userId, value: text }])
    .select("*");
  if (error) {
  }
  return data;
}
