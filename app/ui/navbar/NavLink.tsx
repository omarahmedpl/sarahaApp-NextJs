import React from "react";
import { NavLink } from "../../lib/definations";
import Link from "next/link";

const NavLinkComponent: React.FC<NavLink> = ({
  href,
  label,
  icon,
  ...props
}) => {
  return (
    <Link
      className="flex gap-2 text-white items-center"
      key={href}
      href={href}
      {...props}
    >
      {icon}
      {label}
    </Link>
  );
};

export default NavLinkComponent;
