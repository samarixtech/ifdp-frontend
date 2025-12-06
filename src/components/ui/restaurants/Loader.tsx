"use client";

export default function Loader({ count = 4 }) {
  return (
    <div className="py-6">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-2">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="
              rounded-xl 
              bg-[#E6F1EF] 
              relative 
              overflow-hidden 
              shrink-0
              w-52 h-36                /* Mobile */
              sm:w-60 sm:h-40          /* Tablet */
              md:w-64 md:h-44          /* Desktop */
            "
          >
            {/* Shimmer */}
            <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-[#E6F1EF] via-[#f2faf8] to-[#E6F1EF] opacity-60" />
          </div>
        ))}
      </div>

      <p className="text-gray-700 mt-4 text-center font-medium">
        Loading restaurants...
      </p>
    </div>
  );
}
