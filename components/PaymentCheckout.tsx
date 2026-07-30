"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PaymentCheckout({
  applicationId,
}: {
  applicationId?: string;
}) {
  const router = useRouter();

  const whatsappNumber = "917877025883";

  const message = encodeURIComponent(`Hello InternLaunch Team,

I have completed the ₹3,000 registration payment.

Application ID: ${applicationId ?? "N/A"}

I am attaching my payment screenshot for verification.

Thank you.`);

  return (
    <section className="rounded-3xl border border-blue-400/20 bg-[#111b30]/90 p-8 shadow-2xl">

      <p className="text-sm font-medium text-blue-300">
        Registration Fee
      </p>

      <h1 className="mt-2 text-4xl font-bold text-white">
        ₹3,000
      </h1>

      <p className="mt-4 text-slate-400">
        Scan the QR code below and complete your registration payment.
      </p>

      <div className="my-8 flex justify-center">
        <img
          src="/qr.png"
          alt="UPI QR"
          className="w-72 rounded-2xl border border-white/10"
        />
      </div>

      <div className="space-y-3 text-sm text-slate-300">

        <div className="flex gap-2">
          <CheckCircle2 size={18}/>
          Registration Fee: ₹3,000
        </div>

        <div className="flex gap-2">
          <CheckCircle2 size={18}/>
          Our team will contact you within 24 hours.
        </div>

        <div className="flex gap-2">
          <CheckCircle2 size={18}/>
          Internship Offer Letter will be shared after payment verification.
        </div>

        <div className="flex gap-2">
          <CheckCircle2 size={18}/>
          Completion Certificate is available as an optional paid add-on.
        </div>

      </div>

      <Button
        className="mt-8 h-12 w-full rounded-xl bg-blue-600 hover:bg-blue-500"
        onClick={() => router.push(`/success?applicationId=${applicationId ?? ""}`)}
      >
        I've Completed Payment
      </Button>

      <Link
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        target="_blank"
      >
        <Button
          variant="outline"
          className="mt-4 h-12 w-full"
        >
          <MessageCircle className="mr-2 h-5 w-5"/>
          Send Payment Screenshot on WhatsApp
        </Button>
      </Link>

    </section>
  );
}
