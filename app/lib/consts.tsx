import { FaLock, FaUser } from "react-icons/fa";
import { z } from "zod";
import { FooterLinkInterface, NavLink } from "./definations";
import { GiExitDoor, GiGearHammer } from "react-icons/gi";
export const notAuthLinksArray: NavLink[] = [
  {
    href: "/sign-up",
    label: "Sign Up",
    icon: <FaUser />,
  },
  {
    href: "/login",
    label: "Log In",
    icon: <FaLock />,
  },
];

export const authLinksArray: NavLink[] = [
  {
    href: "/profile",
    label: "Messages",
    icon: <FaUser />,
  },
  {
    href: "/edit-profile",
    label: "Edit Profile",
    icon: <GiGearHammer />,
  },
  {
    href: "",
    label: "",
    icon: <GiExitDoor />,
  },
];
export const footerArray: FooterLinkInterface[] = [
  {
    href: "/contact-us",
    label: "Give Us Feedback",
  },
  {
    href: "/login",
    label: "Privacy Policy",
  },
  {
    href: "/contact-us",
    label: "Join Group on Facebook",
  },
  {
    href: "/contact-us",
    label: "Contact Us",
  },
  {
    href: "/contact-us",
    label: "Follow Us On Facebook",
  },
];

export const signUpArray = [
  {
    input: {
      id: "username",
      label: "Username",
      type: "text",
      name: "username",
    },
  },
  {
    input: { id: "email", label: "Email", type: "email", name: "email" },
  },
  {
    input: {
      id: "password",
      label: "Password",
      type: "password",
      name: "password",
    },
  },
  {
    input: {
      id: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
    },
  },
  {
    input: { id: "phone", label: "Phone", type: "text", name: "phone" },
  },
];

export const generalFields = {
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long." })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 characters long.",
    })
    .regex(/^(002|\+2)?01[0125]\d+$/, {
      message: "Please enter a valid phone number ex. +201234567890",
    }),
};

export const loginArray = [
  {
    input: { id: "email", label: "Email", type: "email", name: "email" },
  },
  {
    input: {
      id: "password",
      label: "Password",
      type: "password",
      name: "password",
    },
  },
];
