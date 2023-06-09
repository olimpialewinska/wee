"use client";
import { User } from "@supabase/auth-helpers-nextjs";
import { isMobile } from "mobile-device-detect";
import { HomeMobile } from "./HomeMobile";
import { HomeDesktop } from "./HomeDesktop";

export function Home({ user }: { user: User }) {
  if (isMobile) {
    return <HomeMobile user={user} />;
  }

  return <HomeDesktop user={user} />;
}
