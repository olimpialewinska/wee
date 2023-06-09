import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export async function changeEmail(email: string) {
  const { data, error } = await supabase.auth.updateUser({ email: email });
  if (error) {
    return error.message;
  }
  return null;
}

export async function changePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });
  if (error) {
    return error.message;
  }
  return null;
}
