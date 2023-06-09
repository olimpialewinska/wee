import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import type { Database } from "../../../lib/database.types";
import { cookies } from "next/headers";
import Login from "@/components/Auth/Login";
import Register from "@/components/Auth/Register";

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

  return <Register />;
}
