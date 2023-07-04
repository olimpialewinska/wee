"use client";
import { StyledNavbar, Brand, Buttons, Button } from "./style";

export function Navbar({ background }: { background?: string }) {
  return (
    <StyledNavbar
      style={{
        background: background ? background : "transparent",
      }}
    >
      <Brand href="/"></Brand>
      <Buttons>
        <Button href="/login">Log in</Button>
        <Button href="/register">Register</Button>
      </Buttons>
    </StyledNavbar>
  );
}
