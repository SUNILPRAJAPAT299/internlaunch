import Razorpay from "razorpay";
import { getAdminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

const REGISTRATION_FEE_IN_PAISE = 49_900;

export async function POST(request: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return Response.json({ error: "Razorpay is not configured." }, { status: 500 });
  }

  try {
    const { applicationId } = await request.json();
    if (!applicationId || typeof applicationId !== "string") {
      return Response.json({ error: "A valid application ID is required." }, { status: 400 });
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await razorpay.orders.create({
      amount: REGISTRATION_FEE_IN_PAISE,
      currency: "INR",
      receipt: `internlaunch_${applicationId}`.slice(0, 40),
      notes: { applicationId, program: "InternLaunch registration" },
    });
    await getAdminDb().collection("applications").doc(applicationId).update({ orderId: order.id, paymentStatus: "Pending" });

    return Response.json({ order, keyId });
  } catch (error) {
    console.error("Unable to create Razorpay order", error);
    return Response.json({ error: "Unable to create a payment order." }, { status: 500 });
  }
}
