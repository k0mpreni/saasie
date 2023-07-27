import { Database } from "@/lib/database.types";
import { stripe } from "@/lib/stripe";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Prices from "./prices";

type Props = {};

const Pricing = async (props: Props) => {
  const productsRes = await stripe.products.list();
  const priceRes = await stripe.prices.list();
  const supabase = createServerActionClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "stripe_subscription_id,stripe_plan_id, stripe_subscription_status"
    );
  const subscriptionId = data && data[0]?.stripe_subscription_id;
  const planId = data && data[0]?.stripe_plan_id;
  let userSubscription = {
    status: "",
    cancel_end: null,
    canceled: false,
  };
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
  const plans = priceRes.data
    .map((el) => {
      const isYearly = el.recurring?.interval === "year";
      return {
        ...el,
        name: productsRes.data[0].name,
        yearly: isYearly,
        current: planId === el.id && userSubscription.status === "active",
        cancel_end: userSubscription.cancel_end,
        canceled: userSubscription.canceled,
      };
    })
    .sort((a, b) => (a?.unit_amount < b?.unit_amount ? -1 : 0));

  return <Prices prices={plans} />;
};

export default Pricing;
