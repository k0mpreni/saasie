import Link from "next/link";

type Props = {
  link: string;
  title: string;
};

const StyledLink = ({ link, title }: Props) => {
  return (
    <Link href={link} className="text-base text-black hover:text-opacity-80">
      {title}
    </Link>
  );
};
export default StyledLink;
