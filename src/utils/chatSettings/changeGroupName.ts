import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";
import { addMessage } from "./changeUserNickname";

const supabase = createClientComponentClient<Database>();

export async function changeGroupName(id: number | undefined, name: string) {
  const { data, error } = await supabase
    .from("groupDetails")
    .update({ name })
    .eq("convId", id);

  if (error) {
    return false;
  }

  await addMessage(id, `Group name changed to ${name}`);
  return true;
}
