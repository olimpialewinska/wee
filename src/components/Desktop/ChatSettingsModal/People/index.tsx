/* eslint-disable react/jsx-key */
import React, { useCallback, useContext, useEffect, useState } from "react";
import { UsersList } from "../style";
import { Database } from "../../../../types/supabase";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import { ModalContext } from "..";
import { Item } from "./Item";

import { Conv_members } from "../../../../interfaces";

export function People() {
  const conversationId = useContext(ModalContext).conversationId;
  const supabase = useSupabaseClient<Database>();

  const [users, setUsers] = useState<Conv_members[] | undefined>();

  const getAllUsers = useCallback(async () => {
    const { data: users } = await supabase
      .from("conv_members")
      .select("id, user_id, user_name")
      .eq("conversation_id", conversationId);

    //get avatar_url form table "profile"
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, avatar_url")
      .in("id", users?.map((m) => m.user_id) ?? []);

    if (!profiles) {
      return;
    }

    const newUsers = users?.map((user) => {
      const profile = profiles.find((p) => p.id === user.user_id);
      return {
        ...user,
        avatar_url: profile?.avatar_url
          ? downloadImage(profile.avatar_url)
          : null,
        user_name: user.user_name ?? "No name",
      };
    });

    setUsers(newUsers);
  }, [conversationId]);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers, conversationId]);

  function downloadImage(path: string) {
    const image = supabase.storage.from("avatars").getPublicUrl(`${path}`);

    return image.data.publicUrl.toString();
  }

  return (
    <UsersList>
      {users?.map((user: Conv_members) => (
        <Item key={user.id} user={user} />
      ))}
    </UsersList>
  );
}
