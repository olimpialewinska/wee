"use client";
import { IUser } from "@/interfaces";
import { Done, Item, ProfileAvatar, ProfileName, Input } from "./style";
import { useCallback, useState } from "react";
import { changeUserNickname } from "@/utils/chatSettings/changeUserNickname";
import { store } from "@/stores";
import { observer } from "mobx-react-lite";

export const User = observer(({ member }: { member: IUser }) => {
  const [editingMode, setEditingMode] = useState(false);
  const [name, setName] = useState(member.name as string);

  const changeNickname = useCallback(async () => {
    if (name === member.name) return;
    const result = await changeUserNickname(
      store.currentChatStore.currentChatStore?.convId,
      member.id,
      name
    );
    if (result !== false) {
      if (
        store.currentChatStore.currentChatStore?.otherMember.userId ===
        member.id
      ) {
        store.currentChatStore.currentChatStore.otherMember.name = result!;
      }
      setName(result!);
      setEditingMode(false);
    }
  }, [
    name,
    member.name,
    member.id,
    store.currentChatStore.currentChatStore?.convId,
  ]);

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
});
