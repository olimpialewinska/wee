import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";

const supabase = createClientComponentClient<Database>();

export function getFile(path: string) {
  const { data } = supabase.storage.from("chat").getPublicUrl(path);

  return data.publicUrl;
}
