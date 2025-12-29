"use client";
import Image from "next/image";
import { Countdown } from "@/components/Countdown";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, CheckCircle2, AlertCircle, Loader2, Info, Shield, Users } from "lucide-react";

// Email validation utility
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error" | "info" | null; text: string }>({ 
    type: null, 
    text: "" 
  });

  // Client-side email validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !isValidEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setMessage({ type: null, text: "" });
    setEmailError("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage({
          type: "success",
          text: data.message || "Successfully subscribed! Please check your email to verify your subscription.",
        });
        setEmail("");
      } else {
        setMessage({
          type: "error",
          text: data.error || data.message || "Failed to subscribe. Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Top Navigation */}
      <header>
        <nav 
          className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
          aria-label="Main navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="Nepal Election 2026 Logo" 
                width={40} 
                height={40}
                className="object-contain"
              />
              <span className="text-lg sm:text-xl font-semibold text-gray-900">Nepal Election 2026</span>
            </div>
            <nav className="flex items-center gap-4" aria-label="Secondary navigation">
              <a 
                href="#about" 
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded-md px-2 py-1"
              >
                About
              </a>
              <a 
                href="#subscribe" 
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded-md px-2 py-1"
              >
                Subscribe
              </a>
            </nav>
          </div>
        </nav>
      </header>

      <main className="min-h-screen bg-white">

        {/* Hero Section - Full Screen Countdown */}
        <section 
          className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-12"
          aria-label="Election countdown"
        >
          <div className="max-w-6xl w-full mx-auto text-center space-y-8 sm:space-y-12">
            {/* Logo - Large and Centered */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 opacity-20 blur-3xl rounded-full" aria-hidden="true"></div>
                <Image 
                  src="/logo.png" 
                  alt="Nepal Election 2026 Official Logo" 
                  width={180} 
                  height={180}
                  className="relative object-contain w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44"
                  priority
                />
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-red-600 via-red-500 to-blue-600 bg-clip-text text-transparent">
                  Election Day
                </span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 font-light">
                <time dateTime="2026-03-05">March 5, 2026</time>
              </p>
            </div>

            {/* Countdown - Hero Style */}
            <div className="py-8 sm:py-12" role="timer" aria-live="polite" aria-atomic="true">
              <Countdown targetDate="2026-03-05T00:00:00+05:45" />
            </div>

            {/* Subtext */}
            <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed px-4">
              Every vote shapes our future. Stay informed with daily reminders and important election updates.
            </p>
          </div>
        </section>

        {/* Newsletter Subscription Section */}
        <section id="subscribe" className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-blue-500 mb-6" aria-hidden="true">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Stay Informed
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                Receive daily countdown reminders and important election updates directly to your inbox
              </p>
            </div>

            {/* Subscription Card */}
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
              <form onSubmit={handleSubscribe} className="space-y-6" noValidate>
                <div className="space-y-2">
                  <label htmlFor="email-input" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="flex-grow">
                      <Input
                        id="email-input"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email (e.g., voter@example.com)"
                        className={`h-12 sm:h-14 text-base px-4 sm:px-6 border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 w-full ${
                          emailError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                        }`}
                        disabled={isLoading}
                        required
                        aria-invalid={!!emailError}
                        aria-describedby={emailError ? "email-error" : "email-help"}
                      />
                      {emailError && (
                        <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                          {emailError}
                        </p>
                      )}
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="h-12 sm:h-14 px-8 sm:px-10 bg-gray-900 hover:bg-gray-800 text-white font-medium text-base focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 w-full sm:w-auto"
                      disabled={isLoading || !!emailError}
                      aria-label="Subscribe to election updates"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        "Subscribe"
                      )}
                    </Button>
                  </div>
                  {!emailError && (
                    <p id="email-help" className="text-xs text-gray-500 mt-1">
                      We'll send you a verification email to confirm your subscription.
                    </p>
                  )}
                </div>

                {/* Message Display */}
                {message.type && (
                  <div 
                    className={`flex items-start gap-3 p-4 sm:p-5 rounded-xl border ${
                      message.type === "success" 
                        ? "bg-green-50 text-green-900 border-green-200" 
                        : message.type === "error"
                        ? "bg-red-50 text-red-900 border-red-200"
                        : "bg-blue-50 text-blue-900 border-blue-200"
                    }`}
                    role="alert"
                    aria-live="polite"
                  >
                    {message.type === "success" ? (
                      <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    ) : (
                      <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    )}
                    <p className="text-sm font-medium flex-grow">{message.text}</p>
                  </div>
                )}
              </form>

              {/* Privacy Notice */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <p>
                    <strong className="font-medium text-gray-900">Privacy Commitment:</strong> We respect your privacy. Your email will only be used for election updates. No spam, no third-party sharing. You can{" "}
                    <a href="#" className="text-gray-900 underline hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 rounded">
                      unsubscribe anytime
                    </a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 sm:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                About This Initiative
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Empowering citizens through information and civic engagement
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Mission */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Info className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h3>
                <p className="text-gray-600">
                  To keep citizens informed and engaged in Nepal's democratic process through timely reminders and reliable election information.
                </p>
              </div>

              {/* Community */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Community-Driven</h3>
                <p className="text-gray-600">
                  This is a non-partisan, community initiative created by citizens for citizens to promote voter awareness and participation.
                </p>
              </div>

              {/* Transparency */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparent & Secure</h3>
                <p className="text-gray-600">
                  Open-source project with secure data handling. We only collect emails for notifications and never share your information.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="Nepal Election 2026 Logo" 
                width={32} 
                height={32}
                className="object-contain"
              />
              <span className="text-sm text-gray-600 text-center sm:text-left">
                © {new Date().getFullYear()} Nepal Election Countdown. All rights reserved.
              </span>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-sm text-gray-500 text-center md:text-right">
                A community-driven initiative to keep citizens informed 🇳🇵
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <a href="#about" className="hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 rounded px-1">About</a>
                <span aria-hidden="true">•</span>
                <a href="#subscribe" className="hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 rounded px-1">Subscribe</a>
                <span aria-hidden="true">•</span>
                <span>Non-partisan</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
