import { Conv_members } from "@/interfaces";
import { useCallback, useContext, useState } from "react";
import { Change, User, UserImage, UserName } from "../../style";
import { Database } from "../../../../../types/supabase";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { ModalContext } from "../..";

interface ItemProps {
  user: Conv_members;
}

export function Item(props: ItemProps) {
  const conversationId = useContext(ModalContext).conversationId;
  const supabase = useSupabaseClient<Database>();
  const [nick, setNick] = useState<
    string | number | readonly string[] | undefined
  >(props.user.user_name!.toString());

  const updateNick = useCallback(
    async (id: number) => {
      if (!nick) return;

      const { data: users } = await supabase

        .from("conv_members")
        .update({ user_name: nick.toString()})
        .eq("id", id);

      const { data: message } = await supabase.from("messages").insert([
        {
          conversation_id: conversationId,
          sender: null,
          receiver: null,
          value: `nickname,${nick},${props.user.user_name}`,
        },
      ]);
    },
    [conversationId, nick, props.user.user_name]
  );

  return (
    <User>
      <UserImage
        style={{
          backgroundImage: `url(${
            props.user.avatar_url ? props.user.avatar_url : "/person.svg"
          })`,
          filter: props.user.avatar_url ? "none" : "invert(1)",
        }}
      />
      <UserName value={nick} onChange={(e) => setNick(e.target.value)} />
      <Change
        onClick={() => {
          updateNick(props.user.id);
        }}
      />
    </User>
  );
}
