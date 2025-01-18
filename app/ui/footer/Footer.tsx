import React from "react";
import { footerArray } from "@/app/lib/consts";
import FooterLink from "./FooterLink";
const Footer = () => {
  const renderFooterLinks = footerArray.map((footerLink) => (
    <FooterLink key={footerLink.label} link={footerLink} />
  ));
  const date = new Date();
  return (
    <footer className="container justify-center flex items-center flex-col gap-[15px]">
      <div className="footer-links flex flex-wrap items-center justify-center">{renderFooterLinks}</div>
      <div className="copyrights mb-3">
        All rights reserved. © Omar Ahmed {date.getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
