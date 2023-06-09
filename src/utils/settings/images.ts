import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export async function uploadImage(image: File, id: string) {
  const name = await checkImageExists(id);

  if (name !== null) {
    await deleteOldImage(id, name);
  }
  const path = await addImageToStorage(id, image);

  if (name === null) {
    const { data, error } = await supabase
      .from("images")
      .insert([{ userId: id, path: `${path}`, name: `${image.name}` }]);

    if (error) {
      return error.message;
    }
  }
  const { data, error } = await supabase
    .from("images")
    .update({ path: `${path}`, name: `${image.name}` })
    .eq("userId", id);

  if (error) {
    return error.message;
  }

  return;
}

export async function checkImageExists(id: string) {
  const { data, error } = await supabase
    .from("images")
    .select("name")
    .eq("userId", id)
    .limit(1);
  if (error) {
    return error.message;
  }
  if (data.length > 0) {
    return data[0].name;
  }
  return null;
}

export async function addImageToStorage(id: string, image: File) {
  const { data, error } = await supabase.storage
    .from("userImage")
    .upload(`${id}/${image.name}`, image);
  if (error) {
    return error;
  }
  return data.path;
}

export async function deleteOldImage(id: string, name: string) {
  const { data, error } = await supabase.storage
    .from("userImage")
    .remove([`${id}/${name}`]);

  return data;
}

export async function getImage(userId: string) {
  const { data, error } = await supabase
    .from("images")
    .select("name")
    .eq("userId", userId)
    .limit(1);
  if (error) {
    return error.message;
  }
  if (data.length === 0) {
    return null;
  }
  const path = supabase.storage
    .from("userImage")
    .getPublicUrl(`${userId}/${data[0].name}`);

  return path.data.publicUrl;
}
