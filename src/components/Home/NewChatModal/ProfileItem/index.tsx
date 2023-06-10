"use client";
import { useCallback, useContext } from "react";
import { DeleteIcon, Name, ProfileCircle } from "./style";
import { IUser } from "@/interfaces";
import { IContext, newChatListContext } from "..";

export function ProfileItem({ user }: { user: IUser }) {
  const { me, removeUser } = useContext<IContext>(newChatListContext);
  const handleDelete = useCallback(() => {
    removeUser(user);
  }, [removeUser, user]);

  return (
    <ProfileCircle>
      <Name>{user.name}</Name>
      {user.id == me?.id ? null : <DeleteIcon onClick={handleDelete} />}
    </ProfileCircle>
  );
}
