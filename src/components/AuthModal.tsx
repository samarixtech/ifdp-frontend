"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
// import axios from "axios";
import api from "./services/api";
import { toast } from "react-hot-toast"; // ⬅️ Toast import

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
  switchMode: (mode: "login" | "signup") => void;
  onLoginSuccess: () => void; // <--- ADDED: Callback for successful login
}

export default function AuthModal({
  isOpen,
  onClose,
  mode,
  switchMode,
  onLoginSuccess, // <--- ACCEPTED AS PROP
}: AuthModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const t = useTranslations("authModal");

  useEffect(() => {
    setEmail("");
    setPassword("");
    setPhone("");
    setLoading(false);
  }, [isOpen, mode]);

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

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "signup") {
      // REGISTER
      const payload = { email, password, role: "user", phone };

      try {
        const response = await api.post("/auth/register", payload);
        console.log("Registration successful:", response.data);

        toast.success("Registration successful! You can now log in."); // ⬅️ Toast

        switchMode("login");
      } catch (error: any) {
        if (error.response) {
          toast.error(
            error.response.data.message ||
              "Registration failed. Email may already be in use."
          ); // ⬅️ Toast
        } else {
          toast.error("Network error. Please try again."); // ⬅️ Toast
        }
      } finally {
        setLoading(false);
      }
    } else {
      // LOGIN
      const payload = { email, password, role: "user" };

      try {
        const response = await api.post("/auth/login", payload);
        console.log("Login successful:", response.data);

        const { accessToken, refreshToken, user }: any = response.data;

        sessionStorage.setItem("authToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        sessionStorage.setItem("user", JSON.stringify(user));

        toast.success(`Welcome back, ${user.email || "User"}!`); // ⬅️ Toast

        onLoginSuccess(); // <--- CRITICAL: Notify Header of success
        onClose();
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.message || "Invalid credentials."); // ⬅️ Toast
        } else {
          toast.error("Network error. Please try again."); // ⬅️ Toast
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const title = mode === "login" ? t("welcome") : t("createAccount");
  const subtitle = mode === "login" ? t("continue") : t("freeDelivery");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-[#2C2C2C]/25 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            <motion.div
              ref={modalRef}
              className="relative w-full max-w-md p-8 rounded-3xl bg-[#E8F4F1]/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-[#E8F4F1]/20"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <button
                onClick={onClose}
                className="absolute right-5 top-5 p-2 rounded-full hover:bg-[#E8F4F1]/20 transition duration-200"
              >
                <X className="w-6 h-6 text-gray-800 hover:text-[#B6932F]" />
              </button>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-[#0B5D4E]">
                  {title}
                </h2>
                <p className="text-gray-700 mt-2">{subtitle}</p>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-5">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-4 rounded-xl border border-[#E8F4F1]/30 bg-[#E8F4F1]/30 backdrop-blur-md 
                 focus:ring-2 focus:ring-[#0B5D4E] outline-none placeholder-gray-500 transition"
                />

                {mode === "signup" && (
                  <input
                    type="tel"
                    placeholder="Phone Number (e.g., 9876543210)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full p-4 rounded-xl border border-[#E8F4F1]/30 bg-[#E8F4F1]/30 backdrop-blur-md 
                 focus:ring-2 focus:ring-[#0B5D4E] outline-none placeholder-gray-500 transition"
                  />
                )}

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full p-4 rounded-xl border border-[#E8F4F1]/30 bg-[#E8F4F1]/30 backdrop-blur-md 
                 focus:ring-2 focus:ring-[#0B5D4E] outline-none placeholder-gray-500 transition"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#0B5D4E] text-[#E8F4F1] font-bold rounded-xl shadow-lg 
                     hover:shadow-xl hover:bg-[#002a47] transition duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? mode === "login"
                      ? "Logging In..."
                      : "Signing Up..."
                    : mode === "login"
                    ? "Log In"
                    : "Create Account"}
                </button>

                <p className="text-sm text-center text-gray-700 mt-2">
                  {mode === "login" ? (
                    <>
                      {t("newAccount")}{" "}
                      <button
                        type="button"
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
                        type="button"
                        onClick={() => switchMode("login")}
                        className="text-[#0B5D4E] font-semibold hover:underline"
                      >
                        {t("login")}
                      </button>
                    </>
                  )}
                </p>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
