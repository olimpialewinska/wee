import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";
import { getNick } from "../chatSettings/getOtherMembers";
import { getName } from "../chatList/getChatList";

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

  const messagesWithNick = await Promise.all(
    data.map(async (message) => {
      if (message.senderId) {
        const nick = await getUserNick(convId, message.senderId);
        return {
          ...message,
          senderNick: nick,
        };
      }
      return {
        ...message,
        senderNick: null,
      };
    })
  );

  if (!messagesWithNick) {
    return [];
  }

  return messagesWithNick.reverse();
};

export async function getUserNick(convId: number | undefined, userId: string) {
  const nick = await getNick(convId, userId);
  if (nick !== null) {
    return nick;
  }
  return await getName(userId);
}
