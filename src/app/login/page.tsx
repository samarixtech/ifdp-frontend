"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  LogIn,
  UserPlus,
  Mail,
  Lock,
  ChromeIcon,
  ArrowLeft,
} from "lucide-react";

// --- Utility Components ---
const ThemedButton = ({ children, colorClass, hoverClass, ...props }: any) => (
  <button
    className={`group px-8 py-3 text-base font-bold rounded-xl text-white transition-all duration-300 shadow-lg ${colorClass} ${hoverClass} hover:shadow-2xl hover:scale-[1.02] flex items-center justify-center space-x-2 w-full`}
    {...props}
  >
    {children}
  </button>
);

const InputField = ({ icon: Icon, type, placeholder, ...props }: any) => (
  <div className="relative">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    <input
      type={type}
      placeholder={placeholder}
      className="w-full pl-12 pr-6 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#61a5c2] focus:border-[#61a5c2] transition-all duration-300 text-gray-700 placeholder-gray-400"
      {...props}
    />
  </div>
);

// --- Login/Signup Form Component (unchanged) ---
const LoginForm = ({ primaryBlue, isSignUp, toggleForm }: any) => (
  <motion.div
    key={isSignUp ? "signup" : "login"}
    initial={{ opacity: 0, x: isSignUp ? 100 : -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: isSignUp ? -100 : 100 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
    className="p-8 md:p-12 w-full max-w-lg mx-auto space-y-8"
  >
    <div className="text-center">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
        {isSignUp ? "Create Your Account" : "Welcome Back"}
      </h2>
      <p className="text-gray-500">
        {isSignUp
          ? "Join our global community today."
          : "Sign in to continue to your dashboard."}
      </p>
    </div>

    <div className="space-y-4">
      <InputField icon={Mail} type="email" placeholder="Email Address" />
      <InputField icon={Lock} type="password" placeholder="Password" />
      {isSignUp && (
        <InputField
          icon={Lock}
          type="password"
          placeholder="Confirm Password"
        />
      )}
    </div>

    <div className="space-y-4 pt-2">
      <ThemedButton
        colorClass={`bg-[${primaryBlue}]`}
        hoverClass="hover:bg-[#013f70]"
      >
        {isSignUp ? (
          <>
            <UserPlus className="w-5 h-5" />
            <span>Sign Up</span>
          </>
        ) : (
          <>
            <LogIn className="w-5 h-5" />
            <span>Sign In</span>
          </>
        )}
      </ThemedButton>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-white text-gray-500">OR</span>
        </div>
      </div>

      <button className="group px-8 py-3 text-base font-bold rounded-xl text-gray-700 bg-white border-2 border-gray-200 transition-all duration-300 hover:bg-gray-50 flex items-center justify-center space-x-2 w-full shadow-md">
        <ChromeIcon className="w-5 h-5 text-red-500" />
        <span>Continue with Google</span>
      </button>
    </div>

    <div className="text-center pt-4">
      <p className="text-gray-600">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
        <button
          onClick={toggleForm}
          className={`ml-2 font-bold transition-colors duration-300 text-[#61a5c2] hover:text-[${primaryBlue}]`}
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  </motion.div>
);

// --- Main Page Component ---
const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const primaryBlue = "#014f86";
  const accentBlue = "#61a5c2";

  const toggleForm = () => setIsSignUp(!isSignUp);

  const gridClasses = "grid md:grid-cols-2 min-h-screen overflow-hidden";
  const formOrderClass = isSignUp ? "md:order-1" : "md:order-2";
  const imageOrderClass = isSignUp ? "md:order-2" : "md:order-1";
  const formBgClass =
    "bg-white flex items-center justify-center transition-all duration-700 ease-in-out";

  // Note: The previous imageBgClass for the gradient is no longer needed.
  // We'll apply background image styling directly in the JSX.

  // A placeholder image URL for a tech/future/mission-oriented look
  const imageUrl =
    "https://images.unsplash.com/photo-1536639335969-19c9bfc0a4c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEdSQUZJVFRJfGVufDB8fDB8fHww"; //  - Use a relevant, high-resolution image

  return (
    <div className={gridClasses}>
      {/* Sliding Form Section */}
      <div
        className={`${formBgClass} ${formOrderClass} relative overflow-hidden`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <LoginForm
            key={isSignUp ? "signup-form" : "login-form"}
            primaryBlue={primaryBlue}
            isSignUp={isSignUp}
            toggleForm={toggleForm}
          />
        </AnimatePresence>
      </div>

      {/* Sliding Illustration Section with Real Image */}
      <div
        className={`${imageOrderClass} relative flex items-center justify-center p-8 transition-all duration-700 ease-in-out bg-cover bg-center`}
        style={{ backgroundImage: `url('${imageUrl}')` }}
      >
        {/* Dynamic Image Overlay for better text readability */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            isSignUp ? "bg-gradient-to-l" : "bg-gradient-to-r"
          } from-[${accentBlue}]/70 to-[${primaryBlue}]/70`} // Added transparency for image visibility
        />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isSignUp ? "signup-illustration" : "login-illustration"}
            initial={{ opacity: 0, x: isSignUp ? 200 : -200, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: isSignUp ? -200 : 200, scale: 0.95 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="relative z-10 text-center text-white p-6 space-y-6 max-w-md"
          >
            <UserPlus className="w-16 h-16 mx-auto text-white/90" />
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              {isSignUp ? "Explore Our Vision" : "Join The Mission"}
            </h2>
            <p className="text-xl font-light text-white/80">
              {isSignUp
                ? "Sign in now to access your account and unlock exclusive tools and resources."
                : "Register and discover a new way to innovate and collaborate."}
            </p>

            <button
              onClick={toggleForm}
              className="mt-6 px-7 py-3 text-base font-bold rounded-xl text-white border-2 border-white/50 transition-all duration-300 hover:bg-white/10 hover:border-white/90 shadow-xl flex items-center justify-center space-x-2 mx-auto w-max"
            >
              {isSignUp ? (
                <>
                  <ArrowLeft className="w-5 h-5" />
                  <span>Go to Sign In</span>
                </>
              ) : (
                <>
                  <span>Go to Sign Up</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
