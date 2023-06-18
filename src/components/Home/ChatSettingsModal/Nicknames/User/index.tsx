"use client";
import { IUser } from "@/interfaces";
import { Done, Item, ProfileAvatar, ProfileName, Input } from "./style";
import { useCallback, useContext, useState } from "react";
import { changeUserNickname } from "@/utils/chatSettings/changeUserNickname";
import { currentUserId } from "../..";

export function User({ member }: { member: IUser }) {
  const { convId } = useContext(currentUserId);
  const [editingMode, setEditingMode] = useState(false);
  const [name, setName] = useState(member.name as string);

  const changeNickname = useCallback(async () => {
    if (name === member.name) return;
    const result = await changeUserNickname(convId, member.id, name);
    if (result !== false) {
      setName(result!);
      setEditingMode(false);
    }
  }, [name, member.name, member.id, convId]);

  const onInputKeyUp = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        changeNickname();
      }
    },
    [changeNickname]
  );

  return (
    <Item>
      <ProfileAvatar
        style={{
          backgroundImage: member.image
            ? `url(${member.image})`
            : "url(/default.png)",
        }}
      />
      {editingMode === true ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Input
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            autoFocus
            onKeyUp={onInputKeyUp}
            onBlur={() => {
              setEditingMode(false);
              setName(member.name as string);
            }}
          />
          <Done
            onMouseDown={() => {
              changeNickname();
            }}
          />
        </div>
      ) : (
        <ProfileName
          onClick={() => {
            setEditingMode(true);
          }}
        >
          {name}
        </ProfileName>
      )}
    </Item>
  );
}
