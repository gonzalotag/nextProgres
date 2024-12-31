'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import PerfilEstudiante from '@/components/StudentPerfil';

export default function StudentProfilePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params; 

  return (
    <PerfilEstudiante
      studentId={id}
      onBack={() => router.push('/Student')} 
    />
  );
}
