'use client'

import '@/styles/globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import { ImageProvider } from '../contexts/ImageContext';
import NavbarAdmin from "@/components/NavbarAdmin"
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <AuthProvider>
      <ImageProvider>
        <html lang="es">
          <body>
            <div className="flex flex-col min-h-screen">
              {/* Mostrar el NavbarAdmin solo si estamos en el prefijo de Admin */}
              {pathname.startsWith('/Admin') && <NavbarAdmin />}
              {pathname.startsWith('/Classes') && <NavbarAdmin />}
              {pathname.startsWith('/AddExercice') && <NavbarAdmin />}

              <main className="flex-1">{children}</main>
            </div>
          </body>
        </html>
      </ImageProvider>
    </AuthProvider>
  );
}
