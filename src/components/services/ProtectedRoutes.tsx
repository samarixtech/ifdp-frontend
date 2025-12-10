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
  const [isChecking, setIsChecking] = useState(true); // ✅ track token check

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    if (!token) {
      router.replace("/"); // redirect if no token
    } else {
      setIsChecking(false); // allow rendering if token exists
    }
  }, [router]);

  // ✅ Block rendering until token is checked
  if (isChecking) {
    return <h1>loading</h1>; // or a loader component if you want
  }

  return <>{children}</>;
}
