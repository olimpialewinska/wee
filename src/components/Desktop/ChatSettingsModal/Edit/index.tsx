import React, { useCallback, useContext, useEffect, useState } from "react";
import { BackgroundColor, Button, Color, Content, Item, Label } from "../style";
import { Database } from "../../../../types/supabase";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { ModalContext } from "..";

export function Edit() {
  const {
    conversationId,
    color,
    bgColor,
    hide,
  } = useContext(ModalContext);

  const supabase = useSupabaseClient<Database>();
  const [newColor, setNewColor] = useState(color);
  const [backgroundColor, setBackgroundColor] = useState(bgColor);

  useEffect(() => {
    setNewColor(color);
    setBackgroundColor(bgColor);
  }, [bgColor, color, conversationId]);

  const saveChanges = useCallback(async () => {
    await supabase
      .from("conversation")
      .update({ bg_color: backgroundColor, color: newColor })
      .eq("id", conversationId);

    if (newColor == color) {
    }
    await supabase.from("messages").insert([
      {
        conversation_id: conversationId,
        sender: null,
        receiver: null,
        value: `colors,${newColor + "," + backgroundColor}`,
      },
    ]);

    hide();
  }, [backgroundColor, color, conversationId, hide, newColor, supabase]);
  return (
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
          value={newColor}
          onChange={(e) => {
            setNewColor(e.target.value);
          }}
        />
      </Item>
      <Button onClick={saveChanges}>Save Changes</Button>
    </Content>
  );
}
