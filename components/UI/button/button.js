"use client";
import { useFormStatus } from "react-dom";
function Button({ children, style, disabled, onClick }) {
  const { pending } = useFormStatus();

  let buttonStyle;
  switch (style) {
    case "primary":
      buttonStyle =
        "block w-full bg-primary-index hover:bg-primary-hover text-white text-sm font-bold rounded-md px-4 py-3 transition-all duration-300 ease-in-out hover:shadow-md disabled:opacity-50 hover:drop-shadow-3xl disabled:cursor-not-allowed  disabled:bg-primary-index/50 disabled:shadow-none disabled:hover:shadow-none disabled:hover:scale-100 disabled:hover:bg-primary-index/50 disabled:hover:bg-primary-index";
      break;
    case "secondary":
      buttonStyle =
        "block w-full bg-neutral-light-grey border border-solid border-primary-index hover:bg-neutral-light-purple hover:drop-shadow-3xl text-primary-index text-sm font-bold rounded-md px-4 py-3 transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:text-neutral-grey disabled:border-neutral-borders disabled:bg-neutral-light-grey";
      break;

    default:
      break;
  }
  return (
    <button aria-disabled={pending} className={buttonStyle} disabled={disabled} onClick={onClick}>
      {pending ? "Submitting..." : children}
    </button>
  );
}

export default Button;
