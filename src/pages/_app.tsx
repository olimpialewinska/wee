import "@/styles/globals.css";
import "@/styles/login.css";

import type { AppProps } from "next/app";
import "typeface-roboto";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
