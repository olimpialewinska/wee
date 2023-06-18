import { IUser } from "@/interfaces";
import { User } from "./User";

export function Nicknames() {
  return (
    <div
      style={{
        height: 350,
        overflow: "auto",
        width: "100%",
        alignItems: "center",
      }}
    >
      <User user={{} as IUser} />
      <User user={{} as IUser} />
      <User user={{} as IUser} />
      <User user={{} as IUser} />
      <User user={{} as IUser} />
      <User user={{} as IUser} />
      <User user={{} as IUser} />
      <User user={{} as IUser} />
    </div>
  );
}
