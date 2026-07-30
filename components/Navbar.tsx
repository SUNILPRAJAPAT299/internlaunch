"use client";

import Link from "next/link";
import { Menu, Rocket, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/#program", label: "Program" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#stories", label: "Success stories" },
  { href: "/internship", label: "Internship details" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-white/7 bg-[#0c1426]/75 backdrop-blur-xl">
    <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight"><span className="grid size-8 place-items-center rounded-lg bg-blue-500 text-white shadow-lg shadow-blue-500/30"><Rocket className="size-4" /></span>Intern<span className="text-blue-400">Launch</span></Link>
      <div className="hidden items-center gap-7 text-sm text-slate-300 md:flex">{links.map(link => <Link key={link.href} href={link.href} className="transition hover:text-white">{link.label}</Link>)}</div>
      <Link href="/apply" className="hidden rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400 md:block">Apply now</Link>
      <button onClick={() => setOpen(!open)} aria-label="Toggle navigation" className="grid size-9 place-items-center rounded-lg border border-white/10 text-slate-200 md:hidden">{open ? <X className="size-5"/> : <Menu className="size-5"/>}</button>
    </nav>
    {open && <div className="border-t border-white/8 bg-[#0c1426] px-5 pb-5 md:hidden"><div className="flex flex-col gap-3 pt-4">{links.map(link => <Link onClick={() => setOpen(false)} key={link.href} href={link.href} className="text-sm text-slate-300">{link.label}</Link>)}<Link onClick={() => setOpen(false)} href="/apply" className="mt-1 rounded-lg bg-blue-500 px-4 py-2 text-center text-sm font-semibold text-white">Apply now</Link></div></div>}
  </header>;
}
