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
import { store } from "@/stores";
import { observer } from "mobx-react-lite";

export interface IContext {
  me: IUser | null;
  addUser: (user: IUser) => void;
  removeUser: (user: IUser) => void;
}

export const newChatListContext = createContext<IContext>({} as IContext);

interface NewModalProps {
  visible: boolean;
  hide: () => void;
}

export const NewChatModal = observer((props: NewModalProps) => {
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState<IUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const router = useRouter();

  const findUser = useCallback(async () => {
    setUserList(await findUserByName(search, selectedUsers));
  }, [search, selectedUsers]);

  const findUsers = useCallback(async () => {
    setUserList(
      await findAllUsers(store.currentUserStore.currentUserStore.id!)
    );
  }, [store.currentUserStore.currentUserStore.id!]);

  const handleCreate = useCallback(async () => {
    const id = await CreateConv(
      selectedUsers,
      store.currentUserStore.currentUserStore.id!
    );
    router.push(`/home/${id}`);

    props.hide();
  }, [props, router, selectedUsers]);

  useEffect(() => {
    setSelectedUsers([store.currentUserStore.currentUserStore!]);
    findUsers();
  }, [findUsers, store.currentUserStore.currentUserStore!]);

  const handleClose = useCallback(() => {
    setSelectedUsers([store.currentUserStore.currentUserStore!]);
    props.hide();
  }, [store.currentUserStore.currentUserStore!, props]);

  const addUser = useCallback(
    (user: IUser) => {
      setSearch("");
      setSelectedUsers([...selectedUsers, user]);
      setUserList(userList.filter((item) => item.id !== user.id));
      findAllUsers(store.currentUserStore.currentUserStore.id!);
    },
    [store.currentUserStore.currentUserStore.id!, selectedUsers, userList]
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
            me: store.currentUserStore.currentUserStore,
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
});
