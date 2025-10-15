// src/app/layout.tsx

import type { Metadata } from "next";
// Importujemy używane fonty (zakładam, że są zainstalowane)
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// Importujemy stworzony wcześniej komponent nawigacji

// Konfiguracja fontów
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Piłkarski Magazyn  | Newsy, Analizy i Wyniki",
  description:
    "Najświeższe wiadomości, dogłębne analizy i statystyki z najważniejszych lig i turniejów piłkarskich na świecie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
