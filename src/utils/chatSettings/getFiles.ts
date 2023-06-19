import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";

const supabase = createClientComponentClient<Database>();

export async function getFiles(convId: number | undefined) {
  if (convId) {
    const { data, error } = await supabase
      .from("messages")
      .select("value")
      .eq("convId", convId)
      .eq("type", "file");

    if (error) {
      return null;
    }

    return data;
  }
}
