import { getPrices } from "@/services/prices";
import Prices from "./prices";

export const revalidate = 10;

const Pricing = async () => {
  const prices = await getPrices();
  return <Prices prices={prices} />;
};

export default Pricing;
