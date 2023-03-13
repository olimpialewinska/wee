import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { RegisterView } from "@/components/Register";

export default function Register() {
  return (
    <>
      <Navbar />

      <RegisterView />
    </>
  );
}
