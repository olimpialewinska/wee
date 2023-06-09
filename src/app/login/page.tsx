import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import type { Database } from "../../../lib/database.types";
import { cookies } from "next/headers";
import Login from "@/components/Auth/Login";
import { Navbar } from "@/components/Navbar";

export default async function LoginPage() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/home");
  }

  return <Login />;
}
