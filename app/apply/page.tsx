import { ApplicationForm } from "@/components/ApplicationForm";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CheckCircle2 } from "lucide-react";

export default function ApplyPage() { return <><Navbar /><main className="mx-auto min-h-[calc(100vh-72px)] max-w-6xl px-5 py-14 lg:px-8 lg:py-20"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><section><p className="text-sm font-medium text-blue-300">Your next step</p><h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">Start your InternLaunch application.</h1><p className="mt-5 max-w-md leading-7 text-slate-400">Take a few minutes to tell us about yourself. We’ll review your application and send next steps to your inbox.</p><div className="mt-9 space-y-4">{["Takes less than 5 minutes", "No prior work experience required", "Your details stay private and secure"].map(item => <p key={item} className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 className="size-5 text-blue-400"/>{item}</p>)}</div></section><ApplicationForm /></div></main><Footer /></>; }
