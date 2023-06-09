import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export function emailValidation(email: string) {
  const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i;
  return expression.test(email);
}

export async function signUp(
  email: string,
  password: string,
  name: string,
  lastName: string
) {
  const data = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${location.origin}/login`,
      data: { name },
    },
  });
  if (data.error) {
    return data;
  }
  const nameRes = await addUserName(data.data.user?.id, name, lastName);
  if (nameRes !== null) {
    return nameRes;
  }
  return null;
}

export async function signIn(email: string, password: string) {
  const data = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return data;
}

export async function signOut() {
  const data = supabase.auth.signOut();

  return data;
}

export async function addUserName(
  name: string | undefined,
  id: string,
  lastName: string
) {
  const data = await supabase
    .from("userName")
    .insert([{ name: name, userId: id, lastName: lastName }]);
  if (data.error) {
    return data;
  }
  return null;
}
