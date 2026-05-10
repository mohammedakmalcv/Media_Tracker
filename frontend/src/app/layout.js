import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Media Tracker",
  description: "Track your Manga, Manhwa, and Games",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <Toaster position="bottom-right" reverseOrder={false} />
        
        {children}
      </body>
    </html>
  );
}