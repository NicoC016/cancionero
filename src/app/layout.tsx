import type { Metadata } from "next";
import "/styles/globals.css";
import NavBar from "@shared/navbar";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Cancionero",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="es">
      <body>
        <div>
          <NavBar></NavBar>
        </div>
        <Suspense>
          {children}
        </Suspense>
        <span className="absolute w-full text-center text-white text-sm mt-10">NEC Studio. Todos los derechos reservados.</span>
      </body>
    </html>
  );
}
