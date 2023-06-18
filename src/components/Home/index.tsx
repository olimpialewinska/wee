"use client";
import { User } from "@supabase/auth-helpers-nextjs";
import { isMobile } from "mobile-device-detect";
import { HomeMobile } from "./HomeMobile";
import { HomeDesktop } from "./HomeDesktop";
import { observer } from "mobx-react-lite";

export const Home = observer(function Home() {
  if (isMobile) {
    return <HomeMobile />;
  }

  return <HomeDesktop />;
});
