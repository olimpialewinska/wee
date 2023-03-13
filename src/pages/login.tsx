/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */

import { LoginView } from "@/components/Login";
import { Navbar } from "@/components/Navbar";

export default function Login() {
  return (
    <>
      <Navbar />
      <LoginView />
    </>
  );
}
