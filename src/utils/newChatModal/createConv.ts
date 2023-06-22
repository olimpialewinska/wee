import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";
import { IUser } from "@/interfaces";

const supabase = createClientComponentClient<Database>();

export async function getAllMyConvs(user: string) {
  const { data, error } = await supabase
    .from("convMembers")
    .select("convId")
    .eq("userId", user);

  if (error) {
    return [];
  }

  const convsWithMembers = await Promise.all(
    data.map(async (item) => {
      const { data: members, error: error2 } = await supabase
        .from("convMembers")
        .select("userId")
        .eq("convId", item.convId);

      return {
        id: item.convId,
        otherMembers: members,
      };
    })
  );

  return convsWithMembers;
}

export async function checkIfConvExists(
  selectedUsers: IUser[] | IUser,
  userId: string
) {
  const myConvs = await getAllMyConvs(userId);

  if (Array.isArray(selectedUsers) && selectedUsers.length === 1) {
    const selectedUserId = selectedUsers[0].id;

    const existingConv = myConvs.find((conv: any) => {
      const memberIds = conv.otherMembers?.map((member: any) => member.userId);
      return memberIds?.includes(userId) && memberIds?.length === 1;
    });

    if (existingConv) {
      return existingConv.id;
    }
  } else {
    const otherUserIds = Array.isArray(selectedUsers)
      ? selectedUsers.map((user) => user.id)
      : [selectedUsers.id];

    const existingConv = myConvs.find((conv: any) => {
      const memberIds = conv.otherMembers?.map((member: any) => member.userId);
      return (
        memberIds?.includes(userId) &&
        memberIds?.length === 2 &&
        otherUserIds.every((id) => memberIds?.includes(id))
      );
    });

    if (existingConv) {
      return existingConv.id;
    }
  }

  return null;
}

export function checkConvType(selectedUsers: IUser[] | IUser) {
  if (Array.isArray(selectedUsers) && selectedUsers.length > 2) {
    return "group";
  } else if (Array.isArray(selectedUsers) && selectedUsers.length === 2) {
    return "conv";
  } else {
    return "single";
  }
}

export async function initialMessage(convId: number, value: string) {
  const { data, error } = await supabase
    .from("messages")
    .insert([{ convId: convId, value: value }]);

  if (error) {
    return null;
  }
}

export async function create(isGroup: boolean) {
  const { data, error } = await supabase
    .from("convs")
    .insert([{ isGroup: isGroup }])
    .select();

  if (data) {
    if (isGroup === true) {
      const { data: detailsData, error } = await supabase
        .from("groupDetails")
        .insert([{ convId: data[0].id, name: "Group" }]);

      if (error) {
        return null;
      }
    }
    await initialMessage(data[0].id, "Conversation was created");

    return data[0].id;
  }

  return null;
}

export async function addToDb(selectedUsers: IUser[] | IUser) {
  let isGroup = false;
  if (Array.isArray(selectedUsers) && selectedUsers.length > 2) {
    isGroup = true;
  }

  const convId = await create(isGroup);

  if (convId) {
    let users: IUser[];
    if (Array.isArray(selectedUsers)) {
      users = selectedUsers;
    } else {
      users = [selectedUsers];
    }

    const { data, error } = await supabase
      .from("convMembers")
      .insert(
        users.map((user) => ({
          convId: convId,
          userId: user.id,
        }))
      )
      .select();

    if (data) {
      return convId;
    } else if (error) {
      return "Something went wrong";
    }
  }
}

export async function createConv(selectedUsers: IUser[] | IUser, user: string) {
  const convType = checkConvType(selectedUsers);

  if (convType === "group") {
    return await addToDb(selectedUsers);
  }

  const exist = await checkIfConvExists(selectedUsers, user);

  if (exist === null) {
    return await addToDb(selectedUsers);
  }

  return exist;
}
