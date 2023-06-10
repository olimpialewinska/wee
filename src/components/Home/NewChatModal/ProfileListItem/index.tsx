"use client";
import { IUser } from "@/interfaces";
import { Item, ProfileAvatar, ProfileName, Arrow } from "./style";
import { useCallback, useContext } from "react";
import { newChatListContext } from "..";

export function ProfileListItem({ user }: { user: IUser }) {
  const { addUser } = useContext<any>(newChatListContext);

  const handleAdd = useCallback(() => {
    addUser(user);
  }, [addUser, user]);
  return (
    <Item>
      <ProfileAvatar
        style={{
          backgroundImage: user.image
            ? `url(${user.image})`
            : "url(/default.png)",
        }}
      />
      <ProfileName>{user.name}</ProfileName>
      <Arrow onClick={handleAdd} />
    </Item>
  );
}
