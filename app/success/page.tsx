"use client";

import Link from "next/link";
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

export default function SuccessPage() {
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

      </main>

      <Footer />
    </>
  );
}
