import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PaymentCheckout } from "@/components/PaymentCheckout";
import { CheckCircle2 } from "lucide-react";

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ applicationId?: string }>;
}) {
  const { applicationId } = await searchParams;

  return (
    <>
      <Navbar />

      <main className="mx-auto grid min-h-[calc(100vh-72px)] max-w-6xl items-center gap-12 px-5 py-14 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-20">

        <section>

          <p className="text-sm font-medium text-blue-300">
            Complete Your Registration
          </p>

          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white">
            Confirm your Internship Registration
          </h2>

          <p className="mt-5 max-w-md leading-7 text-slate-400">
            Pay the ₹3,000 registration fee using the QR code.
            After successful payment verification, our team will contact you
            within 24 hours and share your Internship Offer Letter.
          </p>

          <div className="mt-9 space-y-4">

            {[
              "Registration Fee ₹3,000",
              "Verification within 24 Hours",
              "Internship Offer Letter after verification",
              "Completion Certificate (Optional Paid Add-on)"
            ].map((item) => (
              <p
                key={item}
                className="flex items-center gap-3 text-sm text-slate-300"
              >
                <CheckCircle2 className="size-5 text-blue-400" />
                {item}
              </p>
            ))}

          </div>

        </section>

        <PaymentCheckout applicationId={applicationId} />

      </main>

      <Footer />
    </>
  );
}
