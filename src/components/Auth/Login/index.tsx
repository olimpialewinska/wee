/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import {
  Container,
  LoginHeaderIcon,
  Login,
  Text,
  Button,
  Input,
  LoginContent,
  LoginFooter,
  Href,
} from "./style";

export function LoginView() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const supabaseClient = useSupabaseClient();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
  };

  return (
    <>
      <Container>
        <Login>
          <LoginHeaderIcon />
          <LoginContent onSubmit={handleLogin} autoComplete={"on"}>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Log in</Button>
          </LoginContent>
          <LoginFooter>
            <Text>Don't have an acoount? </Text>{" "}
            <Link href="/register">
              <Href>Sign up!</Href>
            </Link>
          </LoginFooter>
        </Login>
      </Container>
    </>
  );
}
