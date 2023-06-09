import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import type { Database } from "../../../lib/database.types";
import { cookies } from "next/headers";
import ForgottenPassword from "@/components/Auth/ForgottenPassword";

export default async function RegisterPage() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/home");
  }

  return <ForgottenPassword />;
}
