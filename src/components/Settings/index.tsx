/* eslint-disable jsx-a11y/alt-text */
"use client";
import { User } from "@supabase/supabase-js";
import {
  Container,
  FormBg,
  Image,
  Input,
  Button,
  Close,
  ImageInput,
  Message,
} from "./style";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { emailValidation, signOut } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { getImage, uploadImage } from "@/utils/settings/images";
import { Loader } from "../Loader";
import { changeEmail, changePassword } from "@/utils/settings/userdata";

export function Settings({ user }: { user: User }) {
  const router = useRouter();
  const [image, setImage] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>("");
  const [passwordError, setPassowrdError] = useState<string | null>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setLoading(true);
      await uploadImage(selectedFile, user.id);
      setImage(await getImage(user.id));
      setLoading(false);
    }
  };
  const handleSignOut = useCallback(async () => {
    await signOut();
    router.push("/login");
  }, [router]);

  const handleSettingsClose = () => {
    router.push("/home");
  };

  const handleGetImage = useCallback(async () => {
    setLoading(true);
    setImage(await getImage(user.id));
    setLoading(false);
  }, [user.id]);

  useEffect(() => {
    handleGetImage();
  }, [handleGetImage, user.id]);

  const handlevaildateEmail = useCallback((email: string) => {
    emailValidation(email) ? setEmailError("") : setEmailError("Invalid email");
  }, []);

  const handleEmailChange = useCallback(async () => {
    if (emailError) {
      return;
    }
    const res = await changeEmail(email);
    if (res !== null) {
      setEmailError(res.toString());
      return;
    }
    setEmailError("");
    setEmail("");
  }, [email, emailError]);

  const handlePasswordChange = useCallback(async () => {
    if (passwordError) {
      return;
    }

    const res = await changePassword(password);
    if (res !== null) {
      setPassowrdError(res.toString());
      return;
    }
    setPassowrdError("");
    setPassword("");
  }, [password, passwordError]);

  return (
    <Container>
      <FormBg>
        <Close onClick={handleSettingsClose} />

        <Image
          onClick={handleDivClick}
          style={{
            backgroundImage: image ? `url(${image})` : "url(/default.png)",
          }}
        >
          {loading && <Loader />}
          <ImageInput
            type="file"
            ref={fileInputRef}
            multiple={false}
            accept="image/*"
            onChange={handleFileChange}
          />
        </Image>

        {emailError ? (
          <Message
            style={{
              color: "#ff6b6b",
            }}
          >
            {emailError}
          </Message>
        ) : (
          <Message
            style={{
              color: "#fff",
            }}
          >
            Enter your new email
          </Message>
        )}

        <Input
          placeholder="New email"
          onChange={(e) => {
            setEmail(e.target.value);
            handlevaildateEmail(e.target.value);
          }}
          value={email}
        />

        <Button onClick={handleEmailChange}>Change email</Button>
        {passwordError ? (
          <Message
            style={{
              color: "#ff6b6b",
            }}
          >
            {passwordError}
          </Message>
        ) : (
          <Message
            style={{
              color: "#fff",
            }}
          >
            Enter your new password
          </Message>
        )}
        <Input
          placeholder="New password"
          onChange={(e) => {
            setPassword(e.target.value);
            e.target.value.length < 6
              ? setPassowrdError("Password must be at least 6 characters")
              : setPassowrdError("");
          }}
          value={password}
        />
        <Button onClick={handlePasswordChange}>Change password</Button>
        <Button
          style={{
            marginTop: 20,
          }}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </FormBg>
    </Container>
  );
}
