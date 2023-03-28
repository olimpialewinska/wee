import { ProfileListItem } from "../ProfileListItem";
import {
  ChatListSearch,
  ChatSearch,
  ChatSearchContainer,
  ChatSearchInput,
  ProfileList,
} from "./style";
import React, { useCallback, useEffect, useState } from "react";
import { Database } from "../../../../types/supabase";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Profile } from "../../../../interfaces";

interface NewChatInterface {
  hide: () => void;
}

export function NewChat(props: NewChatInterface) {
  const supabase = useSupabaseClient<Database>();
  const [searchText, setSearchText] = useState("");

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchProfiles, setSearchProfiles] = useState<Profiles[]>([]);
  const [search, setSearch] = useState(false);



  const user = useUser();

  

  const getProfiles = useCallback(async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, avatar_url, name, lastName")
      .ilike("username", `%${searchText}%`);

    if (error) {
      console.log(error);
    }

    if (data) {
      setProfiles(data);
    }
  }, [searchText, supabase]);


  return (
    <>
      <ChatSearchContainer>
        <ChatSearch>
          <ChatListSearch />
        
          <ChatSearchInput
            placeholder="Search"
            onChange={(e) => {
              setSearchText(e.target.value);
              getProfiles();
            }}
          />
        </ChatSearch>
      </ChatSearchContainer>
      <ProfileList>
        {profiles.map((profile) => {
          return (
            <ProfileListItem
              key={profile.id}
              profile={profile}
              hideModal={props.hide}
              type="single"
            />
          );
        })}
      </ProfileList>
    </>
  );
}
