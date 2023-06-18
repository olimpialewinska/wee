import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";
import { addMessage } from "./changeUserNickname";

const supabase = createClientComponentClient<Database>();

export async function changeColor(
  type: "bgColor" | "messageColor",
  convId: number | undefined,
  color: string | null
) {
  const { data, error } = await supabase
    .from("convs")
    .update({ [type]: color })
    .eq("id", convId);

  if (error) {
    return false;
  }

  if (color === null) {
    await addMessage(
      convId,
      `${type === "bgColor" ? "Background" : "Message"} color reset to default`
    );
    return true;
  }
  await addMessage(convId, `colors,${type},${color}`);
  return true;
}
