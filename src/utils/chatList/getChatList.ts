import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";

const supabase = createClientComponentClient<Database>();

export async function getMyConvsId(id: string) {
  const { data, error } = await supabase
    .from("convMembers")
    .select("*")
    .eq("userId", id);

  if (error) {
    return [];
  }

  return data;
}

export async function getMyConvs(id: string) {
  const convsIds = await getMyConvsId(id);
  const { data, error } = await supabase
    .from("convs")
    .select("*")
    .in(
      "id",
      convsIds.map((convId) => convId.convId)
    );

  if (error) {
    return [];
  }

  return data;
}

export function getPublicUrl(userId: string, name: string) {
  const data = supabase.storage
    .from("userImage")
    .getPublicUrl(`${userId}/${name}`);

  return data;
}

export async function getName(id: string) {
  const { data, error } = await supabase
    .from("userName")
    .select("*")
    .in("userId", [id])
    .limit(1);

  if (error || !data || data.length === 0) {
    return null;
  }

  return data[0].name + " " + data[0].lastName;
}

export async function getImage(id: string) {
  const { data, error } = await supabase
    .from("images")
    .select("name")
    .eq("userId", id)
    .limit(1);

  if (error || !data || data.length === 0) {
    return null;
  }

  const name = data[0].name as string;
  return getPublicUrl(id, name);
}

export async function getOtherMembers(
  myConvs: Database["public"]["Tables"]["convs"]["Row"][],
  myId: string
) {
  const { data, error } = await supabase
    .from("convMembers")
    .select("*")
    .in(
      "convId",
      myConvs.map((conv) => conv.id)
    )
    .neq("userId", myId);

  if (error) {
    return [];
  }

  return data;
}

export async function getLastMessage(
  myConvs: Database["public"]["Tables"]["convs"]["Row"][]
) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .in(
      "convId",
      myConvs.map((conv) => conv.id)
    )
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data;
}

export async function getData(userId: string) {
  const myConvs = await getMyConvs(userId);
  const otherMembers = await getOtherMembers(myConvs, userId);
  const lastMessages = await getLastMessage(myConvs);

  const data = await Promise.all(
    myConvs.map(async (conv) => {
      const otherMember = otherMembers.find(
        (member) => member.convId === conv.id
      );

      const lastMessage = lastMessages.find(
        (message) => message.convId === conv.id
      );

      if (!otherMember) {
        const myImage = await getImage(userId);
        const me = {
          userId: userId,
          name: "You",
          image: myImage?.data.publicUrl ? myImage.data.publicUrl : null,
        };
        return {
          convId: conv.id,
          isGroup: conv.isGroup,
          otherMember: me,
          lastMessage,
        };
      }

      const otherMemberName = await getName(otherMember.userId!);
      const otherMemberImage = await getImage(otherMember.userId!);

      const memberName = otherMember.nick ? otherMember.nick : otherMemberName;
      const memberImage = otherMemberImage?.data.publicUrl || null;

      return {
        convId: conv.id,
        isGroup: conv.isGroup,
        otherMember: {
          userId: otherMember.userId,
          name: memberName,
          image: memberImage,
        },
        lastMessage,
      };
    })
  );
  data.sort((a, b) => {
    const timeA = a.lastMessage?.created_at
      ? new Date(a.lastMessage.created_at).getTime()
      : 0;
    const timeB = b.lastMessage?.created_at
      ? new Date(b.lastMessage.created_at).getTime()
      : 0;
    return timeB - timeA;
  });

  return data;
}

export function getTime(time: string | null | undefined) {
  if (!time) return "";

  const date = new Date(time);
  if (date.toDateString() === new Date().toDateString()) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }

  return date.toLocaleDateString();
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data) {
    return null;
  }
  const user = data.user;
  return user;
}
