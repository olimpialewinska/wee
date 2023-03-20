/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  Button,
  Container,
  Href,
  Input,
  Login,
  LoginContent,
  LoginFooter,
  LoginHeaderIcon,
  ParagraphWrapper,
  Text,
} from "../authFormStyle";

export function PassowordResetView() {
  const [password, setPassword] = useState("");
  const supabaseClient = useSupabaseClient();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await supabaseClient.auth.updateUser({ password });
    alert("Password has been changed");
    window.location.href = "/login";
  };
  return (
    <>
      <Container>
        <Login>
          <LoginHeaderIcon />
          <LoginContent onSubmit={handleSubmit} autoComplete={"on"}>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Log in</Button>
          </LoginContent>
        </Login>
      </Container>
    </>
  );
}
