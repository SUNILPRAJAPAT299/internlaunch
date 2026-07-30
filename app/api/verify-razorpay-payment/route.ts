import { createHmac, timingSafeEqual } from "node:crypto";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) return Response.json({ error: "Razorpay is not configured." }, { status: 500 });

  try {
    const { applicationId, razorpay_payment_id: paymentId, razorpay_order_id: orderId, razorpay_signature: signature } = await request.json();
    if (![applicationId, paymentId, orderId, signature].every(value => typeof value === "string" && value.length > 0)) {
      return Response.json({ error: "Incomplete payment information." }, { status: 400 });
    }

    const expectedSignature = createHmac("sha256", keySecret).update(`${orderId}|${paymentId}`).digest("hex");
    const isValid = expectedSignature.length === signature.length && timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature));
    if (!isValid) return Response.json({ error: "Payment verification failed." }, { status: 400 });

    const application = getAdminDb().collection("applications").doc(applicationId);
    const snapshot = await application.get();
    if (!snapshot.exists || snapshot.data()?.orderId !== orderId) {
      return Response.json({ error: "This payment does not match the application." }, { status: 400 });
    }

    await application.update({ paymentStatus: "Paid", paymentId, orderId, paymentDate: FieldValue.serverTimestamp() });
    return Response.json({ verified: true });
  } catch (error) {
    console.error("Unable to verify Razorpay payment", error);
    return Response.json({ error: "Unable to verify payment." }, { status: 500 });
  }
}
