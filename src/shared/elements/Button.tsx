import classNames from "classnames";
import { ButtonHTMLAttributes, FC } from "react";

export const buttonBaseStyles =
  "flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-0 disabled:cursor-not-allowed";

const buttonVariants = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-800 active:bg-indigo-800 disabled:bg-gray-200 disabled:text-gray-400",
  secondary:
    "bg-yellow-400 text-gray-900 hover:text-white hover:bg-yellow-600 disabled:bg-yellow-100 disabled:text-stone-600 disabled:border-gray-500",
  ghost:
    "bg-transparent text-indigo-600 hover:bg-gray-300 hover:text-bg-indigo-800 active:bg-gray-300 focus:text-bg-indigo-800 focus:bg-transparent/10 disabled:text-gray-400 disabled:hover:bg-transparent",
  transparent: "bg-transparent text-indigo-600 disabled:text-gray-400",
} as const;

const buttonSizes = {
  sm: "py-1.5 text-sm gap-1.5 px-3 h-8",
  md: "py-2 text-md gap-2.5 px-5 h-10",
  lg: "py-3.5 gap-3.5 text-lg px-6 h-12 font-medium",
} as const;

type ButtonVariant = keyof typeof buttonVariants;

type ButtonSize = keyof typeof buttonSizes;

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
  children,
  className,
  size = "md",
  variant = "primary",
  ...restProps
}) => {
  return (
    <button
      className={classNames(
        buttonBaseStyles,
        buttonSizes[size],
        buttonVariants[variant],
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};
