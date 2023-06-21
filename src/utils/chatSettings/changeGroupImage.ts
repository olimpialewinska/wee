import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";
import { v4 } from "uuid";
import { addMessage } from "./changeUserNickname";

const supabase = createClientComponentClient<Database>();

export async function changeGroupImage(id: number | undefined, image: File) {
  const imageName = v4();

  const { data, error } = await supabase.storage
    .from("groupImage")
    .upload(`groupImage/${id}/${imageName}`, image);

  if (error) {
    return null;
  }

  const path = data.path;

  const { data: message, error: messageError } = await supabase
    .from("groupDetails")
    .update({ imageName: path })
    .eq("convId", id);

  if (error) {
    return null;
  }

  const link = supabase.storage.from("userImage").getPublicUrl(path);

  await addMessage(id, `Group image changed`);
  console.log(link);
  return link.data.publicUrl;
}
