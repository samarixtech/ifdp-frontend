"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import ChatWidget from "./ChatWidget";

export default function ChatWidgetPortal() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(<ChatWidget />, document.body);
}
