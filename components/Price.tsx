type Props = { price: any; principal?: boolean; noCard?: boolean };

const Price = ({ price, principal, noCard }: Props) => {
  const choosePrice = () => console.log("price choosed");
  const cancelPrice = () => console.log("price canceled");

  return (
    <div
      className={`bg-white border-4 ${
        principal ? "border-blue-600" : "border-transparent"
      } rounded-md`}
    >
      <form method="POST" onSubmit={choosePrice}>
        <input
          className="hidden"
          type="hidden"
          name="planId"
          value={price.id}
        />
        <div className="p-6 md:py-10 md:px-9">
          <div
            className={`inline-block px-4 py-2 ${
              principal ? "bg-blue-100" : "bg-gray-100"
            } rounded-full`}
          >
            <h3 className="text-sm font-semibold text-gray-900">
              {price.name}
            </h3>
          </div>
          <p
            className={`mt-5 text-5xl font-bold  ${
              principal ? "text-blue-600" : "text-black"
            }`}
          >
            ${price.unit_amount / 100}
          </p>
          <p className="mt-2 text-base text-gray-600">
            {price.yearly ? "Per year" : "Per month"}
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
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="text-base font-medium text-gray-900">
                {" "}
                1 Domain License{" "}
              </span>
              <svg
                className="w-4 h-4 ml-0.5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </li>

            <li className="inline-flex items-center space-x-2">
              <svg
                className="flex-shrink-0 w-5 h-5 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="text-base font-medium text-gray-900">
                {" "}
                Full Celebration Library{" "}
              </span>
            </li>
            <li className="inline-flex items-center space-x-2">
              <svg
                className="flex-shrink-0 w-5 h-5 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="text-base font-medium text-gray-400">
                {" "}
                Design Files Included{" "}
              </span>
            </li>

            <li className="inline-flex items-center space-x-2">
              <svg
                className="flex-shrink-0 w-5 h-5 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="text-base font-medium text-gray-400">
                {" "}
                Premium Support{" "}
              </span>
            </li>
          </ul>

          <button
            disabled={price.current}
            className={`inline-flex items-center justify-center w-full px-4 py-4 mt-8 font-semibold text-white transition-all duration-200 rounded-md ${
              principal
                ? "bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:opacity-80 focus:opacity-80"
                : "bg-gray-800 hover:bg-gray-600 focus:bg-gray-600"
            }`}
          >
            {price.current ? "Your plan" : "Get this plan"}
          </button>
          {price.current && !price.cancelled && (
            <button onClick={cancelPrice} className="underline py-5">
              Cancel
            </button>
          )}
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

export default Price;
