import { ProfileListItem } from "../ProfileListItem";
import {
  Button,
  ButtonWrapper,
  ChatListSearch,
  ChatSearch,
  ChatSearchContainer,
  ChatSearchInput,
  ProfileList,
} from "./style";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { Database } from "../../../../types/supabase";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Profile } from "../../../../interfaces";
import { ProfileItem } from "./ProfileItem";

interface NewChatInterface {
  hide: () => void;
}

interface ListContextInterface {
  addUser: (user: Profile) => void;
  removeUser: (user: Profile) => void;
  userList: Profile[];
  setUserList: React.Dispatch<React.SetStateAction<Profile[]>>;
}

export const ListContext = createContext<ListContextInterface>(
  {} as ListContextInterface
);

export function NewGroup(props: NewChatInterface) {
  const supabase = useSupabaseClient<Database>();
  const [searchText, setSearchText] = useState("");

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchProfiles, setSearchProfiles] = useState<Profiles[]>([]);
  const [search, setSearch] = useState(false);

  const [groupName, setGroupName] = useState("Group");

  const [userList, setUserList] = useState<Profile[]>([]);

  const user = useUser();

  const getMyProfile = useCallback(async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, avatar_url, name, lastName")
      .eq("id", user?.id);

    if (error) {
      console.log(error);
    }

    if (data) {
      setUserList(data);
    }
  }, [user, supabase]);

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  const addUser = useCallback(
    (user: Profile) => {
      if (userList.find((item) => item.id === user.id)) {
        return;
      }
      setUserList([...userList, user]);
      setSearchText("");
    },
    [userList]
  );

  const removeUser = useCallback(
    (user: Profile) => {
      const newList = userList.filter((item) => item.id !== user.id);
      setUserList(newList);
    },
    [userList]
  );

  const getProfiles = useCallback(async () => {
  
    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, avatar_url, name, lastName")
      .ilike("username", `%${searchText}%`)
      .not("id", "in", `(${userList.map((user) => user.id).join(",")})`);

    if (error) {
      console.log(error);
    }

    if (data) {
      setProfiles(data);
    }
  }, [searchText, supabase, userList]);
  return (
    <>
      {" "}
      <ListContext.Provider
        value={{ addUser, removeUser, userList, setUserList }}
      >
        <ChatSearchContainer>
          <ChatSearch
            style={{
              marginBottom: 16,
            }}
          >
            <ChatListSearch
              style={{
                backgroundImage: "url(/edit.svg)",
                backgroundSize: 16,
              }}
            />

            <ChatSearchInput
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value);
              }}
            />
          </ChatSearch>

          <ChatSearch>
            {userList.map((user) => (
              <ProfileItem key={user.id} user={user}></ProfileItem>
            ))}
            <ChatSearchInput
              placeholder="Search"
              value={searchText}
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
                type="group"
                hideModal={props.hide}
              />
            );
          })}
        </ProfileList>
      </ListContext.Provider>
      <ButtonWrapper>
        <Button>Create</Button>
      </ButtonWrapper>
    </>
  );
}
