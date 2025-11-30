"use client";
import Image from "next/image";
import { Countdown } from "@/components/Countdown";
import { useState } from "react";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    console.log("Subscribed:", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-blue-50 via-white to-blue-100 text-center px-6 py-12">
      {/* Header with Logo */}
      <header className="flex flex-col items-center mb-10">
        <Image
          src="/logo.png"
          alt="NepaleseInTech Logo"
          width={500}
          height={500}
          className="mb-4"
        />
        <h1 className="text-4xl md:text-6xl font-bold text-blue-700">
          Nepal Election 2025
        </h1>
        <p className="text-gray-700 mt-3 text-lg">
          Empowering citizens through information - Stay tuned for updates.
        </p>
      </header>

      {/* Countdown Section */}
      <section className="flex flex-col items-center justify-center mb-10">
        <Countdown targetDate="2025-11-25T00:00:00Z" />
        <p className="text-blue-600 font-semibold text-xl mt-4">
          Stay Tuned for the Big Day!
        </p>
      </section>

      {/* Email Subscription Section */}
      <section className="w-full max-w-md mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">
          Get Daily Election Reminders
        </h2>
        {submitted ? (
          <p className="text-green-600 font-medium">
            Thanks for subscribing! You’ll receive updates soon.
          </p>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="text-sm text-gray-500">
        © {new Date().getFullYear()} Nepal Election Website | Community-Driven Project 🇳🇵
      </footer>
    </main>
  );
}
