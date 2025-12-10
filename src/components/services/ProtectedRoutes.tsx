"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useLocale from "@/hooks/useLocals";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { country, language } = useLocale();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    if (!token) {
      router.replace("/");
    } else {
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) {
    return <h1>loading</h1>;
  }

  return <>{children}</>;
}
