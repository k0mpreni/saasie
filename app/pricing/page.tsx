"use client";
import Price from "@/components/Price";
import Switch from "@/components/Switch";
import { useState } from "react";

type Props = {};

const Pricing = (props: Props) => {
  const [yearly, setYearly] = useState(false);
  const prices = [];
  return (
    <section className="bg-gray-50 p y-10 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Pricing & Plans
          </h2>
          <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis.
          </p>
        </div>
        <Switch onClick={() => setYearly(!yearly)} checked={yearly} />
        <div className="grid max-w-3xl grid-cols-1 gap-6 mx-auto mt-8 sm:mt-16 sm:grid-cols-2">
          {prices.map((price, index) => (
            <Price
              key={`price-${index}-${price.id}`}
              price={price}
              principal={index === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
