import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../lib/database.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import IndexPage from "@/components/IndexPage";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/home");
  }
  return <IndexPage />;
}
