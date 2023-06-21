import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";

const supabase = createClientComponentClient<Database>();

export const getMessages = async (
  convId: number | undefined,
  rangeFrom: number,
  rangeTo: number
) => {
  if (!convId) {
    return [];
  }
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("convId", convId)
    .range(rangeFrom, rangeTo)
    .order("id", { ascending: false })
    .limit(20);

  if (error) {
    return [];
  }

  return data.reverse();
};
