import { MouseEventHandler, ReactElement } from "react";
import Spinner from "./Spinner";

type Props = {
  principal?: boolean;
  disabled?: boolean;
  loading?: boolean;
  children: ReactElement | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "reset" | "button";
};

const Button = ({
  type = "button",
  disabled,
  loading,
  principal,
  children,
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`inline-flex h-12 items-center justify-center w-full px-4 py-4 mt-8 font-semibold text-white rounded-md focus:placeholder-opacity-80 hover:opacity-80 ${
        principal
          ? "bg-gradient-to-r from-fuchsia-600 to-blue-600"
          : "bg-gray-800"
      }`}
    >
      {loading && <Spinner />}
      {!loading && children}
    </button>
  );
};

export default Button;
