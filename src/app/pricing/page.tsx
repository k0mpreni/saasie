import { getPlans } from "@/services/plans";
import Plans from "./plans";

export const revalidate = 0;

const Pricing = async () => {
  const plans = await getPlans();
  return <Plans plans={plans} />;
};

export default Pricing;
