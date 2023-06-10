import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";
import { IConv, IUser } from "@/interfaces";

const supabase = createClientComponentClient<Database>();

export async function getAllMyConvs(user: string) {
  const { data, error } = await supabase
    .from("convMembers")
    .select("convId")
    .eq("userId", user);

  if (error) {
    return [];
  }
  console.log("convsID", data);

  const convsWithMembers = await Promise.all(
    data.map(async (item) => {
      console.log(item.convId);
      const { data: members, error: error2 } = await supabase
        .from("convMembers")
        .select("userId")
        .eq("convId", item.convId);

      if (error2) {
        console.log(error2);
      }

      return {
        id: item.convId,
        otherMembers: members,
      };
    })
  );
  console.log(convsWithMembers);

  return convsWithMembers;
}

export async function checkIfConvExists(
  selectedUsers: IUser[] | IUser,
  userId: string
) {
  let otherUserId: any;

  if (Array.isArray(selectedUsers)) {
    otherUserId = selectedUsers.find((user) => user.id !== userId)?.id;
  } else {
    otherUserId = selectedUsers.id;
  }
  console.log(otherUserId);

  const myConvs = await getAllMyConvs(userId);

  if (!myConvs || myConvs.length === 0) {
    return false;
  }

  const convWithSelf = myConvs.find((conv: any) => {
    const memberIds = conv.otherMembers?.map((member: any) => member.userId);
    return memberIds?.includes(userId) && memberIds.length === 1;
  });

  if (convWithSelf) {
    if (convWithSelf.otherMembers && convWithSelf.otherMembers.length === 1) {
      const convWithOtherUser = myConvs.find((conv: any) => {
        const memberIds = conv.otherMembers?.map(
          (member: any) => member.userId
        );
        return (
          memberIds?.includes(userId) &&
          memberIds?.includes(otherUserId) &&
          memberIds.length === 2
        );
      });

      if (convWithOtherUser) {
        return convWithOtherUser.id;
      }
    } else {
      return convWithSelf.id;
    }
  }

  return null;
}

export function CheckConvType(selectedUsers: IUser[] | IUser) {
  if (Array.isArray(selectedUsers) && selectedUsers.length > 2) {
    console.log("group");
    return "group";
  } else if (Array.isArray(selectedUsers) && selectedUsers.length == 2) {
    console.log("conv");
    return "conv";
  } else {
    console.log("single");
    return "single";
  }
}

export async function InitialMessage(convId: number) {
  const { data, error } = await supabase
    .from("messages")
    .insert([{ convId: convId, value: "Conversation was created" }]);
}

export async function Create(isGroup: boolean) {
  const { data, error } = await supabase
    .from("convs")
    .insert([{ isGroup: isGroup }])
    .select();

  if (data) {
    await InitialMessage(data[0].id);
    return data[0].id;
  }

  return null;
}

export async function AddToDb(selectedUsers: IUser[] | IUser) {
  let isGroup = false;
  if (Array.isArray(selectedUsers) && selectedUsers.length > 2) {
    isGroup = true;
  }

  const convId = await Create(isGroup);

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

export async function CreateConv(selectedUsers: IUser[] | IUser, user: string) {
  const convType = CheckConvType(selectedUsers);

  if (convType === "group") {
    return await AddToDb(selectedUsers);
  }

  const exist = await checkIfConvExists(selectedUsers, user);

  console.log(exist);

  if (exist === null) {
    return await AddToDb(selectedUsers);
  }

  return exist;
}
