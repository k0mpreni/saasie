import { Database } from "@/lib/database.types";
import { stripe } from "@/lib/stripe";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const handleCheckoutCompleted = async (
  checkout: Stripe.Event.Data.Object
) => {
  const supabase = createRouteHandlerClient<Database>(
    { cookies },
    {
      supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    }
  );
  const userId = checkout.metadata.userId;

  const subscriptionId = checkout.subscription;
  const subscription = await stripe.subscriptions.retrieve(
    subscriptionId as string
  );

  try {
    const { error, data } = await supabase
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

export async function POST(request: Request) {
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
      process.env.STRIPE_SIGNING_SECRET!
    );
  } catch (e) {
    console.error("Stripe Construct Event failed:", e);
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
    return NextResponse.json(`Error processing event ${stripeEvent.type}`, {
      status: 500,
    });
  }
  return NextResponse.json({ received: true }, { status: 200 });
}
