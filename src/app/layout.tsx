import type { Metadata } from "next";
import "../../styles/globals.css";
import { Suspense } from "react";
import NavBar from "@/shared/navbar";

export const metadata: Metadata = {
  title: "Cancionero",
};


export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="es">
      <body>
        <Suspense>
          <NavBar></NavBar>
          {children}
          <span className="absolute w-full text-center text-black text-sm mt-10">NEC Studio. Todos los derechos reservados.</span>
        </Suspense>
      </body>
    </html>
  );
}
