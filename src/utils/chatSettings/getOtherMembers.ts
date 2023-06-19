import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";
import { getImage, getName } from "../chatList/getChatList";
import { IUser } from "@/interfaces";

const supabase = createClientComponentClient<Database>();

export async function getConvMembers(convId: number | undefined) {
  if (!convId) {
    return [];
  }
  const { data, error } = await supabase
    .from("convMembers")
    .select("*")
    .eq("convId", convId);

  if (error) {
    return [];
  }

  const members = await Promise.all(
    data.map(async (member) => {
      if (member.userId) {
        const nick = await getNick(convId, member.userId);
        const name = nick ? nick : await getName(member.userId);

        await getName(member.userId);
        const image = await getImage(member.userId);
        return {
          id: member.userId,
          name: name,
          image: image?.data.publicUrl,
        };
      }
    })
  );

  return members as IUser[];
}

export async function getNick(convId: number | undefined, userId: string) {
  const { data, error } = await supabase
    .from("convMembers")
    .select("nick")
    .eq("convId", convId)
    .eq("userId", userId);

  if (error) {
    return [];
  }

  return data[0].nick;
}
