import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../lib/database.types";
import { v4 as uuidv4 } from "uuid";

const supabase = createClientComponentClient<Database>();

export async function sendFile(
  convId: number | undefined,
  fileList: File[],
  senderId: string | null
) {
  console.log("loading");
  if (!convId || !senderId) return false;
  fileList.forEach(async (file) => {
    const isImage = file.type.includes("image");
    const type = isImage ? "image" : "file";
    const name = uuidv4();
    const { data, error } = await supabase.storage
      .from("chat")
      .upload(`${convId}/${type}/${name + "()" + file.name}`, file);

    if (error) {
      console.log(error);
      return false;
    }
    const { data: data2, error: error2 } = await supabase
      .from("messages")
      .insert([
        {
          convId: convId,
          senderId: senderId,
          value: `${data.path}`,
          type: type,
        },
      ]);
  });
  console.log("done");

  return true;
}
