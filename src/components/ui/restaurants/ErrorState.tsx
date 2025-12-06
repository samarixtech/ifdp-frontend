"use client";

import { CircleOff } from "lucide-react";

export default function ErrorState({ message, onRetry }: any) {
  return (
    <div className="text-center py-12">
      <div className="w-15 h-15 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center border border-red-200 shadow-sm">
        <CircleOff className="text-red-600" />
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Something went wrong
      </h3>

      <p className="text-gray-600 mb-4">{message}</p>

      <button
        onClick={onRetry}
        className="bg-[#0B5D4E] hover:bg-[#084d41] text-white px-6 py-2 rounded-full shadow transition"
      >
        Retry
      </button>
    </div>
  );
}
