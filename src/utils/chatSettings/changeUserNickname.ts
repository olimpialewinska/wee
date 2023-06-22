import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";
import { getName } from "../chatList/getChatList";

const supabase = createClientComponentClient<Database>();

export async function changeUserNickname(
  convId: number | undefined,
  userId: string | null,
  newNickname: string | null
) {
  const username = await getName(userId!);

  const { data, error } = await supabase
    .from("convMembers")
    .update({ nick: newNickname === "" ? null : newNickname })
    .eq("convId", convId)
    .eq("userId", userId);

  if (error) {
    return false;
  }

  if (newNickname) {
    await addMessage(convId, `nickname,${newNickname},${username} `);
    return newNickname;
  }

  const name = await getName(userId!);
  await addMessage(convId, `nickname,${name},${username}`);

  return name;
}

export async function addMessage(convId: number | undefined, message: string) {
  const { data, error } = await supabase
    .from("messages")
    .insert([{ convId: convId, value: message }]);

  if (error) {
    return false;
  }

  return true;
}
