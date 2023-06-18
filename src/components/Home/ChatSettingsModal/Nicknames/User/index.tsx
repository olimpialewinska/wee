"use client";
import { IUser } from "@/interfaces";
import { Item, ProfileAvatar, ProfileName } from "./style";

export function User({ user }: { user: IUser }) {
  return (
    <Item>
      <ProfileAvatar
        style={{
          backgroundImage: user.image
            ? `url(${user.image})`
            : "url(/default.png)",
        }}
      />
      <ProfileName>Name</ProfileName>
    </Item>
  );
}
