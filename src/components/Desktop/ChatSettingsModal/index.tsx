/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, {
  useCallback,
  useEffect,
  useState,
  useContext,
  createContext,
} from "react";
import { Database } from "../../../types/supabase";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import {
  BackgroundColor,
  Color,
  Content,
  Header,
  Item,
  Label,
  ModalBg,
  Name,
  Wrapper,
  Image,
  Button,
  Close,
  Buttons,
  CircleButton,
} from "./style";
import { People } from "./People";
import { Edit } from "./Edit";
import { Calculator } from "./Calculator";

interface ModalProps {
  visible: boolean;
  hide: () => void;
  image: string | null | undefined;
  conversationId: number;
  name: string | null | undefined;
  color: string;
  bgColor: string;
}

export const ModalContext = createContext<ModalProps>({} as ModalProps);

export function ChatSettingsModal(props: ModalProps) {
  const [modalContent, setModalContent] = useState<string>("people");

  useEffect(() => {
    setModalContent("people");
  }, [props.conversationId]);

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
          <Header>
            <Image
              style={{
                backgroundImage: `url(${
                  props.image ? props.image : "/person.svg"
                })`,
                filter: props.image ? "none" : "invert(1)",
              }}
            />
            <Name>{props.name}</Name>
          </Header>
          <Buttons>
            <CircleButton
              style={{ backgroundImage: "url(/people.svg)" }}
              onClick={() => {
                setModalContent("people");
              }}
            />

            <CircleButton
              style={{ backgroundImage: "url(/edit.svg)" }}
              onClick={() => {
                setModalContent("edit");
              }}
            />

            <CircleButton
              style={{ backgroundImage: "url(/calculator.svg)" }}
              onClick={() => {
                setModalContent("calculator");
              }}
            />
          </Buttons>

          <ModalContext.Provider
            value={{
              color: props.color,
              bgColor: props.bgColor,
              conversationId: props.conversationId,
              hide: props.hide,
              image: props.image,
              name: props.name,
              visible: props.visible,
            }}
          >
            {modalContent == "people" ? (
              <People />
            ) : modalContent == "edit" ? (
              <Edit />
            ) : (
              <Calculator />
            )}
          </ModalContext.Provider>
        </Wrapper>
      </ModalBg>
    </>
  );
}
