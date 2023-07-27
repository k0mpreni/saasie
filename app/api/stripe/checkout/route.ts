import { Database } from "@/lib/database.types";
import { stripe } from "@/lib/stripe";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const url = req.nextUrl;
  const action = url.searchParams.get("action");
  const supabase = createServerActionClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(req.nextUrl);

  switch (action) {
    case "choosePrice": {
      const body = await req.json();
      const priceId = body.priceId || undefined;
      if (!session) {
        throw NextResponse.redirect("/login");
      }
      const { data } = await supabase
        .from("profiles")
        .select()
        .limit(1)
        .single();

      const currentStripeId = data?.stripe_subscription_id;
      const currentStripeStatus = data?.stripe_subscription_status;
      // if (currentStripeId && currentStripeStatus === "active") {
      //   try {
      //     const subscription = await stripe.subscriptions.cancel(
      //       currentStripeId,
      //       {
      //         // end immediatly to change plan
      //       }
      //     );
      //     if (subscription.status !== "canceled") {
      //       throw new Error("cancel current plan failed");
      //     }
      //   } catch (e) {
      //     console.error("Error occured: cancel current plan failed", e);
      //   }
      // }

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
    }
    default:
      return NextResponse.json({ received: true }, { status: 200 });
  }
  return NextResponse.json({ received: true }, { status: 200 });
}
