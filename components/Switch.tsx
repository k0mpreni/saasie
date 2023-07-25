type Props = { onClick: () => void; checked: boolean };

const Switch = ({ onClick, checked }: Props) => {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-center space-x-2.5">
        <span className="text-base font-medium text-gray-900"> Monthly </span>

        <button
          onClick={onClick}
          aria-checked={checked}
          type="button"
          className="relative inline-flex flex-shrink-0 h-6 py-0.5 transition-colors duration-200 ease-in-out bg-transparent border-2 border-blue-600 rounded-full cursor-pointer w-12 focus:outline-none"
          role="switch"
        >
          <span
            aria-hidden="true"
            className={`inline-block w-4 h-4 transition duration-200 ease-in-out ${
              checked ? "translate-x-6" : "translate-x-1"
            } bg-blue-600 rounded-full shadow pointer-events-none`}
          />
        </button>

        <span className="text-base font-medium text-gray-900"> Yearly </span>
      </div>
    </div>
  );
};

export default Switch;
