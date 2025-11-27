
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatWidget from "./ai/ChatWidget";

export default function NavbarHider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout =
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/RestaurantDashboard");

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
      {!hideLayout && <ChatWidget />}
    </>
  );
}
