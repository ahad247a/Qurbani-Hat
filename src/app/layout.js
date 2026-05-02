import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "QurbaniHat - Livestock Booking Platform",
  description: "Find your best Qurbani animal online. Browse, compare, and book your perfect Qurbani animal with ease on QurbaniHat.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        {/* Main content area with padding to prevent overlap with fixed navbar */}
        <main className="pt-28 grow"> 
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
