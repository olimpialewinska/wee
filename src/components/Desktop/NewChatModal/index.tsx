/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, useState } from "react";
import { Database } from "../../../types/supabase";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import {
  ModalBg,
  Wrapper,
  Close,
  ChatSearchContainer,
  ChatListSearch,
  ChatSearch,
  ChatSearchInput,
  ProfileList,
} from "./style";

import { Profile } from "../../../interfaces";
import { ProfileListItem } from "./ProfileListItem";

interface ModalProps {
  visible: boolean;
  hide: () => void;
}

function NewChatModal(props: ModalProps) {
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
      .ilike("name", `%${searchText}%`);

    if (error) {
      console.log(error);
    }

    if (data) {
      setProfiles(data);
    }
  }, [searchText, supabase]);

  return (
    <>
      <ModalBg
        style={{
          opacity: props.visible ? 1 : 0,
          pointerEvents: props.visible ? "inherit" : "none",
        }}
      >
        <Wrapper>
          <Close onClick={props.hide} />
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
                />
              );
            })}
          </ProfileList>
        </Wrapper>
      </ModalBg>
    </>
  );
}

export { NewChatModal };
