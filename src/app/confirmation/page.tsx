"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function EmailConfirmed() {
  const [counter, setCounter] = useState(5);
  const intervalRef = useRef<any>();
  const router = useRouter();

  const countdown = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(
      () => setCounter((prevCounter) => prevCounter - 1),
      1000
    );
  }, []);

  useEffect(() => {
    countdown();
    const timeout = setTimeout(() => {
      router.push("/login");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [countdown, router]);

  return (
    <>
      <h1>Email confirmed Succesfully</h1>
      <p>Redirecting to home in {counter} seconds.</p>
    </>
  );
}
