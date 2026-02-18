'use client';

import { useState, useEffect } from 'react';

export default function CountdownBanner() {
    const [timeLeft, setTimeLeft] = useState<{
        hours: number;
        minutes: number;
        seconds: number;
        expired: boolean;
    } | null>(null);

    useEffect(() => {
        // Alvo para 3 horas a partir do carregamento
        const targetDate = new Date().getTime() + (3 * 60 * 60 * 1000);

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0, expired: true });
                return;
            }

            setTimeLeft({
                hours: Math.floor((distance / (1000 * 60 * 60))),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
                expired: false,
            });
        };

        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!timeLeft) return null;

    return (
        <div className="bg-gradient-to-r from-primary via-green-500 to-primary bg-[length:200%_100%] animate-gradient-shift py-3 px-4 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="container mx-auto flex flex-col items-center justify-center gap-2 relative z-10">
                <p className="text-sm md:text-base font-semibold text-primary-foreground tracking-wide uppercase text-center">
                    🔴Agenda reta final. Fale com nossa equipe de triagem disponível nos próximos:
                </p>
                <div id="countdown" className="text-lg md:text-xl font-bold text-white tracking-wide">
                    {timeLeft.expired ? (
                        "Tempo esgotado!"
                    ) : (
                        `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
                    )}
                </div>
            </div>
        </div>
    );
}
