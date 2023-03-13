/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

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
  return (
    <>
      <Container>
        <Login>
          <LoginHeaderIcon />
          <LoginContent>
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Button>Log in</Button>
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
