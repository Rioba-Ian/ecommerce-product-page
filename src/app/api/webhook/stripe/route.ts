import { sendCompletedOrderStatusEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
 apiVersion: "2024-12-18.acacia",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const handleCompletedCheckoutSession = async (
 eventDataObject: Stripe.CheckoutSessionCompletedEvent
) => {
 try {
  const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
   eventDataObject.data.object.id,
   {
    expand: ["line_items"],
   }
  );

  const lineItems = sessionWithLineItems.line_items;

  if (!lineItems) return false;

  console.log(lineItems, "lineItems");

  console.log(JSON.stringify(sessionWithLineItems, null, 2));

  if (!sessionWithLineItems.customer_details?.email) return false;

  const emailsent = await sendCompletedOrderStatusEmail(
   sessionWithLineItems.customer_details?.email ?? "",
   30
  );

  console.log(emailsent.message, "emailsent");

  const user = await prisma.user.findUnique({
   where: {
    email: sessionWithLineItems.customer_details?.email,
   },
  });

  if (!user) return false;

  console.log("user with email::", user.email, "found");

  await prisma.cart.deleteMany({
   where: {
    userId: user.id,
   },
  });

  console.log("cart deleted");
 } catch (err) {
  console.error(err);
 }
};

export async function POST(req: NextRequest) {
 const rawBody = await req.text();
 const signature = req.headers.get("stripe-signature");

 let event;
 const result = "Webhook Handled Successfully";

 try {
  event = stripe.webhooks.constructEvent(rawBody, signature!, endpointSecret!);
 } catch (err: unknown) {
  console.error("Error processing webhook:", err);

  if (err instanceof Error) {
   console.error(err.message);
   return NextResponse.json({ error: err.message }, { status: 400 });
  }
  return NextResponse.json({ error: err }, { status: 400 });
 }

 switch (event.type) {
  case "checkout.session.completed":
   const savedSession = await handleCompletedCheckoutSession(event);
   if (!savedSession) {
    return NextResponse.json(
     { error: "Error saving checkout session" },
     { status: 500 }
    );
   }
   break;

  default:
   console.warn("unhandled event type", event.type);
 }

 return NextResponse.json({ received: true, status: result });
}
