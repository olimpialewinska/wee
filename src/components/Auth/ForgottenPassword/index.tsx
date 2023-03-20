/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import {
  Button,
  Container,
  Href,
  Input,
  Login,
  LoginContent,
  LoginFooter,
  LoginHeaderIcon,
  Text,
} from "../authFormStyle";

export function ForgottenPasswordView() {
  const [email, setEmail] = useState("");
  const supabaseClient = useSupabaseClient();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/passwordReset",
    });
  };
  return (
    <>
      <Container>
        <Login>
          <LoginHeaderIcon />
          <LoginContent onSubmit={handleSubmit} autoComplete={"on"}>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button type="submit">Send</Button>
          </LoginContent>
          <LoginFooter>
            <Text>Reset-passord email will be sent to your email </Text>{" "}
          </LoginFooter>
        </Login>
      </Container>
    </>
  );
}