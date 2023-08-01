import { Database } from "@/lib/database.types";
import { stripe } from "@/lib/stripe";
import { TPlan, TUserSubscription } from "@/lib/types/plan";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getPlans = async () => {
  const productsRes = await stripe.products.list();
  const productRes = await stripe.prices.list();
  const supabase = createServerActionClient<Database>({ cookies });
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
  if (subscriptionId) {
    try {
      const subscription = await stripe.subscriptions.retrieve(
        subscriptionId as string
      );
      userSubscription = {
        status: subscription.status,
        cancel_end: subscription.cancel_at,
        canceled: subscription.status === "canceled",
      };
    } catch (e) {
      console.log("Some happened", e);
    }
  }
  const plans = productRes.data
    .map(
      (el): TPlan => ({
        id: el.id,
        name: el.nickname!,
        yearly: el.recurring?.interval === "year",
        current: planId === el.id && userSubscription.status === "active",
        cancel_end: userSubscription.cancel_end,
        canceled: userSubscription.canceled,
        unit_amount: el.unit_amount || 0,
      })
    )
    .sort((a, b) => (a.unit_amount < b.unit_amount ? -1 : 0));
  return plans;
};
