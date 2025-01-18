"use client";
import {
  authLinksArray,
  notAuthLinksArray,
} from "@/app/lib/consts";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavLinkComponent from "./NavLink";
import { GiHamburgerMenu } from "react-icons/gi";
import { AnimatePresence, motion } from "framer-motion";
import { removeCookie } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import { useAuthStore } from "@/app/zustand/store";

const Navbar = () => {
  const { isAuth, logout } = useAuthStore();
  const renderedLinks = isAuth
    ? authLinksArray.map((singleLink) => {
        // Check if the link is for logout
        if (singleLink.label === "") {
          return (
            <NavLinkComponent
              key={singleLink.href + "LOOOL"}
              href={singleLink.href}
              icon={singleLink.icon}
              label={singleLink.label}
              onClick={() => {
                // console.log("OUT");
                logout();
                removeCookie("auth-token");
                setIsMobileMenuOpen(false);
                redirect("/");
              }}
            />
          );
        }
        // Render normal links
        return (
          <NavLinkComponent
            key={singleLink.href + "LOOOL"}
            href={singleLink.href}
            icon={singleLink.icon}
            label={singleLink.label}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        );
      })
    : notAuthLinksArray.map((singleLink) => {
        return (
          <NavLinkComponent
            key={singleLink.href + "LOOOL"}
            href={singleLink.href}
            icon={singleLink.icon}
            label={singleLink.label}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        );
      });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="bg-primary fixed top-0 z-10 left-0 right-0">
      <div className="container flex justify-between items-center min-h-[50px]">
        <Link
          href={isAuth ? "/profile" : "/"}
          className="logo flex justify-center items-center gap-2"
        >
          <Image src="/Logo.png" alt="Saraha Logo" width={41} height={32} />
          <div className="logo-text text-[22px] text-white font-[700]">
            Sarahah
          </div>
        </Link>
        <div className="links hidden md:flex gap-[25px]">{renderedLinks}</div>
        <div
          onClick={() => setIsMobileMenuOpen((d) => !d)}
          className="links md:hidden flex gap-[25px]"
        >
          <GiHamburgerMenu color="white" size={30} />
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100vh" }}
            exit={{ height: "0" }}
            transition={{ duration: 0.3 }}
            className="bg-primary absolute top-[50px] md:hidden flex left-0 right-0 h-[100vh]"
          >
            <div className="container links pt-3 gap-2 flex flex-col">
              {renderedLinks}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
