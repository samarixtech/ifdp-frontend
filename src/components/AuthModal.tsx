"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
  switchMode: (mode: "login" | "signup") => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  mode,
  switchMode,
}: AuthModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const t = useTranslations("authModal");
  // Close modal on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const title = mode === "login" ? t("welcome") : t("createAccount");
  const subtitle = mode === "login" ? t("continue") : t("freeDelivery");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 z-50 bg-[#2C2C2C]/25 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* CENTERED MODAL */}
          <motion.div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            <motion.div
              ref={modalRef} // attach ref here
              className="relative w-full max-w-md p-8 rounded-3xl bg-[#E8F4F1]/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-[#E8F4F1]/20"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-5 top-5 p-2 rounded-full hover:bg-[#E8F4F1]/20 transition duration-200"
              >
                <X className="w-6 h-6 text-gray-800 hover:text-[#B6932F]" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-[#0B5D4E]">
                  {title}
                </h2>
                <p className="text-gray-700 mt-2">{subtitle}</p>
              </div>

              {/* Auth Form */}
              {/* Auth Form */}
              <div className="space-y-5">
                {/* NAME FIELD — Signup Only */}
                {mode === "signup" && (
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-4 rounded-xl border border-[#E8F4F1]/30 bg-[#E8F4F1]/30 backdrop-blur-md 
                 focus:ring-2 focus:ring-[#0B5D4E] outline-none placeholder-gray-500 transition"
                  />
                )}

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-4 rounded-xl border border-[#E8F4F1]/30 bg-[#E8F4F1]/30 backdrop-blur-md 
               focus:ring-2 focus:ring-[#0B5D4E] outline-none placeholder-gray-500 transition"
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-4 rounded-xl border border-[#E8F4F1]/30 bg-[#E8F4F1]/30 backdrop-blur-md 
               focus:ring-2 focus:ring-[#0B5D4E] outline-none placeholder-gray-500 transition"
                />

                <button
                  className="w-full py-3 bg-[#0B5D4E] text-[#E8F4F1] font-bold rounded-xl shadow-lg 
                     hover:shadow-xl hover:bg-[#002a47] transition duration-300 text-lg"
                >
                  {mode === "login" ? "Log In" : "Create Account"}
                </button>

                <p className="text-sm text-center text-gray-700 mt-2">
                  {mode === "login" ? (
                    <>
                      {t("newAccount")}{" "}
                      <button
                        onClick={() => switchMode("signup")}
                        className="text-[#0B5D4E] font-semibold hover:underline"
                      >
                        {t("signup")}
                      </button>
                    </>
                  ) : (
                    <>
                      {t("existingAccount")}{" "}
                      <button
                        onClick={() => switchMode("login")}
                        className="text-[#0B5D4E] font-semibold hover:underline"
                      >
                        {t("login")}
                      </button>
                    </>
                  )}
                </p>
              </div>

              {/* Decorative Gradient Circles */}
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-linear-to-tr from-[#0B5D4E]/60 to-[#61a5c2]/50 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-linear-to-tr from-[#61a5c2]/40 to-[#0B5D4E]/40 blur-3xl pointer-events-none" />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
