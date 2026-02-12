"use client"

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Timer } from 'lucide-react';

export default function UrgencySection() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 2,
        minutes: 45,
        seconds: 0,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59, hours: prev.hours };
                if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="w-full bg-primary py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white font-bold text-sm uppercase tracking-widest backdrop-blur-sm">
                        <Timer className="w-4 h-4" />
                        Vagas Limitadas
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold text-white font-headline leading-tight max-w-2xl">
                        Agenda limitada para fevereiro – garanta seu horário.
                    </h2>

                    <p className="text-white/80 text-lg md:text-xl max-w-xl font-medium">
                        Consultas online com vagas restritas por semana para garantir a qualidade do seu atendimento.
                    </p>

                    <div className="flex gap-4 md:gap-8">
                        <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[120px] border border-white/20">
                            <span className="text-3xl md:text-5xl font-bold text-white leading-none mb-2">
                                {String(timeLeft.hours).padStart(2, '0')}
                            </span>
                            <span className="text-white/60 text-xs md:text-sm font-bold uppercase tracking-widest">Horas</span>
                        </div>
                        <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[120px] border border-white/20">
                            <span className="text-3xl md:text-5xl font-bold text-white leading-none mb-2">
                                {String(timeLeft.minutes).padStart(2, '0')}
                            </span>
                            <span className="text-white/60 text-xs md:text-sm font-bold uppercase tracking-widest">Minutos</span>
                        </div>
                        <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[120px] border border-white/20">
                            <span className="text-3xl md:text-5xl font-bold text-white leading-none mb-2">
                                {String(timeLeft.seconds).padStart(2, '0')}
                            </span>
                            <span className="text-white/60 text-xs md:text-sm font-bold uppercase tracking-widest">Segundos</span>
                        </div>
                    </div>

                    <Button asChild className="bg-cta hover:bg-accent text-white font-bold text-xl px-12 py-8 h-auto rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 mt-8">
                        <a href="https://wa.me/5511977920368" target="_blank" rel="noopener noreferrer">
                            Garanta sua vaga agora
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
}
