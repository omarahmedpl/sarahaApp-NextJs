"use client";
import { fetchMessageProfile, submitMessage } from "@/app/actions/user";
import AvatarImage from "@/app/ui/AvatarImage";
import CustomTextArea from "@/app/ui/CustomTextArea";
import Error from "@/app/ui/Error";
import Loading from "@/app/ui/Loading";
import { usePathname } from "next/navigation";
import {  useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaPencilAlt } from "react-icons/fa";

interface IUserData {
  username: string;
  image?: string;
  _id: string;
  gender: string;
  dob?: string;
  bio?: string;
}

const SendMessage = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const userId = usePathname().split("/u/")[1];
  const isMount = useRef(true);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { user } = await fetchMessageProfile({ userId });
        setUserData(user);
      } catch (error) {
        console.error("An Error Happened", error);
        toast.error("Unexpected Error Happened, Please Try Again");
        setError("An Error Happened: " + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    if (isMount.current) {
      fetchUserData();
      isMount.current = false;
    }
  }, [userId]);

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validateOnMount: false, // Disable validation on mount
    validationSchema: yup.object().shape({
      message: yup.string().required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await submitMessage({
          message: values.message,
          accountId: userId,
        });
        resetForm();
      } catch (error) {
        console.error("Failed to send message", error);
        toast.error(
          "Failed to send message. Message shouldn't contains any special character."
        );
      }
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!userData) {
    return <Error error="User not found" />;
  }

  return (
    <div className="container">
      <div className="send-message-box bg-white mt-[30px] p-[15px] flex items-center flex-col">
        <AvatarImage mt={false} src={userData.image} />
        <div className="username w-fit mt-2 font-bold text-[20px]">
          {userData.username}
        </div>
          {userData.bio ?? ""}
        <div className="username w-fit mt-10 font-bold text-[22px]">
          Leave a constructive message :)
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-[600px] w-[70%] mt-4 flex flex-col justify-center"
        >
          <CustomTextArea
            input={{
              id: "message",
              name: "message",
            }}
            className="rounded-lg"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.message && formik.errors.message
                ? formik.errors.message
                : ""
            }
          />
          <button
            className="btn-primary flex flex-row gap-2 items-center w-fit m-auto"
            type="submit"
            disabled={!formik.values.message.trim() || formik.isSubmitting}
          >
            {formik.isSubmitting ? "Loading..." : "Send Message"}{" "}
            <FaPencilAlt />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMessage;
