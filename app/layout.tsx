import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InternLaunch | Build your career with real experience",
  description: "A guided software development internship built for ambitious students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}
