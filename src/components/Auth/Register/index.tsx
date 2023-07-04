"use client";

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
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { emailValidation, signUp } from "@/utils/auth";

export default function Register() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [match, setMatch] = useState(true);
  const [error, setError] = useState("");

  const handleSignUp = useCallback(async () => {
    const data = await signUp(email, password, name, lastName);

    if (data !== null) {
      setError(data.error.message);
      return;
    }

    router.push("/login");
  }, [email, lastName, name, password, router]);

  const handleKeyDown = useCallback(
    (e: string) => {
      if (e === "Enter") {
        handleSignUp();
      }
    },
    [handleSignUp]
  );
  const validateEmail = useCallback(() => {
    if (!emailValidation(email) && email.trim() !== "") {
      setError("Please enter a valid email address");
      setValidEmail(false);
    } else {
      setError("");
      setValidEmail(true);
    }
  }, [email]);

  const passwordMatch = useCallback(
    (confirm: string) => {
      setError("");
      password == confirm ? setMatch(true) : setMatch(false);
    },
    [password]
  );

  return (
    <>
      <Navbar />
      <Container>
        <FormBg>
          <Logo />
          <Message
            style={{
              color: error
                ? "#ff6b6b"
                : !validEmail
                ? "red"
                : !match
                ? "#ff6b6b"
                : "#fff",
            }}
          >
            {error
              ? error
              : !validEmail
              ? "Please enter a valid email"
              : !match
              ? "Passwords do not match"
              : "Create new account"}
          </Message>
          <Input
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />{" "}
          <Input
            type="text"
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail();
            }}
            onPaste={(e) => {
              validateEmail();
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              passwordMatch(e.target.value);
            }}
            onKeyDown={(e) => {
              handleKeyDown(e.key);
            }}
          />
          <Button onClick={handleSignUp}>Register</Button>
          <Footer>
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
