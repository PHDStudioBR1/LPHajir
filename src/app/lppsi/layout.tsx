import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LPSI | Atendimento Médico Online - Dra. Hajir Abdalla',
  description:
    'Consultas médicas por vídeo com abordagem acolhedora e explicativa. Agende sua teleconsulta e comece sua jornada de cuidado.',
};

export default function LppsiLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
