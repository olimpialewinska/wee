import { Profile } from "@/interfaces";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Arrow, Item, ProfileAvatar, ProfileName } from "./style";
import { Database } from "../../../../types/supabase";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export function ProfileListItem(props: Profile) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();

  const [userId, setUserId] = useState("");

  const handleAddUser = async () => {
    setUserId(props.id);
    console.log(userId);

    //create new conversation in supabase
    //add user to conversation
    //redirect to conversation

    const { data: conversation } = await supabase
      .from("conversation")
      .insert([{ name: "test" }])
      .single();
  };

  return (
    <Item>
      <ProfileAvatar
        style={{
          backgroundImage: `url(${props.avatar_url})`,
        }}
      />
      <ProfileName>{props.username}</ProfileName>
      <Arrow onClick={handleAddUser} />
    </Item>
  );
}
