"use client";

import { motion } from "framer-motion";
import { Crown, Code2 } from "lucide-react";

export function FounderSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">

      <div className="text-center">

        <p className="text-blue-300 font-medium">
          Leadership
        </p>

        <h2 className="mt-3 text-4xl font-bold text-white">
          Meet Our Founders
        </h2>

        <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
          InternLaunch is built with one mission —
          helping students gain real-world experience,
          confidence, and career opportunities.
        </p>

      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-2">

        <motion.div
          whileHover={{ y: -8 }}
          className="rounded-3xl border border-blue-500/20 bg-[#111b30] p-8"
        >

          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20">
            <Crown className="h-8 w-8 text-blue-400"/>
          </div>

          <h3 className="text-2xl font-bold text-white">
            Krrish
          </h3>

          <p className="mt-2 text-blue-300">
            Founder
          </p>

          <p className="mt-5 leading-7 text-slate-400">
            Leading InternLaunch with a vision to bridge the
            gap between education and industry through
            practical internship experiences.
          </p>

        </motion.div>

        <motion.div
          whileHover={{ y: -8 }}
          className="rounded-3xl border border-blue-500/20 bg-[#111b30] p-8"
        >

          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20">
            <Code2 className="h-8 w-8 text-cyan-400"/>
          </div>

          <h3 className="text-2xl font-bold text-white">
            Sunil
          </h3>

          <p className="mt-2 text-cyan-300">
            Co-Founder
          </p>

          <p className="mt-5 leading-7 text-slate-400">
            Managing technology, product development and
            operations while creating an internship platform
            focused on real skills and real opportunities.
          </p>

        </motion.div>

      </div>

    </section>
  );
}
