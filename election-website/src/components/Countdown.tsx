"use client";
import { useEffect, useState } from "react";

type Props = {
  targetDate: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
};

function getTimeLeft(targetDate: string): TimeLeft {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: diff === 0 };
}

export function Countdown({ targetDate }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Hydration fix - only render on client
  useEffect(() => {
    setIsClient(true);
    setTimeLeft(getTimeLeft(targetDate));
  }, [targetDate]);

  useEffect(() => {
    if (!isClient) return;

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isClient]);

  // Loading skeleton
  if (!isClient || !timeLeft) {
    return (
      <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 items-center justify-center" aria-label="Loading countdown">
        {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
          <div key={label} className="flex flex-col items-center min-w-[100px] sm:min-w-[120px] md:min-w-[140px]">
            <div className="relative mb-4">
              <div className="relative bg-gray-100 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 animate-pulse">
                <div className="h-16 sm:h-20 md:h-24 w-16 sm:w-20 md:w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  }

  if (timeLeft.isPast) {
    return (
      <div 
        className="text-xl sm:text-2xl font-semibold text-red-600 p-6 bg-red-50 rounded-xl border-2 border-red-200"
        role="status"
        aria-live="polite"
      >
        The election day has passed
      </div>
    );
  }

  return (
    <div 
      className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 items-center justify-center"
      aria-label={`Time until election: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
    >
      <TimeBlock label="Days" value={timeLeft.days} ariaLabel={`${timeLeft.days} days remaining`} />
      <Separator />
      <TimeBlock label="Hours" value={timeLeft.hours} ariaLabel={`${timeLeft.hours} hours remaining`} />
      <Separator />
      <TimeBlock label="Minutes" value={timeLeft.minutes} ariaLabel={`${timeLeft.minutes} minutes remaining`} />
      <Separator />
      <TimeBlock label="Seconds" value={timeLeft.seconds} ariaLabel={`${timeLeft.seconds} seconds remaining`} />
    </div>
  );
}

function Separator() {
  return (
    <div className="hidden sm:flex flex-col gap-2" aria-hidden="true">
      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
    </div>
  );
}

function TimeBlock({ label, value, ariaLabel }: { label: string; value: number; ariaLabel: string }) {
  const [prevValue, setPrevValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setIsAnimating(true);
      setPrevValue(value);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  return (
    <div 
      className="flex flex-col items-center min-w-[100px] sm:min-w-[120px] md:min-w-[140px]"
      aria-label={ariaLabel}
      role="timer"
    >
      <div className="relative mb-3 sm:mb-4">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-blue-500/20 blur-2xl rounded-3xl transition-opacity duration-300"
          aria-hidden="true"
          style={{ opacity: isAnimating ? 1 : 0.5 }}
        ></div>
        <div 
          className={`relative bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-gray-100 p-4 sm:p-6 md:p-8 transition-transform duration-300 ${
            isAnimating ? "scale-105" : "scale-100"
          }`}
        >
          <div 
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent tabular-nums"
            aria-hidden="true"
          >
            {String(value).padStart(2, "0")}
          </div>
        </div>
      </div>
      <div 
        className="text-xs sm:text-base md:text-lg font-medium text-gray-500 uppercase tracking-wider"
        aria-hidden="true"
      >
        {label}
      </div>
    </div>
  );
}

export default Countdown;
