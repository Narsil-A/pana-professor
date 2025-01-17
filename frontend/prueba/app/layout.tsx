import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import LoginModal from "./components/modals/LoginModal";
import SearchModal from "./components/modals/SearchModal";
import SignupModal from "./components/modals/SignupModal";
import AddClassModal from "./components/modals/AddClassModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClassBooking",
  description: "Platform to book classes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        
        <div className="pt-32">
          {children}
        </div>

        <LoginModal />
        <SearchModal />
        <SignupModal />
        <AddClassModal />
      </body>
    </html>
  );
}