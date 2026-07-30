"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, FileText } from "lucide-react";

export function RegistrationBanner() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

      <div className="overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-600 to-cyan-600 p-8 shadow-2xl">

        <p className="text-sm font-semibold uppercase tracking-widest text-blue-100">
          Internship Registration
        </p>

        <h2 className="mt-3 text-4xl font-bold text-white">
          Registration Fee ₹3,000
        </h2>

        <p className="mt-5 max-w-2xl text-blue-100 leading-7">
          Secure your internship seat today. After successful payment
          verification, our team will contact you within 24 hours and
          share your Internship Offer Letter.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">

          <div className="flex gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
            <Clock className="mt-1 h-5 w-5 text-white" />
            <div>
              <h4 className="font-semibold text-white">
                24 Hour Support
              </h4>
              <p className="text-sm text-blue-100">
                Our team contacts every registered student.
              </p>
            </div>
          </div>

          <div className="flex gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
            <FileText className="mt-1 h-5 w-5 text-white" />
            <div>
              <h4 className="font-semibold text-white">
                Offer Letter
              </h4>
              <p className="text-sm text-blue-100">
                Shared after successful payment verification.
              </p>
            </div>
          </div>

          <div className="flex gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
            <BadgeCheck className="mt-1 h-5 w-5 text-white" />
            <div>
              <h4 className="font-semibold text-white">
                Certificate
              </h4>
              <p className="text-sm text-blue-100">
                Optional paid add-on after internship completion.
              </p>
            </div>
          </div>

        </div>

        <Link
          href="/apply"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
        >
          Apply Now
          <ArrowRight className="h-5 w-5" />
        </Link>

      </div>

    </section>
  );
}
