import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";

const supabase = createClientComponentClient<Database>();

export async function deleteMessage(messageId: number) {
  const { data, error } = await supabase
    .from("messages")
    .update({
      value: null,
      type: "deleted",
    })
    .eq("id", messageId)
    .select();

  if (error) {
    console.log(error);
    return null;
  }

  console.log(data);
  console.log("deleted");
  return true;
}
