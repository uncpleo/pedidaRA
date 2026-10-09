import React, { useState, useEffect } from 'react';

// Target instant: October 16, 2026 at 15:00:00 (America/Lima UTC-05:00)
const TARGET_ISO_STRING = '2026-10-16T15:00:00-05:00';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft());

  function calculateTimeLeft(): TimeLeft {
    const targetTime = new Date(TARGET_ISO_STRING).getTime();
    const now = Date.now();
    const difference = targetTime - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isCompleted: true,
      };
    }

    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
      isCompleted: false,
    };
  }

  useEffect(() => {
    // Immediate calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clean up on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  if (timeLeft.isCompleted) {
    return (
      <div className="py-6 px-4 my-4 text-center bg-[#FDF9F2] border border-[#C5A246]/40 rounded-xl max-w-md mx-auto shadow-sm">
        <p className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#8B6E27] tracking-wide">
          ¡Hoy es nuestro gran día! ❤️
        </p>
        <p className="font-montserrat text-xs sm:text-sm text-[#64605E] mt-2 tracking-widest uppercase">
          Celebrando nuestro amor
        </p>
      </div>
    );
  }

  const items = [
    { label: 'DÍAS', value: timeLeft.days.toString() },
    { label: 'HORAS', value: formatNumber(timeLeft.hours) },
    { label: 'MINUTOS', value: formatNumber(timeLeft.minutes) },
    { label: 'SEGUNDOS', value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <div className="w-full max-w-md mx-auto my-6 px-2">
      <p className="font-cormorant italic text-base sm:text-lg text-[#64605E] mb-5 tracking-wide text-center">
        Cada segundo nos acerca a un momento inolvidable.
      </p>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3.5 bg-[#FFFDF9]/90 border border-[#C5A246]/50 rounded-lg shadow-[0_2px_8px_rgba(197,162,70,0.08)] relative overflow-hidden group transition-transform duration-300 hover:border-[#C5A246]"
          >
            {/* Subtle inner corner accent */}
            <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-[#C5A246]/40 pointer-events-none" />
            <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-[#C5A246]/40 pointer-events-none" />

            <span className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-semibold text-[#3D3A39] tabular-nums leading-none tracking-tight">
              {item.value}
            </span>
            <span className="font-montserrat text-[9px] sm:text-[11px] font-medium tracking-widest text-[#8C847E] mt-1.5 uppercase">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
