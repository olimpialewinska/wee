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
import { emailValidation } from "@/utils/auth";

export default function ForgottenPassword() {
  const [email, setEmail] = useState("");

  const supabase = createClientComponentClient();
  const [error, setError] = useState("");
  const [valid, setValid] = useState(true);

  const router = useRouter();

  const handlePasswordRecovery = useCallback(async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/login");
  }, [email, router, supabase.auth]);

  const validateEmail = useCallback(() => {
    setError("");
    setValid(emailValidation(email));
  }, [email]);

  const handleKeyDown = useCallback((e: string) => {
    if (e === "Enter") {
    }
  }, []);

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
              : "Get a link to reset your password"}
          </Message>
          <Input
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail();
            }}
            value={email}
            onKeyDown={(e) => handleKeyDown(e.key)}
          />

          <Button
            style={{
              width: 200,
            }}
            onClick={handlePasswordRecovery}
          >
            Reset Password
          </Button>

          <Footer>
            <ParagraphWrapper>
              <Text>{"Don't have an acoount?"} </Text>{" "}
              <Link href="/register">
                <Href>Sign up!</Href>
              </Link>
            </ParagraphWrapper>
          </Footer>
        </FormBg>
      </Container>
    </>
  );
}
