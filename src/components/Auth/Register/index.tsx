import { useState } from "react";
import {
  Button,
  Container,
  Input,
  Register,
  RegisterContent,
  RegisterHeaderIcon,
} from "../authFormStyle";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export function RegisterView() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");

  const [email, setEmail] = useState("");
  const supabaseClient = useSupabaseClient();

  const [warning, setWarning] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      await supabaseClient.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                firstName,
            },
          },
      });
    }
    window.location.href = "/login";
  };

  return (
    <Container>
      <Register>
        <RegisterHeaderIcon />
        <RegisterContent onSubmit={handleSubmit} autoComplete={"on"}>
          <Input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            style={{ marginBottom: 32 }}
          />
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
          <Input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (e.target.value !== password) {
                setWarning(true);
              } else {
                setWarning(false);
              }
            }}
          />
          {warning && (
            <p style={{ color: "red", fontSize: 12 }}>Passwords do not match</p>
          )}
          <Button type="submit">Register</Button>
        </RegisterContent>
      </Register>
    </Container>
  );
}
