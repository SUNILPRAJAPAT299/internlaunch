"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, CheckCircle, Users } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.18),transparent_35%)]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-24 lg:flex-row lg:justify-between lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          className="max-w-2xl"
        >
          <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            🚀 India's Internship Platform
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
            Launch Your Career With
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              InternLaunch
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-300">
            Discover internships, apply in minutes, track applications,
            and kickstart your professional journey.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/apply"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
            >
              Apply Now
            </Link>

            <Link
              href="/status"
              className="rounded-xl border border-slate-600 px-6 py-3 font-semibold transition hover:bg-slate-800"
            >
              Track Status
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              Verified Companies
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              5000+ Students
            </div>

            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-yellow-400" />
              Paid Internships
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          className="mt-16 w-full max-w-md lg:mt-0"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold">
                Dashboard
              </h3>

              <ArrowRight className="h-5 w-5 text-blue-400" />
            </div>

            <div className="space-y-4">
              <div className="rounded-xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">
                  Total Applications
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                  2,547
                </h2>
              </div>

              <div className="rounded-xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">
                  Active Companies
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                  120+
                </h2>
              </div>

              <div className="rounded-xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">
                  Students Placed
                </p>
                <h2 className="mt-2 text-3xl font-bold text-green-400">
                  94%
                </h2>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}