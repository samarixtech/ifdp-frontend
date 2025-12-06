"use client";

export default function GPSLoader() {
  return (
    <div className="flex flex-col items-center py-10">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute w-full h-full rounded-full border-2 border-[#0B5D4E] opacity-30 animate-ping"></div>
        <div className="absolute w-20 h-20 rounded-full border-2 border-[#0B5D4E] opacity-50 animate-pulse"></div>
        <div className="w-6 h-6 rounded-full bg-[#0B5D4E] shadow-lg animate-pulse"></div>
      </div>

      <p className="text-gray-700 mt-4 text-lg font-medium">
        Detecting your location…
      </p>
      <p className="text-gray-500 text-sm">
        Please wait while we scan your area
      </p>
    </div>
  );
}
