import { Profile } from "@/interfaces";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Arrow, Item, ProfileAvatar, ProfileName } from "./style";
import { Database } from "../../../../types/supabase";
import { useRouter } from "next/router";
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

    //check if the conversation already exist 

    const { data: conversation } = await supabase
      .from("conversation")
      .insert({})
      .select();

    if (!conversation) {
      return;
    }

    const { data: convMembers } = await supabase.from("conv_members").insert([
      { conversation_id: conversation[0].id, user_id: user?.id },
      { conversation_id: conversation[0].id, user_id: props.profile.id },
    ]);

    router.push(`/Chats/${conversation[0].id}`);
  };

  return (
    <Item>
      <ProfileAvatar
        style={{
          backgroundImage: `url(${avatarUrl})`,
          filter: props.profile.avatar_url? "none": "invert(1)"
        }}
      />
      <ProfileName>{props.profile.username}</ProfileName>
      <Arrow onClick={handleAddUser} />
    </Item>
  );
}
