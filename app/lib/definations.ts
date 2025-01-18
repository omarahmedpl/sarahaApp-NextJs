import React from "react";

export interface NavLink extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export interface FooterLinkInterface {
  href: string;
  label: string;
}

export interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  input: { id: string; label?: string; type: string; name: string };
  error?: string;
  width?: string;
}
export interface CustomSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  input: { id: string; label: string; name: string };
  error?: string;
  options: { value: string; label: string }[];
}
export interface CustomTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  input: { id: string; name: string; label?: string };
  error?: string;
  autoFocus?: boolean;
}
export interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}
export type FormState = {
  errors?: Record<string, string[]>;
  message?: string;
};

export interface UserDataInterface {
  _id: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  role: "User" | "Admin";
  gender: "male" | "female";
  confirmEmail: false;
  deleted: false;
  otp: number | null;
  createdAt: string;
  updatedAt: string;
  image?: string;
  __v: number;
}

export interface IJWT {
  id: string;
  username: string;
  isLoggedIn: boolean;
  iat: number;
  exp: number;
}
