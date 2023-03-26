/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../../../../types/supabase";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export function Avatar({ url }: { url: Profiles["avatar_url"] }) {
  const supabase = useSupabaseClient<Database>();
  const [avatarUrl, setAvatarUrl] =
    useState<Profiles["avatar_url"]>("/person.svg");

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    const image = supabase.storage.from("avatars").getPublicUrl(`${url}`);

    setAvatarUrl(image.data.publicUrl);
  }
  return (
    <>
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          backgroundImage: `url(${avatarUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          cursor: "pointer",
          transition: "0.1s all",
        }}
      />
    </>
  );
}
