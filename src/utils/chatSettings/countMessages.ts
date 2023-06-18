import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";

const supabase = createClientComponentClient<Database>();

export async function getNumberOfMessages(convId: number | undefined) {
  const { data, error } = await supabase
    .from("messages")
    .select("id", { count: "exact" })
    .eq("convId", convId);

  if (error) {
    return 0;
  }

  return data["length"] as number;
}
