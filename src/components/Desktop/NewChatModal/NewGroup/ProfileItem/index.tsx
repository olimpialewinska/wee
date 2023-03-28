import { Profile } from "@/interfaces";
import { useUser } from "@supabase/auth-helpers-react";
import { useCallback, useContext } from "react";
import { ListContext } from "..";
import { DeleteIcon, Name, ProfileCircle } from "./style";

export interface ProfileItemProps {
  user: Profile;
}

export function ProfileItem(props: ProfileItemProps) {
  const { removeUser } = useContext(ListContext);

  const me = useUser();

  const onDeleteClick = useCallback(
    () => removeUser(props.user),
    [removeUser, props.user]
  );

  if(props.user.id == me?.id) return (
    <ProfileCircle style={{
        padding: "0 20px 0 20px"
    }}>
    <Name>{props.user.username}</Name>
    
  </ProfileCircle>
  )

  return (
    <ProfileCircle>
      <Name>{props.user.username}</Name>
      {props.user.id == me?.id ? null  :
      <DeleteIcon onClick={onDeleteClick} />
        }
    </ProfileCircle>
  );
}
