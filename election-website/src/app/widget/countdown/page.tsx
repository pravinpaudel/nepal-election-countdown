"use client";
import { Countdown } from "@/components/Countdown";

export default function CountdownWidget() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-blue-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl w-full border border-gray-100">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Nepal Election 2026
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            <time dateTime="2026-03-05">March 5, 2026</time>
          </p>
        </div>
        
        <div className="mb-6">
          <Countdown targetDate="2026-03-05T00:00:00+05:45" />
        </div>
        
        <div className="text-center">
          <a 
            href={process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors inline-flex items-center gap-2"
          >
            <span>Stay informed at</span>
            <span className="font-semibold">{process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, "") || "nepalelection2026.com"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
