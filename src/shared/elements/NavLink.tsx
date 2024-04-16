import classNames from "classnames";
import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";

export type NavLinkProps = LinkProps;

export const NavLink: FC<NavLinkProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <Link {...restProps} className={classNames("", className)}>
      {children}
    </Link>
  );
};
