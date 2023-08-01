"use client";
import Plan from "@/components/Plan";
import { TPlan } from "@/lib/types/plan";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  plans: TPlan[];
};

const Plans = ({ plans }: Props) => {
  const [yearly, setYearly] = useState(false);
  const [isLoading, setIsLoading] = useState<string>();

  const filteredPlans = plans.filter((el) => el.yearly === yearly);
  const router = useRouter();

  const choosePrice = async (priceId: string) => {
    setIsLoading(priceId);
    try {
      const response = await fetch(
        `${location.origin}/api/stripe/checkout?action=choosePrice`,
        {
          method: "post",
          body: JSON.stringify({ priceId: priceId }, null),
          headers: {
            "content-type": "application/json",
          },
        }
      ).then((res) => res.json());

      if (response.url) {
        router.push(response.url);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(undefined);
  };

  const cancelPrice = async (priceId: string) => {
    setIsLoading(priceId);
    try {
      const response = await fetch(
        `${location.origin}/api/stripe/checkout?action=cancelPrice`,
        {
          method: "post",
          body: JSON.stringify({ priceId: priceId }, null),
          headers: {
            "content-type": "application/json",
          },
        }
      ).then((res) => res.json());
      if (response.url) {
        router.push(response.url);
      }
      router.refresh();
    } catch (error) {
      console.error(error);
    }
    setIsLoading(undefined);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
          Pricing & Plans
        </h2>
        <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis.
        </p>
      </div>
      {/* <Switch onClick={() => setYearly(!yearly)} checked={yearly} /> */}
      <div className="flex flex-wrap justify-center gap-6 mx-auto mt-8 sm:mt-16 ">
        {filteredPlans.map((plan: TPlan, index: number) => (
          <Plan
            isLoading={plan.id === isLoading}
            choosePrice={choosePrice}
            cancelPrice={cancelPrice}
            key={`price-${index}-${plan.id}`}
            plan={plan}
            principal={index === 1}
          />
        ))}
      </div>
    </>
  );
};

export default Plans;
