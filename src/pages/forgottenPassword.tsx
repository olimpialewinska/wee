import { ForgottenPasswordView } from "@/components/Auth/ForgottenPassword";
import { Navbar } from "@/components/Navbar";
import { useSession } from "@supabase/auth-helpers-react";

export default function ForgottenPassword() {
  const session = useSession();
  return (
    <>
      {!session ? (
        <>
          <Navbar />
          <ForgottenPasswordView />
        </>
      ) : (
        window.location.href = "/Chats"
      )}
    </>
  );
}
