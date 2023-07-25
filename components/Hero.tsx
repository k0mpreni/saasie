import Image from "next/image";
import RoundLink from "./RoundLink";

const Hero = () => (
  <section className="py-10 sm:py-16 lg:py-24">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">
            A social media for learners
          </p>
          <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
            Connect & learn from the experts
          </h1>
          <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
            Grow your career fast with right mentor.
          </p>

          <div className="mt-8">
            <RoundLink name="Join for free" link="/login" />
          </div>
        </div>

        <div>
          <Image
            width="650"
            height="650"
            className="w-full"
            src="https://placehold.co/650x660/png"
            alt=""
          />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
