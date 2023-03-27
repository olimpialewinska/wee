import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button } from "../style";
import { Database } from "../../../../types/supabase";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import { ModalContext } from "..";



export function Calculator() {

  const conversationId = useContext(ModalContext).conversationId;
  const supabase = useSupabaseClient<Database>();
  const [counter, setCounter] = useState("Count Messages");

  useEffect(() => {
    setCounter("Count Messages");
  }, []);

  const countMessages = useCallback(async () => {
    setCounter("Loading...");
    const { data, error } = await supabase
      .from("messages")
      .select("id", { count: "exact" })
      .eq("conversation_id", conversationId);

    if (error) {
      setCounter("Error");
      return;
    }
    setCounter("number of messages: " + data["length"].toString());
  }, [conversationId, supabase]);

  return (
    <Button
      style={{
        marginTop: 40,
      }}
      onClick={countMessages}
    >
      {counter}
    </Button>
  );
}
