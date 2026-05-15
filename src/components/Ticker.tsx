import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

export default function Ticker() {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 22,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(targetDate.getHours() + 14);
    targetDate.setMinutes(targetDate.getMinutes() + 22);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-[#7a2c00] via-brand-orange to-[#7a2c00] py-3 px-4 relative z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-white font-bold uppercase text-sm sm:text-base tracking-wider text-center">
        <Zap className="mr-2" size={20} fill="currentColor" />
        Vagas limitadas! Próxima turma fecha em: {timeLeft.days} dias {timeLeft.hours} horas {timeLeft.minutes} min {timeLeft.seconds}s
      </div>
    </div>
  );
}
