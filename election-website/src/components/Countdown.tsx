"use client";
import { useEffect, useState } from "react";

type Props = {
  targetDate: string;
};

function getTimeLeft(targetDate: string) {
  const target = new Date(targetDate).getTime();
  const diff = Math.max(0, target - Date.now());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: diff === 0 };
}

export function Countdown({ targetDate }: Props) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  if (timeLeft.isPast) {
    return <div className="text-xl font-semibold text-red-600">Event has passed</div>;
  }

  return (
    <div className="flex gap-4 items-center justify-center">
      <TimeBlock label="Days" value={timeLeft.days} />
      <TimeBlock label="Hours" value={timeLeft.hours} />
      <TimeBlock label="Minutes" value={timeLeft.minutes} />
      <TimeBlock label="Seconds" value={timeLeft.seconds} />
    </div>
  );
}

function TimeBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center bg-white/60 backdrop-blur-sm px-4 py-3 rounded-lg shadow-sm border border-gray-200">
      <div className="text-2xl font-bold text-slate-900 tabular-nums">{String(value).padStart(2, "0")}</div>
      <div className="text-xs text-slate-600 mt-1">{label}</div>
    </div>
  );
}

export default Countdown;
