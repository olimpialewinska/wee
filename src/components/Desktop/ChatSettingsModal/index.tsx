/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, useState } from "react";
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
} from "./style";

interface ModalProps {
  visible: boolean;
  hide: () => void;
  image: string;
  conversationId: number;
  name: string | null;
  color: string;
  bgColor: string;
}
function ChatSettingsModal(props: ModalProps) {
  const supabase = useSupabaseClient<Database>();

  const [color, setColor] = useState(props.color);
  const [backgroundColor, setBackgroundColor] = useState(props.bgColor);

  const saveChanges = useCallback(async () => {
    const { data: colors } = await supabase
      .from("conversation")
      .update({ bg_color: backgroundColor, color: color })
      .eq("id", props.conversationId);

    if (colors) {
      props.hide();
    }
  }, [backgroundColor, color, props, supabase]);

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
                backgroundImage: `url(${props.image})`,
              }}
            />
            <Name>{props.name}</Name>
          </Header>
          <Content>
            <Item>
              <Label>Background color:</Label>
              <BackgroundColor
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </Item>
            <Item>
              <Label>Chat color:</Label>
              <Color
                type="color"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              />
            </Item>
            <Button onClick={saveChanges}>Save Changes</Button>
          </Content>
        </Wrapper>
      </ModalBg>
    </>
  );
}

export { ChatSettingsModal };
