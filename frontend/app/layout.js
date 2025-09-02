// server component — no "use client" here
import "./globals.css";
import ClientProviders from "../components/ClientProviders";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Expense Tracker",
  description: "Track your expenses smartly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        
        <ClientProviders>
          {/* <Navbar/> */}
          <main className="content">{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}
