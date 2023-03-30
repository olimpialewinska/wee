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
import React, {
  createContext,
  use,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Database } from "../../../../types/supabase";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Profile } from "../../../../interfaces";
import { ProfileItem } from "./ProfileItem";
import { Router } from "react-router-dom";
import { useRouter } from "next/router";
import dateFormat from "dateformat";
import { AuthUser, SupabaseClient } from "@supabase/supabase-js";

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

const findDirectConversation = async (
  conversationIds: number[],
  supabase: SupabaseClient<Database>,
  isSingle: boolean
): Promise<number | null> => {
  for (const id of conversationIds) {
    const { data: countMembers } = await supabase
      .from("conv_members")
      .select("id", { count: "exact" })
      .eq("conversation_id", id);
    if (!countMembers) continue;

    if (
      (isSingle && countMembers.length === 1) ||
      (!isSingle && countMembers.length === 2)
    )
      return id;
  }

  return null;
};

const getDirectConversation = async (
  userList: Profile[],
  supabase: SupabaseClient<Database>,
  user: AuthUser
): Promise<number | null> => {
  const { data: myConversations } = await supabase
    .from("conv_members")
    .select("*")
    .eq("user_id", user?.id);

  if (!myConversations) {
    return null;
  }

  console.log(userList[1]);

  if (!userList[1]) {
    const myConversationsIds = myConversations.map(
      (item) => item.conversation_id
    ) as number[];

    console.log(
      await findDirectConversation(myConversationsIds, supabase, true)
    );

    return findDirectConversation(myConversationsIds, supabase, true);
  }

  const { data: otherUserConversation } = await supabase
    .from("conv_members")
    .select("*")
    .eq("user_id", userList[1].id);

  if (!otherUserConversation) {
    return null;
  }

  const myConversationsIds = myConversations.map(
    (item) => item.conversation_id
  ) as number[];

  const otherUserConversationIds = otherUserConversation.map(
    (item) => item.conversation_id
  ) as number[];

  const commonConversations = myConversationsIds.filter((item) =>
    otherUserConversationIds.includes(item)
  );

  return findDirectConversation(commonConversations, supabase, false);
};

export function NewGroup(props: NewChatInterface) {
  const router = useRouter();
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

  const handleCreate = useCallback(async () => {
    if (userList.length <= 2) {
      const directConversationId = await getDirectConversation(
        userList,
        supabase,
        user!
      );

      if (directConversationId) {
        router.push(`/Chats/${directConversationId}`);
        props.hide();
        return;
      }

      const { data: conversation } = await supabase
        .from("conversation")
        .insert({})
        .select();

      if (!conversation) {
        return;
      }
      userList.map(async (user) => {
        await supabase.from("conv_members").insert([
          {
            conversation_id: conversation[0].id,
            user_id: user.id,
            user_name: user.username,
          },
        ]);
      });

      const { data: message } = await supabase.from("messages").insert([
        {
          conversation_id: conversation[0].id,
          sender: null,
          receiver: null,
          value: `${dateFormat(new Date())} - Conversation has been created`,
        },
      ]);

      props.hide();
      getMyProfile();

      router.push(`/Chats/${conversation[0].id}`);
    } else {
      const name = userList.map((user) => user.username)?.join(", ");
      const { data: conversation } = await supabase
        .from("conversation")
        .insert({
          name: name,
          isGroup: true,
        })
        .select();

      if (!conversation) {
        return;
      }
      userList.map(async (user) => {
        console.log(user.id);
        await supabase.from("conv_members").insert([
          {
            conversation_id: conversation[0].id,
            user_id: user.id,
            user_name: user.username,
          },
        ]);
      });

      const { data: message } = await supabase.from("messages").insert([
        {
          conversation_id: conversation[0].id,
          sender: null,
          receiver: null,
          value: `${dateFormat(new Date())} - Conversation has been created`,
        },
      ]);

      props.hide();
      getMyProfile();

      router.push(`/Chats/${conversation[0].id}`);
    }
  }, [getMyProfile, props, router, supabase, user, userList]);

  return (
    <>
      {" "}
      <ListContext.Provider
        value={{ addUser, removeUser, userList, setUserList }}
      >
        <ChatSearchContainer>
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
        <Button onClick={handleCreate}>
          {userList.length >= 3 ? "Create group" : "Create"}
        </Button>
      </ButtonWrapper>
    </>
  );
}
