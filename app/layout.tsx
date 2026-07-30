import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InternLaunch | Build your career with real experience",
  description: "A guided software development internship built for ambitious students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark h-full scroll-smooth antialiased"
    >
      <body className="min-h-full flex flex-col">{children}
<footer className="border-t border-zinc-800 bg-black py-6 text-center text-sm text-zinc-500">
  Built with ❤️ by <span className="font-semibold text-zinc-300">
  Sunil Kumar 
  </span>
</footer>


<footer className="mt-16 border-t border-zinc-800 bg-black py-6">
  <div className="mx-auto max-w-7xl px-6 text-center text-sm text-zinc-400">
    Built with ❤️ by
    <span className="ml-1 font-semibold text-white">
      Sunil Kumar Prajapat
    </span>
    <p className="mt-2 text-zinc-500">
      InternLaunch v1.0
    </p>
  </div>
</footer>

</body>
    </html>
  );
}
