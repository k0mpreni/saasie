import { stripe } from "@/lib/stripe";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const handleCheckoutCompleted = async (checkout) => {
  const supabase = createServerActionClient({ cookies });
  const userId = checkout.metadata.userId;

  const subscriptionId = checkout.subscription;
  const subscription = await stripe.subscriptions.retrieve(
    subscriptionId as string
  );
  try {
    const { error } = await supabase
      .from("profiles")
      .update({
        stripe_subscription_id: subscription.id,
        stripe_subscription_status: subscription.status,
        stripe_plan_id: subscription.plan.id,
      })
      .eq("user_id", userId);
  } catch (e) {
    console.error("ERR: Updating user", e);
  }
};

export const POST = async (request: Request) => {
  const stripeSignature = request.headers.get("stripe-signature");

  if (!stripeSignature) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const body = await request.text();

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      stripeSignature,
      process.env.NEXT_PUBLIC_STRIPE_SIGNING_SECRET
    );
  } catch (e) {
    return NextResponse.json("Invalid signature", { status: 401 });
  }
  try {
    switch (stripeEvent.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(stripeEvent.data.object);
        break;
      case "customer.subscription.updated":
        break;
      default:
        return NextResponse.json({ received: true }, { status: 200 });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(`Error processing event ${stripeEvent.type}`, {
      status: 500,
    });
  }
  return NextResponse.json({ received: true }, { status: 200 });
};
