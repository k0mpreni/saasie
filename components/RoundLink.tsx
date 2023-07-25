import Link from "next/link";

type TRoundLinkProps = {
  link: string;
  name: string;
};

const RoundLink = ({ link, name }: TRoundLinkProps) => {
  return (
    <Link
      href={link}
      title={name}
      className="w-fit flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full"
      role="button"
    >
      {name}
    </Link>
  );
};

export default RoundLink;
