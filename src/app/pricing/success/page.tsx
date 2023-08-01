import RoundLink from "@/components/RoundLink";

const Success = () => {
  return (
    <section className="bg-gray-50 p y-10 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Account
          </h2>
          <p className="max-w-lg mx-auto my-4 text-base leading-relaxed text-gray-600">
            Thanks for the subscription!
          </p>
          <RoundLink name="Go to home" link="/" />
        </div>
      </div>
    </section>
  );
};
export default Success;
