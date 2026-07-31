"use client";



import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import {
  CheckCircle2,
  Phone,
  MessageCircle,
  FileText,
  Award,
  Home,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

function SuccessContent() {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("applicationId");

  const whatsapp =
    "https://wa.me/917877025883?text=Hello%20InternLaunch%20Team,%20I%20have%20completed%20my%20%E2%82%B93,000%20registration%20payment.%20I%20am%20sending%20my%20payment%20screenshot%20for%20verification.";

  return (
    <>
      <Navbar />

      <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-6 py-14">

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl rounded-3xl border border-blue-500/20 bg-[#111b30]/90 p-8 shadow-2xl"
        >

          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20">
            <CheckCircle2 className="h-14 w-14 text-green-400" />
          </div>

          <h1 className="text-center text-4xl font-bold text-white">
            Registration Submitted Successfully 🎉
          </h1>

          <p className="mt-4 text-center text-slate-400">
            Thank you for registering with <b>InternLaunch</b>.
          </p>

          {applicationId && (
            <div className="mt-6 rounded-xl border border-blue-500/30 bg-blue-500/10 p-5 text-center">
              <p className="text-sm text-slate-400">Your Application ID</p>
              <p className="mt-2 text-3xl font-bold tracking-wider text-blue-400">{applicationId}</p>
              <p className="mt-2 text-xs text-slate-500">Save this ID. You'll need it to track your application status.</p>
            </div>
          )}

          <div className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">

            <div className="flex gap-3 text-slate-200">
              <CheckCircle2 className="text-green-400" />
              Payment Status: <b>Verification Pending</b>
            </div>

            <div className="flex gap-3 text-slate-200">
              <Phone className="text-blue-400" />
              Our team will contact you within <b>24 Hours</b>.
            </div>

            <div className="flex gap-3 text-slate-200">
              <FileText className="text-yellow-400" />
              Internship Offer Letter will be shared after payment verification.
            </div>

            <div className="flex gap-3 text-slate-200">
              <Award className="text-purple-400" />
              Completion Certificate is available as an optional paid add-on.
            </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(applicationId ?? "");
              alert("Application ID copied!");
            }}
            className="mt-4 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
          >
            Copy Application ID
          </button>

          </div>

          <a
            href={whatsapp}
            target="_blank"
            className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 font-semibold text-white transition hover:bg-green-500"
          >
            <MessageCircle className="h-5 w-5" />
            Send Payment Screenshot on WhatsApp
          </a>

          <Link
            href="/"
            className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 text-white transition hover:bg-white/5"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>

        </motion.section>

      
<div className="mt-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
  <h2 className="text-xl font-bold text-emerald-400">
    🎉 Application Submitted Successfully
  </h2>

  <p className="mt-3 text-zinc-300">
    Your payment screenshot has been received.
    You can track your application anytime.
  </p>

  <a
    href="/status"
    className="mt-6 inline-block rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-500 transition"
  >
    Track Application Status
  </a>
</div>

</main>

      <Footer />
    </>
  );
}
export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0b1220] text-white">
          Loading...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}