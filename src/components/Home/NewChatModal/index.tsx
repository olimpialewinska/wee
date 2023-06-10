"use client";
import { User } from "@supabase/auth-helpers-nextjs";
import { IUser, ModalProps } from "@/interfaces";
import {
  Button,
  ButtonWrapper,
  ChatSearch,
  ChatSearchContainer,
  ChatSearchInput,
  Container,
  ModalBg,
  ProfileList,
} from "./style";
import { createContext, useCallback, useEffect, useState } from "react";
import { findAllUsers, findUserByName } from "@/utils/newChatModal/getName";
import { ProfileListItem } from "./ProfileListItem";
import { getName } from "@/utils/chatList/getChatList";
import { ProfileItem } from "./ProfileItem";
import { CreateConv } from "@/utils/newChatModal/createConv";
import { useRouter } from "next/navigation";

export interface IContext {
  me: IUser | null;
  addUser: (user: IUser) => void;
  removeUser: (user: IUser) => void;
}

export const newChatListContext = createContext<IContext>({} as IContext);

interface NewModalProps {
  visible: boolean;
  hide: () => void;
  user: User;
}

export function NewChatModal(props: NewModalProps) {
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState<IUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const [myData, setMyData] = useState<IUser>();
  const router = useRouter();

  const findUser = useCallback(async () => {
    setUserList(await findUserByName(search, selectedUsers));
  }, [search, selectedUsers]);

  const findUsers = useCallback(async () => {
    setUserList(await findAllUsers(props.user.id));
  }, [props.user.id]);

  const handleCreate = useCallback(async () => {
    const id = await CreateConv(selectedUsers, props.user.id);
    router.push(`/home/${id}`);

    props.hide();
  }, [props, router, selectedUsers]);

  const getMyData = useCallback(async () => {
    const name = await getName(props.user.id);
    const me: IUser = {
      id: props.user.id,
      name: name,
      image: null,
    };
    setMyData(me);

    setSelectedUsers([me]);
  }, [props.user]);

  useEffect(() => {
    getMyData();
    findUsers();
  }, [findUsers, getMyData]);

  const handleClose = useCallback(() => {
    setSelectedUsers([myData!]);
    props.hide();
  }, [myData, props]);

  const addUser = useCallback(
    (user: IUser) => {
      setSearch("");
      setSelectedUsers([...selectedUsers, user]);
      setUserList(userList.filter((item) => item.id !== user.id));
      findAllUsers(props.user.id);
    },
    [props.user.id, selectedUsers, userList]
  );

  const removeUser = useCallback(
    (user: IUser) => {
      setSelectedUsers(selectedUsers.filter((item) => item.id !== user.id));
    },
    [selectedUsers]
  );

  return (
    <ModalBg
      style={{
        opacity: props.visible ? 1 : 0,
        pointerEvents: props.visible ? "inherit" : "none",
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
          setUserList([]);
        }
      }}
    >
      <Container>
        <newChatListContext.Provider
          value={{
            me: selectedUsers[0],
            addUser,
            removeUser,
          }}
        >
          <ChatSearchContainer>
            <ChatSearch>
              {selectedUsers.map((user: IUser) => (
                <ProfileItem key={user.id} user={user}></ProfileItem>
              ))}
              <ChatSearchInput
                placeholder="Search"
                onChange={(e) => {
                  setSearch(e.target.value);
                  findUser();
                }}
                value={search}
              />
            </ChatSearch>
          </ChatSearchContainer>
          <ProfileList>
            {userList.map((user: IUser) => (
              <ProfileListItem key={user.id} user={user}></ProfileListItem>
            ))}
          </ProfileList>

          <ButtonWrapper>
            <Button
              onClick={() => {
                handleCreate();
              }}
            >
              Create
            </Button>
          </ButtonWrapper>
        </newChatListContext.Provider>
      </Container>
    </ModalBg>
  );
}
