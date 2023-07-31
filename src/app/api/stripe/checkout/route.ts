import { Database } from "@/lib/database.types";
import { stripe } from "@/lib/stripe";
import { TPrice, TUserSubscription } from "@/lib/types/prices";
import {
  createRouteHandlerClient,
  createServerActionClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const url = req.nextUrl;
  const action = url.searchParams.get("action");
  const supabase = createServerActionClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  switch (action) {
    case "choosePrice": {
      const body = await req.json();
      const priceId = body.priceId || undefined;
      if (!session) {
        return NextResponse.redirect(`${url.origin}/login`);
      }
      const { data } = await supabase
        .from("profiles")
        .select()
        .limit(1)
        .single();

      const currentStripeId = data?.stripe_subscription_id;
      const currentStripeStatus = data?.stripe_subscription_status;
      if (currentStripeId && currentStripeStatus === "active") {
        try {
          const subscription = await stripe.subscriptions.cancel(
            currentStripeId
          );
          if (subscription.status !== "canceled") {
            throw new Error("cancel current plan failed");
          }
        } catch (e) {
          console.error("Error occured: cancel current plan failed", e);
        }
      }

      const stripeSession = await stripe.checkout.sessions.create({
        customer_email: session.user.email,
        metadata: {
          userId: session.user.id,
        },
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${url.origin}/pricing/success`,
        cancel_url: `${url.origin}/pricing/cancel`,
        // Uncomment to add a free trial without card required
        // subscription_data: {
        // 	trial_settings: {
        // 		end_behavior: {
        // 			missing_payment_method: 'cancel'
        // 		}
        // 	},
        // 	trial_period_days: 30
        // },
        // payment_method_collection: 'if_required'
      });

      if (stripeSession.url) {
        return NextResponse.json({ url: stripeSession.url });
      }
      break;
    }
    case "cancelPrice": {
      const body = await req.json();
      const priceId = body.priceId || undefined;
      if (!session) {
        return NextResponse.redirect(`${url.origin}/login`);
      }
      const { data: supRes, error } = await supabase
        .from("profiles")
        .select(
          "stripe_subscription_id, stripe_subscription_status, stripe_plan_id"
        );
      if (!supRes) {
        return NextResponse.redirect(`${url.origin}/pricing`);
      }
      const subscriptionId = supRes[0].stripe_subscription_id;
      const subscriptionStatus = supRes[0].stripe_subscription_status;
      const stripePriceId = supRes[0].stripe_plan_id;
      if (
        subscriptionId &&
        subscriptionStatus === "active" &&
        priceId === stripePriceId
      ) {
        // If you want to keep the subscription active until the end of the period
        // const subscription = await stripe.subscriptions.update(subscriptionId, {
        //   cancel_at_period_end: true,
        // });

        // If you want to cancel the subscription right away
        const subscription = await stripe.subscriptions.cancel(subscriptionId);
        try {
          const { data: subUpdate, error } = await supabase
            .from("profiles")
            .update({ stripe_subscription_status: subscription.status })
            .eq("stripe_subscription_id", subscriptionId)
            .select();
          if (!error) {
            return NextResponse.json({ received: true }, { status: 200 });
          }
        } catch (error) {
          console.log("Error canceling plan", error);
        }
      }
      return NextResponse.json({ received: true }, { status: 200 });
    }
    default:
      return NextResponse.json({ received: true }, { status: 200 });
  }
  return NextResponse.json({ received: true }, { status: 200 });
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const action = url.searchParams.get("action");

  switch (action) {
    case "prices":
      const productsRes = await stripe.products.list();
      const priceRes = await stripe.prices.list();

      const prices = priceRes.data
        .map(
          (el): TPrice => ({
            id: el.id,
            name: productsRes.data[0].name,
            yearly: el.recurring?.interval === "year",
            unit_amount: el.unit_amount || 0,
          })
        )
        .sort((a, b) => (a.unit_amount < b.unit_amount ? -1 : 0));
      return NextResponse.json(prices, { status: 200 });
    case "userPrice":
      const supabase = createRouteHandlerClient<Database>({ cookies });
      const { data, error } = await supabase
        .from("profiles")
        .select(
          "stripe_subscription_id,stripe_plan_id, stripe_subscription_status"
        );
      const subscriptionId = data && data[0]?.stripe_subscription_id;
      const planId = data && data[0]?.stripe_plan_id;
      let userSubscription: TUserSubscription = {
        status: "",
        cancel_end: null,
        canceled: false,
      };
      console.log("tututututut", subscriptionId);
      if (subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(
          subscriptionId as string
        );
        userSubscription = {
          status: subscription.status,
          cancel_end: subscription.cancel_at,
          canceled: subscription.status === "canceled",
        };
      }
      return NextResponse.json(userSubscription, { status: 200 });
    default:
      return NextResponse.json({ invalid: "default" }, { status: 404 });
  }
}
