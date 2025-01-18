import { z } from "zod";
import { generalFields } from "../lib/consts";
import * as yup from "yup";
export const SignupFormSchema = z
  .object({
    username: generalFields.username,
    email: generalFields.email,
    password: generalFields.password,
    confirmPassword: z.string(),
    phone: generalFields.phone,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Optional: Adds the error to the `confirmPassword` field
  });

export const LoginFormSchema = z.object({
  email: generalFields.email,
  password: generalFields.password,
});

export const updatePasswordSchema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  password: yup
    .string()
    .required("New password is required")
    .notOneOf(
      [yup.ref("currentPassword")],
      "New password must be different from the current password"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
//         }

export const updateEmailSchema = yup.object({
  email: yup.string().email().required("Email is required"),
});

export const updateInformationSchema = yup.object({
  username: yup.string(),
  phone: yup.string(),
  bio: yup.string(),
  gender: yup.string(),
  dob: yup.string(),
  image: yup.string(),
});

export const forgetPassowrdSchema = yup.object({
  email: yup.string().email().required("Email is required"),
});

export const resetPasswordSchema = yup.object({
  otp: yup
    .string()
    .matches(/^\d{6}$/, "OTP must be a number of 6 digits")
    .required("OTP is required"),
  password: yup.string().required("Password is required"),
  confirmationPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
