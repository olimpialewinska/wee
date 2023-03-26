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

  const [counter, setCounter] = useState("Count Messages");

  const saveChanges = useCallback(async () => {
    await supabase
      .from("conversation")
      .update({ bg_color: backgroundColor, color: color })
      .eq("id", props.conversationId);

    props.hide();
  }, [backgroundColor, color, props, supabase]);

  const countMessages = useCallback(async () => {
    setCounter("Loading...")
    const { data, error } = await supabase
      .from("messages")
      .select("id", { count: 'exact'})
      .eq("conversation_id", props.conversationId);

    if (error) {
      setCounter("Error");
      return
    }
    setCounter(data['length'].toString());
  }, [props, supabase]);


  useEffect(() => {
    setColor(props.color);
    setBackgroundColor(props.bgColor);
    setCounter("Count Messages")
  }, [props.color, props.bgColor, props.conversationId]);

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
          <Button style={{
            marginBottom:28
          }}
          onClick={countMessages}>{counter}</Button>
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
