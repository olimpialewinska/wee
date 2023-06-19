import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";
import { getImage } from "../chatList/getChatList";
import { IUser } from "@/interfaces";

const supabase = createClientComponentClient<Database>();

export async function findUserByName(
  name: string,
  selectedUsers: IUser[] | IUser
) {
  let selectedUserIds: (string | null)[] = [];
  if (Array.isArray(selectedUsers) && selectedUsers.length > 0) {
    selectedUserIds = selectedUsers.map((user) => user.id);
  }
  const { data, error } = await supabase
    .from("userName")
    .select("*")
    .not("userId", "in", `(${selectedUserIds})`)
    .ilike("name", `%${name}%`);

  if (error) {
    return [];
  }

  const list = Promise.all(
    data.map(async (item) => {
      const image = await getImage(item.userId!);
      return {
        id: item.userId,
        name: item.name + " " + item.lastName,
        image: image?.data.publicUrl ? image.data.publicUrl : null,
      };
    })
  );

  return list;
}

export async function findAllUsers(myId: string) {
  const { data, error } = await supabase
    .from("userName")
    .select("*")
    .neq("userId", myId)
    .limit(100);

  if (error) {
    return [];
  }

  const list = Promise.all(
    data.map(async (item) => {
      const image = await getImage(item.userId!);
      return {
        id: item.userId,
        name: item.name + " " + item.lastName,
        image: image?.data.publicUrl ? image.data.publicUrl : null,
      };
    })
  );

  return list;
}
