/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */

import { LoginView } from "@/components/Auth/Login";
import { Navbar } from "@/components/Navbar";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Login() {
  const session = useSession();
  return (
    <>
      {!session ? (
        <>
          {" "}
          <Navbar />
          <LoginView />
        </>
      ) : (
        (window.location.href = "/Chats")
      )}
    </>
  );
}
