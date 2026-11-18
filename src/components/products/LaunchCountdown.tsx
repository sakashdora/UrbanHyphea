import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function LaunchCountdown() {
  // Target date set to 91 days from now, or calculated live
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 91,
    hours: 23,
    minutes: 59,
    seconds: 30,
  });

  useEffect(() => {
    // Target date: 91 days from initial mount
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 91);
    targetDate.setHours(targetDate.getHours() + 23);
    targetDate.setMinutes(targetDate.getMinutes() + 59);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'Hours', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'Minutes', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'Seconds', value: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <div className="w-full max-w-md p-4 sm:p-5 rounded-2xl bg-white/85 backdrop-blur-md border border-[#e5e7eb] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
      {/* Header with decorative side lines */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <span className="w-6 sm:w-10 h-px bg-[#a7c957]/60" />
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0b5e1e]">
          Launch Countdown
        </span>
        <span className="w-6 sm:w-10 h-px bg-[#a7c957]/60" />
      </div>

      {/* 4-Column Number Grid with Separator Lines */}
      <div className="grid grid-cols-4 divide-x divide-[#e5e7eb]">
        {timeUnits.map((unit) => (
          <div key={unit.label} className="text-center px-1 sm:px-2">
            <span className="font-display text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0b5e1e] leading-none block">
              {unit.value}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-[#6b7280] uppercase tracking-wider block mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
