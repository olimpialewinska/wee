import { useEffect, useState } from "react";
import {
  StyledChatListItem,
  Avatar,
  Info,
  InfoName,
  Message,
  Time,
} from "./style";
import { Database } from "../../types/supabase";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface ChatListItemProps {
  name: string | null;
  message: string | null | undefined;
  time: string | number | Date;
  image: string | null | undefined;
  onClick: () => void;
}

export function ChatListItem(props: ChatListItemProps) {
  const supabase = useSupabaseClient<Database>();

  const [avatarUrl, setAvatarUrl] = useState("/person.svg");

  useEffect(() => {
    if (props.image) {
      downloadImage(props.image);
    }
  }, [props.image]);

  const time = new Date(props.time);
  const hour = time.getHours();
  const minutes = time.getMinutes();

  async function downloadImage(path: string) {
    const image = supabase.storage
      .from("avatars")
      .getPublicUrl(`${props.image}`);

    setAvatarUrl(image.data.publicUrl);
  }

  return (
    <StyledChatListItem onClick={props.onClick}>
      <Avatar
        style={{
          backgroundImage: `url(${avatarUrl})`,
          filter: props.image ? "none" : "invert(1)",
        }}
      />
      <Info>
        <InfoName>{props.name}</InfoName>
        <Message>{props.message}</Message>
      </Info>
      <Time>
        {hour < 10 ? "0" + hour : hour}:{minutes < 10 ? "0" + minutes : minutes}
      </Time>
    </StyledChatListItem>
  );
}
