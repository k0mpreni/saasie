import { TPlan } from "@/lib/types/plan";
import { FormEvent } from "react";
import Button from "./Button";

type Props = {
  plan: TPlan;
  principal?: boolean;
  noCard?: boolean;
  choosePrice: (priceId: string) => void;
  cancelPrice: (priceId: string) => void;
  isLoading: boolean;
};

const Plan = ({
  plan,
  principal = false,
  noCard,
  choosePrice,
  cancelPrice,
  isLoading,
}: Props) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (plan.current && !plan.canceled) {
      cancelPrice(plan.id);
    } else {
      choosePrice(plan.id);
    }
  };

  return (
    <div
      className={`bg-white border-4 ${
        principal ? "border-blue-600" : "border-gray-300"
      } rounded-md w-60`}
    >
      <form method="POST" onSubmit={handleSubmit}>
        <input className="hidden" type="hidden" name="planId" value={plan.id} />
        <div className="p-6 md:py-10 md:px-9">
          <div
            className={`inline-block px-4 py-2 ${
              principal ? "bg-blue-100" : "bg-gray-100"
            } rounded-full`}
          >
            <h3 className="text-sm font-semibold text-gray-900">{plan.name}</h3>
          </div>
          <p
            className={`mt-5 text-5xl font-bold  ${
              principal ? "text-blue-600" : "text-black"
            }`}
          >
            ${plan.unit_amount / 100}
          </p>
          <p className="mt-2 text-base text-gray-600">
            {plan.yearly ? "Per year" : "Per month"}
          </p>

          <ul className="flex flex-col mt-8 space-y-4">
            <li className="inline-flex items-center space-x-2">
              <svg
                className="flex-shrink-0 w-5 h-5 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-base font-medium text-gray-900">
                1 Apple
              </span>
            </li>
          </ul>

          <Button loading={isLoading} principal={principal} type="submit">
            {plan.current ? "Cancel" : "Subscribe"}
          </Button>
          {noCard && (
            <p className="mt-5 text-sm text-gray-500">
              No Credit Card Required
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Plan;
