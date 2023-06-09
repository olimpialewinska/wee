"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import {
  Button,
  Container,
  Footer,
  FormBg,
  Href,
  Input,
  Logo,
  Message,
  ParagraphWrapper,
  Text,
} from "../style";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { emailValidation, signIn } from "@/utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [valid, setValid] = useState<boolean>(true);

  const handleSignIn = useCallback(async () => {
    const data = await signIn(email, password);

    if (data.error) {
      setError(data.error.message);
      setValid(false);
      return;
    }

    router.push("/home");
  }, [email, password, router]);

  const validateEmail = useCallback(() => {
    setError("");
    setValid(emailValidation(email));
  }, [email]);

  const handleKeyDown = useCallback(
    (e: string) => {
      if (e === "Enter") {
        handleSignIn();
      }
    },
    [handleSignIn]
  );

  return (
    <>
      <Navbar />
      <Container>
        <FormBg>
          <Logo />
          <Message
            style={{
              color: error ? "#ff6b6b" : !valid ? "#ff6b6b" : "#fff",
            }}
          >
            {error
              ? error
              : !valid
              ? "Please enter a valid email address"
              : "Log in to your account"}
          </Message>
          <Input
            name="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail();
            }}
            value={email}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            onKeyDown={(e) => handleKeyDown(e.key)}
          />

          <Button onClick={handleSignIn}>Sign in</Button>

          <Footer>
            <ParagraphWrapper>
              <Text>{"Don't have an acoount?"} </Text>{" "}
              <Link href="/register">
                <Href>Sign up!</Href>
              </Link>
            </ParagraphWrapper>

            <ParagraphWrapper>
              <Text>Have you forgotten your password? </Text>{" "}
              <Link href="/forgottenPassword">
                <Href>Remind me!</Href>
              </Link>
            </ParagraphWrapper>
          </Footer>
        </FormBg>
      </Container>
    </>
  );
}
