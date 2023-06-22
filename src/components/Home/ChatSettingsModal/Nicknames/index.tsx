import { IUser } from "@/interfaces";
import { User } from "./User";
import { useCallback, useEffect, useState } from "react";
import { getConvMembers } from "@/utils/chatSettings/getOtherMembers";
import { observer } from "mobx-react-lite";
import { store } from "@/stores";
import { set } from "mobx";

export const Nicknames = observer(() => {
  const [users, setUsers] = useState<IUser[]>([]);

  const getUsers = useCallback(async () => {
    setUsers(
      await getConvMembers(store.currentChatStore.currentChatStore?.convId!)
    );
  }, [store.currentChatStore.currentChatStore?.convId]);

  useEffect(() => {
    setUsers([]);
    getUsers();
  }, [getUsers, store.currentChatStore.currentChatStore?.convId]);

  return (
    <div
      style={{
        height: 350,
        overflow: "auto",
        width: "100%",
        alignItems: "center",
      }}
    >
      {users.map((user) => (
        <User key={user.id} member={user} />
      ))}
    </div>
  );
});
