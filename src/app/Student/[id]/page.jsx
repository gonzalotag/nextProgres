'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import PerfilEstudiante from '@/components/StudentPerfil';

export default function StudentProfilePage() {
  const router = useRouter();
  const params = useParams(); // Utiliza useParams para obtener los parámetros dinámicos
  const { id } = params; // Desempaqueta `id` del objeto `params`

  return (
    <PerfilEstudiante
      studentId={id}
      onBack={() => router.push('/Student')} // Redirige a la lista de estudiantes
    />
  );
}
