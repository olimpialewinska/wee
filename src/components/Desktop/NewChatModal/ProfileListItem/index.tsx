import { Profile } from "@/interfaces";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Arrow, Item, ProfileAvatar, ProfileName } from "./style";
import { Database } from "../../../../types/supabase";
import { useRouter } from "next/router";
import dateFormat from "dateformat";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

interface Props {
  profile: Profile;
  hideModal: () => void;
}

export function ProfileListItem(props: Props) {
  const router = useRouter();
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [avatarUrl, setAvatarUrl] = useState("/person.svg");

  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (props.profile.avatar_url) {
      downloadImage(props.profile.avatar_url);
    }
  }, [props.profile.avatar_url]);

  async function downloadImage(path: string) {
    const image = supabase.storage
      .from("avatars")
      .getPublicUrl(`${props.profile.avatar_url}`);

    setAvatarUrl(image.data.publicUrl);
  }

  const handleAddUser = async () => {
    props.hideModal();
    setUserId(props.profile.id);

    const { data: conversation } = await supabase
      .from("conversation")
      .insert({})
      .select();

    if (!conversation) {
      return;
    }

    let { data, error, status } = await supabase
      .from("profiles")
      .select(`username`)
      .eq("id", user?.id)
      .single();

    const { data: convMembers } = await supabase.from("conv_members").insert([
      {
        conversation_id: conversation[0].id,
        user_id: user?.id,
        user_name: data?.username,
      },
      {
        conversation_id: conversation[0].id,
        user_id: props.profile.id,
        user_name: props.profile.username,
      },
    ]);

    
    const { data: message } = await supabase
      .from("messages")
      .insert([
        {
          conversation_id: conversation[0].id,
          sender: null,
          receiver: null,
          value: `${dateFormat(new Date())} - Conversation has been created`,
        },
      ]);


    router.push(`/Chats/${conversation[0].id}`);
  };

  return (
    <Item>
      <ProfileAvatar
        style={{
          backgroundImage: `url(${avatarUrl})`,
          filter: props.profile.avatar_url ? "none" : "invert(1)",
        }}
      />
      <ProfileName>{props.profile.username}</ProfileName>
      <Arrow onClick={handleAddUser} />
    </Item>
  );
}
