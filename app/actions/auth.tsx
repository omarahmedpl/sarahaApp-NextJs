import axios from "axios";
import { FormState } from "../lib/definations";
import { LoginFormSchema, SignupFormSchema } from "./schema";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import React from "react";
export const setCookie = (name: string, value: string, expiringDate: Date) => {
  const cookies = new Cookies();
  cookies.set(name, value, { expires: expiringDate, path: "/" });
};

export const getCookie = (name: string) => {
  const cookies = new Cookies();

  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  const cookies = new Cookies();
  cookies.remove(name);
  console.log(cookies.get(name));
};
export async function signup(state: FormState, formData: FormData) {
  // Prepare the form data to keep it if there's an error
  const formValues = {
    username: String(formData.get("username") || ""),
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
    confirmPassword: String(formData.get("confirmPassword") || ""),
    phone: String(formData.get("phone") || ""),
  };

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse(formValues);

  if (!validatedFields.success) {
    toast.error("Validation failed. Please check your inputs."); // Show error toast
    return {
      errors: validatedFields.error.flatten().fieldErrors, // Contains field-specific errors
      formData: formValues, // Return form data so it can be re-used
      message: "Validation failed", // Optional message for general errors
    };
  } else {
    try {
      const { username, email, password, phone, confirmPassword } =
        validatedFields.data;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/auth/signup`,
        {
          username,
          email,
          password,
          confirmationPassword: confirmPassword,
          phone,
        },
        {
          headers: {
            "Accept-Language": "en",
          },
        }
      );
      toast.success("Signup successful! Please Confirm Your Email..."); // Show success toast
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
      return {
        message: "Signup successful",
        formData: formValues, // Optionally return form data to be used later
      };
    } catch (e: unknown) {
      const errorResponse = e.response?.data;
      if (errorResponse) {
        // Display the main message
        if (errorResponse.message) {
          toast.error(errorResponse.message);
        }
        // Display individual validation errors
        if (errorResponse.errors && Array.isArray(errorResponse.errors)) {
          errorResponse.errors.forEach((err: any) => {
            if (err.message) {
              toast.error(err.message); // Show each error message in a toast
            }
          });
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
      return {
        errors: [],
        formData: formValues, // Return form data in case of an unexpected error
      };
    }
  }
}

export async function login(state: FormState, formData: FormData) {
  // Prepare the form data to keep it if there's an error
  const formValues = {
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
  };

  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse(formValues);

  if (!validatedFields.success) {
    toast.error("Validation failed. Please check your inputs."); // Show error toast
    return {
      errors: validatedFields.error.flatten().fieldErrors, // Contains field-specific errors
      formData: formValues, // Return form data so it can be re-used
      message: "Validation failed", // Optional message for general errors
    };
  } else {
    try {
      const { email, password } = validatedFields.data;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Accept-Language": "en",
          },
        }
      );
      console.log(response.data);
      toast.success(`Welcome ${response.data.data.username}`); // Show success toast
      setCookie(
        "auth-token",
        response.data.data.token,
        new Date(Date.now() + 60 * 60 * 1000)
      );
      setTimeout(() => {
        window.location.href = "/profile";
      }, 500);
      return {
        message: "Signup successful",
        formData: formValues, // Optionally return form data to be used later
      };
    } catch (e: unknown) {
      const errorResponse = e.response?.data;
      if (errorResponse) {
        // Display the main message
        if (errorResponse.message) {
          toast.error(errorResponse.message);
        }
        // Display individual validation errors
        if (errorResponse.errors && Array.isArray(errorResponse.errors)) {
          errorResponse.errors.forEach((err: any) => {
            if (err.message) {
              toast.error(err.message); // Show each error message in a toast
            }
          });
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
      return {
        errors: [],
        formData: formValues, // Return form data in case of an unexpected error
      };
    }
  }
}

export const confirmEmail = async ({
  token,
  setError,
}: {
  token: string;
  setError: (error: string) => void;
}) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_HOST}/auth/confirm-email`,
      {},
      {
        headers: {
          "Accept-Language": "",
          Authorization: token,
        },
      }
    );
    console.log(response.data);
    toast.success("Email confirmed successfully.");
    setTimeout(() => {
      redirect("/login");
    }, 1000);
  } catch (error) {
    console.error("Failed to confirm Email:", error);

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        const errorMessage = "Unauthorized: Invalid or expired token.";
        console.error(errorMessage);
        // Optionally, clear the auth token and redirect to login
        removeCookie("auth-token");
        redirect("/login");
      } else {
        const errorMessage = "An unexpected error occurred.";
        console.error(errorMessage, error);
        toast.error(errorMessage);
        throw new Error(`Unexpected error: ${error.response?.data.message}`);
      }
    } else {
      const errorMessage = "An unexpected error occurred.";
      console.error(errorMessage, error);
      setError(errorMessage);
      toast.error(errorMessage);
      throw new Error(error.message);
    }

    return null; // Return null or throw an error
  }
};

export const forgetPassword = async ({
  email,
  setLoading,
}: {
  email: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setLoading(true);
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_HOST}/auth/forget-password`,
      {
        email,
      },
      {
        headers: {
          "Accept-Language": "",
        },
      }
    );
    console.log(response.data);
    toast.success("Email sent successfully.");
    setTimeout(() => {
      redirect("/reset-password");
    }, 500);
    // redirect
  } catch (error) {
    console.error("Failed to send email:", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        const errorMessage = "Unauthorized: Invalid or expired token.";
        console.error(errorMessage);
        // Optionally, clear the auth token and redirect to login
        removeCookie("auth-token");
        redirect("/login");
      } else {
        const errorMessage = "An unexpected error occurred.";
        console.error(errorMessage, error);
        toast.error(errorMessage);
        throw new Error(`Unexpected error: ${error.response?.data.message}`);
      }
    } else {
      const errorMessage = "An unexpected error occurred.";
      console.error(errorMessage, error);
      toast.error(errorMessage);
      throw new Error(error.message);
    }
  } finally {
    setLoading(false);
  }
};

export const resetPassword = async ({
  otp,
  email,
  password,
  confirmationPassword,
  setLoading,
}: {
  email: string;
  otp: string;
  password: string;
  confirmationPassword: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  console.log({ email });
  setLoading(true);
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_HOST}/auth/reset-password`,
      {
        email,
        otp,
        password,
        confirmationPassword,
      },
      {
        headers: {
          "Accept-Language": "",
        },
      }
    );
    console.log(response.data);
    toast.success("Password reset successfully.");
    setTimeout(() => {
      redirect("/login");
    }, 500);
  } catch (error) {
    console.error("Failed to reset password:", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        const errorMessage = "Unauthorized: Invalid or expired token.";
        console.error(errorMessage);
        // Optionally, clear the auth token and redirect to login
        removeCookie("auth-token");
        redirect("/login");
      } else {
        const errorMessage = "An unexpected error occurred.";
        console.error(errorMessage, error);
        toast.error(errorMessage);
        throw new Error(`Unexpected error: ${error.response?.data.message}`);
      }
    } else {
      const errorMessage = "An unexpected error occurred.";
      console.error(errorMessage, error);
      toast.error(errorMessage);
      throw new Error(error.message);
    }
  } finally {
    setLoading(false);
  }
};
