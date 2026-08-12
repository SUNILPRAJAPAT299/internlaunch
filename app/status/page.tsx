"use client";

import { useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function StatusPage() {
  const [email, setEmail] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  const checkStatus = async () => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const q = query(
        collection(db, "applications"),
        where("email", "==", email.trim()),
        where("applicationId", "==", applicationId.trim())
      );

      const snap = await getDocs(q);

      if (snap.empty) {
        setError("No application found.");
        setLoading(false);
        return;
      }

      const docs = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a: any, b: any) => {
          const at = a.createdAt?.seconds || 0;
          const bt = b.createdAt?.seconds || 0;
          return bt - at;
        });

      setData(docs[0]);
    } catch (e) {
      console.error(e);
      setError("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

        <h1 className="text-3xl font-bold text-center">
          Track Application
        </h1>

        <p className="text-zinc-400 text-center mt-2">
          Enter the same email used while applying.
        </p>

        <input
          className="w-full mt-8 rounded-lg bg-zinc-800 p-3 outline-none"
          placeholder="Application ID"
          value={applicationId}
          onChange={(e)=>setApplicationId(e.target.value)}
        />

        <input
          className="w-full mt-4 rounded-lg bg-zinc-800 p-3 outline-none"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <button
          onClick={checkStatus}
          className="mt-5 w-full rounded-lg bg-emerald-600 py-3 font-semibold hover:bg-emerald-500"
        >
          {loading ? "Checking..." : "Check Status"}
        </button>

        {error && (
          <div className="mt-6 rounded-lg bg-red-500/20 p-4 text-red-300">
            {error}
          </div>
        )}

        {data && (
          <div className="mt-8 rounded-xl border border-zinc-700 p-5 space-y-3">

            <div>
              <span className="text-zinc-400">Name</span>
              <p className="font-semibold">{data.name}</p>
            </div>

            <div>
              <span className="text-zinc-400">Email</span>
              <p>{data.email}</p>
            </div>

            <div>
              <span className="text-zinc-400">Internship</span>
              <p>{data.internship || "N/A"}</p>
            </div>

            <div>
              <span className="text-zinc-400">Payment</span>
              <p className="font-semibold">
                {data.paymentStatus || "Pending"}
              </p>
            </div>

            <div>
              <span className="text-zinc-400">Application Status</span>
              <p className="font-semibold text-emerald-400">
                {data.paymentStatus === "Paid"
                  ? "Approved ✅"
                  : data.paymentStatus === "Rejected"
                  ? "Rejected ❌"
                  : "Pending ⏳"}
              </p>
            </div>

            {data.paymentStatus === "Paid" && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                <p className="text-lg font-bold text-emerald-300">
                  ✅ Payment Successful
                </p>

                <p className="mt-3 leading-7 text-slate-200">
                  Your payment is done.
                </p>

                <p className="mt-2 leading-7 text-slate-300">
                  You'll receive your offer letter within
                  <span className="font-semibold text-white">
                    {" "}24–48 working hours
                  </span>.
                </p>

                <p className="mt-2 leading-7 text-slate-400">
                  Please be patient while our team processes your offer letter.
                </p>

                <p className="mt-4 font-medium text-emerald-300">
                  Thank you for using InternLaunch ❤️
                </p>
              </div>
            )}

          </div>
        )}

      </div>
    </main>
  );
}
