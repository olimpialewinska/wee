import { IUser } from "@/interfaces";
import { User } from "./User";
import { useCallback, useEffect, useState } from "react";
import { getConvMembers } from "@/utils/chatSettings/getOtherMembers";

export function Nicknames({ convId }: { convId: number | undefined }) {
  const [users, setUsers] = useState<IUser[]>([]);

  const getUsers = useCallback(async () => {
    setUsers(await getConvMembers(convId));
  }, [convId]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

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
}
