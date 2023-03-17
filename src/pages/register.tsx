import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { RegisterView } from "@/components/Auth/Register";
import { useSession } from "@supabase/auth-helpers-react";

export default function Register() {
  const session = useSession();
  return (
    <>
      {!session ? (
        <>
          {" "}
          <Navbar />
          <RegisterView />
        </>
      ) : (
        (window.location.href = "/Chats")
      )}
    </>
  );
}
