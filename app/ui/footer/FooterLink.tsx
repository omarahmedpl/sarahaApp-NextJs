import { FooterLinkInterface } from "@/app/lib/definations";
import Link from "next/link";
import React from "react";

const FooterLink = ({
  link,
  ...props
}: {
  link: FooterLinkInterface;
}) => {
  return (
    <Link className="footer-link" href={link.href} {...props}>
      {link.label}
    </Link>
  );
};

export default FooterLink;
