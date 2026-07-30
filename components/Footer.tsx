import Link from "next/link";
import { Circle, Rocket } from "lucide-react";

export function Footer() {
  return <footer className="border-t border-white/8 bg-[#0a1020]">
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
      <div className="lg:col-span-2"><Link href="/" className="flex items-center gap-2 text-lg font-semibold"><span className="grid size-8 place-items-center rounded-lg bg-blue-500 text-white"><Rocket className="size-4" /></span>Intern<span className="text-blue-400">Launch</span></Link><p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">A focused launchpad for students ready to turn potential into practical, portfolio-ready experience.</p></div>
      <div><p className="font-medium">Explore</p><div className="mt-4 grid gap-3 text-sm text-slate-400"><Link href="/internship">Internship details</Link><Link href="/apply">Apply now</Link><Link href="/#faq">FAQs</Link></div></div>
      <div><p className="font-medium">Stay connected</p><div className="mt-4 flex gap-3 text-slate-400"><Circle className="size-4 fill-current"/><Circle className="size-4 fill-current"/><Circle className="size-4 fill-current"/></div></div>
    </div><div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-white/8 px-5 py-5 text-xs text-slate-500 sm:flex-row sm:justify-between lg:px-8"><span>© 2026 InternLaunch. All rights reserved.</span><span>Built for the next generation of builders.</span></div>
  </footer>;
}
