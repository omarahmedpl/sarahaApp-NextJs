"use client";
import { useEffect, useState } from "react";
import { CreateFormikConfig } from "../utils/formik";
import CustomInput from "../ui/CustomInput";
import { resetPassword } from "../actions/auth";
import { resetPasswordSchema } from "../actions/schema";

const ForgetPassword = ({}) => {
  const [loading, setLoading] = useState(false);
  const resetPasswordForm = CreateFormikConfig(
    {
      otp: "",
      password: "",
      confirmationPassword: "",
    },
    resetPasswordSchema,
    async (values) => {
      // console.log(values)
      const email = localStorage.getItem("forget-password-email");
      console.log(email)
      await resetPassword({
        email,
        otp: values.otp,
        password: values.password,
        confirmationPassword: values.confirmationPassword,
        setLoading,
      });
    }
  );
  useEffect(() => {
    console.log(resetPasswordForm);
  }, [resetPasswordForm]);
  return (
    <div className="container flex flex-col">
      <div className="title !text-3xl text-center">Reset Password</div>
      <form
        onSubmit={resetPasswordForm.handleSubmit}
        className="form flex flex-col mt-3 gap-4 w-full"
      >
        <CustomInput
          input={{
            label: "OTP",
            type: "text",
            name: "otp",
            id: "otp",
          }}
          error={
            resetPasswordForm.errors.otp && resetPasswordForm.touched.otp
              ? resetPasswordForm.errors.otp as string
              : ""
          }
          width="!w-full"
          value={resetPasswordForm.values.otp}
          onChange={resetPasswordForm.handleChange}
          onBlur={resetPasswordForm.handleBlur}
        />
        <CustomInput
          input={{
            label: "New Password",
            type: "password",
            name: "password",
            id: "password",
          }}
          error={
            resetPasswordForm.errors.password &&
            resetPasswordForm.touched.password
              ? resetPasswordForm.errors.password as string
              : ""
          }
          width="!w-full"
          value={resetPasswordForm.values.password}
          onChange={resetPasswordForm.handleChange}
          onBlur={resetPasswordForm.handleBlur}
        />
        <CustomInput
          input={{
            label: "Confirm Password",
            type: "password",
            name: "confirmationPassword",
            id: "confirmationPassword",
          }}
          error={
            resetPasswordForm.errors.confirmationPassword &&
            resetPasswordForm.touched.confirmationPassword
              ? resetPasswordForm.errors.confirmationPassword as string
              : ""
          }
          width="!w-full"
          value={resetPasswordForm.values.confirmationPassword}
          onChange={resetPasswordForm.handleChange}
          onBlur={resetPasswordForm.handleBlur}
        />
        <button
          type="submit"
          className="button btn-primary lg:ms-[230px] w-fit"
          disabled={loading || !resetPasswordForm.isValid}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
