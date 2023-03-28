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

import { NewGroup } from "./NewGroup";
import { NewChat } from "./NewChat";

interface ModalProps {
  visible: boolean;
  type: false | "group-new-chat" | "new-chat";
  hide: () => void;
}

export function NewChatModal(props: ModalProps) {
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

          {props.type == "new-chat" ? (
            <>
              <NewChat hide={props.hide} />
            </>
          ) : (
            <NewGroup hide={props.hide} />
          )}
        </Wrapper>
      </ModalBg>
    </>
  );
}
