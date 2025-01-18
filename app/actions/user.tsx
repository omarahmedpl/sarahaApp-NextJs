import axios from "axios";
import { getCookie, removeCookie } from "./auth";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { set } from "zod";
import { Dispatch, SetStateAction } from "react";
// imp
export const fetchProfile = async () => {
  const token = getCookie("auth-token");

  if (!token) {
    console.error("No auth token found.");
    return null; // Return null or throw an error if no token is found
  }

  console.log("Fetching profile...");

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST}/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Profile fetched successfully:", response.data.data);

    return response.data.data; // Return the profile data
  } catch (error) {
    console.error("Failed to fetch profile:", error);

    // Handle specific errors if needed
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.error("Unauthorized: Invalid or expired token.");
        // Optionally, clear the auth token and redirect to login
        removeCookie("auth-token");
        redirect("/login");
      } else {
        console.error("An unexpected error occurred:", error.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }

    return null; // Return null or throw an error
  }
};
export const deleteMessage = async ({ messageId }: { messageId: string }) => {
  const token = getCookie("auth-token");
  if (token) {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST}/message/${messageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": "", // Explicitly unset the header
          },
        }
      );
      toast.success("Message deleted successfully.");
      return response.data.data;
    } catch (e) {
      console.log(e);
      toast.error("An unexpected error occurred.");
    }
  } else {
    location.href = "/login";
  }
};

export const fetchUserMessages = async ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}) => {
  const token = getCookie("auth-token");
  if (token) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/user/messages?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (e) {
      console.log(e);
      toast.error("An unexpected error occurred.");
    }
  } else {
    location.href = "/login";
  }
};

export const fetchMessageProfile = async ({ userId }: { userId: string }) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST}/user/${userId}/shareProfile`,
      {
        headers: {
          "Accept-language": "",
        },
      }
    );
    return response.data.data; // Return the profile data
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    // Handle specific errors if needed
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.error("Unauthorized: Invalid or expired token.");
        // Optionally, clear the auth token and redirect to login
        removeCookie("auth-token");
        redirect("/login");
      } else {
        const errors = error.response?.data.message;
        throw new Error(errors);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }

    return null; // Return null or throw an error
  }
};

export const submitMessage = async ({
  message,
  accountId,
}: {
  accountId: string;
  message: string;
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST}/message`,
      {
        message,
        accountId,
      },
      {
        headers: {
          "Accept-language": "",
        },
      }
    );
    toast.success("Message sent successfully");
    return response.data.data; // Return the profile data
  } catch (error) {
    console.error("Failed to send message:", error);
    // Handle specific errors if needed
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.error("Unauthorized: Invalid or expired token.");
        // Optionally, clear the auth token and redirect to login
        removeCookie("auth-token");
        redirect("/login");
      } else {
        const errors = error.response?.data.errors
          .map((error) => error.message)
          .join(", ");
        throw new Error(errors);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }

    return null; // Return null or throw an error
  }
};

export const deactivateAccount = async ({
  email,
  setLoadingProcess,
}: {
  email: string;
  setLoadingProcess: Dispatch<SetStateAction<boolean>>;
}) => {
  setLoadingProcess(true);
  const token = getCookie("auth-token");
  if (token) {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST}/user/profile/freeze`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Account deactivated successfully.");
      setTimeout(() => {
        removeCookie("auth-token");
        redirect("/login");
      }, 500);
      return response.data.data;
    } catch (e) {
      console.log(e);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoadingProcess(false);
    }
  } else {
    location.href = "/login";
  }
  setLoadingProcess(false);
};

export const updatePassword = async ({
  currentPassword,
  password,
  confirmPassword,
  setLoadingProcess,
}: {
  currentPassword: string;
  password: string;
  confirmPassword: string;
  setLoadingProcess: Dispatch<SetStateAction<boolean>>;
}) => {
  setLoadingProcess(true);
  const token = getCookie("auth-token");
  if (token) {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST}/user/profile/updatePassword`,
        {
          oldPassword: currentPassword,
          password,
          confirmationPassword: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": "",
          },
        }
      );
      toast.success("Password updated successfully.");
      setTimeout(() => {
        removeCookie("auth-token");
        redirect("/login");
      }, 500);
    } catch (e) {
      console.log(e);
      toast.error("An unexpected error occurred.");
      const errors = e.response?.data.errors
        .map((error: any) => error.message)
        .join(", ");
      toast.error(errors);
    } finally {
      setLoadingProcess(false);
    }
  } else {
    location.href = "/login";
  }
  setLoadingProcess(false);
};

export const updateEmail = async ({
  email,
  setLoadingProcess,
}: {
  email: string;
  setLoadingProcess: React.Dispatch<SetStateAction<boolean>>;
}) => {
  setLoadingProcess(true);
  const token = getCookie("auth-token");
  if (token) {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_HOST}/user/profile/updateEmail`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": "",
          },
        }
      );
      toast.success("Email updated successfully, Please Confirm your email.");
      setTimeout(() => {
        removeCookie("auth-token");
        redirect("/login");
      }, 500);
    } catch (e) {
      console.log(e);
      toast.error("An unexpected error occurred.");
      toast.error(e.response.data.message);
      const errors = e.response?.data.errors
        .map((error: any) => error.message)
        .join(", ");
      toast.error(errors);
    } finally {
      setLoadingProcess(false);
    }
  } else {
    location.href = "/login";
  }
};

export const confirmUpdateEmail = async ({
  token,
  setError,
}: {
  token: string;
  setError: (error: string) => void;
}) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_HOST}/user/profile/confirmEmailUpdate`,
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

export const updateUserInformation = async ({
  bio,
  dob,
  gender,
  image,
  username,
  setLoadingProcess,
}: {
  username: string;
  image: string;
  bio: string;
  gender: string;
  dob: string;
  setLoadingProcess: Dispatch<SetStateAction<boolean>>;
}) => {
  setLoadingProcess(true);
  const token = getCookie("auth-token");
  const data = {
    username: username,
    image: image.trim() !== "" ? image.trim() : "https://www.foodrisk.org/images/irac-icons-membership.png",
    bio: bio.trim() !== "" ? bio : " ",
    gender,
    dob: dob !== "" ? dob : new Date().toISOString(),
  };
  if (token) {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST}/user/profile`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": "",
          },
        }
      );
      toast.success("Profile updated successfully.");
    } catch (e) {
      console.log(e);
      toast.error("An unexpected error occurred.");
      const errors = e.response?.data.errors
        .map((error: any) => error.message)
        .join(", ");
      toast.error(errors);
    } finally {
      setLoadingProcess(false);
    }
  } else {
    location.href = "/login";
  }
  setLoadingProcess(false);
};

